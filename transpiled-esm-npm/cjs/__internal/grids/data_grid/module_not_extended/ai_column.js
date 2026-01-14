"use strict";

var _index = require("../../../grids/grid_core/ai_column/index");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_m_core.default.registerModule('aiColumn', {
  controllers: {
    aiColumn: _index.AIColumnController,
    aiPromptEditor: _index.AIPromptEditorViewController
  },
  views: {
    aiPromptEditorView: _index.AIPromptEditorView
  },
  extenders: {
    views: {
      columnHeadersView: _index.columnHeadersViewExtender
    }
  }
});