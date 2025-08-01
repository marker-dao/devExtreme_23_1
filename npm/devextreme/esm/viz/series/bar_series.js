/**
* DevExtreme (esm/viz/series/bar_series.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import * as scatterSeries from './scatter_series';
import { chart as areaChart } from './area_series';
const areaSeries = areaChart.area;
import { convertPolarToXY, extractColor } from '../core/utils';
const chartSeries = scatterSeries.chart;
const polarSeries = scatterSeries.polar;
import { isDefined as _isDefined } from '../../core/utils/type';
const _extend = extend;
const _each = each;
const chart = {};
const polar = {};
const baseBarSeriesMethods = {
  _createLegendState: function (styleOptions, defaultColor) {
    return {
      fill: extractColor(styleOptions.color) || defaultColor,
      hatching: styleOptions.hatching,
      filter: styleOptions.highlight
    };
  },
  _getColorId: areaSeries._getColorId,
  _parsePointStyle: function (style, defaultColor, defaultBorderColor) {
    const color = extractColor(style.color) || defaultColor;
    const base = chartSeries._parsePointStyle.call(this, style, color, defaultBorderColor);
    base.fill = color;
    base.hatching = style.hatching;
    base.filter = style.highlight;
    base.dashStyle = style.border && style.border.dashStyle || 'solid';
    delete base.r;
    return base;
  },
  _applyMarkerClipRect: function (settings) {
    settings['clip-path'] = null;
  },
  _setGroupsSettings: function (animationEnabled, firstDrawing) {
    const that = this;
    let settings = {};
    chartSeries._setGroupsSettings.apply(that, arguments);
    if (animationEnabled && firstDrawing) {
      settings = this._getAffineCoordOptions();
    } else if (!animationEnabled) {
      settings = {
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0
      };
    }
    that._markersGroup.attr(settings);
  },
  _drawPoint: function (options) {
    options.hasAnimation = options.hasAnimation && !options.firstDrawing;
    options.firstDrawing = false;
    chartSeries._drawPoint.call(this, options);
  },
  _getMainColor: function () {
    return this._options.mainSeriesColor;
  },
  _createPointStyles: function (pointOptions) {
    var _pointOptions$color;
    const that = this;
    const mainColor = extractColor(pointOptions.color, true) || that._getMainColor();
    const colorId = (_pointOptions$color = pointOptions.color) === null || _pointOptions$color === void 0 ? void 0 : _pointOptions$color.fillId;
    const hoverStyle = pointOptions.hoverStyle || {};
    const selectionStyle = pointOptions.selectionStyle || {};
    if (colorId) {
      that._turnOffHatching(hoverStyle, selectionStyle);
    }
    return {
      labelColor: mainColor,
      normal: that._parsePointStyle(pointOptions, mainColor, mainColor),
      hover: that._parsePointStyle(hoverStyle, colorId || mainColor, mainColor),
      selection: that._parsePointStyle(selectionStyle, colorId || mainColor, mainColor)
    };
  },
  _updatePointsVisibility: function () {
    const visibility = this._options.visible;
    each(this._points, function (_, point) {
      point._options.visible = visibility;
    });
  },
  _getOptionsForPoint: function () {
    return this._options;
  },
  _animate: function (firstDrawing) {
    const that = this;
    const complete = function () {
      that._animateComplete();
    };
    const animateFunc = function (drawnPoints, complete) {
      const lastPointIndex = drawnPoints.length - 1;
      _each(drawnPoints || [], function (i, point) {
        point.animate(i === lastPointIndex ? complete : undefined, point.getMarkerCoords());
      });
    };
    that._animatePoints(firstDrawing, complete, animateFunc);
  },
  getValueRangeInitialValue: areaSeries.getValueRangeInitialValue,
  _patchMarginOptions: function (options) {
    var _this$getArgumentAxis;
    options.checkInterval = !this.useAggregation() || ((_this$getArgumentAxis = this.getArgumentAxis()) === null || _this$getArgumentAxis === void 0 ? void 0 : _this$getArgumentAxis.aggregatedPointBetweenTicks());
    return options;
  },
  _defaultAggregator: 'sum',
  _defineDrawingState() {},
  usePointsToDefineAutoHiding() {
    return false;
  }
};
chart.bar = _extend({}, chartSeries, baseBarSeriesMethods, {
  _getAffineCoordOptions: function () {
    const rotated = this._options.rotated;
    const direction = rotated ? 'X' : 'Y';
    const settings = {
      scaleX: rotated ? 0.001 : 1,
      scaleY: rotated ? 1 : 0.001
    };
    settings['translate' + direction] = this.getValueAxis().getTranslator().translate('canvas_position_default');
    return settings;
  },
  _animatePoints: function (firstDrawing, complete, animateFunc) {
    const that = this;
    that._markersGroup.animate({
      scaleX: 1,
      scaleY: 1,
      translateY: 0,
      translateX: 0
    }, undefined, complete);
    if (!firstDrawing) {
      animateFunc(that._drawnPoints, complete);
    }
  },
  checkSeriesViewportCoord(axis, coord) {
    if (!chartSeries.checkSeriesViewportCoord.call(this)) {
      return false;
    }
    if (axis.isArgumentAxis) {
      return true;
    }
    const translator = axis.getTranslator();
    const range = this.getViewport();
    const min = translator.translate(range.categories ? range.categories[0] : range.min);
    const max = translator.translate(range.categories ? range.categories[range.categories.length - 1] : range.max);
    const rotated = this.getOptions().rotated;
    const inverted = axis.getOptions().inverted;
    return rotated && !inverted || !rotated && inverted ? coord >= min && coord <= max : coord >= max && coord <= min;
  },
  getSeriesPairCoord(coord, isArgument) {
    let oppositeCoord = null;
    const {
      rotated
    } = this._options;
    const isOpposite = !isArgument && !rotated || isArgument && rotated;
    const coordName = isOpposite ? 'vy' : 'vx';
    const oppositeCoordName = isOpposite ? 'vx' : 'vy';
    const points = this.getPoints();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      let tmpCoord;
      if (isArgument) {
        tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : undefined;
      } else {
        tmpCoord = p[coordName] === coord ? p[oppositeCoordName] : undefined;
      }
      if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
        oppositeCoord = tmpCoord;
        break;
      }
    }
    return oppositeCoord;
  }
});
polar.bar = _extend({}, polarSeries, baseBarSeriesMethods, {
  _animatePoints: function (firstDrawing, complete, animateFunc) {
    animateFunc(this._drawnPoints, complete);
  },
  _setGroupsSettings: chartSeries._setGroupsSettings,
  _drawPoint: function (point, groups, animationEnabled) {
    chartSeries._drawPoint.call(this, point, groups, animationEnabled);
  },
  _parsePointStyle: function (style) {
    const base = baseBarSeriesMethods._parsePointStyle.apply(this, arguments);
    base.opacity = style.opacity;
    return base;
  },
  _createGroups: chartSeries._createGroups,
  _setMarkerGroupSettings: function () {
    const that = this;
    const markersSettings = that._createPointStyles(that._getMarkerGroupOptions()).normal;
    markersSettings['class'] = 'dxc-markers';
    that._applyMarkerClipRect(markersSettings);
    const groupSettings = _extend({}, markersSettings);
    delete groupSettings.opacity; // T110796
    that._markersGroup.attr(groupSettings);
  },
  getSeriesPairCoord(params, isArgument) {
    let coords = null;
    const paramName = isArgument ? 'argument' : 'radius';
    const points = this.getVisiblePoints();
    const argAxis = this.getArgumentAxis();
    const startAngle = argAxis.getAngles()[0];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const tmpPoint = _isDefined(p[paramName]) && _isDefined(params[paramName]) && p[paramName].valueOf() === params[paramName].valueOf() ? convertPolarToXY(argAxis.getCenter(), startAngle, -argAxis.getTranslatedAngle(p.angle), p.radius) : undefined;
      if (_isDefined(tmpPoint)) {
        coords = tmpPoint;
        break;
      }
    }
    return coords;
  },
  _createLegendState: areaSeries._createLegendState
});
export { chart, polar };
