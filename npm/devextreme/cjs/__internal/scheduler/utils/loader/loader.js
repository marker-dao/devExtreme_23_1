/**
* DevExtreme (cjs/__internal/scheduler/utils/loader/loader.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = void 0;
var _common = require("../../../../core/utils/common");
var _data_source = _interopRequireDefault(require("../../../../data/data_source"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO(9): implement appointmentLoader extends Loader for the mane dataSource of the scheduler
class Loader {
  constructor(config, dataSourceOptions) {
    this.items = [];
    this.data = [];
    this.unsubscribe = _common.noop;
    this.dataSource = (0, _utils.normalizeDataSource)(config.dataSource, dataSourceOptions);
    this.isSharedDataSource = config.dataSource instanceof _data_source.default;
    this.addDataSourceHandlers();
  }
  onInit() {
    if (this.isLoaded()) {
      var _this$dataSource;
      this.applyChanges(((_this$dataSource = this.dataSource) === null || _this$dataSource === void 0 ? void 0 : _this$dataSource.items()) ?? []);
    }
  }
  isLoaded() {
    var _this$dataSource2;
    return Boolean((_this$dataSource2 = this.dataSource) === null || _this$dataSource2 === void 0 ? void 0 : _this$dataSource2.isLoaded());
  }
  addDataSourceHandlers() {
    const onChange = this.onChange.bind(this);
    const onLoadingChanged = this.onLoadingChanged.bind(this);
    const onLoadError = this.onLoadError.bind(this);
    const {
      dataSource
    } = this;
    if (dataSource) {
      dataSource.on('changed', onChange);
      dataSource.on('loadingChanged', onLoadingChanged);
      dataSource.on('loadError', onLoadError);
      this.unsubscribe = () => {
        dataSource.off('changed', onChange);
        dataSource.off('loadingChanged', onLoadingChanged);
        dataSource.off('loadError', onLoadError);
      };
    }
  }
  async load() {
    let forceReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (this.dataSource && (forceReload || !this.dataSource.isLoaded() && !this.loadingStatePromise)) {
      this.loadingStatePromise = this.loadingStatePromise && !forceReload ? this.loadingStatePromise : (0, _utils.loadResource)(this.dataSource, forceReload);
    }
    await this.loadingStatePromise;
  }
  onLoadingChanged(isLoading) {
    if (!isLoading && this.isLoaded()) {
      var _this$dataSource3;
      this.applyChanges(((_this$dataSource3 = this.dataSource) === null || _this$dataSource3 === void 0 ? void 0 : _this$dataSource3.items()) ?? []);
    }
  }
  applyChanges(items) {
    if (items && items !== this.data) {
      this.data = items;
      this.items = this.onLoadTransform(this.data);
    }
  }
  dispose() {
    if (this.dataSource) {
      if (this.isSharedDataSource) {
        this.unsubscribe();
        this.unsubscribe = _common.noop;
      } else {
        this.dataSource.dispose();
      }
      this.data = [];
      this.items = [];
    }
  }
}
exports.Loader = Loader;
