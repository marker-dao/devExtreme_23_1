/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtering/utils/get_visible_date_time_intervals.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _get_visible_date_time_intervals = require("./get_visible_date_time_intervals");
(0, _globals.describe)('getVisibleDateTimeIntervals', () => {
  (0, _globals.it)('should return only one interval for date only view', () => {
    (0, _globals.expect)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)({
      startDayHour: 3,
      endDayHour: 10,
      min: new Date(2000, 0, 10, 3),
      max: new Date(2000, 0, 15, 10)
    }, true)).toEqual([{
      min: new Date(2000, 0, 10),
      max: new Date(2000, 0, 16)
    }]);
  });
  (0, _globals.it)('should return only one interval for date only view (wrong hours)', () => {
    (0, _globals.expect)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)({
      startDayHour: 10,
      endDayHour: 3,
      min: new Date(2000, 0, 10, 10),
      max: new Date(2000, 0, 15, 3)
    }, true)).toEqual([{
      min: new Date(2000, 0, 10),
      max: new Date(2000, 0, 16)
    }]);
  });
  (0, _globals.it)('should return one interval for hours [0, 24]', () => {
    (0, _globals.expect)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)({
      startDayHour: 0,
      endDayHour: 24,
      min: new Date(2000, 0, 10),
      max: new Date(2000, 0, 15)
    }, false)).toEqual([{
      min: new Date(2000, 0, 10),
      max: new Date(2000, 0, 16)
    }]);
  });
  (0, _globals.it)('should return day by day intervals for [3, 10]', () => {
    (0, _globals.expect)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)({
      startDayHour: 3,
      endDayHour: 10,
      min: new Date(2000, 0, 10, 10),
      max: new Date(2000, 0, 15, 5)
    }, false)).toEqual([{
      min: new Date(2000, 0, 10, 3),
      max: new Date(2000, 0, 10, 10)
    }, {
      min: new Date(2000, 0, 11, 3),
      max: new Date(2000, 0, 11, 10)
    }, {
      min: new Date(2000, 0, 12, 3),
      max: new Date(2000, 0, 12, 10)
    }, {
      min: new Date(2000, 0, 13, 3),
      max: new Date(2000, 0, 13, 10)
    }, {
      min: new Date(2000, 0, 14, 3),
      max: new Date(2000, 0, 14, 10)
    }, {
      min: new Date(2000, 0, 15, 3),
      max: new Date(2000, 0, 15, 10)
    }]);
  });
  (0, _globals.it)('should return day by day intervals for [0.1, 23.9]', () => {
    (0, _globals.expect)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)({
      startDayHour: 0.1,
      endDayHour: 23.9,
      min: new Date(2000, 0, 10),
      max: new Date(2000, 0, 13)
    }, false)).toEqual([{
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
    }]);
  });
  (0, _globals.it)('should return zero intervals for interacted hours', () => {
    (0, _globals.expect)((0, _get_visible_date_time_intervals.getVisibleDateTimeIntervals)({
      startDayHour: 20,
      endDayHour: 10,
      min: new Date(2000, 0, 10, 10),
      max: new Date(2000, 0, 15, 5)
    }, false)).toEqual([]);
  });
});
