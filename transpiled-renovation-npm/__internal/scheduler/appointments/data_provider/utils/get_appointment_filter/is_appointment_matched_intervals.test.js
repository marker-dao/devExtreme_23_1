"use strict";

var _globals = require("@jest/globals");
var _is_appointment_matched_intervals = require("./is_appointment_matched_intervals");
const viewIntervals = [{
  min: new Date(2000, 0, 10),
  max: new Date(2000, 0, 16)
}];
const timeIntervals = [{
  min: new Date(2000, 0, 10, 3, 30),
  max: new Date(2000, 0, 10, 10, 30)
}, {
  min: new Date(2000, 0, 11, 3, 30),
  max: new Date(2000, 0, 11, 10, 30)
}, {
  min: new Date(2000, 0, 12, 3, 30),
  max: new Date(2000, 0, 12, 10, 30)
}, {
  min: new Date(2000, 0, 13, 3, 30),
  max: new Date(2000, 0, 13, 10, 30)
}, {
  min: new Date(2000, 0, 14, 3, 30),
  max: new Date(2000, 0, 14, 10, 30)
}, {
  min: new Date(2000, 0, 15, 3, 30),
  max: new Date(2000, 0, 15, 10, 30)
}];
(0, _globals.describe)('isAppointmentMatchedIntervals', () => {
  (0, _globals.it)('should compare zero-duration appointment on start of the time interval', () => {
    (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
      startDate: timeIntervals[1].min,
      endDate: timeIntervals[1].min
    }, timeIntervals)).toBe(true);
  });
  (0, _globals.it)('should compare zero-duration appointment on start of the view interval', () => {
    (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
      startDate: viewIntervals[0].min,
      endDate: viewIntervals[0].min
    }, viewIntervals)).toBe(true);
  });
  _globals.describe.each([{
    title: 'one view interval',
    intervals: viewIntervals,
    isDateOnly: true
  }, {
    title: 'time intervals',
    intervals: timeIntervals,
    isDateOnly: false
  }])('$title', _ref => {
    let {
      intervals,
      isDateOnly
    } = _ref;
    (0, _globals.it)('should compare appointment before intervals', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(1999, 0, 10, 10),
        endDate: new Date(1999, 0, 11, 5)
      }, intervals)).toBe(false);
    });
    (0, _globals.it)('should compare appointment after intervals', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2001, 0, 10, 10),
        endDate: new Date(2001, 0, 11, 5)
      }, intervals)).toBe(false);
    });
    (0, _globals.it)('should compare appointment intersect interval by end date', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 9, 10),
        endDate: new Date(2000, 0, 10, 5)
      }, intervals)).toBe(true);
    });
    (0, _globals.it)('should compare appointment intersect interval by end date (hours)', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 9, 5),
        endDate: new Date(2000, 0, 10, 3, 0)
      }, intervals)).toBe(isDateOnly);
    });
    (0, _globals.it)('should compare appointment intersect interval by end date (minutes)', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 9, 5),
        endDate: new Date(2000, 0, 10, 3, 35)
      }, intervals)).toBe(true);
    });
    (0, _globals.it)('should compare appointment intersect interval by start date', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 15, 5),
        endDate: new Date(2000, 0, 16, 5)
      }, intervals)).toBe(true);
    });
    (0, _globals.it)('should compare appointment intersect interval by start date (hours)', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 15, 10, 40),
        endDate: new Date(2000, 0, 16, 3, 0)
      }, intervals)).toBe(isDateOnly);
    });
    (0, _globals.it)('should compare appointment intersect interval by start date (minutes)', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 15, 10, 20),
        endDate: new Date(2000, 0, 16, 3, 0)
      }, intervals)).toBe(true);
    });
    (0, _globals.it)('should compare appointment inside interval', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 12, 5),
        endDate: new Date(2000, 0, 12, 8)
      }, intervals)).toBe(true);
    });
    (0, _globals.it)('should compare appointment inside gap between days', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 12, 23),
        endDate: new Date(2000, 0, 13, 2)
      }, intervals)).toBe(isDateOnly);
    });
    (0, _globals.it)('should compare appointment inside gap before interval same day', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 12, 1),
        endDate: new Date(2000, 0, 12, 2)
      }, intervals)).toBe(isDateOnly);
    });
    (0, _globals.it)('should compare appointment inside gap after interval same day', () => {
      (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
        startDate: new Date(2000, 0, 12, 11),
        endDate: new Date(2000, 0, 12, 12)
      }, intervals)).toBe(isDateOnly);
    });
  });
  (0, _globals.it)('should compare appointment hugging view interval', () => {
    (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
      startDate: new Date(2000, 0, 9, 12),
      endDate: new Date(2000, 0, 17, 10)
    }, viewIntervals)).toBe(true);
  });
  (0, _globals.it)('should compare appointment hugging time interval', () => {
    (0, _globals.expect)((0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
      startDate: new Date(2000, 0, 12, 1),
      endDate: new Date(2000, 0, 12, 12)
    }, timeIntervals)).toBe(true);
  });
});