/**
* DevExtreme (cjs/__internal/viz/series/area_series.js)
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
exports.polar = exports.chart = void 0;
var _extend2 = require("../../../core/utils/extend");
var _object = require("../../../core/utils/object");
var _utils = require("../../viz/core/utils");
var _line_series = require("./line_series");
var _scatter_series = require("./scatter_series");
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

// @ts-expect-error
const chartLineSeries = _line_series.chart.line;
// @ts-expect-error
const polarLineSeries = _line_series.polar.line;
const _extend = _extend2.extend;
// @ts-expect-error
const calculateBezierPoints = _line_series.chart.spline._calculateBezierPoints;
const chart = exports.chart = {};
const polar = exports.polar = {};
const baseAreaMethods = {
  _createBorderElement: chartLineSeries._createMainElement,
  _createLegendState(styleOptions, defaultColor) {
    return {
      fill: (0, _utils.extractColor)(styleOptions.color) || defaultColor,
      opacity: styleOptions.opacity,
      hatching: styleOptions.hatching,
      filter: styleOptions.highlight
    };
  },
  _getColorId(options) {
    var _options$color;
    return (_options$color = options.color) === null || _options$color === void 0 ? void 0 : _options$color.fillId;
  },
  getValueRangeInitialValue() {
    if (this.valueAxisType !== 'logarithmic' && this.valueType !== 'datetime' && this.showZero !== false) {
      return 0;
    } else {
      // @ts-expect-error
      return _scatter_series.chart.getValueRangeInitialValue.call(this);
    }
  },
  _getDefaultSegment(segment) {
    const defaultSegment = chartLineSeries._getDefaultSegment(segment);
    defaultSegment.area = defaultSegment.line.concat(defaultSegment.line.slice().reverse());
    return defaultSegment;
  },
  _updateElement(element, segment, animate, complete) {
    const lineParams = {
      points: segment.line
    };
    const areaParams = {
      points: segment.area
    };
    const borderElement = element.line;
    if (animate) {
      borderElement && borderElement.animate(lineParams);
      element.area.animate(areaParams, {}, complete);
    } else {
      borderElement && borderElement.attr(lineParams);
      element.area.attr(areaParams);
    }
  },
  _removeElement(element) {
    element.line && element.line.remove();
    element.area.remove();
  },
  _drawElement(segment) {
    return {
      line: this._bordersGroup && this._createBorderElement(segment.line, {
        'stroke-width': this._styles.normal.border['stroke-width']
      }).append(this._bordersGroup),
      area: this._createMainElement(segment.area).append(this._elementsGroup)
    };
  },
  _applyStyle(style) {
    const that = this;
    that._elementsGroup && that._elementsGroup.smartAttr(style.elements);
    that._bordersGroup && that._bordersGroup.attr(style.border);
    (that._graphics || []).forEach(graphic => {
      graphic.line && graphic.line.attr({
        'stroke-width': style.border['stroke-width']
      }).sharp();
    });
  },
  _parseStyle(options, defaultColor, defaultBorderColor) {
    const borderOptions = options.border || {};
    const borderStyle = chartLineSeries._parseLineOptions(borderOptions, defaultBorderColor);
    borderStyle.stroke = borderOptions.visible && borderStyle['stroke-width'] ? borderStyle.stroke : 'none';
    borderStyle['stroke-width'] = borderStyle['stroke-width'] || 1;
    return {
      border: borderStyle,
      elements: {
        stroke: 'none',
        fill: (0, _utils.extractColor)(options.color) || defaultColor,
        hatching: options.hatching,
        opacity: options.opacity,
        filter: options.highlight ?? null
      }
    };
  },
  _areBordersVisible() {
    const options = this._options;
    return options.border.visible || options.hoverStyle.border.visible || options.selectionStyle.border.visible;
  },
  _createMainElement(points, settings) {
    return this._renderer.path(points, 'area').attr(settings);
  },
  _getTrackerSettings(segment) {
    return {
      'stroke-width': segment.singlePointSegment ? this._defaultTrackerWidth : 0
    };
  },
  _getMainPointsFromSegment(segment) {
    return segment.area;
  }
};
function createAreaPoints(points) {
  return (0, _utils.map)(points, pt => pt.getCoords()).concat((0, _utils.map)(points.slice().reverse(), pt => pt.getCoords(true)));
}
// @ts-expect-error
const areaSeries = chart.area = _extend({}, chartLineSeries, baseAreaMethods, {
  _prepareSegment(points, rotated) {
    const that = this;
    const processedPoints = that._processSinglePointsAreaSegment(points, rotated);
    const areaPoints = createAreaPoints(processedPoints);
    const argAxis = that.getArgumentAxis();
    if (argAxis.getAxisPosition) {
      const argAxisPosition = argAxis.getAxisPosition();
      const axisOptions = argAxis.getOptions();
      const edgeOffset = (!rotated ? -1 : 1) * Math.round(axisOptions.width / 2);
      if (axisOptions.visible) {
        areaPoints.forEach((p, i) => {
          if (p) {
            const index = points.length === 1 ? 0 : i < points.length ? i : areaPoints.length - 1 - i;
            // @ts-expect-error
            rotated && p.x === points[index].defaultX && p.x === argAxisPosition - argAxis.getAxisShift() && (p.x += edgeOffset);
            // @ts-expect-error
            !rotated && p.y === points[index].defaultY && p.y === argAxisPosition - argAxis.getAxisShift() && (p.y += edgeOffset);
          }
        });
      }
    }
    return {
      line: processedPoints,
      area: areaPoints,
      singlePointSegment: processedPoints !== points
    };
  },
  _processSinglePointsAreaSegment(points, rotated) {
    if (points && points.length === 1) {
      const p = points[0];
      const p1 = (0, _object.clone)(p);
      p1[rotated ? 'y' : 'x'] += 1;
      p1.argument = null;
      return [p, p1];
    }
    return points;
  }
});
// @ts-expect-error
polar.area = _extend({}, polarLineSeries, baseAreaMethods, {
  _prepareSegment(points, rotated, lastSegment) {
    lastSegment && polarLineSeries._closeSegment.call(this, points);
    return areaSeries._prepareSegment.call(this, points);
  },
  _processSinglePointsAreaSegment(points) {
    // @ts-expect-error
    return _line_series.polar.line._prepareSegment.call(this, points).line;
  }
});
// @ts-expect-error
chart.steparea = _extend({}, areaSeries, {
  _prepareSegment(points, rotated) {
    // @ts-expect-error
    const stepLineSeries = _line_series.chart.stepline;
    points = areaSeries._processSinglePointsAreaSegment(points, rotated);
    return areaSeries._prepareSegment.call(this, stepLineSeries._calculateStepLinePoints.call(this, points), rotated);
  },
  // @ts-expect-error
  getSeriesPairCoord: _line_series.chart.stepline.getSeriesPairCoord
});
// @ts-expect-error
chart.splinearea = _extend({}, areaSeries, {
  _areaPointsToSplineAreaPoints(areaPoints) {
    const previousMiddlePoint = areaPoints[areaPoints.length / 2 - 1];
    const middlePoint = areaPoints[areaPoints.length / 2];
    areaPoints.splice(areaPoints.length / 2, 0, {
      x: previousMiddlePoint.x,
      y: previousMiddlePoint.y
    }, {
      x: middlePoint.x,
      y: middlePoint.y
    });
  },
  _prepareSegment(points, rotated) {
    const processedPoints = areaSeries._processSinglePointsAreaSegment(points, rotated);
    const areaSegment = areaSeries._prepareSegment.call(this, calculateBezierPoints(processedPoints, rotated));
    this._areaPointsToSplineAreaPoints(areaSegment.area);
    areaSegment.singlePointSegment = processedPoints !== points;
    return areaSegment;
  },
  _getDefaultSegment(segment) {
    const areaDefaultSegment = areaSeries._getDefaultSegment(segment);
    this._areaPointsToSplineAreaPoints(areaDefaultSegment.area);
    return areaDefaultSegment;
  },
  _createMainElement(points, settings) {
    return this._renderer.path(points, 'bezierarea').attr(settings);
  },
  // @ts-expect-error
  _createBorderElement: _line_series.chart.spline._createMainElement,
  // @ts-expect-error
  getSeriesPairCoord: _line_series.chart.spline.getSeriesPairCoord,
  // @ts-expect-error
  _getNearestPoints: _line_series.chart.spline._getNearestPoints,
  // @ts-expect-error
  _getBezierPoints: _line_series.chart.spline._getBezierPoints,
  // @ts-expect-error
  obtainCubicBezierTCoef: _line_series.chart.spline.obtainCubicBezierTCoef
});
