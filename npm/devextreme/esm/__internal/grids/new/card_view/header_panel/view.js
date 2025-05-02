/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/view.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable spellcheck/spell-checker */
import { computed } from '@preact/signals-core';
import { ColumnsController } from '../../../../grids/new/grid_core/columns_controller/columns_controller';
import { View } from '../../../../grids/new/grid_core/core/view';
import { KeyboardNavigationController, NavigationStrategyHorizontalList } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { ColumnChooserView } from '../../grid_core/column_chooser/index';
import { HeaderFilterViewController } from '../../grid_core/filtering/header_filter/view_controller';
import { SortingController } from '../../grid_core/sorting_controller/sorting_controller';
import { ContextMenuController } from '../context_menu/index';
import { OptionsController } from '../options_controller';
import { HeaderPanel } from './header_panel';
export class HeaderPanelView extends View {
  constructor(contextMenuController, sortingController, columnsController, options, headerFilterViewController, keyboardNavigationController, columnChooserView) {
    super();
    this.contextMenuController = contextMenuController;
    this.sortingController = sortingController;
    this.columnsController = columnsController;
    this.options = options;
    this.headerFilterViewController = headerFilterViewController;
    this.keyboardNavigationController = keyboardNavigationController;
    this.columnChooserView = columnChooserView;
    this.component = HeaderPanel;
    this.navigationStrategy = new NavigationStrategyHorizontalList();
  }
  getProps() {
    return computed(() => ({
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
HeaderPanelView.dependencies = [ContextMenuController, SortingController, ColumnsController, OptionsController, HeaderFilterViewController, KeyboardNavigationController, ColumnChooserView];
