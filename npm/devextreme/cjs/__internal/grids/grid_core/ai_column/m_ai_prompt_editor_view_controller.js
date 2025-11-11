/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_prompt_editor_view_controller.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AIPromptEditorViewController = void 0;
var _m_modules = require("../m_modules");
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
