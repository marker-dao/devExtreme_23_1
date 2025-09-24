"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legend = require("../viz/components/legend");
var _export = require("../viz/core/export");
var _loading_indicator = require("../viz/core/loading_indicator");
var _title = require("../viz/core/title");
var _funnel = _interopRequireDefault(require("../viz/funnel/funnel"));
var _label = require("../viz/funnel/label");
var _tooltip = require("../viz/funnel/tooltip");
var _tracker = require("../viz/funnel/tracker");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_funnel.default.addPlugin(_label.plugin);
_funnel.default.addPlugin(_export.plugin);
_funnel.default.addPlugin(_title.plugin);
_funnel.default.addPlugin(_legend.plugin);
_funnel.default.addPlugin(_tracker.plugin);
_funnel.default.addPlugin(_tooltip.plugin);
_funnel.default.addPlugin(_loading_indicator.plugin);
var _default = exports.default = _funnel.default;