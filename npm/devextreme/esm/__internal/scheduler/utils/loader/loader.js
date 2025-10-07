/**
* DevExtreme (esm/__internal/scheduler/utils/loader/loader.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { noop } from '../../../../core/utils/common';
import DataSource from '../../../../data/data_source';
import { loadResource, normalizeDataSource } from './utils';
// TODO(9): implement appointmentLoader extends Loader for the mane dataSource of the scheduler
export class Loader {
  constructor(config, dataSourceOptions) {
    this.items = [];
    this.data = [];
    this.unsubscribe = noop;
    this.dataSource = normalizeDataSource(config.dataSource, dataSourceOptions);
    this.isSharedDataSource = config.dataSource instanceof DataSource;
    this.addDataSourceHandlers();
  }
  onInit() {
    if (this.isLoaded()) {
      var _this$dataSource;
      this.applyChanges(((_this$dataSource = this.dataSource) === null || _this$dataSource === void 0 ? void 0 : _this$dataSource.items()) ?? []);
    }
  }
  isLoaded() {
    var _this$dataSource2;
    return Boolean((_this$dataSource2 = this.dataSource) === null || _this$dataSource2 === void 0 ? void 0 : _this$dataSource2.isLoaded());
  }
  addDataSourceHandlers() {
    const onChange = this.onChange.bind(this);
    const onLoadingChanged = this.onLoadingChanged.bind(this);
    const onLoadError = this.onLoadError.bind(this);
    const {
      dataSource
    } = this;
    if (dataSource) {
      dataSource.on('changed', onChange);
      dataSource.on('loadingChanged', onLoadingChanged);
      dataSource.on('loadError', onLoadError);
      this.unsubscribe = () => {
        dataSource.off('changed', onChange);
        dataSource.off('loadingChanged', onLoadingChanged);
        dataSource.off('loadError', onLoadError);
      };
    }
  }
  async load() {
    let forceReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (this.dataSource && (forceReload || !this.dataSource.isLoaded() && !this.loadingStatePromise)) {
      this.loadingStatePromise = this.loadingStatePromise && !forceReload ? this.loadingStatePromise : loadResource(this.dataSource, forceReload);
    }
    await this.loadingStatePromise;
  }
  onLoadingChanged(isLoading) {
    if (!isLoading && this.isLoaded()) {
      var _this$dataSource3;
      this.applyChanges(((_this$dataSource3 = this.dataSource) === null || _this$dataSource3 === void 0 ? void 0 : _this$dataSource3.items()) ?? []);
    }
  }
  applyChanges(items) {
    if (items && items !== this.data) {
      this.data = items;
      this.items = this.onLoadTransform(this.data);
    }
  }
  dispose() {
    if (this.dataSource) {
      if (this.isSharedDataSource) {
        this.unsubscribe();
        this.unsubscribe = noop;
      } else {
        this.dataSource.dispose();
      }
      this.data = [];
      this.items = [];
    }
  }
}
