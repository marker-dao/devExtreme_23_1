/**
* DevExtreme (cjs/__internal/scheduler/global_cache.js)
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
exports.globalCache = exports.Cache = void 0;
var _type = require("../../core/utils/type");
class Cache {
  constructor() {
    this.cache = new Map();
  }
  get size() {
    return this.cache.size;
  }
  clear() {
    this.cache.clear();
  }
  get(name) {
    return this.cache.get(name);
  }
  memo(name, valueCallback) {
    if (!this.cache.has(name)) {
      const value = valueCallback();
      if ((0, _type.isDefined)(value)) {
        this.cache.set(name, value);
      }
    }
    return this.cache.get(name);
  }
  delete(name) {
    this.cache.delete(name);
  }
}
exports.Cache = Cache;
const globalCache = exports.globalCache = {
  timezones: new Cache()
};
