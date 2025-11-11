/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_column_cache_controller.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AIColumnCacheController = void 0;
var _m_modules = require("../m_modules");
class AIColumnCacheController extends _m_modules.Controller {
  constructor() {
    super(...arguments);
    this.cache = {};
  }
  clearCache(columnName) {
    this.cache[columnName] = undefined;
  }
  getCachedResponse(columnName, keys) {
    const columnCache = this.cache[columnName];
    if (!columnCache) return {};
    return keys.reduce((acc, key) => {
      const value = columnCache[key];
      if (value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
  setCachedResponse(columnName, data) {
    const columnCache = this.cache[columnName] ?? {};
    this.cache[columnName] = columnCache;
    Object.entries(data).forEach(_ref => {
      let [key, value] = _ref;
      columnCache[key] = value;
    });
  }
  getCachedString(columnName, key) {
    var _this$cache$columnNam;
    return (_this$cache$columnNam = this.cache[columnName]) === null || _this$cache$columnNam === void 0 ? void 0 : _this$cache$columnNam[key];
  }
  isEmptyCache(columnName) {
    return Object.keys(this.cache[columnName] ?? {}).length === 0;
  }
}
exports.AIColumnCacheController = AIColumnCacheController;
