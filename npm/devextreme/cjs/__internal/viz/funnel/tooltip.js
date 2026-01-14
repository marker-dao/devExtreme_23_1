/**
* DevExtreme (cjs/__internal/viz/funnel/tooltip.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = void 0;
var _common = require("../../../core/utils/common");
var _tooltip = require("../../viz/core/tooltip");
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function getCoords(coords, figureCoords, renderer) {
  const offset = renderer.getRootOffset();
  return coords || figureCoords && [(figureCoords[0] + figureCoords[2]) / 2 + offset.left, (figureCoords[1] + figureCoords[5]) / 2 + offset.top] || [-1000, -1000];
}
const plugin = exports.plugin = {
  name: 'funnel-tooltip',
  init: _common.noop,
  dispose: _common.noop,
  extenders: {
    _buildNodes() {
      this.hideTooltip();
    },
    _change_TILING() {
      if (this._tooltipIndex >= 0) {
        this._moveTooltip(this._items[this._tooltipIndex]);
      }
    }
  },
  members: {
    hideTooltip() {
      if (this._tooltipIndex >= 0) {
        this._tooltipIndex = -1;
        this._tooltip.hide();
      }
    },
    _moveTooltip(item, coords) {
      const xy = getCoords(coords, item.coords, this._renderer);
      this._tooltip.move(xy[0], xy[1], 0);
    },
    _showTooltip(index, coords) {
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
        item
      }, {
        x: xy[0],
        y: xy[1],
        offset: 0
      }, {
        item
      }, undefined, callback));
    }
  },
  customize(constructor) {
    constructor.addPlugin(_tooltip.plugin);
  }
};
