/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/all_day_panel_title.js)
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
exports.AllDayPanelTitle = void 0;
var _inferno = require("inferno");
var _message = _interopRequireDefault(require("../../../../../common/core/localization/message"));
var _index = require("../../../../core/r1/runtime/inferno/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AllDayPanelTitle extends _index.InfernoWrapperComponent {
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  render() {
    const text = _message.default.format('dxScheduler-allDay');
    return (0, _inferno.createVNode)(1, "div", "dx-scheduler-all-day-title", text, 0);
  }
}
exports.AllDayPanelTitle = AllDayPanelTitle;
AllDayPanelTitle.defaultProps = {};
