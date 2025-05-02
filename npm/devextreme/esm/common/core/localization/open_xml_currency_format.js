/**
* DevExtreme (esm/common/core/localization/open_xml_currency_format.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export default (currencySymbol, accountingFormat) => {
  if (!accountingFormat) {
    return;
  }
  let encodedCurrencySymbol = currencySymbol;
  if (typeof currencySymbol === 'string') {
    encodedCurrencySymbol = '';
    for (let i = 0; i < currencySymbol.length; i++) {
      if (currencySymbol[i] !== '$') {
        encodedCurrencySymbol += '\\';
      }
      encodedCurrencySymbol += currencySymbol[i];
    }
  }
  const encodeSymbols = {
    '.00': '{0}',
    '\'': '\\\'',
    '\\(': '\\(',
    '\\)': '\\)',
    ' ': '\\ ',
    '"': '&quot;',
    '\\¤': encodedCurrencySymbol
  };
  const result = accountingFormat.split(';');
  for (let i = 0; i < result.length; i++) {
    for (const symbol in encodeSymbols) {
      if (Object.prototype.hasOwnProperty.call(encodeSymbols, symbol)) {
        result[i] = result[i].replace(new RegExp(symbol, 'g'), encodeSymbols[symbol]);
      }
    }
  }
  return result.length === 2 ? result[0] + '_);' + result[1] : result[0];
};
