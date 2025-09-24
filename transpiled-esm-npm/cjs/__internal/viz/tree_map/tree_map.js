"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../viz/tree_map/tiling.squarified");
require("../../viz/tree_map/tiling.strip");
require("../../viz/tree_map/tiling.slice_and_dice");
require("../../viz/tree_map/tiling.rotated_slice_and_dice");
require("../../viz/tree_map/colorizing.discrete");
require("../../viz/tree_map/colorizing.gradient");
require("../../viz/tree_map/colorizing.range");
require("../../viz/tree_map/api");
require("../../viz/tree_map/hover");
require("../../viz/tree_map/selection");
require("../../viz/tree_map/tooltip");
require("../../viz/tree_map/tracker");
require("../../viz/tree_map/drilldown");
require("../../viz/tree_map/plain_data_source");
var _export = require("../../viz/core/export");
var _loading_indicator = require("../../viz/core/loading_indicator");
var _title = require("../../viz/core/title");
var _tree_map = _interopRequireDefault(require("../../viz/tree_map/tree_map.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// PLUGINS_SECTION
var _default = exports.default = _tree_map.default;
_tree_map.default.addPlugin(_export.plugin);
_tree_map.default.addPlugin(_title.plugin);
_tree_map.default.addPlugin(_loading_indicator.plugin);