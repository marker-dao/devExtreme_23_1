/**
* DevExtreme (cjs/__internal/viz/sankey.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _export = require("../viz/core/export");
var _loading_indicator = require("../viz/core/loading_indicator");
var _title = require("../viz/core/title");
var _tooltip = require("../viz/core/tooltip");
var _sankey = _interopRequireDefault(require("../viz/sankey/sankey"));
var _tooltip2 = require("../viz/sankey/tooltip");
var _tracker = require("../viz/sankey/tracker");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_sankey.default.addPlugin(_export.plugin);
_sankey.default.addPlugin(_title.plugin);
_sankey.default.addPlugin(_tracker.plugin);
_sankey.default.addPlugin(_loading_indicator.plugin);
_sankey.default.addPlugin(_tooltip.plugin);
(0, _tooltip2.setTooltipCustomOptions)(_sankey.default);
var _default = exports.default = _sankey.default;
