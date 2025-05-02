/**
* DevExtreme (cjs/__internal/core/ai_integration/commands/changeTone.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeToneCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class ChangeToneCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'changeTone';
  }
  buildPromptData(params) {
    return {
      system: {
        tone: params.tone
      },
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
}
exports.ChangeToneCommand = ChangeToneCommand;
