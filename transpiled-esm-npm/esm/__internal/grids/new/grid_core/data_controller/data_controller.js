import ArrayStore from '../../../../../common/data/array_store';
import { Deferred } from '../../../../../core/utils/deferred';
import { computed, effect, signal } from '@preact/signals-core';
import { equalByValue } from '../../../../core/utils/m_common';
import { createPromise } from '../../../../core/utils/promise';
import { ColumnsController } from '../columns_controller/columns_controller';
import { FilterController } from '../filtering/filter_controller';
import { OptionsController } from '../options_controller/options_controller';
import { SortingController } from '../sorting_controller/sorting_controller';
import { StoreLoadAdapter } from './store_load_adapter/index';
import { getLocalLoadOptions, getStoreLoadOptions, isCustomStore, isLocalStore, normalizeDataSource, normalizeLocalOptions, normalizeRemoteOptions, updateItemsImmutable } from './utils';
const FILTER_OBJ_COMPARE_DEPTH = 6;
export class DataController {
  constructor(columnsController, options, sortingController, filterController) {
    this.columnsController = columnsController;
    this.options = options;
    this.sortingController = sortingController;
    this.filterController = filterController;
    this.pendingLocalOperations = {};
    this.dataSourceConfiguration = this.options.oneWay('dataSource');
    this.keyExpr = this.options.oneWay('keyExpr');
    this.dataSource = computed(() => normalizeDataSource(this.dataSourceConfiguration.value, this.keyExpr.value));
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
        changedCallback();
      };
      const customizeStoreLoadOptionsCallback = e => {
        const localOptions = this.normalizedLocalOperations.peek();
        this.pendingLocalOperations[e.operationId] = getLocalLoadOptions(e.storeLoadOptions, localOptions);
        e.storeLoadOptions = getStoreLoadOptions(e.storeLoadOptions, localOptions);
      };
      const dataLoadedCallback = e => {
        /*
          We use Deffered here because the code below is synchronous.
          customizeLoadResult callback does not support async code.
        */
        new ArrayStore(e.data).load(this.pendingLocalOperations[e.operationId]).done(data => {
          e.data = data;
        }).fail(error => {
          // @ts-expect-error
          e.data = new Deferred().reject(error);
        });
        this.pendingLocalOperations[e.operationId] = undefined;
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
      const dataSource = this.dataSource.value;
      const pageIndex = this.pageIndex.value;
      const pageSize = this.pageSize.value;
      const displayFilter = this.filterController.displayFilter.value;
      const pagingEnabled = this.pagingEnabled.value;
      const sortParameters = this.sortingController.sortParameters.value;
      let someParamChanged = false;
      if (dataSource.pageIndex() !== pageIndex) {
        dataSource.pageIndex(pageIndex);
        someParamChanged || (someParamChanged = true);
      }
      if (dataSource.pageSize() !== pageSize) {
        dataSource.pageSize(pageSize);
        someParamChanged || (someParamChanged = true);
      }
      if (!dataSource.requireTotalCount()) {
        dataSource.requireTotalCount(true);
        someParamChanged || (someParamChanged = true);
      }
      if (!equalByValue(dataSource.filter(), displayFilter, {
        maxDepth: FILTER_OBJ_COMPARE_DEPTH,
        strict: true
      })) {
        dataSource.filter(displayFilter ?? null);
        someParamChanged || (someParamChanged = true);
      }
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
  onChanged(dataSource, e) {
    var _this$loadedPromise;
    let items = dataSource.items();
    if (e !== null && e !== void 0 && e.changes) {
      items = this._items.peek();
      items = updateItemsImmutable(items, e.changes, dataSource.store());
    }
    const firstItem = items[0];
    if (firstItem) {
      this.columnsController.setColumnOptionsFromDataItem(firstItem);
    }
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
DataController.dependencies = [ColumnsController, OptionsController, SortingController, FilterController];