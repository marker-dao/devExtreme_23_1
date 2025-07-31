"use strict";

var _globals = require("@jest/globals");
var _timezone_calculator = require("../../../../r1/timezone_calculator");
var _resource_loader = require("../../../../utils/loader/resource_loader");
var _get_visible_date_time_intervals = require("../get_visible_date_time_intervals");
var _get_appointment_filter = require("./get_appointment_filter");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const minDay = 10;
const maxDay = 20;
const startDayHour = 10;
const endDayHour = 20;
const compareOptions = {
  startDayHour,
  endDayHour,
  min: new Date(2000, 0, minDay, startDayHour),
  max: new Date(2000, 0, maxDay, endDayHour)
};
const viewportOptions = _extends({}, compareOptions, {
  resources: [],
  viewOffset: 0,
  firstDayOfWeek: 3,
  allDayPanelMode: 'all',
  supportAllDayRow: true,
  visibleDateIntervals: (0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)(compareOptions, true),
  visibleTimeIntervals: (0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)(compareOptions, false)
});
const getViewportOptions = options => _extends({}, viewportOptions, options, {
  visibleDateIntervals: (0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)(_extends({}, compareOptions, options), true),
  visibleTimeIntervals: (0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)(_extends({}, compareOptions, options), false)
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
const correctAllDayAppointment = _extends({}, correctAppointment, {
  allDay: true
});
const correctSeveralDaysAppointment = {
  startDate: new Date(2000, 0, 15, 10),
  endDate: new Date(2000, 0, 16, 11),
  hasRecurrenceRule: false,
  allDay: false,
  visible: true,
  rawAppointment: {
    startDate: new Date(2000, 0, 15, 10),
    endDate: new Date(2000, 0, 16, 11)
  }
};
const correctRecurrenceAppointment = {
  startDate: new Date(2000, 0, 1, 10),
  endDate: new Date(2000, 0, 1, 11),
  recurrenceRule: 'FREQ=DAILY',
  hasRecurrenceRule: true,
  allDay: false,
  visible: true,
  rawAppointment: {
    startDate: new Date(2000, 0, 1, 10),
    endDate: new Date(2000, 0, 1, 11),
    recurrenceRule: 'FREQ=DAILY'
  }
};
const mockTimeZoneCalculator = (0, _timezone_calculator.createTimeZoneCalculator)(Intl.DateTimeFormat().resolvedOptions().timeZone);
const assignee = new _resource_loader.ResourceLoader({
  fieldExpr: 'assigneeId',
  allowMultiple: true,
  dataSource: [{
    id: 2
  }]
});
const yearMs = new Date(2001, 0).getTime() - new Date(2000, 0).getTime();
(0, _globals.describe)('getAppointmentFilter', () => {
  (0, _globals.it)('should pass long appointment ends before start day hour', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
      startDayHour: 10,
      endDayHour: 20
    }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
      startDate: new Date(2000, 0, minDay - 1, 4),
      endDate: new Date(2000, 0, minDay, 8)
    }))).toBe(true);
  });
  (0, _globals.it)('should filter out appointment for zero hours duration', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
      startDayHour: 20,
      endDayHour: 10
    }), mockTimeZoneCalculator)(correctAppointment)).toBe(false);
  });
  (0, _globals.it)('should ignore zero hours duration for all day appointment', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
      startDayHour: 20,
      endDayHour: 10
    }), mockTimeZoneCalculator)(correctAllDayAppointment)).toBe(true);
  });
  (0, _globals.it)('should pass correct appointment', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(correctAppointment)).toBe(true);
  });
  (0, _globals.it)('should pass correct all day appointment', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(correctAllDayAppointment)).toBe(true);
  });
  (0, _globals.it)('should pass correct all day appointment with zero duration in day view', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
      min: new Date(2000, 0, 15, startDayHour),
      max: new Date(2000, 0, 15, endDayHour)
    }), mockTimeZoneCalculator)(_extends({}, correctAllDayAppointment, {
      startDate: new Date(2000, 0, 15),
      endDate: new Date(2000, 0, 15)
    }))).toBe(true);
  });
  (0, _globals.it)('should pass correct all day appointment with zero hours', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
      min: new Date(2000, 0, 16, startDayHour),
      max: new Date(2000, 0, 16, endDayHour)
    }), mockTimeZoneCalculator)(_extends({}, correctAllDayAppointment, {
      startDate: new Date(2000, 0, 15),
      endDate: new Date(2000, 0, 16)
    }))).toBe(true);
  });
  (0, _globals.it)('should pass correct several days appointment', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(correctSeveralDaysAppointment)).toBe(true);
  });
  (0, _globals.it)('should pass correct recurrence appointment', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(correctRecurrenceAppointment)).toBe(true);
  });
  _globals.describe.each([true, false])('allDayPanelFilter: %s', allDayPanelFilter => {
    (0, _globals.it)(`should filter all day appointment with allDayPanelFilter=${allDayPanelFilter}`, () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
        allDayPanelFilter
      }), mockTimeZoneCalculator)(correctAllDayAppointment)).toBe(allDayPanelFilter);
    });
    (0, _globals.it)(`should filter long appointment with allDayPanelFilter=${allDayPanelFilter}`, () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
        allDayPanelFilter
      }), mockTimeZoneCalculator)(correctSeveralDaysAppointment)).toBe(allDayPanelFilter);
    });
    (0, _globals.it)(`should filter appointment with allDayPanelFilter=${allDayPanelFilter}`, () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
        allDayPanelFilter
      }), mockTimeZoneCalculator)(correctAppointment)).toBe(!allDayPanelFilter);
    });
  });
  (0, _globals.it)('should filter out invisible appointments', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)({
      visible: false
    })).toBe(false);
  });
  _globals.it.each([{
    title: 'allDay mode',
    allDayPanelMode: 'allDay',
    appointment: {
      allDay: true
    }
  }, {
    title: 'allDay appointment',
    allDayPanelMode: 'all',
    appointment: {
      allDay: true
    }
  }, {
    title: 'one day duration appointment',
    allDayPanelMode: 'all',
    appointment: {
      allDay: false,
      startDate: new Date(2000, 0, 1),
      endDate: new Date(2000, 1, 2)
    }
  }])('should filter out hidden all day appointments ($title)', _ref => {
    let {
      allDayPanelMode,
      appointment
    } = _ref;
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(_extends({}, viewportOptions, {
      allDayPanelFilter: false,
      allDayPanelMode
    }), mockTimeZoneCalculator)(appointment)).toBe(false);
  });
  (0, _globals.it)('should filter out all day resource incorrect appointment (hidden mode)', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(_extends({}, viewportOptions, {
      resources: [assignee],
      allDayPanelFilter: false,
      allDayPanelMode: 'hidden'
    }), mockTimeZoneCalculator)(correctAllDayAppointment)).toBe(false);
  });
  (0, _globals.it)('should filter out resource incorrect appointment', () => {
    (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(_extends({}, viewportOptions, {
      resources: [assignee]
    }), mockTimeZoneCalculator)(correctAppointment)).toBe(false);
  });
  _globals.describe.each([{
    title: 'all day',
    allDay: true,
    result: true
  }, {
    title: 'month view',
    allDay: false,
    result: false
  }, {
    title: 'day view',
    allDay: false,
    result: false
  }])('$title', _ref2 => {
    let {
      title,
      allDay,
      result
    } = _ref2;
    (0, _globals.it)(`should filter out ${title} recurrence appointment`, () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
        min: new Date(2000, 0, maxDay, startDayHour),
        max: new Date(2000, 0, maxDay, endDayHour)
      }), mockTimeZoneCalculator)(_extends({}, correctRecurrenceAppointment, {
        recurrenceRule: 'FREQ=DAILY',
        startDate: new Date(2000, 0, 1, endDayHour + 1),
        endDate: new Date(2000, 0, 1, endDayHour + 2),
        allDay
      }))).toBe(result);
    });
    (0, _globals.it)(`should filter out ${title} appointment`, () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
        min: new Date(2000, 0, maxDay, startDayHour),
        max: new Date(2000, 0, maxDay, endDayHour)
      }), mockTimeZoneCalculator)(_extends({}, correctAppointment, {
        startDate: new Date(2000, 0, maxDay, endDayHour + 1),
        endDate: new Date(2000, 0, maxDay, endDayHour + 2),
        allDay
      }))).toBe(result);
    });
  });
  _globals.describe.each([{
    title: 'single appointment',
    appointmentConfig: {},
    dayShift: 0
  }, {
    title: 'recurrence appointment (occurrence)',
    appointmentConfig: {
      recurrenceRule: 'FREQ=DAILY;INTERVAL=30;COUNT=2'
    },
    dayShift: -30
  }])('$title', _ref3 => {
    let {
      appointmentConfig,
      dayShift
    } = _ref3;
    (0, _globals.it)('should compare tiny appointment on one day view', () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
        min: new Date(2000, 0, maxDay),
        max: new Date(2000, 0, maxDay)
      }), mockTimeZoneCalculator)(_extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, maxDay + dayShift, startDayHour + 1),
        endDate: new Date(2000, 0, maxDay + dayShift, endDayHour - 1),
        allDay: false
      }))).toBe(true);
    });
    (0, _globals.it)('should compare tiny appointment starts and ends inside the gap', () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, minDay + 1 + dayShift, endDayHour + 1),
        endDate: new Date(2000, 0, minDay + 2 + dayShift, startDayHour - 1),
        allDay: false
      }))).toBe(false);
    });
    (0, _globals.it)('should compare tiny appointment starts and ends inside the gap after (same day)', () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, minDay + 1 + dayShift, endDayHour + 1),
        endDate: new Date(2000, 0, minDay + 1 + dayShift, endDayHour + 2),
        allDay: false
      }))).toBe(false);
    });
    (0, _globals.it)('should compare tiny appointment starts and ends inside the gap before (same day)', () => {
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, minDay + 1 + dayShift, startDayHour - 2),
        endDate: new Date(2000, 0, minDay + 1 + dayShift, startDayHour - 1),
        allDay: false
      }))).toBe(false);
    });
    _globals.it.each([{
      title: '0. all day appointment',
      allDay: true
    }, {
      title: '0. several days appointment',
      allDay: false
    }])('should compare $title starts and ends inside the gap', _ref4 => {
      let {
        allDay
      } = _ref4;
      (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, minDay + 1 + dayShift, endDayHour + 1),
        endDate: new Date(2000, 0, maxDay + 3 + dayShift, startDayHour - 1),
        allDay
      }))).toBe(true);
    });
    _globals.describe.each([{
      title: '1. all day appointment',
      appointment: _extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, 15, 10, 30),
        endDate: new Date(2000, 0, 17, 10, 30),
        allDay: true
      }),
      ignoreHours: true
    }, {
      title: '1. several days appointment',
      appointment: _extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, 15, 10, 30),
        endDate: new Date(2000, 0, 17, 10, 30),
        allDay: false
      }),
      ignoreHours: false
    }, {
      title: '1. tiny appointment',
      appointment: _extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, 15, 10, 30),
        endDate: new Date(2000, 0, 15, 11),
        allDay: false
      }),
      ignoreHours: false
    }, {
      title: '1. tiny appointment in month view',
      appointment: _extends({}, appointmentConfig, {
        startDate: new Date(2000, 0, 15, 10, 30),
        endDate: new Date(2000, 0, 15, 11),
        allDay: false
      }),
      ignoreHours: false
    }])('$title', _ref5 => {
      let {
        appointment,
        ignoreHours
      } = _ref5;
      const daysDuration = appointment.endDate.getDate() - appointment.startDate.getDate();
      (0, _globals.it)('should compare appointment less then start', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(appointment.startDate.getTime() - yearMs),
          endDate: new Date(appointment.endDate.getTime() - yearMs)
        }))).toBe(false);
      });
      (0, _globals.it)('should compare appointment greater then end', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(appointment.startDate.getTime() + yearMs),
          endDate: new Date(appointment.endDate.getTime() + yearMs)
        }))).toBe(false);
      });
      (0, _globals.it)('should compare appointment between start and date', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, minDay + dayShift, startDayHour + 1),
          endDate: new Date(2000, 0, minDay + daysDuration + dayShift, startDayHour + 1, 30)
        }))).toBe(true);
      });
      (0, _globals.it)('should compare appointment ends in start date (same day)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, minDay - daysDuration + dayShift, startDayHour - 1),
          endDate: new Date(2000, 0, minDay + dayShift, startDayHour + 1, 30)
        }))).toBe(true);
      });
      (0, _globals.it)('should compare appointment starts in end date (same day)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, maxDay + dayShift, endDayHour - 1, 30),
          endDate: new Date(2000, 0, maxDay + daysDuration + dayShift, endDayHour + 1)
        }))).toBe(true);
      });
      (0, _globals.it)('should compare appointment ends in start date (same hours)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, minDay - daysDuration + dayShift, startDayHour - 1),
          endDate: new Date(2000, 0, minDay + dayShift, startDayHour, 30)
        }))).toBe(true);
      });
      (0, _globals.it)('should compare appointment starts in end date (same hours)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
          endDayHour: endDayHour + 0.5
        }), mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, maxDay + dayShift, endDayHour, 10),
          endDate: new Date(2000, 0, maxDay + daysDuration + dayShift, endDayHour + 1)
        }))).toBe(true);
      });
      (0, _globals.it)('should compare appointment ends in start date (out of hours)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(_extends({}, viewportOptions, {
          allDayPanelMode: 'allDay'
        }), mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, minDay - daysDuration + dayShift, startDayHour - 2),
          endDate: new Date(2000, 0, minDay + dayShift, startDayHour - 1)
        }))).toBe(ignoreHours);
      });
      (0, _globals.it)('should compare appointment starts in end date (out of hours)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(_extends({}, viewportOptions, {
          allDayPanelMode: 'allDay'
        }), mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, maxDay + dayShift, endDayHour + 1),
          endDate: new Date(2000, 0, maxDay + daysDuration + dayShift, endDayHour + 2)
        }))).toBe(ignoreHours);
      });
      (0, _globals.it)('should compare appointment ends in start date (same hours, out of minutes)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(getViewportOptions({
          startDayHour: startDayHour + 0.5,
          allDayPanelMode: 'allDay'
        }), mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, minDay - daysDuration + dayShift, startDayHour - 1),
          endDate: new Date(2000, 0, minDay + dayShift, startDayHour, 10)
        }))).toBe(ignoreHours);
      });
      (0, _globals.it)('should compare appointment starts in end date (same hours, out of minutes)', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(_extends({}, viewportOptions, {
          allDayPanelMode: 'allDay'
        }), mockTimeZoneCalculator)(_extends({}, appointment, {
          startDate: new Date(2000, 0, maxDay + dayShift, endDayHour, 10),
          endDate: new Date(2000, 0, maxDay + daysDuration + dayShift, endDayHour + 1)
        }))).toBe(ignoreHours);
      });
    });
    _globals.describe.each([{
      title: '2. all day appointment',
      appointment: {
        startDate: new Date(2000, 0, 15, 10, 30),
        endDate: new Date(2000, 0, 17, 10, 30),
        allDay: true
      }
    }, {
      title: '2. several days appointment',
      appointment: {
        startDate: new Date(2000, 0, 15, 10, 30),
        endDate: new Date(2000, 0, 17, 10, 30),
        allDay: false
      }
    }, {
      title: '2. several days appointment in month view',
      appointment: {
        startDate: new Date(2000, 0, 15, 10, 30),
        endDate: new Date(2000, 0, 17, 10, 30),
        allDay: false
      }
    }])('$title', _ref6 => {
      let {
        appointment
      } = _ref6;
      (0, _globals.it)('should compare appointment starts and ends outside the view', () => {
        (0, _globals.expect)((0, _get_appointment_filter.getAppointmentFilter)(viewportOptions, mockTimeZoneCalculator)(_extends({}, appointment, appointmentConfig, {
          startDate: new Date(2000, 0, minDay - 1 + dayShift, startDayHour + 1),
          endDate: new Date(2000, 0, maxDay + 1 + dayShift, startDayHour + 2)
        }))).toBe(true);
      });
    });
  });
});