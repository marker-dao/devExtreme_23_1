/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/data_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["skip", "take"];
import ArrayStore from '../../../../../common/data/array_store';
import { Deferred } from '../../../../../core/utils/deferred';
import { isDefined, isPlainObject } from '../../../../../core/utils/type';
import { computed, effect, signal } from '@preact/signals-core';
import { equalByValue } from '../../../../core/utils/m_common';
import { createPromise } from '../../../../core/utils/promise';
import gridCoreUtils from '../../../grid_core/m_utils';
import { ColumnsController } from '../columns_controller/columns_controller';
import { ErrorController } from '../error_controller/error_controller';
import { FilterController } from '../filtering/filter_controller';
import { normalizeFilterWithSelectors } from '../filtering/utils';
import { LifeCycleController } from '../lifecycle/controller';
import { OptionsController } from '../options_controller/options_controller';
import { SortingController } from '../sorting_controller/index';
import { StoreLoadAdapter } from './store_load_adapter/index';
import { getLocalLoadOptions, getStoreLoadOptions, isCustomStore, isLocalStore, normalizeDataSource, normalizeLocalOptions, normalizeRemoteOptions, updateItemsImmutable } from './utils';
const FILTER_OBJ_COMPARE_DEPTH = 6;
export class DataController {
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
    this.dataSource = computed(() => normalizeDataSource(this.dataSourceConfiguration.value, this.keyExpr.value));
    this.previousDisplayFilter = undefined;
    // TODO
    this.cacheEnabled = this.options.oneWay('cacheEnabled');
    this.pagingEnabled = this.options.twoWay('paging.enabled');
    this.pageIndex = this.options.twoWay('paging.pageIndex');
    this.pageSize = this.options.twoWay('paging.pageSize');
    this.remoteOperations = this.options.oneWay('remoteOperations');
    this.onDataErrorOccurred = this.options.action('onDataErrorOccurred');
    this._items = signal([]);
    this.items = this._items;
    this._totalCount = signal(0);
    this.totalCount = this._totalCount;
    this.isLoading = signal(false);
    this.pageCount = computed(() => Math.ceil(this.totalCount.value / this.pageSize.value));
    this.isLoaded = signal(false);
    this.isReloading = signal(false);
    this.normalizedRemoteOptions = computed(() => {
      const store = this.dataSource.value.store();
      return normalizeRemoteOptions(this.remoteOperations.value, isLocalStore(store), isCustomStore(store));
    });
    this.normalizedLocalOperations = computed(() => normalizeLocalOptions(this.normalizedRemoteOptions.value));
    this.normalizedDisplayFilter = computed(() => normalizeFilterWithSelectors(this.filterController.displayFilter.value, this.columnsController.columns.value, !!this.normalizedRemoteOptions.value.filtering));
    effect(() => {
      if (this.dataSource.value) {
        this.columnsController.resetColumnOptionsFromDataItem();
      }
    });
    effect(() => {
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
        this.pendingLocalOperations[e.operationId] = getLocalLoadOptions(e.storeLoadOptions, localOperations);
        e.storeLoadOptions = getStoreLoadOptions(e.storeLoadOptions, localOperations);
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
        const hasLocalPaging = isDefined(skip) && isDefined(take);
        const localOptionsWithoutPaging = getLoadOptionsWithoutLocalPaging(localLoadOptions);
        new ArrayStore(e.data).load(localOptionsWithoutPaging).done(filteredData => {
          e.extra = isPlainObject(e.extra) ? e.extra : {};
          if (hasLocalPaging) {
            e.take = take;
            e.skip = skip;
            if (e.storeLoadOptions.requireTotalCount) {
              e.extra.totalCount = filteredData.length;
            }
            new ArrayStore(e.data).load(localLoadOptions).done(newData => {
              e.data = newData;
            });
          } else {
            e.data = filteredData;
          }
        }).fail(error => {
          // @ts-expect-error
          e.data = new Deferred().reject(error);
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
    effect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.normalizedRemoteOptions.value;
      if (this.dataSource.peek().isLoaded()) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.dataSource.peek().load();
      }
    });
    effect(() => {
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
      const filterChanged = !equalByValue(this.previousDisplayFilter, displayFilter, {
        maxDepth: FILTER_OBJ_COMPARE_DEPTH,
        strict: true
      });
      if (filterChanged && isLoaded) {
        this.dataSource.peek().pageIndex(0);
        someParamChanged || (someParamChanged = true);
      }
      this.previousDisplayFilter = displayFilter;
      if (!equalByValue(dataSource.paginate(), pagingEnabled)) {
        dataSource.paginate(pagingEnabled);
        someParamChanged || (someParamChanged = true);
      }
      if (sortParameters && !equalByValue(dataSource.sort(), sortParameters)) {
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
    return gridCoreUtils.combineFilters([filter, this.normalizedDisplayFilter.peek()]);
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
      items = updateItemsImmutable(items, e.changes, dataSource.store());
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
      this.loadedPromise = createPromise();
    }
    return this.loadedPromise.promise;
  }
  getStoreLoadAdapter() {
    return new StoreLoadAdapter(this.dataSource, this.normalizedLocalOperations,
    // NOTE: Badly typed ArrayStore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    data => new ArrayStore(data));
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
DataController.dependencies = [ColumnsController, OptionsController, SortingController, FilterController, ErrorController, LifeCycleController];
