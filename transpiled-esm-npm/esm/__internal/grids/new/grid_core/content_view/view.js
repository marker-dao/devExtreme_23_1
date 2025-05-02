import _extends from "@babel/runtime/helpers/esm/extends";
import { computed, signal } from '@preact/signals-core';
import { ContextMenuController } from '../../../../grids/new/card_view/context_menu/index';
import { ColumnsController } from '../../../../grids/new/grid_core/columns_controller/columns_controller';
import { View } from '../../../../grids/new/grid_core/core/view';
import { DataController } from '../../../../grids/new/grid_core/data_controller/index';
import { ErrorController } from '../../../../grids/new/grid_core/error_controller/error_controller';
import { KeyboardNavigationController } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { SearchUIController } from '../../../../grids/new/grid_core/search/index';
import { SelectionController } from '../../../../grids/new/grid_core/selection/controller';
import { createRef } from 'inferno';
import { EditingController } from '../editing/controller';
import { ItemsController } from '../items_controller/items_controller';
import { OptionsController } from '../options_controller/options_controller';
export class ContentView extends View {
  constructor(dataController, options, errorController, columnsController, selectionController, itemsController, editingController, contextMenuController, searchUIController, keyboardNavigationController) {
    super();
    this.dataController = dataController;
    this.options = options;
    this.errorController = errorController;
    this.columnsController = columnsController;
    this.selectionController = selectionController;
    this.itemsController = itemsController;
    this.editingController = editingController;
    this.contextMenuController = contextMenuController;
    this.searchUIController = searchUIController;
    this.keyboardNavigationController = keyboardNavigationController;
    this.isNoData = computed(() => !this.dataController.isLoading.value && this.dataController.items.value.length === 0);
    this.scrollableRef = createRef();
    this.loadingText = this.options.twoWay('loadPanel.message');
    this.viewportHeight = signal(0);
    this.scrollTop = signal(0);
    this.width = signal(0);
  }
  getBaseProps() {
    const loadPanelConfig = this.options.oneWay('loadPanel');
    const noDataTextConfig = this.options.oneWay('noDataText');
    const noDataTemplateConfig = this.options.template('noDataTemplate');
    const errorRowEnabledConfig = this.options.oneWay('errorRowEnabled');
    const scrollByContent = this.options.oneWay('scrolling.scrollByContent');
    const scrollByThumb = this.options.oneWay('scrolling.scrollByThumb');
    const showScrollbar = this.options.oneWay('scrolling.showScrollbar');
    const useNativeConfig = this.options.oneWay('scrolling.useNative');
    return {
      loadPanelProps: _extends({}, loadPanelConfig.value, {
        visible: this.dataController.isLoading.value
      }),
      noDataTextProps: {
        text: noDataTextConfig.value,
        template: noDataTemplateConfig.value,
        visible: this.isNoData.value
      },
      errorRowProps: {
        enabled: errorRowEnabledConfig.value,
        errors: this.errorController.errors.value
      },
      onWidthChange: width => {
        this.width.value = width;
      },
      onViewportHeightChange: height => {
        this.viewportHeight.value = height;
      },
      scrollableRef: this.scrollableRef,
      scrollableProps: {
        onScroll: this.onScroll.bind(this),
        direction: 'both',
        scrollTop: this.scrollTop.value,
        scrollByContent: scrollByContent.value,
        scrollByThumb: scrollByThumb.value,
        showScrollbar: showScrollbar.value,
        useNative: useNativeConfig.value === 'auto' ? undefined : useNativeConfig.value
      }
    };
  }
  onScroll(e) {
    this.scrollTop.value = e.scrollOffset.top;
  }
}
ContentView.dependencies = [DataController, OptionsController, ErrorController, ColumnsController, SelectionController, ItemsController, EditingController, ContextMenuController, SearchUIController, KeyboardNavigationController];