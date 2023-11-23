/**
* DevExtreme (esm/__internal/scheduler/options_validator/core/options_validator.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export class OptionsValidator {
  constructor(validators) {
    this.validators = validators;
  }
  validate(options) {
    var errors = Object.entries(this.validators).reduce((result, _ref) => {
      var [validatorName, validator] = _ref;
      var validatorResult = validator.validate(options);
      if (validatorResult !== true) {
        result[validatorName] = validatorResult;
      }
      return result;
    }, {});
    return Object.keys(errors).length > 0 ? errors : true;
  }
}
