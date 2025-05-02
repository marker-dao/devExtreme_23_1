"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;
var _form = _interopRequireDefault(require("../../../../../ui/form"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Form extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _form.default;
  }
}
exports.Form = Form;