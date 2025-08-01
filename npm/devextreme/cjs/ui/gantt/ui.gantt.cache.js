/**
* DevExtreme (cjs/ui/gantt/ui.gantt.cache.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GanttDataCache = void 0;
var _extend = require("../../core/utils/extend");
class GanttDataCache {
  constructor() {
    this._cache = {};
    this._timers = {};
  }
  saveData(key, data, keyExpireCallback) {
    if (data) {
      this._clearTimer(key);
      const storage = this._getCache(key, true);
      (0, _extend.extendFromObject)(storage, data, true);
      if (keyExpireCallback) {
        this._setExpireTimer(key, keyExpireCallback);
      }
    }
  }
  pullDataFromCache(key, target) {
    const data = this._getCache(key);
    if (data) {
      (0, _extend.extendFromObject)(target, data);
    }
    this._onKeyExpired(key);
  }
  hasData(key) {
    return !!this._cache[key];
  }
  resetCache(key) {
    this._onKeyExpired(key);
  }
  _getCache(key, forceCreate) {
    if (!this._cache[key] && forceCreate) {
      this._cache[key] = {};
    }
    return this._cache[key];
  }
  _setExpireTimer(key, callback) {
    this._timers[key] = setTimeout(() => {
      callback(key, this._getCache(key));
      this._onKeyExpired(key);
    }, 200);
  }
  _onKeyExpired(key) {
    this._clearCache(key);
    this._clearTimer(key);
  }
  _clearCache(key) {
    delete this._cache[key];
  }
  _clearTimer(key) {
    const timers = this._timers;
    if (timers && timers[key]) {
      clearTimeout(timers[key]);
      delete timers[key];
    }
  }
}
exports.GanttDataCache = GanttDataCache;
