/**
* DevExtreme (cjs/__internal/core/localization/globalize/date.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

require("../../../core/localization/globalize/core");
require("../../../core/localization/globalize/number");
require("globalize/date");
var _date2 = _interopRequireDefault(require("../../../core/localization/date"));
var iteratorUtils = _interopRequireWildcard(require("../../../core/utils/m_iterator"));
var _m_type = require("../../../core/utils/m_type");
var _globalize = _interopRequireDefault(require("globalize"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

// eslint-disable-next-line import/no-extraneous-dependencies

const ACCEPTABLE_JSON_FORMAT_PROPERTIES = ['skeleton', 'date', 'time', 'datetime', 'raw'];
const RTL_MARKS_REGEX = /[\u200E\u200F]/g;
if (_globalize.default !== null && _globalize.default !== void 0 && _globalize.default.formatDate) {
  if (_globalize.default.locale().locale === 'en') {
    _globalize.default.locale('en');
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
      return _globalize.default.locale().main(`dates/calendars/gregorian/${path}`);
    },
    getPeriodNames(format, type) {
      // eslint-disable-next-line no-param-reassign
      format = format || 'wide';
      // eslint-disable-next-line no-param-reassign
      type = type === 'format' ? type : 'stand-alone';
      const json = _globalize.default.locale().main(`dates/calendars/gregorian/dayPeriods/${type}/${format}`);
      return [json.am, json.pm];
    },
    getMonthNames(format, type) {
      const months = _globalize.default.locale().main(`dates/calendars/gregorian/months/${type === 'format' ? type : 'stand-alone'}/${format || 'wide'}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return iteratorUtils.map(months, month => month);
    },
    getDayNames(format) {
      const days = _globalize.default.locale().main(`dates/calendars/gregorian/days/stand-alone/${format || 'wide'}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return iteratorUtils.map(days, day => day);
    },
    getTimeSeparator() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _globalize.default.locale().main('numbers/symbols-numberSystem-latn/timeSeparator');
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
        formatCacheKey = `${_globalize.default.locale().locale}:${format}`;
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
          // eslint-disable-next-line no-param-reassign
          format = {
            // @ts-expect-error
            raw: this._getPatternByFormat(format) || format
          };
          formatter = _globalize.default.dateFormatter(format);
          formattersCache[formatCacheKey] = formatter;
        }
      } else {
        if (!this._isAcceptableFormat(format)) {
          return undefined;
        }
        formatter = _globalize.default.dateFormatter(format);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.removeRtlMarks(formatter(date));
    },
    parse(text, format) {
      if (!text) {
        return undefined;
      }
      if (!format || typeof format === 'function' || (0, _m_type.isObject)(format) && !this._isAcceptableFormat(format)) {
        if (format) {
          const parsedValue = this.callBase(text, format);
          if (parsedValue) {
            return parsedValue;
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _globalize.default.parseDate(text);
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
      const parsedDate = _globalize.default.parseDate(text, format);
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
      const firstDay = _globalize.default.locale().supplemental.weekData.firstDay();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._getDayKeys().indexOf(firstDay);
    },
    _getDayKeys() {
      const days = _globalize.default.locale().main('dates/calendars/gregorian/days/format/short');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return iteratorUtils.map(days, (_, key) => key);
    }
  };
  _date2.default.resetInjection();
  _date2.default.inject(globalizeDateLocalization);
}
