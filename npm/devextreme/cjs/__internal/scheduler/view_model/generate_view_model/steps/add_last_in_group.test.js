/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_last_in_group.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _add_last_in_group = require("./add_last_in_group");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    (0, _globals.expect)((0, _add_last_in_group.addLastInGroup)(items)).toEqual([_extends({}, items[0], {
      isLastInGroup: false
    }), _extends({}, items[1], {
      isLastInGroup: true
    }), _extends({}, items[2], {
      isLastInGroup: true
    }), _extends({}, items[3], {
      isLastInGroup: false
    }), _extends({}, items[4], {
      isLastInGroup: true
    }), _extends({}, items[5], {
      isLastInGroup: true
    })]);
  });
});
