"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _diagram = _interopRequireDefault(require("../../ui/diagram/diagram.items_option"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NodesOption extends _diagram.default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getKeyExpr() {
    return this._diagramWidget._createOptionGetter('nodes.keyExpr');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getItemsExpr() {
    return this._diagramWidget._createOptionGetter('nodes.itemsExpr');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getContainerChildrenExpr() {
    return this._diagramWidget._createOptionGetter('nodes.containerChildrenExpr');
  }
}
var _default = exports.default = NodesOption;