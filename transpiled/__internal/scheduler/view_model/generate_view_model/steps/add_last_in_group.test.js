"use strict";

var _globals = require("@jest/globals");
var _add_last_in_group = require("./add_last_in_group");
const items = [{
  groupIndex: 0,
  startDateUTC: new Date(2020, 0, 10, 0)
}, {
  groupIndex: 0,
  startDateUTC: new Date(2020, 0, 10, 1)
}, {
  groupIndex: 0,
  startDateUTC: new Date(2020, 0, 11, 5)
}, {
  groupIndex: 1,
  startDateUTC: new Date(2020, 0, 10, 0)
}, {
  groupIndex: 1,
  startDateUTC: new Date(2020, 0, 10, 1)
}, {
  groupIndex: 1,
  startDateUTC: new Date(2020, 0, 11, 5)
}];
(0, _globals.describe)('addLastInGroup', () => {
  (0, _globals.it)('should add last in group', () => {
    (0, _globals.expect)((0, _add_last_in_group.addLastInGroup)(items)).toEqual([Object.assign({}, items[0], {
      isLastInGroup: false
    }), Object.assign({}, items[1], {
      isLastInGroup: true
    }), Object.assign({}, items[2], {
      isLastInGroup: true
    }), Object.assign({}, items[3], {
      isLastInGroup: false
    }), Object.assign({}, items[4], {
      isLastInGroup: true
    }), Object.assign({}, items[5], {
      isLastInGroup: true
    })]);
  });
});