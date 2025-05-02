/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/utils.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrayStore, CustomStore } from '../../../../../common/data';
import DataSource from '../../../../../data/data_source';
import { normalizeDataSourceOptions } from '../../../../../data/data_source/utils';
import { applyBatch } from '../../../../data/m_array_utils';
export function normalizeDataSource(dataSourceLike, keyExpr) {
  if (dataSourceLike instanceof DataSource) {
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
  return new DataSource(normalizeDataSourceOptions(dataSourceLike, undefined));
}
export function isLocalStore(store) {
  return store instanceof ArrayStore;
}
export function isCustomStore(store) {
  return store instanceof CustomStore;
}
export function normalizeRemoteOptions(remoteOperations, localStore, customStore) {
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
export function normalizeLocalOptions(normalizedRemoteOperations) {
  return {
    filtering: !normalizedRemoteOperations.filtering,
    sorting: !normalizedRemoteOperations.sorting,
    paging: !normalizedRemoteOperations.paging,
    grouping: !normalizedRemoteOperations.grouping
  };
}
export function getLocalLoadOptions(originOptions, localOperations) {
  const localLoadOptions = {};
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
export function getStoreLoadOptions(originOptions, localOperations) {
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
export function updateItemsImmutable(data, changes, keyInfo) {
  // @ts-expect-error
  return applyBatch({
    keyInfo,
    data,
    changes,
    immutable: true
  });
}
