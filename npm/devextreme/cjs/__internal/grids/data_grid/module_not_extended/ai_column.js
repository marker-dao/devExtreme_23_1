/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/ai_column.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_ai_column_controller = require("../../../grids/grid_core/ai_column/m_ai_column_controller");
var _m_ai_column_view = require("../../../grids/grid_core/ai_column/m_ai_column_view");
var _m_ai_prompt_editor_view = require("../../../grids/grid_core/ai_column/m_ai_prompt_editor_view");
var _m_ai_prompt_editor_view_controller = require("../../../grids/grid_core/ai_column/m_ai_prompt_editor_view_controller");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_m_core.default.registerModule('aiColumn', {
  controllers: {
    aiColumn: _m_ai_column_controller.AIColumnController,
    aiPromptEditor: _m_ai_prompt_editor_view_controller.AIPromptEditorViewController
  },
  views: {
    aiPromptEditorView: _m_ai_prompt_editor_view.AIPromptEditorView
  },
  extenders: {
    views: {
      columnHeadersView: _m_ai_column_view.columnHeadersViewExtender
    }
  }
});
