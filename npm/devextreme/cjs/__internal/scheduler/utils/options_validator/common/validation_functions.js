/**
* DevExtreme (cjs/__internal/scheduler/utils/options_validator/common/validation_functions.js)
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
exports.lessThan = exports.isInteger = exports.inRange = exports.greaterThan = exports.divisibleBy = void 0;
const isInteger = value => Number.isInteger(value);
exports.isInteger = isInteger;
const greaterThan = function (value, minimalValue) {
  let strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value > minimalValue : value >= minimalValue;
};
exports.greaterThan = greaterThan;
const lessThan = function (value, maximalValue) {
  let strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value < maximalValue : value <= maximalValue;
};
exports.lessThan = lessThan;
const inRange = (value, _ref) => {
  let [from, to] = _ref;
  return value >= from && value <= to;
};
exports.inRange = inRange;
const divisibleBy = (value, divider) => value % divider === 0;
exports.divisibleBy = divisibleBy;
