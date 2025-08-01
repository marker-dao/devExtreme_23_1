/**
* DevExtreme (cjs/__internal/scheduler/utils/options_validator/core/validator.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _validator = require("./validator");
const widgetOptions = {
  A: 5,
  B: '5'
};
(0, _globals.describe)('Validator', () => {
  (0, _globals.it)('should return "true" if there are no errors', () => {
    const validator = new _validator.Validator(_ref => {
      let {
        A
      } = _ref;
      return A;
    }, [() => true, () => true, () => true]);
    const result = validator.validate(widgetOptions);
    (0, _globals.expect)(result).toBe(true);
  });
  (0, _globals.it)('should return "true" with empty rules array', () => {
    const validator = new _validator.Validator(_ref2 => {
      let {
        A
      } = _ref2;
      return A;
    }, []);
    const result = validator.validate(widgetOptions);
    (0, _globals.expect)(result).toBe(true);
  });
  (0, _globals.it)('should return object with errors if some rules return errors', () => {
    const expectedResult = {
      rule_1: {
        arguments: ['A']
      },
      rule_2: false
    };
    const firstFailedRule = () => expectedResult.rule_1;
    const secondFailedRule = () => expectedResult.rule_2;
    Object.defineProperty(firstFailedRule, 'name', {
      value: 'rule_1',
      writable: false
    });
    Object.defineProperty(secondFailedRule, 'name', {
      value: 'rule_2',
      writable: false
    });
    const validator = new _validator.Validator(_ref3 => {
      let {
        A
      } = _ref3;
      return A;
    }, [firstFailedRule, _globals.jest.fn(() => true), secondFailedRule]);
    const result = validator.validate(widgetOptions);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
});
