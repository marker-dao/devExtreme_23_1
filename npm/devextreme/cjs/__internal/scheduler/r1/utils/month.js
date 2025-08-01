/**
* DevExtreme (cjs/__internal/scheduler/r1/utils/month.js)
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
exports.getViewStartByOptions = exports.getCellText = exports.calculateStartViewDate = exports.calculateCellIndex = void 0;
var _date = _interopRequireDefault(require("../../../../common/core/localization/date"));
var _date2 = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("./base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const calculateCellIndex = (rowIndex, columnIndex, _, columnCount) => rowIndex * columnCount + columnIndex;
exports.calculateCellIndex = calculateCellIndex;
const getViewStartByOptions = (startDate, currentDate, intervalCount, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  }
  let currentStartDate = new Date(startViewDate);
  const validStartViewDate = new Date(startViewDate);
  const diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
  let endDate = new Date(new Date(validStartViewDate.setMonth(validStartViewDate.getMonth() + diff * intervalCount)));
  while (!(0, _base.isDateInRange)(currentDate, currentStartDate, endDate, diff)) {
    currentStartDate = new Date(endDate);
    if (diff > 0) {
      currentStartDate.setDate(1);
    }
    endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * intervalCount)));
  }
  return diff > 0 ? currentStartDate : endDate;
};
exports.getViewStartByOptions = getViewStartByOptions;
const getCellText = (date, intervalCount) => {
  if ((0, _base.isFirstCellInMonthWithIntervalCount)(date, intervalCount)) {
    const monthName = _date.default.getMonthNames('abbreviated')[date.getMonth()];
    return [monthName, _date.default.format(date, 'day')].join(' ');
  }
  return _date.default.format(date, 'dd');
};
exports.getCellText = getCellText;
const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalCount, firstDayOfWeekOption) => {
  const viewStart = getViewStartByOptions(startDate, currentDate, intervalCount, _date2.default.getFirstMonthDate(startDate));
  const firstMonthDate = _date2.default.getFirstMonthDate(viewStart);
  const firstDayOfWeek = (0, _base.getCalculatedFirstDayOfWeek)(firstDayOfWeekOption);
  const firstViewDate = _date2.default.getFirstWeekDate(firstMonthDate, firstDayOfWeek);
  return (0, _base.setOptionHour)(firstViewDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
