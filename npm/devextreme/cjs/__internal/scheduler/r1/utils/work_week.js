/**
* DevExtreme (cjs/__internal/scheduler/r1/utils/work_week.js)
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
exports.calculateStartViewDate = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("./base");
var _week = require("./week");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MONDAY_INDEX = 1;
const DAYS_IN_WEEK = 7;
const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeek) => {
  const viewStart = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, (0, _week.getValidStartDate)(startDate, firstDayOfWeek));
  const firstViewDate = _date.default.getFirstWeekDate(viewStart, firstDayOfWeek);
  if ((0, _base.isDataOnWeekend)(firstViewDate)) {
    const currentDay = firstViewDate.getDay();
    const distance = (MONDAY_INDEX + DAYS_IN_WEEK - currentDay) % 7;
    firstViewDate.setDate(firstViewDate.getDate() + distance);
  }
  return (0, _base.setOptionHour)(firstViewDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
