"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tiling = require("../../viz/tree_map/tiling");
var _tilingSquarified = _interopRequireDefault(require("../../viz/tree_map/tiling.squarified.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const _max = Math.max;
function accumulate(total, current) {
  return _max(total, current);
}
function squarified(data) {
  return (0, _tilingSquarified.default)(data, accumulate, false);
}
(0, _tiling.addAlgorithm)('squarified', squarified);
var _default = exports.default = squarified;