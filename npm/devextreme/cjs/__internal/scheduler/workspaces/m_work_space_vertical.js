/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_work_space_vertical.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../scheduler/r1/utils/index");
var _m_work_space_indicator = _interopRequireDefault(require("./m_work_space_indicator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class SchedulerWorkspaceVertical extends _m_work_space_indicator.default {
  _getFormat() {
    return _index.formatWeekdayAndDay;
  }
  generateRenderOptions() {
    const options = super.generateRenderOptions();
    return _extends({}, options, {
      isGenerateTimePanelData: true
    });
  }
  _isRenderHeaderPanelEmptyCell() {
    return true;
  }
}
var _default = exports.default = SchedulerWorkspaceVertical;
