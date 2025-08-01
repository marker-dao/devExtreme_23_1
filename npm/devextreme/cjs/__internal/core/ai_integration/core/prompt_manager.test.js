/**
* DevExtreme (cjs/__internal/core/ai_integration/core/prompt_manager.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _prompt_manager = require("../../../core/ai_integration/core/prompt_manager");
var _index = require("../../../core/ai_integration/templates/index");
_globals.jest.mock('@ts/core/ai_integration/templates/index', () => ({
  templates: {
    'full-template': {
      system: 'System message with {{placeholder}}',
      user: 'User message with {{placeholder}}'
    },
    'system-only': {
      system: 'System message only. Placeholder is {{placeholder}}'
    },
    'user-only': {
      user: 'User message only. Placeholder is {{placeholder}}'
    },
    empty: {}
  }
}));
(0, _globals.describe)('PromptManager', () => {
  const promptManager = new _prompt_manager.PromptManager();
  (0, _globals.describe)('constructor', () => {
    (0, _globals.it)('should initialize Map with templates from templates', () => {
      // @ts-expect-error Access to protected property for a test
      const {
        templates: templatesMap
      } = promptManager;
      (0, _globals.expect)(templatesMap).toBeInstanceOf(Map);
      templatesMap.forEach((value, key) => {
        (0, _globals.expect)(value).toBe(_index.templates[key]);
      });
    });
  });
  (0, _globals.describe)('buildPrompt', () => {
    (0, _globals.describe)('if no template is found', () => {
      (0, _globals.it)('should throw an error', () => {
        (0, _globals.expect)(() => {
          promptManager.buildPrompt('unknown-template', {});
        }).toThrow(_prompt_manager.ERROR_MESSAGES.TEMPLATE_NOT_FOUND);
      });
    });
    (0, _globals.describe)('full-template', () => {
      (0, _globals.describe)('if placeholders are passed', () => {
        (0, _globals.it)('should replace all placeholders in system and user', () => {
          const data = {
            system: {
              placeholder: 'system-value'
            },
            user: {
              placeholder: 'user-value'
            }
          };
          const prompt = promptManager.buildPrompt('full-template', data);
          (0, _globals.expect)(prompt.system).toBe('System message with system-value');
          (0, _globals.expect)(prompt.user).toBe('User message with user-value');
        });
      });
      (0, _globals.describe)('part of placeholders are not passed', () => {
        (0, _globals.it)('should remain {{...}} in the string', () => {
          const data = {
            system: {
              placeholder: 'system-value'
            }
          };
          const prompt = promptManager.buildPrompt('full-template', data);
          (0, _globals.expect)(prompt.system).toBe('System message with system-value');
          (0, _globals.expect)(prompt.user).toBe('User message with {{placeholder}}');
        });
      });
      (0, _globals.describe)('if system placeholder is not passed', () => {
        (0, _globals.it)('the original system string with placeholders should be returned', () => {
          const prompt = promptManager.buildPrompt('full-template', {});
          (0, _globals.expect)(prompt.system).toBe('System message with {{placeholder}}');
          (0, _globals.expect)(prompt.user).toBe('User message with {{placeholder}}');
        });
      });
    });
    (0, _globals.describe)('system-only', () => {
      (0, _globals.describe)('if only system placeholder is passed', () => {
        (0, _globals.it)('should substitute placeholders into system', () => {
          const data = {
            system: {
              placeholder: 'some-value'
            }
          };
          const prompt = promptManager.buildPrompt('system-only', data);
          (0, _globals.expect)(prompt.system).toBe('System message only. Placeholder is some-value');
          (0, _globals.expect)(prompt.user).toBeUndefined();
        });
      });
      (0, _globals.describe)('if system placeholder is not passed', () => {
        (0, _globals.it)('should return the string from the template as is', () => {
          const prompt = promptManager.buildPrompt('system-only', {});
          (0, _globals.expect)(prompt.system).toBe('System message only. Placeholder is {{placeholder}}');
          (0, _globals.expect)(prompt.user).toBeUndefined();
        });
      });
      (0, _globals.describe)('if user placeholders are passed', () => {
        (0, _globals.describe)('there is no user template', () => {
          (0, _globals.it)('user should be assembled from values', () => {
            const data = {
              user: {
                text: 'text'
              }
            };
            const prompt = promptManager.buildPrompt('system-only', data);
            (0, _globals.expect)(prompt.system).toBe('System message only. Placeholder is {{placeholder}}');
            (0, _globals.expect)(prompt.user).toBe('text');
          });
        });
      });
    });
    (0, _globals.describe)('user-only', () => {
      (0, _globals.describe)('if only user placeholder is passed', () => {
        (0, _globals.it)('should substitute placeholders into user', () => {
          const data = {
            user: {
              placeholder: 'text'
            }
          };
          const prompt = promptManager.buildPrompt('user-only', data);
          (0, _globals.expect)(prompt.user).toBe('User message only. Placeholder is text');
          (0, _globals.expect)(prompt.system).toBeUndefined();
        });
      });
      (0, _globals.describe)('if user placeholder is not passed', () => {
        (0, _globals.it)('the user string with placeholders should be returned', () => {
          const prompt = promptManager.buildPrompt('user-only', {});
          (0, _globals.expect)(prompt.user).toBe('User message only. Placeholder is {{placeholder}}');
          (0, _globals.expect)(prompt.system).toBeUndefined();
        });
      });
      (0, _globals.describe)('if system placeholder is passed', () => {
        (0, _globals.describe)('there is no system template', () => {
          (0, _globals.it)('system should be assembled from values', () => {
            const data = {
              system: {
                text: '123'
              }
            };
            const prompt = promptManager.buildPrompt('user-only', data);
            (0, _globals.expect)(prompt.user).toBe('User message only. Placeholder is {{placeholder}}');
            (0, _globals.expect)(prompt.system).toBe('123');
          });
        });
      });
    });
    (0, _globals.describe)('empty', () => {
      (0, _globals.describe)('if something is passed to system/user', () => {
        (0, _globals.it)('should build a string', () => {
          const prompt = promptManager.buildPrompt('empty', {
            system: {
              text: 'A',
              lang: 'B'
            },
            user: {
              text: 'C',
              lang: 'D'
            }
          });
          (0, _globals.expect)(prompt.system).toBe('A B');
          (0, _globals.expect)(prompt.user).toBe('C D');
        });
      });
      (0, _globals.describe)('if neither system nor user passed', () => {
        (0, _globals.it)('should be undefined in both of them', () => {
          const prompt = promptManager.buildPrompt('empty', {});
          (0, _globals.expect)(prompt.system).toBeUndefined();
          (0, _globals.expect)(prompt.user).toBeUndefined();
        });
      });
    });
  });
});
