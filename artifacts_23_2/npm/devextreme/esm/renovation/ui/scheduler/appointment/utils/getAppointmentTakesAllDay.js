/**
* DevExtreme (esm/renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../../core/utils/type';
import dateUtils from '../../../../../core/utils/date';
var toMs = dateUtils.dateToMilliseconds;
var DAY_HOURS = 24;
var getDurationInHours = (startDate, endDate) => Math.floor((endDate.getTime() - startDate.getTime()) / toMs('hour'));
export var getAppointmentTakesAllDay = (appointmentAdapter, allDayPanelMode) => {
  var {
    allDay,
    endDate,
    startDate
  } = appointmentAdapter;
  switch (allDayPanelMode) {
    case 'hidden':
      return false;
    case 'allDay':
      return allDay;
    case 'all':
    default:
      if (allDay) {
        return true;
      }
      if (!isDefined(endDate)) {
        return false;
      }
      return getDurationInHours(startDate, endDate) >= DAY_HOURS;
  }
};