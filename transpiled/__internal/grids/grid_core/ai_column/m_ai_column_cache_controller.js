"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AIColumnCacheController = void 0;
var _m_modules = require("../m_modules");
/* eslint-disable @typescript-eslint/no-unused-vars */

class AIColumnCacheController extends _m_modules.Controller {
  clearCache(columnName) {}
  getCachedResponse(columnName, keys) {
    return {};
  }
  getCachedString(columnName, key) {
    return null;
  }
  isEmptyCache(columnName) {
    return true;
  }
}
exports.AIColumnCacheController = AIColumnCacheController;