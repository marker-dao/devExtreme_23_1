"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentsOccurrences = void 0;
var _date = require("../../../../../core/utils/date");
var _generate_dates = require("../../../../recurrence/generate_dates");
var _validate_rule = require("../../../../recurrence/validate_rule");
var _get_recurrence_exception = require("./get_recurrence_exception");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getAppointmentsOccurrences = (appointment, _ref, timeZoneCalculator) => {
  let {
    firstDayOfWeek,
    interval
  } = _ref;
  if (!(0, _validate_rule.validateRRule)(appointment.recurrenceRule)) {
    return [appointment];
  }
  const recurrenceException = (0, _get_recurrence_exception.getRecurrenceException)(appointment.recurrenceException, appointment.startDate, timeZoneCalculator);
  const startDates = (0, _generate_dates.generateDates)({
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
    endDate: _date.dateUtilsTs.addOffsets(startDate, duration)
  }));
};
exports.getAppointmentsOccurrences = getAppointmentsOccurrences;