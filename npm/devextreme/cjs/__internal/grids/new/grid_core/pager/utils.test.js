/**
* DevExtreme (cjs/__internal/grids/new/grid_core/pager/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _utils = require("./utils");
(0, _globals.describe)('calculatePageSizes', () => {
  (0, _globals.describe)('when pageSizesConfig = \'auto\'', () => {
    (0, _globals.it)('calculates pageSizes by pageSize', () => {
      (0, _globals.expect)((0, _utils.calculatePageSizes)(undefined, 'auto', 6)).toEqual([3, 6, 12]);
    });
  });
  (0, _globals.describe)('when pageSizesConfig with custom values', () => {
    (0, _globals.it)('return custom values', () => {
      (0, _globals.expect)((0, _utils.calculatePageSizes)(undefined, [4, 10, 20], 6)).toEqual([4, 10, 20]);
    });
  });
  (0, _globals.describe)('when there is an initial value of pageSizes and pageSizesConfig = \'auto\'', () => {
    (0, _globals.it)('return initial values', () => {
      (0, _globals.expect)((0, _utils.calculatePageSizes)([3, 6, 12], 'auto', 12)).toEqual([3, 6, 12]);
    });
  });
});
(0, _globals.describe)('isVisible', () => {
  (0, _globals.describe)('when visibleConfig = true', () => {
    (0, _globals.it)('visible should be equal to true', () => {
      (0, _globals.expect)((0, _utils.isVisible)(true, 1)).toBe(true);
    });
  });
  (0, _globals.describe)('when visibleConfig = false', () => {
    (0, _globals.it)('visible should be equal to false', () => {
      (0, _globals.expect)((0, _utils.isVisible)(false, 2)).toBe(false);
    });
  });
  (0, _globals.describe)('when visibleConfig = \'auto\' and pageCount = 1', () => {
    (0, _globals.it)('visible should be equal to false', () => {
      (0, _globals.expect)((0, _utils.isVisible)('auto', 1)).toBe(false);
    });
  });
  (0, _globals.describe)('when visibleConfig = \'auto\' and pageCount > 1', () => {
    (0, _globals.it)('visible should be equal to true', () => {
      (0, _globals.expect)((0, _utils.isVisible)('auto', 2)).toBe(true);
    });
  });
});
