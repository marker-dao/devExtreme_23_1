/**
* DevExtreme (esm/__internal/ui/number_box/m_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { adjust } from '../../../core/utils/math';
const getRealSeparatorIndex = function (str) {
  let quoteBalance = 0;
  let separatorCount = 0;
  for (let i = 0; i < str.length; ++i) {
    if (str[i] === '\'') {
      quoteBalance++;
    }
    if (str[i] === '.') {
      ++separatorCount;
      if (quoteBalance % 2 === 0) {
        return {
          occurrence: separatorCount,
          index: i
        };
      }
    }
  }
  return {
    occurrence: 1,
    index: -1
  };
};
const getNthOccurrence = function (str, c, n) {
  let i = -1;
  while (n-- && i++ < str.length) {
    i = str.indexOf(c, i);
  }
  return i;
};
const splitByIndex = function (str, index) {
  if (index === -1) {
    return [str];
  }
  return [str.slice(0, index), str.slice(index + 1)];
};
const adjustPercentValue = function (rawValue, precision) {
  return rawValue && adjust(rawValue / 100, precision);
};
export { adjustPercentValue, getNthOccurrence, getRealSeparatorIndex, splitByIndex };
