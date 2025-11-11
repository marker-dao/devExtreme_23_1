/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/options/get_minutes_cell_intervals.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMinutesCellIntervals = void 0;
var _split_interval_by_days = require("../../common/split_interval_by_days");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const filterBySkippedDays = (intervals, skippedDays) => intervals.filter(item => !skippedDays.includes(new Date(item.min).getUTCDay()));
const getMinutesCellIntervals = _ref => {
  let {
    intervals,
    startDayHour,
    endDayHour,
    durationMinutes,
    skippedDays
  } = _ref;
  return intervals.reduce((result, interval, rowIndex) => {
    const dayIntervals = (0, _split_interval_by_days.splitIntervalByDay)(_extends({}, interval, {
      startDayHour,
      endDayHour,
      skippedDays
    }));
    let columnIndex = 0;
    filterBySkippedDays(dayIntervals, skippedDays).forEach(dayInterval => {
      const date = new Date(dayInterval.min);
      while (date.getTime() < dayInterval.max) {
        const min = date.getTime();
        let max = date.setUTCMinutes(date.getUTCMinutes() + durationMinutes);
        if (date.getUTCHours() > endDayHour) {
          date.setUTCDate(date.getUTCDate() + 1);
          date.setUTCHours(startDayHour, 0, 0, 0);
          max = date.getTime();
        }
        result.push({
          min,
          max,
          rowIndex,
          columnIndex,
          cellIndex: result.length
        });
        columnIndex += 1;
      }
    });
    return result;
  }, []);
};
exports.getMinutesCellIntervals = getMinutesCellIntervals;
