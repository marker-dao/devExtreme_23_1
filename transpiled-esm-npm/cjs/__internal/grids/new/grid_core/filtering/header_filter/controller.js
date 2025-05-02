"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderFilterController = void 0;
var _signalsCore = require("@preact/signals-core");
var _index = require("../../../../../grids/new/grid_core/columns_controller/index");
var _utils = require("./utils");
class HeaderFilterController {
  constructor(columnsController) {
    this.columnsController = columnsController;
    this.composedHeaderFilter = (0, _signalsCore.computed)(() => (0, _utils.getComposedHeaderFilter)(this.columnsController.visibleColumns.value));
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
HeaderFilterController.dependencies = [_index.ColumnsController];