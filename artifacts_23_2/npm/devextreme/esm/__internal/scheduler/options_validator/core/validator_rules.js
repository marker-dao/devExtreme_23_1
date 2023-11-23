/**
* DevExtreme (esm/__internal/scheduler/options_validator/core/validator_rules.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export var createValidatorRule = (name, ruleFunc) => {
  Object.defineProperty(ruleFunc, 'name', {
    value: name,
    writable: false
  });
  return ruleFunc;
};
