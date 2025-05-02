"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuController = void 0;
var _index = require("../../grid_core/columns_controller/index");
var _controller = require("../../grid_core/context_menu/controller");
var _options_controller = require("../options_controller");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class ContextMenuController extends _controller.BaseContextMenuController {
  constructor(columnsController, options) {
    super();
    this.columnsController = columnsController;
    this.options = options;
  }
  show(event, view) {
    let contextInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let onMenuCloseCallback = arguments.length > 3 ? arguments[3] : undefined;
    super.show(event, view, contextInfo, onMenuCloseCallback);
  }
  getItems(view, targetElement) {
    let contextInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const items = [];
    if (view === 'headerPanel' && contextInfo.column) {
      items.push(...this.getSortingItems(contextInfo.column));
    }
    // @ts-expect-error
    const event = _extends({
      items: items.length > 0 ? items : undefined,
      target: view,
      targetElement: targetElement,
      columnIndex: undefined,
      card: undefined,
      cardIndex: undefined,
      column: undefined
    }, contextInfo);
    const callback = this.options.action('onContextMenuPreparing').peek();
    callback(event);
    return event.items;
  }
  getSortingItems(column) {
    const onItemClick = e => {
      var _e$itemData;
      this.columnsController.columnOption(column, 'sortOrder', (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.value);
    };
    return [{
      text: this.options.oneWay('sorting.ascendingText').peek(),
      value: 'asc',
      disabled: column.sortOrder === 'asc',
      icon: 'sortuptext',
      onItemClick
    }, {
      text: this.options.oneWay('sorting.descendingText').peek(),
      value: 'desc',
      disabled: column.sortOrder === 'desc',
      icon: 'sortdowntext',
      onItemClick
    }, {
      text: this.options.oneWay('sorting.clearText').peek(),
      value: undefined,
      disabled: !column.sortOrder,
      icon: 'none',
      onItemClick
    }];
  }
}
exports.ContextMenuController = ContextMenuController;
ContextMenuController.dependencies = [_index.ColumnsController, _options_controller.OptionsController];