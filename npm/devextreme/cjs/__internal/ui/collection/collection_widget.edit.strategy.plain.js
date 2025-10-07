/**
* DevExtreme (cjs/__internal/ui/collection/collection_widget.edit.strategy.plain.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _collection_widgetEdit = _interopRequireDefault(require("../../ui/collection/collection_widget.edit.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PlainEditStrategy extends _collection_widgetEdit.default {
  _getPlainItems() {
    return this._getItems() ?? [];
  }
  getIndexByItemData(itemData) {
    const keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
    if (keyOf) {
      return this.getIndexByKey(keyOf(itemData));
    }
    return this._getPlainItems().indexOf(itemData);
  }
  getItemDataByIndex(index) {
    return this._getPlainItems()[index];
  }
  deleteItemAtIndex(index) {
    this._getPlainItems().splice(index, 1);
  }
  itemsGetter() {
    return this._getPlainItems();
  }
  getKeysByItems(items) {
    const keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
    let result = items;
    if (keyOf) {
      result = items.map(item => keyOf(item));
    }
    return result;
  }
  getIndexByKey(key) {
    const cache = this._cache;
    const keys = (cache === null || cache === void 0 ? void 0 : cache.keys) ?? this.getKeysByItems(this._getPlainItems());
    if (cache && !cache.keys) {
      cache.keys = keys;
    }
    if (typeof key === 'object') {
      for (let i = 0; i < keys.length; i += 1) {
        if (this._equalKeys(key, keys[i])) return i;
      }
    } else {
      return keys.indexOf(key);
    }
    return -1;
  }
  getItemsByKeys(keys, items) {
    return (items ?? keys).slice();
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    const items = this._getPlainItems();
    const movedItemData = items[movingIndex];
    items.splice(movingIndex, 1);
    items.splice(destinationIndex, 0, movedItemData);
  }
  _isItemIndex(index) {
    return this._isNormalizedItemIndex(index);
  }
  _getNormalizedItemIndex(itemElement) {
    return this._collectionWidget._itemElements().index(itemElement);
  }
  _normalizeItemIndex(index) {
    return index;
  }
  _denormalizeItemIndex(index) {
    return index;
  }
  _getItemByNormalizedIndex(index) {
    // @ts-expect-error ts-error
    return index > -1 ? this._collectionWidget._itemElements().eq(index) : null;
  }
  _itemsFromSameParent(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _firstIndex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _secondIndex) {
    return true;
  }
}
var _default = exports.default = PlainEditStrategy;
