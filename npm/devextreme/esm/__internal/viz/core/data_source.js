/**
* DevExtreme (esm/__internal/viz/core/data_source.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { noop } from '../../../core/utils/common';
import DataHelperMixin from '../../../data_helper';
// @ts-expect-error
const {
  postCtor
} = DataHelperMixin;
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
for (name in DataHelperMixin) {
  if (name === 'postCtor') {
    continue;
  }
  members[name] = DataHelperMixin[name];
}
export const plugin = {
  name: 'data_source',
  init() {
    postCtor.call(this);
  },
  dispose: noop,
  members
};
