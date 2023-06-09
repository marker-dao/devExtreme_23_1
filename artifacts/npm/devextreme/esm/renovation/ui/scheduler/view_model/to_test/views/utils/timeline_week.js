/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/to_test/views/utils/timeline_week.js)
* Version: 23.2.0
* Build date: Mon Jul 03 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import timeZoneUtils from '../../../../../../../ui/scheduler/utils.timeZone';
import { getStartViewDateWithoutDST } from './base';
export var getDateForHeaderText = (index, date, options) => {
  if (!timeZoneUtils.isTimezoneChangeInDate(date)) {
    return date;
  }
  var {
    cellCountInDay,
    interval,
    startDayHour,
    startViewDate
  } = options;
  var result = getStartViewDateWithoutDST(startViewDate, startDayHour);
  var validIndex = index % cellCountInDay;
  result.setTime(result.getTime() + validIndex * interval);
  return result;
};
