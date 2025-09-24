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
  const views = (0, _m_utils.formatViews)(header.option('views'));
  const selectedView = header.option('currentView').name;
  const isSelectedViewInViews = views.some(view => view.name === selectedView);
  return {
    selectedView: isSelectedViewInViews ? selectedView : undefined,
    views
  };
};
const isViewSwitcherVisible = views => views.length > 1;
const getTabViewSwitcher = (header, item) => {
  const {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  const isVisible = isViewSwitcherVisible(views);
  // @ts-expect-error
  const stylingMode = (0, _themes.isFluent)() ? 'outlined' : 'contained';
  return _extends({
    widget: 'dxButtonGroup',
    locateInMenu: 'auto',
    location: 'after',
    name: 'viewSwitcher',
    cssClass: ClASS.container,
    visible: isVisible,
    options: {
      items: views,
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
  const isVisible = isViewSwitcherVisible(views);
  return _extends({
    widget: 'dxDropDownButton',
    locateInMenu: 'never',
    location: 'after',
    name: 'viewSwitcher',
    cssClass: ClASS.container,
    visible: isVisible,
    options: {
      items: views,
      useSelectMode: true,
      keyExpr: 'name',
      selectedItemKey: selectedView,
      displayExpr: 'text',
      showArrowIcon: true,
      elementAttr: {
        class: ClASS.dropDownButton
      },
      onItemClick: e => {
        header._updateCurrentView(e.itemData);
      },
      onContentReady: e => {
        const viewSwitcher = e.component;
        header._addEvent('currentView', view => {
          viewSwitcher.option('selectedItemKey', (0, _m_utils.getViewName)(view));
        });
      },
      dropDownOptions: {
        width: 'max-content',
        _wrapperClassExternal: ClASS.dropDownButtonContent
      }
    }
  }, item);
};
exports.getDropDownViewSwitcher = getDropDownViewSwitcher;