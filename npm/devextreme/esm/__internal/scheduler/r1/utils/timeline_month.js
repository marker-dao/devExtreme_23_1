/**
* DevExtreme (esm/__internal/scheduler/r1/utils/timeline_month.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import { setOptionHour } from './base';
import { getViewStartByOptions } from './month';
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalCount) => {
  const firstViewDate = dateUtils.getFirstMonthDate(getViewStartByOptions(startDate, currentDate, intervalCount, dateUtils.getFirstMonthDate(startDate)));
  return setOptionHour(firstViewDate, startDayHour);
};
