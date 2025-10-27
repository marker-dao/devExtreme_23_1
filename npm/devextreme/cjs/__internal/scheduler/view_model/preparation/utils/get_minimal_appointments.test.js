/**
* DevExtreme (cjs/__internal/scheduler/view_model/preparation/utils/get_minimal_appointments.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _appointment_data_accessor = require("../../../__mock__/appointment_data_accessor.mock");
var _timezone_calculator = require("../../../r1/timezone_calculator");
var _appointment_data_accessor2 = require("../../../utils/data_accessor/appointment_data_accessor");
var _get_minimal_appointments = require("./get_minimal_appointments");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('getMinimalAppointments', () => {
  (0, _globals.it)('should prepare correct recurrence appointment', () => {
    const data = [{
      startDate: new Date(2021, 9, 8),
      endDate: new Date(2021, 9, 9),
      recurrenceRule: 'FREQ=WEEKLY'
    }];
    const expectedResult = {
      allDay: false,
      source: {
        startDate: data[0].startDate.getTime(),
        endDate: data[0].endDate.getTime()
      },
      hasRecurrenceRule: true,
      itemData: data[0],
      recurrenceException: undefined,
      recurrenceRule: 'FREQ=WEEKLY',
      visible: true,
      disabled: false
    };
    const result = (0, _get_minimal_appointments.getMinimalAppointments)(data, {
      dataAccessors: _appointment_data_accessor.mockAppointmentDataAccessor,
      timeZoneCalculator: (0, _timezone_calculator.createTimeZoneCalculator)('')
    });
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
        source: {
          startDate: data[0].startDate.getTime(),
          endDate: data[0].endDate.getTime()
        },
        hasRecurrenceRule: false,
        itemData: data[0],
        recurrenceException: undefined,
        recurrenceRule: recurrenceRule,
        visible: true,
        disabled: false
      };
      const result = (0, _get_minimal_appointments.getMinimalAppointments)(data, {
        dataAccessors: _appointment_data_accessor.mockAppointmentDataAccessor,
        timeZoneCalculator: (0, _timezone_calculator.createTimeZoneCalculator)('')
      });
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
      const result = (0, _get_minimal_appointments.getMinimalAppointments)(data, {
        dataAccessors: _appointment_data_accessor.mockAppointmentDataAccessor,
        timeZoneCalculator: (0, _timezone_calculator.createTimeZoneCalculator)('')
      });
      (0, _globals.expect)(result).toMatchObject([{
        visible: expected
      }]);
    });
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
    const result = (0, _get_minimal_appointments.getMinimalAppointments)(data, {
      dataAccessors: _appointment_data_accessor.mockAppointmentDataAccessor,
      timeZoneCalculator: (0, _timezone_calculator.createTimeZoneCalculator)('')
    });
    (0, _globals.expect)(result).toMatchObject([expectedTimezones]);
  });
  (0, _globals.it)('should access appointment fields by accessor', () => {
    const data = [{
      AllDay: true,
      StartDate: new Date(2021, 9, 8),
      EndDate: new Date(2021, 9, 9),
      RecurrenceRule: 'FREQ=WEEKLY',
      RecurrenceException: '1324400000',
      StartDateTimeZone: 'Etc/GMT+10',
      EndDateTimeZone: 'Etc/GMT-10',
      Disabled: true,
      Visible: false
    }];
    const result = (0, _get_minimal_appointments.getMinimalAppointments)(data, {
      dataAccessors: new _appointment_data_accessor2.AppointmentDataAccessor(_appointment_data_accessor.mockUppercaseFieldExpressions, true),
      timeZoneCalculator: (0, _timezone_calculator.createTimeZoneCalculator)('')
    });
    (0, _globals.expect)(result).toEqual([{
      allDay: true,
      source: {
        startDate: data[0].StartDate.getTime(),
        endDate: data[0].EndDate.getTime()
      },
      startDateTimeZone: 'Etc/GMT+10',
      endDateTimeZone: 'Etc/GMT-10',
      recurrenceRule: 'FREQ=WEEKLY',
      recurrenceException: '1324400000',
      hasRecurrenceRule: true,
      visible: false,
      disabled: true,
      itemData: data[0]
    }]);
  });
});
