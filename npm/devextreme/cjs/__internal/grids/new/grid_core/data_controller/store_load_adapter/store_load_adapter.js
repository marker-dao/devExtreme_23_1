/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/store_load_adapter/store_load_adapter.js)
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
exports.StoreLoadAdapter = void 0;
var _deferred = require("../../../../../../core/utils/deferred");
var _deferred_cache = require("../deferred_cache");
var _utils = require("../utils");
class StoreLoadAdapter {
  constructor(dataSourceReactive, localLoadOptionsReactive, localStoreFabric) {
    this.dataSourceReactive = dataSourceReactive;
    this.localLoadOptionsReactive = localLoadOptionsReactive;
    this.localStoreFabric = localStoreFabric;
    this.loadFromStore = (0, _deferred_cache.deferredCache)(loadOptions => {
      const dataSource = this.dataSourceReactive.peek();
      // NOTE: In runtime we have deferred here (not promise)
      return dataSource.store().load(loadOptions);
    });
  }
  load() {
    let loadOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const result = (0, _deferred.Deferred)();
    const {
      localOptions,
      remoteOptions
    } = this.getLoadOptions(loadOptions);
    this.loadFromStore(remoteOptions).done(loadedData => {
      const localStore = this.localStoreFabric(loadedData);
      localStore.load(localOptions).done(processedData => {
        result.resolve(processedData);
      })
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .fail(result.reject);
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .fail(result.reject);
    return result;
  }
  getLocalLoadOperations() {
    return this.localLoadOptionsReactive.peek();
  }
  getLoadOptions(loadOptions) {
    const localLoadOptions = this.localLoadOptionsReactive.peek();
    const localOptions = (0, _utils.getLocalLoadOptions)(loadOptions, localLoadOptions);
    const remoteOptions = (0, _utils.getStoreLoadOptions)(loadOptions, localLoadOptions);
    return {
      localOptions,
      remoteOptions
    };
  }
}
exports.StoreLoadAdapter = StoreLoadAdapter;
