/**
* DevExtreme (cjs/common/core/localization/currency.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _extend = require("../../../core/utils/extend");
var _default = exports.default = {
  _formatNumberCore: function (value, format, formatConfig) {
    if (format === 'currency') {
      formatConfig.precision = formatConfig.precision || 0;
      let result = this.format(value, (0, _extend.extend)({}, formatConfig, {
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
module.exports = exports.default;
module.exports.default = exports.default;
