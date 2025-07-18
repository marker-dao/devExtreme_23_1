/**
* DevExtreme (esm/__internal/core/ai_integration/core/request_manager.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../../core/errors';
export class RequestManager {
  constructor(provider) {
    this.provider = provider;
    this.validateProvider();
  }
  validateProvider() {
    if (typeof this.provider.sendRequest !== 'function') {
      throw errors.Error('E0122');
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
