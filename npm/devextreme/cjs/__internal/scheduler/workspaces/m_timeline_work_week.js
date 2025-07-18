/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_timeline_work_week.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _index = require("../../scheduler/r1/utils/index");
var _constants_view = require("../utils/options/constants_view");
var _m_timeline_week = _interopRequireDefault(require("./m_timeline_week"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TIMELINE_CLASS = 'dx-scheduler-timeline-work-week';
const LAST_DAY_WEEK_INDEX = 5;
class SchedulerTimelineWorkWeek extends _m_timeline_week.default {
  get type() {
    return _constants_view.VIEWS.TIMELINE_WORK_WEEK;
  }
  constructor() {
    // @ts-expect-error
    super(...arguments);
    this._getWeekendsCount = _index.getWeekendsCount;
  }
  _getElementClass() {
    return TIMELINE_CLASS;
  }
  _incrementDate(date) {
    const day = date.getDay();
    if (day === LAST_DAY_WEEK_INDEX) {
      date.setDate(date.getDate() + 2);
    }
    super._incrementDate(date);
  }
}
(0, _component_registrator.default)('dxSchedulerTimelineWorkWeek', SchedulerTimelineWorkWeek);
var _default = exports.default = SchedulerTimelineWorkWeek;
