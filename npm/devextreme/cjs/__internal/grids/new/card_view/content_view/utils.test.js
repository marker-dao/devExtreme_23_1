/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
