/**
* DevExtreme (cjs/__internal/pagination/utils/calculate_values_fitted_width.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateValuesFittedWidth = calculateValuesFittedWidth;
exports.oneDigitWidth = void 0;
const oneDigitWidth = exports.oneDigitWidth = 10;
function calculateValuesFittedWidth(minWidth, values) {
  return minWidth + oneDigitWidth * Math.max(...values).toString().length;
}
