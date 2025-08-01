/**
* DevExtreme (cjs/__internal/core/ai_integration/commands/base.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _base = require("../../../core/ai_integration/commands/base");
var _prompt_manager = require("../../../core/ai_integration/core/prompt_manager");
var _request_manager = require("../../../core/ai_integration/core/request_manager");
var _provider_mock = require("../../../core/ai_integration/test_utils/provider_mock");
_globals.jest.mock('@ts/core/ai_integration/templates/index', () => ({
  templates: {
    'test-template-name': {
      system: 'System test template with {{first}}',
      user: 'User test template with {{second}}'
    }
  }
}));
class TestCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'test-template-name';
  }
  buildPromptData(params) {
    const data = {
      system: {
        first: params === null || params === void 0 ? void 0 : params.first
      },
      user: {
        second: params === null || params === void 0 ? void 0 : params.second
      }
    };
    return data;
  }
  parseResult(response) {
    return `Parsed result: ${response}`;
  }
}
(0, _globals.describe)('BaseCommand', () => {
  let promptManager = null;
  let requestManager = null;
  let command = null;
  const params = {
    first: 'first',
    second: 'second'
  };
  (0, _globals.beforeEach)(() => {
    const provider = new _provider_mock.Provider();
    requestManager = new _request_manager.RequestManager(provider);
    promptManager = new _prompt_manager.PromptManager();
    command = new TestCommand(promptManager, requestManager);
  });
  (0, _globals.describe)('constructor', () => {
    (0, _globals.it)('should store PromptManager and RequestManager instances', () => {
      // @ts-expect-error Access to protected property for a test
      (0, _globals.expect)(command.promptManager).toBe(promptManager);
      // @ts-expect-error Access to protected property for a test
      (0, _globals.expect)(command.requestManager).toBe(requestManager);
    });
  });
  (0, _globals.describe)('execute', () => {
    (0, _globals.it)('getTemplateName should return the name of the corresponding template', () => {
      const spy = _globals.jest.spyOn(command, 'getTemplateName');
      command.execute(params, {});
      (0, _globals.expect)(spy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(spy).toHaveReturnedWith('test-template-name');
    });
    (0, _globals.it)('buildPromptData should receive and returns correct data', () => {
      const spy = _globals.jest.spyOn(command, 'buildPromptData');
      command.execute(params, {});
      (0, _globals.expect)(spy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(spy).toHaveBeenCalledWith(params);
      (0, _globals.expect)(spy).toHaveReturnedWith({
        system: {
          first: params.first
        },
        user: {
          second: params.second
        }
      });
    });
    (0, _globals.it)('parseResult should receive correct value and return expected result', async () => {
      const spy = _globals.jest.spyOn(command, 'parseResult');
      command.execute(params, {});
      await new Promise(process.nextTick);
      (0, _globals.expect)(spy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(spy).toHaveBeenCalledWith('AI response');
      (0, _globals.expect)(spy).toHaveReturnedWith('Parsed result: AI response');
    });
    (0, _globals.it)('callbacks should be called a specified number of times', async () => {
      const callbacks = {
        onComplete: _globals.jest.fn(),
        onError: _globals.jest.fn(),
        onChunk: _globals.jest.fn()
      };
      command.execute(params, callbacks);
      await new Promise(process.nextTick);
      (0, _globals.expect)(callbacks.onComplete).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(callbacks.onError).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(callbacks.onChunk).toHaveBeenCalledTimes(2);
    });
    (0, _globals.it)('onComplete should be called with parseResult output', async () => {
      const callbacks = {
        onComplete: _globals.jest.fn()
      };
      command.execute(params, callbacks);
      await new Promise(process.nextTick);
      (0, _globals.expect)(callbacks.onComplete).toHaveBeenCalledWith('Parsed result: AI response');
    });
    (0, _globals.describe)('if request fails', () => {
      (0, _globals.it)('should call onError ', async () => {
        const originalSendRequest = requestManager.sendRequest;
        requestManager.sendRequest = (_, callbacks) => {
          var _callbacks$onError;
          (_callbacks$onError = callbacks.onError) === null || _callbacks$onError === void 0 || _callbacks$onError.call(callbacks, new Error('Test error'));
          return () => {};
        };
        try {
          const callbacks = {
            onError: _globals.jest.fn(),
            onComplete: _globals.jest.fn()
          };
          command.execute(params, callbacks);
          await new Promise(process.nextTick);
          (0, _globals.expect)(callbacks.onError).toHaveBeenCalledTimes(1);
          (0, _globals.expect)(callbacks.onError).toHaveBeenCalledWith(new Error('Test error'));
          (0, _globals.expect)(callbacks.onComplete).toHaveBeenCalledTimes(0);
        } finally {
          requestManager.sendRequest = originalSendRequest;
        }
      });
    });
    (0, _globals.it)('should call onChunk for each chunk and onComplete a specified number of times with expected params', () => {
      const originalSendRequest = requestManager.sendRequest;
      requestManager.sendRequest = (_, callbacks) => {
        var _callbacks$onChunk, _callbacks$onChunk2, _callbacks$onComplete;
        (_callbacks$onChunk = callbacks.onChunk) === null || _callbacks$onChunk === void 0 || _callbacks$onChunk.call(callbacks, 'first');
        (_callbacks$onChunk2 = callbacks.onChunk) === null || _callbacks$onChunk2 === void 0 || _callbacks$onChunk2.call(callbacks, 'second');
        (_callbacks$onComplete = callbacks.onComplete) === null || _callbacks$onComplete === void 0 || _callbacks$onComplete.call(callbacks, 'first second');
        return () => {};
      };
      try {
        const onChunk = _globals.jest.fn();
        const onComplete = _globals.jest.fn();
        command.execute(params, {
          onChunk,
          onComplete
        });
        (0, _globals.expect)(onChunk).toHaveBeenCalledTimes(2);
        (0, _globals.expect)(onChunk).toHaveBeenNthCalledWith(1, 'first');
        (0, _globals.expect)(onChunk).toHaveBeenNthCalledWith(2, 'second');
        (0, _globals.expect)(onComplete).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(onComplete).toHaveBeenNthCalledWith(1, 'Parsed result: first second');
      } finally {
        requestManager.sendRequest = originalSendRequest;
      }
    });
    (0, _globals.it)('should execute with undefined params without errors', async () => {
      const sendRequestSpy = _globals.jest.spyOn(requestManager, 'sendRequest');
      const onError = _globals.jest.fn();
      (0, _globals.expect)(command.execute(undefined, {
        onError
      })).not.toThrow();
      await new Promise(process.nextTick);
      (0, _globals.expect)(onError).toHaveBeenCalledTimes(0);
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should execute with partial callbacks without errors', async () => {
      const sendRequestSpy = _globals.jest.spyOn(requestManager, 'sendRequest');
      const callbacks = {
        onChunk: _globals.jest.fn()
      };
      (0, _globals.expect)(command.execute(params, callbacks)).not.toThrow();
      await new Promise(process.nextTick);
      (0, _globals.expect)(callbacks.onChunk).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should execute with undefined callbacks without errors', () => {
      const sendRequestSpy = _globals.jest.spyOn(requestManager, 'sendRequest');
      (0, _globals.expect)(command.execute(params, undefined)).not.toThrow();
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
    });
  });
});
