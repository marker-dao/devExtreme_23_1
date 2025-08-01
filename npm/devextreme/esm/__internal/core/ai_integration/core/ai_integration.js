/**
* DevExtreme (esm/__internal/core/ai_integration/core/ai_integration.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ChangeStyleCommand, ChangeToneCommand, ExecuteCommand, ExpandCommand, ProofreadCommand, ShortenCommand, SummarizeCommand, TranslateCommand } from '../../../core/ai_integration/commands/index';
import { PromptManager } from '../../../core/ai_integration/core/prompt_manager';
import { RequestManager } from '../../../core/ai_integration/core/request_manager';
export var CommandNames;
(function (CommandNames) {
  CommandNames["ChangeStyle"] = "changeStyle";
  CommandNames["ChangeTone"] = "changeTone";
  CommandNames["Execute"] = "execute";
  CommandNames["Expand"] = "expand";
  CommandNames["Proofread"] = "proofread";
  CommandNames["Shorten"] = "shorten";
  CommandNames["Summarize"] = "summarize";
  CommandNames["Translate"] = "translate";
})(CommandNames || (CommandNames = {}));
export const COMMANDS = {
  [CommandNames.ChangeStyle]: ChangeStyleCommand,
  [CommandNames.ChangeTone]: ChangeToneCommand,
  [CommandNames.Execute]: ExecuteCommand,
  [CommandNames.Expand]: ExpandCommand,
  [CommandNames.Proofread]: ProofreadCommand,
  [CommandNames.Shorten]: ShortenCommand,
  [CommandNames.Summarize]: SummarizeCommand,
  [CommandNames.Translate]: TranslateCommand
};
export class AIIntegration {
  constructor(provider) {
    this.promptManager = new PromptManager();
    this.requestManager = new RequestManager(provider);
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
