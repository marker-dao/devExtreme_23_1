/**
* DevExtreme (cjs/__internal/scheduler/appointments/data_provider/utils/shiftIntervals.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _shift_intervals = require("./shift_intervals");
const intervals = [{
  min: new Date(2000, 0, 10, 0, 6),
  max: new Date(2000, 0, 10, 23, 54)
}, {
  min: new Date(2000, 0, 11, 0, 6),
  max: new Date(2000, 0, 11, 23, 54)
}, {
  min: new Date(2000, 0, 12, 0, 6),
  max: new Date(2000, 0, 12, 23, 54)
}, {
  min: new Date(2000, 0, 13, 0, 6),
  max: new Date(2000, 0, 13, 23, 54)
}];
(0, _globals.describe)('getVisibleDateTimeIntervals', () => {
  (0, _globals.it)('should shift intervals by offset 0', () => {
    (0, _globals.expect)((0, _shift_intervals.shiftIntervals)(intervals, 0)).toEqual(intervals);
  });
  (0, _globals.it)('should shift intervals by offset 760 min', () => {
    (0, _globals.expect)((0, _shift_intervals.shiftIntervals)(intervals, 760 * 60000)).toEqual([{
      min: new Date(2000, 0, 10, 12, 46),
      max: new Date(2000, 0, 11, 12, 34)
    }, {
      min: new Date(2000, 0, 11, 12, 46),
      max: new Date(2000, 0, 12, 12, 34)
    }, {
      min: new Date(2000, 0, 12, 12, 46),
      max: new Date(2000, 0, 13, 12, 34)
    }, {
      min: new Date(2000, 0, 13, 12, 46),
      max: new Date(2000, 0, 14, 12, 34)
    }]);
  });
  (0, _globals.it)('should shift intervals by offset -760 min', () => {
    (0, _globals.expect)((0, _shift_intervals.shiftIntervals)(intervals, -760 * 60000)).toEqual([{
      min: new Date(2000, 0, 9, 11, 26),
      max: new Date(2000, 0, 10, 11, 14)
    }, {
      min: new Date(2000, 0, 10, 11, 26),
      max: new Date(2000, 0, 11, 11, 14)
    }, {
      min: new Date(2000, 0, 11, 11, 26),
      max: new Date(2000, 0, 12, 11, 14)
    }, {
      min: new Date(2000, 0, 12, 11, 26),
      max: new Date(2000, 0, 13, 11, 14)
    }]);
  });
});
