/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/core/validator.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import { Validator } from './validator';
const widgetOptions = {
  A: 5,
  B: '5'
};
describe('Validator', () => {
  it('should return "true" if there are no errors', () => {
    const validator = new Validator(_ref => {
      let {
        A
      } = _ref;
      return A;
    }, [() => true, () => true, () => true]);
    const result = validator.validate(widgetOptions);
    expect(result).toBe(true);
  });
  it('should return "true" with empty rules array', () => {
    const validator = new Validator(_ref2 => {
      let {
        A
      } = _ref2;
      return A;
    }, []);
    const result = validator.validate(widgetOptions);
    expect(result).toBe(true);
  });
  it('should return object with errors if some rules return errors', () => {
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
    const validator = new Validator(_ref3 => {
      let {
        A
      } = _ref3;
      return A;
    }, [firstFailedRule, jest.fn(() => true), secondFailedRule]);
    const result = validator.validate(widgetOptions);
    expect(result).toEqual(expectedResult);
  });
});
