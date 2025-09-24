/**
* DevExtreme (esm/__internal/scheduler/header/m_view_switcher.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isFluent } from '../../../ui/themes';
import { formatViews, getViewName } from './m_utils';
const ClASS = {
  container: 'dx-scheduler-view-switcher',
  dropDownButton: 'dx-scheduler-view-switcher-dropdown-button',
  dropDownButtonContent: 'dx-scheduler-view-switcher-dropdown-button-content'
};
const getViewsAndSelectedView = header => {
  const views = formatViews(header.option('views'));
  const selectedView = header.option('currentView').name;
  const isSelectedViewInViews = views.some(view => view.name === selectedView);
  return {
    selectedView: isSelectedViewInViews ? selectedView : undefined,
    views
  };
};
const isViewSwitcherVisible = views => views.length > 1;
export const getTabViewSwitcher = (header, item) => {
  const {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  const isVisible = isViewSwitcherVisible(views);
  // @ts-expect-error
  const stylingMode = isFluent() ? 'outlined' : 'contained';
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
          viewSwitcher.option('selectedItemKeys', [getViewName(view)]);
        });
      }
    }
  }, item);
};
export const getDropDownViewSwitcher = (header, item) => {
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
          viewSwitcher.option('selectedItemKey', getViewName(view));
        });
      },
      dropDownOptions: {
        width: 'max-content',
        _wrapperClassExternal: ClASS.dropDownButtonContent
      }
    }
  }, item);
};
