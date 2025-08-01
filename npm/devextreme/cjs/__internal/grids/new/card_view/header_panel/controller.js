/**
* DevExtreme (cjs/__internal/grids/new/card_view/header_panel/controller.js)
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
exports.HeaderPanelController = void 0;
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _index = require("../../grid_core/column_chooser/index");
var _index2 = require("../../grid_core/columns_controller/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CLASS = {
  hidden: 'dx-hidden'
};
class HeaderPanelController {
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
      const $placeholderElement = (0, _renderer.default)(e.placeholderElement);
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
exports.HeaderPanelController = HeaderPanelController;
HeaderPanelController.dependencies = [_index2.ColumnsController, _index.ColumnChooserView];
