/**
* DevExtreme (cjs/viz/tree_map/tiling.squarified.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _tilingSquarified = _interopRequireDefault(require("./tiling.squarified.base"));
var _tiling = require("./tiling");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const _max = Math.max;
function accumulate(total, current) {
  return _max(total, current);
}
function squarified(data) {
  return (0, _tilingSquarified.default)(data, accumulate, false);
}
(0, _tiling.addAlgorithm)('squarified', squarified);
var _default = exports.default = squarified;
module.exports = exports.default;
module.exports.default = exports.default;
