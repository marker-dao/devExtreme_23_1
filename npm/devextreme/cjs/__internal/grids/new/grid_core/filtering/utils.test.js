/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _columns_controller = require("../columns_controller/columns_controller.mock");
var _utils = require("./utils");
(0, _globals.describe)('normalizeFilterWithSelectors', () => {
  const columns = [(0, _columns_controller.normalizeColumn)({
    dataField: 'myColumn'
  })];
  const filter = ['myColumn', '=', 2];
  (0, _globals.describe)('when remoteOperations=true', () => {
    (0, _globals.it)('should return filter as is', () => {
      const res = (0, _utils.normalizeFilterWithSelectors)(filter, columns, true);
      (0, _globals.expect)(res).toStrictEqual(filter);
    });
  });
  (0, _globals.describe)('when remoteOperations=false', () => {
    (0, _globals.it)('should return replace column dataField with selector', () => {
      const res = (0, _utils.normalizeFilterWithSelectors)(filter, columns, false);
      (0, _globals.expect)(res).toStrictEqual([_globals.expect.any(Function), '=', 2]);
      (0, _globals.expect)(res[0]({
        myColumn: 100
      })).toBe(100);
    });
  });
});
