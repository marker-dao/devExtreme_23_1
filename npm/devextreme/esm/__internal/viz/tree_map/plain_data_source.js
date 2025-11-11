/**
* DevExtreme (esm/__internal/viz/tree_map/plain_data_source.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import TreeMapBase from '../../viz/tree_map/tree_map.base';
const proto = TreeMapBase.prototype;
proto._optionChangesMap.idField = proto._optionChangesMap.parentField = 'NODES_CREATE';
proto._processDataSourceItems = function (items) {
  let i;
  const struct = {};
  let currentItem;
  const idField = this._getOption('idField', true);
  const parentField = this._getOption('parentField', true);
  let parentId;
  const rootNodes = [];
  let tmpItems;
  let item;
  if (!idField || !parentField || items.length === 0) {
    return {
      items,
      isPlain: false
    };
  }
  for (i = 0; i < items.length; i++) {
    currentItem = items[i];
    parentId = currentItem[parentField];
    if (parentId) {
      struct[parentId] = struct[parentId] || {
        items: []
      };
      tmpItems = struct[parentId].items;
    } else {
      tmpItems = rootNodes;
    }
    tmpItems.push(currentItem);
  }
  treeFiller({
    struct,
    idField
  }, rootNodes);
  for (item in struct) {
    // @ts-expect-error
    struct[item] && rootNodes.push(struct[item]);
  }
  return {
    items: rootNodes,
    isPlain: true
  };
};
function treeFiller(context, items) {
  let currentItem;
  let i;
  const {
    struct
  } = context;
  let id;
  for (i = 0; i < items.length; i++) {
    currentItem = items[i];
    id = currentItem[context.idField];
    if (struct[id]) {
      currentItem.items = struct[id].items;
      struct[id] = null;
      treeFiller(context, currentItem.items);
    }
  }
}
