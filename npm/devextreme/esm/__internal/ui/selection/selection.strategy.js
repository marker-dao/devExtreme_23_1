/**
* DevExtreme (esm/__internal/ui/selection/selection.strategy.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import dataQuery from '../../../common/data/query';
import { equalByValue, getKeyHash, noop } from '../../../core/utils/common';
import { Deferred } from '../../../core/utils/deferred';
import { isObject, isPlainObject, isPromise } from '../../../core/utils/type';
export default class SelectionStrategy {
  constructor(options) {
    this._lastSelectAllPageDeferred = Deferred().reject();
    this.options = options;
    this._setOption('disabledItemKeys', []);
    this._clearItemKeys();
  }
  _clearItemKeys() {
    this._setOption('addedItemKeys', []);
    this._setOption('removedItemKeys', []);
    this._setOption('removedItems', []);
    this._setOption('addedItems', []);
  }
  validate() {}
  _setOption(name, value) {
    this.options[name] = value;
  }
  onSelectionChanging() {
    const {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      onSelectionChanging = noop
    } = this.options;
    const selectionChangingArgs = {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      cancel: false
    };
    onSelectionChanging(selectionChangingArgs);
    return selectionChangingArgs.cancel;
  }
  _callCallbackIfNotCanceled(callback, cancelCallback) {
    const cancelResult = this.onSelectionChanging();
    if (isPromise(cancelResult)) {
      cancelResult.then(cancel => {
        if (!cancel) {
          callback();
        } else {
          cancelCallback();
        }
      }).catch(() => {
        callback();
      });
    } else if (!cancelResult) {
      callback();
    } else {
      cancelCallback();
    }
  }
  onSelectionChanged() {
    const {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      onSelectionChanged = noop
    } = this.options;
    this._clearItemKeys();
    onSelectionChanged({
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems
    });
  }
  equalKeys(key1, key2) {
    if (this.options.equalByReference) {
      if (isObject(key1) && isObject(key2)) {
        return key1 === key2;
      }
    }
    return equalByValue(key1, key2);
  }
  getSelectableItems(items) {
    return items.filter(item => !(item !== null && item !== void 0 && item.disabled));
  }
  _clearSelection(keys, preserve, isDeselect, isSelectAll) {
    let normalizedKeys = keys || [];
    normalizedKeys = Array.isArray(normalizedKeys) ? normalizedKeys : [normalizedKeys];
    this.validate();
    return this.selectedItemKeys(normalizedKeys, preserve, isDeselect, isSelectAll);
  }
  _removeTemplateProperty(remoteFilter) {
    if (Array.isArray(remoteFilter)) {
      return remoteFilter.map(f => this._removeTemplateProperty(f));
    }
    if (isObject(remoteFilter)) {
      delete remoteFilter.template;
    }
    return remoteFilter;
  }
  _getQueryParams() {
    const {
      sensitivity
    } = this.options;
    if (!sensitivity) {
      return undefined;
    }
    return {
      langParams: {
        collatorOptions: {
          sensitivity
        }
      }
    };
  }
  _loadFilteredData(remoteFilter, localFilter, select, isSelectAll) {
    const filterLength = encodeURI(JSON.stringify(this._removeTemplateProperty(remoteFilter))).length;
    const needLoadAllData = this.options.maxFilterLengthInRequest && filterLength > this.options.maxFilterLengthInRequest;
    const deferred = Deferred();
    const queryParams = this._getQueryParams();
    const loadOptions = _extends({
      filter: needLoadAllData ? undefined : remoteFilter,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      select: needLoadAllData ? this.options.dataFields() : select || this.options.dataFields()
    }, queryParams);
    if (remoteFilter && Array.isArray(remoteFilter) && remoteFilter.length === 0) {
      deferred.resolve([]);
    } else {
      this.options.load(loadOptions).done(items => {
        let filteredItems = !Array.isArray(items) && isPlainObject(items) ? items.data : items;
        if (localFilter && !isSelectAll) {
          filteredItems = filteredItems.filter(localFilter);
        } else if (needLoadAllData) {
          // @ts-expect-error dataQuary
          filteredItems = dataQuery(filteredItems).filter(remoteFilter).toArray();
        }
        deferred.resolve(filteredItems);
      }).fail(error => {
        // @ts-expect-error error
        deferred.reject(error);
      });
    }
    return deferred;
  }
  updateSelectedItemKeyHash(keys) {
    for (let i = 0; i < keys.length; i += 1) {
      const keyHash = getKeyHash(keys[i]);
      if (!isObject(keyHash)) {
        this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
        const keyIndices = this.options.keyHashIndices[keyHash];
        keyIndices.push(i);
      }
    }
  }
  _isAnyItemSelected(items) {
    if (items.find(item => this.options.isItemSelected(item))) {
      return undefined;
    }
    return false;
  }
  _getFullSelectAllState() {
    const items = this.options.plainItems();
    const {
      filter
    } = this.options;
    const dataFilter = filter();
    let selectedItems = this.options.ignoreDisabledItems ? this.options.selectedItems : this.options.selectedItems.filter(item => !(item !== null && item !== void 0 && item.disabled));
    if (dataFilter) {
      // @ts-expect-error dataQuery
      selectedItems = dataQuery(selectedItems).filter(dataFilter).toArray();
    }
    const selectedItemsLength = selectedItems.length;
    const disabledItemsLength = items.length - this.getSelectableItems(items).length;
    if (!selectedItemsLength) {
      return this._isAnyItemSelected(items);
    }
    if (selectedItemsLength >= this.options.totalCount() - disabledItemsLength) {
      return true;
    }
    return undefined;
  }
  _getVisibleSelectAllState() {
    const items = this.getSelectableItems(this.options.plainItems());
    let hasSelectedItems = false;
    let hasUnselectedItems = false;
    items.forEach(item => {
      const itemData = this.options.getItemData(item);
      const key = this.options.keyOf(itemData);
      if (this.options.isSelectableItem(item)) {
        if (this.isItemKeySelected(key)) {
          hasSelectedItems = true;
        } else {
          hasUnselectedItems = true;
        }
      }
    });
    if (hasSelectedItems) {
      return !hasUnselectedItems ? true : undefined;
    }
    return false;
  }
  selectedItemKeys(
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  keys,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  preserve,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  isDeselect,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  isSelectAll,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  updatedKeys,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  forceCombinedFilter) {
    throw new Error('selectedItemKeys method should be overriden');
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  isItemKeySelected(itemKey) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    throw new Error('isItemKeySelected method should be overriden');
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  isItemDataSelected(itemKey) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    throw new Error('isItemKeySelected method should be overriden');
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  addSelectedItem(itemKey, dataOrIsSelectAll, skipFilter) {
    throw new Error('addSelectedItem method should be overriden');
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  removeSelectedItem(itemKey) {
    throw new Error('removeSelectedItem method should be overriden');
  }
  _selectAllPlainItems(isDeselect) {
    const items = this.getSelectableItems(this.options.plainItems());
    items.forEach(item => {
      if (this.options.isSelectableItem(item)) {
        const itemData = this.options.getItemData(item);
        const itemKey = this.options.keyOf(itemData);
        const isSelected = this.isItemKeySelected(itemKey);
        if (!isSelected && !isDeselect) {
          this.addSelectedItem(itemKey, itemData);
        }
        if (isSelected && isDeselect) {
          this.removeSelectedItem(itemKey);
        }
      }
    });
  }
}
