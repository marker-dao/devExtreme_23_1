/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/split_by_recurrence/get_appointment_recurrence_occurrences.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentRecurrenceOccurrences = void 0;
var _base = require("../../../../recurrence/base");
var _generate_recurrence_utc_dates = require("./generate_recurrence_utc_dates");
var _get_date_information = require("./get_date_information");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// NOTE: When DST+1, then 2 AM equal 3 AM and interval [2 AM, 3 AM) is unreachable
// Recurrence is different because each occurrence has to have the same time in any timezone shift
const getUnreachableShiftRecurrence = (startDateInfo, endDateInfo) => {
  switch (true) {
    case startDateInfo.isUnreachableTime:
      return [startDateInfo.deltaMs, startDateInfo.deltaMs];
    case endDateInfo.isUnreachableTime:
      return [0, endDateInfo.deltaMs];
    default:
      return [0, 0];
  }
};
const getUnreachableShift = (startDateInfo, endDateInfo) => {
  switch (true) {
    case startDateInfo.isUnreachableTime && endDateInfo.isUnreachableTime:
      return [startDateInfo.deltaMs, startDateInfo.deltaMs];
    case startDateInfo.isUnreachableTime:
      return [startDateInfo.deltaMs, 0];
    case endDateInfo.isUnreachableTime:
      return [0, endDateInfo.deltaMs];
    case endDateInfo.isDoubleTimeStart:
      return [0, -endDateInfo.deltaMs];
    default:
      return [0, 0];
  }
};
const getAppointmentRecurrenceOccurrences = (appointment, _ref) => {
  let {
    firstDayOfWeek,
    interval,
    timeZone
  } = _ref;
  const {
    source: {
      startDate: startDateMsBase,
      endDate: endDateMsBase
    },
    startDateTimeZone,
    endDateTimeZone
  } = appointment;
  if (!appointment.hasRecurrenceRule) {
    const startDateInfo = (0, _get_date_information.getDateInformation)(startDateMsBase, timeZone);
    const endDateInfo = (0, _get_date_information.getDateInformation)(endDateMsBase, timeZone);
    const [startDateFix, endDateFix] = getUnreachableShift(startDateInfo, endDateInfo);
    return [_extends({}, appointment, {
      startDateUTC: startDateMsBase + startDateFix + startDateInfo.offsetMs,
      endDateUTC: endDateMsBase + endDateFix + endDateInfo.offsetMs
    })];
  }
  const duration = endDateMsBase - startDateMsBase;
  const dates = (0, _generate_recurrence_utc_dates.generateRecurrenceUTCDates)(appointment, {
    firstDayOfWeek,
    interval,
    timeZone,
    startDateTimeZone
  });
  const startDateOffsetBase = (0, _get_date_information.getDateOffsetMs)(startDateMsBase, timeZone);
  const startDateAppointmentOffsetBase = (0, _get_date_information.getDateOffsetMs)(startDateMsBase, startDateTimeZone);
  const endDateAppointmentOffsetBase = (0, _get_date_information.getDateOffsetMs)(endDateMsBase, endDateTimeZone);
  const exceptionDates = new Set(appointment.hasRecurrenceRule && appointment.recurrenceException ? appointment.recurrenceException.split(',').map(date => (0, _base.getDateByAsciiString)(date)).map(date => date ? date.getTime() : 0) : []);
  return dates.map(startDateMs => {
    // NOTE: Appointment can cross DST in Target timezone or in Appointment timezone,
    // so we need to calculate DST changes for both startDate and endDate
    const endDateMs = startDateMs + duration;
    const startDateInfo = (0, _get_date_information.getDateInformation)(startDateMs, timeZone);
    const startDateAppointmentOffset = (0, _get_date_information.getDateOffsetMs)(startDateMs, startDateTimeZone);
    const startChange = startDateOffsetBase - startDateInfo.offsetMs;
    const startAppointmentChange = startDateAppointmentOffsetBase - startDateAppointmentOffset;
    const startDateDSTChange = startDateTimeZone ? startAppointmentChange : startChange;
    const endDateInfo = (0, _get_date_information.getDateInformation)(endDateMs, timeZone);
    const endDateAppointmentOffset = (0, _get_date_information.getDateOffsetMs)(endDateMs, endDateTimeZone);
    const endChange = startDateOffsetBase - endDateInfo.offsetMs;
    const endAppointmentChange = endDateAppointmentOffsetBase - endDateAppointmentOffset;
    const endDateDSTChange = endDateTimeZone ? endAppointmentChange : endChange;
    const [startDateFix, endDateFix] = getUnreachableShiftRecurrence(startDateInfo, endDateInfo);
    const sourceStartDate = startDateMs + startDateDSTChange;
    const sourceEndDate = endDateMs + endDateDSTChange;
    return _extends({}, appointment, {
      source: {
        startDate: sourceStartDate,
        endDate: sourceEndDate
      },
      startDateUTC: sourceStartDate + startDateFix + startDateInfo.offsetMs,
      endDateUTC: sourceEndDate + endDateFix + endDateInfo.offsetMs
    });
  }).filter(item => !exceptionDates.has(item.source.startDate));
};
exports.getAppointmentRecurrenceOccurrences = getAppointmentRecurrenceOccurrences;
