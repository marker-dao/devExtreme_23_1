/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/core/validator_rules.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const createValidatorRule = (name, ruleFunc) => {
  Object.defineProperty(ruleFunc, 'name', {
    value: name,
    writable: false
  });
  return ruleFunc;
};
