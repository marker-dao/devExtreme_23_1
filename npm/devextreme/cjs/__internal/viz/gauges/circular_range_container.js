/**
* DevExtreme (cjs/__internal/viz/gauges/circular_range_container.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-destructuring */

const _Number = Number;
const _max = Math.max;
const CircularRangeContainer = _base_range_container.default.inherit({
  _processOptions() {
    const that = this;
    that._inner = that._outer = 0;
    switch ((0, _utils.normalizeEnum)(that._options.orientation)) {
      case 'inside':
        that._inner = 1;
        break;
      case 'center':
        that._inner = that._outer = 0.5;
        break;
      default:
        that._outer = 1;
        break;
    }
  },
  _isVisible(layout) {
    let width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    return layout.radius - this._inner * width > 0;
  },
  _createRange(range, layout) {
    const that = this;
    const width = (range.startWidth + range.endWidth) / 2;
    return that._renderer.arc(layout.x, layout.y, layout.radius - that._inner * width, layout.radius + that._outer * width, that._translator.translate(range.end), that._translator.translate(range.start)).attr({
      'stroke-linejoin': 'round'
    });
  },
  measure(layout) {
    let width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    return {
      min: layout.radius - this._inner * width,
      max: layout.radius + this._outer * width
    };
  }
});
var _default = exports.default = CircularRangeContainer;
