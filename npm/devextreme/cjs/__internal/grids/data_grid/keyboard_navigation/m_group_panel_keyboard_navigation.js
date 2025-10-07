/**
* DevExtreme (cjs/__internal/grids/data_grid/keyboard_navigation/m_group_panel_keyboard_navigation.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPanelKeyboardNavigationController = void 0;
var _click = require("../../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _index = require("../../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _accessibility = require("../../../../ui/shared/accessibility");
var _const = require("../../../grids/grid_core/keyboard_navigation/const");
var _m_column_keyboard_navigation_core = require("../../../grids/grid_core/keyboard_navigation/m_column_keyboard_navigation_core");
var _const2 = require("../grouping/const");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_column_keyboard_navigation_mixin = require("./m_column_keyboard_navigation_mixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GroupPanelKeyboardNavigationController extends (0, _m_column_keyboard_navigation_mixin.ColumnKeyboardNavigationMixin)(_m_column_keyboard_navigation_core.ColumnKeyboardNavigationController) {
  constructor() {
    super(...arguments);
    this.isNeedToHiddenFocusAfterClick = false;
  }
  groupItemClickHandler(e) {
    var _this$_columnsControl;
    const $groupedColumnElement = (0, _renderer.default)(e.originalEvent.target);
    const groupColumn = this._columnsController.columnOption(`groupIndex:${$groupedColumnElement.index()}`);
    this.isNeedToHiddenFocusAfterClick = (_this$_columnsControl = this._columnsController) === null || _this$_columnsControl === void 0 ? void 0 : _this$_columnsControl.allowColumnSorting(groupColumn);
  }
  unsubscribeFromGroupItemClick() {
    const $focusedView = this.getFocusedViewElement();
    if ($focusedView) {
      _events_engine.default.off($focusedView, _click.name, this.groupItemClickHandlerContext);
    }
  }
  subscribeToGroupItemClick() {
    const $focusedView = this.getFocusedViewElement();
    if ($focusedView) {
      _events_engine.default.on($focusedView, _click.name, `.${_const2.CLASSES.groupPanelItem}`, this.groupItemClickHandlerContext);
    }
  }
  leftRightKeysHandler(e) {
    const {
      originalEvent
    } = e;
    if ((0, _index.isCommandKeyPressed)(originalEvent)) {
      const $groupedColumnElement = (0, _renderer.default)(originalEvent.target);
      const column = this._columnsController.columnOption(`groupIndex:${$groupedColumnElement.index()}`);
      const direction = this.getDirectionByKeyName(e.keyName);
      if (this.canReorderColumn(column, direction)) {
        this.moveColumn(column, direction);
      }
      originalEvent === null || originalEvent === void 0 || originalEvent.preventDefault();
    }
  }
  getVisibleIndex(column) {
    return column.groupIndex;
  }
  getColumnFromEvent(e) {
    const $groupedColumnElement = (0, _renderer.default)(e.originalEvent.target);
    return this._columnsController.columnOption(`groupIndex:${$groupedColumnElement.index()}`);
  }
  getNewFocusedColumnBeforeUngrouping(column) {
    const visibleColumnIndex = column.groupIndex;
    const groupColumns = this._columnsController.getGroupColumns();
    return visibleColumnIndex === groupColumns.length - 1 ? groupColumns[visibleColumnIndex - 1] : groupColumns[visibleColumnIndex + 1];
  }
  _getCell(cellPosition) {
    var _this$headerPanel;
    const $groupColumnElements = (_this$headerPanel = this.headerPanel) === null || _this$headerPanel === void 0 ? void 0 : _this$headerPanel.getColumnElements();
    return $groupColumnElements === null || $groupColumnElements === void 0 ? void 0 : $groupColumnElements.eq(cellPosition.columnIndex);
  }
  getFocusedView() {
    return this.getView('headerPanel');
  }
  getFocusedViewElement() {
    var _this$headerPanel2;
    return (_this$headerPanel2 = this.headerPanel) === null || _this$headerPanel2 === void 0 || (_this$headerPanel2 = _this$headerPanel2.element()) === null || _this$headerPanel2 === void 0 ? void 0 : _this$headerPanel2.find(`.${_const2.CLASSES.groupPanel}`);
  }
  getFocusinSelector() {
    return `.${_const2.CLASSES.groupPanelItem}`;
  }
  focusinHandler(e) {
    this.setFocusedCellPosition(0, (0, _renderer.default)(e.target).index());
  }
  keyDownHandler(e) {
    let isHandled = super.keyDownHandler(e);
    if (isHandled) {
      return true;
    }
    if (e.keyName === 'leftArrow' || e.keyName === 'rightArrow') {
      this.leftRightKeysHandler(e);
      isHandled = true;
    }
    return isHandled;
  }
  renderCompleted(e) {
    const {
      needToRestoreFocus
    } = this;
    super.renderCompleted(e);
    this.unsubscribeFromGroupItemClick();
    this.subscribeToGroupItemClick();
    if (!needToRestoreFocus && this.isNeedToHiddenFocusAfterClick) {
      const $focusElement = this._getFocusedCell();
      if ($focusElement !== null && $focusElement !== void 0 && $focusElement.length) {
        (0, _accessibility.hiddenFocus)($focusElement.get(0));
      }
      this.isNeedToHiddenFocusAfterClick = false;
    }
  }
  canUngroupColumnByPressingKey(e) {
    return super.canUngroupColumnByPressingKey(e) || e.keyName === 'backspace' || e.keyName === 'del';
  }
  getFirstFocusableVisibleIndex() {
    var _this$headerPanel3;
    const columns = (_this$headerPanel3 = this.headerPanel) === null || _this$headerPanel3 === void 0 ? void 0 : _this$headerPanel3.getColumns();
    return columns !== null && columns !== void 0 && columns.length ? 0 : -1;
  }
  init() {
    this.headerPanel = this.getView('headerPanel');
    this.groupItemClickHandlerContext = this.groupItemClickHandlerContext ?? this.groupItemClickHandler.bind(this);
    super.init();
  }
  canReorderColumn(groupColumn, direction) {
    const allowDragging = this.headerPanel.allowDragging(groupColumn);
    if (!allowDragging) {
      return false;
    }
    const groupedColumns = this._columnsController.getGroupColumns();
    return direction === _const.Direction.Next ? groupColumn.groupIndex !== groupedColumns.length - 1 : groupColumn.groupIndex !== 0;
  }
  ungroupAllColumns() {
    this.updateViewFocusPosition();
    super.ungroupAllColumns();
  }
}
exports.GroupPanelKeyboardNavigationController = GroupPanelKeyboardNavigationController;
_m_core.default.registerModule('groupPanelKeyboardNavigation', {
  controllers: {
    groupPanelKeyboardNavigation: GroupPanelKeyboardNavigationController
  }
});
