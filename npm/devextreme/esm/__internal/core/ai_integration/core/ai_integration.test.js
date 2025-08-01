/**
* DevExtreme (esm/__internal/core/ai_integration/core/ai_integration.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ChangeStyleCommand, ChangeToneCommand, ExecuteCommand, ExpandCommand, ProofreadCommand, ShortenCommand, SummarizeCommand, TranslateCommand } from '../../../core/ai_integration/commands';
import { AIIntegration, CommandNames } from '../../../core/ai_integration/core/ai_integration';
import { PromptManager } from '../../../core/ai_integration/core/prompt_manager';
import { RequestManager } from '../../../core/ai_integration/core/request_manager';
import { Provider } from '../../../core/ai_integration/test_utils/provider_mock';
const COMMANDS = {
  [CommandNames.ChangeStyle]: {
    command: ChangeStyleCommand,
    params: {
      text: 'text to style change'
    },
    params2: {
      text: 'text to style change 2'
    }
  },
  [CommandNames.ChangeTone]: {
    command: ChangeToneCommand,
    params: {
      text: 'text to tone change'
    },
    params2: {
      text: 'text to tone change 2'
    }
  },
  [CommandNames.Execute]: {
    command: ExecuteCommand,
    params: {
      text: 'text to execution'
    },
    params2: {
      text: 'text to execution 2'
    }
  },
  [CommandNames.Expand]: {
    command: ExpandCommand,
    params: {
      text: 'text to expansion'
    },
    params2: {
      text: 'text to expansion 2'
    }
  },
  [CommandNames.Proofread]: {
    command: ProofreadCommand,
    params: {
      text: 'text to proofreading'
    },
    params2: {
      text: 'text to proofreading 2'
    }
  },
  [CommandNames.Shorten]: {
    command: ShortenCommand,
    params: {
      text: 'text to shorten'
    },
    params2: {
      text: 'text to shorten 2'
    }
  },
  [CommandNames.Summarize]: {
    command: SummarizeCommand,
    params: {
      text: 'text to summarizing'
    },
    params2: {
      text: 'text to summarizing 2'
    }
  },
  [CommandNames.Translate]: {
    command: TranslateCommand,
    params: {
      text: 'text for translation',
      lang: 'French'
    },
    params2: {
      text: 'text for translation 2',
      lang: 'Spanish'
    }
  }
};
describe('AIIntegration', () => {
  let provider = null;
  let ai = null;
  beforeEach(() => {
    provider = new Provider();
    ai = new AIIntegration(provider);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('constructor', () => {
    it('should create and store PromptManager and RequestManager', () => {
      // @ts-expect-error Access to protected property for a test
      expect(ai.promptManager).toBeInstanceOf(PromptManager);
      // @ts-expect-error Access to protected property for a test
      expect(ai.requestManager).toBeInstanceOf(RequestManager);
    });
  });
  Object.keys(COMMANDS).forEach(commandName => {
    describe(commandName, () => {
      const {
        command,
        params,
        params2
      } = COMMANDS[commandName];
      it(`should call executeCommand with ${commandName} command once with expected params`, () => {
        const callbacks = {
          onComplete: () => {},
          onChunk: () => {},
          onError: () => {}
        };
        const executeSpy = jest.spyOn(command.prototype, 'execute');
        ai[commandName](params, callbacks);
        expect(executeSpy).toHaveBeenCalledTimes(1);
        expect(executeSpy).toHaveBeenCalledWith(params, callbacks);
      });
      it('should return the abort function received from the command', () => {
        const abort = () => {};
        jest
        // @ts-expect-error Access to protected property for a test
        .spyOn(ai.requestManager, 'sendRequest').mockImplementation(() => abort);
        const abortRequest = ai[commandName](params, {});
        expect(abortRequest).toBe(abort);
      });
      it(`should reuse the same command instance for multiple ${commandName} calls`, () => {
        const callbacks = {};
        const executeSpy = jest.spyOn(command.prototype, 'execute');
        ai[commandName](params, callbacks);
        // @ts-expect-error Access to protected property for a test
        const commandsMap = ai.commands;
        const commandInstance = commandsMap.get(commandName);
        expect(commandsMap.size).toBe(1);
        expect(commandInstance).toBeInstanceOf(command);
        expect(executeSpy).toHaveBeenCalledTimes(1);
        expect(executeSpy).toHaveBeenCalledWith(params, callbacks);
        ai[commandName](params2, callbacks);
        expect(commandsMap.size).toBe(1);
        expect(commandsMap.get(commandName)).toBe(commandInstance);
        expect(executeSpy).toHaveBeenCalledTimes(2);
        expect(executeSpy).toHaveBeenLastCalledWith(params2, callbacks);
      });
    });
  });
});
