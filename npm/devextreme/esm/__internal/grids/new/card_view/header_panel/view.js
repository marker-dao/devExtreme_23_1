/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { computed } from '@preact/signals-core';
import { ColumnsController } from '../../../../grids/new/grid_core/columns_controller/columns_controller';
import { View } from '../../../../grids/new/grid_core/core/view';
import { KeyboardNavigationController, NavigationStrategyHorizontalList } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { ColumnChooserController, ColumnChooserView } from '../../grid_core/column_chooser/index';
import { FilterController } from '../../grid_core/filtering/filter_controller';
import { HeaderFilterViewController } from '../../grid_core/filtering/header_filter/view_controller';
import { SortingController } from '../../grid_core/sorting_controller/index';
import { ContextMenuController } from '../context_menu/index';
import { OptionsController } from '../options_controller';
import { HeaderPanelController } from './controller';
import { HeaderPanel } from './header_panel';
export class HeaderPanelView extends View {
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
    this.component = HeaderPanel;
    this.navigationStrategy = new NavigationStrategyHorizontalList();
    this.showDropzone = computed(() => {
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
    return computed(() => ({
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
HeaderPanelView.dependencies = [HeaderPanelController, ContextMenuController, SortingController, ColumnsController, OptionsController, HeaderFilterViewController, KeyboardNavigationController, ColumnChooserController, FilterController, ColumnChooserView];
