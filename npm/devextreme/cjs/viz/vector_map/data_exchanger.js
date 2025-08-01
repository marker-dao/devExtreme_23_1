/**
* DevExtreme (cjs/viz/vector_map/data_exchanger.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.DataExchanger = DataExchanger;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function DataExchanger() {
  this._store = {};
}
DataExchanger.prototype = {
  constructor: DataExchanger,
  dispose: function () {
    this._store = null;
    return this;
  },
  _get: function (category, name) {
    const store = this._store[category] || (this._store[category] = {});
    return store[name] || (store[name] = {
      callbacks: (0, _callbacks.default)()
    });
  },
  set: function (category, name, data) {
    const item = this._get(category, name);
    item.data = data;
    item.callbacks.fire(data);
    return this;
  },
  bind: function (category, name, callback) {
    const item = this._get(category, name);
    item.callbacks.add(callback);
    item.data && callback(item.data);
    return this;
  },
  unbind: function (category, name, callback) {
    const item = this._get(category, name);
    item.callbacks.remove(callback);
    return this;
  }
};
