/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtering/utils/get_appointment_filter/is_appointment_matched_intervals.js)
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
exports.isAppointmentMatchedIntervals = void 0;
const isAppointmentMatchedIntervals = (_ref, intervals) => {
  let {
    startDate,
    endDate
  } = _ref;
  const intersectionIntervalIndex = intervals.findIndex(_ref2 => {
    let {
      max
    } = _ref2;
    return startDate < max;
  });
  if (intersectionIntervalIndex === -1) {
    return false;
  }
  const intervalStartDate = intervals[intersectionIntervalIndex].min;
  return startDate >= intervalStartDate || endDate > intervalStartDate;
};
exports.isAppointmentMatchedIntervals = isAppointmentMatchedIntervals;
