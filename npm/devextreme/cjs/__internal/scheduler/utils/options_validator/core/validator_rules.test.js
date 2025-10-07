/**
* DevExtreme (cjs/__internal/scheduler/utils/options_validator/core/validator_rules.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _validator_rules = require("./validator_rules");
(0, _globals.describe)('createValidatorRule', () => {
  (0, _globals.it)('should add the "name" property to the passed function', () => {
    const expectedResult = 'test-name';
    const result = (0, _validator_rules.createValidatorRule)(expectedResult, () => true);
    (0, _globals.expect)(result.name).toBe(expectedResult);
  });
});
