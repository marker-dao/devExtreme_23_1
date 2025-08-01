/**
* DevExtreme (esm/__internal/grids/new/grid_core/toolbar/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { extend } from '../../../../../core/utils/extend';
import { isDefined, isString } from '../../../../../core/utils/type';
import { DEFAULT_TOOLBAR_ITEMS } from './const';
export function isVisible(visibleConfig, items) {
  if (visibleConfig === undefined) {
    return items.length > 0;
  }
  return visibleConfig;
}
function normalizeToolbarItem(item, defaultButtonsMap, defaultItemNames) {
  let button = item;
  const defaultProps = {
    location: 'after'
  };
  if (isString(button)) {
    button = {
      name: button
    };
  }
  if (isDefined(button.name)) {
    if (isDefined(defaultButtonsMap[button.name])) {
      button = extend(true, {}, defaultButtonsMap[button.name], button);
    } else if (defaultItemNames.includes(button.name)) {
      button = _extends({}, button, {
        visible: false
      });
    }
  }
  return extend(true, {}, defaultProps, button);
}
export function getSortedToolbarItems(defaultItemsCollection) {
  return Object.values(defaultItemsCollection).sort((a, b) => {
    const aIndex = DEFAULT_TOOLBAR_ITEMS.indexOf(a.name);
    const bIndex = DEFAULT_TOOLBAR_ITEMS.indexOf(b.name);
    return aIndex - bIndex;
  });
}
export function normalizeToolbarItems(sortedDefaultItems, userItems, defaultItemNames) {
  if (!isDefined(userItems)) {
    return sortedDefaultItems;
  }
  const defaultButtonsMap = {};
  sortedDefaultItems.forEach(button => {
    defaultButtonsMap[button.name] = button;
  });
  return userItems.map(item => normalizeToolbarItem(item, defaultButtonsMap, defaultItemNames));
}
