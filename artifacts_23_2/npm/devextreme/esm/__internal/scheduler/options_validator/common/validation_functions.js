/**
* DevExtreme (esm/__internal/scheduler/options_validator/common/validation_functions.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export var isInteger = value => Number.isInteger(value);
export var greaterThan = function greaterThan(value, minimalValue) {
  var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value > minimalValue : value >= minimalValue;
};
export var lessThan = function lessThan(value, maximalValue) {
  var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value < maximalValue : value <= maximalValue;
};
export var inRange = (value, _ref) => {
  var [from, to] = _ref;
  return value >= from && value <= to;
};
export var divisibleBy = (value, divider) => value % divider === 0;