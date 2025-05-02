"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadPanel = void 0;
var _load_panel = _interopRequireDefault(require("../../../../../ui/load_panel"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LoadPanel extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _load_panel.default;
  }
}
exports.LoadPanel = LoadPanel;