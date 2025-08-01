import Class from '../../../core/class';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { equalByValue } from '../../../core/utils/common';
import { isRenderer } from '../../../core/utils/type';
class EditStrategy {
  constructor(collectionWidget) {
    this._collectionWidget = collectionWidget;
  }
  _getItems() {
    const {
      items = []
    } = this._collectionWidget.option();
    return items;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIndexByItemData(value) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemDataByIndex(index) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getKeysByItems(items) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemsByKeys(keys, items) {
    return Class.abstract();
  }
  itemsGetter() {
    return Class.abstract();
  }
  getKeyByIndex(index) {
    const resultIndex = this._denormalizeItemIndex(index);
    return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0];
  }
  _equalKeys(key1, key2) {
    if (this._collectionWidget._isKeySpecified()) {
      return equalByValue(key1, key2);
    }
    return key1 === key2;
  }
  beginCache() {
    this._cache = {};
  }
  endCache() {
    this._cache = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIndexByKey(key) {
    return Class.abstract();
  }
  getNormalizedIndex(value) {
    if (this._isNormalizedItemIndex(value)) {
      return value;
    }
    if (this._isItemIndex(value)) {
      return this._normalizeItemIndex(value);
    }
    if (this._isNode(value)) {
      return this._getNormalizedItemIndex(value);
    }
    return this._normalizeItemIndex(this.getIndexByItemData(value));
  }
  getIndex(value) {
    if (this._isNormalizedItemIndex(value)) {
      return this._denormalizeItemIndex(value);
    }
    if (this._isItemIndex(value)) {
      return value;
    }
    if (this._isNode(value)) {
      return this._denormalizeItemIndex(this._getNormalizedItemIndex(value));
    }
    return this.getIndexByItemData(value);
  }
  getItemElement(value) {
    if (this._isNormalizedItemIndex(value)) {
      return this._getItemByNormalizedIndex(value);
    }
    if (this._isItemIndex(value)) {
      return this._getItemByNormalizedIndex(this._normalizeItemIndex(value));
    }
    if (this._isNode(value)) {
      return $(value);
    }
    const normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
    return this._getItemByNormalizedIndex(normalizedItemIndex);
  }
  _isNode(el) {
    return domAdapter.isNode(el && isRenderer(el) ? el.get(0) : el);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteItemAtIndex(index) {
    return Class.abstract();
  }
  itemPlacementFunc(movingIndex, destinationIndex) {
    return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? 'after' : 'before';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    return Class.abstract();
  }
  _isNormalizedItemIndex(index) {
    return typeof index === 'number' && Math.round(index) === index;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _isItemIndex(index) {
    return Class.abstract();
  }
  _getNormalizedItemIndex(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _normalizeItemIndex(index) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _denormalizeItemIndex(index) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getItemByNormalizedIndex(index) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _itemsFromSameParent(movingIndex, destinationIndex) {
    return Class.abstract();
  }
}
export default EditStrategy;