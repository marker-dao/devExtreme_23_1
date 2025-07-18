/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/public_methods.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { keysEqual } from '../../../../data/m_utils';
export function PublicMethods(GridCore) {
  return class GridCoreWithDataController extends GridCore {
    getDataSource() {
      return this.dataController.dataSource.peek();
    }
    byKey(key) {
      const items = this.getDataSource().items();
      const store = this.getDataSource().store();
      const keyExpr = store.key();
      const foundItem = items.find(item => keysEqual(keyExpr, key, this.keyOf(item)));
      if (foundItem) {
        return Promise.resolve(foundItem);
      }
      return store.byKey(key);
    }
    getCombinedFilter() {
      return this.dataController.getCombinedFilter();
    }
    keyOf(obj) {
      return this.dataController.getDataKey(obj);
    }
    pageCount() {
      return this.dataController.pageCount.peek();
    }
    pageSize(value) {
      if (value === undefined) {
        return this.dataController.pageSize.peek();
      }
      this.dataController.pageSize.value = value;
    }
    pageIndex(newIndex) {
      if (newIndex === undefined) {
        return this.dataController.pageIndex.peek();
      }
      this.dataController.pageIndex.value = newIndex;
      return this.dataController.waitLoaded();
    }
    totalCount() {
      return this.dataController.totalCount.peek();
    }
  };
}
