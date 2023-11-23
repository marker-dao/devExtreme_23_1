/**
* DevExtreme (cjs/__internal/scheduler/options_validator/core/options_validator_error_handler.js)
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
exports.OptionsValidatorErrorHandler = void 0;
let OptionsValidatorErrorHandler = /*#__PURE__*/function () {
  function OptionsValidatorErrorHandler(validatorNameToErrorCodeMap, globalErrorHandler) {
    this.validatorNameToErrorCodeMap = validatorNameToErrorCodeMap;
    this.globalErrorHandler = globalErrorHandler;
  }
  var _proto = OptionsValidatorErrorHandler.prototype;
  _proto.handleValidationResult = function handleValidationResult(optionsValidatorResult) {
    if (optionsValidatorResult === true) {
      return;
    }
    const uniqErrorCodes = Object.keys(optionsValidatorResult).reduce((set, validatorName) => {
      const errorCode = this.validatorNameToErrorCodeMap[validatorName];
      if (errorCode) {
        set.add(errorCode);
      }
      return set;
    }, new Set());
    const errorCodeArray = [...uniqErrorCodes];
    errorCodeArray.forEach((errorCode, idx) => {
      const isLastErrorCode = idx === errorCodeArray.length - 1;
      // NOTE: For stopping code stack execution and not creating
      // the special error code for this case,
      // we log all errors and throw the last one.
      if (!isLastErrorCode) {
        this.globalErrorHandler.logError(errorCode);
      } else {
        this.globalErrorHandler.throwError(errorCode);
      }
    });
  };
  return OptionsValidatorErrorHandler;
}();
exports.OptionsValidatorErrorHandler = OptionsValidatorErrorHandler;
