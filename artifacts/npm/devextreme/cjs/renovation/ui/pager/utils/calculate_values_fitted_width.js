/**
* DevExtreme (cjs/renovation/ui/pager/utils/calculate_values_fitted_width.js)
* Version: 23.2.2
* Build date: Mon Nov 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.calculateValuesFittedWidth = calculateValuesFittedWidth;
exports.oneDigitWidth = void 0;
const oneDigitWidth = 10;
exports.oneDigitWidth = oneDigitWidth;
function calculateValuesFittedWidth(minWidth, values) {
  return minWidth + oneDigitWidth * Math.max(...values).toString().length;
}
