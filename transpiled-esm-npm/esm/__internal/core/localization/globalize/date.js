/* eslint-disable spellcheck/spell-checker */
import '../../../core/localization/globalize/core';
import '../../../core/localization/globalize/number';
import 'globalize/date';
import dateLocalization from '../../../core/localization/date';
import * as iteratorUtils from '../../../core/utils/m_iterator';
import { isObject } from '../../../core/utils/m_type';
// eslint-disable-next-line import/no-extraneous-dependencies
import Globalize from 'globalize';
const ACCEPTABLE_JSON_FORMAT_PROPERTIES = ['skeleton', 'date', 'time', 'datetime', 'raw'];
const RTL_MARKS_REGEX = /[\u200E\u200F]/g;
if (Globalize !== null && Globalize !== void 0 && Globalize.formatDate) {
  if (Globalize.locale().locale === 'en') {
    Globalize.locale('en');
  }
  const formattersCache = {};
  const FORMATS_TO_GLOBALIZE_MAP = {
    shortdate: {
      path: 'dateTimeFormats/availableFormats/yMd'
    },
    shorttime: {
      path: 'timeFormats/short'
    },
    longdate: {
      path: 'dateFormats/full'
    },
    longtime: {
      path: 'timeFormats/medium'
    },
    monthandday: {
      path: 'dateTimeFormats/availableFormats/MMMMd'
    },
    monthandyear: {
      path: 'dateTimeFormats/availableFormats/yMMMM'
    },
    quarterandyear: {
      path: 'dateTimeFormats/availableFormats/yQQQ'
    },
    day: {
      path: 'dateTimeFormats/availableFormats/d'
    },
    year: {
      path: 'dateTimeFormats/availableFormats/y'
    },
    shortdateshorttime: {
      path: 'dateTimeFormats/short',
      parts: ['shorttime', 'shortdate']
    },
    longdatelongtime: {
      path: 'dateTimeFormats/medium',
      parts: ['longtime', 'longdate']
    },
    month: {
      pattern: 'LLLL'
    },
    shortyear: {
      pattern: 'yy'
    },
    dayofweek: {
      pattern: 'EEEE'
    },
    quarter: {
      pattern: 'QQQ'
    },
    millisecond: {
      pattern: 'SSS'
    },
    hour: {
      pattern: 'HH'
    },
    minute: {
      pattern: 'mm'
    },
    second: {
      pattern: 'ss'
    }
  };
  const globalizeDateLocalization = {
    engine() {
      return 'globalize';
    },
    _getPatternByFormat(format) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const lowerFormat = format.toLowerCase();
      const globalizeFormat = FORMATS_TO_GLOBALIZE_MAP[lowerFormat];
      if (lowerFormat === 'datetime-local') {
        return 'yyyy-MM-ddTHH\':\'mm\':\'ss';
      }
      if (!globalizeFormat) {
        return undefined;
      }
      let result = 'path' in globalizeFormat ? that._getFormatStringByPath(globalizeFormat.path) : globalizeFormat.pattern;
      if ('parts' in globalizeFormat) {
        iteratorUtils.each(globalizeFormat.parts, (index, part) => {
          result = result.replace(`{${index}}`, that._getPatternByFormat(part));
        });
      }
      return result;
    },
    _getFormatStringByPath(path) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return Globalize.locale().main(`dates/calendars/gregorian/${path}`);
    },
    getPeriodNames(format, type) {
      // eslint-disable-next-line no-param-reassign
      format = format || 'wide';
      // eslint-disable-next-line no-param-reassign
      type = type === 'format' ? type : 'stand-alone';
      const json = Globalize.locale().main(`dates/calendars/gregorian/dayPeriods/${type}/${format}`);
      return [json.am, json.pm];
    },
    getMonthNames(format, type) {
      const months = Globalize.locale().main(`dates/calendars/gregorian/months/${type === 'format' ? type : 'stand-alone'}/${format || 'wide'}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return iteratorUtils.map(months, month => month);
    },
    getDayNames(format) {
      const days = Globalize.locale().main(`dates/calendars/gregorian/days/stand-alone/${format || 'wide'}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return iteratorUtils.map(days, day => day);
    },
    getTimeSeparator() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return Globalize.locale().main('numbers/symbols-numberSystem-latn/timeSeparator');
    },
    removeRtlMarks(text) {
      return text.replace(RTL_MARKS_REGEX, '');
    },
    format(date, format) {
      if (!date) {
        return undefined;
      }
      if (!format) {
        return date;
      }
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let formatter;
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let formatCacheKey;
      if (typeof format === 'function') {
        return format(date);
      }
      if (format.formatter) {
        // @ts-expect-error
        return format.formatter(date);
      }
      // eslint-disable-next-line no-param-reassign
      format = format.type ?? format;
      if (typeof format === 'string') {
        formatCacheKey = `${Globalize.locale().locale}:${format}`;
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
          // eslint-disable-next-line no-param-reassign
          format = {
            // @ts-expect-error
            raw: this._getPatternByFormat(format) || format
          };
          formatter = Globalize.dateFormatter(format);
          formattersCache[formatCacheKey] = formatter;
        }
      } else {
        if (!this._isAcceptableFormat(format)) {
          return undefined;
        }
        formatter = Globalize.dateFormatter(format);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.removeRtlMarks(formatter(date));
    },
    parse(text, format) {
      if (!text) {
        return undefined;
      }
      if (!format || typeof format === 'function' || isObject(format) && !this._isAcceptableFormat(format)) {
        if (format) {
          const parsedValue = this.callBase(text, format);
          if (parsedValue) {
            return parsedValue;
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Globalize.parseDate(text);
      }
      if (format.parser) {
        // @ts-expect-error
        return format.parser(text);
      }
      if (typeof format === 'string') {
        // eslint-disable-next-line no-param-reassign
        format = {
          // @ts-expect-error
          raw: this._getPatternByFormat(format) || format
        };
      }
      const parsedDate = Globalize.parseDate(text, format);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return parsedDate ?? this.callBase(text, format);
    },
    _isAcceptableFormat(format) {
      if (format.parser) {
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < ACCEPTABLE_JSON_FORMAT_PROPERTIES.length; i += 1) {
        if (Object.prototype.hasOwnProperty.call(format, ACCEPTABLE_JSON_FORMAT_PROPERTIES[i])) {
          return true;
        }
      }
      return false;
    },
    firstDayOfWeekIndex() {
      const firstDay = Globalize.locale().supplemental.weekData.firstDay();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._getDayKeys().indexOf(firstDay);
    },
    _getDayKeys() {
      const days = Globalize.locale().main('dates/calendars/gregorian/days/format/short');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return iteratorUtils.map(days, (_, key) => key);
    }
  };
  dateLocalization.resetInjection();
  dateLocalization.inject(globalizeDateLocalization);
}