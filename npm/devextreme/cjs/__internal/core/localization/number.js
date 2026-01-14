/**
* DevExtreme (cjs/__internal/core/localization/number.js)
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
var _config = _interopRequireDefault(require("../../../core/config"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _currency = _interopRequireDefault(require("../../core/localization/currency"));
var _number = _interopRequireDefault(require("../../core/localization/intl/number"));
var _number2 = require("../../core/localization/ldml/number");
var _utils = require("../../core/localization/utils");
var _m_common = require("../../core/utils/m_common");
var _m_dependency_injector = require("../../core/utils/m_dependency_injector");
var _m_iterator = require("../../core/utils/m_iterator");
var _m_type = require("../../core/utils/m_type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const hasIntl = typeof Intl !== 'undefined';
const MAX_LARGE_NUMBER_POWER = 4;
const DECIMAL_BASE = 10;
const NUMERIC_FORMATS = ['currency', 'fixedpoint', 'exponential', 'percent', 'decimal'];
const LargeNumberFormatPostfixes = {
  1: 'K',
  2: 'M',
  3: 'B',
  4: 'T' // tera
};
const LargeNumberFormatPowers = {
  // eslint-disable-next-line spellcheck/spell-checker
  largenumber: 'auto',
  thousands: 1,
  millions: 2,
  billions: 3,
  trillions: 4
};
const numberLocalization = (0, _m_dependency_injector.injector)({
  engine() {
    return 'base';
  },
  numericFormats: NUMERIC_FORMATS,
  defaultLargeNumberFormatPostfixes: LargeNumberFormatPostfixes,
  _parseNumberFormatString(formatType) {
    const formatObject = {};
    if (!formatType || typeof formatType !== 'string') {
      return undefined;
    }
    const formatList = formatType.toLowerCase().split(' ');
    (0, _m_iterator.each)(formatList, (_, value) => {
      if (NUMERIC_FORMATS.includes(value)) {
        formatObject.formatType = value;
      } else if (value in LargeNumberFormatPowers) {
        formatObject.power = LargeNumberFormatPowers[value];
      }
    });
    if (formatObject.power && !formatObject.formatType) {
      formatObject.formatType = 'fixedpoint';
    }
    const hasFormatType = rule => 'formatType' in rule;
    if (hasFormatType(formatObject) && formatObject.formatType) {
      return formatObject;
    }
    return undefined;
  },
  _calculateNumberPower(value, base, minPower, maxPower) {
    let number = Math.abs(value);
    let power = 0;
    if (number > 1) {
      while (number && number >= base && (maxPower === undefined || power < maxPower)) {
        power += 1;
        number /= base;
      }
    } else if (number > 0 && number < 1) {
      while (number < 1 && (minPower === undefined || power > minPower)) {
        power -= 1;
        number *= base;
      }
    }
    return power;
  },
  _getNumberByPower(number, power, base) {
    let result = number;
    while (power > 0) {
      result /= base;
      power -= 1;
    }
    while (power < 0) {
      result *= base;
      power += 1;
    }
    return result;
  },
  _formatNumber(value, formatObject, formatConfig) {
    if (formatObject.power === 'auto') {
      formatObject.power = this._calculateNumberPower(value, 1000, 0, MAX_LARGE_NUMBER_POWER);
    }
    if (formatObject.power) {
      value = this._getNumberByPower(value, formatObject.power, 1000);
    }
    const powerPostfix = formatObject.power ? this.defaultLargeNumberFormatPostfixes[formatObject.power] || '' : '';
    let result = this._formatNumberCore(value, formatObject.formatType, formatConfig);
    result = result.replace(/(\d|.$)(\D*)$/, `$1${powerPostfix}$2`);
    return result;
  },
  _formatNumberExponential(value, formatConfig) {
    let power = this._calculateNumberPower(value, DECIMAL_BASE);
    let number = this._getNumberByPower(value, power, DECIMAL_BASE);
    if (formatConfig.precision === undefined) {
      formatConfig.precision = 1;
    }
    // @ts-expect-error
    if (number.toFixed(formatConfig.precision || 0) >= DECIMAL_BASE) {
      power += 1;
      number /= DECIMAL_BASE;
    }
    const powString = (power >= 0 ? '+' : '') + power.toString();
    return `${this._formatNumberCore(number, 'fixedpoint', formatConfig)}E${powString}`;
  },
  _addZeroes(value, precision) {
    const multiplier = 10 ** precision;
    const sign = value < 0 ? '-' : '';
    // eslint-disable-next-line no-bitwise
    value = (Math.abs(value) * multiplier >>> 0) / multiplier;
    let result = value.toString();
    while (result.length < precision) {
      result = `0${result}`;
    }
    return sign + result;
  },
  _addGroupSeparators(value) {
    const parts = value.toString().split('.');
    // @ts-expect-error
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, (0, _config.default)().thousandsSeparator) + (parts[1] ? (0, _config.default)().decimalSeparator + parts[1] : '');
  },
  _formatNumberCore(value, format, formatConfig) {
    if (format === 'exponential') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._formatNumberExponential(value, formatConfig);
    }
    if (format !== 'decimal' && formatConfig.precision !== null) {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      formatConfig.precision = formatConfig.precision || 0;
    }
    if (format === 'percent') {
      value *= 100;
    }
    let result = `${value}`;
    if (formatConfig.precision !== undefined) {
      if (format === 'decimal') {
        result = this._addZeroes(value, formatConfig.precision);
      } else {
        result = formatConfig.precision === null ? value.toPrecision() : (0, _utils.toFixed)(value, formatConfig.precision);
      }
    }
    if (format !== 'decimal') {
      result = this._addGroupSeparators(result);
    } else {
      // @ts-expect-error
      result = result.toString().replace('.', (0, _config.default)().decimalSeparator);
    }
    if (format === 'percent') {
      result += '%';
    }
    return result;
  },
  _normalizeFormat(format) {
    if (!format) {
      return {};
    }
    if (typeof format === 'function') {
      return format;
    }
    if (!(0, _m_type.isPlainObject)(format)) {
      format = {
        // @ts-expect-error
        type: format
      };
    }
    // @ts-expect-error
    return format;
  },
  _getSeparators() {
    return {
      decimalSeparator: this.getDecimalSeparator(),
      thousandsSeparator: this.getThousandsSeparator()
    };
  },
  getThousandsSeparator() {
    return this.format(10000, 'fixedPoint')[2];
  },
  getDecimalSeparator() {
    return this.format(1.2, {
      type: 'fixedPoint',
      precision: 1
    })[1];
  },
  convertDigits(value, toStandard) {
    const digits = this.format(90, 'decimal');
    if (typeof value !== 'string' || digits[1] === '0') {
      return value;
    }
    const fromFirstDigit = toStandard ? digits[1] : '0';
    const toFirstDigit = toStandard ? '0' : digits[1];
    const fromLastDigit = toStandard ? digits[0] : '9';
    const regExp = new RegExp(`[${fromFirstDigit}-${fromLastDigit}]`, 'g');
    // eslint-disable-next-line @stylistic/max-len
    return value.replace(regExp, char => String.fromCharCode(char.charCodeAt(0) + (toFirstDigit.charCodeAt(0) - fromFirstDigit.charCodeAt(0))));
  },
  getNegativeEtalonRegExp(format) {
    const separators = this._getSeparators();
    const digitalRegExp = new RegExp(`[0-9${(0, _m_common.escapeRegExp)(separators.decimalSeparator + separators.thousandsSeparator)}]+`, 'g');
    const specialCharacters = ['\\', '(', ')', '[', ']', '*', '+', '$', '^', '?', '|', '{', '}'];
    let negativeEtalon = this.format(-1, format).replace(digitalRegExp, '1');
    specialCharacters.forEach(char => {
      negativeEtalon = negativeEtalon.replace(new RegExp(`\\${char}`, 'g'), `\\${char}`);
    });
    negativeEtalon = negativeEtalon.replace(/ /g, '\\s');
    negativeEtalon = negativeEtalon.replace(/1/g, '.*');
    return new RegExp(negativeEtalon, 'g');
  },
  getSign(text, format) {
    if (!format) {
      if (text.replace(/[^0-9-]/g, '').startsWith('-')) {
        return -1;
      }
      return 1;
    }
    const negativeEtalon = this.getNegativeEtalonRegExp(format);
    return text.match(negativeEtalon) ? -1 : 1;
  },
  format(value, format) {
    var _format;
    if (typeof value !== 'number') {
      return value;
    }
    if (typeof format === 'number') {
      return value;
    }
    // @ts-expect-error
    format = ((_format = format) === null || _format === void 0 ? void 0 : _format.formatter) || format;
    if (typeof format === 'function') {
      return format(value);
    }
    format = this._normalizeFormat(format);
    if (!format.type) {
      format.type = 'decimal';
    }
    // eslint-disable-next-line @stylistic/max-len
    const numberConfig = this._parseNumberFormatString(format.type);
    if (!numberConfig) {
      const formatterConfig = this._getSeparators();
      formatterConfig.unlimitedIntegerDigits = format.unlimitedIntegerDigits;
      // @ts-expect-error
      const formattedValue = (0, _number2.getFormatter)(format.type, formatterConfig)(value);
      return this.convertDigits(formattedValue);
    }
    return this._formatNumber(value, numberConfig, format);
  },
  parse(text, format) {
    var _format2;
    if (!text) {
      return undefined;
    }
    if (typeof format !== 'string' && (_format2 = format) !== null && _format2 !== void 0 && _format2.parser) {
      return format.parser(text);
    }
    text = this.convertDigits(text, true);
    if (format && typeof format !== 'string') {
      // Current parser functionality provided as-is and
      // is independent of the most of capabilities of formatter.
      _errors.default.log('W0011');
    }
    const decimalSeparator = this.getDecimalSeparator();
    const regExp = new RegExp(`[^0-9${(0, _m_common.escapeRegExp)(decimalSeparator)}]`, 'g');
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
        const match = /\d(K|M|B|T)/.exec(text);
        if (match) {
          power = Object.keys(LargeNumberFormatPostfixes).map(Number).find(p => LargeNumberFormatPostfixes[p] === match[1]);
        }
      }
      // @ts-expect-error
      parsed *= 10 ** (3 * power);
    }
    if ((formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.formatType) === 'percent') {
      parsed /= 100;
    }
    return parsed;
  },
  _calcSignificantDigits(text) {
    const [integer, fractional] = text.split('.');
    const calcDigitsAfterLeadingZeros = digits => {
      let index = -1;
      for (let i = 0; i < digits.length; i += 1) {
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
  numberLocalization.inject(_number.default);
}
var _default = exports.default = numberLocalization;
