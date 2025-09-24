/**
* DevExtreme (cjs/__internal/viz/vector_map/data_exchanger.js)
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
exports.DataExchanger = DataExchanger;
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */

function DataExchanger() {
  this._store = {};
}
DataExchanger.prototype = {
  constructor: DataExchanger,
  dispose() {
    this._store = null;
    return this;
  },
  _get(category, name) {
    const store = this._store[category] || (this._store[category] = {});
    return store[name] || (store[name] = {
      callbacks: (0, _callbacks.default)()
    });
  },
  set(category, name, data) {
    const item = this._get(category, name);
    item.data = data;
    item.callbacks.fire(data);
    return this;
  },
  bind(category, name, callback) {
    const item = this._get(category, name);
    item.callbacks.add(callback);
    item.data && callback(item.data);
    return this;
  },
  unbind(category, name, callback) {
    const item = this._get(category, name);
    item.callbacks.remove(callback);
    return this;
  }
};
