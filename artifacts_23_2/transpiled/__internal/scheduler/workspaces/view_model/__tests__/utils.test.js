"use strict";

var _jestEach = _interopRequireDefault(require("jest-each"));
var _m_utils = require("../m_utils");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
/* eslint-disable no-undef */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
/*

Calendar for 2023-06 for easier test cases understanding:

mon tue wed thu fri sat sun
             1   2   3   4
 5   6   7   8   9   10  11
 12  13  14  15  16  17  18
 19  20  21  22  23  24  25
 26  27  28  29  30

*/
describe('alignToFirstDayOfWeek', () => {
  (0, _jestEach.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        date                      | firstDayOfWeek\n        ", " | ", "\n        ", " | ", "\n    "])), new Date('2023-06-26'), 1, new Date('2023-06-25'), 0).it('should return the same value if date is first day of week', _ref => {
    let {
      date,
      firstDayOfWeek
    } = _ref;
    const resultDate = (0, _m_utils.alignToFirstDayOfWeek)(date, firstDayOfWeek);
    expect(resultDate).toEqual(date);
  });
  (0, _jestEach.default)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        date                      | rightDate                 | firstDayOfWeek\n        ", " | ", " | ", "\n        ", " | ", " | ", "\n        ", " | ", " | ", "\n\n        ", " | ", " | ", "\n\n        ", " | ", " | ", "\n    "])), new Date('2023-06-29'), new Date('2023-06-26'), 1, new Date('2023-06-27'), new Date('2023-06-26'), 1, new Date('2023-06-30'), new Date('2023-06-26'), 1, new Date('2023-06-25'), new Date('2023-06-19'), 1, new Date('2023-06-26'), new Date('2023-06-25'), 0).it('should return first day of current week', _ref2 => {
    let {
      date,
      rightDate,
      firstDayOfWeek
    } = _ref2;
    const resultDate = (0, _m_utils.alignToFirstDayOfWeek)(date, firstDayOfWeek);
    expect(resultDate).toEqual(rightDate);
  });
});
describe('alignToLastDayOfWeek', () => {
  (0, _jestEach.default)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        date                      | firstDayOfWeek\n        ", " | ", "\n        ", " | ", "\n    "])), new Date('2023-06-25'), 1, new Date('2023-06-24'), 0).it('should return the same value if date is last day of week', _ref3 => {
    let {
      date,
      firstDayOfWeek
    } = _ref3;
    const resultDate = (0, _m_utils.alignToLastDayOfWeek)(date, firstDayOfWeek);
    expect(resultDate).toEqual(date);
  });
  (0, _jestEach.default)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        date                      | rightDate                 | firstDayOfWeek\n        ", " | ", " | ", "\n        ", " | ", " | ", "\n        ", " | ", " | ", "\n\n        ", " | ", " | ", "\n    "])), new Date('2023-06-12'), new Date('2023-06-18'), 1, new Date('2023-06-14'), new Date('2023-06-18'), 1, new Date('2023-06-16'), new Date('2023-06-18'), 1, new Date('2023-06-21'), new Date('2023-06-25'), 1).it('should return last day of current week', _ref4 => {
    let {
      date,
      rightDate,
      firstDayOfWeek
    } = _ref4;
    const resultDate = (0, _m_utils.alignToLastDayOfWeek)(date, firstDayOfWeek);
    expect(resultDate).toEqual(rightDate);
  });
});
describe('calculateDaysBetweenDates', () => {
  (0, _jestEach.default)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-06-28'), new Date('2023-06-28'), 1, new Date('2023-06-28'), new Date('2023-06-29'), 2, new Date('2023-06-28'), new Date('2023-07-04'), 7).it('should return right count of days between dates', _ref5 => {
    let {
      fromDate,
      toDate,
      res
    } = _ref5;
    expect((0, _m_utils.calculateDaysBetweenDates)(fromDate, toDate)).toBe(res);
  });
  (0, _jestEach.default)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-06-28T23:59:00'), new Date('2023-06-29T00:01:00'), 2, new Date('2023-06-28T00:01:00'), new Date('2023-06-28T23:59:00'), 1).it('should return right count of days between dates when they have non-zero time', _ref6 => {
    let {
      fromDate,
      toDate,
      res
    } = _ref6;
    expect((0, _m_utils.calculateDaysBetweenDates)(fromDate, toDate)).toBe(res);
  });
});
describe('calculateAlignedWeeksBetweenDates', () => {
  (0, _jestEach.default)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-10-01'), new Date('2023-10-31'), 6, new Date('2023-06-01'), new Date('2023-07-31'), 10).it('should return right count of days between dates', _ref7 => {
    let {
      fromDate,
      toDate,
      res
    } = _ref7;
    expect((0, _m_utils.calculateAlignedWeeksBetweenDates)(fromDate, toDate, 1)).toBe(res);
  });
  (0, _jestEach.default)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-06-04'), new Date('2023-06-12'), 6, new Date('2023-06-05'), new Date('2023-06-12'), 6, new Date('2023-06-05'), new Date('2023-06-11'), 6).it('should return at least 6 weeks in order to not make breaking change', _ref8 => {
    let {
      fromDate,
      toDate,
      res
    } = _ref8;
    expect((0, _m_utils.calculateAlignedWeeksBetweenDates)(fromDate, toDate, 1)).toBe(res);
  });
});