/**
* DevExtreme (cjs/__internal/data/m_local_store.js)
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
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _array_store = _interopRequireDefault(require("../../common/data/array_store"));
var _errors = require("../../common/data/errors");
var _class = _interopRequireDefault(require("../../core/class"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _window = require("../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
const {
  abstract
} = _class.default;
const LocalStoreBackend = _class.default.inherit({
  ctor(store, storeOptions) {
    this._store = store;
    this._dirty = !!storeOptions.data;
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
  },
  notifyChanged() {
    this._dirty = true;
    if (this._immediate) {
      this.save();
    }
  },
  load() {
    this._store._array = this._loadImpl();
    this._dirty = false;
  },
  save() {
    if (!this._dirty) {
      return;
    }
    this._saveImpl(this._store._array);
    this._dirty = false;
  },
  _loadImpl: abstract,
  _saveImpl: abstract
});
const DomLocalStoreBackend = LocalStoreBackend.inherit({
  ctor(store, storeOptions) {
    const {
      name
    } = storeOptions;
    if (!name) {
      throw _errors.errors.Error('E4013');
    }
    this._key = `dx-data-localStore-${name}`;
    this.callBase(store, storeOptions);
  },
  _loadImpl() {
    const raw = window.localStorage.getItem(this._key);
    if (raw) {
      return JSON.parse(raw);
    }
    return [];
  },
  _saveImpl(array) {
    if (!array.length) {
      window.localStorage.removeItem(this._key);
    } else {
      window.localStorage.setItem(this._key, JSON.stringify(array));
    }
  }
});
const localStoreBackends = {
  dom: DomLocalStoreBackend
};
const LocalStore = _array_store.default.inherit({
  ctor(options) {
    if (typeof options === 'string') {
      options = {
        name: options
      };
    } else {
      options = options || {};
    }
    this.callBase(options);
    this._backend = new localStoreBackends[options.backend || 'dom'](this, options);
    this._backend.load();
  },
  _clearCache() {
    this._backend.load();
  },
  clear() {
    this.callBase();
    this._backend.notifyChanged();
  },
  _insertImpl(values) {
    const b = this._backend;
    return this.callBase(values).done(b.notifyChanged.bind(b));
  },
  _updateImpl(key, values) {
    const b = this._backend;
    return this.callBase(key, values).done(b.notifyChanged.bind(b));
  },
  _removeImpl(key) {
    const b = this._backend;
    return this.callBase(key).done(b.notifyChanged.bind(b));
  }
}, 'local');
var _default = exports.default = LocalStore;
