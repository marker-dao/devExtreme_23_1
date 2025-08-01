/**
* DevExtreme (cjs/__internal/scheduler/appointments/data_provider/utils/get_appointment_filter/get_recurrence_exception.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _timezone_calculator = require("../../../../r1/timezone_calculator");
var _get_recurrence_exception = require("./get_recurrence_exception");
(0, _globals.describe)('getRecurrenceException', () => {
  _globals.it.each([{
    timezone: 'Etc/GMT+9',
    result: '20000111T000000,20000112T000000,20000113T000000'
  }, {
    timezone: 'Etc/GMT+10',
    result: '20000110T230000,20000111T230000,20000112T230000'
  }, {
    timezone: 'Etc/GMT+11',
    result: '20000110T220000,20000111T220000,20000112T220000'
  }])('should convert exception dates to client timezones ($timezone)', _ref => {
    let {
      timezone,
      result
    } = _ref;
    (0, _globals.expect)((0, _get_recurrence_exception.getRecurrenceException)('20000111T090000Z,20000112T090000Z,20000113T090000Z', new Date('2000-01-11T09:00:00.000Z'), (0, _timezone_calculator.createTimeZoneCalculator)(timezone))).toBe(result);
  });
});
