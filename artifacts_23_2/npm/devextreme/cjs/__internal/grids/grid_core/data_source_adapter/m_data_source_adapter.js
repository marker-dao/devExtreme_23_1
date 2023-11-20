/**
* DevExtreme (cjs/__internal/grids/grid_core/data_source_adapter/m_data_source_adapter.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _callbacks = _interopRequireDefault(require("../../../../core/utils/callbacks"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _array_store = _interopRequireDefault(require("../../../../data/array_store"));
var _array_utils = require("../../../../data/array_utils");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable @typescript-eslint/no-dynamic-delete */ // @ts-expect-error
var _default = _m_modules.default.Controller.inherit(function () {
  function cloneItems(items, groupCount) {
    if (items) {
      items = items.slice(0);
      if (groupCount) {
        for (let i = 0; i < items.length; i++) {
          items[i] = (0, _extend.extend)({
            key: items[i].key
          }, items[i]);
          items[i].items = cloneItems(items[i].items, groupCount - 1);
        }
      }
    }
    return items;
  }
  function calculateOperationTypes(loadOptions, lastLoadOptions, isFullReload) {
    let operationTypes = {
      reload: true,
      fullReload: true
    };
    if (lastLoadOptions) {
      operationTypes = {
        sorting: !_m_utils.default.equalSortParameters(loadOptions.sort, lastLoadOptions.sort),
        grouping: !_m_utils.default.equalSortParameters(loadOptions.group, lastLoadOptions.group, true),
        groupExpanding: !_m_utils.default.equalSortParameters(loadOptions.group, lastLoadOptions.group) || lastLoadOptions.groupExpand,
        filtering: !_m_utils.default.equalFilterParameters(loadOptions.filter, lastLoadOptions.filter),
        pageIndex: loadOptions.pageIndex !== lastLoadOptions.pageIndex,
        skip: loadOptions.skip !== lastLoadOptions.skip,
        take: loadOptions.take !== lastLoadOptions.take,
        pageSize: loadOptions.pageSize !== lastLoadOptions.pageSize,
        fullReload: isFullReload,
        reload: false,
        paging: false
      };
      operationTypes.reload = isFullReload || operationTypes.sorting || operationTypes.grouping || operationTypes.filtering;
      operationTypes.paging = operationTypes.pageIndex || operationTypes.pageSize || operationTypes.take;
    }
    return operationTypes;
  }
  function executeTask(action, timeout) {
    if ((0, _type.isDefined)(timeout)) {
      (0, _common.executeAsync)(action, timeout);
    } else {
      action();
    }
  }
  function createEmptyCachedData() {
    return {
      items: {}
    };
  }
  function getPageDataFromCache(options, updatePaging) {
    const groupCount = _m_utils.default.normalizeSortingInfo(options.group || options.storeLoadOptions.group || options.loadOptions.group).length;
    const items = [];
    if (fillItemsFromCache(items, options, groupCount)) {
      return items;
    }
    if (updatePaging) {
      updatePagingOptionsByCache(items, options, groupCount);
    }
  }
  function fillItemsFromCache(items, options, groupCount, fromEnd) {
    var _a, _b, _c, _d, _e;
    const {
      storeLoadOptions
    } = options;
    const take = (_b = (_a = options.take) !== null && _a !== void 0 ? _a : storeLoadOptions.take) !== null && _b !== void 0 ? _b : 0;
    const cachedItems = (_c = options.cachedData) === null || _c === void 0 ? void 0 : _c.items;
    if (take && cachedItems) {
      const skip = (_e = (_d = options.skip) !== null && _d !== void 0 ? _d : storeLoadOptions.skip) !== null && _e !== void 0 ? _e : 0;
      for (let i = 0; i < take; i++) {
        const localIndex = fromEnd ? take - 1 - i : i;
        const cacheItemIndex = localIndex + skip;
        const cacheItem = cachedItems[cacheItemIndex];
        if (cacheItem === undefined && cacheItemIndex in cachedItems) {
          return true;
        }
        const item = getItemFromCache(options, cacheItem, groupCount, localIndex, take);
        if (item) {
          items.push(item);
        } else {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  function getItemFromCache(options, cacheItem, groupCount, index, take) {
    if (groupCount && cacheItem) {
      const skips = index === 0 && options.skips || [];
      const takes = index === take - 1 && options.takes || [];
      return getGroupItemFromCache(cacheItem, groupCount, skips, takes);
    }
    return cacheItem;
  }
  function getGroupItemFromCache(cacheItem, groupCount, skips, takes) {
    if (groupCount && cacheItem) {
      const result = _extends({}, cacheItem);
      const skip = skips[0] || 0;
      const take = takes[0];
      const {
        items
      } = cacheItem;
      if (items) {
        if (take === undefined && !items[skip]) {
          return;
        }
        result.items = [];
        if (skips.length) {
          result.isContinuation = true;
        }
        if (take) {
          result.isContinuationOnNextPage = cacheItem.count > take;
        }
        for (let i = 0; take === undefined ? items[i + skip] : i < take; i++) {
          const childCacheItem = items[i + skip];
          const isLast = i + 1 === take;
          const item = getGroupItemFromCache(childCacheItem, groupCount - 1, i === 0 ? skips.slice(1) : [], isLast ? takes.slice(1) : []);
          if (item !== undefined) {
            result.items.push(item);
          } else {
            return;
          }
        }
      }
      return result;
    }
    return cacheItem;
  }
  function updatePagingOptionsByCache(cacheItemsFromBegin, options, groupCount) {
    var _a, _b;
    const cacheItemBeginCount = cacheItemsFromBegin.length;
    const {
      storeLoadOptions
    } = options;
    if (storeLoadOptions.skip !== undefined && storeLoadOptions.take && !groupCount) {
      const cacheItemsFromEnd = [];
      fillItemsFromCache(cacheItemsFromEnd, options, groupCount, true);
      const cacheItemEndCount = cacheItemsFromEnd.length;
      if (cacheItemBeginCount || cacheItemEndCount) {
        options.skip = (_a = options.skip) !== null && _a !== void 0 ? _a : storeLoadOptions.skip;
        options.take = (_b = options.take) !== null && _b !== void 0 ? _b : storeLoadOptions.take;
      }
      if (cacheItemBeginCount) {
        storeLoadOptions.skip += cacheItemBeginCount;
        storeLoadOptions.take -= cacheItemBeginCount;
        options.cachedDataPartBegin = cacheItemsFromBegin;
      }
      if (cacheItemEndCount) {
        storeLoadOptions.take -= cacheItemEndCount;
        options.cachedDataPartEnd = cacheItemsFromEnd.reverse();
      }
    }
  }
  function setPageDataToCache(options, data, groupCount) {
    var _a, _b, _c, _d;
    const {
      storeLoadOptions
    } = options;
    const skip = (_b = (_a = options.skip) !== null && _a !== void 0 ? _a : storeLoadOptions.skip) !== null && _b !== void 0 ? _b : 0;
    const take = (_d = (_c = options.take) !== null && _c !== void 0 ? _c : storeLoadOptions.take) !== null && _d !== void 0 ? _d : 0;
    for (let i = 0; i < take; i++) {
      const globalIndex = i + skip;
      const cacheItems = options.cachedData.items;
      const skips = i === 0 && options.skips || [];
      cacheItems[globalIndex] = getCacheItem(cacheItems[globalIndex], data[i], groupCount, skips);
    }
  }
  function getCacheItem(cacheItem, loadedItem, groupCount, skips) {
    if (groupCount && loadedItem) {
      const result = _extends({}, loadedItem);
      delete result.isContinuation;
      delete result.isContinuationOnNextPage;
      const skip = skips[0] || 0;
      if (loadedItem.items) {
        result.items = (cacheItem === null || cacheItem === void 0 ? void 0 : cacheItem.items) || {};
        loadedItem.items.forEach((item, index) => {
          const globalIndex = index + skip;
          const childSkips = index === 0 ? skips.slice(1) : [];
          result.items[globalIndex] = getCacheItem(result.items[globalIndex], item, groupCount - 1, childSkips);
        });
      }
      return result;
    }
    return loadedItem;
  }
  const members = {
    init(dataSource, remoteOperations) {
      const that = this;
      that._dataSource = dataSource;
      that._remoteOperations = remoteOperations || {};
      that._isLastPage = !dataSource.isLastPage();
      that._hasLastPage = false;
      that._currentTotalCount = 0;
      that._cachedData = createEmptyCachedData();
      that._lastOperationTypes = {};
      that._eventsStrategy = dataSource._eventsStrategy;
      that._totalCountCorrection = 0;
      that._isLoadingAll = false;
      that.changed = (0, _callbacks.default)();
      that.loadingChanged = (0, _callbacks.default)();
      that.loadError = (0, _callbacks.default)();
      that.customizeStoreLoadOptions = (0, _callbacks.default)();
      that.changing = (0, _callbacks.default)();
      that.pushed = (0, _callbacks.default)();
      that._dataChangedHandler = that._handleDataChanged.bind(that);
      that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
      that._dataLoadedHandler = that._handleDataLoaded.bind(that);
      that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
      that._loadErrorHandler = that._handleLoadError.bind(that);
      that._pushHandler = that._handlePush.bind(that);
      that._changingHandler = that._handleChanging.bind(that);
      dataSource.on('changed', that._dataChangedHandler);
      dataSource.on('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
      dataSource.on('customizeLoadResult', that._dataLoadedHandler);
      dataSource.on('loadingChanged', that._loadingChangedHandler);
      dataSource.on('loadError', that._loadErrorHandler);
      dataSource.on('changing', that._changingHandler);
      dataSource.store().on('beforePush', that._pushHandler);
      (0, _iterator.each)(dataSource, (memberName, member) => {
        if (!that[memberName] && (0, _type.isFunction)(member)) {
          that[memberName] = function () {
            return this._dataSource[memberName].apply(this._dataSource, arguments);
          };
        }
      });
    },
    remoteOperations() {
      return this._remoteOperations;
    },
    dispose(isSharedDataSource) {
      const that = this;
      const dataSource = that._dataSource;
      const store = dataSource.store();
      dataSource.off('changed', that._dataChangedHandler);
      dataSource.off('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
      dataSource.off('customizeLoadResult', that._dataLoadedHandler);
      dataSource.off('loadingChanged', that._loadingChangedHandler);
      dataSource.off('loadError', that._loadErrorHandler);
      dataSource.off('changing', that._changingHandler);
      store && store.off('beforePush', that._pushHandler);
      if (!isSharedDataSource) {
        dataSource.dispose();
      }
    },
    refresh(options, operationTypes) {
      const that = this;
      const dataSource = that._dataSource;
      if (operationTypes.reload) {
        that.resetCurrentTotalCount();
        that._isLastPage = !dataSource.paginate();
        that._hasLastPage = that._isLastPage;
      }
    },
    resetCurrentTotalCount() {
      this._currentTotalCount = 0;
      this._totalCountCorrection = 0;
    },
    resetCache() {
      this._cachedStoreData = undefined;
      this._cachedPagingData = undefined;
    },
    resetPagesCache() {
      this._cachedData = createEmptyCachedData();
    },
    _needClearStoreDataCache() {
      const remoteOperations = this.remoteOperations();
      const operationTypes = calculateOperationTypes(this._lastLoadOptions || {}, {});
      const isLocalOperations = Object.keys(remoteOperations).every(operationName => !operationTypes[operationName] || !remoteOperations[operationName]);
      return !isLocalOperations;
    },
    push(changes, fromStore) {
      const store = this.store();
      if (this._needClearStoreDataCache()) {
        this._cachedStoreData = undefined;
      }
      this._cachedPagingData = undefined;
      this.resetPagesCache(true);
      if (this._cachedStoreData) {
        // @ts-expect-error
        (0, _array_utils.applyBatch)({
          keyInfo: store,
          data: this._cachedStoreData,
          changes
        });
      }
      if (!fromStore) {
        this._applyBatch(changes);
      }
      this.pushed.fire(changes);
    },
    getDataIndexGetter() {
      if (!this._dataIndexGetter) {
        let indexByKey;
        let storeData;
        const store = this.store();
        this._dataIndexGetter = data => {
          const isCacheUpdated = storeData && storeData !== this._cachedStoreData;
          if (!indexByKey || isCacheUpdated) {
            storeData = this._cachedStoreData || [];
            indexByKey = {};
            for (let i = 0; i < storeData.length; i++) {
              indexByKey[(0, _common.getKeyHash)(store.keyOf(storeData[i]))] = i;
            }
          }
          return indexByKey[(0, _common.getKeyHash)(store.keyOf(data))];
        };
      }
      return this._dataIndexGetter;
    },
    _getKeyInfo() {
      return this.store();
    },
    _needToCopyDataObject() {
      return true;
    },
    _applyBatch(changes, fromStore) {
      const keyInfo = this._getKeyInfo();
      const dataSource = this._dataSource;
      const groupCount = _m_utils.default.normalizeSortingInfo(this.group()).length;
      const isReshapeMode = this.option('editing.refreshMode') === 'reshape';
      const isVirtualMode = this.option('scrolling.mode') === 'virtual';
      changes = changes.filter(change => !dataSource.paginate() || change.type !== 'insert' || change.index !== undefined);
      const getItemCount = () => groupCount ? this.itemsCount() : this.items().length;
      const oldItemCount = getItemCount();
      // @ts-expect-error
      (0, _array_utils.applyBatch)({
        keyInfo,
        data: this._items,
        changes,
        groupCount,
        useInsertIndex: true,
        skipCopying: !this._needToCopyDataObject()
      });
      // @ts-expect-error
      (0, _array_utils.applyBatch)({
        keyInfo,
        data: dataSource.items(),
        changes,
        groupCount,
        useInsertIndex: true,
        skipCopying: !this._needToCopyDataObject()
      });
      const needUpdateTotalCountCorrection = this._currentTotalCount > 0 || (fromStore || !isReshapeMode) && isVirtualMode;
      if (needUpdateTotalCountCorrection) {
        this._totalCountCorrection += getItemCount() - oldItemCount;
      }
      changes.splice(0, changes.length);
    },
    _handlePush(_ref) {
      let {
        changes
      } = _ref;
      this.push(changes, true);
    },
    _handleChanging(e) {
      this.changing.fire(e);
      this._applyBatch(e.changes, true);
    },
    _needCleanCacheByOperation(operationType, remoteOperations) {
      const operationTypesByOrder = ['filtering', 'sorting', 'paging'];
      const operationTypeIndex = operationTypesByOrder.indexOf(operationType);
      const currentOperationTypes = operationTypeIndex >= 0 ? operationTypesByOrder.slice(operationTypeIndex) : [operationType];
      return currentOperationTypes.some(operationType => remoteOperations[operationType]);
    },
    _customizeRemoteOperations(options, operationTypes) {
      let cachedStoreData = this._cachedStoreData;
      let cachedPagingData = this._cachedPagingData;
      let cachedData = this._cachedData;
      if (options.storeLoadOptions.filter && !options.remoteOperations.filtering || options.storeLoadOptions.sort && !options.remoteOperations.sorting) {
        options.remoteOperations = {
          filtering: options.remoteOperations.filtering,
          summary: options.remoteOperations.summary
        };
      }
      if (operationTypes.fullReload) {
        cachedStoreData = undefined;
        cachedPagingData = undefined;
        cachedData = createEmptyCachedData();
      } else {
        if (operationTypes.reload) {
          cachedPagingData = undefined;
          cachedData = createEmptyCachedData();
        } else if (operationTypes.groupExpanding) {
          cachedData = createEmptyCachedData();
        }
        (0, _iterator.each)(operationTypes, (operationType, value) => {
          if (value && this._needCleanCacheByOperation(operationType, options.remoteOperations)) {
            cachedStoreData = undefined;
            cachedPagingData = undefined;
          }
        });
      }
      if (cachedPagingData) {
        options.remoteOperations.paging = false;
      }
      options.cachedStoreData = cachedStoreData;
      options.cachedPagingData = cachedPagingData;
      options.cachedData = cachedData;
      if (!options.isCustomLoading) {
        this._cachedStoreData = cachedStoreData;
        this._cachedPagingData = cachedPagingData;
        this._cachedData = cachedData;
      }
    },
    _handleCustomizeStoreLoadOptions(options) {
      var _a;
      this._handleDataLoading(options);
      if (!(((_a = options.data) === null || _a === void 0 ? void 0 : _a.length) === 0)) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        options.data = getPageDataFromCache(options, true) || options.cachedStoreData;
      }
    },
    _handleDataLoading(options) {
      const dataSource = this._dataSource;
      const lastLoadOptions = this._lastLoadOptions;
      this.customizeStoreLoadOptions.fire(options);
      options.delay = this.option('loadingTimeout');
      options.originalStoreLoadOptions = options.storeLoadOptions;
      options.remoteOperations = (0, _extend.extend)({}, this.remoteOperations());
      const isFullReload = !this.isLoaded() && !this._isRefreshing;
      if (this.option('integrationOptions.renderedOnServer') && !this.isLoaded()) {
        options.delay = undefined;
      }
      const loadOptions = (0, _extend.extend)({
        pageIndex: this.pageIndex(),
        pageSize: this.pageSize()
      }, options.storeLoadOptions);
      const operationTypes = calculateOperationTypes(loadOptions, lastLoadOptions, isFullReload);
      this._customizeRemoteOperations(options, operationTypes);
      if (!options.isCustomLoading) {
        const isRefreshing = this._isRefreshing;
        options.pageIndex = dataSource.pageIndex();
        options.lastLoadOptions = loadOptions;
        options.operationTypes = operationTypes;
        this._loadingOperationTypes = operationTypes;
        this._isRefreshing = true;
        (0, _deferred.when)(isRefreshing || this._isRefreshed || this.refresh(options, operationTypes)).done(() => {
          if (this._lastOperationId === options.operationId) {
            this._isRefreshed = true;
            this.load().always(() => {
              this._isRefreshed = false;
            });
          }
        }).fail(() => {
          dataSource.cancel(options.operationId);
        }).always(() => {
          this._isRefreshing = false;
        });
        dataSource.cancel(this._lastOperationId);
        this._lastOperationId = options.operationId;
        if (this._isRefreshing) {
          dataSource.cancel(this._lastOperationId);
        }
      }
      this._handleDataLoadingCore(options);
    },
    _handleDataLoadingCore(options) {
      const {
        remoteOperations
      } = options;
      options.loadOptions = {};
      const cachedExtra = options.cachedData.extra;
      const localLoadOptionNames = {
        filter: !remoteOperations.filtering,
        sort: !remoteOperations.sorting,
        group: !remoteOperations.grouping,
        summary: !remoteOperations.summary,
        skip: !remoteOperations.paging,
        take: !remoteOperations.paging,
        requireTotalCount: cachedExtra && 'totalCount' in cachedExtra || !remoteOperations.paging,
        langParams: !remoteOperations.filtering || !remoteOperations.sorting
      };
      (0, _iterator.each)(options.storeLoadOptions, (optionName, optionValue) => {
        if (localLoadOptionNames[optionName]) {
          options.loadOptions[optionName] = optionValue;
          delete options.storeLoadOptions[optionName];
        }
      });
      if (cachedExtra) {
        options.extra = cachedExtra;
      }
    },
    _handleDataLoaded(options) {
      var _a, _b;
      const {
        loadOptions
      } = options;
      const localPaging = options.remoteOperations && !options.remoteOperations.paging;
      const {
        cachedData
      } = options;
      const {
        storeLoadOptions
      } = options;
      const needCache = this.option('cacheEnabled') !== false && storeLoadOptions;
      const needPageCache = needCache && !options.isCustomLoading && cachedData && (!localPaging || storeLoadOptions.group);
      const needPagingCache = needCache && localPaging;
      const needStoreCache = needPagingCache && !options.isCustomLoading;
      if (!loadOptions) {
        this._dataSource.cancel(options.operationId);
        return;
      }
      if (localPaging) {
        options.skip = loadOptions.skip;
        options.take = loadOptions.take;
        delete loadOptions.skip;
        delete loadOptions.take;
      }
      if (loadOptions.group) {
        loadOptions.group = options.group || loadOptions.group;
      }
      const groupCount = _m_utils.default.normalizeSortingInfo(options.group || storeLoadOptions.group || loadOptions.group).length;
      if (options.cachedDataPartBegin) {
        options.data = options.cachedDataPartBegin.concat(options.data);
      }
      if (options.cachedDataPartEnd) {
        options.data = options.data.concat(options.cachedDataPartEnd);
      }
      if (!needPageCache || !getPageDataFromCache(options)) {
        if (needPagingCache && options.cachedPagingData) {
          options.data = cloneItems(options.cachedPagingData, groupCount);
        } else {
          if (needStoreCache) {
            if (!this._cachedStoreData) {
              this._cachedStoreData = cloneItems(options.data, _m_utils.default.normalizeSortingInfo(storeLoadOptions.group).length);
            } else if (options.mergeStoreLoadData) {
              options.data = this._cachedStoreData = this._cachedStoreData.concat(options.data);
            }
          }
          // @ts-expect-error
          new _array_store.default(options.data).load(loadOptions).done(data => {
            options.data = data;
            if (needStoreCache) {
              this._cachedPagingData = cloneItems(options.data, groupCount);
            }
          }).fail(error => {
            // @ts-expect-error
            options.data = new _deferred.Deferred().reject(error);
          });
        }
        if (loadOptions.requireTotalCount && localPaging) {
          options.extra = (0, _type.isPlainObject)(options.extra) ? options.extra : {};
          options.extra.totalCount = options.data.length;
        }
        if (options.extra && options.extra.totalCount >= 0 && (storeLoadOptions.requireTotalCount === false || loadOptions.requireTotalCount === false)) {
          options.extra.totalCount = -1;
        }
        if (!loadOptions.data && (storeLoadOptions.requireTotalCount || ((_b = (_a = options.extra) === null || _a === void 0 ? void 0 : _a.totalCount) !== null && _b !== void 0 ? _b : -1) >= 0)) {
          this._totalCountCorrection = 0;
        }
        this._handleDataLoadedCore(options);
        if (needPageCache) {
          cachedData.extra = cachedData.extra || (0, _extend.extend)({}, options.extra);
          (0, _deferred.when)(options.data).done(data => {
            setPageDataToCache(options, data, groupCount);
          });
        }
      }
      (0, _deferred.when)(options.data).done(() => {
        if (options.lastLoadOptions) {
          this._lastLoadOptions = options.lastLoadOptions;
          Object.keys(options.operationTypes).forEach(operationType => {
            this._lastOperationTypes[operationType] = this._lastOperationTypes[operationType] || options.operationTypes[operationType];
          });
        }
      });
      options.storeLoadOptions = options.originalStoreLoadOptions;
    },
    _handleDataLoadedCore(options) {
      if (options.remoteOperations && !options.remoteOperations.paging && Array.isArray(options.data)) {
        if (options.skip !== undefined) {
          options.data = options.data.slice(options.skip);
        }
        if (options.take !== undefined) {
          options.data = options.data.slice(0, options.take);
        }
      }
    },
    _handleLoadingChanged(isLoading) {
      this.loadingChanged.fire(isLoading);
    },
    _handleLoadError(error) {
      this.loadError.fire(error);
      this.changed.fire({
        changeType: 'loadError',
        error
      });
    },
    _loadPageSize() {
      return this.pageSize();
    },
    _handleDataChanged(args) {
      let currentTotalCount;
      const dataSource = this._dataSource;
      let isLoading = false;
      const isDataLoading = !args || (0, _type.isDefined)(args.changeType);
      const itemsCount = this.itemsCount();
      if (isDataLoading) {
        this._isLastPage = !itemsCount || !this._loadPageSize() || itemsCount < this._loadPageSize();
        if (this._isLastPage) {
          this._hasLastPage = true;
        }
      }
      if (dataSource.totalCount() >= 0) {
        if (dataSource.pageIndex() >= this.pageCount()) {
          dataSource.pageIndex(this.pageCount() - 1);
          this.pageIndex(dataSource.pageIndex());
          this.resetPagesCache();
          dataSource.load();
          isLoading = true;
        }
      } else if (isDataLoading) {
        currentTotalCount = dataSource.pageIndex() * this.pageSize() + itemsCount;
        if (currentTotalCount > this._currentTotalCount) {
          this._currentTotalCount = currentTotalCount;
          if (dataSource.pageIndex() === 0 || !this.option('scrolling.legacyMode')) {
            this._totalCountCorrection = 0;
          }
        }
        if (itemsCount === 0 && dataSource.pageIndex() >= this.pageCount()) {
          dataSource.pageIndex(this.pageCount() - 1);
          if (this.option('scrolling.mode') !== 'infinite') {
            dataSource.load();
            isLoading = true;
          }
        }
      }
      if (!isLoading) {
        this._operationTypes = this._lastOperationTypes;
        this._lastOperationTypes = {};
        this.component._optionCache = {};
        this.changed.fire(args);
        this.component._optionCache = undefined;
      }
    },
    _scheduleCustomLoadCallbacks(deferred) {
      const that = this;
      that._isCustomLoading = true;
      deferred.always(() => {
        that._isCustomLoading = false;
      });
    },
    loadingOperationTypes() {
      return this._loadingOperationTypes;
    },
    operationTypes() {
      return this._operationTypes;
    },
    lastLoadOptions() {
      return this._lastLoadOptions || {};
    },
    isLastPage() {
      return this._isLastPage;
    },
    _dataSourceTotalCount() {
      return this._dataSource.totalCount();
    },
    totalCount() {
      // eslint-disable-next-line radix
      return parseInt((this._currentTotalCount || this._dataSourceTotalCount()) + this._totalCountCorrection);
    },
    totalCountCorrection() {
      return this._totalCountCorrection;
    },
    itemsCount() {
      return this._dataSource.items().length;
    },
    totalItemsCount() {
      return this.totalCount();
    },
    pageSize() {
      const dataSource = this._dataSource;
      if (!arguments.length && !dataSource.paginate()) {
        return 0;
      }
      return dataSource.pageSize.apply(dataSource, arguments);
    },
    pageCount() {
      const that = this;
      const count = that.totalItemsCount() - that._totalCountCorrection;
      const pageSize = that.pageSize();
      if (pageSize && count > 0) {
        return Math.max(1, Math.ceil(count / pageSize));
      }
      return 1;
    },
    hasKnownLastPage() {
      return this._hasLastPage || this._dataSource.totalCount() >= 0;
    },
    loadFromStore(loadOptions, store) {
      const dataSource = this._dataSource;
      // @ts-expect-error
      const d = new _deferred.Deferred();
      if (!dataSource) return;
      store = store || dataSource.store();
      store.load(loadOptions).done((data, extra) => {
        if (data && !Array.isArray(data) && Array.isArray(data.data)) {
          extra = data;
          data = data.data;
        }
        d.resolve(data, extra);
      }).fail(d.reject);
      return d;
    },
    isCustomLoading() {
      return !!this._isCustomLoading;
    },
    load(options) {
      const that = this;
      const dataSource = that._dataSource;
      // @ts-expect-error
      const d = new _deferred.Deferred();
      if (options) {
        const store = dataSource.store();
        const dataSourceLoadOptions = dataSource.loadOptions();
        const loadResult = {
          storeLoadOptions: (0, _extend.extend)({}, options, {
            langParams: dataSourceLoadOptions === null || dataSourceLoadOptions === void 0 ? void 0 : dataSourceLoadOptions.langParams
          }),
          isCustomLoading: true
        };
        (0, _iterator.each)(store._customLoadOptions() || [], (_, optionName) => {
          if (!(optionName in loadResult.storeLoadOptions)) {
            loadResult.storeLoadOptions[optionName] = dataSourceLoadOptions[optionName];
          }
        });
        this._isLoadingAll = options.isLoadingAll;
        that._scheduleCustomLoadCallbacks(d);
        dataSource._scheduleLoadCallbacks(d);
        that._handleCustomizeStoreLoadOptions(loadResult);
        executeTask(() => {
          if (!dataSource.store()) {
            return d.reject('canceled');
          }
          (0, _deferred.when)(loadResult.data || that.loadFromStore(loadResult.storeLoadOptions)).done((data, extra) => {
            loadResult.data = data;
            loadResult.extra = extra || {};
            that._handleDataLoaded(loadResult);
            if (options.requireTotalCount && loadResult.extra.totalCount === undefined) {
              loadResult.extra.totalCount = store.totalCount(loadResult.storeLoadOptions);
            }
            // TODO map function??
            (0, _deferred.when)(loadResult.data, loadResult.extra.totalCount).done((data, totalCount) => {
              loadResult.extra.totalCount = totalCount;
              d.resolve(data, loadResult.extra);
            }).fail(d.reject);
          }).fail(d.reject);
        }, that.option('loadingTimeout'));
        return d.fail(function () {
          that._eventsStrategy.fireEvent('loadError', arguments);
        }).always(() => {
          this._isLoadingAll = false;
        }).promise();
      }
      return dataSource.load();
    },
    reload(full) {
      return full ? this._dataSource.reload() : this._dataSource.load();
    },
    getCachedStoreData() {
      return this._cachedStoreData;
    }
  };
  return members;
}());
exports.default = _default;
