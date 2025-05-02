"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestManager = exports.ERROR_MESSAGES = void 0;
const ERROR_MESSAGES = exports.ERROR_MESSAGES = {
  METHOD_NOT_IMPLEMENTED: 'No method for queries has been implemented'
};
class RequestManager {
  constructor(provider) {
    this.provider = provider;
  }
  sendRequest(prompt, callbacks) {
    if (typeof this.provider.sendRequest === 'function') {
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
    throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED);
  }
}
exports.RequestManager = RequestManager;