import _extends from "@babel/runtime/helpers/esm/extends";
import { isFluent } from '../../../ui/themes';
import { formatViews, getViewName, isOneView } from './m_utils';
const ClASS = {
  container: 'dx-scheduler-view-switcher',
  dropDownButton: 'dx-scheduler-view-switcher-dropdown-button',
  dropDownButtonContent: 'dx-scheduler-view-switcher-dropdown-button-content'
};
const getViewsAndSelectedView = header => {
  const views = formatViews(header.views);
  let selectedView = getViewName(header.currentView);
  const isSelectedViewInViews = views.some(view => view.name === selectedView);
  selectedView = isSelectedViewInViews ? selectedView : undefined;
  return {
    selectedView,
    views
  };
};
export const getTabViewSwitcher = (header, item) => {
  const {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  // @ts-expect-error
  const stylingMode = isFluent() ? 'outlined' : 'contained';
  return _extends({
    widget: 'dxButtonGroup',
    locateInMenu: 'auto',
    location: 'after',
    name: 'viewSwitcher',
    cssClass: ClASS.container,
    options: {
      items: views,
      keyExpr: 'name',
      selectedItemKeys: [selectedView],
      stylingMode,
      onItemClick: e => {
        const {
          view
        } = e.itemData;
        header._updateCurrentView(view);
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
  const oneView = isOneView(views, selectedView);
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
      displayExpr: 'text',
      showArrowIcon: !oneView,
      elementAttr: {
        class: ClASS.dropDownButton
      },
      onItemClick: e => {
        const {
          view
        } = e.itemData;
        header._updateCurrentView(view);
      },
      onContentReady: e => {
        const viewSwitcher = e.component;
        header._addEvent('currentView', view => {
          const currentViews = formatViews(header.views);
          viewSwitcher.option('showArrowIcon', !isOneView(currentViews, view));
          viewSwitcher.option('selectedItemKey', getViewName(view));
        });
      },
      dropDownOptions: {
        onShowing: e => {
          if (oneView) {
            e.cancel = true;
          }
        },
        width: 'max-content',
        _wrapperClassExternal: ClASS.dropDownButtonContent
      }
    }
  }, item);
};