import _extends from "@babel/runtime/helpers/esm/extends";
import { extend } from '../../../core/utils/extend';
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
      accumulator.set(item.name, _extends({}, item));
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
      return shouldMergeWithExisting(customItems) ? extend(true, {}, defaultItem, customItems) : defaultItem;
    }
    return createFormItemFromConfig(customItems);
  };
  const customize = userItems => userItems.map(customItems => {
    const formItem = resolveItem(customItems);
    if (isGroupItem(formItem) && hasChildItems(customItems) && customItems.items) {
      return _extends({}, formItem, {
        items: customize(customItems.items)
      });
    }
    return formItem;
  });
  return customize(userConfig);
};
export { customizeFormItems };