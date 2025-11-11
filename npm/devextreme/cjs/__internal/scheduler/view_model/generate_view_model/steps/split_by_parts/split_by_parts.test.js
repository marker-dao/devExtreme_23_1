/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/split_by_parts/split_by_parts.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _split_by_parts = require("./split_by_parts");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const intervals = [{
  min: Date.UTC(2000, 0, 10, 3),
  max: Date.UTC(2000, 0, 10, 10)
}, {
  min: Date.UTC(2000, 0, 11, 3),
  max: Date.UTC(2000, 0, 11, 10)
}, {
  min: Date.UTC(2000, 0, 12, 3),
  max: Date.UTC(2000, 0, 12, 10)
}];
(0, _globals.describe)('splitByParts', () => {
  (0, _globals.it)('should not split appointments inside one interval', () => {
    const items = [{
      startDateUTC: Date.UTC(2000, 0, 10, 3),
      endDateUTC: Date.UTC(2000, 0, 10, 5)
    }, {
      startDateUTC: Date.UTC(2000, 0, 10, 7),
      endDateUTC: Date.UTC(2000, 0, 10, 8)
    }, {
      startDateUTC: Date.UTC(2000, 0, 10, 8),
      endDateUTC: Date.UTC(2000, 0, 10, 10)
    }];
    (0, _globals.expect)((0, _split_by_parts.splitByParts)(items, intervals)).toEqual([_extends({}, items[0], {
      startDateUTC: Date.UTC(2000, 0, 10, 3),
      endDateUTC: Date.UTC(2000, 0, 10, 5),
      duration: 2 * 3600000,
      partIndex: 0,
      partCount: 0
    }), _extends({}, items[1], {
      startDateUTC: Date.UTC(2000, 0, 10, 7),
      endDateUTC: Date.UTC(2000, 0, 10, 8),
      duration: 3600000,
      partIndex: 0,
      partCount: 0
    }), _extends({}, items[2], {
      startDateUTC: Date.UTC(2000, 0, 10, 8),
      endDateUTC: Date.UTC(2000, 0, 10, 10),
      duration: 2 * 3600000,
      partIndex: 0,
      partCount: 0
    })]);
  });
  (0, _globals.it)('should add reduced and fix duration for appointments out of intervals', () => {
    const items = [{
      startDateUTC: Date.UTC(2000, 0, 9, 6),
      endDateUTC: Date.UTC(2000, 0, 10, 5)
    }, {
      startDateUTC: Date.UTC(2000, 0, 12, 8),
      endDateUTC: Date.UTC(2000, 0, 13, 7)
    }];
    (0, _globals.expect)((0, _split_by_parts.splitByParts)(items, intervals)).toEqual([{
      startDateUTC: Date.UTC(2000, 0, 10, 3),
      endDateUTC: Date.UTC(2000, 0, 10, 5),
      duration: 2 * 3600000,
      partIndex: 0,
      partCount: 0,
      reduced: 'tail'
    }, {
      startDateUTC: Date.UTC(2000, 0, 12, 8),
      endDateUTC: Date.UTC(2000, 0, 12, 10),
      duration: 2 * 3600000,
      partIndex: 0,
      partCount: 0,
      reduced: 'head'
    }]);
  });
  (0, _globals.it)('should split appointments', () => {
    const items = [{
      id: 1,
      startDateUTC: Date.UTC(2000, 0, 9, 6),
      endDateUTC: Date.UTC(2000, 0, 11, 5)
    }, {
      id: 2,
      startDateUTC: Date.UTC(2000, 0, 9, 23),
      endDateUTC: Date.UTC(2000, 0, 11, 5)
    }, {
      id: 3,
      startDateUTC: Date.UTC(2000, 0, 11, 8),
      endDateUTC: Date.UTC(2000, 0, 13, 7)
    }, {
      id: 4,
      startDateUTC: Date.UTC(2000, 0, 11, 9),
      endDateUTC: Date.UTC(2000, 0, 13, 1)
    }];
    (0, _globals.expect)((0, _split_by_parts.splitByParts)(items, intervals)).toEqual([_extends({}, items[0], {
      startDateUTC: Date.UTC(2000, 0, 10, 3),
      endDateUTC: Date.UTC(2000, 0, 10, 10),
      duration: 7 * 3600000,
      partIndex: 0,
      partCount: 2,
      reduced: 'body'
    }), _extends({}, items[0], {
      startDateUTC: Date.UTC(2000, 0, 11, 3),
      endDateUTC: Date.UTC(2000, 0, 11, 5),
      duration: 2 * 3600000,
      partIndex: 1,
      partCount: 2,
      reduced: 'tail'
    }), _extends({}, items[1], {
      startDateUTC: Date.UTC(2000, 0, 10, 3),
      endDateUTC: Date.UTC(2000, 0, 10, 10),
      duration: 7 * 3600000,
      partIndex: 0,
      partCount: 2,
      reduced: 'head'
    }), _extends({}, items[1], {
      startDateUTC: Date.UTC(2000, 0, 11, 3),
      endDateUTC: Date.UTC(2000, 0, 11, 5),
      duration: 2 * 3600000,
      partIndex: 1,
      partCount: 2,
      reduced: 'tail'
    }), _extends({}, items[2], {
      startDateUTC: Date.UTC(2000, 0, 11, 8),
      endDateUTC: Date.UTC(2000, 0, 11, 10),
      duration: 2 * 3600000,
      partIndex: 0,
      partCount: 2,
      reduced: 'head'
    }), _extends({}, items[2], {
      startDateUTC: Date.UTC(2000, 0, 12, 3),
      endDateUTC: Date.UTC(2000, 0, 12, 10),
      duration: 7 * 3600000,
      partIndex: 1,
      partCount: 2,
      reduced: 'body'
    }), _extends({}, items[3], {
      startDateUTC: Date.UTC(2000, 0, 11, 9),
      endDateUTC: Date.UTC(2000, 0, 11, 10),
      duration: 3600000,
      partIndex: 0,
      partCount: 2,
      reduced: 'head'
    }), _extends({}, items[3], {
      startDateUTC: Date.UTC(2000, 0, 12, 3),
      endDateUTC: Date.UTC(2000, 0, 12, 10),
      duration: 7 * 3600000,
      partIndex: 1,
      partCount: 2,
      reduced: 'tail'
    })]);
  });
  (0, _globals.it)('should crop 24 hour appointment', () => {
    const items = [{
      startDateUTC: Date.UTC(2000, 0, 10, 0),
      endDateUTC: Date.UTC(2000, 0, 11, 0)
    }];
    (0, _globals.expect)((0, _split_by_parts.splitByParts)(items, intervals)).toEqual([{
      startDateUTC: Date.UTC(2000, 0, 10, 3),
      endDateUTC: Date.UTC(2000, 0, 10, 10),
      duration: 7 * 3600000,
      partIndex: 0,
      partCount: 0
    }]);
  });
  (0, _globals.it)('should not split 24 hour appointment', () => {
    const items = [{
      startDateUTC: Date.UTC(2000, 0, 10, 0),
      endDateUTC: Date.UTC(2000, 0, 11, 0)
    }];
    (0, _globals.expect)((0, _split_by_parts.splitByParts)(items, [{
      min: Date.UTC(2000, 0, 10),
      max: Date.UTC(2000, 0, 11)
    }, {
      min: Date.UTC(2000, 0, 11),
      max: Date.UTC(2000, 0, 12)
    }])).toEqual([{
      startDateUTC: Date.UTC(2000, 0, 10),
      endDateUTC: Date.UTC(2000, 0, 11),
      duration: 24 * 3600000,
      partIndex: 0,
      partCount: 0
    }]);
  });
});
