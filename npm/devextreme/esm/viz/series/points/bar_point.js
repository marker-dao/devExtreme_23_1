/**
* DevExtreme (esm/viz/series/points/bar_point.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
const _extend = extend;
const _math = Math;
const _floor = _math.floor;
const _abs = _math.abs;
import symbolPoint from './symbol_point';
const CANVAS_POSITION_DEFAULT = 'canvas_position_default';
const DEFAULT_BAR_TRACKER_SIZE = 9;
const CORRECTING_BAR_TRACKER_VALUE = 4;
const RIGHT = 'right';
const LEFT = 'left';
const TOP = 'top';
const BOTTOM = 'bottom';
function getLabelOrientation(point) {
  const initialValue = point.initialValue;
  const invert = point._getValTranslator().getBusinessRange().invert;
  const isDiscreteValue = point.series.valueAxisType === 'discrete';
  const isFullStacked = point.series.isFullStackedSeries();
  const notAxisInverted = !isDiscreteValue && (initialValue >= 0 && !invert || initialValue < 0 && invert) || isDiscreteValue && !invert || isFullStacked;
  return notAxisInverted ? TOP : BOTTOM;
}
export default _extend({}, symbolPoint, {
  correctCoordinates(correctOptions) {
    const that = this;
    const correction = _floor(correctOptions.offset - correctOptions.width / 2);
    if (that._options.rotated) {
      that.height = correctOptions.width;
      that.yCorrection = correction;
      that.xCorrection = null;
    } else {
      that.width = correctOptions.width;
      that.xCorrection = correction;
      that.yCorrection = null;
    }
  },
  _calculateVisibility: function (x, y, width, height) {
    const {
      minX,
      maxX,
      minY,
      maxY
    } = this._getVisibleArea();
    this.inVisibleArea = minX <= x + width && maxX >= x && minY <= y + height && maxY >= y;
  },
  _cacheVisibility: function (x, y, minY, rotated) {
    const size = Math.abs(y - minY);
    y = Math.min(y, minY);
    if (rotated) {
      this._calculateVisibility(y, x, size, this.height);
    } else {
      this._calculateVisibility(x, y, this.width, size);
    }
  },
  _getGraphicBBox: function (location) {
    const bBox = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
    if (location) {
      const isTop = location === 'top';
      if (!this._options.rotated) {
        bBox.y = isTop ? bBox.y : bBox.y + bBox.height;
        bBox.height = 0;
      } else {
        bBox.x = isTop ? bBox.x + bBox.width : bBox.x;
        bBox.width = 0;
      }
    }
    return bBox;
  },
  _getLabelConnector: function (location) {
    return this._getGraphicBBox(location);
  },
  _getLabelPosition: function () {
    let position = getLabelOrientation(this);
    if (this._options.rotated) {
      position = position === TOP ? RIGHT : LEFT;
    }
    return position;
  },
  _getLabelCoords: function (label) {
    const that = this;
    let coords;
    if (that.initialValue === 0 && that.series.isFullStackedSeries()) {
      if (!this._options.rotated) {
        coords = that._getLabelCoordOfPosition(label, TOP);
      } else {
        coords = that._getLabelCoordOfPosition(label, RIGHT);
      }
    } else if (label.getLayoutOptions().position === 'inside') {
      coords = that._getLabelCoordOfPosition(label, 'inside');
    } else {
      coords = symbolPoint._getLabelCoords.call(this, label);
    }
    return coords;
  },
  _drawLabel: function () {
    this._label.pointPosition = this._label.getLayoutOptions().position !== 'inside' && getLabelOrientation(this);
    symbolPoint._drawLabel.call(this);
  },
  hideInsideLabel: function (label, coord) {
    const graphicBBox = this._getGraphicBBox();
    const labelBBox = label.getBoundingRect();
    if (this._options.resolveLabelsOverlapping) {
      if ((coord.y <= graphicBBox.y && coord.y + labelBBox.height >= graphicBBox.y + graphicBBox.height || coord.x <= graphicBBox.x && coord.x + labelBBox.width >= graphicBBox.x + graphicBBox.width) && !(coord.y > graphicBBox.y + graphicBBox.height || coord.y + labelBBox.height < graphicBBox.y || coord.x > graphicBBox.x + graphicBBox.width || coord.x + labelBBox.width < graphicBBox.x)) {
        label.draw(false);
        return true;
      }
    }
    return false;
  },
  _showForZeroValues: function () {
    return this._options.label.showForZeroValues || this.initialValue;
  },
  _drawMarker(renderer, group, animationEnabled) {
    const that = this;
    const style = that._getStyle();
    const r = that._options.cornerRadius;
    const rotated = that._options.rotated;
    let {
      x,
      y,
      width,
      height
    } = that.getMarkerCoords();
    if (animationEnabled) {
      if (rotated) {
        width = 0;
        x = that.defaultX;
      } else {
        height = 0;
        y = that.defaultY;
      }
    }
    that.graphic = renderer.rect(x, y, width, height).attr({
      rx: r,
      ry: r
    }).smartAttr(style).data({
      'chart-data-point': that
    }).append(group);
  },
  _getSettingsForTracker: function () {
    const that = this;
    let y = that.y;
    let height = that.height;
    let x = that.x;
    let width = that.width;
    if (that._options.rotated) {
      if (width === 1) {
        width = DEFAULT_BAR_TRACKER_SIZE;
        x -= CORRECTING_BAR_TRACKER_VALUE;
      }
    } else {
      if (height === 1) {
        height = DEFAULT_BAR_TRACKER_SIZE;
        y -= CORRECTING_BAR_TRACKER_VALUE;
      }
    }
    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  },
  getGraphicSettings: function () {
    const graphic = this.graphic;
    return {
      x: graphic.attr('x'),
      y: graphic.attr('y'),
      height: graphic.attr('height'),
      width: graphic.attr('width')
    };
  },
  _getEdgeTooltipParams() {
    const isPositive = this.value >= 0;
    let xCoord;
    let yCoord;
    const invertedBusinessRange = this._getValTranslator().getBusinessRange().invert;
    const {
      x,
      y,
      width,
      height
    } = this;
    if (this._options.rotated) {
      yCoord = y + height / 2;
      if (invertedBusinessRange) {
        xCoord = isPositive ? x : x + width;
      } else {
        xCoord = isPositive ? x + width : x;
      }
    } else {
      xCoord = x + width / 2;
      if (invertedBusinessRange) {
        yCoord = isPositive ? y + height : y;
      } else {
        yCoord = isPositive ? y : y + height;
      }
    }
    return {
      x: xCoord,
      y: yCoord,
      offset: 0
    };
  },
  getTooltipParams: function (location) {
    if (location === 'edge') {
      return this._getEdgeTooltipParams();
    }
    const center = this.getCenterCoord();
    center.offset = 0;
    return center;
  },
  getCenterCoord() {
    const {
      width,
      height,
      x,
      y
    } = this;
    return {
      x: x + width / 2,
      y: y + height / 2
    };
  },
  _truncateCoord: function (coord, bounds) {
    if (coord === null) {
      return coord;
    }
    if (coord < bounds[0]) {
      return bounds[0];
    }
    if (coord > bounds[1]) {
      return bounds[1];
    }
    return coord;
  },
  _getErrorBarBaseEdgeLength() {
    return this._options.rotated ? this.height : this.width;
  },
  _translateErrorBars: function (argVisibleArea) {
    symbolPoint._translateErrorBars.call(this);
    if (this._errorBarPos < argVisibleArea[0] || this._errorBarPos > argVisibleArea[1]) {
      this._errorBarPos = undefined;
    }
  },
  // TODO check & rework
  _translate: function () {
    const that = this;
    const rotated = that._options.rotated;
    const valAxis = rotated ? 'x' : 'y';
    const argAxis = rotated ? 'y' : 'x';
    const valIntervalName = rotated ? 'width' : 'height';
    const argIntervalName = rotated ? 'height' : 'width';
    const argTranslator = that._getArgTranslator();
    const valTranslator = that._getValTranslator();
    const argVisibleArea = that.series.getArgumentAxis().getVisibleArea();
    const valVisibleArea = that.series.getValueAxis().getVisibleArea();
    let arg = argTranslator.translate(that.argument);
    let val = valTranslator.translate(that.value, 1);
    let minVal = valTranslator.translate(that.minValue, -1);
    that[argAxis] = arg = arg === null ? arg : arg + (that[argAxis + 'Correction'] || 0);
    that['v' + valAxis] = val;
    that['v' + argAxis] = arg + that[argIntervalName] / 2;
    this._cacheVisibility(arg, val, minVal, rotated);
    val = that._truncateCoord(val, valVisibleArea);
    minVal = that._truncateCoord(minVal, valVisibleArea);
    that[valIntervalName] = _abs(val - minVal);
    val = val < minVal ? val : minVal;
    that[valAxis] = val === null ? val : val + (that[valAxis + 'Correction'] || 0);
    that['min' + valAxis.toUpperCase()] = minVal === null ? minVal : minVal + (that[valAxis + 'Correction'] || 0);
    that['default' + valAxis.toUpperCase()] = valTranslator.translate(CANVAS_POSITION_DEFAULT);
    that._translateErrorBars(argVisibleArea);
    if (that.inVisibleArea && that[argAxis] !== null) {
      if (that[argAxis] < argVisibleArea[0]) {
        that[argIntervalName] = that[argIntervalName] - (argVisibleArea[0] - that[argAxis]);
        that[argAxis] = argVisibleArea[0];
      }
      if (that[argAxis] + that[argIntervalName] > argVisibleArea[1]) {
        that[argIntervalName] = argVisibleArea[1] - that[argAxis];
      }
    }
  },
  _updateMarker: function (animationEnabled, style) {
    this.graphic.smartAttr(_extend({}, style, !animationEnabled ? this.getMarkerCoords() : {}));
  },
  getMarkerCoords: function () {
    const that = this;
    let x = that.x;
    const y = that.y;
    let width = that.width;
    let height = that.height;
    const argAxis = that.series.getArgumentAxis();
    const rotated = that._options.rotated;
    if (argAxis.getAxisPosition) {
      const axisOptions = argAxis.getOptions();
      const edgeOffset = Math.round(axisOptions.width / 2);
      const argAxisPosition = argAxis.getAxisPosition();
      if (axisOptions.visible) {
        if (!rotated) {
          height -= that.minY === that.defaultY && that.minY === argAxisPosition - argAxis.getAxisShift() ? edgeOffset : 0;
          height < 0 && (height = 0);
        } else {
          const isStartFromAxis = that.minX === that.defaultX && that.minX === argAxisPosition - argAxis.getAxisShift();
          x += isStartFromAxis ? edgeOffset : 0;
          width -= isStartFromAxis ? edgeOffset : 0;
          width < 0 && (width = 0);
        }
      }
    }
    return {
      x,
      y,
      width,
      height
    };
  },
  coordsIn: function (x, y) {
    const that = this;
    return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height;
  }
});
