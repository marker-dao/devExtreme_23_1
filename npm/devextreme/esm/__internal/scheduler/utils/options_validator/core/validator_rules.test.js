/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/core/validator_rules.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { createValidatorRule } from './validator_rules';
describe('createValidatorRule', () => {
  it('should add the "name" property to the passed function', () => {
    const expectedResult = 'test-name';
    const result = createValidatorRule(expectedResult, () => true);
    expect(result.name).toBe(expectedResult);
  });
});
