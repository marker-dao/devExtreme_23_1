/**
* DevExtreme (esm/__internal/grids/new/grid_core/column_chooser/controller.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { computed } from '@preact/signals-core';
import { sortColumns } from '../../../../grids/grid_core/columns_controller/m_columns_controller_utils';
import { ColumnsController } from '../columns_controller/columns_controller';
import { getColumnIndexByName } from '../columns_controller/utils';
import { OptionsController } from '../options_controller/options_controller';
export class ColumnChooserController {
  constructor(columnsController, options) {
    this.columnsController = columnsController;
    this.options = options;
    this.onColumnMove = column => {
      this.columnsController.columnOption(column, 'visible', false);
    };
    this.chooserColumns = computed(() => {
      const sortOrder = this.options.oneWay('columnChooser.sortOrder').value;
      const mode = this.options.oneWay('columnChooser.mode').value;
      let chooserColumns = this.columnsController.columns.value;
      if (mode === 'dragAndDrop') {
        chooserColumns = chooserColumns.filter(column => !column.visible);
      }
      chooserColumns = chooserColumns.filter(column => column.showInColumnChooser);
      chooserColumns = sortColumns(chooserColumns, sortOrder);
      return chooserColumns;
    });
    this.items = computed(() => this.chooserColumns.value.map((column, index) => ({
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
        const columnIndex = getColumnIndexByName(columns, (_node$itemData = node.itemData) === null || _node$itemData === void 0 ? void 0 : _node$itemData.columnName);
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
ColumnChooserController.dependencies = [ColumnsController, OptionsController];
