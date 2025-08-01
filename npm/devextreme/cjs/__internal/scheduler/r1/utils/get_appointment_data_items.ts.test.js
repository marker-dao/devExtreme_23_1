/**
* DevExtreme (cjs/__internal/scheduler/r1/utils/get_appointment_data_items.ts.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _appointment_data_accessor = require("../../../scheduler/__mock__/appointment_data_accessor.mock");
var _timezone_calculator = require("../timezone_calculator");
var _get_appointment_data_items = require("./get_appointment_data_items");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('Data API', () => {
  (0, _globals.describe)('getAppointmentDataItems', () => {
    (0, _globals.it)('should prepare correct data items', () => {
      const data = [{
        startDate: new Date(2021, 9, 8),
        endDate: new Date(2021, 9, 9),
        recurrenceRule: 'FREQ=WEEKLY'
      }];
      const expectedResult = {
        allDay: false,
        endDate: new Date(2021, 9, 9),
        hasRecurrenceRule: true,
        rawAppointment: data[0],
        recurrenceException: undefined,
        recurrenceRule: 'FREQ=WEEKLY',
        startDate: new Date(2021, 9, 8),
        visible: true
      };
      const result = (0, _get_appointment_data_items.getAppointmentDataItems)(data, _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
      (0, _globals.expect)(result).toEqual([expectedResult]);
    });
    [null, undefined, ''].forEach(recurrenceRule => {
      (0, _globals.it)(`should prepare correct data items if recurrenceRule=${recurrenceRule}`, () => {
        const data = [{
          startDate: new Date(2021, 9, 8),
          endDate: new Date(2021, 9, 9),
          recurrenceRule: recurrenceRule
        }];
        const expectedResult = {
          allDay: false,
          endDate: new Date(2021, 9, 9),
          hasRecurrenceRule: false,
          rawAppointment: data[0],
          recurrenceException: undefined,
          recurrenceRule: recurrenceRule,
          startDate: new Date(2021, 9, 8),
          visible: true
        };
        const result = (0, _get_appointment_data_items.getAppointmentDataItems)(data, _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
        (0, _globals.expect)(result).toEqual([expectedResult]);
      });
    });
    [{
      visible: null,
      expected: true
    }, {
      visible: undefined,
      expected: true
    }, {
      visible: true,
      expected: true
    }, {
      visible: false,
      expected: false
    }].forEach(_ref => {
      let {
        visible,
        expected
      } = _ref;
      (0, _globals.it)(`should correctly set visible if appointment visible is ${visible}`, () => {
        const data = [{
          startDate: new Date(2021, 9, 8),
          endDate: new Date(2021, 9, 9),
          visible
        }];
        const result = (0, _get_appointment_data_items.getAppointmentDataItems)(data, _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
        (0, _globals.expect)(result).toMatchObject([{
          visible: expected
        }]);
      });
    });
    (0, _globals.it)('should return empty array if no dataItems', () => {
      let result = (0, _get_appointment_data_items.getAppointmentDataItems)(undefined, _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
      (0, _globals.expect)(result).toEqual([]);
      result = (0, _get_appointment_data_items.getAppointmentDataItems)([], _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
      (0, _globals.expect)(result).toEqual([]);
    });
    (0, _globals.it)('should return empty array without startDate', () => {
      const data = [{
        endDate: new Date(2021, 9, 9)
      }];
      const result = (0, _get_appointment_data_items.getAppointmentDataItems)(data, _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
      (0, _globals.expect)(result).toEqual([]);
    });
    (0, _globals.it)('should correct endDate value if it doesn\'t set', () => {
      const data = [{
        startDate: new Date(2021, 9, 9, 17)
      }];
      const expectedResult = {
        allDay: false,
        endDate: new Date(2021, 9, 9, 17, 30),
        hasRecurrenceRule: false,
        rawAppointment: _extends({}, data[0], {
          endDate: new Date(2021, 9, 9, 17, 30)
        }),
        recurrenceException: undefined,
        recurrenceRule: undefined,
        startDate: new Date(2021, 9, 9, 17),
        visible: true
      };
      const result = (0, _get_appointment_data_items.getAppointmentDataItems)(data, _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
      (0, _globals.expect)(result).toEqual([expectedResult]);
    });
    (0, _globals.it)('should return timezones of start date and end date if them exists', () => {
      const expectedTimezones = {
        startDateTimeZone: 'Etc/GMT+10',
        endDateTimeZone: 'Etc/GMT-10'
      };
      const data = [_extends({
        startDate: new Date(2021, 9, 8),
        endDate: new Date(2021, 9, 9)
      }, expectedTimezones)];
      const result = (0, _get_appointment_data_items.getAppointmentDataItems)(data, _appointment_data_accessor.mockAppointmentDataAccessor, 30, (0, _timezone_calculator.createTimeZoneCalculator)(''));
      (0, _globals.expect)(result).toMatchObject([expectedTimezones]);
    });
  });
});
(0, _globals.describe)('replaceIncorrectEndDate', () => {
  (0, _globals.it)('should process endDate correctly', () => {
    [{
      data: {
        startDate: new Date(2019, 4, 3, 12),
        allDay: false
      },
      expectedEndDate: new Date(2019, 4, 3, 12, 30)
    }, {
      data: {
        startDate: new Date(2019, 4, 3, 12),
        allDay: false,
        endDate: new Date('string')
      },
      expectedEndDate: new Date(2019, 4, 3, 12, 30)
    }, {
      data: {
        startDate: new Date(2019, 4, 3, 12),
        allDay: true
      },
      expectedEndDate: new Date(2019, 4, 3, 23, 59)
    }].forEach(item => {
      (0, _get_appointment_data_items.replaceIncorrectEndDate)(item.data, 30, _appointment_data_accessor.mockAppointmentDataAccessor);
      (0, _globals.expect)(item.data.endDate.getHours()).toBe(item.expectedEndDate.getHours());
      (0, _globals.expect)(item.data.endDate.getMinutes()).toBe(item.expectedEndDate.getMinutes());
    });
  });
  (0, _globals.it)('should return false for incorrect startDate', () => {
    [{}, {
      startDate: 'Invalid date format'
    }].forEach(data => {
      (0, _globals.expect)((0, _get_appointment_data_items.replaceIncorrectEndDate)(data, 30, _appointment_data_accessor.mockAppointmentDataAccessor)).toBe(false);
    });
  });
});
