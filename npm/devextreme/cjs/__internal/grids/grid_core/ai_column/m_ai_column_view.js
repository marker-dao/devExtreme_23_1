/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_column_view.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
