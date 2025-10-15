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
    const result = JSON.parse(response);
    return result;
  }
  generateDataDescription(data) {
    const result = JSON.stringify(data);
    return result;
  }
}
exports.GenerateGridColumnCommand = GenerateGridColumnCommand;