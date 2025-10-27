"use strict";

var _m_ai_column_controller = require("../../../grids/grid_core/ai_column/m_ai_column_controller");
var _m_ai_column_view = require("../../../grids/grid_core/ai_column/m_ai_column_view");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_m_core.default.registerModule('aiColumn', {
  controllers: {
    aiColumn: _m_ai_column_controller.AIColumnController
  },
  views: {
    aiColumnView: _m_ai_column_view.AIColumnView
  }
});