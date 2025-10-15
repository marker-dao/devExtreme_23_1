/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/maybe_split.test.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _maybe_split = require("./maybe_split");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const entities = [{
  isAllDayPanelOccupied: true,
  startDateUTC: 10
}, {
  isAllDayPanelOccupied: false,
  startDateUTC: 10
}, {
  isAllDayPanelOccupied: false,
  startDateUTC: 12
}, {
  isAllDayPanelOccupied: true,
  startDateUTC: 12
}, {
  isAllDayPanelOccupied: false,
  startDateUTC: 15
}];
const callback = (items, panelName) => items.map(item => _extends({}, item, {
  panelName
}));
(0, _globals.describe)('maybeSplit', () => {
  (0, _globals.it)('should not split', () => {
    (0, _globals.expect)((0, _maybe_split.maybeSplit)(entities, false, callback)).toEqual([_extends({}, entities[0], {
      panelName: 'regularPanel'
    }), _extends({}, entities[1], {
      panelName: 'regularPanel'
    }), _extends({}, entities[2], {
      panelName: 'regularPanel'
    }), _extends({}, entities[3], {
      panelName: 'regularPanel'
    }), _extends({}, entities[4], {
      panelName: 'regularPanel'
    })]);
  });
  (0, _globals.it)('should split and sort by startDate', () => {
    (0, _globals.expect)((0, _maybe_split.maybeSplit)(entities, true, callback)).toEqual([_extends({}, entities[0], {
      panelName: 'allDayPanel'
    }), _extends({}, entities[1], {
      panelName: 'regularPanel'
    }), _extends({}, entities[3], {
      panelName: 'allDayPanel'
    }), _extends({}, entities[2], {
      panelName: 'regularPanel'
    }), _extends({}, entities[4], {
      panelName: 'regularPanel'
    })]);
  });
});
