/**
* DevExtreme (cjs/renovation/utils/shallow_equals.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.shallowEquals = void 0;
const shallowEquals = (firstObject, secondObject) => {
  if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
    return false;
  }
  return Object.keys(firstObject).every(key => firstObject[key] === secondObject[key]);
};
exports.shallowEquals = shallowEquals;