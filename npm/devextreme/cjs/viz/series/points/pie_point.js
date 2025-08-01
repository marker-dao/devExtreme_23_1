/**
* DevExtreme (cjs/viz/series/points/pie_point.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _extend2 = require("../../../core/utils/extend");
var _symbol_point = _interopRequireDefault(require("./symbol_point"));
var _utils = require("../../core/utils");
var _type = require("../../../core/utils/type");
var _consts = _interopRequireDefault(require("../../components/consts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const _extend = _extend2.extend;
const _round = Math.round;
const _sqrt = Math.sqrt;
const _acos = Math.acos;
const DEG = 180 / Math.PI;
const _abs = Math.abs;
const RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;
var _default = exports.default = _extend({}, _symbol_point.default, {
  _updateData: function (data, argumentChanged) {
    const that = this;
    _symbol_point.default._updateData.call(this, data);
    if (argumentChanged || !(0, _type.isDefined)(that._visible)) {
      that._visible = true;
    }
    that.minValue = that.initialMinValue = that.originalMinValue = (0, _type.isDefined)(data.minValue) ? data.minValue : 0;
  },
  animate: function (complete, duration, delay) {
    const that = this;
    that.graphic.animate({
      x: that.centerX,
      y: that.centerY,
      outerRadius: that.radiusOuter,
      innerRadius: that.radiusInner,
      startAngle: that.toAngle,
      endAngle: that.fromAngle
    }, {
      delay: delay,
      partitionDuration: duration
    }, complete);
  },
  correctPosition: function (correction) {
    const that = this;
    that.correctRadius(correction);
    that.correctLabelRadius(correction.radiusOuter + RADIAL_LABEL_INDENT);
    that.centerX = correction.centerX;
    that.centerY = correction.centerY;
  },
  correctRadius: function (correction) {
    this.radiusInner = correction.radiusInner;
    this.radiusOuter = correction.radiusOuter;
  },
  correctLabelRadius: function (radiusLabels) {
    this.radiusLabels = radiusLabels;
  },
  correctValue: function (correction, percent, base) {
    const that = this;
    that.value = (base || that.normalInitialValue) + correction;
    that.minValue = correction;
    that.percent = percent;
    that._label.setDataField('percent', percent);
  },
  _updateLabelData: function () {
    this._label.setData(this._getLabelFormatObject());
  },
  _getShiftLabelCoords: function () {
    const that = this;
    const bBox = that._label.getBoundingRect();
    const coord = that._getLabelCoords(that._label);
    const visibleArea = that._getVisibleArea();
    if (that._isLabelDrawingWithoutPoints) {
      return that._checkLabelPosition(coord, bBox, visibleArea);
    } else {
      return that._getLabelExtraCoord(coord, that._checkVerticalLabelPosition(coord, bBox, visibleArea), bBox);
    }
  },
  _getLabelPosition: function (options) {
    return options.position;
  },
  getAnnotationCoords: function (location) {
    return this._getElementCoords(location !== 'edge' ? 'inside' : 'outside', this.radiusOuter, 0);
  },
  _getElementCoords: function (position, elementRadius, radialOffset) {
    let bBox = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    const that = this;
    const angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
    const radiusInner = that.radiusInner;
    const radiusOuter = that.radiusOuter;
    const columnsPosition = position === 'columns';
    let rad;
    let x;
    if (position === 'inside') {
      rad = radiusInner + (radiusOuter - radiusInner) / 2 + radialOffset;
      x = that.centerX + rad * angleFunctions.cos - bBox.width / 2;
    } else {
      rad = elementRadius + radialOffset;
      if (angleFunctions.cos > 0.1 || columnsPosition && angleFunctions.cos >= 0) {
        x = that.centerX + rad * angleFunctions.cos;
      } else if (angleFunctions.cos < -0.1 || columnsPosition && angleFunctions.cos < 0) {
        x = that.centerX + rad * angleFunctions.cos - bBox.width;
      } else {
        x = that.centerX + rad * angleFunctions.cos - bBox.width / 2;
      }
    }
    return {
      x: x,
      y: _round(that.centerY - rad * angleFunctions.sin - bBox.height / 2)
    };
  },
  _getLabelCoords: function (label) {
    const that = this;
    const bBox = label.getBoundingRect();
    const options = label.getLayoutOptions();
    const position = that._getLabelPosition(options);
    return that._getElementCoords(position, that.radiusLabels, options.radialOffset, bBox);
  },
  _correctLabelCoord: function (coord, moveLabelsFromCenter) {
    const that = this;
    const label = that._label;
    const bBox = label.getBoundingRect();
    const labelWidth = bBox.width;
    const options = label.getLayoutOptions();
    const visibleArea = that._getVisibleArea();
    const rightBorderX = visibleArea.maxX - labelWidth;
    const leftBorderX = visibleArea.minX;
    const angleOfPoint = (0, _utils.normalizeAngle)(that.middleAngle);
    const centerX = that.centerX;
    const connectorOffset = options.connectorOffset;
    let x = coord.x;
    if (options.position === 'columns') {
      if (angleOfPoint <= 90 || angleOfPoint >= 270) {
        x = rightBorderX;
      } else {
        x = leftBorderX;
      }
      coord.x = x;
    } else if (options.position !== 'inside' && moveLabelsFromCenter) {
      if (angleOfPoint <= 90 || angleOfPoint >= 270) {
        if (x - connectorOffset < centerX) {
          x = centerX + connectorOffset;
        }
      } else {
        if (x + labelWidth + connectorOffset > centerX) {
          x = centerX - labelWidth - connectorOffset;
        }
      }
      coord.x = x;
    }
    return coord;
  },
  drawLabel: function () {
    this.translate();

    // this function is called for drawing labels without points for checking size of labels
    this._isLabelDrawingWithoutPoints = true;
    this._drawLabel();
    this._isLabelDrawingWithoutPoints = false;
  },
  updateLabelCoord: function (moveLabelsFromCenter) {
    const that = this;
    const bBox = that._label.getBoundingRect();
    let coord = that._correctLabelCoord(bBox, moveLabelsFromCenter);
    coord = that._checkHorizontalLabelPosition(coord, bBox, that._getVisibleArea());
    that._label.shift(_round(coord.x), _round(bBox.y));
  },
  _checkVerticalLabelPosition: function (coord, box, visibleArea) {
    const x = coord.x;
    let y = coord.y;
    if (coord.y + box.height > visibleArea.maxY) {
      y = visibleArea.maxY - box.height;
    } else if (coord.y < visibleArea.minY) {
      y = visibleArea.minY;
    }
    return {
      x: x,
      y: y
    };
  },
  _getLabelExtraCoord: function (coord, shiftCoord, box) {
    return coord.y !== shiftCoord.y ? (0, _utils.getVerticallyShiftedAngularCoords)({
      x: coord.x,
      y: coord.y,
      width: box.width,
      height: box.height
    }, shiftCoord.y - coord.y, {
      x: this.centerX,
      y: this.centerY
    }) : coord;
  },
  _checkHorizontalLabelPosition: function (coord, box, visibleArea) {
    let x = coord.x;
    const y = coord.y;
    if (coord.x + box.width > visibleArea.maxX) {
      x = visibleArea.maxX - box.width;
    } else if (coord.x < visibleArea.minX) {
      x = visibleArea.minX;
    }
    return {
      x: x,
      y: y
    };
  },
  applyWordWrap: function (moveLabelsFromCenter) {
    const that = this;
    const label = that._label;
    const box = label.getBoundingRect();
    const visibleArea = that._getVisibleArea();
    const position = label.getLayoutOptions().position;
    let width = box.width;
    let rowCountChanged = false;
    if (position === 'columns' && that.series.index > 0) {
      width = visibleArea.maxX - that.centerX - that.radiusLabels;
    } else if (position === 'inside') {
      if (width > visibleArea.maxX - visibleArea.minX) {
        width = visibleArea.maxX - visibleArea.minX;
      }
    } else {
      if (moveLabelsFromCenter && box.x < that.centerX && box.width + box.x > that.centerX) {
        width = Math.floor((visibleArea.maxX - visibleArea.minX) / 2);
      } else if (box.x + width > visibleArea.maxX) {
        width = visibleArea.maxX - box.x;
      } else if (box.x < visibleArea.minX) {
        width = box.x + width - visibleArea.minX;
      }
    }
    if (width < box.width) {
      rowCountChanged = label.fit(width);
    }
    return rowCountChanged;
  },
  setLabelTrackerData: function () {
    this._label.setTrackerData(this);
  },
  _checkLabelPosition: function (coord, bBox, visibleArea) {
    coord = this._checkHorizontalLabelPosition(coord, bBox, visibleArea);
    return this._checkVerticalLabelPosition(coord, bBox, visibleArea);
  },
  _getLabelConnector: function () {
    const that = this;
    const rad = that.radiusOuter;
    const seriesStyle = that._options.styles.normal;
    const strokeWidthBy2 = seriesStyle['stroke-width'] / 2;
    const borderWidth = that.series.getOptions().containerBackgroundColor === seriesStyle.stroke ? _round(strokeWidthBy2) : _round(-strokeWidthBy2);
    const angleFunctions = (0, _utils.getCosAndSin)(_round(that.middleAngle));
    return {
      x: _round(that.centerX + (rad - borderWidth) * angleFunctions.cos),
      y: _round(that.centerY - (rad - borderWidth) * angleFunctions.sin),
      angle: that.middleAngle
    };
  },
  _drawMarker: function (renderer, group, animationEnabled, firstDrawing) {
    const that = this;
    let radiusOuter = that.radiusOuter;
    let radiusInner = that.radiusInner;
    let fromAngle = that.fromAngle;
    let toAngle = that.toAngle;
    if (animationEnabled) {
      radiusInner = radiusOuter = 0;
      if (!firstDrawing) {
        fromAngle = toAngle = that.shiftedAngle;
      }
    }
    that.graphic = renderer.arc(that.centerX, that.centerY, radiusInner, radiusOuter, toAngle, fromAngle).attr({
      'stroke-linejoin': 'round'
    }).smartAttr(that._getStyle()).data({
      'chart-data-point': that
    }).sharp().append(group);
  },
  getTooltipParams: function () {
    const that = this;
    const angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
    const radiusInner = that.radiusInner;
    const radiusOuter = that.radiusOuter;
    return {
      x: that.centerX + (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.cos,
      y: that.centerY - (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.sin,
      offset: 0
    };
  },
  _translate: function () {
    const that = this;
    const angle = that.shiftedAngle || 0;
    const value = that.value;
    const minValue = that.minValue;
    const translator = that._getValTranslator();
    that.fromAngle = translator.translate(minValue) + angle;
    that.toAngle = translator.translate(value) + angle;
    that.middleAngle = translator.translate((value - minValue) / 2 + minValue) + angle;
    if (!that.isVisible()) {
      that.middleAngle = that.toAngle = that.fromAngle = that.fromAngle || angle;
    }
  },
  getMarkerVisibility: function () {
    return true;
  },
  _updateMarker: function (animationEnabled, style, _, callback) {
    const that = this;
    if (!animationEnabled) {
      style = _extend({
        x: that.centerX,
        y: that.centerY,
        outerRadius: that.radiusOuter,
        innerRadius: that.radiusInner,
        startAngle: that.toAngle,
        endAngle: that.fromAngle
      }, style);
    }
    that.graphic.smartAttr(style).sharp();
    callback && callback();
  },
  getLegendStyles: function () {
    return this._styles.legendStyles;
  },
  isInVisibleArea: function () {
    return true;
  },
  hide: function () {
    const that = this;
    if (that._visible) {
      that._visible = false;
      that.hideTooltip();
      that._options.visibilityChanged();
    }
  },
  show: function () {
    const that = this;
    if (!that._visible) {
      that._visible = true;
      that._options.visibilityChanged();
    }
  },
  setInvisibility: function () {
    this._label.draw(false);
  },
  isVisible: function () {
    return this._visible;
  },
  _getFormatObject: function (tooltip) {
    const formatObject = _symbol_point.default._getFormatObject.call(this, tooltip);
    const percent = this.percent;
    formatObject.percent = percent;
    formatObject.percentText = tooltip.formatValue(percent, 'percent');
    return formatObject;
  },
  getColor: function () {
    return this._styles.normal.fill;
  },
  coordsIn: function (x, y) {
    const that = this;
    const lx = x - that.centerX;
    const ly = y - that.centerY;
    const r = _sqrt(lx * lx + ly * ly);
    const fromAngle = that.fromAngle % 360;
    const toAngle = that.toAngle % 360;
    let angle;
    if (r < that.radiusInner || r > that.radiusOuter || r === 0) {
      return false;
    }
    angle = _acos(lx / r) * DEG * (ly > 0 ? -1 : 1);
    if (angle < 0) {
      angle += 360;
    }
    if (fromAngle === toAngle && _abs(that.toAngle - that.fromAngle) > 1E-4) {
      return true;
    } else {
      return fromAngle >= toAngle ? angle <= fromAngle && angle >= toAngle : !(angle >= fromAngle && angle <= toAngle);
    }
  }
});
module.exports = exports.default;
module.exports.default = exports.default;
