/**
* DevExtreme (esm/__internal/ui/form/form.items_runtime_info.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { isString } from '../../../core/utils/type';
export default class FormItemsRunTimeInfo {
  constructor() {
    this._map = {};
  }
  _findWidgetInstance(condition) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let result;
    each(this._map, (_guid, _ref) => {
      let {
        widgetInstance,
        item
      } = _ref;
      if (condition(item)) {
        result = widgetInstance;
        return false;
      }
      return true;
    });
    return result;
  }
  _findFieldByCondition(callback, valueExpr) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let result;
    each(this._map, (key, value) => {
      if (callback(value)) {
        result = valueExpr === 'guid' ? key : value[valueExpr];
        return false;
      }
      return true;
    });
    return result;
  }
  clear() {
    this._map = {};
  }
  removeItemsByItems(itemsRunTimeInfo) {
    each(itemsRunTimeInfo.getItems(), guid => this.removeItemByKey(guid));
  }
  removeItemByKey(key) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this._map[key];
  }
  add(options) {
    const key = options.guid ?? new Guid().toString();
    this._map[key] = options;
    return key;
  }
  addItemsOrExtendFrom(itemsRunTimeInfo) {
    itemsRunTimeInfo.each((key, itemRunTimeInfo) => {
      if (this._map[key]) {
        if (itemRunTimeInfo.widgetInstance) {
          this._map[key].widgetInstance = itemRunTimeInfo.widgetInstance;
        }
        this._map[key].$itemContainer = itemRunTimeInfo.$itemContainer;
      } else {
        this.add({
          item: itemRunTimeInfo.item,
          widgetInstance: itemRunTimeInfo.widgetInstance,
          guid: key,
          $itemContainer: itemRunTimeInfo.$itemContainer
        });
      }
    });
  }
  extendRunTimeItemInfoByKey(key, options) {
    if (this._map[key]) {
      this._map[key] = extend(this._map[key], options);
    }
  }
  findWidgetInstanceByItem(item) {
    return this._findWidgetInstance(storedItem => storedItem === item);
  }
  findGroupOrTabLayoutManagerByPath(targetPath) {
    return this._findFieldByCondition(_ref2 => {
      let {
        path
      } = _ref2;
      return path === targetPath;
    }, 'layoutManager');
  }
  findKeyByPath(targetPath) {
    return this._findFieldByCondition(_ref3 => {
      let {
        path
      } = _ref3;
      return path === targetPath;
    }, 'guid');
  }
  findWidgetInstanceByName(name) {
    return this._findWidgetInstance(item => name === item.name);
  }
  findWidgetInstanceByDataField(dataField) {
    return this._findWidgetInstance(item => dataField === (isString(item) ? item : item.dataField));
  }
  findItemContainerByItem(item) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this._map) {
      if (this._map[key].item === item) {
        return this._map[key].$itemContainer ?? $();
      }
    }
    return $();
  }
  findItemIndexByItem(targetItem) {
    return this._findFieldByCondition(_ref4 => {
      let {
        item
      } = _ref4;
      return item === targetItem;
    }, 'itemIndex');
  }
  findPreparedItemByItem(item) {
    return this._findFieldByCondition(_ref5 => {
      let {
        item: currentItem
      } = _ref5;
      return currentItem === item;
    }, 'preparedItem');
  }
  getItems() {
    return this._map;
  }
  each(handler) {
    each(this._map, (key, itemRunTimeInfo) => {
      handler(key, itemRunTimeInfo);
    });
  }
  removeItemsByPathStartWith(path) {
    const keys = Object.keys(this._map);
    const filteredKeys = keys.filter(key => {
      if (this._map[key].path) {
        var _this$_map$key$path;
        return (_this$_map$key$path = this._map[key].path) === null || _this$_map$key$path === void 0 ? void 0 : _this$_map$key$path.includes(path, 0);
      }
      return false;
    });
    filteredKeys.forEach(key => this.removeItemByKey(key));
  }
  _isEditableItem(item) {
    const {
      visible: itemVisible,
      editorOptions
    } = item;
    const {
      readOnly,
      disabled,
      visible
    } = editorOptions ?? {};
    return itemVisible !== false && !readOnly && !disabled && visible !== false;
  }
  _isItemAIEnabled(item) {
    var _item$aiOptions;
    return !((_item$aiOptions = item.aiOptions) !== null && _item$aiOptions !== void 0 && _item$aiOptions.disabled);
  }
  _isDataItem(item) {
    return 'dataField' in item;
  }
  getVisibleItems() {
    const allItems = Object.values(this._map);
    return allItems.filter(_ref6 => {
      let {
        $itemContainer
      } = _ref6;
      return ($itemContainer === null || $itemContainer === void 0 ? void 0 : $itemContainer.css('visibility')) === 'visible';
    });
  }
  getItemsForDataExtraction() {
    const visibleItems = this.getVisibleItems().map(_ref7 => {
      let {
        item
      } = _ref7;
      return item;
    });
    return visibleItems.filter(this._isDataItem).filter(this._isItemAIEnabled).filter(this._isEditableItem);
  }
}
