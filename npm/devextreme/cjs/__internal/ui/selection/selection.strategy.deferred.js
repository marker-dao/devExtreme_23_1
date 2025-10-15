/**
* DevExtreme (cjs/__internal/ui/selection/selection.strategy.deferred.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
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
var _deferred = require("../../../core/utils/deferred");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _selection = _interopRequireDefault(require("../../ui/selection/selection.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeferredStrategy extends _selection.default {
  getSelectedItems() {
    return this._loadFilteredData(this.options.selectionFilter);
  }
  getSelectedItemKeys() {
    const d = (0, _deferred.Deferred)();
    const key = this.options.key();
    const select = (0, _type.isString)(key) ? [key] : key;
    const getKey = item => this.options.keyOf(item);
    this._loadFilteredData(this.options.selectionFilter, null, select).done(items => {
      const keys = (Array.isArray(items) ? items : []).map(getKey);
      d.resolve(keys);
    }).fail(error => {
      // @ts-expect-error error
      d.reject(error);
    });
    return d.promise();
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll) {
    if (isSelectAll) {
      const filter = this.options.filter();
      const needResetSelectionFilter = !filter || JSON.stringify(filter) === JSON.stringify(this.options.selectionFilter) && isDeselect;
      if (needResetSelectionFilter) {
        this._setOption('selectionFilter', isDeselect ? [] : null);
      } else {
        this._addSelectionFilter(isDeselect, filter, isSelectAll);
      }
    } else {
      if (!preserve) {
        this._setOption('selectionFilter', []);
      }
      keys.forEach(key => {
        if (isDeselect) {
          this.removeSelectedItem(key);
        } else {
          this.addSelectedItem(key, isSelectAll, !preserve);
        }
      });
    }
    this.onSelectionChanged();
    return (0, _deferred.Deferred)().resolve();
  }
  setSelectedItems(keys) {
    this._setOption('selectionFilter', null);
    keys.forEach(key => {
      this.addSelectedItem(key);
    });
  }
  isItemDataSelected(itemData) {
    return this.isItemKeySelected(itemData);
  }
  isItemKeySelected(itemData) {
    const {
      selectionFilter
    } = this.options;
    if (!selectionFilter) {
      return true;
    }
    const queryParams = this._getQueryParams();
    // @ts-expect-error dataQuery
    return !!(0, _query.default)([itemData], queryParams).filter(selectionFilter).toArray().length;
  }
  _getKeyExpr() {
    const keyField = this.options.key();
    if (Array.isArray(keyField) && keyField.length === 1) {
      return keyField[0];
    }
    return keyField;
  }
  _normalizeKey(key) {
    const keyExpr = this.options.key();
    if (Array.isArray(keyExpr) && keyExpr.length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return key[keyExpr[0]];
    }
    return key;
  }
  _getFilterByKey(key) {
    const keyField = this._getKeyExpr();
    let filter = [keyField, '=', this._normalizeKey(key)];
    if (Array.isArray(keyField)) {
      filter = [];
      for (let i = 0; i < keyField.length; i += 1) {
        filter.push([keyField[i], '=', key[keyField[i]]]);
        if (i !== keyField.length - 1) {
          filter.push('and');
        }
      }
    }
    return filter;
  }
  addSelectedItem(key, isSelectAll, skipFilter) {
    const filter = this._getFilterByKey(key);
    this._addSelectionFilter(false, filter, isSelectAll, skipFilter);
  }
  removeSelectedItem(key) {
    const filter = this._getFilterByKey(key);
    this._addSelectionFilter(true, filter);
  }
  validate() {
    const {
      key
    } = this.options;
    if (key && key() === undefined) {
      throw _ui.default.Error('E1042', 'Deferred selection');
    }
  }
  _findSubFilter(selectionFilter, filter) {
    if (!selectionFilter) return -1;
    const filterString = JSON.stringify(filter);
    for (let index = 0; index < selectionFilter.length; index += 1) {
      const subFilter = selectionFilter[index];
      if (subFilter && JSON.stringify(subFilter) === filterString) {
        return index;
      }
    }
    return -1;
  }
  _isLastSubFilter(selectionFilter, filter) {
    if (selectionFilter && filter) {
      return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || this._findSubFilter([selectionFilter], filter) === 0;
    }
    return false;
  }
  _addFilterOperator(selectionFilter, filterOperator) {
    let filter = selectionFilter;
    if (filter.length > 1 && (0, _type.isString)(filter[1]) && filter[1] !== filterOperator) {
      filter = [filter];
    }
    if (Array.isArray(filter) && filter.length) {
      filter.push(filterOperator);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return filter;
  }
  _denormalizeFilter(filter) {
    let resultFilter = filter;
    if (resultFilter && (0, _type.isString)(resultFilter[0])) {
      resultFilter = [resultFilter];
    }
    return resultFilter;
  }
  _isOnlyNegativeFiltersLeft(filters) {
    return filters.every((filterItem, i) => {
      if (i % 2 === 0) {
        return Array.isArray(filterItem) && filterItem[0] === '!';
      }
      return filterItem === 'and';
    });
  }
  _addSelectionFilter(isDeselect, filter, isSelectAll, skipFilter) {
    var _selectionFilter;
    const currentOperation = isDeselect ? 'and' : 'or';
    let needAddFilter = true;
    let selectionFilter = this.options.selectionFilter || [];
    selectionFilter = this._denormalizeFilter(selectionFilter);
    if ((_selectionFilter = selectionFilter) !== null && _selectionFilter !== void 0 && _selectionFilter.length && !skipFilter) {
      const removedIndex = this._removeSameFilter(selectionFilter, filter, isDeselect, isSelectAll);
      const filterIndex = this._removeSameFilter(selectionFilter, filter, !isDeselect);
      const shouldCleanFilter = isDeselect && (removedIndex !== -1 || filterIndex !== -1) && this._isOnlyNegativeFiltersLeft(selectionFilter);
      if (shouldCleanFilter) {
        selectionFilter = [];
      }
      const isKeyOperatorsAfterRemoved = this._isKeyFilter(filter) && this._hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex);
      needAddFilter = !!(filter !== null && filter !== void 0 && filter.length) && !isKeyOperatorsAfterRemoved;
    }
    if (needAddFilter) {
      selectionFilter = this._addFilterOperator(selectionFilter, currentOperation);
      if (Array.isArray(selectionFilter) && filter) {
        const currentFilter = isDeselect ? ['!', filter] : filter;
        selectionFilter.push(currentFilter);
      }
    }
    selectionFilter = this._normalizeFilter(selectionFilter);
    this._setOption('selectionFilter', !isDeselect && !selectionFilter.length ? null : selectionFilter);
  }
  _normalizeFilter(filter) {
    let resultFilter = filter;
    if (resultFilter && resultFilter.length === 1) {
      [resultFilter] = resultFilter;
    }
    return resultFilter;
  }
  _removeFilterByIndex(filter, filterIndex, isSelectAll) {
    const operation = filter[1];
    if (filterIndex > 0) {
      filter.splice(filterIndex - 1, 2);
    } else {
      filter.splice(filterIndex, 2);
    }
    if (isSelectAll && operation === 'and') {
      filter.splice(0, filter.length);
    }
  }
  _isSimpleKeyFilter(filter, key) {
    return (filter === null || filter === void 0 ? void 0 : filter.length) === 3 && filter[0] === key && filter[1] === '=';
  }
  _isKeyFilter(filter) {
    if ((filter === null || filter === void 0 ? void 0 : filter.length) === 2 && (filter === null || filter === void 0 ? void 0 : filter[0]) === '!') {
      return this._isKeyFilter(filter[1]);
    }
    const keyField = this._getKeyExpr();
    if (Array.isArray(keyField)) {
      if ((filter === null || filter === void 0 ? void 0 : filter.length) !== keyField.length * 2 - 1) {
        return false;
      }
      for (let i = 0; i < keyField.length; i += 1) {
        if (i > 0 && (filter === null || filter === void 0 ? void 0 : filter[i * 2 - 1]) !== 'and') {
          return false;
        }
        if (!this._isSimpleKeyFilter(filter === null || filter === void 0 ? void 0 : filter[i * 2], keyField[i])) {
          return false;
        }
      }
      return true;
    }
    return this._isSimpleKeyFilter(filter, keyField);
  }
  _hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex) {
    if (filterIndex >= 0) {
      for (let i = filterIndex; i < selectionFilter.length; i += 1) {
        if (typeof selectionFilter[i] !== 'string' && !this._isKeyFilter(selectionFilter[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  _removeSameFilter(selectionFilter, filter, inverted, isSelectAll) {
    const sameFilter = inverted ? ['!', filter] : filter;
    if (JSON.stringify(sameFilter) === JSON.stringify(selectionFilter)) {
      selectionFilter.splice(0, selectionFilter.length);
      return 0;
    }
    const filterIndex = this._findSubFilter(selectionFilter, sameFilter);
    if (filterIndex >= 0) {
      this._removeFilterByIndex(selectionFilter, filterIndex, isSelectAll);
      return filterIndex;
    }
    for (let i = 0; i < selectionFilter.length; i += 1) {
      if (Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2) {
        const innerFilterIndex = this._removeSameFilter(selectionFilter[i], sameFilter, false, isSelectAll);
        if (innerFilterIndex >= 0) {
          // eslint-disable-next-line max-depth
          if (!selectionFilter[i].length) {
            this._removeFilterByIndex(selectionFilter, i, isSelectAll);
          } else if (selectionFilter[i].length === 1) {
            const [firstFilter] = selectionFilter[i];
            selectionFilter[i] = firstFilter;
          }
          return innerFilterIndex;
        }
      }
    }
    return -1;
  }
  getSelectAllState() {
    const filter = this.options.filter();
    let {
      selectionFilter
    } = this.options;
    if (!selectionFilter) return true;
    if (!selectionFilter.length) return false;
    if (!(filter !== null && filter !== void 0 && filter.length)) return undefined;
    selectionFilter = this._denormalizeFilter(selectionFilter);
    if (this._isLastSubFilter(selectionFilter, filter)) {
      return true;
    }
    if (this._isLastSubFilter(selectionFilter, ['!', filter])) {
      return false;
    }
    return undefined;
  }
  loadSelectedItemsWithFilter() {
    const componentFilter = this.options.filter();
    const {
      selectionFilter
    } = this.options;
    const filter = componentFilter ? [componentFilter, 'and', selectionFilter] : selectionFilter;
    return this._loadFilteredData(filter);
  }
  _onePageSelectAll(isDeselect) {
    this._selectAllPlainItems(isDeselect);
    this.onSelectionChanged();
    return (0, _deferred.Deferred)().resolve();
  }
}
exports.default = DeferredStrategy;
