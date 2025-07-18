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