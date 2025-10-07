/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/toast.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
