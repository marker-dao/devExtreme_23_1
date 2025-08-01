/**
* DevExtreme (esm/__internal/core/utils/m_version.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function compare(x, y, maxLevel) {
  function normalizeArg(value) {
    if (typeof value === 'string') {
      return value.split('.');
    }
    if (typeof value === 'number') {
      return [value];
    }
    return value;
  }
  x = normalizeArg(x);
  y = normalizeArg(y);
  let length = Math.max(x.length, y.length);
  if (isFinite(maxLevel)) {
    length = Math.min(length, maxLevel);
  }
  for (let i = 0; i < length; i++) {
    const xItem = parseInt(x[i] || 0, 10);
    const yItem = parseInt(y[i] || 0, 10);
    if (xItem < yItem) {
      return -1;
    }
    if (xItem > yItem) {
      return 1;
    }
  }
  return 0;
}
