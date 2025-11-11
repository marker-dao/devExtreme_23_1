/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/split_by_recurrence/get_appointment_recurrence_occurrences.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _base = require("../../../../recurrence/base");
var _get_appointment_recurrence_occurrences = require("./get_appointment_recurrence_occurrences");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const options = {
  firstDayOfWeek: 3,
  interval: {
    min: Date.UTC(2000, 0, 10),
    max: Date.UTC(2000, 0, 15)
  },
  timeZone: 'America/Los_Angeles'
};
const HOUR_MS = 3600000;
(0, _globals.describe)('getAppointmentRecurrenceOccurrences', () => {
  (0, _globals.describe)('without recurrence rule', () => {
    (0, _globals.it)('should return shift appointment according to timeZone', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2000, 0, 10, 10),
          endDate: Date.UTC(2000, 0, 10, 11)
        }
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        startDateUTC: appointment.source.startDate - HOUR_MS * 8,
        endDateUTC: appointment.source.endDate - HOUR_MS * 8
      })]);
    });
    (0, _globals.it)('should return shift appointment according to timeZone cross summer DST', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2025, 2, 9, 1),
          endDate: Date.UTC(2025, 2, 9, 4)
        }
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        startDateUTC: appointment.source.startDate - HOUR_MS * 8,
        endDateUTC: appointment.source.endDate - HOUR_MS * 8
      })]);
    });
    (0, _globals.it)('should return shift appointment according to timeZone cross winter DST', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2025, 10, 2, 1),
          endDate: Date.UTC(2025, 10, 2, 4)
        }
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        startDateUTC: appointment.source.startDate - HOUR_MS * 7,
        endDateUTC: appointment.source.endDate - HOUR_MS * 7
      })]);
    });
    (0, _globals.it)('should return shift appointment according to timeZone in unreachable time', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2025, 2, 9, 2, 15),
          endDate: Date.UTC(2025, 2, 9, 3, 45)
        }
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        startDateUTC: appointment.source.startDate - HOUR_MS * 8,
        endDateUTC: appointment.source.endDate - HOUR_MS * 8
      })]);
    });
  });
  (0, _globals.describe)('with recurrence rule', () => {
    (0, _globals.it)('should return the same source in any timezone if appointment timezone set', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2025, 0, 7, 1),
          endDate: Date.UTC(2025, 0, 7, 2)
        },
        startDateTimeZone: 'America/Chicago',
        endDateTimeZone: 'America/Chicago',
        recurrenceRule: 'FREQ=DAILY',
        hasRecurrenceRule: true
      };
      const getSources = (date, timeZone) => {
        const dateCopy = new Date(date);
        return (0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, {
          interval: {
            min: dateCopy.setDate(dateCopy.getDate() - 2),
            max: dateCopy.setDate(dateCopy.getDate() + 2)
          },
          timeZone
        }).map(item => ({
          startDate: new Date(item.source.startDate).toUTCString(),
          endDate: new Date(item.source.endDate).toUTCString()
        }));
      };
      const sourcesChicago = [...getSources(Date.UTC(2025, 1), 'America/Chicago'), ...getSources(Date.UTC(2025, 6), 'America/Chicago'), ...getSources(Date.UTC(2025, 11), 'America/Chicago')];
      const sourcesSydney = [...getSources(Date.UTC(2025, 1) + 24 * HOUR_MS, 'Australia/Sydney'), ...getSources(Date.UTC(2025, 6) + 24 * HOUR_MS, 'Australia/Sydney'), ...getSources(Date.UTC(2025, 11) + 24 * HOUR_MS, 'Australia/Sydney')];
      const sourcesBelgrade = [...getSources(Date.UTC(2025, 1) + 24 * HOUR_MS, 'Europe/Belgrade'), ...getSources(Date.UTC(2025, 6) + 24 * HOUR_MS, 'Europe/Belgrade'), ...getSources(Date.UTC(2025, 11) + 24 * HOUR_MS, 'Europe/Belgrade')];
      (0, _globals.expect)(sourcesChicago).toEqual(sourcesSydney);
      (0, _globals.expect)(sourcesChicago).toEqual(sourcesBelgrade);
    });
    (0, _globals.it)('should return appointment occurrences for appointment starts before view interval', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2000, 0, 9, 10),
          endDate: Date.UTC(2000, 0, 9, 11)
        },
        recurrenceRule: 'FREQ=DAILY',
        hasRecurrenceRule: true
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 10, 10),
          endDate: Date.UTC(2000, 0, 10, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 10, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 10, 11) - HOUR_MS * 8
      }), _extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 11, 10),
          endDate: Date.UTC(2000, 0, 11, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 11, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 11, 11) - HOUR_MS * 8
      }), _extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 12, 10),
          endDate: Date.UTC(2000, 0, 12, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 12, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 12, 11) - HOUR_MS * 8
      }), _extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 13, 10),
          endDate: Date.UTC(2000, 0, 13, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 13, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 13, 11) - HOUR_MS * 8
      }), _extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 14, 10),
          endDate: Date.UTC(2000, 0, 14, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 14, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 14, 11) - HOUR_MS * 8
      })]);
    });
    (0, _globals.it)('should return appointment occurrences for appointment starts inside view interval', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2000, 0, 13, 10),
          endDate: Date.UTC(2000, 0, 13, 11)
        },
        recurrenceRule: 'FREQ=DAILY',
        hasRecurrenceRule: true
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        startDateUTC: Date.UTC(2000, 0, 13, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 13, 11) - HOUR_MS * 8
      }), _extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 14, 10),
          endDate: Date.UTC(2000, 0, 14, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 14, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 14, 11) - HOUR_MS * 8
      })]);
    });
    (0, _globals.it)('should return appointment occurrences for appointment starts after view interval', () => {
      const appointment = {
        source: {
          startDate: Date.UTC(2000, 0, 20, 10),
          endDate: Date.UTC(2000, 0, 13, 11)
        },
        recurrenceRule: 'FREQ=DAILY',
        hasRecurrenceRule: true
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([]);
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
        source: {
          startDate: Date.UTC(2000, 0, 9 + delta),
          endDate: Date.UTC(2000, 0, 16 + delta)
        },
        recurrenceRule: 'FREQ=DAILY;INTERVAL=20',
        hasRecurrenceRule: true
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 9),
          endDate: Date.UTC(2000, 0, 16)
        },
        startDateUTC: Date.UTC(2000, 0, 9) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 16) - HOUR_MS * 8
      })]);
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
        source: {
          startDate: Date.UTC(2000, 0, 9 + delta, 20),
          endDate: Date.UTC(2000, 0, 10 + delta, 10)
        },
        recurrenceRule: 'FREQ=DAILY;INTERVAL=10',
        hasRecurrenceRule: true
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 9, 20),
          endDate: Date.UTC(2000, 0, 10, 10)
        },
        startDateUTC: Date.UTC(2000, 0, 9, 20) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 10, 10) - HOUR_MS * 8
      })]);
    });
    (0, _globals.it)('should return appointment occurrences for appointment with exceptions', () => {
      const exception1 = (0, _base.getAsciiStringByDate)(new Date(Date.UTC(2000, 0, 11, 10)));
      const exception2 = (0, _base.getAsciiStringByDate)(new Date(Date.UTC(2000, 0, 12, 10)));
      const exception3 = (0, _base.getAsciiStringByDate)(new Date(Date.UTC(2000, 0, 13, 10)));
      const appointment = {
        source: {
          startDate: Date.UTC(2000, 0, 9, 10),
          endDate: Date.UTC(2000, 0, 9, 11)
        },
        recurrenceException: `${exception1},${exception2},${exception3}`,
        recurrenceRule: 'FREQ=DAILY',
        hasRecurrenceRule: true
      };
      (0, _globals.expect)((0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, options)).toEqual([_extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 10, 10),
          endDate: Date.UTC(2000, 0, 10, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 10, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 10, 11) - HOUR_MS * 8
      }), _extends({}, appointment, {
        source: {
          startDate: Date.UTC(2000, 0, 14, 10),
          endDate: Date.UTC(2000, 0, 14, 11)
        },
        startDateUTC: Date.UTC(2000, 0, 14, 10) - HOUR_MS * 8,
        endDateUTC: Date.UTC(2000, 0, 14, 11) - HOUR_MS * 8
      })]);
    });
  });
});
