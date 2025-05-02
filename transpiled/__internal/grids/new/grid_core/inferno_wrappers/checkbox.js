"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = void 0;
var _check_box = _interopRequireDefault(require("../../../../../ui/check_box"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckBox extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _check_box.default;
  }
}
exports.CheckBox = CheckBox;