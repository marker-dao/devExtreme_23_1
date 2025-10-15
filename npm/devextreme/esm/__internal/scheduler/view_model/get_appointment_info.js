/**
* DevExtreme (esm/__internal/scheduler/view_model/get_appointment_info.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import timeZoneUtils from '../m_utils_time_zone';
export const getAppointmentInfo = item => {
  const appointment = {
    allDay: item.allDay,
    startDate: timeZoneUtils.createDateFromUTCWithLocalOffset(new Date(item.datesBeforeSplit.startDateUTC)),
    endDate: timeZoneUtils.createDateFromUTCWithLocalOffset(new Date(item.datesBeforeSplit.endDateUTC))
  };
  const source = {
    allDay: item.allDay,
    startDate: new Date(item.source.startDate),
    endDate: new Date(item.source.endDate)
  };
  return {
    appointment,
    sourceAppointment: source
  };
};
export const getAgendaAppointmentInfo = item => _extends({}, getAppointmentInfo(item), {
  partialDates: {
    allDay: item.allDay,
    startDate: timeZoneUtils.createDateFromUTCWithLocalOffset(new Date(item.datesAfterSplit.startDateUTC)),
    endDate: timeZoneUtils.createDateFromUTCWithLocalOffset(new Date(item.datesAfterSplit.endDateUTC))
  }
});
