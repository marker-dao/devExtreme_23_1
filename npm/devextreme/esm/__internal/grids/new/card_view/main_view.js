/**
* DevExtreme (esm/__internal/grids/new/card_view/main_view.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createFragment, createComponentVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed } from '../../../core/state_manager/index';
import { ColumnChooserView } from '../../../grids/new/grid_core/column_chooser/index';
import { View } from '../../../grids/new/grid_core/core/view';
import { FilterPanelView } from '../../../grids/new/grid_core/filtering/filter_panel/view';
import { HeaderFilterPopupView } from '../../../grids/new/grid_core/filtering/header_filter/index';
import { KeyboardNavigationController } from '../../../grids/new/grid_core/keyboard_navigation/index';
import { PagerView } from '../../../grids/new/grid_core/pager/view';
import { ToolbarView } from '../../../grids/new/grid_core/toolbar/view';
import { A11yStatusContainer, AccessibilityController } from '../grid_core/accessibility/index';
import { CommonPropsContext } from '../grid_core/core/common_props_context';
import { ConfigContext } from '../grid_core/core/config_context';
import { EditPopupView } from '../grid_core/editing/popup/view';
import { RootElementUpdater } from '../grid_core/inferno_wrappers/root_element_updater';
import { ContentView } from './content_view/view';
import { ContextMenuView } from './context_menu/view';
import { HeaderPanelView } from './header_panel/view';
import { OptionsController } from './options_controller';
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
    commonProps,
    accessibilityDescription,
    accessibilityStatus,
    onKeyDown
  } = _ref;
  return createFragment([createComponentVNode(2, ConfigContext.Provider, {
    "value": config,
    children: createComponentVNode(2, CommonPropsContext.Provider, {
      "value": commonProps,
      children: createComponentVNode(2, RootElementUpdater, {
        "rootElementRef": commonProps.rootElementRef,
        "className": CLASSES.cardView,
        children: createVNode(1, "div", "dx-cardview-root-container", [createComponentVNode(2, A11yStatusContainer, {
          "statusText": accessibilityStatus
        }), createVNode(1, "div", "dx-cardview-header-container", [createComponentVNode(2, Toolbar), createComponentVNode(2, HeaderPanel)], 4), createComponentVNode(2, Content), createComponentVNode(2, FilterPanel), createVNode(1, "div", null, createComponentVNode(2, Pager), 0), createComponentVNode(2, HeaderFilterPopup), createComponentVNode(2, EditPopup), createComponentVNode(2, ColumnChooser), createComponentVNode(2, ContextMenu)], 4, {
          "role": 'group',
          "aria-label": accessibilityDescription,
          "onKeyDown": onKeyDown
        })
      })
    })
  })], 4);
}
export class MainView extends View {
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
    this.config = computed(() => ({
      rtlEnabled: this.options.oneWay('rtlEnabled').value,
      disabled: this.options.oneWay('disabled').value,
      templatesRenderAsynchronously: this.options.oneWay('templatesRenderAsynchronously').value
    }));
    this.commonProps = {
      rootElementRef: {
        current: this.root
      }
    };
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  getProps() {
    this.commonProps.rootElementRef.current = this.root;
    return computed(() => ({
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
      commonProps: this.commonProps,
      onKeyDown: event => {
        this.keyboardNavigation.onKeyDown(event);
      },
      accessibilityDescription: this.accessibility.componentDescription.value,
      accessibilityStatus: this.accessibility.componentStatus.value
    }));
  }
}
MainView.dependencies = [ContentView, PagerView, ToolbarView, HeaderPanelView, HeaderFilterPopupView, FilterPanelView, ColumnChooserView, EditPopupView, ContextMenuView, OptionsController, KeyboardNavigationController, AccessibilityController];
