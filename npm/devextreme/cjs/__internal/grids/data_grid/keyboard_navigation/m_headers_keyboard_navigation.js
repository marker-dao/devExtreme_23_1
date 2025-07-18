/**
* DevExtreme (cjs/__internal/grids/data_grid/keyboard_navigation/m_headers_keyboard_navigation.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _utils = require("../../../../common/core/events/utils");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
var _const = require("../../../grids/grid_core/keyboard_navigation/const");
var _m_headers_keyboard_navigation = require("../../../grids/grid_core/keyboard_navigation/m_headers_keyboard_navigation");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_column_keyboard_navigation_mixin = require("./m_column_keyboard_navigation_mixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const headersKeyboardNavigation = Base => class HeadersKeyboardNavigationControllerExtender extends (0, _m_column_keyboard_navigation_mixin.ColumnKeyboardNavigationMixin)(Base) {
  getNewFocusedColumnBeforeGrouping(column, rowIndex) {
    if (column.showWhenGrouped) {
      return column;
    }
    const focusableColumns = this.getFocusableColumns(rowIndex, column.ownerBand);
    if (focusableColumns.length === 1 && (0, _type.isDefined)(column.ownerBand)) {
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
    const $cell = (0, _renderer.default)(e.originalEvent.target).closest('td');
    const rowIndex = this._getRowIndex($cell.parent());
    const column = this._getColumnByCellElement($cell, rowIndex);
    this.groupColumn(column, rowIndex);
    (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 || _e$originalEvent.preventDefault();
  }
  canGroupColumnByPressingKey(e) {
    return e.which === _const.KEY_CODES.G && (0, _utils.isCommandKeyPressed)(e.originalEvent);
  }
  getRowIndexFromEvent(e) {
    const $cell = (0, _renderer.default)(e.originalEvent.target).closest('td');
    return this._getRowIndex($cell.parent());
  }
  getColumnFromEvent(e) {
    const $cell = (0, _renderer.default)(e.originalEvent.target).closest('td');
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
    if (!(0, _type.isDefined)(column.groupIndex) && column !== null && column !== void 0 && column.allowGrouping) {
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
_m_core.default.registerModule('headersKeyboardNavigation', _extends({}, _m_headers_keyboard_navigation.headersKeyboardNavigationModule, {
  extenders: {
    controllers: {
      headersKeyboardNavigation
    },
    views: _extends({}, _m_headers_keyboard_navigation.headersKeyboardNavigationModule.extenders.views)
  }
}));
