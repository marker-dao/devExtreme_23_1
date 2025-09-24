/**
* DevExtreme (cjs/__internal/viz/axes/polar_axes.js)
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
exports.linearSpider = exports.linear = exports.circularSpider = exports.circular = void 0;
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _axes_constants = _interopRequireDefault(require("../../viz/axes/axes_constants"));
var _axes_utils = require("../../viz/axes/axes_utils");
var _tick = require("../../viz/axes/tick");
var _xy_axes = _interopRequireDefault(require("../../viz/axes/xy_axes"));
var _utils = require("../../viz/core/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable @stylistic/no-mixed-operators */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

const {
  PI,
  abs,
  atan,
  round
} = Math;
const _min = Math.min;
const _max = Math.max;
const xyAxesLinear = _xy_axes.default.linear;
const HALF_PI_ANGLE = 90;
function getPolarQuarter(angle) {
  let quarter;
  angle = (0, _utils.normalizeAngle)(angle);
  if (angle >= 315 && angle <= 360 || angle < 45 && angle >= 0) {
    quarter = 1;
  } else if (angle >= 45 && angle < 135) {
    quarter = 2;
  } else if (angle >= 135 && angle < 225) {
    quarter = 3;
  } else if (angle >= 225 && angle < 315) {
    quarter = 4;
  }
  return quarter;
}
const circularAxes = {
  _calculateValueMargins(ticks) {
    let {
      minVisible,
      maxVisible
    } = this._getViewportRange();
    if (ticks && ticks.length > 1) {
      minVisible = minVisible < ticks[0].value ? minVisible : ticks[0].value;
      maxVisible = minVisible > ticks[ticks.length - 1].value ? maxVisible : ticks[ticks.length - 1].value;
    }
    return {
      minValue: minVisible,
      maxValue: maxVisible
    };
  },
  applyMargins() {
    const margins = this._calculateValueMargins(this._majorTicks);
    const br = this._translator.getBusinessRange();
    br.addRange({
      minVisible: margins.minValue,
      maxVisible: margins.maxValue,
      interval: this._calculateRangeInterval(br.interval)
    });
    this._translator.updateBusinessRange(br);
  },
  _getTranslatorOptions() {
    return {
      isHorizontal: true,
      conversionValue: true,
      addSpiderCategory: this._getSpiderCategoryOption(),
      stick: this._getStick()
    };
  },
  getCenter() {
    return this._center;
  },
  getRadius() {
    return this._radius;
  },
  getAngles() {
    const options = this._options;
    return [options.startAngle, options.endAngle];
  },
  _updateRadius(canvas) {
    const rad = _min(canvas.width - canvas.left - canvas.right, canvas.height - canvas.top - canvas.bottom) / 2;
    this._radius = rad < 0 ? 0 : rad;
  },
  _updateCenter(canvas) {
    this._center = {
      x: canvas.left + (canvas.width - canvas.right - canvas.left) / 2,
      y: canvas.top + (canvas.height - canvas.top - canvas.bottom) / 2
    };
  },
  _processCanvas(canvas) {
    this._updateRadius(canvas);
    this._updateCenter(canvas);
    return {
      left: 0,
      right: 0,
      width: this._getScreenDelta()
    };
  },
  _createAxisElement() {
    return this._renderer.circle();
  },
  _updateAxisElementPosition() {
    const center = this.getCenter();
    this._axisElement.attr({
      cx: center.x,
      cy: center.y,
      r: this.getRadius()
    });
  },
  _boundaryTicksVisibility: {
    min: true
  },
  _getSpiderCategoryOption() {
    return this._options.firstPointOnStartAngle;
  },
  _validateOptions(options) {
    const that = this;
    let originValue = options.originValue;
    const wholeRange = options.wholeRange = {};
    const period = options.period;
    if ((0, _type.isDefined)(originValue)) {
      originValue = that.validateUnit(originValue);
    }
    if (period > 0 && options.argumentType === _axes_constants.default.numeric) {
      originValue = originValue || 0;
      // @ts-expect-error
      wholeRange.endValue = originValue + period;
      // @ts-expect-error
      that._viewport = (0, _utils.getVizRangeObject)([originValue, wholeRange.endValue]);
    }
    if ((0, _type.isDefined)(originValue)) {
      // @ts-expect-error
      wholeRange.startValue = originValue;
    }
  },
  getMargins() {
    const tickOptions = this._options.tick;
    const tickOuterLength = _max(tickOptions.visible ? tickOptions.length / 2 + tickOptions.shift : 0, 0);
    const radius = this.getRadius();
    const {
      x,
      y
    } = this._center;
    const labelBoxes = this._majorTicks.map(t => t.label && t.label.getBBox()).filter(b => b);
    const canvas = (0, _extend.extend)({}, this._canvas, {
      left: x - radius,
      top: y - radius,
      right: this._canvas.width - (x + radius),
      bottom: this._canvas.height - (y + radius)
    });
    const margins = (0, _axes_utils.calculateCanvasMargins)(labelBoxes, canvas);
    Object.keys(margins).forEach(k => margins[k] = margins[k] < tickOuterLength ? tickOuterLength : margins[k]);
    return margins;
  },
  _updateLabelsPosition() {
    const that = this;
    (0, _axes_utils.measureLabels)(that._majorTicks);
    that._adjustLabelsCoord(0, 0, true);
    that._checkBoundedLabelsOverlapping(this._majorTicks, this._majorTicks.map(t => t.labelBBox));
  },
  _setVisualRange: _common.noop,
  applyVisualRangeSetter: _common.noop,
  _getStick() {
    return this._options.firstPointOnStartAngle || this._options.type !== _axes_constants.default.discrete;
  },
  _getTranslatedCoord(value, offset) {
    return this._translator.translate(value, offset) - HALF_PI_ANGLE;
  },
  _getCanvasStartEnd() {
    return {
      start: 0 - HALF_PI_ANGLE,
      end: 360 - HALF_PI_ANGLE
    };
  },
  _getStripGraphicAttributes(fromAngle, toAngle) {
    const center = this.getCenter();
    const angle = this.getAngles()[0];
    const r = this.getRadius();
    return {
      x: center.x,
      y: center.y,
      innerRadius: 0,
      outerRadius: r,
      startAngle: -toAngle - angle,
      endAngle: -fromAngle - angle
    };
  },
  _createStrip(coords) {
    return this._renderer.arc(coords.x, coords.y, coords.innerRadius, coords.outerRadius, coords.startAngle, coords.endAngle);
  },
  _getStripLabelCoords(from, to) {
    const that = this;
    const coords = that._getStripGraphicAttributes(from, to);
    const angle = coords.startAngle + (coords.endAngle - coords.startAngle) / 2;
    const cosSin = (0, _utils.getCosAndSin)(angle);
    const halfRad = that.getRadius() / 2;
    const center = that.getCenter();
    const x = round(center.x + halfRad * cosSin.cos);
    const y = round(center.y - halfRad * cosSin.sin);
    return {
      x,
      y,
      align: _axes_constants.default.center
    };
  },
  _getConstantLineGraphicAttributes(value) {
    const center = this.getCenter();
    const r = this.getRadius();
    return {
      points: [center.x, center.y, center.x + r, center.y]
    };
  },
  _createConstantLine(value, attr) {
    return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr);
  },
  _rotateConstantLine(line, value) {
    const {
      x,
      y
    } = this.getCenter();
    line.rotate(value + this.getAngles()[0], x, y);
  },
  _getConstantLineLabelsCoords(value) {
    const that = this;
    const cosSin = (0, _utils.getCosAndSin)(-value - that.getAngles()[0]);
    const halfRad = that.getRadius() / 2;
    const center = that.getCenter();
    const x = round(center.x + halfRad * cosSin.cos);
    const y = round(center.y - halfRad * cosSin.sin);
    return {
      x,
      y
    };
  },
  _checkAlignmentConstantLineLabels: _common.noop,
  _adjustDivisionFactor(val) {
    return val * 180 / (this.getRadius() * PI);
  },
  _getScreenDelta() {
    const angles = this.getAngles();
    return abs(angles[0] - angles[1]);
  },
  _getTickMarkPoints(coords, length, _ref) {
    let {
      shift = 0
    } = _ref;
    const center = this.getCenter();
    const corrections = {
      inside: -1,
      center: -0.5,
      outside: 0
    };
    const radiusWithTicks = this.getRadius() + length * corrections[this._options.tickOrientation || 'center'];
    return [center.x + radiusWithTicks + shift, center.y, center.x + radiusWithTicks + length + shift, center.y];
  },
  _getLabelAdjustedCoord(tick, _offset, _maxWidth, checkCanvas) {
    const that = this;
    const labelCoords = tick.labelCoords;
    const labelY = labelCoords.y;
    const labelAngle = labelCoords.angle;
    const cosSin = (0, _utils.getCosAndSin)(labelAngle);
    const cos = cosSin.cos;
    const sin = cosSin.sin;
    const box = tick.labelBBox;
    const halfWidth = box.width / 2;
    const halfHeight = box.height / 2;
    const indentFromAxis = that._options.label.indentFromAxis || 0;
    const x = labelCoords.x + indentFromAxis * cos;
    const y = labelY + (labelY - box.y - halfHeight) + indentFromAxis * sin;
    let shiftX = 0;
    let shiftY = 0;
    switch (getPolarQuarter(labelAngle)) {
      case 1:
        shiftX = halfWidth;
        shiftY = halfHeight * sin;
        break;
      case 2:
        shiftX = halfWidth * cos;
        shiftY = halfHeight;
        break;
      case 3:
        shiftX = -halfWidth;
        shiftY = halfHeight * sin;
        break;
      case 4:
        shiftX = halfWidth * cos;
        shiftY = -halfHeight;
        break;
    }
    if (checkCanvas) {
      const canvas = that._canvas;
      const boxShiftX = x - labelCoords.x + shiftX;
      const boxShiftY = y - labelCoords.y + shiftY;
      if (box.x + boxShiftX < canvas.originalLeft) {
        shiftX -= box.x + boxShiftX - canvas.originalLeft;
      }
      if (box.x + box.width + boxShiftX > canvas.width - canvas.originalRight) {
        shiftX -= box.x + box.width + boxShiftX - (canvas.width - canvas.originalRight);
      }
      if (box.y + boxShiftY < canvas.originalTop) {
        shiftY -= box.y + boxShiftY - canvas.originalTop;
      }
      if (box.y + box.height + boxShiftY > canvas.height - canvas.originalBottom) {
        shiftY -= box.y + box.height + boxShiftY - (canvas.height - canvas.originalBottom);
      }
    }
    return {
      x: x + shiftX,
      y: y + shiftY
    };
  },
  _getGridLineDrawer() {
    const that = this;
    return function (tick, gridStyle) {
      const center = that.getCenter();
      return that._createPathElement(that._getGridPoints().points, gridStyle).rotate(tick.coords.angle, center.x, center.y);
    };
  },
  _getGridPoints() {
    const r = this.getRadius();
    const center = this.getCenter();
    return {
      points: [center.x, center.y, center.x + r, center.y]
    };
  },
  _getTranslatedValue(value, offset) {
    const startAngle = this.getAngles()[0];
    const angle = this._translator.translate(value, -offset);
    const coords = (0, _utils.convertPolarToXY)(this.getCenter(), startAngle, angle, this.getRadius());
    return {
      x: coords.x,
      y: coords.y,
      angle: this.getTranslatedAngle(angle)
    };
  },
  _getAdjustedStripLabelCoords(strip) {
    const box = strip.labelBBox;
    return {
      translateY: strip.label.attr('y') - box.y - box.height / 2
    };
  },
  coordsIn(x, y) {
    return (0, _utils.convertXYToPolar)(this.getCenter(), x, y).r > this.getRadius();
  },
  _rotateTick(element, coords) {
    const center = this.getCenter();
    element.rotate(coords.angle, center.x, center.y);
  },
  _validateOverlappingMode(mode) {
    return _axes_constants.default.validateOverlappingMode(mode);
  },
  _validateDisplayMode() {
    return 'standard';
  },
  _getStep(boxes) {
    const that = this;
    const radius = that.getRadius() + (that._options.label.indentFromAxis || 0);
    const maxLabelBox = boxes.reduce((prevValue, box) => {
      const curValue = prevValue;
      if (prevValue.width < box.width) {
        curValue.width = box.width;
      }
      if (prevValue.height < box.height) {
        curValue.height = box.height;
      }
      return curValue;
    }, {
      width: 0,
      height: 0
    });
    const angle1 = abs(2 * atan(maxLabelBox.height / (2 * radius - maxLabelBox.width)) * 180 / PI);
    const angle2 = abs(2 * atan(maxLabelBox.width / (2 * radius - maxLabelBox.height)) * 180 / PI);
    return _axes_constants.default.getTicksCountInRange(that._majorTicks, 'angle', _max(angle1, angle2));
  },
  _checkBoundedLabelsOverlapping(majorTicks, boxes, mode) {
    const labelOpt = this._options.label;
    mode = mode || this._validateOverlappingMode(labelOpt.overlappingBehavior);
    if (mode !== 'hide') {
      return;
    }
    const lastVisibleLabelIndex = majorTicks.reduce((lastVisibleLabelIndex, tick, index) => tick.label ? index : lastVisibleLabelIndex, null);
    if (!lastVisibleLabelIndex) {
      return;
    }
    if (_axes_constants.default.areLabelsOverlap(boxes[0], boxes[lastVisibleLabelIndex], labelOpt.minSpacing, _axes_constants.default.center)) {
      labelOpt.hideFirstOrLast === 'first' ? majorTicks[0].removeLabel() : majorTicks[lastVisibleLabelIndex].removeLabel();
    }
  },
  shift(margins) {
    this._axisGroup.attr({
      translateX: margins.right,
      translateY: margins.bottom
    });
    this._axisElementsGroup.attr({
      translateX: margins.right,
      translateY: margins.bottom
    });
  },
  getTranslatedAngle(angle) {
    const startAngle = this.getAngles()[0];
    return angle + startAngle - HALF_PI_ANGLE;
  }
};
const circular = exports.circular = circularAxes;
const circularSpider = exports.circularSpider = (0, _extend.extend)({}, circularAxes, {
  _createAxisElement() {
    return this._renderer.path([], 'area');
  },
  _updateAxisElementPosition() {
    this._axisElement.attr({
      points: (0, _utils.map)(this.getSpiderTicks(), tick => ({
        x: tick.coords.x,
        y: tick.coords.y
      }))
    });
  },
  _getStick() {
    return true;
  },
  _getSpiderCategoryOption() {
    return true;
  },
  getSpiderTicks() {
    const that = this;
    const ticks = that.getFullTicks();
    that._spiderTicks = ticks.map((0, _tick.tick)(that, that.renderer, {}, {}, that._getSkippedCategory(ticks), true));
    that._spiderTicks.forEach(tick => {
      tick.initCoords();
    });
    return that._spiderTicks;
  },
  _getStripGraphicAttributes(fromAngle, toAngle) {
    const center = this.getCenter();
    const spiderTicks = this.getSpiderTicks();
    let firstTick;
    let lastTick;
    let nextTick;
    let tick;
    const points = [];
    let i = 0;
    const len = spiderTicks.length;
    while (i < len) {
      tick = spiderTicks[i].coords;
      if (tick.angle >= fromAngle && tick.angle <= toAngle) {
        if (!firstTick) {
          firstTick = (spiderTicks[i - 1] || spiderTicks[spiderTicks.length - 1]).coords;
          // @ts-expect-error
          points.push((tick.x + firstTick.x) / 2, (tick.y + firstTick.y) / 2);
        }
        // @ts-expect-error
        points.push(tick.x, tick.y);
        nextTick = (spiderTicks[i + 1] || spiderTicks[0]).coords;
        lastTick = {
          x: (tick.x + nextTick.x) / 2,
          y: (tick.y + nextTick.y) / 2
        };
      }
      i++;
    }
    // @ts-expect-error
    points.push(lastTick.x, lastTick.y);
    // @ts-expect-error
    points.push(center.x, center.y);
    return {
      points
    };
  },
  _createStrip(_ref2) {
    let {
      points
    } = _ref2;
    return this._renderer.path(points, 'area');
  },
  _getTranslatedCoord(value, offset) {
    return this._translator.translate(value, offset) - HALF_PI_ANGLE;
  },
  _setTickOffset() {
    this._tickOffset = false;
  }
});
const linear = exports.linear = {
  _resetMargins() {
    this._reinitTranslator(this._getViewportRange());
  },
  _getStick: xyAxesLinear._getStick,
  _getSpiderCategoryOption: _common.noop,
  _getTranslatorOptions() {
    return {
      isHorizontal: true,
      stick: this._getStick()
    };
  },
  getRadius: circularAxes.getRadius,
  getCenter: circularAxes.getCenter,
  getAngles: circularAxes.getAngles,
  _updateRadius: circularAxes._updateRadius,
  _updateCenter: circularAxes._updateCenter,
  _processCanvas(canvas) {
    this._updateRadius(canvas);
    this._updateCenter(canvas);
    return {
      left: 0,
      right: 0,
      startPadding: canvas.startPadding,
      endPadding: canvas.endPadding,
      width: this.getRadius()
    };
  },
  _createAxisElement: xyAxesLinear._createAxisElement,
  _updateAxisElementPosition() {
    const centerCoord = this.getCenter();
    this._axisElement.attr({
      points: [centerCoord.x, centerCoord.y, centerCoord.x + this.getRadius(), centerCoord.y]
    }).rotate(this.getAngles()[0] - HALF_PI_ANGLE, centerCoord.x, centerCoord.y);
  },
  _getScreenDelta() {
    return this.getRadius();
  },
  _getTickMarkPoints(coords, length) {
    return [coords.x - length / 2, coords.y, coords.x + length / 2, coords.y];
  },
  _getLabelAdjustedCoord(tick) {
    const that = this;
    const labelCoords = tick.labelCoords;
    const labelY = labelCoords.y;
    const cosSin = (0, _utils.getCosAndSin)(labelCoords.angle);
    const indentFromAxis = that._options.label.indentFromAxis || 0;
    const box = tick.labelBBox;
    const x = labelCoords.x - abs(indentFromAxis * cosSin.sin) + abs(box.width / 2 * cosSin.cos) - box.width / 2;
    const y = labelY + (labelY - box.y) - abs(box.height / 2 * cosSin.sin) + abs(indentFromAxis * cosSin.cos);
    return {
      x,
      y
    };
  },
  _getGridLineDrawer() {
    const that = this;
    return function (tick, gridStyle) {
      const grid = that._getGridPoints(tick.coords);
      return that._renderer.circle(grid.cx, grid.cy, grid.r).attr(gridStyle).sharp();
    };
  },
  _getGridPoints(coords) {
    const pos = this.getCenter();
    const radius = (0, _utils.getDistance)(pos.x, pos.y, coords.x, coords.y);
    if (radius > this.getRadius()) {
      return {
        cx: null,
        cy: null,
        r: null
      };
    }
    return {
      cx: pos.x,
      cy: pos.y,
      r: radius
    };
  },
  _getTranslatedValue(value, offset) {
    const startAngle = this.getAngles()[0];
    const xy = (0, _utils.convertPolarToXY)(this.getCenter(), startAngle, 0, this._translator.translate(value, offset));
    return {
      x: xy.x,
      y: xy.y,
      angle: startAngle - HALF_PI_ANGLE
    };
  },
  _getTranslatedCoord(value, offset) {
    return this._translator.translate(value, offset);
  },
  _getCanvasStartEnd() {
    const invert = this.getTranslator().getBusinessRange().invert;
    const coords = [0, this.getRadius()];
    invert && coords.reverse();
    return {
      start: coords[0],
      end: coords[1]
    };
  },
  _getStripGraphicAttributes(fromPoint, toPoint) {
    const center = this.getCenter();
    return {
      x: center.x,
      y: center.y,
      innerRadius: fromPoint,
      outerRadius: toPoint
    };
  },
  _createStrip(attrs) {
    return this._renderer.arc(attrs.x, attrs.y, attrs.innerRadius, attrs.outerRadius, 0, 360);
  },
  _getAdjustedStripLabelCoords: circularAxes._getAdjustedStripLabelCoords,
  _getStripLabelCoords(from, to) {
    const that = this;
    const labelPos = from + (to - from) / 2;
    const center = that.getCenter();
    const y = round(center.y - labelPos);
    return {
      x: center.x,
      y,
      align: _axes_constants.default.center
    };
  },
  _getConstantLineGraphicAttributes(value) {
    const center = this.getCenter();
    return {
      cx: center.x,
      cy: center.y,
      r: value
    };
  },
  _createConstantLine(value, attr) {
    const attrs = this._getConstantLineGraphicAttributes(value);
    return this._renderer.circle(attrs.cx, attrs.cy, attrs.r).attr(attr).sharp();
  },
  _getConstantLineLabelsCoords(value) {
    const that = this;
    const center = that.getCenter();
    const y = round(center.y - value);
    return {
      x: center.x,
      y
    };
  },
  _checkAlignmentConstantLineLabels: _common.noop,
  _rotateTick(element, coords, isGridLine) {
    !isGridLine && element.rotate(coords.angle + HALF_PI_ANGLE, coords.x, coords.y);
  },
  _validateOverlappingMode: circularAxes._validateOverlappingMode,
  _validateDisplayMode: circularAxes._validateDisplayMode,
  _getStep(boxes) {
    const quarter = getPolarQuarter(this.getAngles()[0]);
    const spacing = this._options.label.minSpacing;
    const func = quarter === 2 || quarter === 4 ? function (box) {
      return box.width + spacing;
    } : function (box) {
      return box.height;
    };
    const maxLabelLength = boxes.reduce((prevValue, box) => _max(prevValue, func(box)), 0);
    return _axes_constants.default.getTicksCountInRange(this._majorTicks, quarter === 2 || quarter === 4 ? 'x' : 'y', maxLabelLength);
  }
};
const linearSpider = exports.linearSpider = (0, _extend.extend)({}, linear, {
  _createPathElement(points, attr) {
    return this._renderer.path(points, 'area').attr(attr).sharp();
  },
  setSpiderTicks(ticks) {
    this._spiderTicks = ticks;
  },
  _getGridLineDrawer() {
    const that = this;
    return function (tick, gridStyle) {
      return that._createPathElement(that._getGridPoints(tick.coords).points, gridStyle);
    };
  },
  _getGridPoints(coords) {
    const pos = this.getCenter();
    const radius = (0, _utils.getDistance)(pos.x, pos.y, coords.x, coords.y);
    return this._getGridPointsByRadius(radius);
  },
  _getGridPointsByRadius(radius) {
    const pos = this.getCenter();
    if (radius > this.getRadius()) {
      return {
        points: null
      };
    }
    return {
      points: (0, _utils.map)(this._spiderTicks, tick => {
        const cosSin = (0, _utils.getCosAndSin)(tick.coords.angle);
        return {
          x: round(pos.x + radius * cosSin.cos),
          y: round(pos.y + radius * cosSin.sin)
        };
      })
    };
  },
  _getStripGraphicAttributes(fromPoint, toPoint) {
    const innerPoints = this._getGridPointsByRadius(toPoint).points;
    const outerPoints = this._getGridPointsByRadius(fromPoint).points;
    return {
      points: [outerPoints, innerPoints.reverse()]
    };
  },
  _createStrip: circularSpider._createStrip,
  _getConstantLineGraphicAttributes(value) {
    return this._getGridPointsByRadius(value);
  },
  _createConstantLine(value, attr) {
    return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr);
  }
});
