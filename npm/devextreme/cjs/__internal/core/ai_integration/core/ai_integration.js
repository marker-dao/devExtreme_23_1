/**
* DevExtreme (cjs/__internal/core/ai_integration/core/ai_integration.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandNames = exports.COMMANDS = exports.AIIntegration = void 0;
var _index = require("../../../core/ai_integration/commands/index");
var _prompt_manager = require("../../../core/ai_integration/core/prompt_manager");
var _request_manager = require("../../../core/ai_integration/core/request_manager");
var CommandNames;
(function (CommandNames) {
  CommandNames["ChangeStyle"] = "changeStyle";
  CommandNames["ChangeTone"] = "changeTone";
  CommandNames["Execute"] = "execute";
  CommandNames["Expand"] = "expand";
  CommandNames["Proofread"] = "proofread";
  CommandNames["Shorten"] = "shorten";
  CommandNames["Summarize"] = "summarize";
  CommandNames["Translate"] = "translate";
})(CommandNames || (exports.CommandNames = CommandNames = {}));
const COMMANDS = exports.COMMANDS = {
  [CommandNames.ChangeStyle]: _index.ChangeStyleCommand,
  [CommandNames.ChangeTone]: _index.ChangeToneCommand,
  [CommandNames.Execute]: _index.ExecuteCommand,
  [CommandNames.Expand]: _index.ExpandCommand,
  [CommandNames.Proofread]: _index.ProofreadCommand,
  [CommandNames.Shorten]: _index.ShortenCommand,
  [CommandNames.Summarize]: _index.SummarizeCommand,
  [CommandNames.Translate]: _index.TranslateCommand
};
class AIIntegration {
  constructor(provider) {
    this.promptManager = new _prompt_manager.PromptManager();
    this.requestManager = new _request_manager.RequestManager(provider);
    this.commands = new Map();
  }
  executeCommand(commandName, params, callbacks) {
    let command = this.commands.get(commandName);
    if (!command) {
      const Command = COMMANDS[commandName];
      command = new Command(this.promptManager, this.requestManager);
      this.commands.set(commandName, command);
    }
    return command.execute(params, callbacks);
  }
  changeStyle(params, callbacks) {
    return this.executeCommand(CommandNames.ChangeStyle, params, callbacks);
  }
  changeTone(params, callbacks) {
    return this.executeCommand(CommandNames.ChangeTone, params, callbacks);
  }
  execute(params, callbacks) {
    return this.executeCommand(CommandNames.Execute, params, callbacks);
  }
  expand(params, callbacks) {
    return this.executeCommand(CommandNames.Expand, params, callbacks);
  }
  proofread(params, callbacks) {
    return this.executeCommand(CommandNames.Proofread, params, callbacks);
  }
  shorten(params, callbacks) {
    return this.executeCommand(CommandNames.Shorten, params, callbacks);
  }
  summarize(params, callbacks) {
    return this.executeCommand(CommandNames.Summarize, params, callbacks);
  }
  translate(params, callbacks) {
    return this.executeCommand(CommandNames.Translate, params, callbacks);
  }
}
exports.AIIntegration = AIIntegration;
