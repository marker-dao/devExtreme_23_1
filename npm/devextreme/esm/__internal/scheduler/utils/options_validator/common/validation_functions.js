/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/common/validation_functions.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const isInteger = value => Number.isInteger(value);
export const greaterThan = function (value, minimalValue) {
  let strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value > minimalValue : value >= minimalValue;
};
export const lessThan = function (value, maximalValue) {
  let strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value < maximalValue : value <= maximalValue;
};
export const inRange = (value, _ref) => {
  let [from, to] = _ref;
  return value >= from && value <= to;
};
export const divisibleBy = (value, divider) => value % divider === 0;
