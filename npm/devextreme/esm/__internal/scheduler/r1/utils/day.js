/**
* DevExtreme (esm/__internal/scheduler/r1/utils/day.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getViewStartByOptions, setOptionHour } from './base';
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration) => {
  const firstViewDate = getViewStartByOptions(startDate, currentDate, intervalDuration, startDate);
  return setOptionHour(firstViewDate, startDayHour);
};
