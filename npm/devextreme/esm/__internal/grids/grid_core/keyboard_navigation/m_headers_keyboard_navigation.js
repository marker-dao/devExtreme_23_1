/**
* DevExtreme (esm/__internal/grids/grid_core/keyboard_navigation/m_headers_keyboard_navigation.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import { isCommandKeyPressed } from '../../../../common/core/events/utils/index';
import $ from '../../../../core/renderer';
import { getBoundingRect } from '../../../../core/utils/position';
import { isDefined } from '../../../../core/utils/type';
import { getElementLocationInternal } from '../../../ui/scroll_view/utils/get_element_location_internal';
import { StickyPosition } from '../sticky_columns/const';
import { GridCoreStickyColumnsDom } from '../sticky_columns/dom';
import { getColumnFixedPosition } from '../sticky_columns/utils';
import { Direction } from './const';
import { ColumnFocusDispatcher } from './m_column_focus_dispatcher';
import { ColumnKeyboardNavigationController } from './m_column_keyboard_navigation_core';
export class HeadersKeyboardNavigationController extends ColumnKeyboardNavigationController {
  constructor() {
    super(...arguments);
    this.isOutsideVisibleArea = ($element, $container) => {
      const elementRect = getBoundingRect($element.get(0));
      const elementRectLeft = Math.round(elementRect.left);
      const elementRectRight = Math.round(elementRect.right);
      const containerBoundingRect = this.getContainerBoundingRect($container);
      return elementRectLeft < containerBoundingRect.left || elementRectRight > containerBoundingRect.right;
    };
  }
  leftRightKeysHandler(e) {
    const {
      originalEvent
    } = e;
    if (isCommandKeyPressed(originalEvent)) {
      const $cell = $(originalEvent.target).closest('td');
      const direction = this.getDirectionByKeyName(e.keyName);
      const rowIndex = this._getRowIndex($cell.parent());
      const column = this._getColumnByCellElement($cell, rowIndex);
      if (this.canReorderColumn(column, direction, rowIndex)) {
        this.moveColumn(column, direction, rowIndex);
      }
      originalEvent === null || originalEvent === void 0 || originalEvent.preventDefault();
    }
  }
  getColumnVisibleIndexCorrection(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visibleColumnIndex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rowIndex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  direction) {
    return 0;
  }
  getNewVisibleIndex(visibleIndex, rowIndex, direction) {
    const newVisibleIndex = super.getNewVisibleIndex(visibleIndex, rowIndex, direction);
    const indexCorrection = this.getColumnVisibleIndexCorrection(visibleIndex, rowIndex, direction);
    return newVisibleIndex + indexCorrection;
  }
  getDraggableColumns(column, rowIndex) {
    var _columnsController$ge;
    const columnsController = this._columnsController;
    const visibleColumns = (_columnsController$ge = columnsController.getVisibleColumns(rowIndex, true)) === null || _columnsController$ge === void 0 ? void 0 : _columnsController$ge.filter(col => col.ownerBand === (column === null || column === void 0 ? void 0 : column.ownerBand) && (!isDefined(col.type) || columnsController.isCustomCommandColumn(col)));
    if (column !== null && column !== void 0 && column.fixed) {
      const fixedPosition = getColumnFixedPosition(columnsController, column);
      if (fixedPosition !== StickyPosition.Sticky) {
        return visibleColumns.filter(col => col.fixed && getColumnFixedPosition(columnsController, col) === fixedPosition);
      }
    }
    return visibleColumns.filter(column => !column.fixed || column.fixedPosition === StickyPosition.Sticky);
  }
  keyDownHandler(e) {
    let isHandled = super.keyDownHandler(e);
    if (isHandled) {
      return true;
    }
    // eslint-disable-next-line default-case
    switch (e.keyName) {
      case 'tab':
        {
          this.tabKeyHandler(e);
          isHandled = true;
          break;
        }
      case 'leftArrow':
      case 'rightArrow':
        this.leftRightKeysHandler(e);
        isHandled = true;
        break;
    }
    return isHandled;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tabKeyHandler(e) {}
  getCellIndex($cell) {
    return this._columnHeadersView.getCellIndex($cell);
  }
  _getCell(cellPosition) {
    var _this$_columnHeadersV;
    const columnIndexOffset = this.getColumnIndexOffset(cellPosition.columnIndex);
    const columnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex - columnIndexOffset : -1;
    return (_this$_columnHeadersV = this._columnHeadersView) === null || _this$_columnHeadersV === void 0 ? void 0 : _this$_columnHeadersV.getCell({
      rowIndex: cellPosition.rowIndex,
      columnIndex
    });
  }
  getFocusedView() {
    return this.getView('columnHeadersView');
  }
  focusinHandler(e) {
    this._updateFocusedCellPosition($(e.target));
  }
  getFocusinSelector() {
    return '.dx-header-row > td';
  }
  getFocusableColumns(rowIndex, bandColumnId) {
    const visibleColumns = this._columnsController.getVisibleColumns(rowIndex);
    const isColumnFocusable = column => !isDefined(column.type) || this._columnsController.isCustomCommandColumn(column);
    const result = visibleColumns.filter(isColumnFocusable);
    if (isDefined(bandColumnId)) {
      return result.filter(column => column.ownerBand === bandColumnId);
    }
    return result;
  }
  getContainerBoundingRect($container) {
    const containerRect = getBoundingRect($container.get(0));
    return {
      left: containerRect.left,
      right: containerRect.right
    };
  }
  getScrollPadding($container) {
    const containerRect = getBoundingRect($container.get(0));
    const containerBoundingRect = this.getContainerBoundingRect($container);
    return {
      left: containerBoundingRect.left - containerRect.left,
      right: containerRect.right - containerBoundingRect.right
    };
  }
  scrollToColumn($cell) {
    var _this$getView;
    const scrollable = (_this$getView = this.getView('rowsView')) === null || _this$getView === void 0 ? void 0 : _this$getView.getScrollable();
    if (!scrollable) {
      return;
    }
    const scrollPadding = this.getScrollPadding($(scrollable.container()));
    const scrollPosition = getElementLocationInternal($cell[0], 'horizontal', $(this._columnHeadersView.getContent())[0], scrollable.scrollOffset(), scrollPadding, this.addWidgetPrefix('table'));
    scrollable.scrollTo({
      x: scrollPosition
    });
  }
  init() {
    super.init();
    this._columnHeadersView = this.getView('columnHeadersView');
  }
  canReorderColumn(column, direction, rowIndex) {
    const allowReordering = this._columnHeadersView.isColumnReorderingEnabled(column);
    if (!allowReordering) {
      return false;
    }
    const draggableColumns = this.getDraggableColumns(column, rowIndex);
    const isFirstColumn = column.index === draggableColumns[0].index;
    const isLastColumn = column.index === draggableColumns[draggableColumns.length - 1].index;
    return direction === Direction.Next ? !isLastColumn : !isFirstColumn;
  }
  getFirstFocusableVisibleIndex() {
    const focusableColumns = this.getFocusableColumns();
    if (focusableColumns !== null && focusableColumns !== void 0 && focusableColumns.length) {
      return this._columnsController.getVisibleIndex(focusableColumns[0].index);
    }
    return -1;
  }
  restoreFocus() {
    const $focusedCell = this._getFocusedCell();
    const isFixedCell = GridCoreStickyColumnsDom.isFixedCell($focusedCell, this.addWidgetPrefix.bind(this));
    if (isFixedCell) {
      super.restoreFocus();
      return;
    }
    const focusedCellIsOutsideVisibleArea = $focusedCell.length && this.isOutsideVisibleArea($focusedCell, $(this._columnHeadersView.getContent()));
    if (focusedCellIsOutsideVisibleArea) {
      this.scrollToColumn($focusedCell);
    } else {
      super.restoreFocus();
    }
  }
  needToFocus() {
    return this.needToRestoreFocus;
  }
}
const columnHeadersView = Base => class ColumnHeadersViewKeyboardNavigationExtender extends Base {
  handleScroll(e) {
    var _this$_headersKeyboar, _this$_columnsControl;
    super.handleScroll(e);
    if (!((_this$_headersKeyboar = this._headersKeyboardNavigation) !== null && _this$_headersKeyboar !== void 0 && _this$_headersKeyboar.needToFocus())) {
      return;
    }
    const isNeedToRenderVirtualColumns = (_this$_columnsControl = this._columnsController) === null || _this$_columnsControl === void 0 ? void 0 : _this$_columnsControl.isNeedToRenderVirtualColumns(e.target.scrollLeft);
    if (!isNeedToRenderVirtualColumns) {
      this._headersKeyboardNavigation.restoreFocus();
    }
  }
};
export const headersKeyboardNavigationModule = {
  controllers: {
    headersKeyboardNavigation: HeadersKeyboardNavigationController,
    columnFocusDispatcher: ColumnFocusDispatcher
  },
  extenders: {
    views: {
      columnHeadersView
    }
  }
};
