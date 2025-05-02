"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pager = void 0;
var _pagination = _interopRequireDefault(require("../../../../../ui/pagination"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Pager extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _pagination.default;
  }
}
exports.Pager = Pager;