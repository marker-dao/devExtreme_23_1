"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sortable = void 0;
var _inferno = require("inferno");
var _sortable = _interopRequireDefault(require("../../../../../ui/sortable"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Sortable extends _widget_wrapper.InfernoWrapper {
  render() {
    return (0, _inferno.createVNode)(1, "div", this.props.className, this.props.children, 0, null, null, this.ref);
  }
  getComponentFabric() {
    return _sortable.default;
  }
}
exports.Sortable = Sortable;