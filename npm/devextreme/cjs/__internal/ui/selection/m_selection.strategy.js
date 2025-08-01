/**
* DevExtreme (cjs/__internal/ui/selection/m_selection.strategy.js)
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
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class SelectionStrategy {
  constructor(options) {
    this._lastSelectAllPageDeferred = (0, _deferred.Deferred)().reject();
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
      onSelectionChanging = _common.noop
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
    if ((0, _type.isPromise)(cancelResult)) {
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
      onSelectionChanged = _common.noop
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
      if ((0, _type.isObject)(key1) && (0, _type.isObject)(key2)) {
        return key1 === key2;
      }
    }
    return (0, _common.equalByValue)(key1, key2);
  }
  getSelectableItems(items) {
    return items.filter(item => !(item !== null && item !== void 0 && item.disabled));
  }
  _clearSelection(keys, preserve, isDeselect, isSelectAll) {
    keys = keys || [];
    keys = Array.isArray(keys) ? keys : [keys];
    this.validate();
    // @ts-expect-error
    return this.selectedItemKeys(keys, preserve, isDeselect, isSelectAll);
  }
  _removeTemplateProperty(remoteFilter) {
    if (Array.isArray(remoteFilter)) {
      return remoteFilter.map(f => this._removeTemplateProperty(f));
    }
    if ((0, _type.isObject)(remoteFilter)) {
      delete remoteFilter.template;
    }
    return remoteFilter;
  }
  _getQueryParams() {
    const {
      sensitivity
    } = this.options;
    if (!sensitivity) {
      return;
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
    const deferred = (0, _deferred.Deferred)();
    const queryParams = this._getQueryParams();
    const loadOptions = _extends({
      filter: needLoadAllData ? undefined : remoteFilter,
      select: needLoadAllData ? this.options.dataFields() : select || this.options.dataFields()
    }, queryParams);
    if (remoteFilter && remoteFilter.length === 0) {
      deferred.resolve([]);
    } else {
      this.options.load(loadOptions).done(items => {
        let filteredItems = (0, _type.isPlainObject)(items) ? items.data : items;
        if (localFilter && !isSelectAll) {
          filteredItems = filteredItems.filter(localFilter);
        } else if (needLoadAllData) {
          // @ts-expect-error
          filteredItems = (0, _query.default)(filteredItems).filter(remoteFilter).toArray();
        }
        deferred.resolve(filteredItems);
      }).fail(deferred.reject.bind(deferred));
    }
    return deferred;
  }
  updateSelectedItemKeyHash(keys) {
    for (let i = 0; i < keys.length; i++) {
      const keyHash = (0, _common.getKeyHash)(keys[i]);
      if (!(0, _type.isObject)(keyHash)) {
        this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
        const keyIndices = this.options.keyHashIndices[keyHash];
        keyIndices.push(i);
      }
    }
  }
  _isAnyItemSelected(items) {
    for (let i = 0; i < items.length; i++) {
      if (this.options.isItemSelected(items[i])) {
        return undefined;
      }
    }
    return false;
  }
  _getFullSelectAllState() {
    const items = this.options.plainItems();
    const dataFilter = this.options.filter();
    let selectedItems = this.options.ignoreDisabledItems ? this.options.selectedItems : this.options.selectedItems.filter(item => !(item !== null && item !== void 0 && item.disabled));
    if (dataFilter) {
      // @ts-expect-error
      selectedItems = (0, _query.default)(selectedItems).filter(dataFilter).toArray();
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
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemData = this.options.getItemData(item);
      const key = this.options.keyOf(itemData);
      if (this.options.isSelectableItem(item)) {
        if (this.isItemKeySelected(key)) {
          hasSelectedItems = true;
        } else {
          hasUnselectedItems = true;
        }
      }
    }
    if (hasSelectedItems) {
      return !hasUnselectedItems ? true : undefined;
    }
    return false;
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  isItemKeySelected(itemKey) {
    throw new Error('isItemKeySelected method should be overriden');
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  addSelectedItem(itemKey, itemData) {
    throw new Error('addSelectedItem method should be overriden');
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  removeSelectedItem(itemKey) {
    throw new Error('removeSelectedItem method should be overriden');
  }
  _selectAllPlainItems(isDeselect) {
    const items = this.getSelectableItems(this.options.plainItems());
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
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
    }
  }
}
exports.default = SelectionStrategy;
