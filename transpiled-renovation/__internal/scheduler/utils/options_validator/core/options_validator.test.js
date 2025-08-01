"use strict";

var _globals = require("@jest/globals");
var _options_validator = require("./options_validator");
var _validator = require("./validator");
class TestOptionsValidator extends _options_validator.OptionsValidator {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(validators) {
    super(validators);
  }
}
const widgetOptions = {
  A: 1,
  B: '1',
  C: true
};
(0, _globals.describe)('OptionsValidator', () => {
  (0, _globals.it)('should call each validator\'s validate method', () => {
    const validators = [new _validator.Validator(() => {}, []), new _validator.Validator(() => {}, []), new _validator.Validator(() => {}, [])];
    const validateSpies = validators.map(validator => {
      const validateSpy = _globals.jest.spyOn(validator, 'validate');
      validateSpy.mockImplementation(() => true);
      return validateSpy;
    });
    const optionsValidator = new TestOptionsValidator({
      A: validators[0],
      B: validators[1],
      C: validators[2]
    });
    optionsValidator.validate(widgetOptions);
    (0, _globals.expect)(validateSpies[0]).toHaveBeenCalledWith(widgetOptions);
    (0, _globals.expect)(validateSpies[1]).toHaveBeenCalledWith(widgetOptions);
    (0, _globals.expect)(validateSpies[2]).toHaveBeenCalledWith(widgetOptions);
    validateSpies.forEach(spy => {
      spy.mockReset();
    });
  });
  (0, _globals.it)('should return true if all validators validates without errors', () => {
    const validator = new _validator.Validator(() => {}, []);
    const validateSpy = _globals.jest.spyOn(validator, 'validate');
    validateSpy.mockImplementation(() => true);
    const optionsValidator = new TestOptionsValidator({
      A: validator,
      B: validator,
      C: validator
    });
    const result = optionsValidator.validate(widgetOptions);
    (0, _globals.expect)(result).toBe(true);
    validateSpy.mockReset();
  });
  (0, _globals.it)('should return object with errors if some validators validates with errors', () => {
    const firstValidateResult = {
      required: false,
      isInteger: false
    };
    const secondValidateResult = true;
    const thirdValidateResult = {
      someError: {
        arguments: ['A']
      }
    };
    const expectedResult = {
      A: firstValidateResult,
      C: thirdValidateResult
    };
    const validators = [new _validator.Validator(() => {}, []), new _validator.Validator(() => {}, []), new _validator.Validator(() => {}, [])];
    const firstValidateSpy = _globals.jest.spyOn(validators[0], 'validate');
    const secondValidateSpy = _globals.jest.spyOn(validators[1], 'validate');
    const thirdValidateSpy = _globals.jest.spyOn(validators[2], 'validate');
    firstValidateSpy.mockImplementation(() => firstValidateResult);
    secondValidateSpy.mockImplementation(() => secondValidateResult);
    thirdValidateSpy.mockImplementation(() => thirdValidateResult);
    const optionsValidator = new TestOptionsValidator({
      A: validators[0],
      B: validators[1],
      C: validators[2]
    });
    const result = optionsValidator.validate(widgetOptions);
    (0, _globals.expect)(result).toEqual(expectedResult);
    firstValidateSpy.mockReset();
    secondValidateSpy.mockReset();
    thirdValidateSpy.mockReset();
  });
});