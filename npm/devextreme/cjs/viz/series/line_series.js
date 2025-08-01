/**
* DevExtreme (cjs/viz/series/line_series.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.polar = exports.chart = void 0;
var _scatter_series = require("./scatter_series");
var _object = require("../../core/utils/object");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _utils = require("../core/utils");
var _math = require("../../core/utils/math");
// there are line, stepline, stackedline, fullstackedline, spline

const DISCRETE = 'discrete';
const {
  round,
  sqrt,
  pow,
  min,
  max,
  abs
} = Math;
const chart = exports.chart = {};
const polar = exports.polar = {};
function clonePoint(point, newX, newY, newAngle) {
  const p = (0, _object.clone)(point);
  p.x = newX;
  p.y = newY;
  p.angle = newAngle;
  return p;
}
function getTangentPoint(point, prevPoint, centerPoint, tan, nextStepAngle) {
  const correctAngle = point.angle + nextStepAngle;
  const cosSin = (0, _utils.getCosAndSin)(correctAngle);
  const x = centerPoint.x + (point.radius + tan * nextStepAngle) * cosSin.cos;
  const y = centerPoint.y - (point.radius + tan * nextStepAngle) * cosSin.sin;
  return clonePoint(prevPoint, x, y, correctAngle);
}
function obtainCubicBezierTCoef(p, p0, p1, p2, p3) {
  const d = p0 - p;
  const c = 3 * p1 - 3 * p0;
  const b = 3 * p2 - 6 * p1 + 3 * p0;
  const a = p3 - 3 * p2 + 3 * p1 - p0;
  return (0, _math.solveCubicEquation)(a, b, c, d);
}
const lineMethods = {
  autoHidePointMarkersEnabled() {
    return true;
  },
  _applyGroupSettings: function (style, settings, group) {
    const that = this;
    settings = (0, _extend.extend)(settings, style);
    that._applyElementsClipRect(settings);
    group.attr(settings);
  },
  _setGroupsSettings: function (animationEnabled) {
    const that = this;
    const style = that._styles.normal;
    that._applyGroupSettings(style.elements, {
      'class': 'dxc-elements'
    }, that._elementsGroup);
    that._bordersGroup && that._applyGroupSettings(style.border, {
      'class': 'dxc-borders'
    }, that._bordersGroup);
    _scatter_series.chart._setGroupsSettings.call(that, animationEnabled);
    animationEnabled && that._markersGroup && that._markersGroup.attr({
      opacity: 0.001
    });
  },
  _createGroups: function () {
    const that = this;
    that._createGroup('_elementsGroup', that, that._group);
    that._areBordersVisible() && that._createGroup('_bordersGroup', that, that._group);
    _scatter_series.chart._createGroups.call(that);
  },
  _areBordersVisible: function () {
    return false;
  },
  _getDefaultSegment: function (segment) {
    return {
      line: (0, _utils.map)(segment.line || [], function (pt) {
        return pt.getDefaultCoords();
      })
    };
  },
  _prepareSegment: function (points) {
    return {
      line: points
    };
  },
  _parseLineOptions: function (options, defaultColor) {
    return {
      stroke: (0, _utils.extractColor)(options.color, true) || defaultColor,
      'stroke-width': options.width,
      dashStyle: options.dashStyle || 'solid'
    };
  },
  _parseStyle: function (options, defaultColor) {
    return {
      elements: this._parseLineOptions(options, defaultColor)
    };
  },
  _applyStyle: function (style) {
    const that = this;
    that._elementsGroup && that._elementsGroup.attr(style.elements);
    (0, _iterator.each)(that._graphics || [], function (_, graphic) {
      graphic.line && graphic.line.attr({
        'stroke-width': style.elements['stroke-width']
      }).sharp();
    });
  },
  _drawElement: function (segment, group) {
    return {
      line: this._createMainElement(segment.line, {
        'stroke-width': this._styles.normal.elements['stroke-width']
      }).append(group)
    };
  },
  _removeElement: function (element) {
    element.line.remove();
  },
  _updateElement: function (element, segment, animate, animationComplete) {
    const params = {
      points: segment.line
    };
    const lineElement = element.line;
    animate ? lineElement.animate(params, {}, animationComplete) : lineElement.attr(params);
  },
  _animateComplete: function () {
    const that = this;
    _scatter_series.chart._animateComplete.call(that);
    that._markersGroup && that._markersGroup.animate({
      opacity: 1
    }, {
      duration: that._defaultDuration
    });
  },
  _animate: function () {
    const that = this;
    const lastIndex = that._graphics.length - 1;
    (0, _iterator.each)(that._graphics || [], function (i, elem) {
      let complete;
      if (i === lastIndex) {
        complete = function () {
          that._animateComplete();
        };
      }
      that._updateElement(elem, that._segments[i], true, complete);
    });
  },
  _drawPoint: function (options) {
    _scatter_series.chart._drawPoint.call(this, {
      point: options.point,
      groups: options.groups
    });
  },
  _createMainElement: function (points, settings) {
    return this._renderer.path(points, 'line').attr(settings);
  },
  _sortPoints: function (points, rotated) {
    return rotated ? points.sort(function (p1, p2) {
      return p2.y - p1.y;
    }) : points.sort(function (p1, p2) {
      return p1.x - p2.x;
    });
  },
  _drawSegment: function (points, animationEnabled, segmentCount, lastSegment) {
    const that = this;
    const rotated = that._options.rotated;
    const segment = that._prepareSegment(points, rotated, lastSegment);
    that._segments.push(segment);
    if (!that._graphics[segmentCount]) {
      that._graphics[segmentCount] = that._drawElement(animationEnabled ? that._getDefaultSegment(segment) : segment, that._elementsGroup);
    } else if (!animationEnabled) {
      that._updateElement(that._graphics[segmentCount], segment);
    }
  },
  _getTrackerSettings: function () {
    const that = this;
    const defaultTrackerWidth = that._defaultTrackerWidth;
    const strokeWidthFromElements = that._styles.normal.elements['stroke-width'];
    return {
      'stroke-width': strokeWidthFromElements > defaultTrackerWidth ? strokeWidthFromElements : defaultTrackerWidth,
      fill: 'none'
    };
  },
  _getMainPointsFromSegment: function (segment) {
    return segment.line;
  },
  _drawTrackerElement: function (segment) {
    return this._createMainElement(this._getMainPointsFromSegment(segment), this._getTrackerSettings(segment));
  },
  _updateTrackerElement: function (segment, element) {
    const settings = this._getTrackerSettings(segment);
    settings.points = this._getMainPointsFromSegment(segment);
    element.attr(settings);
  },
  checkSeriesViewportCoord(axis, coord) {
    if (!_scatter_series.chart.checkSeriesViewportCoord.call(this)) {
      return false;
    }
    const range = axis.isArgumentAxis ? this.getArgumentRange() : this.getViewport();
    const min = axis.getTranslator().translate(range.categories ? range.categories[0] : range.min);
    const max = axis.getTranslator().translate(range.categories ? range.categories[range.categories.length - 1] : range.max);
    const rotated = this.getOptions().rotated;
    const inverted = axis.getOptions().inverted;
    return axis.isArgumentAxis && (!rotated && !inverted || rotated && inverted) || !axis.isArgumentAxis && (rotated && !inverted || !rotated && inverted) ? coord >= min && coord <= max : coord >= max && coord <= min;
  }
};
const lineSeries = chart['line'] = (0, _extend.extend)({}, _scatter_series.chart, lineMethods, {
  getPointCenterByArg(arg) {
    const value = this.getArgumentAxis().getTranslator().translate(arg);
    return {
      x: value,
      y: value
    };
  },
  getSeriesPairCoord(coord, isArgument) {
    const that = this;
    let oppositeCoord = null;
    const nearestPoints = this._getNearestPointsByCoord(coord, isArgument);
    const needValueCoord = isArgument && !that._options.rotated || !isArgument && that._options.rotated;
    for (let i = 0; i < nearestPoints.length; i++) {
      const p = nearestPoints[i];
      const k = (p[1].vy - p[0].vy) / (p[1].vx - p[0].vx);
      const b = p[0].vy - p[0].vx * k;
      let tmpCoord;
      if (p[1].vx - p[0].vx === 0) {
        tmpCoord = needValueCoord ? p[0].vy : p[0].vx;
      } else {
        tmpCoord = needValueCoord ? k * coord + b : (coord - b) / k;
      }
      if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
        oppositeCoord = tmpCoord;
        break;
      }
    }
    return oppositeCoord;
  }
});
chart['stepline'] = (0, _extend.extend)({}, lineSeries, {
  _calculateStepLinePoints(points) {
    const segment = [];
    const coordName = this._options.rotated ? 'x' : 'y';
    (0, _iterator.each)(points, function (i, pt) {
      let point;
      if (!i) {
        segment.push(pt);
        return;
      }
      const step = segment[segment.length - 1][coordName];
      if (step !== pt[coordName]) {
        point = (0, _object.clone)(pt);
        point[coordName] = step;
        segment.push(point);
      }
      segment.push(pt);
    });
    return segment;
  },
  _prepareSegment: function (points) {
    return lineSeries._prepareSegment(this._calculateStepLinePoints(points));
  },
  getSeriesPairCoord(coord, isArgument) {
    let oppositeCoord;
    const rotated = this._options.rotated;
    const isOpposite = !isArgument && !rotated || isArgument && rotated;
    const coordName = !isOpposite ? 'vx' : 'vy';
    const oppositeCoordName = !isOpposite ? 'vy' : 'vx';
    const nearestPoints = this._getNearestPointsByCoord(coord, isArgument);
    for (let i = 0; i < nearestPoints.length; i++) {
      const p = nearestPoints[i];
      let tmpCoord;
      if (isArgument) {
        tmpCoord = coord !== p[1][coordName] ? p[0][oppositeCoordName] : p[1][oppositeCoordName];
      } else {
        tmpCoord = coord === p[0][coordName] ? p[0][oppositeCoordName] : p[1][oppositeCoordName];
      }
      if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
        oppositeCoord = tmpCoord;
        break;
      }
    }
    return oppositeCoord;
  }
});
chart['spline'] = (0, _extend.extend)({}, lineSeries, {
  _calculateBezierPoints: function (src, rotated) {
    const bezierPoints = [];
    const pointsCopy = src;
    const checkExtremum = function (otherPointCoord, pointCoord, controlCoord) {
      return otherPointCoord > pointCoord && controlCoord > otherPointCoord || otherPointCoord < pointCoord && controlCoord < otherPointCoord ? otherPointCoord : controlCoord;
    };
    if (pointsCopy.length !== 1) {
      pointsCopy.forEach(function (curPoint, i) {
        let leftControlX;
        let leftControlY;
        let rightControlX;
        let rightControlY;
        const prevPoint = pointsCopy[i - 1];
        const nextPoint = pointsCopy[i + 1];
        let x1;
        let x2;
        let y1;
        let y2;
        const lambda = 0.5;
        let a;
        let b;
        let c;
        let xc;
        let yc;
        let shift;
        if (!i || i === pointsCopy.length - 1) {
          bezierPoints.push(curPoint, curPoint);
          return;
        }
        const xCur = curPoint.x;
        const yCur = curPoint.y;
        x1 = prevPoint.x;
        x2 = nextPoint.x;
        y1 = prevPoint.y;
        y2 = nextPoint.y;

        // check for extremum
        const curIsExtremum = !!(!rotated && (yCur <= prevPoint.y && yCur <= nextPoint.y || yCur >= prevPoint.y && yCur >= nextPoint.y) || rotated && (xCur <= prevPoint.x && xCur <= nextPoint.x || xCur >= prevPoint.x && xCur >= nextPoint.x));
        if (curIsExtremum) {
          if (!rotated) {
            rightControlY = leftControlY = yCur;
            rightControlX = (xCur + nextPoint.x) / 2;
            leftControlX = (xCur + prevPoint.x) / 2;
          } else {
            rightControlX = leftControlX = xCur;
            rightControlY = (yCur + nextPoint.y) / 2;
            leftControlY = (yCur + prevPoint.y) / 2;
          }
        } else {
          a = y2 - y1;
          b = x1 - x2;
          c = y1 * x2 - x1 * y2;
          if (!rotated) {
            if (!b) {
              bezierPoints.push(curPoint, curPoint, curPoint);
              return;
            }
            xc = xCur;
            yc = -1 * (a * xc + c) / b;
            shift = yc - yCur;
            y1 -= shift;
            y2 -= shift;
          } else {
            if (!a) {
              bezierPoints.push(curPoint, curPoint, curPoint);
              return;
            }
            yc = yCur;
            xc = -1 * (b * yc + c) / a;
            shift = xc - xCur;
            x1 -= shift;
            x2 -= shift;
          }
          rightControlX = (xCur + lambda * x2) / (1 + lambda);
          rightControlY = (yCur + lambda * y2) / (1 + lambda);
          leftControlX = (xCur + lambda * x1) / (1 + lambda);
          leftControlY = (yCur + lambda * y1) / (1 + lambda);
        }

        // check control points for extremum
        if (!rotated) {
          leftControlY = checkExtremum(prevPoint.y, yCur, leftControlY);
          rightControlY = checkExtremum(nextPoint.y, yCur, rightControlY);
        } else {
          leftControlX = checkExtremum(prevPoint.x, xCur, leftControlX);
          rightControlX = checkExtremum(nextPoint.x, xCur, rightControlX);
        }
        const leftPoint = clonePoint(curPoint, leftControlX, leftControlY);
        const rightPoint = clonePoint(curPoint, rightControlX, rightControlY);
        bezierPoints.push(leftPoint, curPoint, rightPoint);
      });
    } else {
      bezierPoints.push(pointsCopy[0]);
    }
    return bezierPoints;
  },
  _prepareSegment: function (points, rotated) {
    return lineSeries._prepareSegment(this._calculateBezierPoints(points, rotated));
  },
  _createMainElement: function (points, settings) {
    return this._renderer.path(points, 'bezier').attr(settings);
  },
  getSeriesPairCoord(coord, isArgument) {
    const that = this;
    let oppositeCoord = null;
    const isOpposite = !isArgument && !this._options.rotated || isArgument && this._options.rotated;
    const coordName = !isOpposite ? 'vx' : 'vy';
    const bezierCoordName = !isOpposite ? 'x' : 'y';
    const oppositeCoordName = !isOpposite ? 'vy' : 'vx';
    const bezierOppositeCoordName = !isOpposite ? 'y' : 'x';
    const axis = !isArgument ? that.getArgumentAxis() : that.getValueAxis();
    const visibleArea = axis.getVisibleArea();
    const nearestPoints = this._getNearestPointsByCoord(coord, isArgument);
    for (let i = 0; i < nearestPoints.length; i++) {
      const p = nearestPoints[i];
      if (p.length === 1) {
        visibleArea[0] <= p[0][oppositeCoordName] && visibleArea[1] >= p[0][oppositeCoordName] && (oppositeCoord = p[0][oppositeCoordName]);
      } else {
        const ts = obtainCubicBezierTCoef(coord, p[0][coordName], p[1][bezierCoordName], p[2][bezierCoordName], p[3][coordName]);
        ts.forEach(t => {
          if (t >= 0 && t <= 1) {
            const tmpCoord = Math.pow(1 - t, 3) * p[0][oppositeCoordName] + 3 * Math.pow(1 - t, 2) * t * p[1][bezierOppositeCoordName] + 3 * (1 - t) * t * t * p[2][bezierOppositeCoordName] + t * t * t * p[3][oppositeCoordName];
            if (visibleArea[0] <= tmpCoord && visibleArea[1] >= tmpCoord) {
              oppositeCoord = tmpCoord;
            }
          }
        });
      }
      if (oppositeCoord !== null) {
        break;
      }
    }
    return oppositeCoord;
  },
  _getNearestPoints(point, nextPoint, bezierPoints) {
    const index = bezierPoints.indexOf(point);
    return [point, bezierPoints[index + 1], bezierPoints[index + 2], nextPoint];
  },
  _getBezierPoints() {
    return this._segments.length > 0 ? this._segments.reduce((a, seg) => a.concat(seg.line), []) : [];
  }
});
polar.line = (0, _extend.extend)({}, _scatter_series.polar, lineMethods, {
  _sortPoints: function (points) {
    return points;
  },
  _prepareSegment: function (points, rotated, lastSegment) {
    let preparedPoints = [];
    const centerPoint = this.getValueAxis().getCenter();
    let i;
    lastSegment && this._closeSegment(points);
    if (this.argumentAxisType !== DISCRETE && this.valueAxisType !== DISCRETE) {
      for (i = 1; i < points.length; i++) {
        preparedPoints = preparedPoints.concat(this._getTangentPoints(points[i], points[i - 1], centerPoint, i === points.length - 1));
      }
      if (!preparedPoints.length) {
        // T174220
        preparedPoints = points;
      }
    } else {
      return lineSeries._prepareSegment.call(this, points);
    }
    return {
      line: preparedPoints
    };
  },
  _getRemainingAngle: function (angle) {
    const normAngle = (0, _utils.normalizeAngle)(angle);
    return angle >= 0 ? 360 - normAngle : -normAngle;
  },
  _closeSegment(points) {
    const point = this._segments.length ? this._segments[0].line[0] : points[0];
    let newPoint = clonePoint(point, point.x, point.y, point.angle);
    newPoint = this._modifyReflectedPoint(newPoint, points.at(-1));
    if (newPoint) {
      points.push(newPoint);
    }
  },
  _modifyReflectedPoint(point, lastPoint) {
    if (lastPoint.angle === point.angle) {
      return undefined;
    }
    if ((0, _utils.normalizeAngle)(round(lastPoint.angle)) === (0, _utils.normalizeAngle)(round(point.angle))) {
      point.angle = lastPoint.angle;
    } else {
      const differenceAngle = lastPoint.angle - point.angle;
      point.angle = lastPoint.angle + this._getRemainingAngle(differenceAngle);
    }
    return point;
  },
  _getTangentPoints: function (point, prevPoint, centerPoint, isLastSegment) {
    let tangentPoints = [];
    const betweenAngle = Math.round(prevPoint.angle - point.angle);
    const tan = (prevPoint.radius - point.radius) / betweenAngle;
    let i;
    if (betweenAngle === 0) {
      tangentPoints = [prevPoint, point];
    } else if (betweenAngle > 0) {
      const angle = isLastSegment ? betweenAngle : betweenAngle - 1;
      for (i = angle; i >= 0; i--) {
        tangentPoints.push(getTangentPoint(point, prevPoint, centerPoint, tan, i));
      }
    } else {
      const angle = isLastSegment ? betweenAngle : betweenAngle + 1;
      for (i = 0; i >= angle; i--) {
        tangentPoints.push(getTangentPoint(point, prevPoint, centerPoint, tan, betweenAngle - i));
      }
    }
    return tangentPoints;
  },
  getSeriesPairCoord(params, isArgument) {
    const that = this;
    const argAxis = that.getArgumentAxis();
    const paramName = isArgument ? 'angle' : 'radius';
    const coordParam = params[paramName];
    const centerPoint = argAxis.getCenter();
    const getLengthByCoords = (p1, p2) => {
      return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
    };
    const isInsideInterval = (prevPoint, point, _ref) => {
      let {
        x,
        y
      } = _ref;
      return getLengthByCoords({
        x,
        y
      }, centerPoint) <= argAxis.getRadius() && min(prevPoint.x, point.x) <= x && max(prevPoint.x, point.x) >= x && min(prevPoint.y, point.y) <= y && max(prevPoint.y, point.y) >= y;
    };
    let coords;
    const neighborPoints = that.getNeighborPoints(coordParam, paramName);
    if (neighborPoints.length === 1) {
      coords = neighborPoints[0];
    } else if (neighborPoints.length > 1) {
      const prevPoint = neighborPoints[0];
      const point = neighborPoints[1];
      if (that.argumentAxisType !== DISCRETE && that.valueAxisType !== DISCRETE) {
        let tan;
        let stepAngle;
        if (isArgument) {
          tan = (prevPoint.radius - point.radius) / (prevPoint.angle - point.angle);
          stepAngle = coordParam - point.angle;
        } else {
          tan = (prevPoint.radius - point.radius) / (prevPoint.angle - point.angle);
          stepAngle = (coordParam - point.radius) / tan;
        }
        coords = getTangentPoint(point, prevPoint, centerPoint, tan, stepAngle);
      } else {
        if (isArgument) {
          const cosSin = (0, _utils.getCosAndSin)(-coordParam);
          const k1 = (point.y - prevPoint.y) / (point.x - prevPoint.x);
          const b1 = prevPoint.y - prevPoint.x * k1;
          const k2 = cosSin.sin / cosSin.cos;
          const b2 = centerPoint.y - k2 * centerPoint.x;
          const x = (b2 - b1) / (k1 - k2);
          const y = k1 * x + b1;
          if (isInsideInterval(prevPoint, point, {
            x,
            y
          })) {
            const quarter = abs((0, _math.trunc)((360 + coordParam) / 90) % 4);
            if (quarter === 0 && x >= centerPoint.x && y <= centerPoint.y || quarter === 1 && x <= centerPoint.x && y <= centerPoint.y || quarter === 2 && x <= centerPoint.x && y >= centerPoint.y || quarter === 3 && x >= centerPoint.x && y >= centerPoint.y) {
              coords = {
                x,
                y
              };
            }
          }
        } else {
          const k = (point.y - prevPoint.y) / (point.x - prevPoint.x);
          const y0 = prevPoint.y - prevPoint.x * k;
          const a = 1 + k * k;
          const b = -2 * centerPoint.x + 2 * k * y0 - 2 * k * centerPoint.y;
          const c = -pow(coordParam, 2) + pow(y0 - centerPoint.y, 2) + pow(centerPoint.x, 2);
          const d = b * b - 4 * a * c;
          if (d >= 0) {
            const x1 = (-b - sqrt(d)) / (2 * a);
            const x2 = (-b + sqrt(d)) / (2 * a);
            const y1 = k * x1 + y0;
            const y2 = k * x2 + y0;
            coords = isInsideInterval(prevPoint, point, {
              x: x1,
              y: y1
            }) ? {
              x: x1,
              y: y1
            } : isInsideInterval(prevPoint, point, {
              x: x2,
              y: y2
            }) ? {
              x: x2,
              y: y2
            } : undefined;
          }
        }
      }
    }
    return coords;
  },
  getNeighborPoints(param, paramName) {
    let points = this.getPoints();
    const neighborPoints = [];
    if (this.getOptions().closed) {
      points = (0, _extend.extend)(true, [], points);
      const lastPoint = points[points.length - 1];
      const firstPointCopy = clonePoint(points[0], points[0].x, points[0].y, points[0].angle);
      const lastPointCopy = clonePoint(lastPoint, lastPoint.x, lastPoint.y, lastPoint.angle);
      const rearwardRefPoint = this._modifyReflectedPoint(firstPointCopy, lastPoint);
      const forwardRefPoint = this._modifyReflectedPoint(lastPointCopy, points[0]);
      if (forwardRefPoint) {
        points.unshift(forwardRefPoint);
      }
      if (rearwardRefPoint) {
        points.push(rearwardRefPoint);
      }
    }
    for (let i = 1; i < points.length; i++) {
      if (points[i - 1][paramName] === param) {
        neighborPoints.push(points[i - 1]);
      } else if (points[i][paramName] === param) {
        neighborPoints.push(points[i]);
      } else if (points[i][paramName] > param && points[i - 1][paramName] < param || points[i - 1][paramName] > param && points[i][paramName] < param) {
        neighborPoints.push(points[i - 1]);
        neighborPoints.push(points[i]);
      }
      if (neighborPoints.length > 0) {
        break;
      }
    }
    return neighborPoints;
  }
});
