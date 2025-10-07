"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiColumnView = void 0;
var _m_modules = require("../m_modules");
var _m_ai_column_controller_utils = require("./m_ai_column_controller_utils");
class AiColumnView extends _m_modules.View {
  addAiCommandColumn() {
    this.columnsController.addCommandColumn((0, _m_ai_column_controller_utils.getAiCommandColumnOptions)());
  }
  init() {
    this.columnsController = this.getController('columns');
    this.aiColumnController = this.getController('aiColumn');
    this.addAiCommandColumn();
  }
}
exports.AiColumnView = AiColumnView;