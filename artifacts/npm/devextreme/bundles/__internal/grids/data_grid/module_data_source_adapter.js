/**
* DevExtreme (bundles/__internal/grids/data_grid/module_data_source_adapter.js)
* Version: 23.1.1
* Build date: Mon May 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiGrid_core = _interopRequireDefault(require("../../../ui/grid_core/ui.grid_core.data_source_adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var dataSourceAdapterType = _uiGrid_core.default;
var _default = {
  extend: function extend(extender) {
    dataSourceAdapterType = dataSourceAdapterType.inherit(extender);
  },
  create: function create(component) {
    // eslint-disable-next-line new-cap
    return new dataSourceAdapterType(component);
  }
};
exports.default = _default;
