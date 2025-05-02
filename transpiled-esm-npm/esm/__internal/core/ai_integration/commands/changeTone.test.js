import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ChangeToneCommand } from '../../../core/ai_integration/commands';
import { PromptManager } from '../../../core/ai_integration/core/prompt_manager';
import { RequestManager } from '../../../core/ai_integration/core/request_manager';
import { Provider } from '../../../core/ai_integration/test_utils/provider_mock';
describe('ChangeToneCommand', () => {
  const params = {
    text: 'text to tone change',
    tone: 'friendly'
  };
  let promptManager = null;
  let requestManager = null;
  let command = null;
  beforeEach(() => {
    const provider = new Provider();
    requestManager = new RequestManager(provider);
    promptManager = new PromptManager();
    command = new ChangeToneCommand(promptManager, requestManager);
  });
  describe('getTemplateName', () => {
    it('should return the name of the corresponding template', () => {
      // @ts-expect-error Access to protected property for a test
      const templateName = command.getTemplateName();
      expect(templateName).toBe('changeTone');
    });
  });
  describe('buildPromptData', () => {
    it('should form PromptData with empty object', () => {
      // @ts-expect-error Access to protected property for a test
      const promptData = command.buildPromptData(params);
      expect(promptData).toEqual({
        system: {
          tone: params.tone
        },
        user: {
          text: params.text
        }
      });
    });
  });
  describe('parseResult', () => {
    it('should return the string without changes', () => {
      const response = 'Shorten text';
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
      expect(promptManager.buildPrompt).toHaveBeenCalledWith('changeTone', {
        system: {
          tone: params.tone
        },
        user: {
          text: params.text
        }
      });
    });
    it('promptManager.buildPrompt should should return prompt with passed values', () => {
      jest.spyOn(promptManager, 'buildPrompt');
      command.execute(params, callbacks);
      expect(promptManager.buildPrompt).toHaveReturnedWith({
        system: 'Rewrite the following text to keep its original meaning but change its tone to friendly. Provide only the rewritten text as plain text without any comments or formatting.',
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