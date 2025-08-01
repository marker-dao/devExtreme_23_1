/**
* DevExtreme (cjs/__internal/data/data_source/m_utils.js)
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
exports.normalizeStoreLoadOptionAccessorArguments = exports.normalizeLoadResult = exports.normalizeDataSourceOptions = exports.mapDataRespectingGrouping = exports.isPending = exports.CANCELED_TOKEN = void 0;
var _array_store = _interopRequireDefault(require("../../../common/data/array_store"));
var _custom_store = require("../../../common/data/custom_store");
var _utils = require("../../../common/data/utils");
var _ajax = _interopRequireDefault(require("../../../core/utils/ajax"));
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _abstract_store = _interopRequireDefault(require("../../../data/abstract_store"));
const _excluded = ["items"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const CANCELED_TOKEN = exports.CANCELED_TOKEN = 'canceled';
const isPending = deferred => deferred.state() === 'pending';
exports.isPending = isPending;
const normalizeStoreLoadOptionAccessorArguments = originalArguments => {
  // eslint-disable-next-line default-case
  switch (originalArguments.length) {
    case 0:
      return undefined;
    case 1:
      return originalArguments[0];
  }
  return [].slice.call(originalArguments);
};
exports.normalizeStoreLoadOptionAccessorArguments = normalizeStoreLoadOptionAccessorArguments;
const mapGroup = (group, level, mapper) => (0, _iterator.map)(group, item => {
  const restItem = _objectWithoutPropertiesLoose(item, _excluded);
  return _extends({}, restItem, {
    items: mapRecursive(item.items, level - 1, mapper)
  });
});
const mapRecursive = (items, level, mapper) => {
  if (!Array.isArray(items)) return items;
  return level ? mapGroup(items, level, mapper) : (0, _iterator.map)(items, mapper);
};
const mapDataRespectingGrouping = (items, mapper, groupInfo) => {
  const level = groupInfo ? (0, _utils.normalizeSortingInfo)(groupInfo).length : 0;
  return mapRecursive(items, level, mapper);
};
exports.mapDataRespectingGrouping = mapDataRespectingGrouping;
const normalizeLoadResult = (data, extra) => {
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
exports.normalizeLoadResult = normalizeLoadResult;
const createCustomStoreFromLoadFunc = options => {
  const storeConfig = {};
  (0, _iterator.each)(['useDefaultSearch', 'key', 'load', 'loadMode', 'cacheRawData', 'byKey', 'lookup', 'totalCount', 'insert', 'update', 'remove'], function () {
    storeConfig[this] = options[this];
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete options[this];
  });
  return new _custom_store.CustomStore(storeConfig);
};
const createStoreFromConfig = storeConfig => {
  const alias = storeConfig.type;
  delete storeConfig.type;
  // @ts-expect-error
  return _abstract_store.default.create(alias, storeConfig);
};
const createCustomStoreFromUrl = (url, normalizationOptions) => new _custom_store.CustomStore({
  load: () => _ajax.default.sendRequest({
    url,
    dataType: 'json'
  }),
  loadMode: normalizationOptions === null || normalizationOptions === void 0 ? void 0 : normalizationOptions.fromUrlLoadMode
});
const normalizeDataSourceOptions = (options, normalizationOptions) => {
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
  if (Array.isArray(options) || options instanceof _abstract_store.default) {
    options = {
      store: options
    };
  } else {
    options = (0, _extend.extend)({}, options);
  }
  if (options.store === undefined) {
    options.store = [];
  }
  store = options.store;
  if ('load' in options) {
    store = createCustomStoreFromLoadFunc(options);
  } else if (Array.isArray(store)) {
    store = new _array_store.default(store);
  } else if ((0, _type.isPlainObject)(store)) {
    store = createStoreFromConfig((0, _extend.extend)({}, store));
  }
  options.store = store;
  return options;
};
exports.normalizeDataSourceOptions = normalizeDataSourceOptions;
