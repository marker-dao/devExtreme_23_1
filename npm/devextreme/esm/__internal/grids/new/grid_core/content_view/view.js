/**
* DevExtreme (esm/__internal/grids/new/grid_core/content_view/view.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable
  @typescript-eslint/explicit-function-return-type,
  @typescript-eslint/explicit-module-boundary-types
*/
import $ from '../../../../../core/renderer';
import { computed, signal } from '../../../../core/state_manager/index';
import { ColumnsController } from '../../../../grids/new/grid_core/columns_controller/columns_controller';
import { BaseContextMenuController } from '../../../../grids/new/grid_core/context_menu/controller';
import { View } from '../../../../grids/new/grid_core/core/view';
import { DataController } from '../../../../grids/new/grid_core/data_controller/index';
import { ErrorController } from '../../../../grids/new/grid_core/error_controller/error_controller';
import { KeyboardNavigationController } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { SearchUIController } from '../../../../grids/new/grid_core/search/index';
import { SelectionController } from '../../../../grids/new/grid_core/selection/controller';
import { createRef } from 'inferno';
import { EditingController } from '../editing/controller';
import { ItemsController } from '../items_controller/items_controller';
import { LifeCycleController } from '../lifecycle/controller';
import { OptionsController } from '../options_controller/options_controller';
export class ContentView extends View {
  constructor(dataController, options, errorController, columnsController, selectionController, itemsController, editingController, contextMenuController, searchUIController, keyboardNavigationController, lifecycle) {
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
    this.lifecycle = lifecycle;
    this.isNoData = computed(() => {
      const {
        isLoading,
        items
      } = this.dataController;
      const isEmptyDataLoaded = !isLoading.value && items.value.length === 0;
      const isNoVisibleColumns = this.columnsController.visibleColumns.value.length === 0;
      return isEmptyDataLoaded || isNoVisibleColumns;
    });
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
        useNative: useNativeConfig.value === 'auto' ? undefined : useNativeConfig.value,
        // TODO (Scrollable:useKeyboard) -> remove this WA
        //  after ScrollView private option "useKeyboard" will be extended to useNative: true
        // NOTE: Scrollable container focusable by default
        // To prevent scroll container focus in native mode we set tabindex -1 to container
        // In simulated mode focusable behavior prevented by useKeyboard: false private option
        useKeyboard: false,
        // Bad scrollable types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInitialized: _ref => {
          let {
            component
          } = _ref;
          const useKeyboardDisabled = component.option('useKeyboard') === false;
          const useNativeEnabled = component.option('useNative') === true;
          if (useKeyboardDisabled && useNativeEnabled) {
            $(component.container()).attr('tabindex', -1);
          }
        },
        // Bad scrollable types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onOptionChanged: _ref2 => {
          let {
            fullName,
            value,
            component
          } = _ref2;
          const useKeyboardDisabled = component.option('useKeyboard') === false;
          if (useKeyboardDisabled && fullName === 'useNative' && value === true) {
            $(component.container()).attr('tabindex', -1);
          }
        }
      },
      showContextMenu: this.showContextMenu.bind(this),
      onRendered: () => {
        this.lifecycle.contentRendered.trigger();
      }
    };
  }
  showContextMenu(e) {
    this.contextMenuController.show(e, 'content');
  }
  onScroll(e) {
    this.scrollTop.value = e.scrollOffset.top;
  }
}
ContentView.dependencies = [DataController, OptionsController, ErrorController, ColumnsController, SelectionController, ItemsController, EditingController, BaseContextMenuController, SearchUIController, KeyboardNavigationController, LifeCycleController];
