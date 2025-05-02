"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentView = void 0;
var _signalsCore = require("@preact/signals-core");
var _index = require("../../../../grids/new/card_view/context_menu/index");
var _columns_controller = require("../../../../grids/new/grid_core/columns_controller/columns_controller");
var _view = require("../../../../grids/new/grid_core/core/view");
var _index2 = require("../../../../grids/new/grid_core/data_controller/index");
var _error_controller = require("../../../../grids/new/grid_core/error_controller/error_controller");
var _index3 = require("../../../../grids/new/grid_core/keyboard_navigation/index");
var _index4 = require("../../../../grids/new/grid_core/search/index");
var _controller = require("../../../../grids/new/grid_core/selection/controller");
var _inferno = require("inferno");
var _controller2 = require("../editing/controller");
var _items_controller = require("../items_controller/items_controller");
var _options_controller = require("../options_controller/options_controller");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class ContentView extends _view.View {
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
    this.isNoData = (0, _signalsCore.computed)(() => !this.dataController.isLoading.value && this.dataController.items.value.length === 0);
    this.scrollableRef = (0, _inferno.createRef)();
    this.loadingText = this.options.twoWay('loadPanel.message');
    this.viewportHeight = (0, _signalsCore.signal)(0);
    this.scrollTop = (0, _signalsCore.signal)(0);
    this.width = (0, _signalsCore.signal)(0);
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
exports.ContentView = ContentView;
ContentView.dependencies = [_index2.DataController, _options_controller.OptionsController, _error_controller.ErrorController, _columns_controller.ColumnsController, _controller.SelectionController, _items_controller.ItemsController, _controller2.EditingController, _index.ContextMenuController, _index4.SearchUIController, _index3.KeyboardNavigationController];