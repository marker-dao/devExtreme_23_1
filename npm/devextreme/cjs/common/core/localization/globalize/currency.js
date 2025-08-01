/**
* DevExtreme (cjs/common/core/localization/globalize/currency.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _open_xml_currency_format = _interopRequireDefault(require("../open_xml_currency_format"));
require("./core");
require("./number");
require("../currency");
require("globalize/currency");
var _globalize = _interopRequireDefault(require("globalize"));
var _common = require("../../../../common");
var _number2 = _interopRequireDefault(require("../number"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports, import/no-unresolved

// eslint-disable-next-line no-restricted-imports

const CURRENCY_STYLES = ['symbol', 'accounting'];
if (_globalize.default && _globalize.default.formatCurrency) {
  if (_globalize.default.locale().locale === 'en') {
    _globalize.default.locale('en');
  }
  const formattersCache = {};
  const getFormatter = (currency, format) => {
    let formatter;
    let formatCacheKey;
    if (typeof format === 'object') {
      formatCacheKey = _globalize.default.locale().locale + ':' + currency + ':' + JSON.stringify(format);
    } else {
      formatCacheKey = _globalize.default.locale().locale + ':' + currency + ':' + format;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = formattersCache[formatCacheKey] = _globalize.default.currencyFormatter(currency, format);
    }
    return formatter;
  };
  const globalizeCurrencyLocalization = {
    _formatNumberCore: function (value, format, formatConfig) {
      if (format === 'currency') {
        const currency = formatConfig && formatConfig.currency || (0, _common.config)().defaultCurrency;
        return getFormatter(currency, this._normalizeFormatConfig(format, formatConfig, value))(value);
      }
      return this.callBase.apply(this, arguments);
    },
    _normalizeFormatConfig: function (format, formatConfig, value) {
      const normalizedConfig = this.callBase(format, formatConfig, value);
      if (format === 'currency') {
        const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? (0, _common.config)().defaultUseCurrencyAccountingStyle;
        normalizedConfig.style = CURRENCY_STYLES[+useAccountingStyle];
      }
      return normalizedConfig;
    },
    format: function (value, format) {
      if (typeof value !== 'number') {
        return value;
      }
      format = this._normalizeFormat(format);
      if (format) {
        if (format.currency === 'default') {
          format.currency = (0, _common.config)().defaultCurrency;
        }
        if (format.type === 'currency') {
          return this._formatNumber(value, this._parseNumberFormatString('currency'), format);
        } else if (!format.type && format.currency) {
          return getFormatter(format.currency, format)(value);
        }
      }
      return this.callBase.apply(this, arguments);
    },
    getCurrencySymbol: function (currency) {
      if (!currency) {
        currency = (0, _common.config)().defaultCurrency;
      }
      return _globalize.default.cldr.main('numbers/currencies/' + currency);
    },
    getOpenXmlCurrencyFormat: function (currency) {
      const currencySymbol = this.getCurrencySymbol(currency).symbol;
      const accountingFormat = _globalize.default.cldr.main('numbers/currencyFormats-numberSystem-latn').accounting;
      return (0, _open_xml_currency_format.default)(currencySymbol, accountingFormat);
    }
  };
  _number2.default.inject(globalizeCurrencyLocalization);
}
