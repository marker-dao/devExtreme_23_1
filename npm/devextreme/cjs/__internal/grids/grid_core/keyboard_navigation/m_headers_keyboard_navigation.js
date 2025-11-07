/**
* DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/m_headers_keyboard_navigation.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headersKeyboardNavigationModule = exports.HeadersKeyboardNavigationController = void 0;
var _index = require("../../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _position = require("../../../../core/utils/position");
var _type = require("../../../../core/utils/type");
var _get_element_location_internal = require("../../../ui/scroll_view/utils/get_element_location_internal");
var _const = require("../sticky_columns/const");
var _dom = require("../sticky_columns/dom");
var _utils = require("../sticky_columns/utils");
var _const2 = require("./const");
var _m_column_focus_dispatcher = require("./m_column_focus_dispatcher");
var _m_column_keyboard_navigation_core = require("./m_column_keyboard_navigation_core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

class HeadersKeyboardNavigationController extends _m_column_keyboard_navigation_core.ColumnKeyboardNavigationController {
  constructor() {
    super(...arguments);
    this.isOutsideVisibleArea = ($element, $container) => {
      const elementRect = (0, _position.getBoundingRect)($element.get(0));
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
    if ((0, _index.isCommandKeyPressed)(originalEvent)) {
      const $cell = (0, _renderer.default)(originalEvent.target).closest('td');
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
    const visibleColumns = (_columnsController$ge = columnsController.getVisibleColumns(rowIndex, true)) === null || _columnsController$ge === void 0 ? void 0 : _columnsController$ge.filter(col => col.ownerBand === (column === null || column === void 0 ? void 0 : column.ownerBand) && (!(0, _type.isDefined)(col.type) || columnsController.isCustomCommandColumn(col)));
    if (column !== null && column !== void 0 && column.fixed) {
      const fixedPosition = (0, _utils.getColumnFixedPosition)(columnsController, column);
      if (fixedPosition !== _const.StickyPosition.Sticky) {
        return visibleColumns.filter(col => col.fixed && (0, _utils.getColumnFixedPosition)(columnsController, col) === fixedPosition);
      }
    }
    return visibleColumns.filter(column => !column.fixed || column.fixedPosition === _const.StickyPosition.Sticky);
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
    this._updateFocusedCellPosition((0, _renderer.default)(e.target));
  }
  getFocusinSelector() {
    return '.dx-header-row > td';
  }
  getFocusableColumns(rowIndex, bandColumnId) {
    const visibleColumns = this._columnsController.getVisibleColumns(rowIndex);
    const isColumnFocusable = column => !(0, _type.isDefined)(column.type) || this._columnsController.isCustomCommandColumn(column);
    const result = visibleColumns.filter(isColumnFocusable);
    if ((0, _type.isDefined)(bandColumnId)) {
      return result.filter(column => column.ownerBand === bandColumnId);
    }
    return result;
  }
  getContainerBoundingRect($container) {
    const containerRect = (0, _position.getBoundingRect)($container.get(0));
    return {
      left: containerRect.left,
      right: containerRect.right
    };
  }
  getScrollPadding($container) {
    const containerRect = (0, _position.getBoundingRect)($container.get(0));
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
    const scrollPadding = this.getScrollPadding((0, _renderer.default)(scrollable.container()));
    const scrollPosition = (0, _get_element_location_internal.getElementLocationInternal)($cell[0], 'horizontal', (0, _renderer.default)(this._columnHeadersView.getContent())[0], scrollable.scrollOffset(), scrollPadding, this.addWidgetPrefix('table'));
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
    return direction === _const2.Direction.Next ? !isLastColumn : !isFirstColumn;
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
    const isFixedCell = _dom.GridCoreStickyColumnsDom.isFixedCell($focusedCell, this.addWidgetPrefix.bind(this));
    if (isFixedCell) {
      super.restoreFocus();
      return;
    }
    const focusedCellIsOutsideVisibleArea = $focusedCell.length && this.isOutsideVisibleArea($focusedCell, (0, _renderer.default)(this._columnHeadersView.getContent()));
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
exports.HeadersKeyboardNavigationController = HeadersKeyboardNavigationController;
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
const headersKeyboardNavigationModule = exports.headersKeyboardNavigationModule = {
  controllers: {
    headersKeyboardNavigation: HeadersKeyboardNavigationController,
    columnFocusDispatcher: _m_column_focus_dispatcher.ColumnFocusDispatcher
  },
  extenders: {
    views: {
      columnHeadersView
    }
  }
};
