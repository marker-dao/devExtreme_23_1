/**
* DevExtreme (cjs/__internal/scheduler/appointments/resizing/get_delta_time.test.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _constants_view = require("../../utils/options/constants_view");
var _get_delta_time = require("./get_delta_time");
(0, _globals.describe)('getDeltaTime', () => {
  _constants_view.VIEW_TYPES.forEach(view => {
    (0, _globals.it)(`should return zero for not resized appointment in ${view} view`, () => {
      (0, _globals.expect)((0, _get_delta_time.getDeltaTime)({
        width: 100,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: true
      })).toBe(0);
    });
  });
  ['day', 'week', 'workWeek'].forEach(view => {
    (0, _globals.it)(`should return correct delta in px for resized appointment in vertical ${view} view`, () => {
      (0, _globals.expect)((0, _get_delta_time.getDeltaTime)({
        width: 100,
        height: 50
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: false
      })).toBe(-30 * 60000);
    });
    (0, _globals.it)(`should return correct delta in px for resized all day appointment in vertical ${view} view`, () => {
      (0, _globals.expect)((0, _get_delta_time.getDeltaTime)({
        width: 50,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: true
      })).toBe(-24 * 3600000);
    });
  });
  ['timelineMonth', 'month'].forEach(view => {
    (0, _globals.it)(`should return correct delta in px for resized appointment in ${view} view`, () => {
      (0, _globals.expect)((0, _get_delta_time.getDeltaTime)({
        width: 50,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: false
      })).toBe(-24 * 3600000);
    });
  });
  ['timelineDay', 'timelineWeek', 'timelineWorkWeek'].forEach(view => {
    (0, _globals.it)(`should return zero for not resized appointment in horizontal ${view} view`, () => {
      (0, _globals.expect)((0, _get_delta_time.getDeltaTime)({
        width: 50,
        height: 100
      }, {
        width: 100,
        height: 100
      }, {
        viewType: view,
        cellSize: {
          width: 50,
          height: 50
        },
        resizableStep: 50,
        cellDurationInMinutes: 30,
        isAllDayPanel: false
      })).toBe(-30 * 60000);
    });
  });
});
