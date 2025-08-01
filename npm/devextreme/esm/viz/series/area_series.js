/**
* DevExtreme (esm/viz/series/area_series.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// there are area, steparea, stackedarea, fullstackedarea, splinearea
import { clone } from '../../core/utils/object';
import { extend } from '../../core/utils/extend';
import { chart as scatterSeries } from './scatter_series';
import { chart as lineSeriesChart, polar as lineSeriesPolar } from './line_series';
const chartLineSeries = lineSeriesChart.line;
const polarLineSeries = lineSeriesPolar.line;
import { map as _map, extractColor } from '../core/utils';
const _extend = extend;
const calculateBezierPoints = lineSeriesChart['spline']._calculateBezierPoints;
const chart = {};
const polar = {};
const baseAreaMethods = {
  _createBorderElement: chartLineSeries._createMainElement,
  _createLegendState: function (styleOptions, defaultColor) {
    return {
      fill: extractColor(styleOptions.color) || defaultColor,
      opacity: styleOptions.opacity,
      hatching: styleOptions.hatching,
      filter: styleOptions.highlight
    };
  },
  _getColorId: function (options) {
    var _options$color;
    return (_options$color = options.color) === null || _options$color === void 0 ? void 0 : _options$color.fillId;
  },
  getValueRangeInitialValue: function () {
    if (this.valueAxisType !== 'logarithmic' && this.valueType !== 'datetime' && this.showZero !== false) {
      return 0;
    } else {
      return scatterSeries.getValueRangeInitialValue.call(this);
    }
  },
  _getDefaultSegment: function (segment) {
    const defaultSegment = chartLineSeries._getDefaultSegment(segment);
    defaultSegment.area = defaultSegment.line.concat(defaultSegment.line.slice().reverse());
    return defaultSegment;
  },
  _updateElement: function (element, segment, animate, complete) {
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
  _removeElement: function (element) {
    element.line && element.line.remove();
    element.area.remove();
  },
  _drawElement: function (segment) {
    return {
      line: this._bordersGroup && this._createBorderElement(segment.line, {
        'stroke-width': this._styles.normal.border['stroke-width']
      }).append(this._bordersGroup),
      area: this._createMainElement(segment.area).append(this._elementsGroup)
    };
  },
  _applyStyle: function (style) {
    const that = this;
    that._elementsGroup && that._elementsGroup.smartAttr(style.elements);
    that._bordersGroup && that._bordersGroup.attr(style.border);
    (that._graphics || []).forEach(function (graphic) {
      graphic.line && graphic.line.attr({
        'stroke-width': style.border['stroke-width']
      }).sharp();
    });
  },
  _parseStyle: function (options, defaultColor, defaultBorderColor) {
    const borderOptions = options.border || {};
    const borderStyle = chartLineSeries._parseLineOptions(borderOptions, defaultBorderColor);
    borderStyle.stroke = borderOptions.visible && borderStyle['stroke-width'] ? borderStyle.stroke : 'none';
    borderStyle['stroke-width'] = borderStyle['stroke-width'] || 1;
    return {
      border: borderStyle,
      elements: {
        stroke: 'none',
        fill: extractColor(options.color) || defaultColor,
        hatching: options.hatching,
        opacity: options.opacity,
        filter: options.highlight ?? null
      }
    };
  },
  _areBordersVisible: function () {
    const options = this._options;
    return options.border.visible || options.hoverStyle.border.visible || options.selectionStyle.border.visible;
  },
  _createMainElement: function (points, settings) {
    return this._renderer.path(points, 'area').attr(settings);
  },
  _getTrackerSettings: function (segment) {
    return {
      'stroke-width': segment.singlePointSegment ? this._defaultTrackerWidth : 0
    };
  },
  _getMainPointsFromSegment: function (segment) {
    return segment.area;
  }
};
function createAreaPoints(points) {
  return _map(points, function (pt) {
    return pt.getCoords();
  }).concat(_map(points.slice().reverse(), function (pt) {
    return pt.getCoords(true);
  }));
}
const areaSeries = chart['area'] = _extend({}, chartLineSeries, baseAreaMethods, {
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
            rotated && p.x === points[index].defaultX && p.x === argAxisPosition - argAxis.getAxisShift() && (p.x += edgeOffset);
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
  _processSinglePointsAreaSegment: function (points, rotated) {
    if (points && points.length === 1) {
      const p = points[0];
      const p1 = clone(p);
      p1[rotated ? 'y' : 'x'] += 1;
      p1.argument = null;
      return [p, p1];
    }
    return points;
  }
});
polar['area'] = _extend({}, polarLineSeries, baseAreaMethods, {
  _prepareSegment: function (points, rotated, lastSegment) {
    lastSegment && polarLineSeries._closeSegment.call(this, points);
    return areaSeries._prepareSegment.call(this, points);
  },
  _processSinglePointsAreaSegment: function (points) {
    return lineSeriesPolar.line._prepareSegment.call(this, points).line;
  }
});
chart['steparea'] = _extend({}, areaSeries, {
  _prepareSegment: function (points, rotated) {
    const stepLineSeries = lineSeriesChart['stepline'];
    points = areaSeries._processSinglePointsAreaSegment(points, rotated);
    return areaSeries._prepareSegment.call(this, stepLineSeries._calculateStepLinePoints.call(this, points), rotated);
  },
  getSeriesPairCoord: lineSeriesChart['stepline'].getSeriesPairCoord
});
chart['splinearea'] = _extend({}, areaSeries, {
  _areaPointsToSplineAreaPoints: function (areaPoints) {
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
  _prepareSegment: function (points, rotated) {
    const processedPoints = areaSeries._processSinglePointsAreaSegment(points, rotated);
    const areaSegment = areaSeries._prepareSegment.call(this, calculateBezierPoints(processedPoints, rotated));
    this._areaPointsToSplineAreaPoints(areaSegment.area);
    areaSegment.singlePointSegment = processedPoints !== points;
    return areaSegment;
  },
  _getDefaultSegment: function (segment) {
    const areaDefaultSegment = areaSeries._getDefaultSegment(segment);
    this._areaPointsToSplineAreaPoints(areaDefaultSegment.area);
    return areaDefaultSegment;
  },
  _createMainElement: function (points, settings) {
    return this._renderer.path(points, 'bezierarea').attr(settings);
  },
  _createBorderElement: lineSeriesChart['spline']._createMainElement,
  getSeriesPairCoord: lineSeriesChart['spline'].getSeriesPairCoord,
  _getNearestPoints: lineSeriesChart['spline']._getNearestPoints,
  _getBezierPoints: lineSeriesChart['spline']._getBezierPoints,
  obtainCubicBezierTCoef: lineSeriesChart['spline'].obtainCubicBezierTCoef
});
export { chart, polar };
