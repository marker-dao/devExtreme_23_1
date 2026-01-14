"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AIPromptEditorViewController = void 0;
var _m_modules = require("../../m_modules");
class AIPromptEditorViewController extends _m_modules.ViewController {
  init() {
    this.aiPromptEditorView = this.getView('aiPromptEditorView');
  }
  show(cellElement, column) {
    return this.aiPromptEditorView.show(cellElement, column);
  }
  hide() {
    return this.aiPromptEditorView.hide();
  }
}
exports.AIPromptEditorViewController = AIPromptEditorViewController;