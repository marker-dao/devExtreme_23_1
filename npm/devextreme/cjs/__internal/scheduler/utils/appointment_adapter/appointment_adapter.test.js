/**
* DevExtreme (cjs/__internal/scheduler/utils/appointment_adapter/appointment_adapter.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _appointment_data_accessor = require("../../../scheduler/__mock__/appointment_data_accessor.mock");
var _timezone_calculator = require("../../r1/timezone_calculator");
var _appointment_data_accessor2 = require("../data_accessor/appointment_data_accessor");
var _appointment_adapter = require("./appointment_adapter");
const mockCalculator = (0, _timezone_calculator.createTimeZoneCalculator)('America/Los_Angeles');
const mockAppointmentDataAccessor = new _appointment_data_accessor2.AppointmentDataAccessor(_appointment_data_accessor.mockFieldExpressions, true, 'yyyy/MM/dd HH:mm:ss');
(0, _globals.describe)('AppointmentAdapter', () => {
  (0, _globals.describe)('duration', () => {
    (0, _globals.it)('should return duration between startDate and endDate', () => {
      const now = Date.now();
      const adapter = new _appointment_adapter.AppointmentAdapter({
        startDate: now,
        endDate: now + 3600000
      }, mockAppointmentDataAccessor);
      (0, _globals.expect)(adapter.duration).toBe(3600000);
    });
    (0, _globals.it)('should return 0 if endDate unavailable', () => {
      const adapter = new _appointment_adapter.AppointmentAdapter({
        startDate: new Date()
      }, mockAppointmentDataAccessor);
      (0, _globals.expect)(adapter.duration).toBe(0);
    });
  });
  (0, _globals.describe)('isRecurrent', () => {
    (0, _globals.it)('should return true if recurrence rule is correct', () => {
      const adapter = new _appointment_adapter.AppointmentAdapter({
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,SA'
      }, mockAppointmentDataAccessor);
      (0, _globals.expect)(adapter.isRecurrent).toBe(true);
    });
    (0, _globals.it)('should return false if recurrence rule is incorrect', () => {
      const adapter = new _appointment_adapter.AppointmentAdapter({
        recurrenceRule: 'Broken'
      }, mockAppointmentDataAccessor);
      (0, _globals.expect)(adapter.isRecurrent).toBe(false);
    });
    (0, _globals.it)('should return true if recurrence rule is not defined', () => {
      const adapter = new _appointment_adapter.AppointmentAdapter({}, mockAppointmentDataAccessor);
      (0, _globals.expect)(adapter.isRecurrent).toBe(false);
    });
  });
  (0, _globals.describe)('clone', () => {
    (0, _globals.it)('should clone appointment', () => {
      const appointment = {};
      const adapter = new _appointment_adapter.AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      const nextAdapter = adapter.clone();
      nextAdapter.allDay = true;
      nextAdapter.text = 'Text';
      (0, _globals.expect)(appointment).toBe(appointment);
      (0, _globals.expect)(nextAdapter.source).toEqual({
        allDay: true,
        text: 'Text'
      });
    });
  });
  (0, _globals.describe)('serialize', () => {
    (0, _globals.it)('should serialize appointment dates', () => {
      const appointment = {
        startDate: new Date(2000, 0, 5).getTime(),
        endDate: new Date(2000, 0, 7).getTime()
      };
      const adapter = new _appointment_adapter.AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      adapter.serialize();
      (0, _globals.expect)(adapter.source).toEqual({
        startDate: '2000/01/05 00:00:00',
        endDate: '2000/01/07 00:00:00'
      });
      (0, _globals.expect)(appointment).toBe(adapter.source);
    });
  });
  (0, _globals.describe)('getCalculatedDates', () => {
    (0, _globals.it)('should return calculate dates', () => {
      const appointment = {
        startDate: Date.UTC(2000, 1, 5, 12),
        endDate: Date.UTC(2000, 1, 7, 9)
      };
      const adapter = new _appointment_adapter.AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      (0, _globals.expect)(adapter.getCalculatedDates(mockCalculator, 'toGrid')).toEqual({
        startDate: new Date(2000, 1, 5, 4),
        endDate: new Date(2000, 1, 7, 1)
      });
    });
    (0, _globals.it)('should return calculate dates of different timezones', () => {
      const appointment = {
        startDate: Date.UTC(2020, 1, 4, 5),
        startDateTimeZone: 'Europe/Moscow',
        endDateTimeZone: 'Asia/Yekaterinburg',
        endDate: Date.UTC(2020, 1, 4, 6)
      };
      const adapter = new _appointment_adapter.AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      (0, _globals.expect)(adapter.getCalculatedDates(mockCalculator, 'toGrid')).toEqual({
        startDate: new Date(2020, 1, 3, 21),
        endDate: new Date(2020, 1, 3, 22)
      });
    });
  });
  (0, _globals.describe)('calculateDates', () => {
    (0, _globals.it)('should calculate dates', () => {
      const appointment = {
        startDate: Date.UTC(2000, 1, 5, 12),
        endDate: Date.UTC(2000, 1, 7, 9)
      };
      const adapter = new _appointment_adapter.AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      adapter.calculateDates(mockCalculator, 'toGrid');
      (0, _globals.expect)(adapter.source).toEqual({
        startDate: '2000/02/05 04:00:00',
        endDate: '2000/02/07 01:00:00'
      });
      (0, _globals.expect)(appointment).toBe(adapter.source);
    });
  });
});
