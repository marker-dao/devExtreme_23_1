/**
* DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_week.js)
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
var _m_strategy_vertical = _interopRequireDefault(require("./m_strategy_vertical"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class WeekAppointmentRenderingStrategy extends _m_strategy_vertical.default {
  isApplyCompactAppointmentOffset() {
    if (this.isAdaptive && this._getMaxAppointmentCountPerCellByType() === 0) {
      return false;
    }
    return this.supportCompactDropDownAppointments();
  }
}
var _default = exports.default = WeekAppointmentRenderingStrategy;
