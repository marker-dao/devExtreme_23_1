"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headersKeyboardNavigationModule = exports.HeadersKeyboardNavigationController = void 0;
var _index = require("../../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
var _const = require("../sticky_columns/const");
var _utils = require("../sticky_columns/utils");
var _const2 = require("./const");
var _m_keyboard_navigation_core = require("./m_keyboard_navigation_core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

class HeadersKeyboardNavigationController extends _m_keyboard_navigation_core.KeyboardNavigationController {
  leftRightKeysHandler(e) {
    const {
      originalEvent
    } = e;
    if ((0, _index.isCommandKeyPressed)(originalEvent)) {
      const $cell = (0, _renderer.default)(originalEvent.target).closest('td');
      const direction = this.getDirectionByKeyName(e.keyName);
      const rowIndex = this._getRowIndex($cell.parent());
      const column = this._getColumnByCellElement($cell, rowIndex);
      if (this.isHeaderValidForReordering(column, direction, rowIndex)) {
        this.moveHeader(column, rowIndex, direction);
      }
      originalEvent === null || originalEvent === void 0 || originalEvent.preventDefault();
    }
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
    const isHandled = this.processOnKeyDown(e);
    if (isHandled) {
      return;
    }
    // eslint-disable-next-line default-case
    switch (e.keyName) {
      case 'tab':
        {
          this.tabKeyHandler(e);
          break;
        }
      case 'leftArrow':
      case 'rightArrow':
        this.leftRightKeysHandler(e);
        break;
    }
  }
  getNewVisibleIndex(visibleIndex, direction) {
    /*
      We need to add 2 to the index instead of 1,
      because that's how normalization of these indexes works.
           For example, we have columns with the following indexes:
      0 1 2 3
           We drag 1 to the right. Its index becomes 3.
      0 2 3(1) 3(3)
           After normalization of the indexes:
      0 1(2) 2(1) 3(3)
    */
    return direction === 'previous' ? visibleIndex - 1 : visibleIndex + 2;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tabKeyHandler(e) {}
  getCellIndex($cell) {
    return this._columnHeadersView.getCellIndex($cell);
  }
  _getCell(cellPosition) {
    var _this$_columnHeadersV;
    return (_this$_columnHeadersV = this._columnHeadersView) === null || _this$_columnHeadersV === void 0 ? void 0 : _this$_columnHeadersV.getCell(cellPosition);
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
  init() {
    super.init();
    this._columnHeadersView = this.getView('columnHeadersView');
  }
  isHeaderValidForReordering(column, direction, rowIndex) {
    const allowReordering = this._columnHeadersView.isReorderingEnabled(column);
    if (!allowReordering) {
      return false;
    }
    const draggableColumns = this.getDraggableColumns(column, rowIndex);
    const isFirstColumn = column.index === draggableColumns[0].index;
    const isLastColumn = column.index === draggableColumns[draggableColumns.length - 1].index;
    return direction === _const2.Direction.Next ? !isLastColumn : !isFirstColumn;
  }
  moveHeader(column, rowIndex, direction) {
    const visibleIndex = this._columnsController.getVisibleIndex(column.index, rowIndex);
    const newVisibleIndex = this.getNewVisibleIndex(visibleIndex, direction);
    const newFocusedColumnIndex = direction === _const2.Direction.Next ? newVisibleIndex - 1 : newVisibleIndex;
    this.isNeedToFocus = true;
    this.setFocusedCellPosition(rowIndex, newFocusedColumnIndex);
    this._columnsController.moveColumn({
      columnIndex: visibleIndex,
      rowIndex
    }, {
      columnIndex: newVisibleIndex,
      rowIndex
    }, 'headers', 'headers');
  }
}
exports.HeadersKeyboardNavigationController = HeadersKeyboardNavigationController;
const columnHeadersView = Base => class ColumnHeadersViewKeyboardNavigationExtender extends Base {
  constructor() {
    super(...arguments);
    this.isNeedToFocusHeader = false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contextMenuHiddenHandler(e) {
    const headersKeyboardNavigationController = this.getController('headersKeyboardNavigation');
    if (this.isNeedToFocusHeader) {
      headersKeyboardNavigationController === null || headersKeyboardNavigationController === void 0 || headersKeyboardNavigationController.restoreFocus();
      this.isNeedToFocusHeader = false;
    }
  }
  getContextMenuItems(options) {
    let items = super.getContextMenuItems(options);
    const {
      column,
      rowIndex
    } = options;
    const allowColumnReordering = this.isReorderingEnabled(options === null || options === void 0 ? void 0 : options.column);
    if (allowColumnReordering) {
      const headersKeyboardNavigationController = this.getController('headersKeyboardNavigation');
      if (headersKeyboardNavigationController) {
        const rtlEnabled = this.option('rtlEnabled');
        const onItemClick = e => {
          var _e$itemData;
          this.isNeedToFocusHeader = true;
          headersKeyboardNavigationController.moveHeader(column, rowIndex, (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.value);
        };
        items = items ?? [];
        items.push({
          text: _message.default.format('dxDataGrid-moveColumnToTheLeft'),
          value: _const2.Direction.Previous,
          beginGroup: true,
          disabled: !headersKeyboardNavigationController.isHeaderValidForReordering(column, _const2.Direction.Previous, rowIndex),
          icon: rtlEnabled ? _const2.CONTEXT_MENU_MOVE_NEXT_ICON : _const2.CONTEXT_MENU_MOVE_PREVIOUS_ICON,
          onItemClick
        }, {
          text: _message.default.format('dxDataGrid-moveColumnToTheRight'),
          value: _const2.Direction.Next,
          disabled: !headersKeyboardNavigationController.isHeaderValidForReordering(column, _const2.Direction.Next, rowIndex),
          icon: rtlEnabled ? _const2.CONTEXT_MENU_MOVE_PREVIOUS_ICON : _const2.CONTEXT_MENU_MOVE_NEXT_ICON,
          onItemClick
        });
      }
    }
    return items;
  }
};
const headersKeyboardNavigationModule = exports.headersKeyboardNavigationModule = {
  controllers: {
    headersKeyboardNavigation: HeadersKeyboardNavigationController
  },
  extenders: {
    views: {
      columnHeadersView
    }
  }
};