/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/compatibility.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompatibilityColumnsController = void 0;
var _columns_controller = require("./columns_controller");
var _utils = require("./utils");
class CompatibilityColumnsController {
  constructor(realColumnsController) {
    this.realColumnsController = realColumnsController;
  }
  getColumns() {
    return this.realColumnsController.columns.peek();
  }
  getFilteringColumns() {
    return (0, _utils.addDataFieldToComputedColumns)(this.realColumnsController.filterableColumns.peek());
  }
}
exports.CompatibilityColumnsController = CompatibilityColumnsController;
CompatibilityColumnsController.dependencies = [_columns_controller.ColumnsController];
