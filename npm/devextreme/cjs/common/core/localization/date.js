/**
* DevExtreme (cjs/common/core/localization/date.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../../../core/utils/dependency_injector"));
var _type = require("../../../core/utils/type");
var _iterator = require("../../../core/utils/iterator");
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _date = require("./ldml/date.formatter");
var _date2 = require("./ldml/date.format");
var _date3 = require("./ldml/date.parser");
var _default_date_names = _interopRequireDefault(require("./default_date_names"));
var _first_day_of_week_data = _interopRequireDefault(require("./cldr-data/first_day_of_week_data"));
var _core = _interopRequireDefault(require("./core"));
var _number = _interopRequireDefault(require("./number"));
var _date4 = _interopRequireDefault(require("./intl/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_DAY_OF_WEEK_INDEX = 0;
const hasIntl = typeof Intl !== 'undefined';
const FORMATS_TO_PATTERN_MAP = {
  'shortdate': 'M/d/y',
  'shorttime': 'h:mm a',
  'longdate': 'EEEE, MMMM d, y',
  'longtime': 'h:mm:ss a',
  'monthandday': 'MMMM d',
  'monthandyear': 'MMMM y',
  'quarterandyear': 'QQQ y',
  'day': 'd',
  'year': 'y',
  'shortdateshorttime': 'M/d/y, h:mm a',
  'longdatelongtime': 'EEEE, MMMM d, y, h:mm:ss a',
  'month': 'LLLL',
  'shortyear': 'yy',
  'dayofweek': 'EEEE',
  'quarter': 'QQQ',
  'hour': 'HH',
  'minute': 'mm',
  'second': 'ss',
  'millisecond': 'SSS',
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
const dateLocalization = (0, _dependency_injector.default)({
  engine: function () {
    return 'base';
  },
  _getPatternByFormat: function (format) {
    return FORMATS_TO_PATTERN_MAP[format.toLowerCase()];
  },
  _expandPattern: function (pattern) {
    return this._getPatternByFormat(pattern) || pattern;
  },
  formatUsesMonthName: function (format) {
    return this._expandPattern(format).indexOf('MMMM') !== -1;
  },
  formatUsesDayName: function (format) {
    return this._expandPattern(format).indexOf('EEEE') !== -1;
  },
  getFormatParts: function (format) {
    const pattern = this._getPatternByFormat(format) || format;
    const result = [];
    (0, _iterator.each)(pattern.split(/\W+/), (_, formatPart) => {
      (0, _iterator.each)(possiblePartPatterns, (partName, possiblePatterns) => {
        if (possiblePatterns.includes(formatPart)) {
          result.push(partName);
        }
      });
    });
    return result;
  },
  getMonthNames: function (format) {
    return _default_date_names.default.getMonthNames(format);
  },
  getDayNames: function (format) {
    return _default_date_names.default.getDayNames(format);
  },
  getQuarterNames: function (format) {
    return _default_date_names.default.getQuarterNames(format);
  },
  getPeriodNames: function (format) {
    return _default_date_names.default.getPeriodNames(format);
  },
  getTimeSeparator: function () {
    return ':';
  },
  is24HourFormat: function (format) {
    const amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
    const pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
    const amTimeFormatted = this.format(amTime, format);
    const pmTimeFormatted = this.format(pmTime, format);
    for (let i = 0; i < amTimeFormatted.length; i++) {
      if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
        return !isNaN(parseInt(amTimeFormatted[i]));
      }
    }
  },
  format: function (date, format) {
    if (!date) {
      return;
    }
    if (!format) {
      return date;
    }
    let formatter;
    if (typeof format === 'function') {
      formatter = format;
    } else if (format.formatter) {
      formatter = format.formatter;
    } else {
      format = format.type || format;
      if ((0, _type.isString)(format)) {
        format = FORMATS_TO_PATTERN_MAP[format.toLowerCase()] || format;
        return _number.default.convertDigits((0, _date.getFormatter)(format, this)(date));
      }
    }
    if (!formatter) {
      // TODO: log warning or error
      return;
    }
    return formatter(date);
  },
  parse: function (text, format) {
    const that = this;
    let ldmlFormat;
    let formatter;
    if (!text) {
      return;
    }
    if (!format) {
      return this.parse(text, 'shortdate');
    }
    if (format.parser) {
      return format.parser(text);
    }
    if (typeof format === 'string' && !FORMATS_TO_PATTERN_MAP[format.toLowerCase()]) {
      ldmlFormat = format;
    } else {
      formatter = value => {
        const text = that.format(value, format);
        return _number.default.convertDigits(text, true);
      };
      try {
        ldmlFormat = (0, _date2.getFormat)(formatter);
      } catch (e) {}
    }
    if (ldmlFormat) {
      text = _number.default.convertDigits(text, true);
      return (0, _date3.getParser)(ldmlFormat, this)(text);
    }
    _errors.default.log('W0012');
    const result = new Date(text);
    if (!result || isNaN(result.getTime())) {
      return;
    }
    return result;
  },
  firstDayOfWeekIndex: function () {
    const index = _core.default.getValueByClosestLocale(locale => _first_day_of_week_data.default[locale]);
    return index === undefined ? DEFAULT_DAY_OF_WEEK_INDEX : index;
  }
});
if (hasIntl) {
  dateLocalization.inject(_date4.default);
}
var _default = exports.default = dateLocalization;
module.exports = exports.default;
module.exports.default = exports.default;
