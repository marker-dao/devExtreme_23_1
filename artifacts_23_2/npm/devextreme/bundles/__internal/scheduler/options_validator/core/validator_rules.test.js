/**
* DevExtreme (bundles/__internal/scheduler/options_validator/core/validator_rules.test.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _validator_rules = require("../../../scheduler/options_validator/core/validator_rules");
describe('createValidatorRule', () => {
  it('should add the "name" property to the passed function', () => {
    const expectedResult = 'test-name';
    const result = (0, _validator_rules.createValidatorRule)(expectedResult, () => true);
    expect(result.name).toBe(expectedResult);
  });
});