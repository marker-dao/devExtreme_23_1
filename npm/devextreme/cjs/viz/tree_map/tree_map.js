/**
* DevExtreme (cjs/viz/tree_map/tree_map.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _tree_map = _interopRequireDefault(require("./tree_map.base"));
require("./tiling.squarified");
require("./tiling.strip");
require("./tiling.slice_and_dice");
require("./tiling.rotated_slice_and_dice");
require("./colorizing.discrete");
require("./colorizing.gradient");
require("./colorizing.range");
require("./api");
require("./hover");
require("./selection");
require("./tooltip");
require("./tracker");
require("./drilldown");
require("./plain_data_source");
var _export = require("../core/export");
var _title = require("../core/title");
var _loading_indicator = require("../core/loading_indicator");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _tree_map.default; // PLUGINS_SECTION
_tree_map.default.addPlugin(_export.plugin);
_tree_map.default.addPlugin(_title.plugin);
_tree_map.default.addPlugin(_loading_indicator.plugin);
module.exports = exports.default;
module.exports.default = exports.default;
