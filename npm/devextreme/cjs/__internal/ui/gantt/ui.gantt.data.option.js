/**
* DevExtreme (cjs/__internal/ui/gantt/ui.gantt.data.option.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _m_data_helper = require("../../../__internal/data/m_data_helper");
var _component = require("../../../core/component");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

class DataOption extends _component.Component {
  constructor(optionName, getLoadPanel,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSourceChangedCallback) {
    super();
    this._optionName = optionName;
    this._getLoadPanel = getLoadPanel;
    this._dataSourceChangedCallback = dataSourceChangedCallback;
  }
  insert(data, callback, errorCallback) {
    this._showLoadPanel();
    this._getStore().insert(data).done(response => {
      if (callback) {
        callback(response);
      }
      this._hideLoadPanel();
    }).fail(error => {
      if (errorCallback) {
        errorCallback(error);
      }
      this._hideLoadPanel();
    });
  }
  update(key, data, callback, errorCallback) {
    this._showLoadPanel();
    this._getStore().update(key, data)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .done((data, key) => {
      if (callback) {
        callback(data, key);
      }
      this._hideLoadPanel();
    }).fail(error => {
      if (errorCallback) {
        errorCallback(error);
      }
      this._hideLoadPanel();
    });
  }
  remove(key, callback, errorCallback) {
    this._showLoadPanel();
    this._getStore().remove(key)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .done(key => {
      if (callback) {
        callback(key);
      }
      this._hideLoadPanel();
    }).fail(error => {
      if (errorCallback) {
        errorCallback(error);
      }
      this._hideLoadPanel();
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _dataSourceChangedHandler(newItems, e) {
    this._dataSourceChangedCallback(this._optionName, newItems);
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    // @ts-expect-error ts-error
    if (isLoading && !this._dataSource.isLoaded()) {
      this._showLoadPanel();
    } else {
      this._hideLoadPanel();
    }
  }
  _showLoadPanel() {
    var _this$_getLoadPanel;
    (_this$_getLoadPanel = this._getLoadPanel()) === null || _this$_getLoadPanel === void 0 || _this$_getLoadPanel.show();
  }
  _hideLoadPanel() {
    var _this$_getLoadPanel2;
    (_this$_getLoadPanel2 = this._getLoadPanel()) === null || _this$_getLoadPanel2 === void 0 || _this$_getLoadPanel2.hide();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getStore() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._dataSource.store();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItems() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getStore()._array || this._dataSource.items();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _reloadDataSource() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._dataSource.load();
  }
  dispose() {
    // @ts-expect-error ts-error
    this._disposeDataSource();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'dataSource':
        break;
      default:
        break;
    }
  }
}
// @ts-expect-error ts-error
DataOption.include(_m_data_helper.DataHelperMixin);
var _default = exports.default = DataOption;
