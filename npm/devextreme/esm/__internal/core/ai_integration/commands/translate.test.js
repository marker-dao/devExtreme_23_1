/**
* DevExtreme (esm/__internal/core/ai_integration/commands/translate.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { TranslateCommand } from '../../../core/ai_integration/commands/translate';
import { PromptManager } from '../../../core/ai_integration/core/prompt_manager';
import { RequestManager } from '../../../core/ai_integration/core/request_manager';
import { Provider } from '../../../core/ai_integration/test_utils/provider_mock';
describe('TranslateCommand', () => {
  const params = {
    text: 'text to translate',
    lang: 'French'
  };
  let promptManager = null;
  let requestManager = null;
  let command = null;
  beforeEach(() => {
    const provider = new Provider();
    requestManager = new RequestManager(provider);
    promptManager = new PromptManager();
    command = new TranslateCommand(promptManager, requestManager);
  });
  describe('getTemplateName', () => {
    it('should return the name of the corresponding template', () => {
      // @ts-expect-error Access to protected property for a test
      const templateName = command.getTemplateName();
      expect(templateName).toBe('translate');
    });
  });
  describe('buildPromptData', () => {
    it('should form PromptData with text in user section and lang in system section', () => {
      // @ts-expect-error Access to protected property for a test
      const promptData = command.buildPromptData(params);
      expect(promptData).toEqual({
        system: {
          lang: 'French'
        },
        user: {
          text: 'text to translate'
        }
      });
    });
  });
  describe('parseResult', () => {
    it('should return the string without changes', () => {
      const response = 'Translated text';
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
      expect(promptManager.buildPrompt).toHaveBeenCalledWith('translate', {
        system: {
          lang: 'French'
        },
        user: {
          text: 'text to translate'
        }
      });
    });
    it('promptManager.buildPrompt should should return prompt with passed values', () => {
      jest.spyOn(promptManager, 'buildPrompt');
      command.execute(params, callbacks);
      expect(promptManager.buildPrompt).toHaveReturnedWith({
        system: 'Translate the text provided into French. Ensure the translation retains the original meaning and tone. Provide only the translated text in your response, without any additional formatting or commentary.',
        user: 'text to translate'
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
