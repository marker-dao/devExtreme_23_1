/**
* DevExtreme (cjs/__internal/core/ai_integration/core/request_manager.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _request_manager = require("../../../core/ai_integration/core/request_manager");
var _provider_mock = require("../../../core/ai_integration/test_utils/provider_mock");
const INVALID_SEND_REQUEST_ERROR_MESSAGE = 'E0122 - AIIntegration: The sendRequest method is missing.';
(0, _globals.describe)('RequestManager', () => {
  let provider = null;
  let requestManager = null;
  (0, _globals.beforeEach)(() => {
    provider = new _provider_mock.Provider();
    requestManager = new _request_manager.RequestManager(provider);
  });
  (0, _globals.describe)('constructor', () => {
    (0, _globals.it)('should store the provider in a private field', () => {
      // @ts-expect-error Access to protected property for a test
      (0, _globals.expect)(requestManager.provider).toBe(provider);
    });
    (0, _globals.it)('should throw an error when constructed with invalid sendRequest method', () => {
      const invalidProvider = {};
      const createRequestManager = () => new _request_manager.RequestManager(invalidProvider);
      (0, _globals.expect)(createRequestManager).toThrow(INVALID_SEND_REQUEST_ERROR_MESSAGE);
    });
  });
  (0, _globals.describe)('sendRequest', () => {
    (0, _globals.it)('should call provider.sendRequest with the propmpt and onChunk once', () => {
      const prompt = {
        user: 'User',
        system: 'System'
      };
      const onChunk = _globals.jest.fn();
      const sendRequestSpy = _globals.jest.spyOn(provider, 'sendRequest');
      requestManager.sendRequest(prompt, {
        onChunk
      });
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledWith({
        prompt,
        onChunk: _globals.expect.any(Function)
      });
    });
    (0, _globals.it)('should call onChunk on every chunk', () => {
      const onChunkSpy = _globals.jest.fn();
      requestManager.sendRequest({
        user: 'test'
      }, {
        onChunk: onChunkSpy
      });
      (0, _globals.expect)(onChunkSpy).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(onChunkSpy).toHaveBeenNthCalledWith(1, 'AI');
      (0, _globals.expect)(onChunkSpy).toHaveBeenNthCalledWith(2, ' response');
    });
    (0, _globals.describe)('after completion of the promise', () => {
      (0, _globals.it)('should call onComplete with accumulated data', async () => {
        let resolvePromise = () => {};
        const promise = new Promise(resolve => {
          resolvePromise = resolve;
        });
        const sendRequestSpy = _globals.jest.spyOn(provider, 'sendRequest');
        const onCompleteSpy = _globals.jest.fn();
        sendRequestSpy.mockImplementation(() => ({
          promise,
          abort: () => {}
        }));
        requestManager.sendRequest({
          user: 'test'
        }, {
          onComplete: onCompleteSpy
        });
        resolvePromise('FirstSecond');
        await promise;
        (0, _globals.expect)(onCompleteSpy).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(onCompleteSpy).toHaveBeenCalledWith('FirstSecond');
      });
    });
    (0, _globals.describe)('if the promise was rejected', () => {
      (0, _globals.it)('should call onError', async () => {
        let rejectPromise = () => {};
        const promise = new Promise((_, reject) => {
          rejectPromise = reject;
        });
        const sendRequestSpy = _globals.jest.spyOn(provider, 'sendRequest');
        const onErrorSpy = _globals.jest.fn();
        const error = new Error('Test error');
        sendRequestSpy.mockImplementation(() => ({
          promise,
          abort: () => {}
        }));
        requestManager.sendRequest({
          user: 'user prompt'
        }, {
          onError: onErrorSpy
        });
        rejectPromise(error);
        await new Promise(process.nextTick);
        (0, _globals.expect)(onErrorSpy).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(onErrorSpy).toHaveBeenCalledWith(error);
      });
    });
    (0, _globals.it)('should call the abort function that returned from sendRequest', () => {
      const abort = _globals.jest.fn();
      const sendRequestSpy = _globals.jest.spyOn(provider, 'sendRequest');
      sendRequestSpy.mockReturnValue({
        promise: Promise.resolve(''),
        abort
      });
      const abortRequest = requestManager.sendRequest({
        user: 'user'
      }, {});
      abortRequest();
      (0, _globals.expect)(abort).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should work correctly with no definition of callbacks', () => {
      (0, _globals.expect)(() => {
        requestManager.sendRequest({
          user: 'test'
        }, {});
      }).not.toThrow();
    });
    (0, _globals.it)('should work correctly with partial definition of callbacks', () => {
      (0, _globals.expect)(() => {
        requestManager.sendRequest({
          user: 'test'
        }, {
          onChunk: () => {}
        });
      }).not.toThrow();
    });
    (0, _globals.describe)('if abort is called', () => {
      (0, _globals.it)('should not forward chunks', () => {
        var _capturedParams, _capturedParams$onChu;
        const onChunkSpy = _globals.jest.fn();
        let capturedParams = undefined;
        _globals.jest.spyOn(provider, 'sendRequest').mockImplementation(params => {
          capturedParams = params;
          return {
            promise: Promise.resolve(''),
            abort: () => {}
          };
        });
        const abort = requestManager.sendRequest({
          user: 'test'
        }, {
          onChunk: onChunkSpy
        });
        abort();
        (_capturedParams = capturedParams) === null || _capturedParams === void 0 || (_capturedParams$onChu = _capturedParams.onChunk) === null || _capturedParams$onChu === void 0 || _capturedParams$onChu.call(_capturedParams, 'chunk');
        (0, _globals.expect)(onChunkSpy).not.toHaveBeenCalled();
      });
      (0, _globals.it)('should not call onComplete', async () => {
        let resolvePromise = () => {};
        const promise = new Promise(resolve => {
          resolvePromise = resolve;
        });
        _globals.jest.spyOn(provider, 'sendRequest').mockReturnValue({
          promise,
          abort: () => {}
        });
        const onCompleteSpy = _globals.jest.fn();
        const abort = requestManager.sendRequest({
          user: 'user'
        }, {
          onComplete: onCompleteSpy
        });
        abort();
        resolvePromise('resolve');
        await promise;
        (0, _globals.expect)(onCompleteSpy).not.toHaveBeenCalled();
      });
      (0, _globals.it)('should not call onError', async () => {
        let rejectPromise = () => {};
        const promise = new Promise((_, reject) => {
          rejectPromise = reject;
        });
        _globals.jest.spyOn(provider, 'sendRequest').mockReturnValue({
          promise,
          abort: () => {}
        });
        const onErrorSpy = _globals.jest.fn();
        const abort = requestManager.sendRequest({
          user: 'user'
        }, {
          onError: onErrorSpy
        });
        abort();
        rejectPromise(new Error('error'));
        await new Promise(process.nextTick);
        (0, _globals.expect)(onErrorSpy).not.toHaveBeenCalled();
      });
    });
  });
});
