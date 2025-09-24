/**
* DevExtreme (esm/__internal/grids/new/grid_core/column_chooser/controller.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../../core/renderer';
import { computed, signal } from '../../../../core/state_manager/index';
import { sortColumns } from '../../../../grids/grid_core/columns_controller/m_columns_controller_utils';
import { ColumnsController } from '../columns_controller/columns_controller';
import { getColumnIndexByName } from '../columns_controller/utils';
import { OptionsController } from '../options_controller/options_controller';
const CLASS = {
  hidden: 'dx-hidden'
};
export class ColumnChooserController {
  constructor(columnsController, options) {
    this.columnsController = columnsController;
    this.options = options;
    this.draggingItem = signal(null);
    this.onColumnMove = column => {
      this.columnsController.columnOption(column, 'visible', false);
    };
    this.onDragStart = e => {
      this.draggingItem.value = e.itemData;
    };
    this.onDragEnd = () => {
      this.draggingItem.value = null;
    };
    this.isColumnDraggable = column => column.allowHiding;
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    this.onPlaceholderPrepared = e => {
      const $placeholderElement = $(e.placeholderElement);
      $placeholderElement.addClass(CLASS.hidden);
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
          columns[columnIndex] = _extends({}, columns[columnIndex], {
            visible: node.selected
          });
        }
      }
      return [...columns];
    });
  }
}
ColumnChooserController.dependencies = [ColumnsController, OptionsController];
