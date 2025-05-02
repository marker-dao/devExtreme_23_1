"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
var _toast = _interopRequireDefault(require("../../../../../ui/toast"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Toast extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _toast.default;
  }
}
exports.Toast = Toast;