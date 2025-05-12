"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnChooserView = void 0;
var _themes = require("../../../../../ui/themes");
var _signalsCore = require("@preact/signals-core");
var _inferno = require("inferno");
var _index = require("../columns_controller/index");
var _view = require("../core/view");
var _options_controller = require("../options_controller/options_controller");
var _controller = require("../toolbar/controller");
var _utils = require("../utils");
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
    this.popupVisible = (0, _signalsCore.signal)(false);
    this.popupRef = (0, _inferno.createRef)();
    this.treeViewRef = (0, _inferno.createRef)();
    this.toolbarButtonElement = undefined;
    this.selectModeConfig = (0, _signalsCore.computed)(() => ({
      showCheckBoxesMode: this.options.oneWay('columnChooser.selection.allowSelectAll').value ? 'selectAll' : 'normal',
      selectByClick: this.options.oneWay('columnChooser.selection.selectByClick').value,
      onSelectionChanged: this.columnChooserController.onSelectionChanged.bind(this.columnChooserController)
    }));
    this.dragAndDropModeConfig = (0, _signalsCore.computed)(() => ({
      noDataText: this.options.oneWay('columnChooser.emptyPanelText').value,
      activeStateEnabled: false
    }));
    this.popupToolbarItems = (0, _signalsCore.computed)(() => {
      const title = this.options.oneWay('columnChooser.title').value;
      const items = [{
        text: title,
        toolbar: 'top',
        location: 'before'
      }];
      if (!this.isMaterialOrGeneric()) {
        // @ts-expect-error
        items.push({
          shortcut: 'cancel'
        });
      }
      return items;
    });
    this.mode = this.options.oneWay('columnChooser.mode');
    this.dragModeOpened = (0, _signalsCore.computed)(() => this.popupVisible.value && this.mode.value === 'dragAndDrop');
    this.toolbarController.addDefaultItem((0, _signalsCore.signal)({
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
          class: (0, _utils.addWidgetPrefix)(_column_chooser.CLASS.toolbarBtn)
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
    return (0, _signalsCore.computed)(() => ({
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
        showCloseButton: this.isMaterialOrGeneric(),
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
  isMaterialOrGeneric() {
    return (0, _themes.isMaterial)((0, _themes.current)()) || (0, _themes.isGeneric)((0, _themes.current)());
  }
}
exports.ColumnChooserView = ColumnChooserView;
ColumnChooserView.dependencies = [_controller.ToolbarController, _controller2.ColumnChooserController, _index.ColumnsController, _options_controller.OptionsController];