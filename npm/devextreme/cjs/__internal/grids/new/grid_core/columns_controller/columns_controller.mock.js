/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/columns_controller.mock.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeColumn = normalizeColumn;
var _utils = require("./utils");
function normalizeColumn(column) {
  return (0, _utils.normalizeColumns)((0, _utils.preNormalizeColumns)([column]),
  // @ts-expect-error
  v => v)[0];
}
