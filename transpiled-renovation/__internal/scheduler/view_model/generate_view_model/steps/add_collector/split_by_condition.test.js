"use strict";

var _globals = require("@jest/globals");
var _split_by_condition = require("./split_by_condition");
(0, _globals.describe)('splitByCondition', () => {
  (0, _globals.it)('should split arrays by condition', () => {
    const items = [{
      id: 1,
      flag: true
    }, {
      id: 2,
      flag: false
    }, {
      id: 3,
      flag: false
    }, {
      id: 4,
      flag: true
    }, {
      id: 5,
      flag: true
    }, {
      id: 6,
      flag: false
    }];
    (0, _globals.expect)((0, _split_by_condition.splitByCondition)(items, item => item.flag)).toEqual([[{
      id: 1,
      flag: true
    }, {
      id: 4,
      flag: true
    }, {
      id: 5,
      flag: true
    }], [{
      id: 2,
      flag: false
    }, {
      id: 3,
      flag: false
    }, {
      id: 6,
      flag: false
    }]]);
  });
});