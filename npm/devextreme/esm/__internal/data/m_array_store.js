/**
* DevExtreme (esm/__internal/data/m_array_store.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { applyBatch, indexByKey, insert, remove, update } from '../../common/data/array_utils';
import { errors } from '../../common/data/errors';
import Query from '../../common/data/query';
import { rejectedPromise, trivialPromise } from '../../common/data/utils';
import Store from '../../data/abstract_store';
// @ts-expect-error
const ArrayStore = Store.inherit({
  ctor(options) {
    if (Array.isArray(options)) {
      options = {
        data: options
      };
    } else {
      options = options || {};
    }
    this.callBase(options);
    const initialArray = options.data;
    if (initialArray && !Array.isArray(initialArray)) {
      throw errors.Error('E4006');
    }
    this._array = initialArray || [];
  },
  createQuery() {
    // @ts-expect-error
    return Query(this._array, {
      errorHandler: this._errorHandler
    });
  },
  _byKeyImpl(key) {
    const index = indexByKey(this, this._array, key);
    if (index === -1) {
      // @ts-expect-error
      return rejectedPromise(errors.Error('E4009'));
    }
    // @ts-expect-error
    return trivialPromise(this._array[index]);
  },
  _insertImpl(values) {
    // @ts-expect-error
    return insert(this, this._array, values);
  },
  _pushImpl(changes) {
    // @ts-expect-error
    applyBatch({
      keyInfo: this,
      data: this._array,
      changes
    });
  },
  _updateImpl(key, values) {
    // @ts-expect-error
    return update(this, this._array, key, values);
  },
  _removeImpl(key) {
    // @ts-expect-error
    return remove(this, this._array, key);
  },
  clear() {
    this._eventsStrategy.fireEvent('modifying');
    this._array = [];
    this._eventsStrategy.fireEvent('modified');
  }
}, 'array');
export default ArrayStore;
