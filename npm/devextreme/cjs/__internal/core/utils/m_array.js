/**
* DevExtreme (cjs/__internal/core/utils/m_array.js)
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
exports.wrapToArray = exports.removeDuplicates = exports.normalizeIndexes = exports.groupBy = exports.getUniqueValues = exports.getIntersection = void 0;
var _config = _interopRequireDefault(require("../../../core/config"));
var _object = require("../../../core/utils/object");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createOccurrenceMap(array) {
  return array.reduce((map, value) => {
    const count = (map.get(value) ?? 0) + 1;
    map.set(value, count);
    return map;
  }, new Map());
}
const wrapToArray = function (item) {
  return Array.isArray(item) ? item : [item];
};
exports.wrapToArray = wrapToArray;
const getUniqueValues = function (values) {
  return [...new Set(values)];
};
exports.getUniqueValues = getUniqueValues;
const getIntersection = function (firstArray, secondArray) {
  const toRemoveMap = createOccurrenceMap(secondArray);
  return firstArray.filter(value => {
    const occurrencesCount = toRemoveMap.get(value);
    occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
    return occurrencesCount;
  });
};
exports.getIntersection = getIntersection;
const removeDuplicates = function () {
  let from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let toRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const toRemoveMap = createOccurrenceMap(toRemove);
  return from.filter(value => {
    const occurrencesCount = toRemoveMap.get(value);
    occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
    return !occurrencesCount;
  });
};
exports.removeDuplicates = removeDuplicates;
const normalizeIndexes = function (items, indexPropName, currentItem, needIndexCallback) {
  const indexedItems = {};
  const {
    useLegacyVisibleIndex
  } = (0, _config.default)();
  let currentIndex = 0;
  const shouldUpdateIndex = item => !(0, _type.isDefined)(item[indexPropName]) && (!needIndexCallback || needIndexCallback(item));
  items.forEach(item => {
    const index = item[indexPropName];
    if (index >= 0) {
      indexedItems[index] = indexedItems[index] || [];
      if (item === currentItem) {
        indexedItems[index].unshift(item);
      } else {
        indexedItems[index].push(item);
      }
    } else {
      item[indexPropName] = undefined;
    }
  });
  if (!useLegacyVisibleIndex) {
    items.forEach(item => {
      if (shouldUpdateIndex(item)) {
        while (indexedItems[currentIndex]) {
          currentIndex++;
        }
        indexedItems[currentIndex] = [item];
        currentIndex++;
      }
    });
  }
  currentIndex = 0;
  (0, _object.orderEach)(indexedItems, function (index, items) {
    items.forEach(item => {
      if (index >= 0) {
        item[indexPropName] = currentIndex++;
      }
    });
  });
  if (useLegacyVisibleIndex) {
    items.forEach(item => {
      if (shouldUpdateIndex(item)) {
        item[indexPropName] = currentIndex++;
      }
    });
  }
};
exports.normalizeIndexes = normalizeIndexes;
const groupBy = (array, getGroupName) => array.reduce((groupedResult, item) => {
  const groupName = getGroupName(item);
  groupedResult[groupName] = groupedResult[groupName] ?? [];
  groupedResult[groupName].push(item);
  return groupedResult;
}, {});
exports.groupBy = groupBy;
