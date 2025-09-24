/**
* DevExtreme (esm/__internal/scheduler/view_model/filtering/utils/get_appointment_filter/get_appointments_occurrences.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { dateUtilsTs } from '../../../../../core/utils/date';
import { generateDates } from '../../../../recurrence/generate_dates';
import { validateRRule } from '../../../../recurrence/validate_rule';
import { getRecurrenceException } from './get_recurrence_exception';
export const getAppointmentsOccurrences = (appointment, _ref, timeZoneCalculator) => {
  let {
    firstDayOfWeek,
    interval
  } = _ref;
  if (!validateRRule(appointment.recurrenceRule)) {
    return [appointment];
  }
  const recurrenceException = getRecurrenceException(appointment.recurrenceException, appointment.startDate, timeZoneCalculator);
  const startDates = generateDates({
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
    endDate: dateUtilsTs.addOffsets(startDate, duration)
  }));
};
