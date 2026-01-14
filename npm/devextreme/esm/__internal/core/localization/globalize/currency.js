/**
* DevExtreme (esm/__internal/core/localization/globalize/currency.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../../core/localization/globalize/core';
import '../../../core/localization/globalize/number';
import '../../../core/localization/currency';
import 'globalize/currency';
import config from '../../../../core/config';
import numberLocalization from '../../../core/localization/number';
import openXmlCurrencyFormat from '../../../core/localization/open_xml_currency_format';
// eslint-disable-next-line import/no-extraneous-dependencies
import Globalize from 'globalize';
const CURRENCY_STYLES = ['symbol', 'accounting'];
if (Globalize !== null && Globalize !== void 0 && Globalize.formatCurrency) {
  if (Globalize.locale().locale === 'en') {
    Globalize.locale('en');
  }
  const formattersCache = {};
  const getFormatter = (currency, format) => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatCacheKey;
    if (typeof format === 'object') {
      formatCacheKey = `${Globalize.locale().locale}:${currency}:${JSON.stringify(format)}`;
    } else {
      formatCacheKey = `${Globalize.locale().locale}:${currency}:${format}`;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = Globalize.currencyFormatter(currency, format);
      formattersCache[formatCacheKey] = formatter;
    }
    return formatter;
  };
  const globalizeCurrencyLocalization = {
    _formatNumberCore(value, format, formatConfig) {
      if (format === 'currency') {
        const currency = (formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.currency) ?? config().defaultCurrency;
        return getFormatter(currency, this._normalizeFormatConfig(format, formatConfig, value))(value);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase.apply(this, [value, format, formatConfig]);
    },
    _normalizeFormatConfig(format, formatConfig, value) {
      const normalizedConfig = this.callBase.apply(this, [format, formatConfig, value]);
      if (format === 'currency') {
        const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? config().defaultUseCurrencyAccountingStyle;
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
          format.currency = config().defaultCurrency;
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
        currency = config().defaultCurrency;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return Globalize.cldr.main(`numbers/currencies/${currency}`);
    },
    getOpenXmlCurrencyFormat(currency) {
      const currencySymbol = this.getCurrencySymbol(currency).symbol;
      const accountingFormat = Globalize.cldr.main('numbers/currencyFormats-numberSystem-latn').accounting;
      return openXmlCurrencyFormat(currencySymbol, accountingFormat);
    }
  };
  numberLocalization.inject(globalizeCurrencyLocalization);
}
