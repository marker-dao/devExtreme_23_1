/**
* DevExtreme (cjs/__internal/ui/selection/selection.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _selectionStrategy = _interopRequireDefault(require("../../ui/selection/selection.strategy.deferred"));
var _selectionStrategy2 = _interopRequireDefault(require("../../ui/selection/selection.strategy.standard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Selection {
  constructor(options) {
    this.options = (0, _extend.extend)(this._getDefaultOptions(), options, {
      selectedItemKeys: options.selectedKeys ?? []
    });
    this._selectionStrategy = this.options.deferred ? new _selectionStrategy.default(this.options) : new _selectionStrategy2.default(this.options);
    this._focusedItemIndex = -1;
    if (!this.options.equalByReference) {
      this._selectionStrategy.updateSelectedItemKeyHash(this.options.selectedItemKeys);
    }
  }
  _getDefaultOptions() {
    const defaultOptions = {
      allowNullValue: false,
      deferred: false,
      equalByReference: false,
      mode: 'multiple',
      selectedItems: [],
      selectionFilter: [],
      maxFilterLengthInRequest: 0,
      onSelectionChanged: _common.noop,
      key() {
        return undefined;
      },
      keyOf(item) {
        return item;
      },
      load() {
        return (0, _deferred.Deferred)().resolve([]);
      },
      totalCount() {
        return -1;
      },
      isSelectableItem() {
        return true;
      },
      isItemSelected() {
        return false;
      },
      getItemData(item) {
        return item;
      },
      dataFields() {
        return undefined;
      },
      filter() {
        return undefined;
      }
    };
    return defaultOptions;
  }
  validate() {
    this._selectionStrategy.validate();
  }
  getSelectedItemKeys() {
    return this._selectionStrategy.getSelectedItemKeys();
  }
  _isStandardStrategy(strategy) {
    return this.options.deferred;
  }
  getSelectedItems() {
    return this._selectionStrategy.getSelectedItems();
  }
  selectionFilter(value) {
    if (value === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.options.selectionFilter;
    }
    const filterIsChanged = this.options.selectionFilter !== value && JSON.stringify(this.options.selectionFilter) !== JSON.stringify(value);
    this.options.selectionFilter = value;
    if (filterIsChanged) {
      this.onSelectionChanged();
    }
    return undefined;
  }
  setSelection(keys, updatedKeys) {
    return this.selectedItemKeys(keys, false, false, false, updatedKeys);
  }
  select(keys) {
    return this.selectedItemKeys(keys, true);
  }
  deselect(keys) {
    return this.selectedItemKeys(keys, true, true);
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
    let normalizedKeys = keys ?? [];
    normalizedKeys = Array.isArray(normalizedKeys) ? normalizedKeys : [normalizedKeys];
    this.validate();
    return this._selectionStrategy.selectedItemKeys(normalizedKeys, preserve, isDeselect, isSelectAll, updatedKeys);
  }
  clearSelection() {
    return this.selectedItemKeys([]);
  }
  _addSelectedItem(itemData, key) {
    // @ts-expect-error addSelectedItem
    this._selectionStrategy.addSelectedItem(key, itemData);
  }
  _removeSelectedItem(key) {
    this._selectionStrategy.removeSelectedItem(key);
  }
  _setSelectedItems(keys, items) {
    this._selectionStrategy.setSelectedItems(keys, items);
  }
  onSelectionChanged() {
    this._selectionStrategy.onSelectionChanged();
  }
  changeItemSelection(itemIndex) {
    var _this$options$allowLo, _this$options;
    let keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let setFocusOnly = arguments.length > 2 ? arguments[2] : undefined;
    let isSelectedItemsChanged = false;
    const items = this.options.plainItems();
    const item = items[itemIndex];
    let focusedItemIndex = itemIndex;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let deferred;
    const {
      isVirtualPaging
    } = this.options;
    const allowLoadByRange = (_this$options$allowLo = (_this$options = this.options).allowLoadByRange) === null || _this$options$allowLo === void 0 ? void 0 : _this$options$allowLo.call(_this$options);
    const {
      alwaysSelectByShift
    } = this.options;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let indexOffset;
    let focusedItemNotInLoadedRange = false;
    let shiftFocusedItemNotInLoadedRange = false;
    const itemIsNotInLoadedRange = index => index >= 0 && !items.filter(it => it.loadIndex === index).length;
    if (isVirtualPaging && (0, _type.isDefined)(item)) {
      if (allowLoadByRange) {
        indexOffset = item.loadIndex - focusedItemIndex;
        focusedItemIndex = item.loadIndex;
      }
      focusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._focusedItemIndex);
      if ((0, _type.isDefined)(this._shiftFocusedItemIndex)) {
        shiftFocusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._shiftFocusedItemIndex);
      }
    }
    if (!this.isSelectable() || !this.isDataItem(item)) {
      return false;
    }
    const itemData = this.options.getItemData(item);
    const itemKey = this.options.keyOf(itemData);
    let allowSelectByShift = keys.shift;
    if (alwaysSelectByShift === false && allowSelectByShift) {
      allowSelectByShift = allowLoadByRange !== false || !focusedItemNotInLoadedRange && !shiftFocusedItemNotInLoadedRange;
    }
    if (allowSelectByShift && this.options.mode === 'multiple' && this._focusedItemIndex >= 0) {
      if (allowLoadByRange && (focusedItemNotInLoadedRange || shiftFocusedItemNotInLoadedRange)) {
        isSelectedItemsChanged = focusedItemIndex !== this._shiftFocusedItemIndex || this._focusedItemIndex !== this._shiftFocusedItemIndex;
        if (isSelectedItemsChanged) {
          deferred = this.changeItemSelectionWhenShiftKeyInVirtualPaging(focusedItemIndex);
        }
      } else {
        isSelectedItemsChanged = this.changeItemSelectionWhenShiftKeyPressed(focusedItemIndex, items, indexOffset);
      }
    } else if (keys.control) {
      this._resetItemSelectionWhenShiftKeyPressed();
      if (!setFocusOnly) {
        const isSelected = this._selectionStrategy.isItemDataSelected(itemData);
        if (this.options.mode === 'single') {
          this.clearSelectedItems();
        }
        if (isSelected) {
          this._removeSelectedItem(itemKey);
        } else {
          this._addSelectedItem(itemData, itemKey);
        }
      }
      isSelectedItemsChanged = true;
    } else {
      this._resetItemSelectionWhenShiftKeyPressed();
      const isKeysEqual = this._selectionStrategy.equalKeys(this.options.selectedItemKeys[0], itemKey);
      if (this.options.selectedItemKeys.length !== 1 || !isKeysEqual) {
        this._setSelectedItems([itemKey], [itemData]);
        isSelectedItemsChanged = true;
      }
    }
    if (isSelectedItemsChanged) {
      (0, _deferred.when)(deferred).done(() => {
        this._focusedItemIndex = focusedItemIndex;
        if (!setFocusOnly) {
          this.onSelectionChanged();
        }
      });
      return true;
    }
    return undefined;
  }
  isDataItem(item) {
    return this.options.isSelectableItem(item);
  }
  isSelectable() {
    return this.options.mode === 'single' || this.options.mode === 'multiple';
  }
  isItemDataSelected(data) {
    return this._selectionStrategy.isItemDataSelected(data, {
      checkPending: true
    });
  }
  isItemSelected(arg) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this._selectionStrategy.isItemKeySelected(arg, options);
  }
  _resetItemSelectionWhenShiftKeyPressed() {
    delete this._shiftFocusedItemIndex;
  }
  _resetFocusedItemIndex() {
    this._focusedItemIndex = -1;
  }
  changeItemSelectionWhenShiftKeyInVirtualPaging(loadIndex) {
    var _this$options$getLoad, _this$options2;
    const loadOptions = ((_this$options$getLoad = (_this$options2 = this.options).getLoadOptions) === null || _this$options$getLoad === void 0 ? void 0 : _this$options$getLoad.call(_this$options2, loadIndex, this._focusedItemIndex, this._shiftFocusedItemIndex)) ?? {};
    const deferred = (0, _deferred.Deferred)();
    const indexOffset = loadOptions.skip;
    this.options.load(loadOptions).done(items => {
      const filteredItems = !Array.isArray(items) && (0, _type.isPlainObject)(items) ? items.data : items;
      this.changeItemSelectionWhenShiftKeyPressed(loadIndex, filteredItems, indexOffset);
      deferred.resolve();
    });
    return deferred.promise();
  }
  changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset) {
    let isSelectedItemsChanged = false;
    const indexOffsetDefined = (0, _type.isDefined)(indexOffset);
    let index = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
    const {
      keyOf
    } = this.options;
    const focusedItem = items[index];
    const focusedData = this.options.getItemData(focusedItem);
    const focusedKey = keyOf(focusedData);
    const isFocusedItemSelected = focusedItem && this.isItemDataSelected(focusedData);
    if (!(0, _type.isDefined)(this._shiftFocusedItemIndex)) {
      this._shiftFocusedItemIndex = this._focusedItemIndex;
    }
    let itemIndexStep = 0;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let itemKey;
    let startIndex = 0;
    let endIndex = 0;
    if (this._shiftFocusedItemIndex !== this._focusedItemIndex) {
      itemIndexStep = this._focusedItemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          itemKey = keyOf(this.options.getItemData(items[index]));
          this._removeSelectedItem(itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if (itemIndex !== this._shiftFocusedItemIndex) {
      itemIndexStep = itemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? itemIndex - indexOffset : itemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          const data = this.options.getItemData(items[index]);
          itemKey = keyOf(data);
          this._addSelectedItem(data, itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if ((indexOffsetDefined || this.isDataItem(focusedItem)) && !isFocusedItemSelected) {
      this._addSelectedItem(focusedData, focusedKey);
      isSelectedItemsChanged = true;
    }
    return isSelectedItemsChanged;
  }
  clearSelectedItems() {
    this._setSelectedItems([], []);
  }
  selectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._selectionStrategy._onePageSelectAll(false);
    }
    return this.selectedItemKeys([], true, false, true);
  }
  deselectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._selectionStrategy._onePageSelectAll(true);
    }
    return this.selectedItemKeys([], true, true, true);
  }
  getSelectAllState(visibleOnly) {
    return this._selectionStrategy.getSelectAllState(visibleOnly);
  }
  loadSelectedItemsWithFilter() {
    return this._selectionStrategy.loadSelectedItemsWithFilter();
  }
}
exports.default = Selection;
