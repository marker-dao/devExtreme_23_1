"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPanelKeyboardNavigationController = void 0;
var _click = require("../../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _index = require("../../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _accessibility = require("../../../../ui/shared/accessibility");
var _const = require("../../../grids/grid_core/keyboard_navigation/const");
var _m_keyboard_navigation_core = require("../../../grids/grid_core/keyboard_navigation/m_keyboard_navigation_core");
var _const2 = require("../grouping/const");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

class GroupPanelKeyboardNavigationController extends _m_keyboard_navigation_core.KeyboardNavigationController {
  constructor() {
    super(...arguments);
    this.isNeedToHiddenFocusAfterClick = false;
  }
  groupItemClickHandler(e) {
    var _this$_columnsControl;
    const groupColumn = (0, _renderer.default)(e.originalEvent.target).data('columnData');
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
      const groupColumn = (0, _renderer.default)(originalEvent.target).data('columnData');
      const direction = this.getDirectionByKeyName(e.keyName);
      if (this.isGroupColumnValidForReordering(groupColumn, direction)) {
        this.moveGroupColumn(groupColumn, direction);
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
    return (_this$headerPanel2 = this.headerPanel) === null || _this$headerPanel2 === void 0 || (_this$headerPanel2 = _this$headerPanel2.element()) === null || _this$headerPanel2 === void 0 ? void 0 : _this$headerPanel2.find(`.${_const2.CLASSES.groupPanel}`);
  }
  getFocusinSelector() {
    return `.${_const2.CLASSES.groupPanelItem}`;
  }
  focusinHandler(e) {
    this.setFocusedCellPosition(0, (0, _renderer.default)(e.target).index());
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
        (0, _accessibility.hiddenFocus)($focusElement.get(0));
      }
      this.isNeedToHiddenFocusAfterClick = false;
    }
  }
  init() {
    this.headerPanel = this.getView('headerPanel');
    this.groupItemClickHandlerContext = this.groupItemClickHandlerContext ?? this.groupItemClickHandler.bind(this);
    super.init();
  }
  isGroupColumnValidForReordering(groupColumn, direction) {
    const allowDragging = this.headerPanel.allowDragging(groupColumn);
    if (!allowDragging) {
      return false;
    }
    const groupedColumns = this._columnsController.getGroupColumns();
    return direction === _const.Direction.Next ? groupColumn.groupIndex !== groupedColumns.length - 1 : groupColumn.groupIndex !== 0;
  }
  moveGroupColumn(groupColumn, direction) {
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
    const newGroupIndex = direction === _const.Direction.Next ? groupColumn.groupIndex + 2 : groupColumn.groupIndex - 1;
    const newFocusedGroupColumnIndex = direction === _const.Direction.Next ? groupColumn.groupIndex + 1 : groupColumn.groupIndex - 1;
    this.isNeedToFocus = true;
    this.setFocusedCellPosition(0, newFocusedGroupColumnIndex);
    this._columnsController.columnOption(groupColumn.index, 'groupIndex', newGroupIndex);
  }
}
exports.GroupPanelKeyboardNavigationController = GroupPanelKeyboardNavigationController;
const headerPanel = Base => class HeaderPanelKeyboardNavigationExtender extends Base {
  constructor() {
    super(...arguments);
    this.isNeedToFocusGroupColumn = false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contextMenuHiddenHandler(e) {
    const groupPanelKeyboardNavigationController = this.getController('groupPanelKeyboardNavigation');
    if (this.isNeedToFocusGroupColumn) {
      groupPanelKeyboardNavigationController === null || groupPanelKeyboardNavigationController === void 0 || groupPanelKeyboardNavigationController.restoreFocus();
      this.isNeedToFocusGroupColumn = false;
    }
  }
  getContextMenuItems(options) {
    let items = super.getContextMenuItems(options);
    const {
      column
    } = options;
    const allowDragging = this.allowDragging(column);
    if (allowDragging) {
      const groupPanelKeyboardNavigationController = this.getController('groupPanelKeyboardNavigation');
      if (groupPanelKeyboardNavigationController) {
        const rtlEnabled = this.option('rtlEnabled');
        const onItemClick = e => {
          var _e$itemData;
          this.isNeedToFocusGroupColumn = true;
          groupPanelKeyboardNavigationController.moveGroupColumn(column, (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.value);
        };
        items = items ?? [];
        items.push({
          text: _message.default.format('dxDataGrid-moveColumnToTheLeft'),
          value: _const.Direction.Previous,
          beginGroup: true,
          disabled: !groupPanelKeyboardNavigationController.isGroupColumnValidForReordering(column, _const.Direction.Previous),
          icon: rtlEnabled ? _const.CONTEXT_MENU_MOVE_NEXT_ICON : _const.CONTEXT_MENU_MOVE_PREVIOUS_ICON,
          onItemClick
        }, {
          text: _message.default.format('dxDataGrid-moveColumnToTheRight'),
          value: _const.Direction.Next,
          disabled: !groupPanelKeyboardNavigationController.isGroupColumnValidForReordering(column, _const.Direction.Next),
          icon: rtlEnabled ? _const.CONTEXT_MENU_MOVE_PREVIOUS_ICON : _const.CONTEXT_MENU_MOVE_NEXT_ICON,
          onItemClick
        });
      }
    }
    return items;
  }
};
_m_core.default.registerModule('groupPanelKeyboardNavigation', {
  controllers: {
    groupPanelKeyboardNavigation: GroupPanelKeyboardNavigationController
  },
  extenders: {
    views: {
      headerPanel
    }
  }
});