"use strict";

var _m_toast_controller = require("../../../grids/grid_core/toast/m_toast_controller");
var _m_toast_view = require("../../../grids/grid_core/toast/m_toast_view");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_m_core.default.registerModule('toast', {
  defaultOptions() {
    return {};
  },
  controllers: {
    toastViewController: _m_toast_controller.ToastViewController
  },
  views: {
    toastView: _m_toast_view.ToastView
  }
});