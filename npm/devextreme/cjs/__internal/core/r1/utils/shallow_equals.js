/**
* DevExtreme (cjs/__internal/core/r1/utils/shallow_equals.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowEquals = void 0;
const shallowEquals = (firstObject, secondObject) => {
  if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
    return false;
  }
  return Object.entries(firstObject).every(_ref => {
    let [key, firstValue] = _ref;
    const secondValue = secondObject[key];
    if (firstValue instanceof Date && secondValue instanceof Date) {
      return firstValue.getTime() === secondValue.getTime();
    }
    return firstValue === secondValue;
  });
};
exports.shallowEquals = shallowEquals;
