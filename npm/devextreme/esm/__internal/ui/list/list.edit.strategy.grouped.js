/**
* DevExtreme (esm/__internal/ui/list/list.edit.strategy.grouped.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import query from '../../../common/data/query';
import storeHelper from '../../../common/data/store_helper';
import $ from '../../../core/renderer';
import { each } from '../../../core/utils/iterator';
import { isNumeric } from '../../../core/utils/type';
import { indexExists, NOT_EXISTING_INDEX } from '../../ui/collection/collection_widget.edit';
import EditStrategy from '../../ui/collection/collection_widget.edit.strategy.plain';
const LIST_ITEM_CLASS = 'dx-list-item';
const LIST_GROUP_CLASS = 'dx-list-group';
const SELECTION_SHIFT = 20;
// eslint-disable-next-line no-bitwise
const SELECTION_MASK = (1 << SELECTION_SHIFT) - 1;
const combineIndex = index => (index.group << SELECTION_SHIFT) + index.item;
const splitIndex = combinedIndex => ({
  // eslint-disable-next-line no-bitwise
  group: combinedIndex >> SELECTION_SHIFT,
  // eslint-disable-next-line no-bitwise
  item: combinedIndex & SELECTION_MASK
});
class GroupedEditStrategy extends EditStrategy {
  _groupElements() {
    return this._collectionWidget._itemContainer().find(`.${LIST_GROUP_CLASS}`);
  }
  _groupItemElements($group) {
    return $group.find(`.${LIST_ITEM_CLASS}`);
  }
  getIndexByItemData(itemData) {
    const groups = this._getItems();
    let index = NOT_EXISTING_INDEX;
    if (!itemData) return NOT_EXISTING_INDEX;
    const {
      items = []
    } = itemData;
    if (items.length) {
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      itemData = items[0];
    }
    each(groups, (groupIndex, group) => {
      if (!group.items) return false;
      each(group.items, (itemIndex, item) => {
        if (item !== itemData) {
          return true;
        }
        index = {
          group: groupIndex,
          item: itemIndex
        };
        return false;
      });
      return !indexExists(index);
    });
    return index;
  }
  _isIndexNumeric(index) {
    return isNumeric(index);
  }
  getItemDataByIndex(index) {
    const groups = this._getItems();
    if (this._isIndexNumeric(index)) {
      return this.itemsGetter()[index];
    }
    const groupIndex = index.group;
    const group = groups[groupIndex];
    const {
      items = []
    } = group;
    return index && items[index.item] || null;
  }
  itemsGetter() {
    let resultItems = [];
    const items = this._getItems();
    items.forEach(groupedItem => {
      if (groupedItem.items) {
        resultItems = resultItems.concat(groupedItem.items);
      } else {
        resultItems.push(groupedItem);
      }
    });
    return resultItems;
  }
  deleteItemAtIndex(index) {
    const indices = splitIndex(index);
    const {
      items = []
    } = this._collectionWidget.option();
    const itemGroup = items[indices.group].items;
    itemGroup === null || itemGroup === void 0 || itemGroup.splice(indices.item, 1);
  }
  getKeysByItems(items) {
    const plainItems = items.reduce((counter, item) => {
      if (item !== null && item !== void 0 && item.items) {
        return counter.concat(item.items);
      }
      counter.push(item);
      return counter;
    }, []);
    return plainItems.map(plainItem => this._collectionWidget.keyOf(plainItem));
  }
  getIndexByKey(key, items) {
    const {
      items: userItems
    } = this._collectionWidget.option();
    const groups = items ?? userItems;
    let index = -1;
    each(groups, (groupIndex, group) => {
      if (!group.items) return undefined;
      each(group.items, (itemIndex, item) => {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return storeHelper.queryByOptions(query(items), {
        group
      }).toArray();
    }
    const {
      items: userItems = []
    } = this._collectionWidget.option();
    return userItems;
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        item: group.items[splitIdx.item]
      };
    };
    each(keys, (_index, key) => {
      var _selectedGroup$items;
      const itemMeta = getItemMeta(key);
      if (!itemMeta) return;
      const {
        groupKey,
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
      (_selectedGroup$items = selectedGroup.items) === null || _selectedGroup$items === void 0 || _selectedGroup$items.push(item);
    });
    return result;
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    const {
      items = []
    } = this._collectionWidget.option();
    const movingIndices = splitIndex(movingIndex);
    const destinationIndices = splitIndex(destinationIndex);
    const movingItemGroup = items[movingIndices.group].items;
    const destinationItemGroup = items[destinationIndices.group].items;
    if (movingItemGroup) {
      const movedItemData = movingItemGroup === null || movingItemGroup === void 0 ? void 0 : movingItemGroup[movingIndices.item];
      movingItemGroup === null || movingItemGroup === void 0 || movingItemGroup.splice(movingIndices.item, 1);
      destinationItemGroup === null || destinationItemGroup === void 0 || destinationItemGroup.splice(destinationIndices.item, 0, movedItemData);
    }
  }
  _isItemIndex(index) {
    return Boolean(index && isNumeric(index.group) && isNumeric(index.item));
  }
  _getNormalizedItemIndex(itemElement) {
    const $item = $(itemElement);
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
export default GroupedEditStrategy;
