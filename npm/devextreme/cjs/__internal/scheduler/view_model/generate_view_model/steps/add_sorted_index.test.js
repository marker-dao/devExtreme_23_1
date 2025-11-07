/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_sorted_index.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _add_sorted_index = require("./add_sorted_index");
(0, _globals.describe)('addSortedIndex', () => {
  (0, _globals.it)('should add sorted index in order of sorting', () => {
    const items = [{
      some: '1'
    }, {
      another: '2'
    }, {
      nothing: true
    }];
    (0, _globals.expect)((0, _add_sorted_index.addSortedIndex)(items)).toEqual([{
      some: '1',
      sortedIndex: 0
    }, {
      another: '2',
      sortedIndex: 1
    }, {
      nothing: true,
      sortedIndex: 2
    }]);
  });
});
