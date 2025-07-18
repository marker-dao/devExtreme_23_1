/**
* DevExtreme (cjs/__internal/core/utils/m_array_compare.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKeysEqual = exports.findChanges = void 0;
var _type = require("../../../core/utils/type");
const getKeyWrapper = function (item, getKey) {
  const key = getKey(item);
  if ((0, _type.isObject)(key)) {
    try {
      return JSON.stringify(key);
    } catch (e) {
      return key;
    }
  }
  return key;
};
const getSameNewByOld = function (oldItem, newItems, newIndexByKey, getKey) {
  const key = getKeyWrapper(oldItem, getKey);
  return newItems[newIndexByKey[key]];
};
const isKeysEqual = function (oldKeys, newKeys) {
  if (oldKeys.length !== newKeys.length) {
    return false;
  }
  for (let i = 0; i < newKeys.length; i++) {
    if (oldKeys[i] !== newKeys[i]) {
      return false;
    }
  }
  return true;
};
exports.isKeysEqual = isKeysEqual;
const findChanges = function (_ref) {
  let {
    oldItems,
    newItems,
    getKey,
    isItemEquals,
    detectReorders = false
  } = _ref;
  const oldIndexByKey = {};
  const newIndexByKey = {};
  let addedCount = 0;
  let removeCount = 0;
  const result = [];
  oldItems.forEach(function (item, index) {
    const key = getKeyWrapper(item, getKey);
    oldIndexByKey[key] = index;
  });
  newItems.forEach(function (item, index) {
    const key = getKeyWrapper(item, getKey);
    newIndexByKey[key] = index;
  });
  const itemCount = Math.max(oldItems.length, newItems.length);
  for (let index = 0; index < itemCount + addedCount; index++) {
    const newItem = newItems[index];
    const oldNextIndex = index - addedCount + removeCount;
    const nextOldItem = oldItems[oldNextIndex];
    const isRemoved = !newItem || nextOldItem && !getSameNewByOld(nextOldItem, newItems, newIndexByKey, getKey);
    if (isRemoved) {
      if (nextOldItem) {
        result.push({
          type: 'remove',
          key: getKey(nextOldItem),
          index,
          oldItem: nextOldItem
        });
        removeCount++;
        index--;
      }
    } else {
      const key = getKeyWrapper(newItem, getKey);
      const oldIndex = oldIndexByKey[key];
      const oldItem = oldItems[oldIndex];
      if (!oldItem) {
        addedCount++;
        result.push({
          type: 'insert',
          data: newItem,
          index
        });
      } else if (oldIndex === oldNextIndex) {
        if (!isItemEquals(oldItem, newItem)) {
          result.push({
            type: 'update',
            data: newItem,
            key: getKey(newItem),
            index,
            oldItem
          });
        }
      } else {
        if (!detectReorders) {
          return;
        }
        result.push({
          type: 'remove',
          key: getKey(oldItem),
          index: oldIndex,
          oldItem
        });
        result.push({
          type: 'insert',
          data: newItem,
          index
        });
        addedCount++;
        removeCount++;
      }
    }
  }
  if (detectReorders) {
    const removes = result.filter(r => r.type === 'remove').sort((a, b) => b.index - a.index);
    const inserts = result.filter(i => i.type === 'insert').sort((a, b) => a.index - b.index);
    const updates = result.filter(u => u.type === 'update');
    return [...removes, ...inserts, ...updates];
  }
  return result;
};
exports.findChanges = findChanges;
