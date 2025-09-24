"use strict";

var _globals = require("@jest/globals");
var _get_appointment_occurrence_dates = require("./get_appointment_occurrence_dates");
const MS_IN_MINUTE = 60 * 1000;
(0, _globals.describe)('getAppointmentOccurrenceDates', () => {
  (0, _globals.describe)('getShiftedAllDayStartDate', () => {
    _globals.it.each([{
      caseName: 'between start and end of day',
      originalStartDate: new Date('2024-01-01T10:00:00'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's start of day date
      expectedResult: new Date('2024-01-01T01:00:00')
    }, {
      caseName: 'equal start of day',
      originalStartDate: new Date('2024-01-01T01:00:00'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's start of day date
      expectedResult: new Date('2024-01-01T01:00:00')
    }, {
      caseName: 'equal end of day minus one ms',
      originalStartDate: new Date('2024-01-02T00:59:59'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's start of day date
      expectedResult: new Date('2024-01-01T01:00:00')
    }, {
      caseName: 'equal end of day',
      originalStartDate: new Date('2024-01-02T01:00:00'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's start of next day date
      expectedResult: new Date('2024-01-02T01:00:00')
    }, {
      caseName: 'before start of day',
      originalStartDate: new Date('2024-01-01T10:00:00'),
      viewOffset: 720 * MS_IN_MINUTE,
      // NOTE: it's start of previous day date
      expectedResult: new Date('2023-12-31T12:00:00')
    }, {
      caseName: 'after end of day',
      originalStartDate: new Date('2024-01-01T00:00:00'),
      viewOffset: -720 * MS_IN_MINUTE,
      // NOTE: it's start of next day date
      expectedResult: new Date('2023-12-31T12:00:00')
    }])('should shift start date in case: $caseName', _ref => {
      let {
        originalStartDate,
        viewOffset,
        expectedResult
      } = _ref;
      const result = (0, _get_appointment_occurrence_dates.getShiftedAllDayStartDate)(originalStartDate, viewOffset);
      (0, _globals.expect)(result).toStrictEqual(expectedResult);
    });
  });
  (0, _globals.describe)('getShiftedAllDayEndDate', () => {
    _globals.it.each([{
      caseName: 'between start and end of day',
      originalEndDate: new Date('2024-01-01T10:00:00'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's end of day date
      expectedResult: new Date('2024-01-02T00:59:59')
    }, {
      caseName: 'equal start of day',
      originalEndDate: new Date('2024-01-01T01:00:00'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's end of day date
      expectedResult: new Date('2024-01-02T00:59:59')
    }, {
      caseName: 'equal end of day minus one ms',
      originalEndDate: new Date('2024-01-02T00:59:59'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's end of day date
      expectedResult: new Date('2024-01-02T00:59:59')
    }, {
      caseName: 'equal end of day',
      originalEndDate: new Date('2024-01-02T01:00:00'),
      viewOffset: 60 * MS_IN_MINUTE,
      // NOTE: it's end of next day date
      expectedResult: new Date('2024-01-03T00:59:59')
    }, {
      caseName: 'before start of day',
      originalEndDate: new Date('2024-01-01T10:00:00'),
      viewOffset: 720 * MS_IN_MINUTE,
      // NOTE: it's end of previous day date
      expectedResult: new Date('2024-01-01T11:59:59')
    }, {
      caseName: 'after end of day',
      originalEndDate: new Date('2024-01-01T00:00:00'),
      viewOffset: -720 * MS_IN_MINUTE,
      // NOTE: it's end of next day date
      expectedResult: new Date('2024-01-01T11:59:59')
    }])('should shift end date in case: $caseName', _ref2 => {
      let {
        originalEndDate,
        viewOffset,
        expectedResult
      } = _ref2;
      const result = (0, _get_appointment_occurrence_dates.getShiftedAllDayEndDate)(originalEndDate, viewOffset);
      (0, _globals.expect)(result).toStrictEqual(expectedResult);
    });
  });
  (0, _globals.describe)('getAppointmentOccurrenceDates', () => {
    _globals.it.each([{
      caseName: 'regular appointment (not all-day)',
      dates: {
        start: new Date('2024-01-01T10:00:00'),
        end: new Date('2024-01-01T11:00:00')
      },
      allDay: false,
      viewOffset: 0,
      expectedResult: {
        start: new Date('2024-01-01T10:00:00'),
        end: new Date('2024-01-01T11:00:00')
      }
    }, {
      caseName: 'regular appointment (not all-day) with offset',
      dates: {
        start: new Date('2024-01-01T10:00:00'),
        end: new Date('2024-01-01T11:00:00')
      },
      allDay: false,
      viewOffset: 720 * MS_IN_MINUTE,
      expectedResult: {
        start: new Date('2024-01-01T10:00:00'),
        end: new Date('2024-01-01T11:00:00')
      }
    }, {
      caseName: 'all-day appointment',
      dates: {
        start: new Date('2024-01-01T10:00:00'),
        end: new Date('2024-01-01T11:00:00')
      },
      allDay: true,
      viewOffset: 0,
      expectedResult: {
        start: new Date('2024-01-01T00:00:00'),
        end: new Date('2024-01-01T23:59:59')
      }
    }, {
      caseName: 'all-day appointment with offset',
      dates: {
        start: new Date('2024-01-01T10:00:00'),
        end: new Date('2024-01-01T13:00:00')
      },
      allDay: true,
      viewOffset: 720 * MS_IN_MINUTE,
      expectedResult: {
        // NOTE: start of previous day
        start: new Date('2023-12-31T12:00:00'),
        // NOTE: shifted end of this day
        end: new Date('2024-01-02T11:59:59')
      }
    }])('should correct appointment occurrence dates in case: $caseName', _ref3 => {
      let {
        dates,
        allDay,
        viewOffset,
        expectedResult
      } = _ref3;
      const result = (0, _get_appointment_occurrence_dates.getAppointmentOccurrenceDates)({
        startDate: dates.start,
        endDate: dates.end,
        allDay
      }, viewOffset);
      (0, _globals.expect)([result.startDate, result.endDate]).toStrictEqual([expectedResult.start, expectedResult.end]);
    });
  });
});