/**
* DevExtreme (cjs/__internal/grids/new/grid_core/column_chooser/view.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnChooserView = void 0;
var _index = require("../../../../core/state_manager/index");
var _inferno = require("inferno");
var _index2 = require("../columns_controller/index");
var _view = require("../core/view");
var _options_controller = require("../options_controller/options_controller");
var _controller = require("../toolbar/controller");
var _common = require("../utils/common");
var _column_chooser = require("./column_chooser");
var _controller2 = require("./controller");
class ColumnChooserView extends _view.View {
  constructor(toolbarController, columnChooserController, columnsController, options) {
    super();
    this.toolbarController = toolbarController;
    this.columnChooserController = columnChooserController;
    this.columnsController = columnsController;
    this.options = options;
    this.component = _column_chooser.ColumnChooser;
    this.popupVisible = (0, _index.signal)(false);
    this.popupRef = (0, _inferno.createRef)();
    this.treeViewRef = (0, _inferno.createRef)();
    this.toolbarButtonElement = undefined;
    this.selectModeConfig = (0, _index.computed)(() => ({
      showCheckBoxesMode: this.options.oneWay('columnChooser.selection.allowSelectAll').value ? 'selectAll' : 'normal',
      selectByClick: this.options.oneWay('columnChooser.selection.selectByClick').value,
      onSelectionChanged: this.columnChooserController.onSelectionChanged.bind(this.columnChooserController)
    }));
    this.dragAndDropModeConfig = (0, _index.computed)(() => ({
      noDataText: this.options.oneWay('columnChooser.emptyPanelText').value,
      activeStateEnabled: false
    }));
    this.popupToolbarItems = (0, _index.computed)(() => {
      const title = this.options.oneWay('columnChooser.title').value;
      const items = [{
        text: title,
        toolbar: 'top',
        location: 'before'
      }];
      return items;
    });
    this.mode = this.options.oneWay('columnChooser.mode');
    this.dragModeOpened = (0, _index.computed)(() => this.popupVisible.value && this.mode.value === 'dragAndDrop');
    this.toolbarController.addDefaultItem((0, _index.signal)({
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
          class: (0, _common.addWidgetPrefix)(_column_chooser.CLASS.toolbarBtn)
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
    return (0, _index.computed)(() => ({
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
exports.ColumnChooserView = ColumnChooserView;
ColumnChooserView.dependencies = [_controller.ToolbarController, _controller2.ColumnChooserController, _index2.ColumnsController, _options_controller.OptionsController];
