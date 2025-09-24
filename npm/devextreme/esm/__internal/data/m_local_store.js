/**
* DevExtreme (esm/__internal/data/m_local_store.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import eventsEngine from '../../common/core/events/core/events_engine';
import ArrayStore from '../../common/data/array_store';
import { errors } from '../../common/data/errors';
import domAdapter from '../../core/dom_adapter';
import { getWindow } from '../../core/utils/window';
import Store from './m_abstract_store';
const window = getWindow();
class LocalStoreBackend {
  constructor(store, storeOptions) {
    this._store = store;
    this._dirty = !!storeOptions.data;
    const {
      name
    } = storeOptions;
    if (!name) {
      throw errors.Error('E4013');
    }
    this._key = `dx-data-localStore-${name}`;
    this.save();
    const immediate = this._immediate = storeOptions.immediate;
    const flushInterval = Math.max(100, storeOptions.flushInterval || 10 * 1000);
    if (!immediate) {
      const saveProxy = this.save.bind(this);
      setInterval(saveProxy, flushInterval);
      eventsEngine.on(window, 'beforeunload', saveProxy);
      // @ts-expect-error
      if (window.cordova) {
        domAdapter.listen(domAdapter.getDocument(), 'pause', saveProxy, false);
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
class LocalStore extends ArrayStore {
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
Store.registerClass(LocalStore, 'local');
export default LocalStore;
