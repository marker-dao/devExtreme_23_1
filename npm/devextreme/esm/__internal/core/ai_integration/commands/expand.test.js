/**
* DevExtreme (esm/__internal/core/ai_integration/commands/expand.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ExpandCommand } from '../../../core/ai_integration/commands';
import { PromptManager } from '../../../core/ai_integration/core/prompt_manager';
import { RequestManager } from '../../../core/ai_integration/core/request_manager';
import { Provider } from '../../../core/ai_integration/test_utils/provider_mock';
describe('ExpandCommand', () => {
  const params = {
    text: 'text to expansion'
  };
  let promptManager = null;
  let requestManager = null;
  let command = null;
  beforeEach(() => {
    const provider = new Provider();
    requestManager = new RequestManager(provider);
    promptManager = new PromptManager();
    command = new ExpandCommand(promptManager, requestManager);
  });
  describe('getTemplateName', () => {
    it('should return the name of the corresponding template', () => {
      // @ts-expect-error Access to protected property for a test
      const templateName = command.getTemplateName();
      expect(templateName).toBe('expand');
    });
  });
  describe('buildPromptData', () => {
    it('should form PromptData with empty object', () => {
      // @ts-expect-error Access to protected property for a test
      const promptData = command.buildPromptData(params);
      expect(promptData).toEqual({
        user: {
          text: params.text
        }
      });
    });
  });
  describe('parseResult', () => {
    it('should return the string without changes', () => {
      const response = 'Expanded text';
      // @ts-expect-error Access to protected property for a test
      const result = command.parseResult(response);
      expect(result).toBe(response);
    });
  });
  describe('execute', () => {
    const callbacks = {
      onComplete: () => {}
    };
    it('promptManager.buildPrompt should be called with parameters containing the passed values', () => {
      const buildPromptSpy = jest.spyOn(promptManager, 'buildPrompt');
      command.execute(params, callbacks);
      expect(buildPromptSpy).toHaveBeenCalledTimes(1);
      expect(promptManager.buildPrompt).toHaveBeenCalledWith('expand', {
        user: {
          text: params.text
        }
      });
    });
    it('promptManager.buildPrompt should should return prompt with passed values', () => {
      jest.spyOn(promptManager, 'buildPrompt');
      command.execute(params, callbacks);
      expect(promptManager.buildPrompt).toHaveReturnedWith({
        system: 'Expand the following text by adding relevant details, examples, and context while keeping the main point intact. Ensure the expanded text is coherent and logically structured. Return answer with no markdown formatting.',
        user: params.text
      });
    });
    it('should call provider.sendRequest once and return the abort function', () => {
      const sendRequestSpy = jest.spyOn(requestManager, 'sendRequest');
      const abort = command.execute(params, callbacks);
      expect(typeof abort).toBe('function');
      expect(sendRequestSpy).toHaveBeenCalledTimes(1);
    });
  });
});
