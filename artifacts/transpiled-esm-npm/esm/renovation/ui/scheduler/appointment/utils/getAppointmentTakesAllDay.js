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