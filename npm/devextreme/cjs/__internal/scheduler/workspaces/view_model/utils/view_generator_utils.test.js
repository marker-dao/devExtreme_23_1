/**
* DevExtreme (cjs/__internal/scheduler/workspaces/view_model/utils/view_generator_utils.test.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var _view_generator_utils = require("./view_generator_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('view generator utils', () => {
  /*
     Calendar for 2023-06 for easier test cases understanding:
     mon tue wed thu fri sat sun
               1   2   3   4
   5   6   7   8   9   10  11
   12  13  14  15  16  17  18
   19  20  21  22  23  24  25
   26  27  28  29  30
     */
  (0, _globals.describe)('alignToFirstDayOfWeek', () => {
    (0, _jestEach.default)`
        date                      | firstDayOfWeek
        ${new Date('2023-06-26')} | ${1}
        ${new Date('2023-06-25')} | ${0}
    `.it('should return the same value if date is first day of week', _ref => {
      let {
        date,
        firstDayOfWeek
      } = _ref;
      const resultDate = (0, _view_generator_utils.alignToFirstDayOfWeek)(date, firstDayOfWeek);
      (0, _globals.expect)(resultDate).toEqual(date);
    });
    (0, _jestEach.default)`
        date                      | rightDate                 | firstDayOfWeek
        ${new Date('2023-06-29')} | ${new Date('2023-06-26')} | ${1}
        ${new Date('2023-06-27')} | ${new Date('2023-06-26')} | ${1}
        ${new Date('2023-06-30')} | ${new Date('2023-06-26')} | ${1}

        ${new Date('2023-06-25')} | ${new Date('2023-06-19')} | ${1}

        ${new Date('2023-06-26')} | ${new Date('2023-06-25')} | ${0}
    `.it('should return first day of current week', _ref2 => {
      let {
        date,
        rightDate,
        firstDayOfWeek
      } = _ref2;
      const resultDate = (0, _view_generator_utils.alignToFirstDayOfWeek)(date, firstDayOfWeek);
      (0, _globals.expect)(resultDate).toEqual(rightDate);
    });
  });
  (0, _globals.describe)('alignToLastDayOfWeek', () => {
    (0, _jestEach.default)`
        date                      | firstDayOfWeek
        ${new Date('2023-06-25')} | ${1}
        ${new Date('2023-06-24')} | ${0}
    `.it('should return the same value if date is last day of week', _ref3 => {
      let {
        date,
        firstDayOfWeek
      } = _ref3;
      const resultDate = (0, _view_generator_utils.alignToLastDayOfWeek)(date, firstDayOfWeek);
      (0, _globals.expect)(resultDate).toEqual(date);
    });
    (0, _jestEach.default)`
        date                      | rightDate                 | firstDayOfWeek
        ${new Date('2023-06-12')} | ${new Date('2023-06-18')} | ${1}
        ${new Date('2023-06-14')} | ${new Date('2023-06-18')} | ${1}
        ${new Date('2023-06-16')} | ${new Date('2023-06-18')} | ${1}

        ${new Date('2023-06-21')} | ${new Date('2023-06-25')} | ${1}
    `.it('should return last day of current week', _ref4 => {
      let {
        date,
        rightDate,
        firstDayOfWeek
      } = _ref4;
      const resultDate = (0, _view_generator_utils.alignToLastDayOfWeek)(date, firstDayOfWeek);
      (0, _globals.expect)(resultDate).toEqual(rightDate);
    });
  });
  (0, _globals.describe)('calculateDaysBetweenDates', () => {
    (0, _jestEach.default)`
        fromDate                  | toDate                     | res
        ${new Date('2023-06-28')} | ${new Date('2023-06-28')}  | ${1}
        ${new Date('2023-06-28')} | ${new Date('2023-06-29')}  | ${2}
        ${new Date('2023-06-28')} | ${new Date('2023-07-04')}  | ${7}
    `.it('should return right count of days between dates', _ref5 => {
      let {
        fromDate,
        toDate,
        res
      } = _ref5;
      (0, _globals.expect)((0, _view_generator_utils.calculateDaysBetweenDates)(fromDate, toDate)).toBe(res);
    });
    (0, _jestEach.default)`
        fromDate                  | toDate                     | res
        ${new Date('2023-06-28T23:59:00')} | ${new Date('2023-06-29T00:01:00')}  | ${2}
        ${new Date('2023-06-28T00:01:00')} | ${new Date('2023-06-28T23:59:00')}  | ${1}
    `.it('should return right count of days between dates when they have non-zero time', _ref6 => {
      let {
        fromDate,
        toDate,
        res
      } = _ref6;
      (0, _globals.expect)((0, _view_generator_utils.calculateDaysBetweenDates)(fromDate, toDate)).toBe(res);
    });
  });
  (0, _globals.describe)('calculateAlignedWeeksBetweenDates', () => {
    (0, _jestEach.default)`
        fromDate                  | toDate                     | res
        ${new Date('2023-10-01')} | ${new Date('2023-10-31')}  | ${6}
        ${new Date('2023-06-01')} | ${new Date('2023-07-31')}  | ${10}
    `.it('should return right count of days between dates', _ref7 => {
      let {
        fromDate,
        toDate,
        res
      } = _ref7;
      (0, _globals.expect)((0, _view_generator_utils.calculateAlignedWeeksBetweenDates)(fromDate, toDate, 1)).toBe(res);
    });
    (0, _jestEach.default)`
        fromDate                  | toDate                     | res
        ${new Date('2023-06-04')} | ${new Date('2023-06-12')}  | ${6}
        ${new Date('2023-06-05')} | ${new Date('2023-06-12')}  | ${6}
        ${new Date('2023-06-05')} | ${new Date('2023-06-11')}  | ${6}
    `.it('should return at least 6 weeks in order to not make breaking change', _ref8 => {
      let {
        fromDate,
        toDate,
        res
      } = _ref8;
      (0, _globals.expect)((0, _view_generator_utils.calculateAlignedWeeksBetweenDates)(fromDate, toDate, 1)).toBe(res);
    });
  });
});
