"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisibleDateTimeIntervals = void 0;
var _split_interval_by_days = require("../../../common/split_interval_by_days");
const mergeIntervalsWithoutGap = intervals => {
  if (intervals.length === 0) return [];
  return intervals.reduce((result, interval) => {
    const last = result[result.length - 1];
    if (last.max === interval.min) {
      last.max = interval.max;
      return result;
    }
    result.push(interval);
    return result;
  }, [{
    min: intervals[0].min,
    max: intervals[0].min
  }]);
};
const getVisibleDateTimeIntervals = (_ref, isDateViewOnly) => {
  let {
    startDayHour,
    endDayHour,
    min,
    max,
    skippedDays
  } = _ref;
  if (isDateViewOnly || startDayHour === 0 && endDayHour === 24) {
    return mergeIntervalsWithoutGap((0, _split_interval_by_days.splitIntervalByDay)({
      startDayHour: 0,
      endDayHour: 24,
      min,
      max,
      skippedDays
    }));
  }
  return (0, _split_interval_by_days.splitIntervalByDay)({
    startDayHour,
    endDayHour,
    min,
    max,
    skippedDays
  });
};
exports.getVisibleDateTimeIntervals = getVisibleDateTimeIntervals;