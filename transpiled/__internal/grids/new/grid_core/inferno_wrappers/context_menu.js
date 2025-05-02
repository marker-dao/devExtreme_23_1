"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenu = void 0;
var _context_menu = _interopRequireDefault(require("../../../../../ui/context_menu"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ContextMenu extends _widget_wrapper.InfernoWrapper {
  constructor() {
    super(...arguments);
    this.contentRef = {};
  }
  getComponentFabric() {
    return _context_menu.default;
  }
}
exports.ContextMenu = ContextMenu;