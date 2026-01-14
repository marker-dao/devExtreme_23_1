/**
* DevExtreme (cjs/__internal/scheduler/appointment_popup/m_customize_form_items.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customizeFormItems = void 0;
var _extend = require("../../../core/utils/extend");
const isGroupItem = item => 'items' in item;
const createFormItemFromConfig = configItem => typeof configItem === 'string' ? {
  itemType: 'simple',
  editorType: 'dxTextBox',
  name: configItem,
  dataField: configItem
} : configItem;
const buildFormItemsMap = function (items) {
  let map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
  return items.reduce((accumulator, item) => {
    if (item.name) {
      accumulator.set(item.name, Object.assign({}, item));
    }
    return buildFormItemsMap(isGroupItem(item) ? item.items ?? [] : [], accumulator);
  }, map);
};
const removeItemFromGroups = (itemName, itemsMap) => {
  Array.from(itemsMap.values()).forEach(group => {
    if (isGroupItem(group) && group.items) {
      group.items = group.items.filter(item => item.name !== itemName);
    }
  });
};
const getItemName = customItem => typeof customItem === 'string' ? customItem : customItem.name;
const shouldMergeWithExisting = customItems => typeof customItems === 'object';
const hasChildItems = customItems => typeof customItems === 'object' && isGroupItem(customItems) && Boolean(customItems.items);
const customizeFormItems = (items, userConfig) => {
  if (!userConfig) {
    return items;
  }
  const defaultItemsMap = buildFormItemsMap(items);
  const resolveItem = customItems => {
    const itemName = getItemName(customItems);
    const defaultItem = itemName ? defaultItemsMap.get(itemName) : undefined;
    if (defaultItem && itemName) {
      removeItemFromGroups(itemName, defaultItemsMap);
      return shouldMergeWithExisting(customItems) ? (0, _extend.extend)(true, {}, defaultItem, customItems) : defaultItem;
    }
    return createFormItemFromConfig(customItems);
  };
  const customize = userItems => userItems.map(customItems => {
    const formItem = resolveItem(customItems);
    if (isGroupItem(formItem) && hasChildItems(customItems) && customItems.items) {
      return Object.assign({}, formItem, {
        items: customize(customItems.items)
      });
    }
    return formItem;
  });
  return customize(userConfig);
};
exports.customizeFormItems = customizeFormItems;
