"use strict";

exports.isDataOnWeekend = exports.getWeekendsCount = exports.calculateStartViewDate = void 0;
var _date = _interopRequireDefault(require("../../../../../../../core/utils/date"));
var _base = require("./base");
var _week = require("./week");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SATURDAY_INDEX = 6;
const SUNDAY_INDEX = 0;
const MONDAY_INDEX = 1;
const DAYS_IN_WEEK = 7;
const isDataOnWeekend = date => {
  const day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};
exports.isDataOnWeekend = isDataOnWeekend;
const getWeekendsCount = days => 2 * Math.floor(days / 7);
exports.getWeekendsCount = getWeekendsCount;
const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeek) => {
  const viewStart = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, (0, _week.getValidStartDate)(startDate, firstDayOfWeek));
  const firstViewDate = _date.default.getFirstWeekDate(viewStart, firstDayOfWeek);
  if (isDataOnWeekend(firstViewDate)) {
    const currentDay = firstViewDate.getDay();
    const distance = (MONDAY_INDEX + DAYS_IN_WEEK - currentDay) % 7;
    firstViewDate.setDate(firstViewDate.getDate() + distance);
  }
  return (0, _base.setOptionHour)(firstViewDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;