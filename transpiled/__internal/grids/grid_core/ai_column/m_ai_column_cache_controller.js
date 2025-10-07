"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiColumnCacheController = void 0;
var _m_modules = require("../m_modules");
/* eslint-disable @typescript-eslint/no-unused-vars */

class AiColumnCacheController extends _m_modules.Controller {
  clearCache(columnName) {}
  getCachedResponse(columnName, keys) {
    return null;
  }
  getCachedString(columnName, key) {
    return null;
  }
  isEmptyCache(columnName) {
    return true;
  }
}
exports.AiColumnCacheController = AiColumnCacheController;