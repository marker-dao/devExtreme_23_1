"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisibleDateTimeIntervals = void 0;
var _m_date = require("../../../../core/utils/m_date");
var _index = require("../../../r1/utils/index");
const toMs = _m_date.dateUtils.dateToMilliseconds;
const getVisibleDateTimeIntervals = (_ref, isDateViewOnly) => {
  let {
    startDayHour,
    endDayHour,
    min,
    max
  } = _ref;
  if (isDateViewOnly || startDayHour === 0 && endDayHour === 24) {
    const [trimMin, trimMax] = (0, _index.getDatesWithoutTime)(min, max);
    return [{
      min: trimMin,
      max: trimMax
    }];
  }
  if (startDayHour >= endDayHour) {
    return [];
  }
  const startTime = _m_date.dateUtils.dateTimeFromDecimal(startDayHour);
  const endTime = _m_date.dateUtils.dateTimeFromDecimal(endDayHour);
  const normalizedMin = _m_date.dateUtils.trimTime(min);
  normalizedMin.setHours(startTime.hours, startTime.minutes, 0, 0);
  const normalizedMax = _m_date.dateUtils.trimTime(max);
  normalizedMax.setHours(endTime.hours, endTime.minutes, 0, 0);
  let time = normalizedMin.getTime();
  const maxTime = normalizedMax.getTime();
  const result = [];
  while (time < maxTime) {
    const intervalMax = new Date(time);
    intervalMax.setHours(endTime.hours, endTime.minutes, 0, 0);
    result.push({
      min: new Date(time),
      max: intervalMax
    });
    time += toMs('day');
  }
  return result;
};
exports.getVisibleDateTimeIntervals = getVisibleDateTimeIntervals;