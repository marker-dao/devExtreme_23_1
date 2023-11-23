/**
* DevExtreme (esm/__internal/scheduler/options_validator/core/validator.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export class Validator {
  constructor(valueSelector, rules) {
    this.valueSelector = valueSelector;
    this.rules = rules;
  }
  validate(options) {
    var value = this.valueSelector(options);
    var errors = this.rules.reduce((result, rule) => {
      var validationResult = rule(value);
      if (validationResult !== true) {
        result[rule.name] = validationResult;
      }
      return result;
    }, {});
    return Object.keys(errors).length ? errors : true;
  }
}
