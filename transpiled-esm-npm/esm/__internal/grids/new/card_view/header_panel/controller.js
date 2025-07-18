import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../../core/renderer';
import { ColumnChooserView } from '../../grid_core/column_chooser/index';
import { ColumnsController } from '../../grid_core/columns_controller/index';
const CLASS = {
  hidden: 'dx-hidden'
};
export class HeaderPanelController {
  constructor(columnsController, columnChooserView) {
    this.columnsController = columnsController;
    this.columnChooserView = columnChooserView;
    this.isColumnDraggable = column => {
      const canHide = column.allowHiding && this.columnChooserView.dragModeOpened.peek();
      const canReorder = this.canReorder(column);
      return canReorder || canHide;
    };
    this.onColumnMove = (column, toIndex, draggingColumnData) => {
      const {
        columnAfter
      } = draggingColumnData;
      const needPreserveOrder = !this.canReorder(column);
      if (needPreserveOrder) {
        this.columnsController.columnOption(column, 'visible', true);
        return;
      }
      if (columnAfter === undefined) {
        const columnsCount = this.columnsController.columns.peek().length;
        this.columnsController.columnOption(column, 'visible', true);
        this.columnsController.columnOption(column, 'visibleIndex', columnsCount);
        return;
      }
      this.columnsController.updateColumns(columns => {
        const newColumns = [...columns];
        newColumns.forEach((oldColumn, index) => {
          const updatedColumn = _extends({}, oldColumn);
          if (oldColumn.name === column.name) {
            updatedColumn.visibleIndex = columnAfter.visibleIndex;
            updatedColumn.visible = true;
          } else if (oldColumn.visibleIndex >= columnAfter.visibleIndex) {
            updatedColumn.visibleIndex = oldColumn.visibleIndex + 1;
          }
          newColumns[index] = updatedColumn;
        });
        return newColumns;
      });
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    this.onPlaceholderPrepared = e => {
      const $placeholderElement = $(e.placeholderElement);
      const {
        column
      } = e.itemData;
      const canReorder = this.canReorder(column);
      $placeholderElement.toggleClass(CLASS.hidden, !canReorder);
    };
  }
  canReorder(column) {
    const allowColumnReordering = this.columnsController.allowColumnReordering.peek();
    return allowColumnReordering && column.allowReordering;
  }
}
HeaderPanelController.dependencies = [ColumnsController, ColumnChooserView];