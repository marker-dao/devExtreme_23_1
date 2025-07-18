/**
* DevExtreme (cjs/__internal/grids/data_grid/keyboard_navigation/m_column_keyboard_navigation_mixin.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnKeyboardNavigationMixin = void 0;
var _utils = require("../../../../common/core/events/utils");
var _type = require("../../../../core/utils/type");
var _const = require("../../../grids/grid_core/keyboard_navigation/const");
const ColumnKeyboardNavigationMixin = Base => class ColumnKeyboardNavigationMixin extends Base {
  ungroupColumnByPressingKey(e) {
    var _e$originalEvent;
    const column = this.getColumnFromEvent(e);
    const rowIndex = this.getRowIndexFromEvent(e);
    this.ungroupColumn(column, rowIndex);
    (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 || _e$originalEvent.preventDefault();
  }
  getFocusedCellPositionByColumn(column) {
    if (!column) {
      return undefined;
    }
    const newRowIndex = this._columnsController.getRowIndex(column.index, true);
    return {
      rowIndex: newRowIndex,
      columnIndex: this.getVisibleIndex(column, newRowIndex)
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRowIndexFromEvent(e) {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getColumnFromEvent(e) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getNewFocusedColumnBeforeUngrouping(column, rowIndex) {
    return column;
  }
  keyDownHandler(e) {
    let isHandled = super.keyDownHandler(e);
    if (isHandled) {
      return true;
    }
    if (this.canUngroupColumnByPressingKey(e)) {
      this.ungroupColumnByPressingKey(e);
      isHandled = true;
    } else if (this.canUngroupAllColumnByPressingKey(e)) {
      this.ungroupAllColumns();
      isHandled = true;
    }
    return isHandled;
  }
  changeGroupColumnIndex(groupIndex, column, newFocusedColumn) {
    this._columnsController.beginUpdate();
    this._columnsController.columnOption(column.dataField, 'groupIndex', groupIndex);
    const newFocusedCellPosition = this.getFocusedCellPositionByColumn(newFocusedColumn);
    this.updateViewFocusPosition(newFocusedCellPosition);
    this._columnsController.endUpdate();
  }
  canUngroupColumnByPressingKey(e) {
    return e.which === _const.KEY_CODES.G && e.shift && (0, _utils.isCommandKeyPressed)(e.originalEvent);
  }
  canUngroupAllColumnByPressingKey(e) {
    return e.which === _const.KEY_CODES.G && e.shift && e.alt;
  }
  ungroupColumn(column) {
    let rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if ((0, _type.isDefined)(column === null || column === void 0 ? void 0 : column.groupIndex)) {
      const newFocusedColumn = this.getNewFocusedColumnBeforeUngrouping(column, rowIndex);
      this.changeGroupColumnIndex(-1, column, newFocusedColumn);
    }
  }
  ungroupAllColumns() {
    this._columnsController.clearGrouping();
  }
};
exports.ColumnKeyboardNavigationMixin = ColumnKeyboardNavigationMixin;
