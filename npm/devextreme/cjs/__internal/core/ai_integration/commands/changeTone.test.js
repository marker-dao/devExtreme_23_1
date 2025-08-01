/**
* DevExtreme (cjs/__internal/core/ai_integration/commands/changeTone.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _commands = require("../../../core/ai_integration/commands");
var _prompt_manager = require("../../../core/ai_integration/core/prompt_manager");
var _request_manager = require("../../../core/ai_integration/core/request_manager");
var _provider_mock = require("../../../core/ai_integration/test_utils/provider_mock");
(0, _globals.describe)('ChangeToneCommand', () => {
  const params = {
    text: 'text to tone change',
    tone: 'friendly'
  };
  let promptManager = null;
  let requestManager = null;
  let command = null;
  (0, _globals.beforeEach)(() => {
    const provider = new _provider_mock.Provider();
    requestManager = new _request_manager.RequestManager(provider);
    promptManager = new _prompt_manager.PromptManager();
    command = new _commands.ChangeToneCommand(promptManager, requestManager);
  });
  (0, _globals.describe)('getTemplateName', () => {
    (0, _globals.it)('should return the name of the corresponding template', () => {
      // @ts-expect-error Access to protected property for a test
      const templateName = command.getTemplateName();
      (0, _globals.expect)(templateName).toBe('changeTone');
    });
  });
  (0, _globals.describe)('buildPromptData', () => {
    (0, _globals.it)('should form PromptData with empty object', () => {
      // @ts-expect-error Access to protected property for a test
      const promptData = command.buildPromptData(params);
      (0, _globals.expect)(promptData).toEqual({
        system: {
          tone: params.tone
        },
        user: {
          text: params.text
        }
      });
    });
  });
  (0, _globals.describe)('parseResult', () => {
    (0, _globals.it)('should return the string without changes', () => {
      const response = 'Shorten text';
      // @ts-expect-error Access to protected property for a test
      const result = command.parseResult(response);
      (0, _globals.expect)(result).toBe(response);
    });
  });
  (0, _globals.describe)('execute', () => {
    const callbacks = {
      onComplete: () => {}
    };
    (0, _globals.it)('promptManager.buildPrompt should be called with parameters containing the passed values', () => {
      const buildPromptSpy = _globals.jest.spyOn(promptManager, 'buildPrompt');
      command.execute(params, callbacks);
      (0, _globals.expect)(buildPromptSpy).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(promptManager.buildPrompt).toHaveBeenCalledWith('changeTone', {
        system: {
          tone: params.tone
        },
        user: {
          text: params.text
        }
      });
    });
    (0, _globals.it)('promptManager.buildPrompt should should return prompt with passed values', () => {
      _globals.jest.spyOn(promptManager, 'buildPrompt');
      command.execute(params, callbacks);
      (0, _globals.expect)(promptManager.buildPrompt).toHaveReturnedWith({
        system: 'Rewrite the following text to keep its original meaning but change its tone to friendly. Provide only the rewritten text as plain text without any comments or formatting.',
        user: params.text
      });
    });
    (0, _globals.it)('should call provider.sendRequest once and return the abort function', () => {
      const sendRequestSpy = _globals.jest.spyOn(requestManager, 'sendRequest');
      const abort = command.execute(params, callbacks);
      (0, _globals.expect)(typeof abort).toBe('function');
      (0, _globals.expect)(sendRequestSpy).toHaveBeenCalledTimes(1);
    });
  });
});
