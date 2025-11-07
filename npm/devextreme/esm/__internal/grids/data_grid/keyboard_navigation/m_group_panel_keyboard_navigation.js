/**
* DevExtreme (esm/__internal/grids/data_grid/keyboard_navigation/m_group_panel_keyboard_navigation.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { name as clickEventName } from '../../../../common/core/events/click';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { isCommandKeyPressed } from '../../../../common/core/events/utils/index';
import $ from '../../../../core/renderer';
import { hiddenFocus } from '../../../../ui/shared/accessibility';
import { Direction } from '../../../grids/grid_core/keyboard_navigation/const';
import { ColumnKeyboardNavigationController } from '../../../grids/grid_core/keyboard_navigation/m_column_keyboard_navigation_core';
import { CLASSES as GROUPING_CLASSES } from '../grouping/const';
import gridCore from '../m_core';
import { ColumnKeyboardNavigationMixin } from './m_column_keyboard_navigation_mixin';
export class GroupPanelKeyboardNavigationController extends ColumnKeyboardNavigationMixin(ColumnKeyboardNavigationController) {
  constructor() {
    super(...arguments);
    this.isNeedToHiddenFocusAfterClick = false;
  }
  groupItemClickHandler(e) {
    var _this$_columnsControl;
    const $groupedColumnElement = $(e.originalEvent.target);
    const groupColumn = this._columnsController.columnOption(`groupIndex:${$groupedColumnElement.index()}`);
    this.isNeedToHiddenFocusAfterClick = (_this$_columnsControl = this._columnsController) === null || _this$_columnsControl === void 0 ? void 0 : _this$_columnsControl.allowColumnSorting(groupColumn);
  }
  unsubscribeFromGroupItemClick() {
    const $focusedView = this.getFocusedViewElement();
    if ($focusedView) {
      eventsEngine.off($focusedView, clickEventName, this.groupItemClickHandlerContext);
    }
  }
  subscribeToGroupItemClick() {
    const $focusedView = this.getFocusedViewElement();
    if ($focusedView) {
      eventsEngine.on($focusedView, clickEventName, `.${GROUPING_CLASSES.groupPanelItem}`, this.groupItemClickHandlerContext);
    }
  }
  leftRightKeysHandler(e) {
    const {
      originalEvent
    } = e;
    if (isCommandKeyPressed(originalEvent)) {
      const $groupedColumnElement = $(originalEvent.target);
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
    const $groupedColumnElement = $(e.originalEvent.target);
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
    return (_this$headerPanel2 = this.headerPanel) === null || _this$headerPanel2 === void 0 || (_this$headerPanel2 = _this$headerPanel2.element()) === null || _this$headerPanel2 === void 0 ? void 0 : _this$headerPanel2.find(`.${GROUPING_CLASSES.groupPanel}`);
  }
  getFocusinSelector() {
    return `.${GROUPING_CLASSES.groupPanelItem}`;
  }
  focusinHandler(e) {
    this.setFocusedCellPosition(0, $(e.target).index());
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
        hiddenFocus($focusElement.get(0));
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
    return direction === Direction.Next ? groupColumn.groupIndex !== groupedColumns.length - 1 : groupColumn.groupIndex !== 0;
  }
  ungroupAllColumns() {
    this.updateViewFocusPosition();
    super.ungroupAllColumns();
  }
}
gridCore.registerModule('groupPanelKeyboardNavigation', {
  controllers: {
    groupPanelKeyboardNavigation: GroupPanelKeyboardNavigationController
  }
});
