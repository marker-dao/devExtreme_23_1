/**
* DevExtreme (esm/__internal/grids/data_grid/keyboard_navigation/m_headers_keyboard_navigation.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isCommandKeyPressed } from '../../../../common/core/events/utils';
import $ from '../../../../core/renderer';
import { isDefined } from '../../../../core/utils/type';
import { KEY_CODES } from '../../../grids/grid_core/keyboard_navigation/const';
import { headersKeyboardNavigationModule } from '../../../grids/grid_core/keyboard_navigation/m_headers_keyboard_navigation';
import gridCore from '../m_core';
import { ColumnKeyboardNavigationMixin } from './m_column_keyboard_navigation_mixin';
const headersKeyboardNavigation = Base => class HeadersKeyboardNavigationControllerExtender extends ColumnKeyboardNavigationMixin(Base) {
  getNewFocusedColumnBeforeGrouping(column, rowIndex) {
    if (column.showWhenGrouped) {
      return column;
    }
    const focusableColumns = this.getFocusableColumns(rowIndex, column.ownerBand);
    if (focusableColumns.length === 1 && isDefined(column.ownerBand)) {
      return this._columnsController.getParentColumn(column, true);
    }
    if (focusableColumns.length === 1) {
      return;
    }
    const visibleColumnIndex = focusableColumns.findIndex(col => col.index === column.index);
    return visibleColumnIndex === focusableColumns.length - 1 ? focusableColumns[visibleColumnIndex - 1] : focusableColumns[visibleColumnIndex + 1];
  }
  groupColumnByPressingKey(e) {
    var _e$originalEvent;
    const $cell = $(e.originalEvent.target).closest('td');
    const rowIndex = this._getRowIndex($cell.parent());
    const column = this._getColumnByCellElement($cell, rowIndex);
    this.groupColumn(column, rowIndex);
    (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 || _e$originalEvent.preventDefault();
  }
  canGroupColumnByPressingKey(e) {
    return e.which === KEY_CODES.G && isCommandKeyPressed(e.originalEvent);
  }
  getRowIndexFromEvent(e) {
    const $cell = $(e.originalEvent.target).closest('td');
    return this._getRowIndex($cell.parent());
  }
  getColumnFromEvent(e) {
    const $cell = $(e.originalEvent.target).closest('td');
    const rowIndex = this._getRowIndex($cell.parent());
    return this._getColumnByCellElement($cell, rowIndex);
  }
  keyDownHandler(e) {
    let isHandled = super.keyDownHandler(e);
    if (isHandled) {
      return true;
    }
    if (this.canGroupColumnByPressingKey(e)) {
      this.groupColumnByPressingKey(e);
      isHandled = true;
    }
    return isHandled;
  }
  groupColumn(column) {
    let rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!isDefined(column.groupIndex) && column !== null && column !== void 0 && column.allowGrouping) {
      var _this$_columnsControl;
      const newGroupIndex = ((_this$_columnsControl = this._columnsController.getGroupColumns()) === null || _this$_columnsControl === void 0 ? void 0 : _this$_columnsControl.length) ?? 0;
      const newFocusedColumn = this.getNewFocusedColumnBeforeGrouping(column, rowIndex);
      this.changeGroupColumnIndex(newGroupIndex, column, newFocusedColumn);
    }
  }
  ungroupAllColumns() {
    const $focusedCell = this._getFocusedCell();
    const focusedColumn = this._getColumnByCellElement($focusedCell);
    this._columnsController.beginUpdate();
    super.ungroupAllColumns();
    const rowIndex = this._columnsController.getRowIndex(focusedColumn.index, true);
    const newVisibleIndex = this.getVisibleIndex(focusedColumn);
    this.updateFocusPosition({
      rowIndex,
      columnIndex: newVisibleIndex
    });
    this._columnsController.endUpdate();
  }
};
gridCore.registerModule('headersKeyboardNavigation', _extends({}, headersKeyboardNavigationModule, {
  extenders: {
    controllers: {
      headersKeyboardNavigation
    },
    views: _extends({}, headersKeyboardNavigationModule.extenders.views)
  }
}));
