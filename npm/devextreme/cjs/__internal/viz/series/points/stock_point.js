/**
* DevExtreme (cjs/__internal/viz/series/points/stock_point.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extend2 = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _candlestick_point = _interopRequireDefault(require("../../../viz/series/points/candlestick_point"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @stylistic/no-mixed-operators */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */

const _extend = _extend2.extend;
const _isNumeric = _type.isNumeric;
var _default = exports.default = _extend({}, _candlestick_point.default, {
  _getPoints() {
    const that = this;
    const createPoint = that._options.rotated ? function (x, y) {
      return [y, x];
    } : function (x, y) {
      return [x, y];
    };
    const openYExist = _isNumeric(that.openY);
    const closeYExist = _isNumeric(that.closeY);
    const x = that.x;
    const width = that.width;
    // @ts-expect-error
    let points = [].concat(createPoint(x, that.highY));
    // @ts-expect-error
    openYExist && (points = points.concat(createPoint(x, that.openY)));
    // @ts-expect-error
    openYExist && (points = points.concat(createPoint(x - width / 2, that.openY)));
    // @ts-expect-error
    openYExist && (points = points.concat(createPoint(x, that.openY)));
    // @ts-expect-error
    closeYExist && (points = points.concat(createPoint(x, that.closeY)));
    // @ts-expect-error
    closeYExist && (points = points.concat(createPoint(x + width / 2, that.closeY)));
    // @ts-expect-error
    closeYExist && (points = points.concat(createPoint(x, that.closeY)));
    // @ts-expect-error
    points = points.concat(createPoint(x, that.lowY));
    return points;
  },
  _drawMarkerInGroup(group, attributes, renderer) {
    this.graphic = renderer.path(this._getPoints(), 'line').attr({
      'stroke-linecap': 'square'
    }).attr(attributes).data({
      'chart-data-point': this
    }).sharp().append(group);
  },
  _getMinTrackerWidth() {
    const width = 2 + this._styles.normal['stroke-width'];
    return width + width % 2;
  }
});
