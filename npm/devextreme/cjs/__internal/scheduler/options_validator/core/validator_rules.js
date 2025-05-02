/**
* DevExtreme (cjs/__internal/scheduler/options_validator/core/validator_rules.js)
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
exports.createValidatorRule = void 0;
const createValidatorRule = (name, ruleFunc) => {
  Object.defineProperty(ruleFunc, 'name', {
    value: name,
    writable: false
  });
  return ruleFunc;
};
exports.createValidatorRule = createValidatorRule;
