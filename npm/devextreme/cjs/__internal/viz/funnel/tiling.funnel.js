/**
* DevExtreme (cjs/__internal/viz/funnel/tiling.funnel.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable @stylistic/no-mixed-operators */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
const CENTER = 0.5;
var _default = exports.default = {
  getFigures(data) {
    const height = 1 / data.length;
    return data.map((value, index, array) => {
      const nextValue = array[index + 1] ? array[index + 1] : array[index];
      return [CENTER - value / 2, height * index, CENTER + value / 2, height * index, CENTER + nextValue / 2, height * (index + 1), CENTER - nextValue / 2, height * (index + 1)];
    });
  },
  normalizeValues(items) {
    // eslint-disable-next-line @stylistic/max-len
    const max = items.reduce((max, item) => Math.max(item.value, max), items[0] && items[0].value || 0);
    return items.map(item => item.value / max);
  }
};
