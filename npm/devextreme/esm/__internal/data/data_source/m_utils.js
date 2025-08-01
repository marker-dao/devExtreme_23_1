/**
* DevExtreme (esm/__internal/data/data_source/m_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["items"];
import ArrayStore from '../../../common/data/array_store';
import { CustomStore } from '../../../common/data/custom_store';
import { normalizeSortingInfo } from '../../../common/data/utils';
import ajaxUtils from '../../../core/utils/ajax';
import { extend } from '../../../core/utils/extend';
import { each, map } from '../../../core/utils/iterator';
import { isPlainObject } from '../../../core/utils/type';
import Store from '../../../data/abstract_store';
export const CANCELED_TOKEN = 'canceled';
export const isPending = deferred => deferred.state() === 'pending';
export const normalizeStoreLoadOptionAccessorArguments = originalArguments => {
  // eslint-disable-next-line default-case
  switch (originalArguments.length) {
    case 0:
      return undefined;
    case 1:
      return originalArguments[0];
  }
  return [].slice.call(originalArguments);
};
const mapGroup = (group, level, mapper) => map(group, item => {
  const restItem = _objectWithoutPropertiesLoose(item, _excluded);
  return _extends({}, restItem, {
    items: mapRecursive(item.items, level - 1, mapper)
  });
});
const mapRecursive = (items, level, mapper) => {
  if (!Array.isArray(items)) return items;
  return level ? mapGroup(items, level, mapper) : map(items, mapper);
};
export const mapDataRespectingGrouping = (items, mapper, groupInfo) => {
  const level = groupInfo ? normalizeSortingInfo(groupInfo).length : 0;
  return mapRecursive(items, level, mapper);
};
export const normalizeLoadResult = (data, extra) => {
  var _data;
  if ((_data = data) !== null && _data !== void 0 && _data.data) {
    extra = data;
    data = data.data;
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  return {
    data,
    extra
  };
};
const createCustomStoreFromLoadFunc = options => {
  const storeConfig = {};
  each(['useDefaultSearch', 'key', 'load', 'loadMode', 'cacheRawData', 'byKey', 'lookup', 'totalCount', 'insert', 'update', 'remove'], function () {
    storeConfig[this] = options[this];
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete options[this];
  });
  return new CustomStore(storeConfig);
};
const createStoreFromConfig = storeConfig => {
  const alias = storeConfig.type;
  delete storeConfig.type;
  // @ts-expect-error
  return Store.create(alias, storeConfig);
};
const createCustomStoreFromUrl = (url, normalizationOptions) => new CustomStore({
  load: () => ajaxUtils.sendRequest({
    url,
    dataType: 'json'
  }),
  loadMode: normalizationOptions === null || normalizationOptions === void 0 ? void 0 : normalizationOptions.fromUrlLoadMode
});
export const normalizeDataSourceOptions = (options, normalizationOptions) => {
  let store;
  if (typeof options === 'string') {
    options = {
      paginate: false,
      store: createCustomStoreFromUrl(options, normalizationOptions)
    };
  }
  if (options === undefined) {
    options = [];
  }
  if (Array.isArray(options) || options instanceof Store) {
    options = {
      store: options
    };
  } else {
    options = extend({}, options);
  }
  if (options.store === undefined) {
    options.store = [];
  }
  store = options.store;
  if ('load' in options) {
    store = createCustomStoreFromLoadFunc(options);
  } else if (Array.isArray(store)) {
    store = new ArrayStore(store);
  } else if (isPlainObject(store)) {
    store = createStoreFromConfig(extend({}, store));
  }
  options.store = store;
  return options;
};
