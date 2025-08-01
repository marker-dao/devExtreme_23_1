/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_timeline_month.js)
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
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _index = require("../../scheduler/r1/components/index");
var _index2 = require("../../scheduler/r1/utils/index");
var _constants_view = require("../utils/options/constants_view");
var _m_timeline = _interopRequireDefault(require("./m_timeline"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // NOTE: Renovation component import.
const TIMELINE_CLASS = 'dx-scheduler-timeline-month';
class SchedulerTimelineMonth extends _m_timeline.default {
  constructor() {
    super(...arguments);
    this.viewDirection = 'horizontal';
  }
  get type() {
    return _constants_view.VIEWS.TIMELINE_MONTH;
  }
  get renovatedHeaderPanelComponent() {
    return _index.HeaderPanelComponent;
  }
  _renderView() {
    super._renderView();
    this._updateScrollable();
  }
  _getElementClass() {
    return TIMELINE_CLASS;
  }
  _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  }
  _calculateDurationInCells(timeDiff) {
    return timeDiff / this.getCellDuration();
  }
  isIndicatorVisible() {
    return true;
  }
  _getFormat() {
    return _index2.formatWeekdayAndDay;
  }
  _getIntervalBetween(currentDate) {
    const firstViewDate = this.getStartViewDate();
    const timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);
    return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
  }
  _getViewStartByOptions() {
    return _index2.monthUtils.getViewStartByOptions(this.option('startDate'), this.option('currentDate'), this.option('intervalCount'), _date.default.getFirstMonthDate(this.option('startDate')));
  }
  generateRenderOptions() {
    const options = super.generateRenderOptions(true);
    return _extends({}, options, {
      getDateForHeaderText: (_, date) => date
    });
  }
  keepOriginalHours() {
    return true;
  }
}
(0, _component_registrator.default)('dxSchedulerTimelineMonth', SchedulerTimelineMonth);
var _default = exports.default = SchedulerTimelineMonth;
