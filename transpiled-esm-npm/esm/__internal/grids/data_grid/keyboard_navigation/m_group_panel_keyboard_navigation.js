import { name as clickEventName } from '../../../../common/core/events/click';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { isCommandKeyPressed } from '../../../../common/core/events/utils/index';
import $ from '../../../../core/renderer';
import { hiddenFocus } from '../../../../ui/shared/accessibility';
import { Direction } from '../../../grids/grid_core/keyboard_navigation/const';
import { KeyboardNavigationController as KeyboardNavigationControllerCore } from '../../../grids/grid_core/keyboard_navigation/m_keyboard_navigation_core';
import { CLASSES as GROUPING_CLASSES } from '../grouping/const';
import gridCore from '../m_core';
export class GroupPanelKeyboardNavigationController extends KeyboardNavigationControllerCore {
  constructor() {
    super(...arguments);
    this.isNeedToHiddenFocusAfterClick = false;
  }
  isGroupColumnValidForReordering(groupColumn, direction) {
    const allowDragging = this.headerPanel.allowDragging(groupColumn);
    if (!allowDragging) {
      return false;
    }
    const groupedColumns = this._columnsController.getGroupColumns();
    return direction === Direction.Next ? groupColumn.groupIndex !== groupedColumns.length - 1 : groupColumn.groupIndex !== 0;
  }
  groupItemClickHandler(e) {
    var _this$_columnsControl;
    const groupColumn = $(e.originalEvent.target).data('columnData');
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
      const groupColumn = $(originalEvent.target).data('columnData');
      const direction = this.getDirectionByKeyName(e.keyName);
      if (this.isGroupColumnValidForReordering(groupColumn, direction)) {
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
        const newGroupIndex = direction === Direction.Next ? groupColumn.groupIndex + 2 : groupColumn.groupIndex - 1;
        const newFocusedGroupColumnIndex = direction === Direction.Next ? groupColumn.groupIndex + 1 : groupColumn.groupIndex - 1;
        this.isNeedToFocus = true;
        this.setFocusedCellPosition(0, newFocusedGroupColumnIndex);
        this._columnsController.columnOption(groupColumn.index, 'groupIndex', newGroupIndex);
      }
      originalEvent === null || originalEvent === void 0 || originalEvent.preventDefault();
    }
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
    const isHandled = this.processOnKeyDown(e);
    if (isHandled) {
      return;
    }
    if (e.keyName === 'leftArrow' || e.keyName === 'rightArrow') {
      this.leftRightKeysHandler(e);
    }
  }
  renderCompleted(e) {
    const {
      isNeedToFocus
    } = this;
    super.renderCompleted(e);
    this.unsubscribeFromGroupItemClick();
    this.subscribeToGroupItemClick();
    if (!isNeedToFocus && this.isNeedToHiddenFocusAfterClick) {
      const $focusElement = this._getFocusedCell();
      if ($focusElement !== null && $focusElement !== void 0 && $focusElement.length) {
        hiddenFocus($focusElement.get(0));
      }
      this.isNeedToHiddenFocusAfterClick = false;
    }
  }
  init() {
    this.headerPanel = this.getView('headerPanel');
    this.groupItemClickHandlerContext = this.groupItemClickHandlerContext ?? this.groupItemClickHandler.bind(this);
    super.init();
  }
}
gridCore.registerModule('groupPanelKeyboardNavigation', {
  controllers: {
    groupPanelKeyboardNavigation: GroupPanelKeyboardNavigationController
  }
});