/**
* DevExtreme (cjs/__internal/core/ai_integration/commands/generateGridColumn.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenerateGridColumnCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class GenerateGridColumnCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'generateGridColumn';
  }
  buildPromptData(params) {
    const dataDescription = this.generateDataDescription(params.data);
    return {
      user: {
        text: params.text,
        data: dataDescription
      }
    };
  }
  parseResult(response) {
    if (typeof response === 'string') {
      if (response === '') {
        return {
          data: {}
        };
      }
      return {
        data: JSON.parse(response)
      };
    }
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return {
      data
    };
  }
  generateDataDescription(data) {
    const result = JSON.stringify(data);
    return result;
  }
}
exports.GenerateGridColumnCommand = GenerateGridColumnCommand;
