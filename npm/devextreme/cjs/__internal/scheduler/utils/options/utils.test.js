/**
* DevExtreme (cjs/__internal/scheduler/utils/options/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _constants_view = require("./constants_view");
var _utils = require("./utils");
(0, _globals.describe)('views utils', () => {
  (0, _globals.describe)('getViews', () => {
    (0, _globals.it)('should filter view with incorrect name', () => {
      (0, _globals.expect)((0, _utils.getViews)(['unknown'])).toEqual([]);
    });
    (0, _globals.it)('should filter view with incorrect type', () => {
      (0, _globals.expect)((0, _utils.getViews)([{
        type: 'unknown'
      }])).toEqual([]);
    });
    (0, _globals.it)('should not override view options by default options', () => {
      const input = {
        groupOrientation: 'vertical',
        type: 'day',
        intervalCount: 2,
        name: 'MyDay',
        groups: ['a', 'b']
      };
      (0, _globals.expect)((0, _utils.getViews)([input])).toEqual([input]);
    });
    _globals.it.each([{
      input: {
        type: 'day',
        intervalCount: undefined,
        groupOrientation: undefined
      },
      output: {
        groupOrientation: 'horizontal',
        intervalCount: 1,
        name: 'Day',
        type: 'day'
      }
    }, {
      input: {
        type: 'agenda',
        intervalCount: undefined,
        agendaDuration: undefined
      },
      output: {
        agendaDuration: 7,
        intervalCount: 1,
        name: 'Agenda',
        type: 'agenda'
      }
    }])('should set default for undefined props ($input.type)', _ref => {
      let {
        input,
        output
      } = _ref;
      (0, _globals.expect)((0, _utils.getViews)([input])).toEqual([output]);
    });
    _globals.it.each(Object.values(_constants_view.VIEWS).map((view, index) => ({
      input: view,
      output: [{
        groupOrientation: 'horizontal',
        intervalCount: 1,
        name: 'Day',
        type: 'day'
      }, {
        groupOrientation: 'horizontal',
        intervalCount: 1,
        name: 'Week',
        type: 'week'
      }, {
        groupOrientation: 'horizontal',
        intervalCount: 1,
        name: 'Work Week',
        type: 'workWeek'
      }, {
        groupOrientation: 'horizontal',
        intervalCount: 1,
        name: 'Month',
        type: 'month'
      }, {
        groupOrientation: 'vertical',
        intervalCount: 1,
        name: 'Timeline Day',
        type: 'timelineDay'
      }, {
        groupOrientation: 'vertical',
        intervalCount: 1,
        name: 'Timeline Week',
        type: 'timelineWeek'
      }, {
        groupOrientation: 'vertical',
        intervalCount: 1,
        name: 'Timeline Work Week',
        type: 'timelineWorkWeek'
      }, {
        groupOrientation: 'vertical',
        intervalCount: 1,
        name: 'Timeline Month',
        type: 'timelineMonth'
      }, {
        agendaDuration: 7,
        intervalCount: 1,
        name: 'Agenda',
        type: 'agenda'
      }][index]
    })))('should return normalized $input.type view', _ref2 => {
      let {
        input,
        output
      } = _ref2;
      (0, _globals.expect)((0, _utils.getViews)([input])).toEqual([output]);
    });
  });
  (0, _globals.describe)('getCurrentView', () => {
    (0, _globals.it)('should return normalized object', () => {
      (0, _globals.expect)((0, _utils.getCurrentView)('agenda', ['agenda'])).toEqual({
        agendaDuration: 7,
        intervalCount: 1,
        name: 'Agenda',
        type: 'agenda'
      });
    });
    (0, _globals.it)('should return view by type', () => {
      (0, _globals.expect)((0, _utils.getCurrentView)('agenda', ['month', {
        type: 'agenda'
      }])).toEqual({
        agendaDuration: 7,
        intervalCount: 1,
        name: 'Agenda',
        type: 'agenda'
      });
    });
    (0, _globals.it)('should return view by name', () => {
      (0, _globals.expect)((0, _utils.getCurrentView)('SuperAgenda', ['month', {
        name: 'SuperAgenda',
        type: 'agenda'
      }])).toEqual({
        agendaDuration: 7,
        intervalCount: 1,
        name: 'SuperAgenda',
        type: 'agenda'
      });
    });
    (0, _globals.it)('should return default view out of the views list', () => {
      (0, _globals.expect)((0, _utils.getCurrentView)('agenda', ['month'])).toEqual({
        agendaDuration: 7,
        intervalCount: 1,
        name: 'Agenda',
        type: 'agenda'
      });
    });
    (0, _globals.it)('should return first view if nothing found', () => {
      (0, _globals.expect)((0, _utils.getCurrentView)('agendaShort', ['month', 'agenda'])).toEqual({
        groupOrientation: 'horizontal',
        intervalCount: 1,
        name: 'Month',
        type: 'month'
      });
    });
    (0, _globals.it)('should return first known view if wrong current view requested', () => {
      (0, _globals.expect)((0, _utils.getCurrentView)('blabla', [{
        type: 'blabla',
        name: 'blabla',
        unknown: 'incorrect view'
      }])).toEqual({
        groupOrientation: 'horizontal',
        intervalCount: 1,
        name: 'Day',
        type: 'day'
      });
    });
  });
  (0, _globals.describe)('parseDateOption', () => {
    const expectedDate = new Date(2025, 3, 23, 12, 1, 54);
    (0, _globals.it)('should return deserialized date from string', () => {
      (0, _globals.expect)((0, _utils.parseDateOption)('2025/04/23 12:01:54')).toEqual(expectedDate);
    });
    (0, _globals.it)('should return deserialized date from number', () => {
      (0, _globals.expect)((0, _utils.parseDateOption)(expectedDate.getTime())).toEqual(new Date(expectedDate));
    });
    (0, _globals.it)('should return deserialized date from date', () => {
      (0, _globals.expect)((0, _utils.parseDateOption)(expectedDate)).toEqual(expectedDate);
    });
  });
  (0, _globals.describe)('parseCurrentDate', () => {
    const inputDate = new Date(2025, 3, 23, 12, 1, 54);
    const expectedDate = new Date(2025, 3, 23);
    (0, _globals.it)('should return trimmed deserialized date from string', () => {
      (0, _globals.expect)((0, _utils.parseCurrentDate)('2025/04/23 12:01:54')).toEqual(expectedDate);
    });
    (0, _globals.it)('should return trimmed deserialized date from number', () => {
      (0, _globals.expect)((0, _utils.parseCurrentDate)(inputDate.getTime())).toEqual(expectedDate);
    });
    (0, _globals.it)('should return trimmed deserialized date from date', () => {
      (0, _globals.expect)((0, _utils.parseCurrentDate)(inputDate)).toEqual(expectedDate);
    });
  });
  (0, _globals.describe)('getViewOption', () => {
    const inputDate = new Date(2025, 3, 23, 12, 1, 54);
    const expectedDate = new Date(2025, 3, 23);
    (0, _globals.it)('should return currentDate', () => {
      (0, _globals.expect)((0, _utils.getViewOption)('currentDate', inputDate)).toEqual(expectedDate);
    });
    (0, _globals.it)('should return min', () => {
      (0, _globals.expect)((0, _utils.getViewOption)('min', inputDate)).toEqual(inputDate);
    });
    (0, _globals.it)('should return max', () => {
      (0, _globals.expect)((0, _utils.getViewOption)('max', inputDate)).toEqual(inputDate);
    });
    (0, _globals.it)('should return views', () => {
      (0, _globals.expect)((0, _utils.getViewOption)('views', ['month', 'agenda'])).toEqual(['month', 'agenda']);
    });
  });
});
