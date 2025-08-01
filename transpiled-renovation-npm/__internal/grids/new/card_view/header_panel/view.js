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
var _filter_controller = require("../../grid_core/filtering/filter_controller");
var _view_controller = require("../../grid_core/filtering/header_filter/view_controller");
var _index3 = require("../../grid_core/sorting_controller/index");
var _index4 = require("../context_menu/index");
var _options_controller = require("../options_controller");
var _controller = require("./controller");
var _header_panel = require("./header_panel");
/* eslint-disable spellcheck/spell-checker */

class HeaderPanelView extends _view.View {
  constructor(headerPanelController, contextMenuController, sortingController, columnsController, options, headerFilterViewController, keyboardNavigationController, columnChooserController, filterController, columnChooserView) {
    super();
    this.headerPanelController = headerPanelController;
    this.contextMenuController = contextMenuController;
    this.sortingController = sortingController;
    this.columnsController = columnsController;
    this.options = options;
    this.headerFilterViewController = headerFilterViewController;
    this.keyboardNavigationController = keyboardNavigationController;
    this.columnChooserController = columnChooserController;
    this.filterController = filterController;
    this.columnChooserView = columnChooserView;
    this.component = _header_panel.HeaderPanel;
    this.navigationStrategy = new _index.NavigationStrategyHorizontalList();
    this.showDropzone = (0, _signalsCore.computed)(() => {
      var _this$columnChooserCo;
      const allowReordering = this.columnsController.allowColumnReordering.value;
      const column = (_this$columnChooserCo = this.columnChooserController.draggingItem.value) === null || _this$columnChooserCo === void 0 ? void 0 : _this$columnChooserCo.column;
      if (!column) {
        return false;
      }
      const allColumnsHidden = this.columnsController.visibleColumns.value.length === 0;
      const canReorder = allowReordering && column.allowReordering;
      return !canReorder || allColumnsHidden;
    });
  }
  getProps() {
    return (0, _signalsCore.computed)(() => ({
      visibleColumns: this.columnsController.visibleColumns.value,
      kbnEnabled: this.keyboardNavigationController.enabled.value,
      navigationStrategy: this.navigationStrategy,
      showSortIndexes: this.sortingController.showSortIndexes.value,
      onColumnSort: this.onColumnSort.bind(this),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      itemTemplate: this.options.template('headerPanel.itemTemplate').value,
      onHeaderFilterOpen: this.onHeaderFilterOpen.bind(this),
      itemCssClass: this.options.oneWay('headerPanel.itemCssClass').value,
      visible: this.options.oneWay('headerPanel.visible').value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      draggingOptions: this.options.oneWay('headerPanel.dragging').value,
      sortableConfig: {
        onColumnMove: this.headerPanelController.onColumnMove,
        showDropzone: this.showDropzone.value,
        isColumnDraggable: this.headerPanelController.isColumnDraggable,
        onPlaceholderPrepared: this.headerPanelController.onPlaceholderPrepared
      },
      showContextMenu: this.showContextMenu.bind(this),
      openColumnChooser: () => {
        this.columnChooserView.show();
      },
      filterSyncValue: this.filterController.filterSyncValue.value
    }));
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
HeaderPanelView.dependencies = [_controller.HeaderPanelController, _index4.ContextMenuController, _index3.SortingController, _columns_controller.ColumnsController, _options_controller.OptionsController, _view_controller.HeaderFilterViewController, _index.KeyboardNavigationController, _index2.ColumnChooserController, _filter_controller.FilterController, _index2.ColumnChooserView];