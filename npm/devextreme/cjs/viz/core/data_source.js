/**
* DevExtreme (cjs/viz/core/data_source.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.plugin = void 0;
var _common = require("../../core/utils/common");
var _data_helper = _interopRequireDefault(require("../../data_helper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const postCtor = _data_helper.default.postCtor;
let name;
const members = {
  _dataSourceLoadErrorHandler: function () {
    this._dataSourceChangedHandler();
  },
  _dataSourceOptions: function () {
    return {
      paginate: false
    };
  },
  _updateDataSource: function () {
    this._refreshDataSource();
    if (!this.option('dataSource')) {
      this._dataSourceChangedHandler();
    }
  },
  _dataIsLoaded: function () {
    return !this._dataSource || this._dataSource.isLoaded();
  },
  _dataSourceItems: function () {
    return this._dataSource && this._dataSource.items();
  }
};
for (name in _data_helper.default) {
  if (name === 'postCtor') {
    continue;
  }
  members[name] = _data_helper.default[name];
}
const plugin = exports.plugin = {
  name: 'data_source',
  init: function () {
    postCtor.call(this);
  },
  dispose: _common.noop,
  members: members
};
