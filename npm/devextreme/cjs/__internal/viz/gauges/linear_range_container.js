/**
* DevExtreme (cjs/__internal/viz/gauges/linear_range_container.js)
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
var _utils = require("../../viz/core/utils");
var _base_range_container = _interopRequireDefault(require("../../viz/gauges/base_range_container"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-destructuring */

const _Number = Number;
const _max = Math.max;
const LinearRangeContainer = _base_range_container.default.inherit({
  _processOptions() {
    const that = this;
    that.vertical = that._options.vertical;
    that._inner = that._outer = 0;
    if (that.vertical) {
      switch ((0, _utils.normalizeEnum)(that._options.horizontalOrientation)) {
        case 'left':
          that._inner = 1;
          break;
        case 'center':
          that._inner = that._outer = 0.5;
          break;
        default:
          that._outer = 1;
          break;
      }
    } else {
      switch ((0, _utils.normalizeEnum)(that._options.verticalOrientation)) {
        case 'top':
          that._inner = 1;
          break;
        case 'center':
          that._inner = that._outer = 0.5;
          break;
        default:
          that._outer = 1;
          break;
      }
    }
  },
  _isVisible() {
    return true;
  },
  _createRange(range, layout) {
    const that = this;
    const inner = that._inner;
    const outer = that._outer;
    const startPosition = that._translator.translate(range.start);
    const endPosition = that._translator.translate(range.end);
    let points;
    const x = layout.x;
    const y = layout.y;
    const startWidth = range.startWidth;
    const endWidth = range.endWidth;
    if (that.vertical) {
      points = [x - startWidth * inner, startPosition, x - endWidth * inner, endPosition, x + endWidth * outer, endPosition, x + startWidth * outer, startPosition];
    } else {
      points = [startPosition, y + startWidth * outer, startPosition, y - startWidth * inner, endPosition, y - endWidth * inner, endPosition, y + endWidth * outer];
    }
    return that._renderer.path(points, 'area');
  },
  measure(layout) {
    const result = {};
    let width;
    // @ts-expect-error
    result.min = result.max = layout[this.vertical ? 'x' : 'y'];
    width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    // @ts-expect-error
    result.min -= this._inner * width;
    // @ts-expect-error
    result.max += this._outer * width;
    return result;
  }
});
var _default = exports.default = LinearRangeContainer;
