/**
* DevExtreme (esm/__internal/scheduler/view_model/filtration/utils/filter_by_intervals/filter_by_intervals.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isAppointmentMatchedIntervals } from '../../../common/is_appointment_matched_intervals';
const getIntervals = (appointment, _ref) => {
  let {
    allDayIntervals,
    regularIntervals,
    isDateTimeView
  } = _ref;
  // NOTE: broken case for all day appointments in regular panel
  if (isDateTimeView && appointment.allDay && !appointment.isAllDayPanelOccupied) {
    return regularIntervals.map(interval => ({
      min: new Date(interval.min).setUTCHours(0, 0, 0, 0),
      max: interval.max
    }));
  }
  return appointment.allDay || appointment.isAllDayPanelOccupied ? allDayIntervals : regularIntervals;
};
export const filterByIntervals = (entities, options) => entities.filter(appointment => {
  const intervals = getIntervals(appointment, options);
  // NOTE: if all day appointment ends at 00:00 make it longer to occupy next interval
  const fixedAppointment = _extends({}, appointment);
  if (appointment.allDay) {
    fixedAppointment.endDateUTC += 1;
  }
  return isAppointmentMatchedIntervals({
    startDate: fixedAppointment.startDateUTC,
    endDate: fixedAppointment.endDateUTC
  }, intervals);
});
