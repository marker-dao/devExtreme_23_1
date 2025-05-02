"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderPanelView = void 0;
var _signalsCore = require("@preact/signals-core");
var _columns_controller = require("../../../../grids/new/grid_core/columns_controller/columns_controller");
var _view = require("../../../../grids/new/grid_core/core/view");
var _index = require("../../../../grids/new/grid_core/keyboard_navigation/index");
var _index2 = require("../../grid_core/column_chooser/index");
var _view_controller = require("../../grid_core/filtering/header_filter/view_controller");
var _sorting_controller = require("../../grid_core/sorting_controller/sorting_controller");
var _index3 = require("../context_menu/index");
var _options_controller = require("../options_controller");
var _header_panel = require("./header_panel");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable spellcheck/spell-checker */
class HeaderPanelView extends _view.View {
  constructor(contextMenuController, sortingController, columnsController, options, headerFilterViewController, keyboardNavigationController, columnChooserView) {
    super();
    this.contextMenuController = contextMenuController;
    this.sortingController = sortingController;
    this.columnsController = columnsController;
    this.options = options;
    this.headerFilterViewController = headerFilterViewController;
    this.keyboardNavigationController = keyboardNavigationController;
    this.columnChooserView = columnChooserView;
    this.component = _header_panel.HeaderPanel;
    this.navigationStrategy = new _index.NavigationStrategyHorizontalList();
  }
  getProps() {
    return (0, _signalsCore.computed)(() => ({
      visibleColumns: this.columnsController.visibleColumns.value,
      kbnEnabled: this.keyboardNavigationController.enabled.value,
      navigationStrategy: this.navigationStrategy,
      onColumnMove: this.onColumnMove.bind(this),
      allowColumnReordering: this.columnsController.allowColumnReordering.value,
      columnChooserDragModeOpened: this.columnChooserView.dragModeOpened.value,
      showSortIndexes: this.sortingController.showSortIndexes.value,
      onColumnSort: this.onColumnSort.bind(this),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      itemTemplate: this.options.template('headerPanel.itemTemplate').value,
      onHeaderFilterOpen: this.onHeaderFilterOpen.bind(this),
      itemCssClass: this.options.oneWay('headerPanel.itemCssClass').value,
      visible: this.options.oneWay('headerPanel.visible').value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      draggingOptions: this.options.oneWay('headerPanel.dragging').value,
      showContextMenu: this.showContextMenu.bind(this)
    }));
  }
  onColumnMove(column, toIndex, draggingColumnData) {
    const {
      columnAfter
    } = draggingColumnData;
    const needPreserveOrder = !column.allowReordering;
    if (needPreserveOrder) {
      this.columnsController.columnOption(column, 'visible', true);
      return;
    }
    if (columnAfter === undefined) {
      const columnsCount = this.columnsController.columns.peek().length;
      this.columnsController.columnOption(column, 'visible', true);
      this.columnsController.columnOption(column, 'visibleIndex', columnsCount);
      return;
    }
    this.columnsController.updateColumns(columns => {
      const newColumns = [...columns];
      newColumns.forEach((oldColumn, index) => {
        const updatedColumn = _extends({}, oldColumn);
        if (oldColumn.name === column.name) {
          updatedColumn.visibleIndex = columnAfter.visibleIndex;
          updatedColumn.visible = true;
        } else if (oldColumn.visibleIndex >= columnAfter.visibleIndex) {
          updatedColumn.visibleIndex = oldColumn.visibleIndex + 1;
        }
        newColumns[index] = updatedColumn;
      });
      return newColumns;
    });
  }
  onColumnSort(column, event) {
    const mode = this.sortingController.mode.peek();
    switch (mode) {
      case 'none':
        return;
      case 'single':
        this.sortingController.onSingleModeSortClick(column, event);
        return;
      case 'multiple':
        this.sortingController.onMultipleModeSortClick(column, event);
        return;
      default:
        throw new Error('Unsupported sorting state');
    }
  }
  onHeaderFilterOpen(element, column, onFilterCloseCallback) {
    if (!element) {
      return;
    }
    this.headerFilterViewController.openPopup(element, column, onFilterCloseCallback);
  }
  showContextMenu(event, column, columnIndex, onMenuCloseCallback) {
    this.contextMenuController.show(event, 'headerPanel', {
      column,
      columnIndex
    }, onMenuCloseCallback);
  }
}
exports.HeaderPanelView = HeaderPanelView;
HeaderPanelView.dependencies = [_index3.ContextMenuController, _sorting_controller.SortingController, _columns_controller.ColumnsController, _options_controller.OptionsController, _view_controller.HeaderFilterViewController, _index.KeyboardNavigationController, _index2.ColumnChooserView];