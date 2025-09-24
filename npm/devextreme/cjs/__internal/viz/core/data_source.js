/**
* DevExtreme (cjs/__internal/viz/core/data_source.js)
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
exports.plugin = void 0;
var _common = require("../../../core/utils/common");
var _data_helper = _interopRequireDefault(require("../../../data_helper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// @ts-expect-error
const {
  postCtor
} = _data_helper.default;
let name;
const members = {
  _dataSourceLoadErrorHandler() {
    this._dataSourceChangedHandler();
  },
  _dataSourceOptions() {
    return {
      paginate: false
    };
  },
  _updateDataSource() {
    this._refreshDataSource();
    if (!this.option('dataSource')) {
      this._dataSourceChangedHandler();
    }
  },
  _dataIsLoaded() {
    return !this._dataSource || this._dataSource.isLoaded();
  },
  _dataSourceItems() {
    var _this$_dataSource;
    return (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource.items();
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
  init() {
    postCtor.call(this);
  },
  dispose: _common.noop,
  members
};
