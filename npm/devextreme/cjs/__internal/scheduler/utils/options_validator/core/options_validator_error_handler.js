/**
* DevExtreme (cjs/__internal/scheduler/utils/options_validator/core/options_validator_error_handler.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsValidatorErrorHandler = void 0;
const getValidatorErrorUniqueKey = (errorCode, validatorError) => {
  if (typeof validatorError === 'boolean' || !Array.isArray(validatorError.arguments)) {
    return errorCode;
  }
  return `${errorCode}${JSON.stringify(validatorError.arguments)}`;
};
const getValidatorErrorArguments = validatorError => typeof validatorError === 'boolean' || !Array.isArray(validatorError.arguments) ? [] : validatorError.arguments;
class OptionsValidatorErrorHandler {
  constructor(validatorNameToErrorCodeMap, globalErrorHandler) {
    this.validatorNameToErrorCodeMap = validatorNameToErrorCodeMap;
    this.globalErrorHandler = globalErrorHandler;
  }
  handleValidationResult(optionsValidatorResult) {
    if (optionsValidatorResult === true) {
      return;
    }
    const warningsMap = new Map();
    const errorsMap = new Map();
    Object.entries(optionsValidatorResult).forEach(_ref => {
      let [validatorName, validatorErrorRecord] = _ref;
      const errorCode = this.validatorNameToErrorCodeMap[validatorName];
      if (!errorCode) {
        return;
      }
      const logMap = errorCode.startsWith('E') ? errorsMap : warningsMap;
      Object.values(validatorErrorRecord).forEach(validatorError => {
        const uniqueKey = getValidatorErrorUniqueKey(errorCode, validatorError);
        const args = getValidatorErrorArguments(validatorError);
        logMap.set(uniqueKey, {
          errorCode,
          args
        });
      });
    });
    Array.from(warningsMap).forEach(value => {
      const [, {
        errorCode,
        args
      }] = value;
      this.globalErrorHandler.logError(errorCode, ...args);
    });
    Array.from(errorsMap).forEach((value, idx) => {
      const [, {
        errorCode,
        args
      }] = value;
      const isLastErrorCode = idx === errorsMap.size - 1;
      // NOTE: For stopping code stack execution and not creating
      // the special error code for this case,
      // we log all errors and throw the last one.
      if (!isLastErrorCode) {
        this.globalErrorHandler.logError(errorCode, ...args);
      } else {
        this.globalErrorHandler.throwError(errorCode, ...args);
      }
    });
  }
}
exports.OptionsValidatorErrorHandler = OptionsValidatorErrorHandler;
