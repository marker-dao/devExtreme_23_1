/**
* DevExtreme (cjs/localization/number.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../core/utils/dependency_injector"));
var _common = require("../core/utils/common");
var _iterator = require("../core/utils/iterator");
var _type = require("../core/utils/type");
var _number = require("./ldml/number");
var _config = _interopRequireDefault(require("../core/config"));
var _errors = _interopRequireDefault(require("../core/errors"));
var _utils = require("./utils");
var _currency = _interopRequireDefault(require("./currency"));
var _number2 = _interopRequireDefault(require("./intl/number"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const hasIntl = typeof Intl !== 'undefined';
const MAX_LARGE_NUMBER_POWER = 4;
const DECIMAL_BASE = 10;
const NUMERIC_FORMATS = ['currency', 'fixedpoint', 'exponential', 'percent', 'decimal'];
const LargeNumberFormatPostfixes = {
  1: 'K',
  // kilo
  2: 'M',
  // mega
  3: 'B',
  // billions
  4: 'T' // tera
};

const LargeNumberFormatPowers = {
  'largenumber': 'auto',
  'thousands': 1,
  'millions': 2,
  'billions': 3,
  'trillions': 4
};
const numberLocalization = (0, _dependency_injector.default)({
  engine: function () {
    return 'base';
  },
  numericFormats: NUMERIC_FORMATS,
  defaultLargeNumberFormatPostfixes: LargeNumberFormatPostfixes,
  _parseNumberFormatString: function (formatType) {
    const formatObject = {};
    if (!formatType || typeof formatType !== 'string') return;
    const formatList = formatType.toLowerCase().split(' ');
    (0, _iterator.each)(formatList, (index, value) => {
      if (NUMERIC_FORMATS.includes(value)) {
        formatObject.formatType = value;
      } else if (value in LargeNumberFormatPowers) {
        formatObject.power = LargeNumberFormatPowers[value];
      }
    });
    if (formatObject.power && !formatObject.formatType) {
      formatObject.formatType = 'fixedpoint';
    }
    if (formatObject.formatType) {
      return formatObject;
    }
  },
  _calculateNumberPower: function (value, base, minPower, maxPower) {
    let number = Math.abs(value);
    let power = 0;
    if (number > 1) {
      while (number && number >= base && (maxPower === undefined || power < maxPower)) {
        power++;
        number = number / base;
      }
    } else if (number > 0 && number < 1) {
      while (number < 1 && (minPower === undefined || power > minPower)) {
        power--;
        number = number * base;
      }
    }
    return power;
  },
  _getNumberByPower: function (number, power, base) {
    let result = number;
    while (power > 0) {
      result = result / base;
      power--;
    }
    while (power < 0) {
      result = result * base;
      power++;
    }
    return result;
  },
  _formatNumber: function (value, formatObject, formatConfig) {
    if (formatObject.power === 'auto') {
      formatObject.power = this._calculateNumberPower(value, 1000, 0, MAX_LARGE_NUMBER_POWER);
    }
    if (formatObject.power) {
      value = this._getNumberByPower(value, formatObject.power, 1000);
    }
    const powerPostfix = this.defaultLargeNumberFormatPostfixes[formatObject.power] || '';
    let result = this._formatNumberCore(value, formatObject.formatType, formatConfig);
    result = result.replace(/(\d|.$)(\D*)$/, '$1' + powerPostfix + '$2');
    return result;
  },
  _formatNumberExponential: function (value, formatConfig) {
    let power = this._calculateNumberPower(value, DECIMAL_BASE);
    let number = this._getNumberByPower(value, power, DECIMAL_BASE);
    if (formatConfig.precision === undefined) {
      formatConfig.precision = 1;
    }
    if (number.toFixed(formatConfig.precision || 0) >= DECIMAL_BASE) {
      power++;
      number = number / DECIMAL_BASE;
    }
    const powString = (power >= 0 ? '+' : '') + power.toString();
    return this._formatNumberCore(number, 'fixedpoint', formatConfig) + 'E' + powString;
  },
  _addZeroes: function (value, precision) {
    const multiplier = Math.pow(10, precision);
    const sign = value < 0 ? '-' : '';
    value = (Math.abs(value) * multiplier >>> 0) / multiplier;
    let result = value.toString();
    while (result.length < precision) {
      result = '0' + result;
    }
    return sign + result;
  },
  _addGroupSeparators: function (value) {
    const parts = value.toString().split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, (0, _config.default)().thousandsSeparator) + (parts[1] ? (0, _config.default)().decimalSeparator + parts[1] : '');
  },
  _formatNumberCore: function (value, format, formatConfig) {
    if (format === 'exponential') {
      return this._formatNumberExponential(value, formatConfig);
    }
    if (format !== 'decimal' && formatConfig.precision !== null) {
      formatConfig.precision = formatConfig.precision || 0;
    }
    if (format === 'percent') {
      value = value * 100;
    }
    if (formatConfig.precision !== undefined) {
      if (format === 'decimal') {
        value = this._addZeroes(value, formatConfig.precision);
      } else {
        value = formatConfig.precision === null ? value.toPrecision() : (0, _utils.toFixed)(value, formatConfig.precision);
      }
    }
    if (format !== 'decimal') {
      value = this._addGroupSeparators(value);
    } else {
      value = value.toString().replace('.', (0, _config.default)().decimalSeparator);
    }
    if (format === 'percent') {
      value += '%';
    }
    return value;
  },
  _normalizeFormat: function (format) {
    if (!format) {
      return {};
    }
    if (typeof format === 'function') {
      return format;
    }
    if (!(0, _type.isPlainObject)(format)) {
      format = {
        type: format
      };
    }
    return format;
  },
  _getSeparators: function () {
    return {
      decimalSeparator: this.getDecimalSeparator(),
      thousandsSeparator: this.getThousandsSeparator()
    };
  },
  getThousandsSeparator: function () {
    return this.format(10000, 'fixedPoint')[2];
  },
  getDecimalSeparator: function () {
    return this.format(1.2, {
      type: 'fixedPoint',
      precision: 1
    })[1];
  },
  convertDigits: function (value, toStandard) {
    const digits = this.format(90, 'decimal');
    if (typeof value !== 'string' || digits[1] === '0') {
      return value;
    }
    const fromFirstDigit = toStandard ? digits[1] : '0';
    const toFirstDigit = toStandard ? '0' : digits[1];
    const fromLastDigit = toStandard ? digits[0] : '9';
    const regExp = new RegExp('[' + fromFirstDigit + '-' + fromLastDigit + ']', 'g');
    return value.replace(regExp, char => {
      return String.fromCharCode(char.charCodeAt(0) + (toFirstDigit.charCodeAt(0) - fromFirstDigit.charCodeAt(0)));
    });
  },
  getNegativeEtalonRegExp: function (format) {
    const separators = this._getSeparators();
    const digitalRegExp = new RegExp('[0-9' + (0, _common.escapeRegExp)(separators.decimalSeparator + separators.thousandsSeparator) + ']+', 'g');
    const specialCharacters = ['\\', '(', ')', '[', ']', '*', '+', '$', '^', '?', '|', '{', '}'];
    let negativeEtalon = this.format(-1, format).replace(digitalRegExp, '1');
    specialCharacters.forEach(char => {
      negativeEtalon = negativeEtalon.replace(new RegExp("\\".concat(char), 'g'), "\\".concat(char));
    });
    negativeEtalon = negativeEtalon.replace(/ /g, '\\s');
    negativeEtalon = negativeEtalon.replace(/1/g, '.*');
    return new RegExp(negativeEtalon, 'g');
  },
  getSign: function (text, format) {
    if (!format) {
      if (text.replace(/[^0-9-]/g, '').charAt(0) === '-') {
        return -1;
      }
      return 1;
    }
    const negativeEtalon = this.getNegativeEtalonRegExp(format);
    return text.match(negativeEtalon) ? -1 : 1;
  },
  format: function (value, format) {
    if (typeof value !== 'number') {
      return value;
    }
    if (typeof format === 'number') {
      return value;
    }
    format = format && format.formatter || format;
    if (typeof format === 'function') {
      return format(value);
    }
    format = this._normalizeFormat(format);
    if (!format.type) {
      format.type = 'decimal';
    }
    const numberConfig = this._parseNumberFormatString(format.type);
    if (!numberConfig) {
      const formatterConfig = this._getSeparators();
      formatterConfig.unlimitedIntegerDigits = format.unlimitedIntegerDigits;
      return this.convertDigits((0, _number.getFormatter)(format.type, formatterConfig)(value));
    }
    return this._formatNumber(value, numberConfig, format);
  },
  parse: function (text, format) {
    if (!text) {
      return;
    }
    if (format && format.parser) {
      return format.parser(text);
    }
    text = this.convertDigits(text, true);
    if (format && typeof format !== 'string') {
      // Current parser functionality provided as-is and is independent of the most of capabilities of formatter.
      _errors.default.log('W0011');
    }
    const decimalSeparator = this.getDecimalSeparator();
    const regExp = new RegExp('[^0-9' + (0, _common.escapeRegExp)(decimalSeparator) + ']', 'g');
    const cleanedText = text.replace(regExp, '').replace(decimalSeparator, '.').replace(/\.$/g, '');
    if (cleanedText === '.' || cleanedText === '') {
      return null;
    }
    if (this._calcSignificantDigits(cleanedText) > 15) {
      return NaN;
    }
    let parsed = +cleanedText * this.getSign(text, format);
    format = this._normalizeFormat(format);
    const formatConfig = this._parseNumberFormatString(format.type);
    let power = formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.power;
    if (power) {
      if (power === 'auto') {
        const match = text.match(/\d(K|M|B|T)/);
        if (match) {
          power = Object.keys(LargeNumberFormatPostfixes).find(power => {
            return LargeNumberFormatPostfixes[power] === match[1];
          });
        }
      }
      parsed = parsed * Math.pow(10, 3 * power);
    }
    if ((formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.formatType) === 'percent') {
      parsed /= 100;
    }
    return parsed;
  },
  _calcSignificantDigits: function (text) {
    const [integer, fractional] = text.split('.');
    const calcDigitsAfterLeadingZeros = digits => {
      let index = -1;
      for (let i = 0; i < digits.length; i++) {
        if (digits[i] !== '0') {
          index = i;
          break;
        }
      }
      return index > -1 ? digits.length - index : 0;
    };
    let result = 0;
    if (integer) {
      result += calcDigitsAfterLeadingZeros(integer.split(''));
    }
    if (fractional) {
      result += calcDigitsAfterLeadingZeros(fractional.split('').reverse());
    }
    return result;
  }
});
numberLocalization.inject(_currency.default);
if (hasIntl) {
  numberLocalization.inject(_number2.default);
}
var _default = numberLocalization;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;