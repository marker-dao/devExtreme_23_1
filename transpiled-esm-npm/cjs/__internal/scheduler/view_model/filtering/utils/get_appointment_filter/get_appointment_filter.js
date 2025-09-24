"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentFilter = void 0;
var _index = require("../../../../r1/utils/index");
var _get_appointment_occurrence_dates = require("./get_appointment_occurrence_dates");
var _get_appointments_occurrences = require("./get_appointments_occurrences");
var _is_appointment_matched_intervals = require("./is_appointment_matched_intervals");
var _is_appointment_matched_resources = require("./is_appointment_matched_resources");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getAppointmentFilter = (filterOptions, timeZoneCalculator) => {
  const {
    firstDayOfWeek,
    resources,
    allDayPanelFilter,
    allDayPanelMode,
    supportAllDayRow,
    visibleDateIntervals,
    visibleTimeIntervals,
    viewOffset
  } = filterOptions;
  return appointment => {
    const isAppointmentVisible = appointment.visible ?? true;
    if (!isAppointmentVisible) {
      return false;
    }
    // NOTE: Long appointments in views without all-day panel
    // should not become all-day appointments
    const isAllDayAppointment = supportAllDayRow ? (0, _index.isAppointmentTakesAllDay)(appointment, allDayPanelMode) : appointment.allDay;
    if (allDayPanelFilter !== undefined && isAllDayAppointment !== allDayPanelFilter) {
      return false;
    }
    const viewIntervals = isAllDayAppointment ? visibleDateIntervals : visibleTimeIntervals;
    if (viewIntervals.length === 0) {
      return false;
    }
    if (!(0, _is_appointment_matched_resources.isAppointmentMatchedResources)(appointment.rawAppointment, resources)) {
      return false;
    }
    const recurrenceInterval = {
      min: viewIntervals[0].min,
      max: viewIntervals[viewIntervals.length - 1].max
    };
    const appointmentOccurrences = (0, _get_appointments_occurrences.getAppointmentsOccurrences)(_extends({}, appointment, {
      allDay: isAllDayAppointment
    }), {
      firstDayOfWeek,
      interval: recurrenceInterval
    }, timeZoneCalculator).map(occurrence => _extends({}, occurrence, (0, _get_appointment_occurrence_dates.getAppointmentOccurrenceDates)(occurrence, viewOffset)));
    return appointmentOccurrences.some(appointmentOccurrence => (0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)(appointmentOccurrence, viewIntervals));
  };
};
exports.getAppointmentFilter = getAppointmentFilter;