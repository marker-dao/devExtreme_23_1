/**
* DevExtreme (cjs/__internal/scheduler/workspaces/view_model/m_view_data_generator_work_week.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewDataGeneratorWorkWeek = void 0;
var _index = require("../../r1/utils/index");
var _m_view_data_generator_week = require("./m_view_data_generator_week");
class ViewDataGeneratorWorkWeek extends _m_view_data_generator_week.ViewDataGeneratorWeek {
  constructor() {
    super(...arguments);
    this.daysInInterval = 5;
  }
  isSkippedDate(date) {
    return (0, _index.isDataOnWeekend)(date);
  }
  _calculateStartViewDate(options) {
    return _index.workWeekUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  }
  getFirstDayOfWeek(firstDayOfWeekOption) {
    return firstDayOfWeekOption || 0;
  }
}
exports.ViewDataGeneratorWorkWeek = ViewDataGeneratorWorkWeek;
