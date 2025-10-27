/**
* DevExtreme (cjs/__internal/viz/series/stacked_series.js)
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
exports.polar = exports.chart = void 0;
var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _object = require("../../../core/utils/object");
var _utils = require("../../viz/core/utils");
var _area_series = require("./area_series");
var _bar_series = require("./bar_series");
var _line_series = require("./line_series");
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

// @ts-expect-error
const chartAreaSeries = _area_series.chart.area;
// @ts-expect-error
const chartBarSeries = _bar_series.chart.bar;
const baseStackedSeries = {
  _calculateErrorBars: _common.noop,
  _updateOptions(options) {
    this._stackName = `axis_${options.axis || 'default'}`;
  }
};
const chart = exports.chart = {};
const polar = exports.polar = {};
// @ts-expect-error
chart.stackedline = (0, _extend2.extend)({}, _line_series.chart.line, baseStackedSeries, {});
// @ts-expect-error
chart.stackedspline = (0, _extend2.extend)({}, _line_series.chart.spline, baseStackedSeries, {});
// @ts-expect-error
chart.fullstackedline = (0, _extend2.extend)({}, _line_series.chart.line, baseStackedSeries, {
  // @ts-expect-error
  getValueRangeInitialValue: _area_series.chart.area.getValueRangeInitialValue
});
// @ts-expect-error
chart.fullstackedspline = (0, _extend2.extend)({}, _line_series.chart.spline, baseStackedSeries, {
  // @ts-expect-error
  getValueRangeInitialValue: _area_series.chart.area.getValueRangeInitialValue
});
// @ts-expect-error
const stackedBar = chart.stackedbar = (0, _extend2.extend)({}, chartBarSeries, baseStackedSeries, {
  _updateOptions(options) {
    baseStackedSeries._updateOptions.call(this, options);
    this._stackName = `${this._stackName}_stack_${options.stack || 'default'}`;
  }
});
// @ts-expect-error
chart.fullstackedbar = (0, _extend2.extend)({}, chartBarSeries, baseStackedSeries, {
  _updateOptions: stackedBar._updateOptions
});
function clonePoint(point, value, minValue, position) {
  point = (0, _object.clone)(point);
  point.value = value;
  point.minValue = minValue;
  point.translate();
  point.argument += position;
  return point;
}
function preparePointsForStackedAreaSegment(points) {
  let i = 0;
  let p;
  const result = [];
  let array;
  const len = points.length;
  while (i < len) {
    p = points[i];
    array = [p];
    if (p.leftHole) {
      array = [clonePoint(p, p.leftHole, p.minLeftHole, 'left'), p];
    }
    if (p.rightHole) {
      array.push(clonePoint(p, p.rightHole, p.minRightHole, 'right'));
    }
    // @ts-expect-error
    result.push(array);
    i++;
  }
  return [].concat.apply([], result);
}
// @ts-expect-error
chart.stackedarea = (0, _extend2.extend)({}, chartAreaSeries, baseStackedSeries, {
  _prepareSegment(points, rotated) {
    return chartAreaSeries._prepareSegment.call(this, preparePointsForStackedAreaSegment(points), rotated);
  },
  _appendInGroup() {
    this._group.append(this._extGroups.seriesGroup).toBackground();
  }
});
function getPointsByArgFromPrevSeries(prevSeries, argument) {
  let result;
  while (!result && prevSeries) {
    result = prevSeries._segmentByArg && prevSeries._segmentByArg[argument]; // T357324
    prevSeries = prevSeries._prevSeries;
  }
  return result;
}
// @ts-expect-error
chart.stackedsplinearea = (0, _extend2.extend)({}, _area_series.chart.splinearea, baseStackedSeries, {
  _prepareSegment(points, rotated) {
    const that = this;
    let areaSegment;
    points = preparePointsForStackedAreaSegment(points);
    if (!this._prevSeries || points.length === 1) {
      // @ts-expect-error
      areaSegment = _area_series.chart.splinearea._prepareSegment.call(this, points, rotated);
    } else {
      // @ts-expect-error
      const forwardPoints = _line_series.chart.spline._calculateBezierPoints(points, rotated);
      let backwardPoints = (0, _utils.map)(points, p => {
        const point = p.getCoords(true);
        point.argument = p.argument;
        return point;
      });
      let prevSeriesForwardPoints = [];
      const pointByArg = {};
      let i = 0;
      const len = that._prevSeries._segments.length;
      while (i < len) {
        prevSeriesForwardPoints = prevSeriesForwardPoints.concat(that._prevSeries._segments[i].line);
        i++;
      }
      (0, _iterator.each)(prevSeriesForwardPoints, (_, p) => {
        if (p.argument !== null) {
          const argument = p.argument.valueOf();
          if (!pointByArg[argument]) {
            pointByArg[argument] = [p];
          } else {
            pointByArg[argument].push(p);
          }
        }
      });
      that._prevSeries._segmentByArg = pointByArg;
      // @ts-expect-error
      backwardPoints = _line_series.chart.spline._calculateBezierPoints(backwardPoints, rotated);
      (0, _iterator.each)(backwardPoints, (i, p) => {
        const argument = p.argument.valueOf();
        let prevSeriesPoints;
        if (i % 3 === 0) {
          prevSeriesPoints = pointByArg[argument] || getPointsByArgFromPrevSeries(that._prevSeries, argument);
          if (prevSeriesPoints) {
            // @ts-expect-error
            backwardPoints[i - 1] && prevSeriesPoints[0] && (backwardPoints[i - 1] = prevSeriesPoints[0]);
            // @ts-expect-error
            backwardPoints[i + 1] && (backwardPoints[i + 1] = prevSeriesPoints[2] || p);
          }
        }
      });
      areaSegment = {
        line: forwardPoints,
        area: forwardPoints.concat(backwardPoints.reverse())
      };
      that._areaPointsToSplineAreaPoints(areaSegment.area);
    }
    return areaSegment;
  },
  // @ts-expect-error
  _appendInGroup: chart.stackedarea._appendInGroup
});
// @ts-expect-error
chart.fullstackedarea = (0, _extend2.extend)({}, chartAreaSeries, baseStackedSeries, {
  // @ts-expect-error
  _prepareSegment: chart.stackedarea._prepareSegment,
  // @ts-expect-error
  _appendInGroup: chart.stackedarea._appendInGroup
});
// @ts-expect-error
chart.fullstackedsplinearea = (0, _extend2.extend)({}, _area_series.chart.splinearea, baseStackedSeries, {
  // @ts-expect-error
  _prepareSegment: chart.stackedsplinearea._prepareSegment,
  // @ts-expect-error
  _appendInGroup: chart.stackedarea._appendInGroup
});
// @ts-expect-error
polar.stackedbar = (0, _extend2.extend)({}, _bar_series.polar.bar, baseStackedSeries, {
  _updateOptions(options) {
    baseStackedSeries._updateOptions.call(this, options);
    this._stackName = `${this._stackName}_stack_${options.stack || 'default'}`;
  }
});
