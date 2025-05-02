"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnChooserController = void 0;
var _signalsCore = require("@preact/signals-core");
var _m_columns_controller_utils = require("../../../../grids/grid_core/columns_controller/m_columns_controller_utils");
var _columns_controller = require("../columns_controller/columns_controller");
var _utils = require("../columns_controller/utils");
var _options_controller = require("../options_controller/options_controller");
class ColumnChooserController {
  constructor(columnsController, options) {
    this.columnsController = columnsController;
    this.options = options;
    this.onColumnMove = column => {
      this.columnsController.columnOption(column, 'visible', false);
    };
    this.chooserColumns = (0, _signalsCore.computed)(() => {
      const sortOrder = this.options.oneWay('columnChooser.sortOrder').value;
      const mode = this.options.oneWay('columnChooser.mode').value;
      let chooserColumns = this.columnsController.columns.value;
      if (mode === 'dragAndDrop') {
        chooserColumns = chooserColumns.filter(column => !column.visible);
      }
      chooserColumns = chooserColumns.filter(column => column.showInColumnChooser);
      chooserColumns = (0, _m_columns_controller_utils.sortColumns)(chooserColumns, sortOrder);
      return chooserColumns;
    });
    this.items = (0, _signalsCore.computed)(() => this.chooserColumns.value.map((column, index) => ({
      id: index,
      columnName: column.name,
      selected: column.visible,
      text: column.caption,
      disabled: !column.allowHiding,
      column
    })));
  }
  onSelectionChanged(e) {
    const nodes = e.component.getNodes();
    this.columnsController.updateColumns(columns => {
      for (const node of nodes) {
        var _node$itemData;
        const columnIndex = (0, _utils.getColumnIndexByName)(columns, (_node$itemData = node.itemData) === null || _node$itemData === void 0 ? void 0 : _node$itemData.columnName);
        const canHide = columns[columnIndex].allowHiding ?? true;
        // in case when allowHiding=false and node.selected=false, we do not hide column
        const skip = !canHide && !node.selected;
        if (!skip) {
          columns[columnIndex].visible = node.selected;
        }
      }
      return [...columns];
    });
  }
}
exports.ColumnChooserController = ColumnChooserController;
ColumnChooserController.dependencies = [_columns_controller.ColumnsController, _options_controller.OptionsController];