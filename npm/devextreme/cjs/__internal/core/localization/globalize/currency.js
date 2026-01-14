/**
* DevExtreme (cjs/__internal/core/localization/globalize/currency.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

require("../../../core/localization/globalize/core");
require("../../../core/localization/globalize/number");
require("../../../core/localization/currency");
require("globalize/currency");
var _config = _interopRequireDefault(require("../../../../core/config"));
var _number2 = _interopRequireDefault(require("../../../core/localization/number"));
var _open_xml_currency_format = _interopRequireDefault(require("../../../core/localization/open_xml_currency_format"));
var _globalize = _interopRequireDefault(require("globalize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

const CURRENCY_STYLES = ['symbol', 'accounting'];
if (_globalize.default !== null && _globalize.default !== void 0 && _globalize.default.formatCurrency) {
  if (_globalize.default.locale().locale === 'en') {
    _globalize.default.locale('en');
  }
  const formattersCache = {};
  const getFormatter = (currency, format) => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatCacheKey;
    if (typeof format === 'object') {
      formatCacheKey = `${_globalize.default.locale().locale}:${currency}:${JSON.stringify(format)}`;
    } else {
      formatCacheKey = `${_globalize.default.locale().locale}:${currency}:${format}`;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = _globalize.default.currencyFormatter(currency, format);
      formattersCache[formatCacheKey] = formatter;
    }
    return formatter;
  };
  const globalizeCurrencyLocalization = {
    _formatNumberCore(value, format, formatConfig) {
      if (format === 'currency') {
        const currency = (formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.currency) ?? (0, _config.default)().defaultCurrency;
        return getFormatter(currency, this._normalizeFormatConfig(format, formatConfig, value))(value);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase.apply(this, [value, format, formatConfig]);
    },
    _normalizeFormatConfig(format, formatConfig, value) {
      const normalizedConfig = this.callBase.apply(this, [format, formatConfig, value]);
      if (format === 'currency') {
        const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? (0, _config.default)().defaultUseCurrencyAccountingStyle;
        // @ts-expect-error
        normalizedConfig.style = CURRENCY_STYLES[+useAccountingStyle];
      }
      return normalizedConfig;
    },
    format(value, format) {
      if (typeof value !== 'number') {
        return value;
      }
      // eslint-disable-next-line no-param-reassign
      format = this._normalizeFormat(format);
      if (format) {
        if (format.currency === 'default') {
          format.currency = (0, _config.default)().defaultCurrency;
        }
        if (format.type === 'currency') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return this._formatNumber(value, this._parseNumberFormatString('currency'), format);
        }
        if (!format.type && format.currency) {
          return getFormatter(format.currency, format)(value);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase.apply(this, [value, format]);
    },
    getCurrencySymbol(currency) {
      if (!currency) {
        // eslint-disable-next-line no-param-reassign
        currency = (0, _config.default)().defaultCurrency;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _globalize.default.cldr.main(`numbers/currencies/${currency}`);
    },
    getOpenXmlCurrencyFormat(currency) {
      const currencySymbol = this.getCurrencySymbol(currency).symbol;
      const accountingFormat = _globalize.default.cldr.main('numbers/currencyFormats-numberSystem-latn').accounting;
      return (0, _open_xml_currency_format.default)(currencySymbol, accountingFormat);
    }
  };
  _number2.default.inject(globalizeCurrencyLocalization);
}
