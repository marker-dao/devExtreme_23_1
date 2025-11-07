"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastModel = void 0;
var _toast = _interopRequireDefault(require("../../../../../ui/toast"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ToastModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getInstance() {
    return _toast.default.getInstance(this.root);
  }
}
exports.ToastModel = ToastModel;