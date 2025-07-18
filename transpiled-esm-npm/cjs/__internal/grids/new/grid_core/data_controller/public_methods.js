"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
var _m_utils = require("../../../../data/m_utils");
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

function PublicMethods(GridCore) {
  return class GridCoreWithDataController extends GridCore {
    getDataSource() {
      return this.dataController.dataSource.peek();
    }
    byKey(key) {
      const items = this.getDataSource().items();
      const store = this.getDataSource().store();
      const keyExpr = store.key();
      const foundItem = items.find(item => (0, _m_utils.keysEqual)(keyExpr, key, this.keyOf(item)));
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