/**
* DevExtreme (cjs/__internal/viz/series/base_series.js)
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
exports.Series = Series;
exports.mixins = void 0;
var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _consts = _interopRequireDefault(require("../../viz/components/consts"));
var _utils = require("../../viz/core/utils");
var areaSeries = _interopRequireWildcard(require("./area_series"));
var barSeries = _interopRequireWildcard(require("./bar_series"));
var _bubble_series = require("./bubble_series");
var financialSeries = _interopRequireWildcard(require("./financial_series"));
var _range_data_calculator = _interopRequireDefault(require("./helpers/range_data_calculator"));
var lineSeries = _interopRequireWildcard(require("./line_series"));
var pieSeries = _interopRequireWildcard(require("./pie_series"));
var _base_point = require("./points/base_point");
var _range_series = require("./range_series");
var scatterSeries = _interopRequireWildcard(require("./scatter_series"));
var stackedSeries = _interopRequireWildcard(require("./stacked_series"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

const seriesNS = {};
const states = _consts.default.states;
const DISCRETE = 'discrete';
const SELECTED_STATE = states.selectedMark;
const HOVER_STATE = states.hoverMark;
const HOVER = states.hover;
const NORMAL = states.normal;
const SELECTION = states.selection;
const APPLY_SELECTED = states.applySelected;
const APPLY_HOVER = states.applyHover;
const RESET_ITEM = states.resetItem;
const NONE_MODE = 'none';
const INCLUDE_POINTS = 'includepoints';
const NEAREST_POINT = 'nearestpoint';
const SERIES_SELECTION_CHANGED = 'seriesSelectionChanged';
const POINT_SELECTION_CHANGED = 'pointSelectionChanged';
const SERIES_HOVER_CHANGED = 'seriesHoverChanged';
const POINT_HOVER_CHANGED = 'pointHoverChanged';
const ALL_SERIES_POINTS = 'allseriespoints';
const ALL_ARGUMENT_POINTS = 'allargumentpoints';
const POINT_HOVER = 'pointHover';
const CLEAR_POINT_HOVER = 'clearPointHover';
const SERIES_SELECT = 'seriesSelect';
const POINT_SELECT = 'pointSelect';
const POINT_DESELECT = 'pointDeselect';
const getEmptyBusinessRange = function () {
  return {
    arg: {},
    val: {}
  };
};
function triggerEvent(element, event, point) {
  element && element.trigger(event, point);
}
// @ts-expect-error
seriesNS.mixins = {
  chart: {},
  pie: {},
  polar: {}
};
// @ts-expect-error
seriesNS.mixins.chart.scatter = scatterSeries.chart;
// @ts-expect-error
seriesNS.mixins.polar.scatter = scatterSeries.polar;
// @ts-expect-error
(0, _extend2.extend)(seriesNS.mixins.pie, pieSeries);
(0, _extend2.extend)(
// @ts-expect-error
seriesNS.mixins.chart, lineSeries.chart, areaSeries.chart, barSeries.chart, _range_series.chart, _bubble_series.chart, financialSeries, stackedSeries.chart);
// @ts-expect-error
(0, _extend2.extend)(seriesNS.mixins.polar, lineSeries.polar, areaSeries.polar, barSeries.polar, stackedSeries.polar);
function includePointsMode(mode) {
  mode = (0, _utils.normalizeEnum)(mode);
  return mode === INCLUDE_POINTS || mode === ALL_SERIES_POINTS;
}
function getLabelOptions(labelOptions, defaultColor) {
  const opt = labelOptions || {};
  const labelFont = (0, _extend2.extend)({}, opt.font) || {};
  const labelBorder = opt.border || {};
  const labelConnector = opt.connector || {};
  const backgroundAttr = {
    fill: opt.backgroundColor || defaultColor,
    'stroke-width': labelBorder.visible ? labelBorder.width || 0 : 0,
    stroke: labelBorder.visible && labelBorder.width ? labelBorder.color : 'none',
    dashStyle: labelBorder.dashStyle
  };
  const connectorAttr = {
    stroke: labelConnector.visible && labelConnector.width ? labelConnector.color || defaultColor : 'none',
    'stroke-width': labelConnector.visible ? labelConnector.width || 0 : 0
  };
  labelFont.color = opt.backgroundColor === 'none' && (0, _utils.normalizeEnum)(labelFont.color) === '#ffffff' && opt.position !== 'inside' ? defaultColor : labelFont.color;
  return {
    alignment: opt.alignment,
    format: opt.format,
    argumentFormat: opt.argumentFormat,
    customizeText: (0, _type.isFunction)(opt.customizeText) ? opt.customizeText : undefined,
    attributes: {
      font: labelFont
    },
    visible: labelFont.size !== 0 ? opt.visible : false,
    showForZeroValues: opt.showForZeroValues,
    horizontalOffset: opt.horizontalOffset,
    verticalOffset: opt.verticalOffset,
    radialOffset: opt.radialOffset,
    background: backgroundAttr,
    position: opt.position,
    connector: connectorAttr,
    rotationAngle: opt.rotationAngle,
    wordWrap: opt.wordWrap,
    textOverflow: opt.textOverflow,
    cssClass: opt.cssClass,
    displayFormat: opt.displayFormat
  };
}
function setPointHoverState(point, legendCallback) {
  point.fullState |= HOVER_STATE;
  point.applyView(legendCallback);
}
function releasePointHoverState(point, legendCallback) {
  point.fullState &= ~HOVER_STATE;
  point.applyView(legendCallback);
  point.releaseHoverState();
}
function setPointSelectedState(point, legendCallback) {
  point.fullState |= SELECTED_STATE;
  point.applyView(legendCallback);
}
function releasePointSelectedState(point, legendCallback) {
  point.fullState &= ~SELECTED_STATE;
  point.applyView(legendCallback);
}
function mergePointOptionsCore(base, extra) {
  const options = (0, _extend2.extend)({}, base, extra);
  options.border = (0, _extend2.extend)({}, base && base.border, extra && extra.border);
  return options;
}
function mergePointOptions(base, extra) {
  const options = mergePointOptionsCore(base, extra);
  options.image = (0, _extend2.extend)(true, {}, base.image, extra.image);
  options.selectionStyle = mergePointOptionsCore(base.selectionStyle, extra.selectionStyle);
  options.hoverStyle = mergePointOptionsCore(base.hoverStyle, extra.hoverStyle);
  return options;
}
function Series(settings, options) {
  const that = this;
  that.fullState = 0;
  that._extGroups = settings;
  that._renderer = settings.renderer;
  that._group = settings.renderer.g().attr({
    class: 'dxc-series'
  });
  that._eventTrigger = settings.eventTrigger;
  that._eventPipe = settings.eventPipe;
  that._incidentOccurred = settings.incidentOccurred;
  that._legendCallback = _common.noop;
  that.updateOptions(options, settings);
}
function getData(pointData) {
  return pointData.data;
}
function getValueChecker(axisType, axis) {
  if (!axis || axisType !== 'logarithmic' || axis.getOptions().allowNegatives !== false) {
    return () => true;
  } else {
    return value => value > 0;
  }
}
Series.prototype = {
  constructor: Series,
  _createLegendState: _common.noop,
  getLegendStyles() {
    return this._styles.legendStyles;
  },
  _createStyles(options) {
    const that = this;
    const mainSeriesColor = options.mainSeriesColor;
    const colorId = this._getColorId(options);
    const hoverStyle = options.hoverStyle || {};
    const selectionStyle = options.selectionStyle || {};
    if (colorId) {
      that._turnOffHatching(hoverStyle, selectionStyle);
    }
    that._styles = {
      labelColor: mainSeriesColor,
      normal: that._parseStyle(options, mainSeriesColor, mainSeriesColor),
      hover: that._parseStyle(hoverStyle, colorId || mainSeriesColor, mainSeriesColor),
      selection: that._parseStyle(selectionStyle, colorId || mainSeriesColor, mainSeriesColor),
      legendStyles: {
        normal: that._createLegendState(options, colorId || mainSeriesColor),
        hover: that._createLegendState(hoverStyle, colorId || mainSeriesColor),
        selection: that._createLegendState(selectionStyle, colorId || mainSeriesColor)
      }
    };
  },
  setClippingParams(baseId, wideId, forceClipping) {
    let clipLabels = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    this._paneClipRectID = baseId;
    this._widePaneClipRectID = wideId;
    this._forceClipping = forceClipping;
    this._clipLabels = clipLabels;
  },
  applyClip() {
    this._group.attr({
      'clip-path': this._paneClipRectID
    });
  },
  resetClip() {
    this._group.attr({
      'clip-path': null
    });
  },
  getTagField() {
    return this._options.tagField || 'tag';
  },
  getValueFields: _common.noop,
  getSizeField: _common.noop,
  getArgumentField: _common.noop,
  getPoints() {
    return this._points;
  },
  getPointsInViewPort() {
    return _range_data_calculator.default.getPointsInViewPort(this);
  },
  _createPoint(data, index, oldPoint) {
    data.index = index;
    const that = this;
    const pointsByArgument = that.pointsByArgument;
    const options = that._getCreatingPointOptions(data);
    const arg = data.argument.valueOf();
    let point = oldPoint;
    if (point) {
      point.update(data, options);
    } else {
      point = new _base_point.Point(that, data, options);
      if (that.isSelected() && includePointsMode(that.lastSelectionMode)) {
        point.setView(SELECTION);
      }
    }
    const pointByArgument = pointsByArgument[arg];
    if (pointByArgument) {
      pointByArgument.push(point);
    } else {
      pointsByArgument[arg] = [point];
    }
    if (point.hasValue()) {
      that.customizePoint(point, data);
    }
    return point;
  },
  getRangeData() {
    return this._visible ? this._getRangeData() : getEmptyBusinessRange();
  },
  getArgumentRange() {
    return this._visible ? _range_data_calculator.default.getArgumentRange(this) : getEmptyBusinessRange();
  },
  getViewport() {
    return _range_data_calculator.default.getViewport(this);
  },
  _deleteGroup(groupName) {
    const group = this[groupName];
    if (group) {
      group.dispose();
      this[groupName] = null;
    }
  },
  updateOptions(newOptions, settings) {
    const that = this;
    const widgetType = newOptions.widgetType;
    const oldType = that.type;
    const newType = newOptions.type;
    that.type = newType && (0, _utils.normalizeEnum)(newType.toString());
    if (!that._checkType(widgetType) || that._checkPolarBarType(widgetType, newOptions)) {
      that.dispose();
      that.isUpdated = false;
      return;
    }
    if (oldType !== that.type) {
      that._firstDrawing = true;
      that._resetType(oldType, widgetType);
      that._setType(that.type, widgetType);
    } else {
      that._defineDrawingState();
    }
    that._options = newOptions;
    that._pointOptions = null;
    that.name = newOptions.name;
    that.pane = newOptions.pane;
    that.tag = newOptions.tag;
    if (settings) {
      that._seriesModes = settings.commonSeriesModes || that._seriesModes;
      that._valueAxis = settings.valueAxis || that._valueAxis;
      that.axis = that._valueAxis && that._valueAxis.name;
      that._argumentAxis = settings.argumentAxis || that._argumentAxis;
    }
    that._createStyles(newOptions);
    that._stackName = null;
    that._updateOptions(newOptions);
    that._visible = newOptions.visible;
    that.isUpdated = true;
    that.stack = newOptions.stack;
    that.barOverlapGroup = newOptions.barOverlapGroup;
    that._createGroups();
    that._processEmptyValue = newOptions.ignoreEmptyPoints ? x => x === null ? undefined : x : x => x;
  },
  _defineDrawingState() {
    this._firstDrawing = true;
  },
  _disposePoints(points) {
    (0, _iterator.each)(points || [], (_, p) => {
      p.dispose();
    });
  },
  updateDataType(settings) {
    const that = this;
    that.argumentType = settings.argumentType;
    that.valueType = settings.valueType;
    that.argumentAxisType = settings.argumentAxisType;
    that.valueAxisType = settings.valueAxisType;
    that.showZero = settings.showZero;
    this._argumentChecker = getValueChecker(settings.argumentAxisType, that.getArgumentAxis());
    this._valueChecker = getValueChecker(settings.valueAxisType, that.getValueAxis());
    return that;
  },
  _argumentChecker() {
    return true;
  },
  _valueChecker() {
    return true;
  },
  getOptions() {
    return this._options;
  },
  _getOldPoint(data, oldPointsByArgument, index) {
    const arg = data.argument && data.argument.valueOf();
    const point = (oldPointsByArgument[arg] || [])[0];
    if (point) {
      oldPointsByArgument[arg].splice(0, 1);
    }
    return point;
  },
  updateData(data) {
    const that = this;
    const options = that._options;
    const nameField = options.nameField;
    data = data || [];
    if (data.length) {
      that._canRenderCompleteHandle = true;
    }
    const dataSelector = this._getPointDataSelector();
    let itemsWithoutArgument = 0;
    that._data = data.reduce((data, dataItem, index) => {
      const pointDataItem = dataSelector(dataItem);
      if ((0, _type.isDefined)(pointDataItem.argument)) {
        if (!nameField || dataItem[nameField] === options.nameFieldValue) {
          pointDataItem.index = index;
          data.push(pointDataItem);
        }
      } else {
        itemsWithoutArgument++;
      }
      return data;
    }, []);
    if (itemsWithoutArgument && itemsWithoutArgument === data.length) {
      that._incidentOccurred('W2002', [that.name, that.getArgumentField()]);
    }
    that._endUpdateData();
  },
  _getData() {
    let data = this._data || [];
    if (this.useAggregation()) {
      const aggregateByCategory = this.argumentAxisType === DISCRETE;
      const argumentRange = aggregateByCategory ? {} : this.getArgumentRange();
      const aggregationInfo = aggregateByCategory ? {} : this.getArgumentAxis().getAggregationInfo(this._useAllAggregatedPoints, argumentRange);
      data = this._resample(aggregationInfo, data);
    }
    return data;
  },
  useAggregation() {
    const aggregation = this.getOptions().aggregation;
    return aggregation && aggregation.enabled;
  },
  autoHidePointMarkersEnabled: _common.noop,
  usePointsToDefineAutoHiding: _common.noop,
  createPoints(useAllAggregatedPoints) {
    this._normalizeUsingAllAggregatedPoints(useAllAggregatedPoints);
    this._createPoints();
  },
  _normalizeUsingAllAggregatedPoints(useAllAggregatedPoints) {
    this._useAllAggregatedPoints = this.useAggregation() && (this.argumentAxisType === DISCRETE || (this._data || []).length > 1 && !!useAllAggregatedPoints);
  },
  _createPoints() {
    const that = this;
    const oldPointsByArgument = that.pointsByArgument || {};
    const data = that._getData();
    that.pointsByArgument = {};
    that._calculateErrorBars(data);
    const skippedFields = {};
    const points = data.reduce((points, pointDataItem) => {
      if (that._checkData(pointDataItem, skippedFields)) {
        const pointIndex = points.length;
        const oldPoint = that._getOldPoint(pointDataItem, oldPointsByArgument, pointIndex);
        const point = that._createPoint(pointDataItem, pointIndex, oldPoint);
        points.push(point);
      }
      return points;
    }, []);
    for (const field in skippedFields) {
      if (skippedFields[field] === data.length) {
        that._incidentOccurred('W2002', [that.name, field]);
      }
    }
    Object.keys(oldPointsByArgument).forEach(key => that._disposePoints(oldPointsByArgument[key]));
    that._points = points;
  },
  _removeOldSegments() {
    const that = this;
    const startIndex = that._segments.length;
    (0, _iterator.each)(that._graphics.splice(startIndex, that._graphics.length) || [], (_, elem) => {
      that._removeElement(elem);
    });
    if (that._trackers) {
      (0, _iterator.each)(that._trackers.splice(startIndex, that._trackers.length) || [], (_, elem) => {
        elem.remove();
      });
    }
  },
  _prepareSegmentsPosition() {
    const points = this._points || [];
    const isCloseSegment = points[0] && points[0].hasValue() && this._options.closed;
    const segments = points.reduce((segments, p) => {
      const segment = segments.at(-1);
      if (!p.translated) {
        p.setDefaultCoords();
      }
      if (p.hasValue() && p.hasCoords()) {
        segment.push(p);
      } else if (!p.hasValue() && segment.length) {
        segments.push([]);
      }
      return segments;
    }, [[]]);
    this._drawSegments(segments, isCloseSegment, false);
  },
  _drawElements(animationEnabled, firstDrawing) {
    const that = this;
    const points = that._points || [];
    const isCloseSegment = points[0] && points[0].hasValue() && that._options.closed;
    const groupForPoint = {
      markers: that._markersGroup,
      errorBars: that._errorBarGroup
    };
    that._drawnPoints = [];
    that._graphics = that._graphics || [];
    that._segments = [];
    const segments = points.reduce((segments, p) => {
      const segment = segments.at(-1);
      if (p.hasValue() && p.hasCoords()) {
        that._drawPoint({
          point: p,
          groups: groupForPoint,
          hasAnimation: animationEnabled,
          firstDrawing
        });
        segment.push(p);
      } else if (!p.hasValue()) {
        segment.length && segments.push([]);
      } else {
        p.setInvisibility();
      }
      return segments;
    }, [[]]);
    that._drawSegments(segments, isCloseSegment, animationEnabled);
    that._firstDrawing = !points.length;
    that._removeOldSegments();
    animationEnabled && that._animate(firstDrawing);
  },
  _drawSegments(segments, closeSegment, animationEnabled) {
    segments.forEach((segment, index) => {
      if (segment.length) {
        const lastSegment = closeSegment && index === segments.length - 1;
        this._drawSegment(segment, animationEnabled, index, lastSegment);
      }
    });
  },
  draw(animationEnabled, hideLayoutLabels, legendCallback) {
    const that = this;
    const firstDrawing = that._firstDrawing;
    that._legendCallback = legendCallback || that._legendCallback;
    if (!that._visible) {
      that._group.remove();
      return;
    }
    that._appendInGroup();
    if (!that._isAllPointsTranslated) {
      that.prepareCoordinatesForPoints();
    }
    that._setGroupsSettings(animationEnabled, firstDrawing);
    !firstDrawing && !that._resetApplyingAnimation && that._prepareSegmentsPosition();
    that._drawElements(animationEnabled, firstDrawing);
    hideLayoutLabels && that.hideLabels();
    if (that.isSelected()) {
      that._changeStyle(that.lastSelectionMode, undefined, true);
    } else if (that.isHovered()) {
      that._changeStyle(that.lastHoverMode, undefined, true);
    } else {
      that._applyStyle(that._styles.normal);
    }
    that._isAllPointsTranslated = false;
    that._resetApplyingAnimation = false;
  },
  _translatePoints() {
    const points = this._points ?? [];
    points.forEach(p => {
      p.translate();
    });
  },
  prepareCoordinatesForPoints() {
    this._applyVisibleArea();
    this._translatePoints();
    this._isAllPointsTranslated = true;
  },
  _setLabelGroupSettings(animationEnabled) {
    const settings = {
      class: 'dxc-labels',
      'pointer-events': 'none'
    };
    this._clipLabels && this._applyElementsClipRect(settings);
    this._applyClearingSettings(settings);
    // @ts-expect-error
    animationEnabled && (settings.opacity = 0.001);
    this._labelsGroup.attr(settings).append(this._extGroups.labelsGroup);
  },
  _checkType(widgetType) {
    // @ts-expect-error
    return !!seriesNS.mixins[widgetType][this.type];
  },
  _checkPolarBarType(widgetType, options) {
    return widgetType === 'polar' && options.spiderWidget && this.type.indexOf('bar') !== -1;
  },
  _resetType(seriesType, widgetType) {
    let methodName;
    let methods;
    if (seriesType) {
      // @ts-expect-error
      methods = seriesNS.mixins[widgetType][seriesType];
      for (methodName in methods) {
        delete this[methodName];
      }
    }
  },
  _setType(seriesType, widgetType) {
    let methodName;
    // @ts-expect-error
    const methods = seriesNS.mixins[widgetType][seriesType];
    for (methodName in methods) {
      this[methodName] = methods[methodName];
    }
  },
  _setPointsView(view, target) {
    this.getPoints().forEach(point => {
      if (target !== point) {
        point.setView(view);
      }
    });
  },
  _resetPointsView(view, target) {
    this.getPoints().forEach(point => {
      if (target !== point) {
        point.resetView(view);
      }
    });
  },
  _resetNearestPoint() {
    const that = this;
    that._nearestPoint && that._nearestPoint.series !== null && that._nearestPoint.resetView(HOVER);
    that._nearestPoint = null;
  },
  _setSelectedState(mode) {
    const that = this;
    that.lastSelectionMode = (0, _utils.normalizeEnum)(mode || that._options.selectionMode);
    that.fullState |= SELECTED_STATE;
    that._resetNearestPoint();
    that._changeStyle(that.lastSelectionMode);
    if (that.lastSelectionMode !== NONE_MODE && that.isHovered() && includePointsMode(that.lastHoverMode)) {
      that._resetPointsView(HOVER);
    }
  },
  _releaseSelectedState() {
    const that = this;
    that.fullState &= ~SELECTED_STATE;
    that._changeStyle(that.lastSelectionMode, SELECTION);
    if (that.lastSelectionMode !== NONE_MODE && that.isHovered() && includePointsMode(that.lastHoverMode)) {
      that._setPointsView(HOVER);
    }
  },
  isFullStackedSeries() {
    return this.type.indexOf('fullstacked') === 0;
  },
  isStackedSeries() {
    return this.type.indexOf('stacked') === 0;
  },
  resetApplyingAnimation(isFirstDrawing) {
    this._resetApplyingAnimation = true;
    if (isFirstDrawing) {
      this._firstDrawing = true;
    }
  },
  isFinancialSeries() {
    return this.type === 'stock' || this.type === 'candlestick';
  },
  _canChangeView() {
    return !this.isSelected() && (0, _utils.normalizeEnum)(this._options.hoverMode) !== NONE_MODE;
  },
  _changeStyle(mode, resetView, skipPoints) {
    const that = this;
    let state = that.fullState;
    const styles = [NORMAL, HOVER, SELECTION, SELECTION];
    if (that.lastHoverMode === 'none') {
      state &= ~HOVER_STATE;
    }
    if (that.lastSelectionMode === 'none') {
      state &= ~SELECTED_STATE;
    }
    if (includePointsMode(mode) && !skipPoints) {
      if (!resetView) {
        that._setPointsView(styles[state]);
      } else {
        that._resetPointsView(resetView);
      }
    }
    that._legendCallback([RESET_ITEM, APPLY_HOVER, APPLY_SELECTED, APPLY_SELECTED][state]);
    that._applyStyle(that._styles[styles[state]]);
  },
  updateHover(x, y) {
    const that = this;
    const currentNearestPoint = that._nearestPoint;
    const point = that.isHovered() && that.lastHoverMode === NEAREST_POINT && that.getNeighborPoint(x, y);
    if (point !== currentNearestPoint && !(that.isSelected() && that.lastSelectionMode !== NONE_MODE)) {
      that._resetNearestPoint();
      if (point) {
        point.setView(HOVER);
        that._nearestPoint = point;
      }
    }
  },
  _getMainAxisName() {
    return this._options.rotated ? 'X' : 'Y';
  },
  areLabelsVisible() {
    return !(0, _type.isDefined)(this._options.maxLabelCount) || this._points.length <= this._options.maxLabelCount;
  },
  getLabelVisibility() {
    return this.areLabelsVisible() && this._options.label && this._options.label.visible;
  },
  customizePoint(point, pointData) {
    const that = this;
    const options = that._options;
    const customizePoint = options.customizePoint;
    let customizeObject;
    let pointOptions;
    let customLabelOptions;
    let customOptions;
    const customizeLabel = options.customizeLabel;
    let useLabelCustomOptions;
    let usePointCustomOptions;
    if (customizeLabel && customizeLabel.call) {
      customizeObject = (0, _extend2.extend)({
        seriesName: that.name
      }, pointData);
      customizeObject.series = that;
      customLabelOptions = customizeLabel.call(customizeObject, customizeObject);
      useLabelCustomOptions = customLabelOptions && !(0, _type.isEmptyObject)(customLabelOptions);
      customLabelOptions = useLabelCustomOptions ? (0, _extend2.extend)(true, {}, options.label, customLabelOptions) : null;
    }
    if (customizePoint && customizePoint.call) {
      customizeObject = customizeObject || (0, _extend2.extend)({
        seriesName: that.name
      }, pointData);
      customizeObject.series = that;
      customOptions = customizePoint.call(customizeObject, customizeObject);
      usePointCustomOptions = customOptions && !(0, _type.isEmptyObject)(customOptions);
    }
    if (useLabelCustomOptions || usePointCustomOptions) {
      pointOptions = that._parsePointOptions(that._preparePointOptions(customOptions), customLabelOptions || options.label, pointData, point);
      pointOptions.styles.useLabelCustomOptions = useLabelCustomOptions;
      pointOptions.styles.usePointCustomOptions = usePointCustomOptions;
      point.updateOptions(pointOptions);
    }
  },
  show() {
    if (!this._visible) {
      this._changeVisibility(true);
    }
  },
  hide() {
    if (this._visible) {
      this._changeVisibility(false);
    }
  },
  _changeVisibility(visibility) {
    const that = this;
    that._visible = that._options.visible = visibility;
    that._updatePointsVisibility();
    that.hidePointTooltip();
    that._options.visibilityChanged(that);
  },
  // TODO. Problem related to 'point' option for bar-like series. Revisit this code once options parsing is changed
  // see T243839, T231939
  _updatePointsVisibility: _common.noop,
  hideLabels() {
    (0, _iterator.each)(this._points, (_, point) => {
      point._label.draw(false);
    });
  },
  _turnOffHatching(hoverStyle, selectionStyle) {
    if (hoverStyle.hatching) {
      hoverStyle.hatching.direction = 'none';
    }
    if (selectionStyle.hatching) {
      selectionStyle.hatching.direction = 'none';
    }
  },
  _parsePointOptions(pointOptions, labelOptions, data, point) {
    const that = this;
    const options = that._options;
    const styles = that._createPointStyles(pointOptions, data, point);
    const parsedOptions = (0, _extend2.extend)({}, pointOptions, {
      type: options.type,
      rotated: options.rotated,
      styles,
      widgetType: options.widgetType,
      visibilityChanged: options.visibilityChanged
    });
    parsedOptions.label = getLabelOptions(labelOptions, styles.labelColor);
    if (that.areErrorBarsVisible()) {
      parsedOptions.errorBars = options.valueErrorBar;
    }
    return parsedOptions;
  },
  _preparePointOptions(customOptions) {
    const pointOptions = this._getOptionsForPoint();
    return customOptions ? mergePointOptions(pointOptions, customOptions) : pointOptions;
  },
  _getMarkerGroupOptions() {
    return (0, _extend2.extend)(false, {}, this._getOptionsForPoint(), {
      hoverStyle: {},
      selectionStyle: {}
    });
  },
  _getAggregationMethod(isValueAxisDiscrete) {
    const options = this.getOptions().aggregation;
    const method = (0, _utils.normalizeEnum)(options.method);
    const customAggregator = method === 'custom' && options.calculate;
    if (customAggregator) {
      return customAggregator;
    }
    if (isValueAxisDiscrete) {
      return _ref => {
        let {
          data
        } = _ref;
        return data[0];
      };
    }
    return this._aggregators[method] || this._aggregators[this._defaultAggregator];
  },
  _resample(_ref2, data) {
    let {
      interval,
      ticks
    } = _ref2;
    const that = this;
    const options = that.getOptions();
    const dataSelector = this._getPointDataSelector();
    const addAggregatedData = (target, data, aggregationInfo) => {
      if (!data) {
        return;
      }
      const processData = d => {
        const pointData = d && dataSelector(d, options);
        if (pointData && that._checkData(pointData)) {
          pointData.aggregationInfo = aggregationInfo;
          target.push(pointData);
        }
      };
      if (Array.isArray(data)) {
        data.forEach(processData);
      } else {
        processData(data);
      }
    };
    const isValueAxisDiscrete = that.valueAxisType === DISCRETE;
    const aggregateByCategory = that.argumentAxisType === DISCRETE;
    const aggregationMethod = this._getAggregationMethod(isValueAxisDiscrete);
    if (aggregateByCategory) {
      const categories = this.getArgumentAxis().getTranslator().getBusinessRange().categories;
      const groups = categories.reduce((g, category) => {
        g[category.valueOf()] = [];
        return g;
      }, {});
      data.forEach(dataItem => {
        groups[dataItem.argument.valueOf()].push(dataItem);
      });
      return categories.reduce((result, c) => {
        addAggregatedData(result, aggregationMethod({
          aggregationInterval: null,
          intervalStart: c,
          intervalEnd: c,
          data: groups[c.valueOf()].map(getData)
        }, that));
        return result;
      }, []);
    }
    if (isValueAxisDiscrete) {
      return data.reduce((result, dataItem, index, data) => {
        result[1].push(dataItem);
        if (index === data.length - 1 || (index + 1) % interval === 0) {
          const dataInInterval = result[1];
          const aggregationInfo = {
            aggregationInterval: interval,
            data: dataInInterval.map(getData)
          };
          addAggregatedData(result[0], aggregationMethod(aggregationInfo, that));
          result[1] = [];
        }
        return result;
      }, [[], []])[0];
    }
    const aggregatedData = [];
    if (ticks.length === 1) {
      const aggregationInfo = {
        intervalStart: ticks[0],
        intervalEnd: ticks[0],
        aggregationInterval: null,
        data: data.map(getData)
      };
      addAggregatedData(aggregatedData, aggregationMethod(aggregationInfo, that), aggregationInfo);
    } else {
      let dataIndex = 0;
      for (let i = 1; i < ticks.length; i++) {
        const intervalEnd = ticks[i];
        const intervalStart = ticks[i - 1];
        const dataInInterval = [];
        while (data[dataIndex] && data[dataIndex].argument < intervalEnd) {
          if (data[dataIndex].argument >= intervalStart) {
            // @ts-expect-error
            dataInInterval.push(data[dataIndex]);
          }
          dataIndex++;
        }
        const aggregationInfo = {
          intervalStart,
          intervalEnd,
          aggregationInterval: interval,
          data: dataInInterval.map(getData)
        };
        addAggregatedData(aggregatedData, aggregationMethod(aggregationInfo, that), aggregationInfo);
      }
    }
    that._endUpdateData();
    return aggregatedData;
  },
  canRenderCompleteHandle() {
    const result = this._canRenderCompleteHandle;
    delete this._canRenderCompleteHandle;
    return !!result;
  },
  isHovered() {
    return !!(this.fullState & 1);
  },
  isSelected() {
    return !!(this.fullState & 2);
  },
  isVisible() {
    return this._visible;
  },
  getAllPoints() {
    this._createAllAggregatedPoints();
    return (this._points || []).slice();
  },
  getPointByPos(pos) {
    this._createAllAggregatedPoints();
    return (this._points || [])[pos];
  },
  getVisiblePoints() {
    return (this._drawnPoints || []).slice();
  },
  selectPoint(point) {
    if (!point.isSelected()) {
      setPointSelectedState(point, this._legendCallback);
      this._eventPipe({
        action: POINT_SELECT,
        target: point
      });
      this._eventTrigger(POINT_SELECTION_CHANGED, {
        target: point
      });
    }
  },
  deselectPoint(point) {
    if (point.isSelected()) {
      releasePointSelectedState(point, this._legendCallback);
      this._eventPipe({
        action: POINT_DESELECT,
        target: point
      });
      this._eventTrigger(POINT_SELECTION_CHANGED, {
        target: point
      });
    }
  },
  hover(mode) {
    const that = this;
    const eventTrigger = that._eventTrigger;
    if (that.isHovered()) {
      return;
    }
    that.lastHoverMode = (0, _utils.normalizeEnum)(mode || that._options.hoverMode);
    that.fullState |= HOVER_STATE;
    that._changeStyle(that.lastHoverMode, undefined, that.isSelected() && that.lastSelectionMode !== NONE_MODE);
    eventTrigger(SERIES_HOVER_CHANGED, {
      target: that
    });
  },
  clearHover() {
    const that = this;
    const eventTrigger = that._eventTrigger;
    if (!that.isHovered()) {
      return;
    }
    that._resetNearestPoint();
    that.fullState &= ~HOVER_STATE;
    that._changeStyle(that.lastHoverMode, HOVER, that.isSelected() && that.lastSelectionMode !== NONE_MODE);
    eventTrigger(SERIES_HOVER_CHANGED, {
      target: that
    });
  },
  hoverPoint(point) {
    const that = this;
    if (!point.isHovered()) {
      point.clearHover();
      setPointHoverState(point, that._legendCallback);
      that._canChangeView() && that._applyStyle(that._styles.hover);
      that._eventPipe({
        action: POINT_HOVER,
        target: point
      });
      that._eventTrigger(POINT_HOVER_CHANGED, {
        target: point
      });
    }
  },
  clearPointHover() {
    const that = this;
    that.getPoints().some(currentPoint => {
      if (currentPoint.isHovered()) {
        releasePointHoverState(currentPoint, that._legendCallback);
        that._canChangeView() && that._applyStyle(that._styles.normal);
        that._eventPipe({
          action: CLEAR_POINT_HOVER,
          target: currentPoint
        });
        that._eventTrigger(POINT_HOVER_CHANGED, {
          target: currentPoint
        });
        return true;
      }
      return false;
    });
  },
  showPointTooltip(point) {
    triggerEvent(this._extGroups.seriesGroup, 'showpointtooltip', point);
  },
  hidePointTooltip(point) {
    triggerEvent(this._extGroups.seriesGroup, 'hidepointtooltip', point);
  },
  select() {
    const that = this;
    if (!that.isSelected()) {
      that._setSelectedState(that._options.selectionMode);
      that._eventPipe({
        action: SERIES_SELECT,
        target: that
      });
      that._group.toForeground();
      that._eventTrigger(SERIES_SELECTION_CHANGED, {
        target: that
      });
    }
  },
  clearSelection: function clearSelection() {
    const that = this;
    if (that.isSelected()) {
      that._releaseSelectedState();
      that._eventTrigger(SERIES_SELECTION_CHANGED, {
        target: that
      });
    }
  },
  getPointsByArg(arg, skipPointsCreation) {
    const that = this;
    const argValue = arg.valueOf();
    let points = that.pointsByArgument[argValue];
    if (!points && !skipPointsCreation && that._createAllAggregatedPoints()) {
      points = that.pointsByArgument[argValue];
    }
    return points || [];
  },
  _createAllAggregatedPoints() {
    if (this.useAggregation() && !this._useAllAggregatedPoints) {
      this.createPoints(true);
      return true;
    }
    return false;
  },
  getPointsByKeys(arg) {
    return this.getPointsByArg(arg);
  },
  notify(data) {
    const that = this;
    const action = data.action;
    const seriesModes = that._seriesModes;
    const target = data.target;
    const targetOptions = target.getOptions();
    const pointHoverMode = (0, _utils.normalizeEnum)(targetOptions.hoverMode);
    const selectionModeOfPoint = (0, _utils.normalizeEnum)(targetOptions.selectionMode);
    if (action === POINT_HOVER) {
      that._hoverPointHandler(target, pointHoverMode, data.notifyLegend);
    } else if (action === CLEAR_POINT_HOVER) {
      that._clearPointHoverHandler(target, pointHoverMode, data.notifyLegend);
    } else if (action === SERIES_SELECT) {
      target !== that && seriesModes.seriesSelectionMode === 'single' && that.clearSelection();
    } else if (action === POINT_SELECT) {
      if (seriesModes.pointSelectionMode === 'single') {
        that.getPoints().some(currentPoint => {
          if (currentPoint !== target && currentPoint.isSelected()) {
            that.deselectPoint(currentPoint);
            return true;
          }
          return false;
        });
      }
      that._selectPointHandler(target, selectionModeOfPoint);
    } else if (action === POINT_DESELECT) {
      that._deselectPointHandler(target, selectionModeOfPoint);
    }
  },
  _selectPointHandler(target, mode) {
    const that = this;
    if (mode === ALL_SERIES_POINTS) {
      target.series === that && that._setPointsView(SELECTION, target);
    } else if (mode === ALL_ARGUMENT_POINTS) {
      that.getPointsByKeys(target.argument, target.argumentIndex).forEach(currentPoint => {
        currentPoint !== target && currentPoint.setView(SELECTION);
      });
    }
  },
  _deselectPointHandler(target, mode) {
    if (mode === ALL_SERIES_POINTS) {
      target.series === this && this._resetPointsView(SELECTION, target);
    } else if (mode === ALL_ARGUMENT_POINTS) {
      this.getPointsByKeys(target.argument, target.argumentIndex).forEach(currentPoint => {
        currentPoint !== target && currentPoint.resetView(SELECTION);
      });
    }
  },
  _hoverPointHandler(target, mode, notifyLegend) {
    const that = this;
    if (target.series !== that && mode === ALL_ARGUMENT_POINTS) {
      that.getPointsByKeys(target.argument, target.argumentIndex).forEach(currentPoint => {
        currentPoint.setView(HOVER);
      });
      notifyLegend && that._legendCallback(target);
    } else if (mode === ALL_SERIES_POINTS && target.series === that) {
      that._setPointsView(HOVER, target);
    }
  },
  _clearPointHoverHandler(target, mode, notifyLegend) {
    const that = this;
    if (mode === ALL_ARGUMENT_POINTS) {
      target.series !== that && that.getPointsByKeys(target.argument, target.argumentIndex).forEach(currentPoint => {
        currentPoint.resetView(HOVER);
      });
      notifyLegend && that._legendCallback(target);
    } else if (mode === ALL_SERIES_POINTS && target.series === that) {
      that._resetPointsView(HOVER, target);
    }
  },
  _deletePoints() {
    const that = this;
    that._disposePoints(that._points);
    that._points = that._drawnPoints = null;
  },
  _deleteTrackers() {
    const that = this;
    (0, _iterator.each)(that._trackers || [], (_, tracker) => {
      tracker.remove();
    });
    that._trackersGroup && that._trackersGroup.dispose();
    that._trackers = that._trackersGroup = null;
  },
  dispose() {
    const that = this;
    that._deletePoints();
    that._group.dispose();
    that._labelsGroup && that._labelsGroup.dispose();
    that._errorBarGroup && that._errorBarGroup.dispose();
    that._deleteTrackers();
    that._group = that._extGroups = that._markersGroup = that._elementsGroup = that._bordersGroup = that._labelsGroup = that._errorBarGroup = that._graphics = that._rangeData = that._renderer = that._styles = that._options = that._pointOptions = that._drawnPoints = that.pointsByArgument = that._segments = that._prevSeries = null;
  },
  correctPosition: _common.noop,
  drawTrackers: _common.noop,
  getNeighborPoint: _common.noop,
  areErrorBarsVisible: _common.noop,
  _getColorId: _common.noop,
  getMarginOptions() {
    return this._patchMarginOptions({
      percentStick: this.isFullStackedSeries()
    });
  },
  getColor() {
    return this.getLegendStyles().normal.fill;
  },
  getOpacity() {
    return this._options.opacity;
  },
  getStackName() {
    return this._stackName;
  },
  getBarOverlapGroup() {
    return this._options.barOverlapGroup;
  },
  getPointByCoord(x, y) {
    const point = this.getNeighborPoint(x, y);
    return point !== null && point !== void 0 && point.coordsIn(x, y) ? point : null;
  },
  getValueAxis() {
    return this._valueAxis;
  },
  getArgumentAxis() {
    return this._argumentAxis;
  },
  getMarkersGroup() {
    return this._markersGroup;
  },
  getRenderer() {
    return this._renderer;
  },
  removePointElements() {
    if (this._markersGroup) {
      (0, _iterator.each)(this._points, (_, p) => p.deleteMarker());
      this._markersGroup.dispose();
      this._markersGroup = null;
    }
  },
  removeGraphicElements() {
    const that = this;
    if (that._elementsGroup) {
      that._elementsGroup.dispose();
      that._elementsGroup = null;
    }
    (0, _iterator.each)(that._graphics || [], (_, elem) => {
      that._removeElement(elem);
    });
    that._graphics = null;
  },
  removeBordersGroup() {
    if (this._bordersGroup) {
      this._bordersGroup.dispose();
      this._bordersGroup = null;
    }
  }
};
// @ts-expect-error
const mixins = exports.mixins = seriesNS.mixins;
