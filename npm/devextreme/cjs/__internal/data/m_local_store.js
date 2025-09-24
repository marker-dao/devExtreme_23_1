/**
* DevExtreme (cjs/__internal/data/m_local_store.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _array_store = _interopRequireDefault(require("../../common/data/array_store"));
var _errors = require("../../common/data/errors");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _window = require("../../core/utils/window");
var _m_abstract_store = _interopRequireDefault(require("./m_abstract_store"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

const window = (0, _window.getWindow)();
class LocalStoreBackend {
  constructor(store, storeOptions) {
    this._store = store;
    this._dirty = !!storeOptions.data;
    const {
      name
    } = storeOptions;
    if (!name) {
      throw _errors.errors.Error('E4013');
    }
    this._key = `dx-data-localStore-${name}`;
    this.save();
    const immediate = this._immediate = storeOptions.immediate;
    const flushInterval = Math.max(100, storeOptions.flushInterval || 10 * 1000);
    if (!immediate) {
      const saveProxy = this.save.bind(this);
      setInterval(saveProxy, flushInterval);
      _events_engine.default.on(window, 'beforeunload', saveProxy);
      // @ts-expect-error
      if (window.cordova) {
        _dom_adapter.default.listen(_dom_adapter.default.getDocument(), 'pause', saveProxy, false);
      }
    }
  }
  notifyChanged() {
    this._dirty = true;
    if (this._immediate) {
      this.save();
    }
  }
  load() {
    this._store._array = this._loadImpl();
    this._dirty = false;
  }
  save() {
    if (!this._dirty) {
      return;
    }
    this._saveImpl(this._store._array);
    this._dirty = false;
  }
  _loadImpl() {
    const raw = window.localStorage.getItem(this._key);
    if (raw) {
      return JSON.parse(raw);
    }
    return [];
  }
  _saveImpl(array) {
    if (!array.length) {
      window.localStorage.removeItem(this._key);
    } else {
      window.localStorage.setItem(this._key, JSON.stringify(array));
    }
  }
}
class LocalStore extends _array_store.default {
  constructor(options) {
    if (typeof options === 'string') {
      options = {
        name: options
      };
    } else {
      options = options || {};
    }
    super(options);
    this._array = options.data || [];
    this._backend = new LocalStoreBackend(this, options);
    this._backend.load();
  }
  _clearCache() {
    this._backend.load();
  }
  clear() {
    super.clear();
    this._backend.notifyChanged();
  }
  _insertImpl(values) {
    const b = this._backend;
    return super._insertImpl(values).done(b.notifyChanged.bind(b));
  }
  _updateImpl(key, values) {
    const b = this._backend;
    return super._updateImpl(key, values).done(b.notifyChanged.bind(b));
  }
  _removeImpl(key) {
    const b = this._backend;
    return super._removeImpl(key).done(b.notifyChanged.bind(b));
  }
}
// Preserve alias registration used by Store.create('local', ...)
// @ts-expect-error register ES6 class with alias
_m_abstract_store.default.registerClass(LocalStore, 'local');
var _default = exports.default = LocalStore;
