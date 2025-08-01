/**
* DevExtreme (esm/__internal/scheduler/r1/utils/month.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../../common/core/localization/date';
import dateUtils from '../../../../core/utils/date';
import { getCalculatedFirstDayOfWeek, isDateInRange, isFirstCellInMonthWithIntervalCount, setOptionHour } from './base';
export const calculateCellIndex = (rowIndex, columnIndex, _, columnCount) => rowIndex * columnCount + columnIndex;
export const getViewStartByOptions = (startDate, currentDate, intervalCount, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  }
  let currentStartDate = new Date(startViewDate);
  const validStartViewDate = new Date(startViewDate);
  const diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
  let endDate = new Date(new Date(validStartViewDate.setMonth(validStartViewDate.getMonth() + diff * intervalCount)));
  while (!isDateInRange(currentDate, currentStartDate, endDate, diff)) {
    currentStartDate = new Date(endDate);
    if (diff > 0) {
      currentStartDate.setDate(1);
    }
    endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * intervalCount)));
  }
  return diff > 0 ? currentStartDate : endDate;
};
export const getCellText = (date, intervalCount) => {
  if (isFirstCellInMonthWithIntervalCount(date, intervalCount)) {
    const monthName = dateLocalization.getMonthNames('abbreviated')[date.getMonth()];
    return [monthName, dateLocalization.format(date, 'day')].join(' ');
  }
  return dateLocalization.format(date, 'dd');
};
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalCount, firstDayOfWeekOption) => {
  const viewStart = getViewStartByOptions(startDate, currentDate, intervalCount, dateUtils.getFirstMonthDate(startDate));
  const firstMonthDate = dateUtils.getFirstMonthDate(viewStart);
  const firstDayOfWeek = getCalculatedFirstDayOfWeek(firstDayOfWeekOption);
  const firstViewDate = dateUtils.getFirstWeekDate(firstMonthDate, firstDayOfWeek);
  return setOptionHour(firstViewDate, startDayHour);
};
