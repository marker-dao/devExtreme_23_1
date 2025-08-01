/**
* DevExtreme (esm/__internal/core/ai_integration/core/request_manager.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { RequestManager } from '../../../core/ai_integration/core/request_manager';
import { Provider } from '../../../core/ai_integration/test_utils/provider_mock';
const INVALID_SEND_REQUEST_ERROR_MESSAGE = 'E0122 - AIIntegration: The sendRequest method is missing.';
describe('RequestManager', () => {
  let provider = null;
  let requestManager = null;
  beforeEach(() => {
    provider = new Provider();
    requestManager = new RequestManager(provider);
  });
  describe('constructor', () => {
    it('should store the provider in a private field', () => {
      // @ts-expect-error Access to protected property for a test
      expect(requestManager.provider).toBe(provider);
    });
    it('should throw an error when constructed with invalid sendRequest method', () => {
      const invalidProvider = {};
      const createRequestManager = () => new RequestManager(invalidProvider);
      expect(createRequestManager).toThrow(INVALID_SEND_REQUEST_ERROR_MESSAGE);
    });
  });
  describe('sendRequest', () => {
    it('should call provider.sendRequest with the propmpt and onChunk once', () => {
      const prompt = {
        user: 'User',
        system: 'System'
      };
      const onChunk = jest.fn();
      const sendRequestSpy = jest.spyOn(provider, 'sendRequest');
      requestManager.sendRequest(prompt, {
        onChunk
      });
      expect(sendRequestSpy).toHaveBeenCalledTimes(1);
      expect(sendRequestSpy).toHaveBeenCalledWith({
        prompt,
        onChunk: expect.any(Function)
      });
    });
    it('should call onChunk on every chunk', () => {
      const onChunkSpy = jest.fn();
      requestManager.sendRequest({
        user: 'test'
      }, {
        onChunk: onChunkSpy
      });
      expect(onChunkSpy).toHaveBeenCalledTimes(2);
      expect(onChunkSpy).toHaveBeenNthCalledWith(1, 'AI');
      expect(onChunkSpy).toHaveBeenNthCalledWith(2, ' response');
    });
    describe('after completion of the promise', () => {
      it('should call onComplete with accumulated data', async () => {
        let resolvePromise = () => {};
        const promise = new Promise(resolve => {
          resolvePromise = resolve;
        });
        const sendRequestSpy = jest.spyOn(provider, 'sendRequest');
        const onCompleteSpy = jest.fn();
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
        expect(onCompleteSpy).toHaveBeenCalledTimes(1);
        expect(onCompleteSpy).toHaveBeenCalledWith('FirstSecond');
      });
    });
    describe('if the promise was rejected', () => {
      it('should call onError', async () => {
        let rejectPromise = () => {};
        const promise = new Promise((_, reject) => {
          rejectPromise = reject;
        });
        const sendRequestSpy = jest.spyOn(provider, 'sendRequest');
        const onErrorSpy = jest.fn();
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
        expect(onErrorSpy).toHaveBeenCalledTimes(1);
        expect(onErrorSpy).toHaveBeenCalledWith(error);
      });
    });
    it('should call the abort function that returned from sendRequest', () => {
      const abort = jest.fn();
      const sendRequestSpy = jest.spyOn(provider, 'sendRequest');
      sendRequestSpy.mockReturnValue({
        promise: Promise.resolve(''),
        abort
      });
      const abortRequest = requestManager.sendRequest({
        user: 'user'
      }, {});
      abortRequest();
      expect(abort).toHaveBeenCalledTimes(1);
    });
    it('should work correctly with no definition of callbacks', () => {
      expect(() => {
        requestManager.sendRequest({
          user: 'test'
        }, {});
      }).not.toThrow();
    });
    it('should work correctly with partial definition of callbacks', () => {
      expect(() => {
        requestManager.sendRequest({
          user: 'test'
        }, {
          onChunk: () => {}
        });
      }).not.toThrow();
    });
    describe('if abort is called', () => {
      it('should not forward chunks', () => {
        var _capturedParams, _capturedParams$onChu;
        const onChunkSpy = jest.fn();
        let capturedParams = undefined;
        jest.spyOn(provider, 'sendRequest').mockImplementation(params => {
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
        expect(onChunkSpy).not.toHaveBeenCalled();
      });
      it('should not call onComplete', async () => {
        let resolvePromise = () => {};
        const promise = new Promise(resolve => {
          resolvePromise = resolve;
        });
        jest.spyOn(provider, 'sendRequest').mockReturnValue({
          promise,
          abort: () => {}
        });
        const onCompleteSpy = jest.fn();
        const abort = requestManager.sendRequest({
          user: 'user'
        }, {
          onComplete: onCompleteSpy
        });
        abort();
        resolvePromise('resolve');
        await promise;
        expect(onCompleteSpy).not.toHaveBeenCalled();
      });
      it('should not call onError', async () => {
        let rejectPromise = () => {};
        const promise = new Promise((_, reject) => {
          rejectPromise = reject;
        });
        jest.spyOn(provider, 'sendRequest').mockReturnValue({
          promise,
          abort: () => {}
        });
        const onErrorSpy = jest.fn();
        const abort = requestManager.sendRequest({
          user: 'user'
        }, {
          onError: onErrorSpy
        });
        abort();
        rejectPromise(new Error('error'));
        await new Promise(process.nextTick);
        expect(onErrorSpy).not.toHaveBeenCalled();
      });
    });
  });
});
