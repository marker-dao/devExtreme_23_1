/**
* DevExtreme (cjs/__internal/core/ai_integration/core/ai_integration.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _commands = require("../../../core/ai_integration/commands");
var _ai_integration = require("../../../core/ai_integration/core/ai_integration");
var _prompt_manager = require("../../../core/ai_integration/core/prompt_manager");
var _request_manager = require("../../../core/ai_integration/core/request_manager");
var _provider_mock = require("../../../core/ai_integration/test_utils/provider_mock");
const COMMANDS = {
  [_ai_integration.CommandNames.ChangeStyle]: {
    command: _commands.ChangeStyleCommand,
    params: {
      text: 'text to style change'
    },
    params2: {
      text: 'text to style change 2'
    }
  },
  [_ai_integration.CommandNames.ChangeTone]: {
    command: _commands.ChangeToneCommand,
    params: {
      text: 'text to tone change'
    },
    params2: {
      text: 'text to tone change 2'
    }
  },
  [_ai_integration.CommandNames.Execute]: {
    command: _commands.ExecuteCommand,
    params: {
      text: 'text to execution'
    },
    params2: {
      text: 'text to execution 2'
    }
  },
  [_ai_integration.CommandNames.Expand]: {
    command: _commands.ExpandCommand,
    params: {
      text: 'text to expansion'
    },
    params2: {
      text: 'text to expansion 2'
    }
  },
  [_ai_integration.CommandNames.Proofread]: {
    command: _commands.ProofreadCommand,
    params: {
      text: 'text to proofreading'
    },
    params2: {
      text: 'text to proofreading 2'
    }
  },
  [_ai_integration.CommandNames.Shorten]: {
    command: _commands.ShortenCommand,
    params: {
      text: 'text to shorten'
    },
    params2: {
      text: 'text to shorten 2'
    }
  },
  [_ai_integration.CommandNames.Summarize]: {
    command: _commands.SummarizeCommand,
    params: {
      text: 'text to summarizing'
    },
    params2: {
      text: 'text to summarizing 2'
    }
  },
  [_ai_integration.CommandNames.Translate]: {
    command: _commands.TranslateCommand,
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
(0, _globals.describe)('AIIntegration', () => {
  let provider = null;
  let ai = null;
  (0, _globals.beforeEach)(() => {
    provider = new _provider_mock.Provider();
    ai = new _ai_integration.AIIntegration(provider);
  });
  (0, _globals.afterEach)(() => {
    _globals.jest.restoreAllMocks();
  });
  (0, _globals.describe)('constructor', () => {
    (0, _globals.it)('should create and store PromptManager and RequestManager', () => {
      // @ts-expect-error Access to protected property for a test
      (0, _globals.expect)(ai.promptManager).toBeInstanceOf(_prompt_manager.PromptManager);
      // @ts-expect-error Access to protected property for a test
      (0, _globals.expect)(ai.requestManager).toBeInstanceOf(_request_manager.RequestManager);
    });
  });
  Object.keys(COMMANDS).forEach(commandName => {
    (0, _globals.describe)(commandName, () => {
      const {
        command,
        params,
        params2
      } = COMMANDS[commandName];
      (0, _globals.it)(`should call executeCommand with ${commandName} command once with expected params`, () => {
        const callbacks = {
          onComplete: () => {},
          onChunk: () => {},
          onError: () => {}
        };
        const executeSpy = _globals.jest.spyOn(command.prototype, 'execute');
        ai[commandName](params, callbacks);
        (0, _globals.expect)(executeSpy).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(executeSpy).toHaveBeenCalledWith(params, callbacks);
      });
      (0, _globals.it)('should return the abort function received from the command', () => {
        const abort = () => {};
        _globals.jest
        // @ts-expect-error Access to protected property for a test
        .spyOn(ai.requestManager, 'sendRequest').mockImplementation(() => abort);
        const abortRequest = ai[commandName](params, {});
        (0, _globals.expect)(abortRequest).toBe(abort);
      });
      (0, _globals.it)(`should reuse the same command instance for multiple ${commandName} calls`, () => {
        const callbacks = {};
        const executeSpy = _globals.jest.spyOn(command.prototype, 'execute');
        ai[commandName](params, callbacks);
        // @ts-expect-error Access to protected property for a test
        const commandsMap = ai.commands;
        const commandInstance = commandsMap.get(commandName);
        (0, _globals.expect)(commandsMap.size).toBe(1);
        (0, _globals.expect)(commandInstance).toBeInstanceOf(command);
        (0, _globals.expect)(executeSpy).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(executeSpy).toHaveBeenCalledWith(params, callbacks);
        ai[commandName](params2, callbacks);
        (0, _globals.expect)(commandsMap.size).toBe(1);
        (0, _globals.expect)(commandsMap.get(commandName)).toBe(commandInstance);
        (0, _globals.expect)(executeSpy).toHaveBeenCalledTimes(2);
        (0, _globals.expect)(executeSpy).toHaveBeenLastCalledWith(params2, callbacks);
      });
    });
  });
});
