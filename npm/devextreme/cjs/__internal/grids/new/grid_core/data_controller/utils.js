/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/utils.js)
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
exports.getLocalLoadOptions = getLocalLoadOptions;
exports.getStoreLoadOptions = getStoreLoadOptions;
exports.isCustomStore = isCustomStore;
exports.isLocalStore = isLocalStore;
exports.normalizeDataSource = normalizeDataSource;
exports.normalizeLocalOptions = normalizeLocalOptions;
exports.normalizeRemoteOptions = normalizeRemoteOptions;
exports.updateItemsImmutable = updateItemsImmutable;
var _data = require("../../../../../common/data");
var _data_source = _interopRequireDefault(require("../../../../../data/data_source"));
var _utils = require("../../../../../data/data_source/utils");
var _m_array_utils = require("../../../../data/m_array_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/explicit-module-boundary-types */ /* eslint-disable @typescript-eslint/no-explicit-any */
function normalizeDataSource(dataSourceLike, keyExpr) {
  if (dataSourceLike instanceof _data_source.default) {
    return dataSourceLike;
  }
  if (Array.isArray(dataSourceLike)) {
    // eslint-disable-next-line no-param-reassign
    dataSourceLike = {
      store: {
        type: 'array',
        data: dataSourceLike,
        key: keyExpr
      }
    };
  }
  // TODO: research making second param not required
  return new _data_source.default((0, _utils.normalizeDataSourceOptions)(dataSourceLike, undefined));
}
function isLocalStore(store) {
  return store instanceof _data.ArrayStore;
}
function isCustomStore(store) {
  return store instanceof _data.CustomStore;
}
function normalizeRemoteOptions(remoteOperations, localStore, customStore) {
  const allOperationsEnabled = {
    filtering: true,
    sorting: true,
    paging: true,
    grouping: true
  };
  const allOperationDisabled = {
    filtering: false,
    sorting: false,
    paging: false,
    grouping: false
  };
  switch (true) {
    case remoteOperations === 'auto':
      return localStore || customStore ? allOperationDisabled : allOperationsEnabled;
    case remoteOperations === false:
      return allOperationDisabled;
    case remoteOperations === true:
      return allOperationsEnabled;
    default:
      return remoteOperations;
  }
}
function normalizeLocalOptions(normalizedRemoteOperations) {
  return {
    filtering: !normalizedRemoteOperations.filtering,
    sorting: !normalizedRemoteOperations.sorting,
    paging: !normalizedRemoteOperations.paging,
    grouping: !normalizedRemoteOperations.grouping
  };
}
function getLocalLoadOptions(originOptions, localOperations) {
  const localLoadOptions = {
    langParams: originOptions.langParams
  };
  if (localOperations.sorting) {
    localLoadOptions.sort = originOptions.sort;
  }
  if (localOperations.filtering) {
    localLoadOptions.filter = originOptions.filter;
  }
  if (localOperations.paging) {
    localLoadOptions.skip = originOptions.skip;
    localLoadOptions.take = originOptions.take;
  }
  if (localOperations.summary) {
    localLoadOptions.summary = originOptions.summary;
  }
  if (localOperations.grouping) {
    localLoadOptions.group = originOptions.group;
  }
  return localLoadOptions;
}
function getStoreLoadOptions(originOptions, localOperations) {
  const storeLoadOptions = _extends({}, originOptions);
  if (localOperations.sorting) {
    delete storeLoadOptions.sort;
  }
  if (localOperations.filtering) {
    delete storeLoadOptions.filter;
  }
  if (localOperations.paging) {
    delete storeLoadOptions.skip;
    delete storeLoadOptions.take;
  }
  if (localOperations.summary) {
    delete storeLoadOptions.summary;
  }
  if (localOperations.grouping) {
    delete storeLoadOptions.group;
  }
  return storeLoadOptions;
}
function updateItemsImmutable(data, changes, keyInfo) {
  // @ts-expect-error
  return (0, _m_array_utils.applyBatch)({
    keyInfo,
    data,
    changes,
    immutable: true
  });
}
