/**
* DevExtreme (cjs/__internal/core/localization/date.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _first_day_of_week_data = _interopRequireDefault(require("../../core/localization/cldr-data/first_day_of_week_data"));
var _core = _interopRequireDefault(require("../../core/localization/core"));
var _default_date_names = _interopRequireDefault(require("../../core/localization/default_date_names"));
var _date = _interopRequireDefault(require("../../core/localization/intl/date"));
var _date2 = require("../../core/localization/ldml/date.format");
var _date3 = require("../../core/localization/ldml/date.formatter");
var _date4 = require("../../core/localization/ldml/date.parser");
var _number = _interopRequireDefault(require("../../core/localization/number"));
var _m_errors = _interopRequireDefault(require("../../core/m_errors"));
var _m_dependency_injector = require("../../core/utils/m_dependency_injector");
var _m_iterator = require("../../core/utils/m_iterator");
var _m_type = require("../../core/utils/m_type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_DAY_OF_WEEK_INDEX = 0;
const hasIntl = typeof Intl !== 'undefined';
const FORMATS_TO_PATTERN_MAP = {
  shortdate: 'M/d/y',
  shorttime: 'h:mm a',
  longdate: 'EEEE, MMMM d, y',
  longtime: 'h:mm:ss a',
  monthandday: 'MMMM d',
  monthandyear: 'MMMM y',
  quarterandyear: 'QQQ y',
  day: 'd',
  year: 'y',
  shortdateshorttime: 'M/d/y, h:mm a',
  longdatelongtime: 'EEEE, MMMM d, y, h:mm:ss a',
  month: 'LLLL',
  shortyear: 'yy',
  dayofweek: 'EEEE',
  quarter: 'QQQ',
  hour: 'HH',
  minute: 'mm',
  second: 'ss',
  millisecond: 'SSS',
  'datetime-local': 'yyyy-MM-ddTHH\':\'mm\':\'ss'
};
const possiblePartPatterns = {
  year: ['y', 'yy', 'yyyy'],
  day: ['d', 'dd'],
  month: ['M', 'MM', 'MMM', 'MMMM'],
  hours: ['H', 'HH', 'h', 'hh', 'ah'],
  minutes: ['m', 'mm'],
  seconds: ['s', 'ss'],
  milliseconds: ['S', 'SS', 'SSS']
};
const dateLocalization = (0, _m_dependency_injector.injector)({
  engine() {
    return 'base';
  },
  _getPatternByFormat(format) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return FORMATS_TO_PATTERN_MAP[format.toLowerCase()];
  },
  _expandPattern(pattern) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getPatternByFormat(pattern) || pattern;
  },
  formatUsesMonthName(format) {
    return this._expandPattern(format).indexOf('MMMM') !== -1;
  },
  formatUsesDayName(format) {
    return this._expandPattern(format).indexOf('EEEE') !== -1;
  },
  getFormatParts(format) {
    const pattern = this._getPatternByFormat(format) || format;
    const result = [];
    (0, _m_iterator.each)(pattern.split(/\W+/), (_, formatPart) => {
      (0, _m_iterator.each)(possiblePartPatterns, (partName, possiblePatterns) => {
        if (possiblePatterns.includes(formatPart)) {
          result.push(partName);
        }
      });
    });
    return result;
  },
  getMonthNames(format) {
    return _default_date_names.default.getMonthNames(format);
  },
  getDayNames(format) {
    return _default_date_names.default.getDayNames(format);
  },
  getQuarterNames(format) {
    return _default_date_names.default.getQuarterNames(format);
  },
  getPeriodNames(format) {
    return _default_date_names.default.getPeriodNames(format);
  },
  getTimeSeparator() {
    return ':';
  },
  is24HourFormat(format) {
    const amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
    const pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
    const amTimeFormatted = this.format(amTime, format);
    const pmTimeFormatted = this.format(pmTime, format);
    for (let i = 0; i < amTimeFormatted.length; i += 1) {
      if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
        return !isNaN(parseInt(amTimeFormatted[i], 10));
      }
    }
    return undefined;
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
    if (typeof format === 'function') {
      formatter = format;
    } else if (format.formatter) {
      formatter = format.formatter;
    } else {
      // eslint-disable-next-line no-param-reassign
      format = format.type ?? format;
      if ((0, _m_type.isString)(format)) {
        // eslint-disable-next-line no-param-reassign
        format = FORMATS_TO_PATTERN_MAP[format.toLowerCase()] || format;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _number.default.convertDigits((0, _date3.getFormatter)(format, this)(date));
      }
    }
    if (!formatter) {
      // TODO: log warning or error
      return undefined;
    }
    return formatter(date);
  },
  parse(text, format) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let ldmlFormat;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatter;
    if (!text) {
      return undefined;
    }
    if (!format) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.parse(text, 'shortdate');
    }
    if (typeof format === 'object' && format.parser) {
      return format.parser(text);
    }
    if (typeof format === 'string' && !FORMATS_TO_PATTERN_MAP[format.toLowerCase()]) {
      ldmlFormat = format;
    } else {
      formatter = value => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const text = that.format(value, format);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _number.default.convertDigits(text, true);
      };
      try {
        ldmlFormat = (0, _date2.getFormat)(formatter);
        // eslint-disable-next-line
      } catch (e) {}
    }
    if (ldmlFormat) {
      // eslint-disable-next-line no-param-reassign
      text = _number.default.convertDigits(text, true);
      return (0, _date4.getParser)(ldmlFormat, this)(text);
    }
    _m_errors.default.log('W0012');
    const result = new Date(text);
    if (!result || isNaN(result.getTime())) {
      return undefined;
    }
    return result;
  },
  firstDayOfWeekIndex() {
    const index = _core.default.getValueByClosestLocale(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    locale => _first_day_of_week_data.default[locale]);
    return index ?? DEFAULT_DAY_OF_WEEK_INDEX;
  }
});
if (hasIntl) {
  dateLocalization.inject(_date.default);
}
var _default = exports.default = dateLocalization;
