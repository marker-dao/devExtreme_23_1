import { Deferred } from '../../../../../../core/utils/deferred';
import { deferredCache } from '../deferred_cache';
import { getLocalLoadOptions, getStoreLoadOptions } from '../utils';
export class StoreLoadAdapter {
  constructor(dataSourceReactive, localLoadOptionsReactive, localStoreFabric) {
    this.dataSourceReactive = dataSourceReactive;
    this.localLoadOptionsReactive = localLoadOptionsReactive;
    this.localStoreFabric = localStoreFabric;
    this.loadFromStore = deferredCache(loadOptions => {
      const dataSource = this.dataSourceReactive.peek();
      // NOTE: In runtime we have deferred here (not promise)
      return dataSource.store().load(loadOptions);
    });
  }
  load() {
    let loadOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const result = Deferred();
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
    const localOptions = getLocalLoadOptions(loadOptions, localLoadOptions);
    const remoteOptions = getStoreLoadOptions(loadOptions, localLoadOptions);
    return {
      localOptions,
      remoteOptions
    };
  }
}