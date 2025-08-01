/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/data_controller.js)
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
exports.DataController = void 0;
var _array_store = _interopRequireDefault(require("../../../../../common/data/array_store"));
var _deferred = require("../../../../../core/utils/deferred");
var _type = require("../../../../../core/utils/type");
var _signalsCore = require("@preact/signals-core");
var _m_common = require("../../../../core/utils/m_common");
var _promise = require("../../../../core/utils/promise");
var _m_utils = _interopRequireDefault(require("../../../grid_core/m_utils"));
var _columns_controller = require("../columns_controller/columns_controller");
var _error_controller = require("../error_controller/error_controller");
var _filter_controller = require("../filtering/filter_controller");
var _utils = require("../filtering/utils");
var _controller = require("../lifecycle/controller");
var _options_controller = require("../options_controller/options_controller");
var _index = require("../sorting_controller/index");
var _index2 = require("./store_load_adapter/index");
var _utils2 = require("./utils");
const _excluded = ["skip", "take"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const FILTER_OBJ_COMPARE_DEPTH = 6;
class DataController {
  constructor(columnsController, options, sortingController, filterController, errorController, lifecycle) {
    this.columnsController = columnsController;
    this.options = options;
    this.sortingController = sortingController;
    this.filterController = filterController;
    this.errorController = errorController;
    this.lifecycle = lifecycle;
    this.pendingLocalOperations = {};
    this.dataSourceConfiguration = this.options.oneWay('dataSource');
    this.keyExpr = this.options.oneWay('keyExpr');
    this.dataSource = (0, _signalsCore.computed)(() => (0, _utils2.normalizeDataSource)(this.dataSourceConfiguration.value, this.keyExpr.value));
    this.previousDisplayFilter = undefined;
    // TODO
    this.cacheEnabled = this.options.oneWay('cacheEnabled');
    this.pagingEnabled = this.options.twoWay('paging.enabled');
    this.pageIndex = this.options.twoWay('paging.pageIndex');
    this.pageSize = this.options.twoWay('paging.pageSize');
    this.remoteOperations = this.options.oneWay('remoteOperations');
    this.onDataErrorOccurred = this.options.action('onDataErrorOccurred');
    this._items = (0, _signalsCore.signal)([]);
    this.items = this._items;
    this._totalCount = (0, _signalsCore.signal)(0);
    this.totalCount = this._totalCount;
    this.isLoading = (0, _signalsCore.signal)(false);
    this.pageCount = (0, _signalsCore.computed)(() => Math.ceil(this.totalCount.value / this.pageSize.value));
    this.isLoaded = (0, _signalsCore.signal)(false);
    this.isReloading = (0, _signalsCore.signal)(false);
    this.normalizedRemoteOptions = (0, _signalsCore.computed)(() => {
      const store = this.dataSource.value.store();
      return (0, _utils2.normalizeRemoteOptions)(this.remoteOperations.value, (0, _utils2.isLocalStore)(store), (0, _utils2.isCustomStore)(store));
    });
    this.normalizedLocalOperations = (0, _signalsCore.computed)(() => (0, _utils2.normalizeLocalOptions)(this.normalizedRemoteOptions.value));
    this.normalizedDisplayFilter = (0, _signalsCore.computed)(() => (0, _utils.normalizeFilterWithSelectors)(this.filterController.displayFilter.value, this.columnsController.columns.value, !!this.normalizedRemoteOptions.value.filtering));
    (0, _signalsCore.effect)(() => {
      if (this.dataSource.value) {
        this.columnsController.resetColumnOptionsFromDataItem();
      }
    });
    (0, _signalsCore.effect)(() => {
      const dataSource = this.dataSource.value;
      const changedCallback = e => {
        this.isLoaded.value = true;
        this.onChanged(dataSource, e);
      };
      const loadingChangedCallback = () => {
        this.isLoading.value = dataSource.isLoading();
        this.isReloading.value = true;
      };
      const loadErrorCallback = error => {
        const callback = this.onDataErrorOccurred.peek();
        callback({
          error
        });
        this.errorController.showError(error.message ?? error);
        changedCallback();
      };
      const customizeStoreLoadOptionsCallback = e => {
        e.storeLoadOptions.filter = this.combineFilterWithDisplayFilter(e.storeLoadOptions.filter);
        const localOperations = this.normalizedLocalOperations.peek();
        this.pendingLocalOperations[e.operationId] = (0, _utils2.getLocalLoadOptions)(e.storeLoadOptions, localOperations);
        e.storeLoadOptions = (0, _utils2.getStoreLoadOptions)(e.storeLoadOptions, localOperations);
      };
      const getLoadOptionsWithoutLocalPaging = loadOptions => {
        const rest = _objectWithoutPropertiesLoose(loadOptions, _excluded);
        return rest;
      };
      const dataLoadedCallback = e => {
        /*
          We use Deffered here because the code below is synchronous.
          customizeLoadResult callback does not support async code.
        */
        const {
          operationId
        } = e;
        const localLoadOptions = _extends({}, this.pendingLocalOperations[operationId]);
        const {
          skip,
          take
        } = localLoadOptions;
        const hasLocalPaging = (0, _type.isDefined)(skip) && (0, _type.isDefined)(take);
        const localOptionsWithoutPaging = getLoadOptionsWithoutLocalPaging(localLoadOptions);
        new _array_store.default(e.data).load(localOptionsWithoutPaging).done(filteredData => {
          e.extra = (0, _type.isPlainObject)(e.extra) ? e.extra : {};
          if (hasLocalPaging) {
            e.take = take;
            e.skip = skip;
            if (e.storeLoadOptions.requireTotalCount) {
              e.extra.totalCount = filteredData.length;
            }
            new _array_store.default(e.data).load(localLoadOptions).done(newData => {
              e.data = newData;
            });
          } else {
            e.data = filteredData;
          }
        }).fail(error => {
          // @ts-expect-error
          e.data = new _deferred.Deferred().reject(error);
        });
        this.pendingLocalOperations[operationId] = undefined;
      };
      if (dataSource.isLoaded()) {
        changedCallback();
      }
      dataSource.on('changed', changedCallback);
      dataSource.on('loadingChanged', loadingChangedCallback);
      dataSource.on('loadError', loadErrorCallback);
      // @ts-expect-error
      dataSource.on('customizeStoreLoadOptions', customizeStoreLoadOptionsCallback);
      // @ts-expect-error
      dataSource.on('customizeLoadResult', dataLoadedCallback);
      return () => {
        dataSource.off('changed', changedCallback);
        dataSource.off('loadingChanged', loadingChangedCallback);
        dataSource.off('loadError', loadErrorCallback);
        // @ts-expect-error
        dataSource.off('customizeStoreLoadOptions', customizeStoreLoadOptionsCallback);
        // @ts-expect-error
        dataSource.off('customizeLoadResult', dataLoadedCallback);
      };
    });
    (0, _signalsCore.effect)(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.normalizedRemoteOptions.value;
      if (this.dataSource.peek().isLoaded()) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.dataSource.peek().load();
      }
    });
    (0, _signalsCore.effect)(() => {
      const initialized = this.options.initialized.value;
      const dataSource = this.dataSource.value;
      const pageIndex = this.pageIndex.value;
      const pageSize = this.pageSize.value;
      const isLoaded = this.isLoaded.value;
      const displayFilter = this.filterController.displayFilter.value;
      const pagingEnabled = this.pagingEnabled.value;
      const sortParameters = this.sortingController.sortParameters.value;
      if (!initialized) {
        return;
      }
      let someParamChanged = false;
      if (dataSource.pageIndex() !== pageIndex) {
        dataSource.pageIndex(pageIndex);
        someParamChanged || (someParamChanged = true);
      }
      if (dataSource.pageSize() !== pageSize) {
        const newPageIndex = isLoaded ? Math.max(Math.min(this.pageCount.peek() - 1, pageIndex), 0) : pageIndex;
        dataSource.pageSize(pageSize);
        dataSource.pageIndex(newPageIndex);
        someParamChanged || (someParamChanged = true);
      }
      if (!dataSource.requireTotalCount()) {
        dataSource.requireTotalCount(true);
        someParamChanged || (someParamChanged = true);
      }
      const filterChanged = !(0, _m_common.equalByValue)(this.previousDisplayFilter, displayFilter, {
        maxDepth: FILTER_OBJ_COMPARE_DEPTH,
        strict: true
      });
      if (filterChanged && isLoaded) {
        this.dataSource.peek().pageIndex(0);
        someParamChanged || (someParamChanged = true);
      }
      this.previousDisplayFilter = displayFilter;
      if (!(0, _m_common.equalByValue)(dataSource.paginate(), pagingEnabled)) {
        dataSource.paginate(pagingEnabled);
        someParamChanged || (someParamChanged = true);
      }
      if (sortParameters && !(0, _m_common.equalByValue)(dataSource.sort(), sortParameters)) {
        dataSource.sort(sortParameters);
        someParamChanged || (someParamChanged = true);
      }
      if (someParamChanged || !dataSource.isLoaded()) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dataSource.load();
      }
    });
  }
  getCombinedFilter() {
    return this.combineFilterWithDisplayFilter(this.dataSource.peek().filter());
  }
  combineFilterWithDisplayFilter(filter) {
    return _m_utils.default.combineFilters([filter, this.normalizedDisplayFilter.peek()]);
  }
  normalizePageIndex(dataSource) {
    const pageIndex = dataSource.pageIndex();
    const totalCount = dataSource.totalCount();
    const pageSize = dataSource.pageSize();
    const pageCount = Math.ceil(totalCount / pageSize);
    if (totalCount > 0 && pageIndex >= pageCount) {
      dataSource.pageIndex(pageCount - 1);
      return 'require-reload';
    }
    return 'normalized';
  }
  onChanged(dataSource, e) {
    var _this$loadedPromise;
    const normalizePageIndexResult = this.normalizePageIndex(dataSource);
    if (normalizePageIndexResult === 'require-reload') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dataSource.load();
      return;
    }
    let items = dataSource.items();
    if (e !== null && e !== void 0 && e.changes) {
      items = this._items.peek();
      items = (0, _utils2.updateItemsImmutable)(items, e.changes, dataSource.store());
    }
    const firstItem = items[0];
    this.columnsController.setColumnOptionsFromDataItem(firstItem ?? {});
    this._items.value = items;
    this.pageIndex.value = dataSource.pageIndex();
    this.pageSize.value = dataSource.pageSize();
    this._totalCount.value = dataSource.totalCount();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.resolve().then(() => {
      this.isReloading.value = false;
    });
    (_this$loadedPromise = this.loadedPromise) === null || _this$loadedPromise === void 0 || _this$loadedPromise.resolve();
    this.loadedPromise = undefined;
    this.lifecycle.contentRendered.schedule(() => {
      this.lifecycle.fireContentReady();
    });
  }
  getDataKey(data) {
    return this.dataSource.peek().store().keyOf(data);
  }
  waitLoaded() {
    if (!this.dataSource.peek().isLoading()) {
      return Promise.resolve();
    }
    if (!this.loadedPromise) {
      this.loadedPromise = (0, _promise.createPromise)();
    }
    return this.loadedPromise.promise;
  }
  getStoreLoadAdapter() {
    return new _index2.StoreLoadAdapter(this.dataSource, this.normalizedLocalOperations,
    // NOTE: Badly typed ArrayStore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    data => new _array_store.default(data));
  }
  async update(key, data) {
    await this.dataSource.peek().store().update(key, data);
  }
  async insert(data) {
    await this.dataSource.peek().store().insert(data);
  }
  async remove(key) {
    await this.dataSource.peek().store().remove(key);
  }
  async reload() {
    await this.dataSource.peek().load();
  }
  increasePageIndex() {
    const currentPageIdx = this.pageIndex.peek();
    const totalCount = this.totalCount.peek();
    const pageSize = this.pageSize.peek();
    const nextPageIdx = currentPageIdx + 1;
    const maxPageIdx = Math.ceil(totalCount / pageSize) - 1;
    if (nextPageIdx > maxPageIdx) {
      return;
    }
    this.pageIndex.value = nextPageIdx;
  }
  decreasePageIndex() {
    const currentPageIdx = this.pageIndex.peek();
    const nextPageIdx = currentPageIdx - 1;
    if (nextPageIdx < 0) {
      return;
    }
    this.pageIndex.value = nextPageIdx;
  }
}
exports.DataController = DataController;
DataController.dependencies = [_columns_controller.ColumnsController, _options_controller.OptionsController, _index.SortingController, _filter_controller.FilterController, _error_controller.ErrorController, _controller.LifeCycleController];
