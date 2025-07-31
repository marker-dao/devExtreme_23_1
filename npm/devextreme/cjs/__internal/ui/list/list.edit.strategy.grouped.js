/**
* DevExtreme (cjs/__internal/ui/list/list.edit.strategy.grouped.js)
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
exports.default = void 0;
var _query = _interopRequireDefault(require("../../../common/data/query"));
var _store_helper = _interopRequireDefault(require("../../../common/data/store_helper"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _collection_widgetEditStrategy = _interopRequireDefault(require("../../ui/collection/collection_widget.edit.strategy.plain"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LIST_ITEM_CLASS = 'dx-list-item';
const LIST_GROUP_CLASS = 'dx-list-group';
const SELECTION_SHIFT = 20;
// eslint-disable-next-line no-bitwise
const SELECTION_MASK = (1 << SELECTION_SHIFT) - 1;
const combineIndex = indices => (indices.group << SELECTION_SHIFT) + indices.item;
const splitIndex = combinedIndex => ({
  // eslint-disable-next-line no-bitwise
  group: combinedIndex >> SELECTION_SHIFT,
  // eslint-disable-next-line no-bitwise
  item: combinedIndex & SELECTION_MASK
});
class GroupedEditStrategy extends _collection_widgetEditStrategy.default {
  _groupElements() {
    return this._collectionWidget._itemContainer().find(`.${LIST_GROUP_CLASS}`);
  }
  _groupItemElements($group) {
    return $group.find(`.${LIST_ITEM_CLASS}`);
  }
  getIndexByItemData(itemData) {
    var _itemData$items;
    const groups = this._getItems();
    let index = false;
    // @ts-expect-error ts-error
    if (!itemData) return false;
    // @ts-expect-error ts-error
    if ((_itemData$items = itemData.items) !== null && _itemData$items !== void 0 && _itemData$items.length) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      itemData = itemData.items[0];
    }
    // @ts-expect-error ts-error
    // eslint-disable-next-line consistent-return
    (0, _iterator.each)(groups, (groupIndex, group) => {
      if (!group.items) return false;
      (0, _iterator.each)(group.items, (itemIndex, item) => {
        if (item !== itemData) {
          return true;
        }
        // @ts-expect-error ts-error
        index = {
          group: groupIndex,
          item: itemIndex
        };
        return false;
      });
      if (index) {
        return false;
      }
    });
    // @ts-expect-error ts-error
    return index;
  }
  getItemDataByIndex(index) {
    var _items$index$group;
    const items = this._getItems();
    if ((0, _type.isNumeric)(index)) {
      return this.itemsGetter()[index];
    }
    // @ts-expect-error ts-error
    return index && ((_items$index$group = items[index.group]) === null || _items$index$group === void 0 ? void 0 : _items$index$group.items[index.item]) || null;
  }
  itemsGetter() {
    let resultItems = [];
    const items = this._getItems();
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < items.length; i += 1) {
      var _items$i;
      if ((_items$i = items[i]) !== null && _items$i !== void 0 && _items$i.items) {
        resultItems = resultItems.concat(items[i].items);
      } else {
        resultItems.push(items[i]);
      }
    }
    return resultItems;
  }
  deleteItemAtIndex(index) {
    const indices = splitIndex(index);
    const itemGroup = this._collectionWidget.option('items')[indices.group].items;
    itemGroup.splice(indices.item, 1);
  }
  getKeysByItems(items) {
    const plainItems = items.reduce((counter, item) => {
      if (item !== null && item !== void 0 && item.items) {
        return counter.concat(item.items);
      }
      counter.push(item);
      return counter;
    }, []);
    return plainItems.map(
    // @ts-expect-error ts-error
    plainItem => this._collectionWidget.keyOf(plainItem));
  }
  getIndexByKey(key, items) {
    const groups = items ?? this._collectionWidget.option('items');
    let index = -1;
    (0, _iterator.each)(groups, (groupIndex, group) => {
      if (!group.items) return undefined;
      (0, _iterator.each)(group.items, (itemIndex, item) => {
        // @ts-expect-error ts-error
        const itemKey = this._collectionWidget.keyOf(item);
        if (this._equalKeys(itemKey, key)) {
          index = {
            group: groupIndex,
            item: itemIndex
          };
          return false;
        }
        return undefined;
      });
      if (index !== -1) {
        return false;
      }
      return undefined;
    });
    return typeof index === 'object' ? combineIndex(index) : index;
  }
  _getGroups(items) {
    const dataController = this._collectionWidget._dataController;
    const group = dataController.group();
    if (group) {
      // @ts-expect-error ts-error
      return _store_helper.default.queryByOptions((0, _query.default)(items), {
        group
      }).toArray();
    }
    return this._collectionWidget.option('items');
  }
  getItemsByKeys(keys, items) {
    const result = [];
    const groups = this._getGroups(items);
    const groupItemByKeyMap = {};
    const getItemMeta = key => {
      const index = this.getIndexByKey(key, groups);
      const splitIdx = splitIndex(index);
      const group = splitIdx && groups[splitIdx.group];
      if (!group) return undefined;
      return {
        groupKey: String(group.key),
        item: group.items[splitIdx.item]
      };
    };
    (0, _iterator.each)(keys, (_, key) => {
      const itemMeta = getItemMeta(key);
      if (!itemMeta) return undefined;
      const {
        groupKey
      } = itemMeta;
      const {
        item
      } = itemMeta;
      let selectedGroup = groupItemByKeyMap[groupKey];
      if (!selectedGroup) {
        selectedGroup = {
          key: groupKey,
          items: []
        };
        groupItemByKeyMap[groupKey] = selectedGroup;
        result.push(selectedGroup);
      }
      selectedGroup.items.push(item);
      return undefined;
    });
    return result;
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    const items = this._collectionWidget.option('items');
    const movingIndices = splitIndex(movingIndex);
    const destinationIndices = splitIndex(destinationIndex);
    const movingItemGroup = items[movingIndices.group].items;
    const destinationItemGroup = items[destinationIndices.group].items;
    const movedItemData = movingItemGroup[movingIndices.item];
    movingItemGroup.splice(movingIndices.item, 1);
    destinationItemGroup.splice(destinationIndices.item, 0, movedItemData);
  }
  _isItemIndex(index) {
    const idx = index;
    return Boolean(index && (0, _type.isNumeric)(idx.group) && (0, _type.isNumeric)(idx.item));
  }
  _getNormalizedItemIndex(itemElement) {
    const $item = (0, _renderer.default)(itemElement);
    const $group = $item.closest(`.${LIST_GROUP_CLASS}`);
    if (!$group.length) {
      return -1;
    }
    return combineIndex({
      group: this._groupElements().index($group),
      item: this._groupItemElements($group).index($item)
    });
  }
  _normalizeItemIndex(index) {
    return combineIndex(index);
  }
  _denormalizeItemIndex(index) {
    return splitIndex(index);
  }
  _getItemByNormalizedIndex(index) {
    const indices = splitIndex(index);
    const $group = this._groupElements().eq(indices.group);
    return this._groupItemElements($group).eq(indices.item);
  }
  _itemsFromSameParent(firstIndex, secondIndex) {
    return splitIndex(firstIndex).group === splitIndex(secondIndex).group;
  }
}
var _default = exports.default = GroupedEditStrategy;
