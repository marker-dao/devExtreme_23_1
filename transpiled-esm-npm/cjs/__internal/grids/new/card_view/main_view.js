"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainView = void 0;
var _inferno = require("inferno");
var _signalsCore = require("@preact/signals-core");
var _index = require("../../../grids/new/grid_core/column_chooser/index");
var _view = require("../../../grids/new/grid_core/core/view");
var _view2 = require("../../../grids/new/grid_core/filtering/filter_panel/view");
var _index2 = require("../../../grids/new/grid_core/filtering/header_filter/index");
var _index3 = require("../../../grids/new/grid_core/keyboard_navigation/index");
var _view3 = require("../../../grids/new/grid_core/pager/view");
var _view4 = require("../../../grids/new/grid_core/toolbar/view");
var _index4 = require("../grid_core/accessibility/index");
var _config_context = require("../grid_core/core/config_context");
var _view5 = require("../grid_core/editing/popup/view");
var _root_element_updater = require("../grid_core/inferno_wrappers/root_element_updater");
var _view6 = require("./content_view/view");
var _view7 = require("./context_menu/view");
var _view8 = require("./header_panel/view");
var _options_controller = require("./options_controller");
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const CLASSES = {
  cardView: 'dx-cardview'
};
function MainViewComponent(_ref) {
  let {
    Toolbar,
    Content,
    Pager,
    HeaderPanel,
    HeaderFilterPopup,
    FilterPanel,
    ColumnChooser,
    ContextMenu,
    EditPopup,
    config,
    rootElementRef,
    accessibilityDescription,
    accessibilityStatus,
    onKeyDown
  } = _ref;
  return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _config_context.ConfigContext.Provider, {
    "value": config,
    children: (0, _inferno.createComponentVNode)(2, _root_element_updater.RootElementUpdater, {
      "rootElementRef": rootElementRef,
      "className": CLASSES.cardView,
      children: (0, _inferno.createVNode)(1, "div", "dx-cardview-root-container", [(0, _inferno.createComponentVNode)(2, _index4.A11yStatusContainer, {
        "statusText": accessibilityStatus
      }), (0, _inferno.createVNode)(1, "div", "dx-cardview-header-container", [(0, _inferno.createComponentVNode)(2, Toolbar), (0, _inferno.createComponentVNode)(2, HeaderPanel)], 4), (0, _inferno.createComponentVNode)(2, Content), (0, _inferno.createComponentVNode)(2, FilterPanel), (0, _inferno.createVNode)(1, "div", null, (0, _inferno.createComponentVNode)(2, Pager), 0), (0, _inferno.createComponentVNode)(2, HeaderFilterPopup), (0, _inferno.createComponentVNode)(2, EditPopup), (0, _inferno.createComponentVNode)(2, ColumnChooser), (0, _inferno.createComponentVNode)(2, ContextMenu)], 4, {
        "role": 'group',
        "aria-label": accessibilityDescription,
        "onKeyDown": onKeyDown
      })
    })
  })], 4);
}
class MainView extends _view.View {
  constructor(content, pager, toolbar, headerPanel, headerFilterPopup, filterPanel, columnsChooser, editPopup, contextMenu, options, keyboardNavigation, accessibility) {
    super();
    this.content = content;
    this.pager = pager;
    this.toolbar = toolbar;
    this.headerPanel = headerPanel;
    this.headerFilterPopup = headerFilterPopup;
    this.filterPanel = filterPanel;
    this.columnsChooser = columnsChooser;
    this.editPopup = editPopup;
    this.contextMenu = contextMenu;
    this.options = options;
    this.keyboardNavigation = keyboardNavigation;
    this.accessibility = accessibility;
    this.component = MainViewComponent;
    this.config = (0, _signalsCore.computed)(() => ({
      rtlEnabled: this.options.oneWay('rtlEnabled').value,
      disabled: this.options.oneWay('disabled').value,
      templatesRenderAsynchronously: this.options.oneWay('templatesRenderAsynchronously').value
    }));
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  getProps() {
    return (0, _signalsCore.computed)(() => ({
      Toolbar: this.toolbar.asInferno(),
      Content: this.content.asInferno(),
      Pager: this.pager.asInferno(),
      HeaderPanel: this.headerPanel.asInferno(),
      HeaderFilterPopup: this.headerFilterPopup.asInferno(),
      FilterPanel: this.filterPanel.asInferno(),
      ColumnChooser: this.columnsChooser.asInferno(),
      EditPopup: this.editPopup.asInferno(),
      ContextMenu: this.contextMenu.asInferno(),
      config: this.config.value,
      rootElementRef: {
        current: this.root
      },
      onKeyDown: event => {
        this.keyboardNavigation.onKeyDown(event);
      },
      accessibilityDescription: this.accessibility.componentDescription.value,
      accessibilityStatus: this.accessibility.componentStatus.value
    }));
  }
}
exports.MainView = MainView;
MainView.dependencies = [_view6.ContentView, _view3.PagerView, _view4.ToolbarView, _view8.HeaderPanelView, _index2.HeaderFilterPopupView, _view2.FilterPanelView, _index.ColumnChooserView, _view5.EditPopupView, _view7.ContextMenuView, _options_controller.OptionsController, _index3.KeyboardNavigationController, _index4.AccessibilityController];