"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDaysBetweenDates = exports.calculateAlignedWeeksBetweenDates = exports.alignToLastDayOfWeek = exports.alignToFirstDayOfWeek = void 0;
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DAYS_IN_WEEK = 7;
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MAX_WEEKS_IN_MONTH = 6;
const alignToFirstDayOfWeek = (date, firstDayOfWeek) => {
  const newDate = new Date(date);
  let dayDiff = newDate.getDay() - firstDayOfWeek;
  if (dayDiff < 0) {
    dayDiff += DAYS_IN_WEEK;
  }
  newDate.setDate(newDate.getDate() - dayDiff);
  return newDate;
};
exports.alignToFirstDayOfWeek = alignToFirstDayOfWeek;
const alignToLastDayOfWeek = (date, firstDayOfWeek) => {
  const newDate = alignToFirstDayOfWeek(date, firstDayOfWeek);
  newDate.setDate(newDate.getDate() + DAYS_IN_WEEK - 1);
  return newDate;
};
exports.alignToLastDayOfWeek = alignToLastDayOfWeek;
const calculateDaysBetweenDates = (fromDate, toDate) => {
  const msDiff = _date.default.trimTime(toDate).getTime() - _date.default.trimTime(fromDate).getTime();
  return Math.round(msDiff / MS_IN_DAY) + 1;
};
exports.calculateDaysBetweenDates = calculateDaysBetweenDates;
const calculateAlignedWeeksBetweenDates = (fromDate, toDate, firstDayOfWeek) => {
  const alignedFromDate = alignToFirstDayOfWeek(fromDate, firstDayOfWeek);
  const alignedToDate = alignToLastDayOfWeek(toDate, firstDayOfWeek);
  const weekCount = calculateDaysBetweenDates(alignedFromDate, alignedToDate) / DAYS_IN_WEEK;
  return Math.max(weekCount, MAX_WEEKS_IN_MONTH);
};
exports.calculateAlignedWeeksBetweenDates = calculateAlignedWeeksBetweenDates;