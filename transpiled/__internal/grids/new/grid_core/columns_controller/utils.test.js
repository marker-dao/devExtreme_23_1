"use strict";

var _globals = require("@jest/globals");
var _utils = require("./utils");
(0, _globals.describe)('getVisibleIndexes', () => {
  (0, _globals.it)('should create visible indexes if not present', () => {
    (0, _globals.expect)((0, _utils.getVisibleIndexes)([undefined, undefined, undefined, undefined])).toEqual([0, 1, 2, 3]);
  });
  (0, _globals.it)('should preserve visible indexes if present', () => {
    (0, _globals.expect)((0, _utils.getVisibleIndexes)([3, 1, 0, 2])).toEqual([3, 1, 0, 2]);
  });
  (0, _globals.it)('should fill in missing indexes', () => {
    (0, _globals.expect)((0, _utils.getVisibleIndexes)([3, undefined, 0, undefined])).toEqual([3, 1, 0, 2]);
  });
});