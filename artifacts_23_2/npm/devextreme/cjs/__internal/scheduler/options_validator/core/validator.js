/**
* DevExtreme (cjs/__internal/scheduler/options_validator/core/validator.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = void 0;
let Validator = /*#__PURE__*/function () {
  function Validator(valueSelector, rules) {
    this.valueSelector = valueSelector;
    this.rules = rules;
  }
  var _proto = Validator.prototype;
  _proto.validate = function validate(options) {
    const value = this.valueSelector(options);
    const errors = this.rules.reduce((result, rule) => {
      const validationResult = rule(value);
      if (validationResult !== true) {
        result[rule.name] = validationResult;
      }
      return result;
    }, {});
    return Object.keys(errors).length ? errors : true;
  };
  return Validator;
}();
exports.Validator = Validator;