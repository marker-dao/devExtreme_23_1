/**
* DevExtreme (cjs/__internal/core/ai_integration/core/request_manager.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestManager = void 0;
var _errors = _interopRequireDefault(require("../../../../core/errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RequestManager {
  constructor(provider) {
    this.provider = provider;
    this.validateProvider();
  }
  validateProvider() {
    if (typeof this.provider.sendRequest !== 'function') {
      throw _errors.default.Error('E0122');
    }
  }
  sendRequest(prompt, callbacks) {
    let aborted = false;
    const params = {
      prompt,
      onChunk: chunk => {
        if (!aborted) {
          var _callbacks$onChunk;
          callbacks === null || callbacks === void 0 || (_callbacks$onChunk = callbacks.onChunk) === null || _callbacks$onChunk === void 0 || _callbacks$onChunk.call(callbacks, chunk);
        }
      }
    };
    const {
      promise,
      abort: abortRequest
    } = this.provider.sendRequest(params);
    promise.then(response => {
      if (!aborted) {
        var _callbacks$onComplete;
        callbacks === null || callbacks === void 0 || (_callbacks$onComplete = callbacks.onComplete) === null || _callbacks$onComplete === void 0 || _callbacks$onComplete.call(callbacks, response);
      }
    }).catch(e => {
      if (!aborted) {
        var _callbacks$onError;
        callbacks === null || callbacks === void 0 || (_callbacks$onError = callbacks.onError) === null || _callbacks$onError === void 0 || _callbacks$onError.call(callbacks, e);
      }
    });
    const abort = () => {
      aborted = true;
      abortRequest === null || abortRequest === void 0 || abortRequest();
    };
    return abort;
  }
}
exports.RequestManager = RequestManager;
