/**
* DevExtreme (cjs/__internal/ui/diagram/diagram.edges_option.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _diagram = _interopRequireDefault(require("../../ui/diagram/diagram.items_option"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EdgesOption extends _diagram.default {
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _getKeyExpr() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._diagramWidget._createOptionGetter('edges.keyExpr');
  }
}
var _default = exports.default = EdgesOption;
