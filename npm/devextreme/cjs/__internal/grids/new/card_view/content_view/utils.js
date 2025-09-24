/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factors = factors;
function factors(n) {
  const res = [];
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) {
      res.push(i);
    }
  }
  return res;
}
