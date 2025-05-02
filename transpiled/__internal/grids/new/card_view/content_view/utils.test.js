"use strict";

var _globals = require("@jest/globals");
var _utils = require("./utils");
(0, _globals.describe)('factors', () => {
  (0, _globals.it)('should return all factors of given number', () => {
    (0, _globals.expect)((0, _utils.factors)(1)).toEqual([1]);
    (0, _globals.expect)((0, _utils.factors)(2)).toEqual([1, 2]);
    (0, _globals.expect)((0, _utils.factors)(7)).toEqual([1, 7]);
    (0, _globals.expect)((0, _utils.factors)(6)).toEqual([1, 2, 3, 6]);
    (0, _globals.expect)((0, _utils.factors)(8)).toEqual([1, 2, 4, 8]);
    (0, _globals.expect)((0, _utils.factors)(12)).toEqual([1, 2, 3, 4, 6, 12]);
  });
});