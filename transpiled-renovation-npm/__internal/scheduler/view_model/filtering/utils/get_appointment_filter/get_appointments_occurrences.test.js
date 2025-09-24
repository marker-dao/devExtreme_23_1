"use strict";

var _globals = require("@jest/globals");
var _timezone_calculator = require("../../../../r1/timezone_calculator");
var _base = require("../../../../recurrence/base");
var _get_appointments_occurrences = require("./get_appointments_occurrences");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const options = {
  firstDayOfWeek: 3,
  interval: {
    min: new Date(2000, 0, 10),
    max: new Date(2000, 0, 15)
  }
};
const mockTimeZoneCalculator = (0, _timezone_calculator.createTimeZoneCalculator)(Intl.DateTimeFormat().resolvedOptions().timeZone);
(0, _globals.describe)('getAppointmentsOccurrences', () => {
  (0, _globals.it)('should return input appointment for not existed recurrence rule', () => {
    const appointment = {};
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([appointment]);
  });
  (0, _globals.it)('should return input appointment for invalid recurrence rule', () => {
    const appointment = {
      recurrenceRule: 'invalidRecurrenceRule'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([appointment]);
  });
  (0, _globals.it)('should crop appointment occurrences by hours', () => {
    const appointment = {
      startDate: new Date(2000, 0, 9, 20),
      endDate: new Date(2000, 0, 9, 21),
      recurrenceRule: 'FREQ=DAILY'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, {
      firstDayOfWeek: 3,
      interval: {
        min: new Date(2000, 0, 14, 10),
        max: new Date(2000, 0, 15, 15)
      }
    }, mockTimeZoneCalculator)).toEqual([_extends({}, appointment, {
      startDate: new Date(2000, 0, 14, 20),
      endDate: new Date(2000, 0, 14, 21)
    })]);
  });
  (0, _globals.it)('should not crop appointment occurrences by hours for full day interval', () => {
    const appointment = {
      startDate: new Date(2000, 0, 9, 20),
      endDate: new Date(2000, 0, 9, 21),
      recurrenceRule: 'FREQ=DAILY'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, {
      firstDayOfWeek: 3,
      interval: {
        min: new Date(2000, 0, 14, 0),
        max: new Date(2000, 0, 15, 24)
      }
    }, mockTimeZoneCalculator)).toEqual([_extends({}, appointment, {
      startDate: new Date(2000, 0, 14, 20),
      endDate: new Date(2000, 0, 14, 21)
    }), _extends({}, appointment, {
      startDate: new Date(2000, 0, 15, 20),
      endDate: new Date(2000, 0, 15, 21)
    })]);
  });
  (0, _globals.it)('should return appointment occurrences for appointment starts before view interval', () => {
    const appointment = {
      startDate: new Date(2000, 0, 9, 10),
      endDate: new Date(2000, 0, 9, 11),
      recurrenceRule: 'FREQ=DAILY'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([_extends({}, appointment, {
      startDate: new Date(2000, 0, 10, 10),
      endDate: new Date(2000, 0, 10, 11)
    }), _extends({}, appointment, {
      startDate: new Date(2000, 0, 11, 10),
      endDate: new Date(2000, 0, 11, 11)
    }), _extends({}, appointment, {
      startDate: new Date(2000, 0, 12, 10),
      endDate: new Date(2000, 0, 12, 11)
    }), _extends({}, appointment, {
      startDate: new Date(2000, 0, 13, 10),
      endDate: new Date(2000, 0, 13, 11)
    }), _extends({}, appointment, {
      startDate: new Date(2000, 0, 14, 10),
      endDate: new Date(2000, 0, 14, 11)
    })]);
  });
  (0, _globals.it)('should return appointment occurrences for appointment starts inside view interval', () => {
    const appointment = {
      startDate: new Date(2000, 0, 13, 10),
      endDate: new Date(2000, 0, 13, 11),
      recurrenceRule: 'FREQ=DAILY'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([appointment, _extends({}, appointment, {
      startDate: new Date(2000, 0, 14, 10),
      endDate: new Date(2000, 0, 14, 11)
    })]);
  });
  (0, _globals.it)('should return appointment occurrences for appointment starts after view interval', () => {
    const appointment = {
      startDate: new Date(2000, 0, 20, 10),
      endDate: new Date(2000, 0, 13, 11),
      recurrenceRule: 'FREQ=DAILY'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([]);
  });
  _globals.it.each([{
    title: 'appointment',
    delta: 0
  }, {
    title: 'appointment occurrence',
    delta: -20
  }])('should return $title is hagging view interval', _ref => {
    let {
      delta
    } = _ref;
    const appointment = {
      startDate: new Date(2000, 0, 9 + delta),
      endDate: new Date(2000, 0, 16 + delta),
      recurrenceRule: 'FREQ=DAILY;INTERVAL=20'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([{
      startDate: new Date(2000, 0, 9),
      endDate: new Date(2000, 0, 16),
      recurrenceRule: 'FREQ=DAILY;INTERVAL=20'
    }]);
  });
  _globals.it.each([{
    title: 'appointment',
    delta: 0
  }, {
    title: 'appointment occurrence',
    delta: -10
  }])('should return $title starts before view interval', _ref2 => {
    let {
      delta
    } = _ref2;
    const appointment = {
      startDate: new Date(2000, 0, 9 + delta, 20),
      endDate: new Date(2000, 0, 10 + delta, 10),
      recurrenceRule: 'FREQ=DAILY;INTERVAL=10'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([{
      startDate: new Date(2000, 0, 9, 20),
      endDate: new Date(2000, 0, 10, 10),
      recurrenceRule: 'FREQ=DAILY;INTERVAL=10'
    }]);
  });
  (0, _globals.it)('should return appointment occurrences for appointment with exceptions', () => {
    const exception1 = (0, _base.getAsciiStringByDate)(new Date(2000, 0, 11, 10));
    const exception2 = (0, _base.getAsciiStringByDate)(new Date(2000, 0, 12, 10));
    const exception3 = (0, _base.getAsciiStringByDate)(new Date(2000, 0, 13, 10));
    const appointment = {
      startDate: new Date(2000, 0, 9, 10),
      endDate: new Date(2000, 0, 9, 11),
      recurrenceException: `${exception1},${exception2},${exception3}`,
      recurrenceRule: 'FREQ=DAILY'
    };
    (0, _globals.expect)((0, _get_appointments_occurrences.getAppointmentsOccurrences)(appointment, options, mockTimeZoneCalculator)).toEqual([_extends({}, appointment, {
      startDate: new Date(2000, 0, 10, 10),
      endDate: new Date(2000, 0, 10, 11)
    }), _extends({}, appointment, {
      startDate: new Date(2000, 0, 14, 10),
      endDate: new Date(2000, 0, 14, 11)
    })]);
  });
});