/**
* DevExtreme (cjs/__internal/core/localization/currency.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  _formatNumberCore(value, format, formatConfig) {
    if (format === 'currency') {
      formatConfig.precision = formatConfig.precision ?? 0;
      let result = this.format(value, Object.assign({}, formatConfig, {
        type: 'fixedpoint'
      }));
      const currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, '$$$$');
      result = result.replace(/^(\D*)(\d.*)/, `$1${currencyPart}$2`);
      return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.callBase.apply(this, [value, format, formatConfig]);
  },
  getCurrencySymbol() {
    return {
      symbol: '$'
    };
  },
  getOpenXmlCurrencyFormat() {
    return '$#,##0{0}_);\\($#,##0{0}\\)';
  }
};
