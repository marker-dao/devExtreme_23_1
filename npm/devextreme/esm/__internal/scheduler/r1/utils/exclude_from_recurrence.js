/**
* DevExtreme (esm/__internal/scheduler/r1/utils/exclude_from_recurrence.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import dateSerialization from '../../../../core/utils/date_serialization';
import { AppointmentAdapter } from '../../utils/appointment_adapter/appointment_adapter';
const FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
const UTC_FULL_DATE_FORMAT = `${FULL_DATE_FORMAT}Z`;
const getSerializedDate = (date, startDate, isAllDay) => {
  if (isAllDay) {
    date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
  }
  return dateSerialization.serializeDate(date, UTC_FULL_DATE_FORMAT);
};
const createRecurrenceException = (appointmentAdapter, exceptionDate) => {
  const result = [];
  if (appointmentAdapter.recurrenceException) {
    result.push(appointmentAdapter.recurrenceException);
  }
  result.push(getSerializedDate(exceptionDate, appointmentAdapter.startDate, appointmentAdapter.allDay));
  return result.join();
};
export const excludeFromRecurrence = (appointment, exceptionDate, dataAccessors) => {
  const appointmentAdapter = new AppointmentAdapter(_extends({}, appointment), dataAccessors);
  appointmentAdapter.recurrenceException = createRecurrenceException(appointmentAdapter, exceptionDate);
  return appointmentAdapter;
};
