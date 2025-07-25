"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _position = require("../../../core/utils/position");
var _constants_view = require("../utils/options/constants_view");
var _m_timeline = _interopRequireDefault(require("./m_timeline"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TIMELINE_CLASS = 'dx-scheduler-timeline-week';
class SchedulerTimelineWeek extends _m_timeline.default {
  get type() {
    return _constants_view.VIEWS.TIMELINE_WEEK;
  }
  _getElementClass() {
    return TIMELINE_CLASS;
  }
  _getHeaderPanelCellWidth($headerRow) {
    return (0, _position.getBoundingRect)($headerRow.children().first().get(0)).width;
  }
  _needRenderWeekHeader() {
    return true;
  }
  _incrementDate(date) {
    date.setDate(date.getDate() + 1);
  }
}
exports.default = SchedulerTimelineWeek;
(0, _component_registrator.default)('dxSchedulerTimelineWeek', SchedulerTimelineWeek);