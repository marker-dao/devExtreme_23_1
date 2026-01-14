"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentView = void 0;
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _index = require("../../../../core/state_manager/index");
var _columns_controller = require("../../../../grids/new/grid_core/columns_controller/columns_controller");
var _controller = require("../../../../grids/new/grid_core/context_menu/controller");
var _view = require("../../../../grids/new/grid_core/core/view");
var _index2 = require("../../../../grids/new/grid_core/data_controller/index");
var _error_controller = require("../../../../grids/new/grid_core/error_controller/error_controller");
var _index3 = require("../../../../grids/new/grid_core/keyboard_navigation/index");
var _index4 = require("../../../../grids/new/grid_core/search/index");
var _controller2 = require("../../../../grids/new/grid_core/selection/controller");
var _inferno = require("inferno");
var _controller3 = require("../editing/controller");
var _items_controller = require("../items_controller/items_controller");
var _controller4 = require("../lifecycle/controller");
var _options_controller = require("../options_controller/options_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable
  @typescript-eslint/explicit-function-return-type,
  @typescript-eslint/explicit-module-boundary-types
*/

class ContentView extends _view.View {
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
    this.isNoData = (0, _index.computed)(() => {
      const {
        isLoading,
        items
      } = this.dataController;
      const isEmptyDataLoaded = !isLoading.value && items.value.length === 0;
      const isNoVisibleColumns = this.columnsController.visibleColumns.value.length === 0;
      return isEmptyDataLoaded || isNoVisibleColumns;
    });
    this.scrollableRef = (0, _inferno.createRef)();
    this.loadingText = this.options.twoWay('loadPanel.message');
    this.viewportHeight = (0, _index.signal)(0);
    this.scrollTop = (0, _index.signal)(0);
    this.width = (0, _index.signal)(0);
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
      loadPanelProps: Object.assign({}, loadPanelConfig.value, {
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
            (0, _renderer.default)(component.container()).attr('tabindex', -1);
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
            (0, _renderer.default)(component.container()).attr('tabindex', -1);
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
exports.ContentView = ContentView;
ContentView.dependencies = [_index2.DataController, _options_controller.OptionsController, _error_controller.ErrorController, _columns_controller.ColumnsController, _controller2.SelectionController, _items_controller.ItemsController, _controller3.EditingController, _controller.BaseContextMenuController, _index4.SearchUIController, _index3.KeyboardNavigationController, _controller4.LifeCycleController];