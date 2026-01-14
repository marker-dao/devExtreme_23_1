"use strict";

var _globals = require("@jest/globals");
var _maybe_split = require("./maybe_split");
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
const callback = (items, panelName) => items.map(item => Object.assign({}, item, {
  panelName
}));
(0, _globals.describe)('maybeSplit', () => {
  (0, _globals.it)('should not split', () => {
    (0, _globals.expect)((0, _maybe_split.maybeSplit)(entities, false, callback)).toEqual([Object.assign({}, entities[0], {
      panelName: 'regularPanel'
    }), Object.assign({}, entities[1], {
      panelName: 'regularPanel'
    }), Object.assign({}, entities[2], {
      panelName: 'regularPanel'
    }), Object.assign({}, entities[3], {
      panelName: 'regularPanel'
    }), Object.assign({}, entities[4], {
      panelName: 'regularPanel'
    })]);
  });
  (0, _globals.it)('should split and sort by startDate', () => {
    (0, _globals.expect)((0, _maybe_split.maybeSplit)(entities, true, callback)).toEqual([Object.assign({}, entities[0], {
      panelName: 'allDayPanel'
    }), Object.assign({}, entities[1], {
      panelName: 'regularPanel'
    }), Object.assign({}, entities[3], {
      panelName: 'allDayPanel'
    }), Object.assign({}, entities[2], {
      panelName: 'regularPanel'
    }), Object.assign({}, entities[4], {
      panelName: 'regularPanel'
    })]);
  });
});