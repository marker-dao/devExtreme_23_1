/**
* DevExtreme (esm/ui/scheduler/appointments/dataProvider/utils.js)
* Version: 23.2.0
* Build date: Thu Jun 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import timeZoneUtils from '../../utils.timeZone';
import dateSerialization from '../../../../core/utils/date_serialization';
import { ExpressionUtils } from '../../expressionUtils';
var toMs = dateUtils.dateToMilliseconds;
var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
export var compareDateWithStartDayHour = (startDate, endDate, startDayHour, allDay, severalDays) => {
  var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
  var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
  return result;
};
export var compareDateWithEndDayHour = options => {
  var {
    startDate,
    endDate,
    startDayHour,
    endDayHour,
    viewStartDayHour,
    viewEndDayHour,
    allDay,
    severalDays,
    min,
    max,
    checkIntersectViewport
  } = options;
  var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs('hour');
  var apptDuration = endDate.getTime() - startDate.getTime();
  var delta = (hiddenInterval - apptDuration) / toMs('hour');
  var apptStartHour = startDate.getHours();
  var apptStartMinutes = startDate.getMinutes();
  var result;
  var endTime = dateUtils.dateTimeFromDecimal(endDayHour);
  var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
  var apptIntersectViewport = startDate < max && endDate > min;
  result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);
  if (apptDuration < hiddenInterval) {
    if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
      result = false;
    }
  }
  return result;
};
export var getAppointmentTakesSeveralDays = adapter => {
  return !dateUtils.sameDate(adapter.startDate, adapter.endDate);
};
export var _isEndDateWrong = (startDate, endDate) => {
  return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
};
export var _appointmentPartInInterval = (startDate, endDate, startDayHour, endDayHour) => {
  var apptStartDayHour = startDate.getHours();
  var apptEndDayHour = endDate.getHours();
  return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
};
export var getRecurrenceException = (appointmentAdapter, timeZoneCalculator, timeZone) => {
  var recurrenceException = appointmentAdapter.recurrenceException;
  if (recurrenceException) {
    var exceptions = recurrenceException.split(',');
    for (var i = 0; i < exceptions.length; i++) {
      exceptions[i] = _convertRecurrenceException(exceptions[i], appointmentAdapter.startDate, timeZoneCalculator, timeZone);
    }
    return exceptions.join();
  }
  return recurrenceException;
};
export var _convertRecurrenceException = (exceptionString, startDate, timeZoneCalculator, timeZone) => {
  exceptionString = exceptionString.replace(/\s/g, '');
  var getConvertedToTimeZone = date => {
    return timeZoneCalculator.createDate(date, {
      path: 'toGrid'
    });
  };
  var exceptionDate = dateSerialization.deserializeDate(exceptionString);
  var convertedStartDate = getConvertedToTimeZone(startDate);
  var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
  convertedExceptionDate = timeZoneUtils.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, timeZone);
  exceptionString = dateSerialization.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
  return exceptionString;
};
export var replaceWrongEndDate = (rawAppointment, startDate, endDate, appointmentDuration, dataAccessors) => {
  var calculateAppointmentEndDate = (isAllDay, startDate) => {
    if (isAllDay) {
      return dateUtils.setToDayEnd(new Date(startDate));
    }
    return new Date(startDate.getTime() + appointmentDuration * toMs('minute'));
  };
  if (_isEndDateWrong(startDate, endDate)) {
    var isAllDay = ExpressionUtils.getField(dataAccessors, 'allDay', rawAppointment);
    var calculatedEndDate = calculateAppointmentEndDate(isAllDay, startDate);
    dataAccessors.setter.endDate(rawAppointment, calculatedEndDate);
  }
};
export var sortAppointmentsByStartDate = (appointments, dataAccessors) => {
  appointments.sort((a, b) => {
    var firstDate = new Date(ExpressionUtils.getField(dataAccessors, 'startDate', a.settings || a));
    var secondDate = new Date(ExpressionUtils.getField(dataAccessors, 'startDate', b.settings || b));
    return Math.sign(firstDate.getTime() - secondDate.getTime());
  });
};
