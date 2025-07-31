/**
* DevExtreme (cjs/__internal/exporter/exceljs/export_format.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportFormat = void 0;
require("../../../common/core/localization/currency");
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _language_codes = require("../../../common/core/localization/language_codes");
var _date2 = require("../../../common/core/localization/ldml/date.format");
var _number = _interopRequireDefault(require("../../../common/core/localization/number"));
var _extend = require("../../../core/utils/extend");
var _string = require("../../../core/utils/string");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable spellcheck/spell-checker */

const ARABIC_ZERO_CODE = 1632;
const DEFINED_NUMBER_FORMTATS = {
  thousands: '#,##0{0},&quot;K&quot;',
  millions: '#,##0{0},,&quot;M&quot;',
  billions: '#,##0{0},,,&quot;B&quot;',
  trillions: '#,##0{0},,,,&quot;T&quot;',
  percent: '0{0}%',
  decimal: '#{0}',
  fixedpoint: '#,##0{0}',
  exponential: '0{0}E+00',
  currency: ' '
};
const PERIOD_REGEXP = /a+/g;
const DAY_REGEXP = /E/g;
const DO_REGEXP = /dE+/g;
const STANDALONE_MONTH_REGEXP = /L/g;
const HOUR_REGEXP = /h/g;
const ANY_REGEXP = /./g;
function _applyPrecision(format, precision) {
  let result;
  let i;
  if (precision > 0) {
    result = format !== 'decimal' ? '.' : '';
    for (i = 0; i < precision; i += 1) {
      result += '0';
    }
    return result;
  }
  return '';
}
function _hasArabicDigits(text) {
  let code;
  for (let i = 0; i < text.length; i += 1) {
    code = text.charCodeAt(i);
    if (code >= ARABIC_ZERO_CODE && code < ARABIC_ZERO_CODE + 10) {
      return true;
    }
  }
  return false;
}
function _convertDateFormat(format) {
  const formattedValue = (_date.default.format(new Date(2009, 8, 8, 6, 5, 4), format) || '').toString();
  let result = (0, _date2.getFormat)(value => _date.default.format(value, format));
  if (result) {
    result = _convertDateFormatToOpenXml(result);
    result = _getLanguageInfo(formattedValue) + result;
  }
  return result;
}
function _getLanguageInfo(defaultPattern) {
  const languageID = (0, _language_codes.getLanguageId)();
  let languageIDStr = languageID ? languageID.toString(16) : '';
  let languageInfo = '';
  if (_hasArabicDigits(defaultPattern)) {
    while (languageIDStr.length < 3) {
      languageIDStr = `0${languageIDStr}`;
    }
    languageInfo = `[$-2010${languageIDStr}]`;
  } else if (languageIDStr) {
    languageInfo = `[$-${languageIDStr}]`;
  }
  return languageInfo;
}
function _convertDateFormatToOpenXml(format) {
  return format.split('/').join('\\/').split('\'').map((datePart, index) => {
    if (index % 2 === 0) {
      return datePart.replace(PERIOD_REGEXP, 'AM/PM').replace(DO_REGEXP, 'd').replace(DAY_REGEXP, 'd').replace(STANDALONE_MONTH_REGEXP, 'M').replace(HOUR_REGEXP, 'H').split('[').join('\\[').split(']').join('\\]');
    }
    if (datePart) {
      return datePart.replace(ANY_REGEXP, '\\$&');
    }
    return '\'';
  }).join('');
}
function _convertNumberFormat(format, precision, currency) {
  let result;
  let excelFormat;
  if (format === 'currency') {
    excelFormat = _number.default.getOpenXmlCurrencyFormat(currency);
  } else {
    excelFormat = DEFINED_NUMBER_FORMTATS[format.toLowerCase()];
  }
  if (excelFormat) {
    result = (0, _string.format)(excelFormat, _applyPrecision(format, precision));
  }
  return result;
}
function _hasCSVInjection(value) {
  if (!value || value.length < 2) {
    return false;
  }
  return _includesCSVExpression(value);
}
function _hasCSVQuotedInjection(value, textQualifier) {
  if (!value || value.length < 4 || value[0] !== textQualifier) {
    return false;
  }
  return _includesCSVExpression(value.substring(1, value.length - 1));
}
function _includesCSVExpression(value) {
  const injectionPrefix = /^[@=\t\r]/;
  const possibleInjectionPrefix = /^[+-]/;
  if (!value) {
    return false;
  }
  if (injectionPrefix.test(value)) {
    return true;
  }
  if (!possibleInjectionPrefix.test(value)) {
    return false;
  }
  return !(0, _type.isNumeric)(value);
}
const ExportFormat = exports.ExportFormat = {
  formatObjectConverter(format, dataType) {
    const result = {
      format,
      precision: format === null || format === void 0 ? void 0 : format.precision,
      dataType
    };
    if ((0, _type.isObject)(format)) {
      return (0, _extend.extend)(result, format, {
        // @ts-expect-error
        format: format.formatter || format.type,
        // @ts-expect-error
        currency: format.currency
      });
    }
    return result;
  },
  convertFormat(format, precision, type, currency) {
    if ((0, _type.isDefined)(format)) {
      if (type === 'date') {
        return _convertDateFormat(format);
      }
      if ((0, _type.isString)(format) && DEFINED_NUMBER_FORMTATS[format.toLowerCase()]) {
        return _convertNumberFormat(format, precision, currency);
      }
    }
  },
  encode(value) {
    const textQualifier = '"';
    let escaped = false;
    if (_hasCSVInjection(value)) {
      escaped = true;
    } else if (_hasCSVQuotedInjection(value, textQualifier)) {
      value = value.substring(1, value.length - 1);
      escaped = true;
    }
    if (escaped) {
      const singleTextQualifier = textQualifier;
      const escapedTextQualifier = `${textQualifier}${textQualifier}`;
      return `${textQualifier}'${value.replaceAll(singleTextQualifier, escapedTextQualifier)}${textQualifier}`;
    }
    return value;
  }
};
