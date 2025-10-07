/**
* DevExtreme (cjs/__internal/scheduler/recurrence/base.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _base = require("./base");
(0, _globals.describe)('recurrence base utils', () => {
  (0, _globals.describe)('getAsciiStringByDate', () => {
    (0, _globals.it)('should return equivalent ISO value', () => {
      const etalon = new Date(1997, 11, 23, 16);
      const expectedResult = etalon.toISOString().replace(/[:-]/g, '').replace('.000Z', 'Z');
      const result = (0, _base.getAsciiStringByDate)(etalon);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
  (0, _globals.describe)('getRecurrenceString', () => {
    (0, _globals.it)('should handle objects with freq', () => {
      const string = (0, _base.getRecurrenceString)({
        freq: 'yearly',
        interval: 2
      });
      (0, _globals.expect)(string).toEqual('FREQ=YEARLY;INTERVAL=2');
    });
    (0, _globals.it)('should handle objects with freq & interval', () => {
      const string = (0, _base.getRecurrenceString)({
        freq: 'yearly',
        interval: 1
      });
      (0, _globals.expect)(string).toEqual('FREQ=YEARLY');
    });
    (0, _globals.it)('should handle objects with freq & interval > 1', () => {
      const string = (0, _base.getRecurrenceString)({
        freq: 'yearly',
        interval: 2
      });
      (0, _globals.expect)(string).toEqual('FREQ=YEARLY;INTERVAL=2');
    });
    (0, _globals.it)('should handle objects without freq', () => {
      const string = (0, _base.getRecurrenceString)({
        interval: 2
      });
      (0, _globals.expect)(string).toEqual(undefined);
    });
    (0, _globals.it)('should handle objects with until', () => {
      const string = (0, _base.getRecurrenceString)({
        freq: 'yearly',
        until: new Date(Date.UTC(2015, 6, 9)),
        interval: 1
      });
      (0, _globals.expect)(string).toEqual('FREQ=YEARLY;UNTIL=20150709T000000Z');
    });
    (0, _globals.it)('should handle objects with each possible field', () => {
      const string = (0, _base.getRecurrenceString)({
        freq: 'yearly',
        until: new Date(Date.UTC(2015, 6, 9)),
        interval: 1
      });
      (0, _globals.expect)(string).toEqual('FREQ=YEARLY;UNTIL=20150709T000000Z');
    });
    (0, _globals.it)('should return string with freq ahead', () => {
      const string = (0, _base.getRecurrenceString)({
        interval: 10,
        freq: 'monthly'
      });
      (0, _globals.expect)(string).toEqual('FREQ=MONTHLY;INTERVAL=10');
    });
  });
  (0, _globals.describe)('getDateByAsciiString', () => {
    (0, _globals.it)('should return a valid date for yyyyMMddThhmmss format', () => {
      const date = (0, _base.getDateByAsciiString)('20150303T030000');
      (0, _globals.expect)(date).toEqual(new Date(2015, 2, 3, 3, 0));
    });
    (0, _globals.it)('should return a valid date for yyyyMMddTHHmmss format', () => {
      const date = (0, _base.getDateByAsciiString)('20150303T173000');
      (0, _globals.expect)(date).toEqual(new Date(2015, 2, 3, 17, 30));
    });
    (0, _globals.it)('should return a valid date for yyyyMMdd format', () => {
      const date = (0, _base.getDateByAsciiString)('20150303');
      (0, _globals.expect)(date).toEqual(new Date(2015, 2, 3));
    });
    (0, _globals.it)('should return a valid date for yyyyMMddTHHmmssZ format', () => {
      const date = (0, _base.getDateByAsciiString)('20160711T230000Z');
      (0, _globals.expect)(date).toEqual(new Date(Date.UTC(2016, 6, 11, 23)));
    });
    [{
      value: '20160711T230000Z',
      date: new Date(Date.UTC(2016, 6, 11, 23, 0, 0))
    }, {
      value: '20160711T230000',
      date: new Date(2016, 6, 11, 23, 0, 0)
    }, {
      value: '20160711',
      date: new Date(2016, 6, 11)
    }].forEach(testCase => {
      (0, _globals.it)(`should be return valid of date from '${testCase.value}'`, () => {
        const result = (0, _base.getDateByAsciiString)(testCase.value);
        (0, _globals.expect)(result).toEqual(testCase.date);
      });
    });
  });
});
