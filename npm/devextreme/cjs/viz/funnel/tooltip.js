/**
* DevExtreme (cjs/viz/funnel/tooltip.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.plugin = void 0;
var _common = require("../../core/utils/common");
var _tooltip = require("../core/tooltip");
function getCoords(coords, figureCoords, renderer) {
  const offset = renderer.getRootOffset();
  return coords || figureCoords && [(figureCoords[0] + figureCoords[2]) / 2 + offset.left, (figureCoords[1] + figureCoords[5]) / 2 + offset.top] || [-1000, -1000];
}
const plugin = exports.plugin = {
  name: 'funnel-tooltip',
  init: _common.noop,
  dispose: _common.noop,
  extenders: {
    _buildNodes: function () {
      this.hideTooltip();
    },
    _change_TILING: function () {
      if (this._tooltipIndex >= 0) {
        this._moveTooltip(this._items[this._tooltipIndex]);
      }
    }
  },
  members: {
    hideTooltip: function () {
      if (this._tooltipIndex >= 0) {
        this._tooltipIndex = -1;
        this._tooltip.hide();
      }
    },
    _moveTooltip: function (item, coords) {
      const xy = getCoords(coords, item.coords, this._renderer);
      this._tooltip.move(xy[0], xy[1], 0);
    },
    _showTooltip: function (index, coords) {
      const that = this;
      const tooltip = that._tooltip;
      const item = that._items[index];
      if (that._tooltipIndex === index) {
        that._moveTooltip(item, coords);
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
      const xy = getCoords(coords, item.coords, this._renderer);
      callback(tooltip.show({
        value: item.value,
        valueText: tooltip.formatValue(item.value),
        percentText: tooltip.formatValue(item.percent, 'percent'),
        percent: item.percent,
        item: item
      }, {
        x: xy[0],
        y: xy[1],
        offset: 0
      }, {
        item: item
      }, undefined, callback));
    }
  },
  customize: function (constructor) {
    constructor.addPlugin(_tooltip.plugin);
  }
};
