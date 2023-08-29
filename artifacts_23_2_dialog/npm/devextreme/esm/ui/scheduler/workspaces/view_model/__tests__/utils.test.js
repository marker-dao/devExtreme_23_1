/**
* DevExtreme (esm/ui/scheduler/workspaces/view_model/__tests__/utils.test.js)
* Version: 23.2.0
* Build date: Tue Aug 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
/* eslint-disable no-undef */
import { alignToFirstDayOfWeek, alignToLastDayOfWeek, calculateDaysBetweenDates, calculateAlignedWeeksBetweenDates } from '../utils';
import each from 'jest-each';

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
  each(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        date                      | firstDayOfWeek\n        ", " | ", "\n        ", " | ", "\n    "])), new Date('2023-06-26'), 1, new Date('2023-06-25'), 0).it('should return the same value if date is first day of week', _ref => {
    var {
      date,
      firstDayOfWeek
    } = _ref;
    var resultDate = alignToFirstDayOfWeek(date, firstDayOfWeek);
    expect(resultDate).toEqual(date);
  });
  each(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        date                      | rightDate                 | firstDayOfWeek \n        ", " | ", " | ", "\n        ", " | ", " | ", "\n        ", " | ", " | ", "\n\n        ", " | ", " | ", "\n\n        ", " | ", " | ", "\n    "])), new Date('2023-06-29'), new Date('2023-06-26'), 1, new Date('2023-06-27'), new Date('2023-06-26'), 1, new Date('2023-06-30'), new Date('2023-06-26'), 1, new Date('2023-06-25'), new Date('2023-06-19'), 1, new Date('2023-06-26'), new Date('2023-06-25'), 0).it('should return first day of current week', _ref2 => {
    var {
      date,
      rightDate,
      firstDayOfWeek
    } = _ref2;
    var resultDate = alignToFirstDayOfWeek(date, firstDayOfWeek);
    expect(resultDate).toEqual(rightDate);
  });
});
describe('alignToLastDayOfWeek', () => {
  each(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        date                      | firstDayOfWeek\n        ", " | ", "\n        ", " | ", "\n    "])), new Date('2023-06-25'), 1, new Date('2023-06-24'), 0).it('should return the same value if date is last day of week', _ref3 => {
    var {
      date,
      firstDayOfWeek
    } = _ref3;
    var resultDate = alignToLastDayOfWeek(date, firstDayOfWeek);
    expect(resultDate).toEqual(date);
  });
  each(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        date                      | rightDate                 | firstDayOfWeek \n        ", " | ", " | ", "\n        ", " | ", " | ", "\n        ", " | ", " | ", "\n\n        ", " | ", " | ", "\n    "])), new Date('2023-06-12'), new Date('2023-06-18'), 1, new Date('2023-06-14'), new Date('2023-06-18'), 1, new Date('2023-06-16'), new Date('2023-06-18'), 1, new Date('2023-06-21'), new Date('2023-06-25'), 1).it('should return last day of current week', _ref4 => {
    var {
      date,
      rightDate,
      firstDayOfWeek
    } = _ref4;
    var resultDate = alignToLastDayOfWeek(date, firstDayOfWeek);
    expect(resultDate).toEqual(rightDate);
  });
});
describe('calculateDaysBetweenDates', () => {
  each(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-06-28'), new Date('2023-06-28'), 1, new Date('2023-06-28'), new Date('2023-06-29'), 2, new Date('2023-06-28'), new Date('2023-07-04'), 7).it('should return right count of days between dates', _ref5 => {
    var {
      fromDate,
      toDate,
      res
    } = _ref5;
    expect(calculateDaysBetweenDates(fromDate, toDate)).toBe(res);
  });
  each(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-06-28T23:59:00'), new Date('2023-06-29T00:01:00'), 2, new Date('2023-06-28T00:01:00'), new Date('2023-06-28T23:59:00'), 1).it('should return right count of days between dates when they have non-zero time', _ref6 => {
    var {
      fromDate,
      toDate,
      res
    } = _ref6;
    expect(calculateDaysBetweenDates(fromDate, toDate)).toBe(res);
  });
});
describe('calculateAlignedWeeksBetweenDates', () => {
  each(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-10-01'), new Date('2023-10-31'), 6, new Date('2023-06-01'), new Date('2023-07-31'), 10).it('should return right count of days between dates', _ref7 => {
    var {
      fromDate,
      toDate,
      res
    } = _ref7;
    expect(calculateAlignedWeeksBetweenDates(fromDate, toDate, 1)).toBe(res);
  });
  each(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n        fromDate                  | toDate                     | res\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n        ", " | ", "  | ", "\n    "])), new Date('2023-06-04'), new Date('2023-06-12'), 6, new Date('2023-06-05'), new Date('2023-06-12'), 6, new Date('2023-06-05'), new Date('2023-06-11'), 6).it('should return at least 6 weeks in order to not make breaking change', _ref8 => {
    var {
      fromDate,
      toDate,
      res
    } = _ref8;
    expect(calculateAlignedWeeksBetweenDates(fromDate, toDate, 1)).toBe(res);
  });
});
