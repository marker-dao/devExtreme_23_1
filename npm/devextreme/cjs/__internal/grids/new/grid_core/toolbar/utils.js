/**
* DevExtreme (cjs/__internal/grids/new/grid_core/toolbar/utils.js)
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
exports.getSortedToolbarItems = getSortedToolbarItems;
exports.isVisible = isVisible;
exports.normalizeToolbarItems = normalizeToolbarItems;
var _extend = require("../../../../../core/utils/extend");
var _type = require("../../../../../core/utils/type");
var _const = require("./const");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function isVisible(visibleConfig, items) {
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
  if ((0, _type.isString)(button)) {
    button = {
      name: button
    };
  }
  if ((0, _type.isDefined)(button.name)) {
    if ((0, _type.isDefined)(defaultButtonsMap[button.name])) {
      button = (0, _extend.extend)(true, {}, defaultButtonsMap[button.name], button);
    } else if (defaultItemNames.includes(button.name)) {
      button = _extends({}, button, {
        visible: false
      });
    }
  }
  return (0, _extend.extend)(true, {}, defaultProps, button);
}
function getSortedToolbarItems(defaultItemsCollection) {
  return Object.values(defaultItemsCollection).sort((a, b) => {
    const aIndex = _const.DEFAULT_TOOLBAR_ITEMS.indexOf(a.name);
    const bIndex = _const.DEFAULT_TOOLBAR_ITEMS.indexOf(b.name);
    return aIndex - bIndex;
  });
}
function normalizeToolbarItems(sortedDefaultItems, userItems, defaultItemNames) {
  if (!(0, _type.isDefined)(userItems)) {
    return sortedDefaultItems;
  }
  const defaultButtonsMap = {};
  sortedDefaultItems.forEach(button => {
    defaultButtonsMap[button.name] = button;
  });
  return userItems.map(item => normalizeToolbarItem(item, defaultButtonsMap, defaultItemNames));
}
