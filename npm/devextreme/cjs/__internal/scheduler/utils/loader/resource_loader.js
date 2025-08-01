/**
* DevExtreme (cjs/__internal/scheduler/utils/loader/resource_loader.js)
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
exports.ResourceLoader = void 0;
var _appointment_resource_data_accessor = require("../data_accessor/appointment_resource_data_accessor");
var _resource_data_accessor = require("../data_accessor/resource_data_accessor");
var _loader = require("./loader");
class ResourceLoader extends _loader.Loader {
  constructor(config) {
    super(config, {
      pageSize: 0
    });
    const accessor = (0, _appointment_resource_data_accessor.getAppointmentResourceAccessor)(config);
    this.idsGetter = accessor.idsGetter;
    this.idsSetter = accessor.idsSetter;
    this.dataAccessor = new _resource_data_accessor.ResourceDataAccessor(config);
    this.allowMultiple = Boolean(config.allowMultiple);
    this.useColorAsDefault = Boolean(config.useColorAsDefault);
    this.resourceIndex = String((0, _appointment_resource_data_accessor.getResourceIndex)(config));
    this.resourceName = config.label;
    this.onInit();
  }
  onLoadTransform(items) {
    return items.map(item => ({
      id: this.dataAccessor.get('id', item),
      text: this.dataAccessor.get('text', item),
      color: this.dataAccessor.get('color', item)
    }));
  }
  applyChanges(items) {
    super.applyChanges(items);
  }
  onLoadError() {}
  onChange() {}
}
exports.ResourceLoader = ResourceLoader;
