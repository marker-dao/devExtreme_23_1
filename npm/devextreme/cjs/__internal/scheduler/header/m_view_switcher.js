/**
* DevExtreme (cjs/__internal/scheduler/header/m_view_switcher.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabViewSwitcher = exports.getDropDownViewSwitcher = void 0;
var _themes = require("../../../ui/themes");
var _m_utils = require("./m_utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ClASS = {
  container: 'dx-scheduler-view-switcher',
  dropDownButton: 'dx-scheduler-view-switcher-dropdown-button',
  dropDownButtonContent: 'dx-scheduler-view-switcher-dropdown-button-content'
};
const getViewsAndSelectedView = header => {
  const views = header.option('views');
  const selectedView = header.option('currentView').name;
  const isSelectedViewInViews = views.some(view => view.name === selectedView);
  return {
    selectedView: isSelectedViewInViews ? selectedView : undefined,
    views
  };
};
const getTabViewSwitcher = (header, item) => {
  const {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  // @ts-expect-error
  const stylingMode = (0, _themes.isFluent)() ? 'outlined' : 'contained';
  const items = views.map(view => _extends({}, view, {
    text: view.name
  }));
  return _extends({
    widget: 'dxButtonGroup',
    locateInMenu: 'auto',
    location: 'after',
    name: 'viewSwitcher',
    cssClass: ClASS.container,
    options: {
      items,
      keyExpr: 'name',
      selectedItemKeys: [selectedView],
      stylingMode,
      onItemClick: e => {
        header._updateCurrentView(e.itemData);
      },
      onContentReady: e => {
        const viewSwitcher = e.component;
        header._addEvent('currentView', view => {
          viewSwitcher.option('selectedItemKeys', [(0, _m_utils.getViewName)(view)]);
        });
      }
    }
  }, item);
};
exports.getTabViewSwitcher = getTabViewSwitcher;
const getDropDownViewSwitcher = (header, item) => {
  const {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  const isOnlyOneView = (0, _m_utils.isOneView)(views, selectedView);
  return _extends({
    widget: 'dxDropDownButton',
    locateInMenu: 'never',
    location: 'after',
    name: 'viewSwitcher',
    cssClass: ClASS.container,
    options: {
      items: views,
      useSelectMode: true,
      keyExpr: 'name',
      selectedItemKey: selectedView,
      displayExpr: 'name',
      showArrowIcon: !isOnlyOneView,
      elementAttr: {
        class: ClASS.dropDownButton
      },
      onItemClick: e => {
        header._updateCurrentView(e.itemData);
      },
      onContentReady: e => {
        const viewSwitcher = e.component;
        header._addEvent('currentView', view => {
          const currentViews = header.option('views');
          viewSwitcher.option('showArrowIcon', !(0, _m_utils.isOneView)(currentViews, view.name));
          viewSwitcher.option('selectedItemKey', (0, _m_utils.getViewName)(view));
        });
      },
      dropDownOptions: {
        onShowing: e => {
          if (isOnlyOneView) {
            e.cancel = true;
          }
        },
        width: 'max-content',
        _wrapperClassExternal: ClASS.dropDownButtonContent
      }
    }
  }, item);
};
exports.getDropDownViewSwitcher = getDropDownViewSwitcher;
