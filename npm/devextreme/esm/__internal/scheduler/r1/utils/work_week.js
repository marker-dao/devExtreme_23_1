/**
* DevExtreme (esm/__internal/scheduler/r1/utils/work_week.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import { getViewStartByOptions, isDataOnWeekend, setOptionHour } from './base';
import { getValidStartDate } from './week';
const MONDAY_INDEX = 1;
const DAYS_IN_WEEK = 7;
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeek) => {
  const viewStart = getViewStartByOptions(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
  const firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
  if (isDataOnWeekend(firstViewDate)) {
    const currentDay = firstViewDate.getDay();
    const distance = (MONDAY_INDEX + DAYS_IN_WEEK - currentDay) % 7;
    firstViewDate.setDate(firstViewDate.getDate() + distance);
  }
  return setOptionHour(firstViewDate, startDayHour);
};
