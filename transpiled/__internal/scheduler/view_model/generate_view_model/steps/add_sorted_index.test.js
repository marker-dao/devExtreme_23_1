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