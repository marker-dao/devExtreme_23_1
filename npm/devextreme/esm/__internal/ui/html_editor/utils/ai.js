/**
* DevExtreme (esm/__internal/ui/html_editor/utils/ai.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { capitalize } from '../../../core/utils/capitalize';
export const AI_DIALOG_ASKAI_COMMAND_NAME = 'askAI';
export const AI_DIALOG_CUSTOM_COMMAND_NAME = 'custom';
export const defaultCommandNames = {
  summarize: 'Summarize',
  proofread: 'Proofread',
  expand: 'Expand',
  shorten: 'Shorten',
  changeStyle: 'Change Style',
  changeTone: 'Change Tone',
  translate: 'Translate',
  askAI: 'Ask AI'
};
const htmlEditorAIChangeStyleOptions = ['formal', 'informal', 'technical', 'business', 'creative', 'journalistic', 'academic', 'persuasive', 'narrative', 'expository', 'descriptive', 'conversational'];
const htmlEditorAIChangeToneOptions = ['professional', 'casual', 'straightforward', 'confident', 'friendly'];
const htmlEditorAITranslateOptions = ['arabic', 'chinese', 'english', 'french', 'german', 'japanese', 'spanish'];
const aiCommandNames = {
  summarize: 'summarize',
  proofread: 'proofread',
  expand: 'expand',
  shorten: 'shorten',
  changeStyle: 'changeStyle',
  changeTone: 'changeTone',
  translate: 'translate',
  askAI: 'execute',
  custom: 'execute'
};
export const getDefaultOptionsByCommand = command => {
  const commandToOptionsMap = {
    changeStyle: htmlEditorAIChangeStyleOptions,
    changeTone: htmlEditorAIChangeToneOptions,
    translate: htmlEditorAITranslateOptions
  };
  return commandToOptionsMap[command];
};
const createDefinitionFromString = commandName => {
  var _getDefaultOptionsByC;
  const text = defaultCommandNames[commandName] ?? capitalize(commandName);
  const defaultOptions = (_getDefaultOptionsByC = getDefaultOptionsByCommand(commandName)) === null || _getDefaultOptionsByC === void 0 ? void 0 : _getDefaultOptionsByC.map(capitalize);
  return {
    id: commandName,
    text,
    name: commandName,
    options: defaultOptions
  };
};
const createDefinitionFromObject = (id, name, text, rawOptions, prompt) => {
  var _getDefaultOptionsByC2;
  const capitalizedRaw = rawOptions === null || rawOptions === void 0 ? void 0 : rawOptions.map(capitalize);
  const options = capitalizedRaw ?? ((_getDefaultOptionsByC2 = getDefaultOptionsByCommand(name)) === null || _getDefaultOptionsByC2 === void 0 ? void 0 : _getDefaultOptionsByC2.map(capitalize));
  const displayText = text ?? defaultCommandNames[name] ?? capitalize(name);
  const definition = {
    id,
    name,
    text: displayText,
    options,
    prompt
  };
  return definition;
};
export const buildCommandsMap = commands => {
  const map = {};
  let index = 0;
  commands === null || commands === void 0 || commands.forEach(command => {
    if (typeof command === 'string') {
      map[command] = createDefinitionFromString(command);
    } else {
      const {
        name,
        text,
        options
      } = command;
      const isCustom = name === 'custom';
      const {
        prompt
      } = command;
      const id = `${name}${isCustom ? index : ''}`;
      map[id] = createDefinitionFromObject(id, name, text, options, prompt);
      if (isCustom) {
        index += 1;
      }
    }
  });
  return map;
};
export const getAICommandName = uiCommandName => aiCommandNames[uiCommandName];
const getUserCustomPrompt = function (uiCommandName) {
  let askAIPrompt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  let getCustomPrompt = arguments.length > 3 ? arguments[3] : undefined;
  let customPrompt = '';
  if (uiCommandName === AI_DIALOG_ASKAI_COMMAND_NAME) {
    customPrompt = askAIPrompt ?? '';
  } else if (uiCommandName === AI_DIALOG_CUSTOM_COMMAND_NAME) {
    customPrompt = (getCustomPrompt === null || getCustomPrompt === void 0 ? void 0 : getCustomPrompt(option)) ?? '';
  }
  return customPrompt;
};
export const buildAICommandParams = (uiCommandName, askAIPrompt, option, getCustomPrompt, payloadText) => {
  const text = payloadText ?? '';
  switch (uiCommandName) {
    case 'expand':
    case 'proofread':
    case 'summarize':
    case 'shorten':
      {
        return {
          text
        };
      }
    case 'changeStyle':
      {
        const params = {
          text,
          writingStyle: option
        };
        return params;
      }
    case 'changeTone':
      {
        const params = {
          text,
          tone: option
        };
        return params;
      }
    case 'translate':
      {
        const params = {
          text,
          lang: option
        };
        return params;
      }
    case 'askAI':
    case 'custom':
    default:
      {
        const userPrompt = getUserCustomPrompt(uiCommandName, askAIPrompt, option, getCustomPrompt);
        const params = {
          text: `Text: "${text}". ${userPrompt}`.trim()
        };
        return params;
      }
  }
};
export const hasInvalidCustomCommand = commandsMap => Object.keys(commandsMap).some(command => command.startsWith('custom') && !commandsMap[command].prompt);
