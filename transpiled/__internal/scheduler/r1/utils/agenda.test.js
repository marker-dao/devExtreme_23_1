"use strict";

var _globals = require("@jest/globals");
var _agenda = require("./agenda");
const items = [{
  groupIndex: 0,
  startDateUTC: Date.UTC(2020, 0, 10, 5)
}, {
  groupIndex: 0,
  startDateUTC: Date.UTC(2020, 0, 11, 5)
}, {
  groupIndex: 0,
  startDateUTC: Date.UTC(2020, 0, 15, 5)
}, {
  groupIndex: 0,
  startDateUTC: Date.UTC(2020, 0, 10, 15)
}, {
  groupIndex: 1,
  startDateUTC: Date.UTC(2020, 0, 14, 5)
}, {
  groupIndex: 1,
  startDateUTC: Date.UTC(2020, 0, 11, 5)
}, {
  groupIndex: 1,
  startDateUTC: Date.UTC(2020, 0, 11, 15)
}, {
  groupIndex: 1,
  startDateUTC: Date.UTC(2020, 0, 14, 15)
}, {
  groupIndex: 1,
  startDateUTC: Date.UTC(2020, 0, 12, 5)
}];
(0, _globals.describe)('calculateRows', () => {
  (0, _globals.it)('should count rows for no grouping', () => {
    (0, _globals.expect)((0, _agenda.calculateRows)(items.slice(0, 4), 7, new Date(2020, 0, 10), 0)).toEqual([[2, 1, 0, 0, 0, 1, 0]]);
  });
  (0, _globals.it)('should count rows for grouped items', () => {
    (0, _globals.expect)((0, _agenda.calculateRows)(items, 7, new Date(2020, 0, 10), 2)).toEqual([[2, 1, 0, 0, 0, 1, 0], [0, 2, 1, 0, 2, 0, 0]]);
  });
});