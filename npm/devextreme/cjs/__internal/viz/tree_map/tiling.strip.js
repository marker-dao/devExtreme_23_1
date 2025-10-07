/**
* DevExtreme (cjs/__internal/viz/tree_map/tiling.strip.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tiling = require("../../viz/tree_map/tiling");
var _tilingSquarified = _interopRequireDefault(require("../../viz/tree_map/tiling.squarified.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function accumulate(total, current, count) {
  return ((count - 1) * total + current) / count;
}
function strip(data) {
  return (0, _tilingSquarified.default)(data, accumulate, true);
}
(0, _tiling.addAlgorithm)('strip', strip);
var _default = exports.default = strip;
