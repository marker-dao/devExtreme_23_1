/**
* DevExtreme (esm/common/core/localization/currency.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
export default {
  _formatNumberCore: function (value, format, formatConfig) {
    if (format === 'currency') {
      formatConfig.precision = formatConfig.precision || 0;
      let result = this.format(value, extend({}, formatConfig, {
        type: 'fixedpoint'
      }));
      const currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, '$$$$');
      result = result.replace(/^(\D*)(\d.*)/, '$1' + currencyPart + '$2');
      return result;
    }
    return this.callBase.apply(this, arguments);
  },
  getCurrencySymbol: function () {
    return {
      symbol: '$'
    };
  },
  getOpenXmlCurrencyFormat: function () {
    return '$#,##0{0}_);\\($#,##0{0}\\)';
  }
};
