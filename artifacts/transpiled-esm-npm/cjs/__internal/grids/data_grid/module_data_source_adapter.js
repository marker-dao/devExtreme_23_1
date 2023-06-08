"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _module = _interopRequireDefault(require("../grid_core/data_source_adapter/module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var dataSourceAdapterType = _module.default;
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