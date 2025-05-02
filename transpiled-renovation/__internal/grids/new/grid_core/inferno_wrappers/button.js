"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _button = _interopRequireDefault(require("../../../../../ui/button"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Button extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _button.default;
  }
}
exports.Button = Button;