/**
* DevExtreme (esm/__internal/scheduler/appointments/data_provider/utils/get_appointment_filter/get_appointments_occurrences.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { dateUtilsTs } from '../../../../../core/utils/date';
import { getRecurrenceProcessor } from '../../../../m_recurrence';
import { getRecurrenceException } from './get_recurrence_exception';
export const getAppointmentsOccurrences = (appointment, _ref, timeZoneCalculator) => {
  let {
    firstDayOfWeek,
    interval
  } = _ref;
  const recurrenceProcessor = getRecurrenceProcessor();
  if (!recurrenceProcessor.isValidRecurrenceRule(appointment.recurrenceRule)) {
    return [appointment];
  }
  const recurrenceException = getRecurrenceException(appointment.recurrenceException, appointment.startDate, timeZoneCalculator);
  const startDates = recurrenceProcessor.generateDates({
    rule: appointment.recurrenceRule,
    exception: recurrenceException,
    start: appointment.startDate,
    end: appointment.endDate,
    min: interval.min,
    max: interval.max,
    firstDayOfWeek,
    appointmentTimezoneOffset: timeZoneCalculator.getOriginStartDateOffsetInMs(appointment.startDate, appointment.startDateTimeZone, false)
  });
  const duration = appointment.endDate.getTime() - appointment.startDate.getTime();
  return startDates.map(startDate => _extends({}, appointment, {
    startDate,
    endDate: dateUtilsTs.addOffsets(startDate, [duration])
  }));
};
