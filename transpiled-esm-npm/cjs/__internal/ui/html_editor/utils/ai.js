"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasInvalidCustomCommand = exports.getDefaultOptionsByCommand = exports.getDefaultCommandName = exports.getAICommandName = exports.commandMessageKeys = exports.buildCommandsMap = exports.buildAICommandParams = exports.AI_DIALOG_CUSTOM_COMMAND_NAME = exports.AI_DIALOG_ASKAI_COMMAND_NAME = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _capitalize = require("../../../core/utils/capitalize");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AI_DIALOG_ASKAI_COMMAND_NAME = exports.AI_DIALOG_ASKAI_COMMAND_NAME = 'askAI';
const AI_DIALOG_CUSTOM_COMMAND_NAME = exports.AI_DIALOG_CUSTOM_COMMAND_NAME = 'custom';
const commandMessageKeys = exports.commandMessageKeys = {
  summarize: 'dxHtmlEditor-aiCommandSummarize',
  proofread: 'dxHtmlEditor-aiCommandProofread',
  expand: 'dxHtmlEditor-aiCommandExpand',
  shorten: 'dxHtmlEditor-aiCommandShorten',
  changeStyle: 'dxHtmlEditor-aiCommandChangeStyle',
  changeTone: 'dxHtmlEditor-aiCommandChangeTone',
  translate: 'dxHtmlEditor-aiCommandTranslate',
  askAI: 'dxHtmlEditor-aiCommandAskAI'
};
const getDefaultCommandName = name => {
  const key = commandMessageKeys[name];
  if (key) {
    return _message.default.format(key);
  }
  return (0, _capitalize.capitalize)(name);
};
exports.getDefaultCommandName = getDefaultCommandName;
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
const getLocalizedCommandOption = command => option => _message.default.format(`dxHtmlEditor-aiCommand${(0, _capitalize.capitalize)(command)}${(0, _capitalize.capitalize)(option)}`);
const getDefaultOptionsByCommand = command => {
  const getLocalizedOption = getLocalizedCommandOption(command);
  const commandToOptionsMap = {
    changeStyle: htmlEditorAIChangeStyleOptions.map(getLocalizedOption),
    changeTone: htmlEditorAIChangeToneOptions.map(getLocalizedOption),
    translate: htmlEditorAITranslateOptions.map(getLocalizedOption)
  };
  return commandToOptionsMap[command];
};
exports.getDefaultOptionsByCommand = getDefaultOptionsByCommand;
const createDefinitionFromString = commandName => {
  const text = getDefaultCommandName(commandName);
  const defaultOptions = getDefaultOptionsByCommand(commandName);
  return {
    id: commandName,
    text,
    name: commandName,
    options: defaultOptions
  };
};
const createDefinitionFromObject = (id, name, text, rawOptions, prompt) => {
  const capitalizedRaw = rawOptions === null || rawOptions === void 0 ? void 0 : rawOptions.map(_capitalize.capitalize);
  const options = capitalizedRaw ?? getDefaultOptionsByCommand(name);
  const displayText = text ?? getDefaultCommandName(name);
  const definition = {
    id,
    name,
    text: displayText,
    options,
    prompt
  };
  return definition;
};
const buildCommandsMap = commands => {
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
exports.buildCommandsMap = buildCommandsMap;
const getAICommandName = uiCommandName => aiCommandNames[uiCommandName];
exports.getAICommandName = getAICommandName;
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
const buildAICommandParams = (uiCommandName, askAIPrompt, option, getCustomPrompt, payloadText) => {
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
exports.buildAICommandParams = buildAICommandParams;
const hasInvalidCustomCommand = commandsMap => Object.keys(commandsMap).some(command => command.startsWith('custom') && !commandsMap[command].prompt);
exports.hasInvalidCustomCommand = hasInvalidCustomCommand;