/**
* DevExtreme (esm/__internal/ui/collection/collection_widget.live_update.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { indexByKey, insert, update } from '../../../common/data/array_utils';
import { keysEqual } from '../../../common/data/utils';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { findChanges } from '../../../core/utils/array_compare';
import { when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import CollectionWidgetAsync from '../../ui/collection/collection_widget.async';
const PRIVATE_KEY_FIELD = '__dx_key__';
class CollectionWidgetLiveUpdate extends CollectionWidgetAsync {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      repaintChangesOnly: false
    });
  }
  reload() {}
  _init() {
    super._init();
    this._refreshItemsCache();
  }
  _findItemElementByKey(key) {
    let result = $();
    const keyExpr = this.key();
    this.itemElements().each((_, item) => {
      const $item = $(item);
      const itemData = this._getItemData($item);
      if (keyExpr ? keysEqual(keyExpr, this.keyOf(itemData), key) : this._isItemEquals(itemData, key)) {
        result = $item;
        return false;
      }
      return true;
    });
    return result;
  }
  _dataSourceChangedHandler(newItems, e) {
    if (e !== null && e !== void 0 && e.changes) {
      this._modifyByChanges(e.changes);
    } else {
      super._dataSourceChangedHandler(newItems, e);
      this._refreshItemsCache();
    }
  }
  _isItemEquals(item1, item2) {
    let itemToCompare = item1;
    if (item1 && typeof item1 === 'object' && item1[PRIVATE_KEY_FIELD]) {
      itemToCompare = item1.data;
    }
    try {
      return JSON.stringify(itemToCompare) === JSON.stringify(item2);
    } catch (e) {
      return itemToCompare === item2;
    }
  }
  _isItemStrictEquals(item1, item2) {
    return this._isItemEquals(item1, item2);
  }
  _shouldAddNewGroup(changes, items) {
    let result = false;
    if (this.option('grouped')) {
      if (!changes.length) {
        result = true;
      }
      each(changes, (i, change) => {
        if (change.type === 'insert') {
          result = true;
          each(items, (_, item) => {
            if (change.data.key !== undefined && change.data.key === item.key) {
              result = false;
              return false;
            }
            return true;
          });
        }
      });
    }
    return result;
  }
  _partialRefresh() {
    const {
      repaintChangesOnly
    } = this.option();
    if (repaintChangesOnly) {
      const keyOf = data => {
        if (data && data[PRIVATE_KEY_FIELD] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return data[PRIVATE_KEY_FIELD];
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.keyOf(data);
      };
      const result = findChanges({
        oldItems: this._itemsCache,
        newItems: this._editStrategy.itemsGetter(),
        getKey: keyOf,
        isItemEquals: this._isItemStrictEquals.bind(this),
        detectReorders: true
      });
      if (result && this._itemsCache.length && !this._shouldAddNewGroup(result, this._itemsCache)) {
        this._modifyByChanges(result, true);
        this._renderEmptyMessage();
        return true;
      }
      this._refreshItemsCache();
    }
    return false;
  }
  _refreshItemsCache() {
    const {
      repaintChangesOnly
    } = this.option();
    if (repaintChangesOnly) {
      const items = this._editStrategy.itemsGetter();
      try {
        this._itemsCache = extend(true, [], items);
        if (!this.key()) {
          this._itemsCache = this._itemsCache.map((itemCache, index) => ({
            [PRIVATE_KEY_FIELD]: items[index],
            data: itemCache
          }));
        }
      } catch (e) {
        this._itemsCache = extend([], items);
      }
    }
  }
  _updateByChange(keyInfo, items, change, isPartialRefresh) {
    if (isPartialRefresh) {
      this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key));
    } else {
      const changedItem = items[indexByKey(keyInfo, items, change.key)];
      if (changedItem) {
        // @ts-expect-error ts-error
        update(keyInfo, items, change.key, change.data).done(() => {
          this._renderItem(items.indexOf(changedItem), changedItem, null, this._findItemElementByKey(change.key));
        });
      }
    }
  }
  _insertByChange(keyInfo, items, change, isPartialRefresh) {
    when(
    // @ts-expect-error ts-error
    isPartialRefresh ?? insert(keyInfo, items, change.data, change.index)).done(() => {
      this._beforeItemElementInserted(change);
      this._renderItem(change.index ?? items.length, change.data);
      this._afterItemElementInserted();
    });
  }
  _updateSelectionAfterRemoveByChange(removeIndex) {
    const {
      selectedIndex,
      selectedItems = []
    } = this.option();
    const index = selectedIndex;
    if (index > removeIndex) {
      this.option('selectedIndex', index - 1);
    } else if (index === removeIndex && selectedItems.length === 1) {
      this.option('selectedItems', []);
    } else {
      this._normalizeSelectedItems();
    }
  }
  _beforeItemElementInserted(change) {
    const {
      selectedIndex
    } = this.option();
    const index = selectedIndex;
    if (change.index <= index) {
      this.option('selectedIndex', index + 1);
    }
  }
  _afterItemElementInserted() {
    this._renderEmptyMessage();
  }
  _removeByChange(keyInfo, items, change, isPartialRefresh) {
    const index = isPartialRefresh ? change.index : indexByKey(keyInfo, items, change.key);
    const removedItem = isPartialRefresh ? change.oldItem : items[index];
    if (removedItem) {
      const $removedItemElement = this._findItemElementByKey(change.key);
      const deletedActionArgs = this._extendActionArgs($removedItemElement);
      // @ts-expect-error ts-error
      this._waitDeletingPrepare($removedItemElement).done(() => {
        if (isPartialRefresh) {
          this._updateIndicesAfterIndex(index - 1);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
          this._updateSelectionAfterRemoveByChange(index);
        } else {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
        }
      });
    }
  }
  _modifyByChanges(changes, isPartialRefresh) {
    const items = this._editStrategy.itemsGetter();
    const keyInfo = {
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this)
    };
    const dataController = this._dataController;
    const paginate = dataController.paginate();
    const group = dataController.group();
    let filteredChanges = changes;
    if (paginate || group) {
      filteredChanges = changes.filter(item => item.type !== 'insert' || item.index !== undefined);
    }
    filteredChanges.forEach(change => this[`_${change.type}ByChange`](keyInfo, items, change, isPartialRefresh));
    this._renderedItemsCount = items.length;
    this._refreshItemsCache();
    this._fireContentReadyAction();
  }
  _appendItemToContainer($container, $itemFrame, index) {
    const nextSiblingElement = $container.children(this._itemSelector())[index];
    domAdapter.insertElement($container[0], $itemFrame[0], nextSiblingElement);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'items':
        {
          const isItemsUpdated = this._partialRefresh();
          if (!isItemsUpdated) {
            super._optionChanged(args);
          }
          break;
        }
      case 'dataSource':
        {
          const {
            repaintChangesOnly
          } = this.option();
          if (!repaintChangesOnly || !value) {
            this.option('items', []);
          }
          super._optionChanged(args);
          break;
        }
      case 'repaintChangesOnly':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default CollectionWidgetLiveUpdate;
