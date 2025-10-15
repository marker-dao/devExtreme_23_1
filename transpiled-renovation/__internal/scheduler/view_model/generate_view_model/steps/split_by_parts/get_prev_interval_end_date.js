"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrevIntervalEndDate = void 0;
const getPrevIntervalEndDate = intervals => {
  const minDate = new Date(intervals[0].min);
  const maxDate = new Date(intervals[0].max);
  const isTheSameHours = maxDate.getUTCHours() === minDate.getUTCHours() && maxDate.getUTCMinutes() === minDate.getUTCMinutes() && maxDate.getUTCSeconds() === minDate.getUTCSeconds() && maxDate.getUTCMilliseconds() === minDate.getUTCMilliseconds();
  if (isTheSameHours) {
    return minDate.getTime();
  }
  const prevDate = new Date(minDate.getTime());
  prevDate.setUTCHours(maxDate.getUTCHours(), maxDate.getUTCMinutes(), maxDate.getUTCSeconds(), maxDate.getUTCMilliseconds());
  if (prevDate < minDate) {
    return prevDate.getTime();
  }
  return prevDate.setUTCDate(prevDate.getUTCDate() - 1);
};
exports.getPrevIntervalEndDate = getPrevIntervalEndDate;