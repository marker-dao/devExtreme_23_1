/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/header_filter/controller.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderFilterController = void 0;
var _index = require("../../../../../core/state_manager/index");
var _index2 = require("../../../../../grids/new/grid_core/columns_controller/index");
var _utils = require("./utils");
class HeaderFilterController {
  constructor(columnsController) {
    this.columnsController = columnsController;
    this.headerFilterInfoArray = (0, _index.computed)(() => (0, _utils.getHeaderFilterInfoArray)(this.columnsController.visibleColumns.value));
    this.composedHeaderFilter = (0, _index.computed)(() => (0, _utils.getComposedHeaderFilter)(this.headerFilterInfoArray.value));
  }
  clearHeaderFilters() {
    this.columnsController.updateColumns(columns => columns.map(col => {
      delete col.filterValues;
      delete col.filterType;
      return col;
    }));
  }
}
exports.HeaderFilterController = HeaderFilterController;
HeaderFilterController.dependencies = [_index2.ColumnsController];
