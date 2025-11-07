/**
* DevExtreme (esm/__internal/ui/gantt/ui.gantt.cache.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { extendFromObject } from '../../../core/utils/extend';
export class GanttDataCache {
  constructor() {
    this._cache = {};
    this._timers = {};
  }
  saveData(key, data, keyExpireCallback) {
    if (data) {
      this._clearTimer(key);
      const storage = this._getCache(key, true);
      extendFromObject(storage, data, true);
      if (keyExpireCallback) {
        this._setExpireTimer(key, keyExpireCallback);
      }
    }
  }
  pullDataFromCache(key, target) {
    const data = this._getCache(key);
    if (data) {
      // @ts-expect-error ts-error
      extendFromObject(target, data);
    }
    this._onKeyExpired(key);
  }
  hasData(key) {
    return !!this._cache[key];
  }
  resetCache(key) {
    this._onKeyExpired(key);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCache(key, forceCreate) {
    if (!this._cache[key] && forceCreate) {
      this._cache[key] = {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._cache[key];
  }
  _setExpireTimer(key, callback) {
    // eslint-disable-next-line no-restricted-globals
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
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this._cache[key];
  }
  _clearTimer(key) {
    const timers = this._timers;
    if (timers !== null && timers !== void 0 && timers[key]) {
      clearTimeout(timers[key]);
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete timers[key];
    }
  }
}
