/**
* DevExtreme (cjs/__internal/core/ai_integration/commands/smartPaste.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _smartPaste = require("../../../core/ai_integration/commands/smartPaste");
var _prompt_manager = require("../../../core/ai_integration/core/prompt_manager");
var _request_manager = require("../../../core/ai_integration/core/request_manager");
var _templates = require("../../../core/ai_integration/templates");
var _provider_mock = require("../../../core/ai_integration/test_utils/provider_mock");
const COMMAND_NAME = 'smartPaste';
const USER_TEXT = 'text to paste';
const USER_FIELDS = [{
  name: 'description',
  format: 'text'
}];
const USER_FIELDS_WITH_INSTRUCTION = [{
  name: 'description',
  format: 'text',
  instruction: 'instruction'
}];
const PROCESSED_USER_FIELDS = 'fieldName: description, format: text';
const PROCESSED_USER_FIELDS_WITH_INSTRUCTION = 'fieldName: description, format: text, instruction: instruction';
(0, _globals.describe)('SmartPasteCommand', () => {
  const params = {
    text: USER_TEXT,
    fields: USER_FIELDS
  };
  const paramsWithInstruction = {
    text: USER_TEXT,
    fields: USER_FIELDS_WITH_INSTRUCTION
  };
  let promptManager = null;
  let requestManager = null;
  let command = null;
  (0, _globals.beforeEach)(() => {
    const provider = new _provider_mock.Provider();
    requestManager = new _request_manager.RequestManager(provider);
    promptManager = new _prompt_manager.PromptManager();
    command = new _smartPaste.SmartPasteCommand(promptManager, requestManager);
  });
  (0, _globals.describe)('getTemplateName', () => {
    (0, _globals.it)('should return the name of the corresponding template', () => {
      // @ts-expect-error Access to protected property for a test
      const templateName = command.getTemplateName();
      (0, _globals.expect)(templateName).toStrictEqual(COMMAND_NAME);
    });
  });
  (0, _globals.describe)('buildPromptData', () => {
    (0, _globals.it)('should form PromptData with text and fields info', () => {
      // @ts-expect-error Access to protected property for a test
      const promptData = command.buildPromptData(params);
      (0, _globals.expect)(promptData).toStrictEqual({
        user: {
          text: USER_TEXT,
          fields: PROCESSED_USER_FIELDS
        }
      });
    });
    (0, _globals.it)('should form PromptData with text and fields info including instruction', () => {
      // @ts-expect-error Access to protected property for a test
      const promptData = command.buildPromptData(paramsWithInstruction);
      (0, _globals.expect)(promptData).toStrictEqual({
        user: {
          text: USER_TEXT,
          fields: PROCESSED_USER_FIELDS_WITH_INSTRUCTION
        }
      });
    });
  });
  (0, _globals.describe)('parseResult', () => {
    (0, _globals.it)('should return the parsed result', () => {
      const response = 'Field1:::value1;;;Field2:::value2';
      // @ts-expect-error Access to protected property for a test
      const result = command.parseResult(response);
      const expectedResult = [{
        name: 'Field1',
        value: 'value1'
      }, {
        name: 'Field2',
        value: 'value2'
      }];
      (0, _globals.expect)(result).toStrictEqual(expectedResult);
    });
    (0, _globals.it)('should parse array values correctly', () => {
      const response = 'Field1:::value1:::value2;;;Field2:::value3:::value4:::value5';
      // @ts-expect-error Access to protected property for a test
      const result = command.parseResult(response);
      const expectedResult = [{
        name: 'Field1',
        value: ['value1', 'value2']
      }, {
        name: 'Field2',
        value: ['value3', 'value4', 'value5']
      }];
      (0, _globals.expect)(result).toStrictEqual(expectedResult);
    });
    (0, _globals.it)('should not include an empty fields into parsed result', () => {
      const response = 'Field1:::value1;;;Field2:::';
      // @ts-expect-error Access to protected property for a test
      const result = command.parseResult(response);
      const expectedResult = [{
        name: 'Field1',
        value: 'value1'
      }];
      (0, _globals.expect)(result).toStrictEqual(expectedResult);
    });
    (0, _globals.it)('should process multiple delimiters and malformed field data correctly', () => {
      const response = 'Field1:::value1;;;;;;Field2';
      // @ts-expect-error Access to protected property for a test
      const result = command.parseResult(response);
      const expectedResult = [{
        name: 'Field1',
        value: 'value1'
      }];
      (0, _globals.expect)(result).toStrictEqual(expectedResult);
    });
    (0, _globals.it)('should trim string and array values in parseResult', () => {
      const response = 'Field1:::  value1  ;;;Field2:::  value2  ::: value3 ';
      // @ts-expect-error Access to protected property for a test
      const result = command.parseResult(response);
      const expectedResult = [{
        name: 'Field1',
        value: 'value1'
      }, {
        name: 'Field2',
        value: ['value2', 'value3']
      }];
      (0, _globals.expect)(result).toStrictEqual(expectedResult);
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
      (0, _globals.expect)(promptManager.buildPrompt).toHaveBeenCalledWith(COMMAND_NAME, {
        user: {
          text: USER_TEXT,
          fields: PROCESSED_USER_FIELDS
        }
      });
    });
    (0, _globals.it)('promptManager.buildPrompt should should return prompt with passed values', () => {
      var _templates$smartPaste;
      _globals.jest.spyOn(promptManager, 'buildPrompt');
      command.execute(params, callbacks);
      const expectedUserPrompt = (_templates$smartPaste = _templates.templates.smartPaste.user) === null || _templates$smartPaste === void 0 ? void 0 : _templates$smartPaste.replace('{{text}}', USER_TEXT).replace('{{fields}}', PROCESSED_USER_FIELDS);
      (0, _globals.expect)(promptManager.buildPrompt).toHaveReturnedWith({
        system: _templates.templates.smartPaste.system,
        user: expectedUserPrompt
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
