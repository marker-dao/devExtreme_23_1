/**
* DevExtreme (cjs/__internal/viz/tree_map/tooltip.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

require("../../viz/tree_map/api");
var _helpers = require("../../viz/core/helpers");
var _tooltip = require("../../viz/core/tooltip");
var _tree_map = _interopRequireDefault(require("../../viz/tree_map/tree_map.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// PLUGINS_SECTION\

const proto = _tree_map.default.prototype;
(0, _helpers.expand)(proto, '_extendProxyType', function (proto) {
  const that = this;
  proto.showTooltip = function (coords) {
    that._showTooltip(this._id, coords);
  };
});
(0, _helpers.expand)(proto, '_onNodesCreated', function () {
  if (this._tooltipIndex >= 0) {
    this._tooltip.hide();
  }
  this._tooltipIndex = -1;
});
(0, _helpers.expand)(proto, '_onTilingPerformed', function () {
  if (this._tooltipIndex >= 0) {
    this._moveTooltip(this._nodes[this._tooltipIndex]);
  }
});
function getCoords(coords, rect, renderer) {
  const offset = renderer.getRootOffset();
  return coords || rect && [(rect[0] + rect[2]) / 2 + offset.left, (rect[1] + rect[3]) / 2 + offset.top] || [-1000, -1000];
}
proto._showTooltip = function (index, coords) {
  const that = this;
  const tooltip = that._tooltip;
  const node = that._nodes[index];
  if (that._tooltipIndex === index) {
    that._moveTooltip(node, coords);
    return;
  }
  const callback = result => {
    if (result === undefined) {
      return;
    }
    if (!result) {
      tooltip.hide();
    }
    that._tooltipIndex = result ? index : -1;
  };
  const xy = getCoords(coords, node.rect, this._renderer);
  callback(tooltip.show({
    value: node.value,
    valueText: tooltip.formatValue(node.value),
    node: node.proxy
  }, {
    x: xy[0],
    y: xy[1],
    offset: 0
  }, {
    node: node.proxy
  }, undefined, callback));
};
proto._moveTooltip = function (node, coords) {
  const xy = getCoords(coords, node.rect, this._renderer);
  this._tooltip.move(xy[0], xy[1], 0);
};
proto.hideTooltip = function () {
  if (this._tooltipIndex >= 0) {
    this._tooltipIndex = -1;
    this._tooltip.hide();
  }
};
_tree_map.default.addPlugin(_tooltip.plugin);
