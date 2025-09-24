"use strict";

var _globals = require("@jest/globals");
var _timezone_calculator = require("../../../../r1/timezone_calculator");
var _get_visible_date_time_intervals = require("../get_visible_date_time_intervals");
var _shift_intervals = require("../shift_intervals");
var _get_appointment_filter = require("./get_appointment_filter");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const minDay = 10;
const maxDay = 20;
const compareOptions = {
  startDayHour: 0,
  endDayHour: 24,
  min: new Date(2000, 0, minDay),
  max: new Date(2000, 0, maxDay)
};
const getViewportOptions = options => _extends({}, compareOptions, {
  resources: [],
  viewOffset: 0,
  firstDayOfWeek: 1,
  allDayPanelMode: 'all',
  supportAllDayRow: true
}, options, {
  visibleDateIntervals: (0, _shift_intervals.shiftIntervals)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)(_extends({}, compareOptions, options), true), options.viewOffset ?? 0),
  visibleTimeIntervals: (0, _shift_intervals.shiftIntervals)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)(_extends({}, compareOptions, options), false), options.viewOffset ?? 0)
});
const correctAppointment = {
  startDate: new Date(2000, 0, 15, 10),
  endDate: new Date(2000, 0, 15, 11),
  hasRecurrenceRule: false,
  allDay: false,
  visible: true,
  rawAppointment: {
    startDate: new Date(2000, 0, 15, 10),
    endDate: new Date(2000, 0, 15, 11)
  }
};
const mockTimeZoneCalculator = (0, _timezone_calculator.createTimeZoneCalculator)(Intl.DateTimeFormat().resolvedOptions().timeZone);
const MS_IN_HOUR = 3600000;
(0, _globals.describe)('getAppointmentFilter', () => {
  [{
    caseName: 'all day appointment',
    isAllDay: true,
    durationDays: 0
  }, {
    caseName: 'long appointment',
    isAllDay: false,
    durationDays: 2
  }, {
    caseName: 'short appointment',
    isAllDay: false,
    durationDays: 0
  }].forEach(_ref => {
    let {
      caseName,
      isAllDay,
      durationDays
    } = _ref;
    [12, -12].forEach(offsetInHours => {
      const viewOffset = offsetInHours * MS_IN_HOUR;
      (0, _globals.describe)(`${caseName} ${offsetInHours} hours grid offset`, () => {
        (0, _globals.it)('should filter appointment in the gap between intervals', () => {
          const endDayHour = 20;
          const startDayHour = 10;
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset: offsetInHours * MS_IN_HOUR,
            endDayHour,
            startDayHour
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, minDay + 1, endDayHour + 1 - offsetInHours),
            endDate: new Date(2000, 0, minDay + 2 + durationDays, startDayHour - 1 - offsetInHours),
            allDay: isAllDay
          }))).toBe(isAllDay || durationDays > 0);
        });
        (0, _globals.it)('should filter appointment near the interval start', () => {
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, minDay - durationDays, offsetInHours),
            endDate: new Date(2000, 0, minDay, 1 + offsetInHours),
            allDay: isAllDay
          }))).toBe(true);
        });
        (0, _globals.it)('should filter appointment cross the interval start', () => {
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, minDay - durationDays, -1 + offsetInHours, 30),
            endDate: new Date(2000, 0, minDay, offsetInHours, 30),
            allDay: isAllDay
          }))).toBe(true);
        });
        // TODO(10): long appointment draw with zero width, but shouldn't draw at all
        (durationDays > 0 ? _globals.it.skip : _globals.it)('should filter appointment out of interval start', () => {
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, minDay - durationDays, -1 + offsetInHours),
            endDate: new Date(2000, 0, minDay, offsetInHours),
            allDay: isAllDay
          }))).toBe(isAllDay);
        });
        (0, _globals.it)('should filter appointment with day less then interval start', () => {
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, minDay - durationDays - 1),
            endDate: new Date(2000, 0, minDay - 1),
            allDay: isAllDay
          }))).toBe(false);
        });
        (0, _globals.it)('should filter appointment near the interval end', () => {
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, maxDay + 1, -1 + offsetInHours),
            endDate: new Date(2000, 0, maxDay + 1 + durationDays, offsetInHours),
            allDay: isAllDay
          }))).toBe(true);
        });
        (0, _globals.it)('should filter appointment out of interval end', () => {
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, maxDay + 1, offsetInHours),
            endDate: new Date(2000, 0, maxDay + 1 + durationDays, 1 + offsetInHours),
            allDay: isAllDay
          }))).toBe(false);
        });
        (0, _globals.it)('should filter appointment with day greater then interval end', () => {
          (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
            viewOffset
          }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
            startDate: new Date(2000, 0, maxDay + 2),
            endDate: new Date(2000, 0, maxDay + 2 + durationDays),
            allDay: isAllDay
          }))).toBe(false);
        });
      });
    });
  });
});