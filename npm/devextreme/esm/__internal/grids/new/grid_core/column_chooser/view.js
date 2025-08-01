/**
* DevExtreme (esm/__internal/grids/new/grid_core/column_chooser/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { computed, signal } from '@preact/signals-core';
import { createRef } from 'inferno';
import { ColumnsController } from '../columns_controller/index';
import { View } from '../core/view';
import { OptionsController } from '../options_controller/options_controller';
import { ToolbarController } from '../toolbar/controller';
import { addWidgetPrefix } from '../utils/common';
import { CLASS, ColumnChooser } from './column_chooser';
import { ColumnChooserController } from './controller';
export class ColumnChooserView extends View {
  constructor(toolbarController, columnChooserController, columnsController, options) {
    super();
    this.toolbarController = toolbarController;
    this.columnChooserController = columnChooserController;
    this.columnsController = columnsController;
    this.options = options;
    this.component = ColumnChooser;
    this.popupVisible = signal(false);
    this.popupRef = createRef();
    this.treeViewRef = createRef();
    this.toolbarButtonElement = undefined;
    this.selectModeConfig = computed(() => ({
      showCheckBoxesMode: this.options.oneWay('columnChooser.selection.allowSelectAll').value ? 'selectAll' : 'normal',
      selectByClick: this.options.oneWay('columnChooser.selection.selectByClick').value,
      onSelectionChanged: this.columnChooserController.onSelectionChanged.bind(this.columnChooserController)
    }));
    this.dragAndDropModeConfig = computed(() => ({
      noDataText: this.options.oneWay('columnChooser.emptyPanelText').value,
      activeStateEnabled: false
    }));
    this.popupToolbarItems = computed(() => {
      const title = this.options.oneWay('columnChooser.title').value;
      const items = [{
        text: title,
        toolbar: 'top',
        location: 'before'
      }];
      return items;
    });
    this.mode = this.options.oneWay('columnChooser.mode');
    this.dragModeOpened = computed(() => this.popupVisible.value && this.mode.value === 'dragAndDrop');
    this.toolbarController.addDefaultItem(signal({
      name: 'columnChooserButton',
      widget: 'dxButton',
      options: {
        icon: 'column-chooser',
        onContentReady: _ref => {
          let {
            element
          } = _ref;
          this.toolbarButtonElement = element;
        },
        onClick: () => {
          this.popupVisible.value = true;
        },
        elementAttr: {
          'aria-haspopup': 'dialog',
          class: addWidgetPrefix(CLASS.toolbarBtn)
        }
      },
      showText: 'inMenu',
      location: 'after',
      locateInMenu: 'auto',
      visible: true
    }), this.options.oneWay('columnChooser.enabled'));
  }
  show() {
    this.popupVisible.value = true;
  }
  hide() {
    var _this$popupRef$curren;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$popupRef$curren = this.popupRef.current) === null || _this$popupRef$curren === void 0 || _this$popupRef$curren.hide();
  }
  getProps() {
    return computed(() => ({
      popupRef: this.popupRef,
      treeViewRef: this.treeViewRef,
      visible: this.popupVisible.value,
      mode: this.mode.value,
      title: this.options.oneWay('columnChooser.title').value,
      chooserColumns: this.columnChooserController.chooserColumns.value,
      visibleColumns: this.columnsController.visibleColumns.value,
      // TODO: band columns aren't yet implemented in cardview
      isBandColumnsUsed: false,
      onColumnMove: this.columnChooserController.onColumnMove,
      popupConfig: {
        width: this.options.oneWay('columnChooser.width').value,
        height: this.options.oneWay('columnChooser.height').value,
        container: this.options.oneWay('columnChooser.container').value,
        position: this.options.oneWay('columnChooser.position').value,
        toolbarItems: this.popupToolbarItems.value,
        onHidden: () => {
          var _this$toolbarButtonEl;
          this.popupVisible.value = false;
          (_this$toolbarButtonEl = this.toolbarButtonElement) === null || _this$toolbarButtonEl === void 0 || _this$toolbarButtonEl.focus();
        }
      },
      treeViewConfig: {
        searchEditorOptions: this.options.oneWay('columnChooser.search.editorOptions').value,
        searchEnabled: this.options.oneWay('columnChooser.search.enabled').value,
        searchTimeout: this.options.oneWay('columnChooser.search.timeout').value,
        items: this.columnChooserController.items.value
      },
      treeViewSelectModeConfig: this.selectModeConfig.value,
      treeViewDragAndDropModeConfig: this.dragAndDropModeConfig.value,
      sortableConfig: {
        isColumnDraggable: this.columnChooserController.isColumnDraggable,
        onDragStart: this.columnChooserController.onDragStart,
        onDragEnd: this.columnChooserController.onDragEnd,
        onPlaceholderPrepared: this.columnChooserController.onPlaceholderPrepared
      }
    }));
  }
}
ColumnChooserView.dependencies = [ToolbarController, ColumnChooserController, ColumnsController, OptionsController];
