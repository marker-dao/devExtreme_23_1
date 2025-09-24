"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chart = void 0;
var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _utils = require("../../viz/core/utils");
var _area_series = require("./area_series");
var _bar_series = require("./bar_series");
var _scatter_series = require("./scatter_series");
/* eslint-disable no-self-compare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-rest-params */
/* eslint-disable @stylistic/no-mixed-operators */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

const _extend = _extend2.extend;
// @ts-expect-error
const barSeries = _bar_series.chart.bar;
// @ts-expect-error
const areaSeries = _area_series.chart.area;
const chart = exports.chart = {};
const baseRangeSeries = {
  areErrorBarsVisible: _common.noop,
  _createErrorBarGroup: _common.noop,
  _checkData(data, skippedFields) {
    const valueFields = this.getValueFields();
    // @ts-expect-error
    return _scatter_series.chart._checkData.call(this, data, skippedFields, {
      minValue: valueFields[0],
      value: valueFields[1]
    }) && data.minValue === data.minValue;
  },
  // @ts-expect-error
  getValueRangeInitialValue: _scatter_series.chart.getValueRangeInitialValue,
  _getPointDataSelector(data) {
    const valueFields = this.getValueFields();
    const val1Field = valueFields[0];
    const val2Field = valueFields[1];
    const tagField = this.getTagField();
    const argumentField = this.getArgumentField();
    return data => ({
      tag: data[tagField],
      minValue: this._processEmptyValue(data[val1Field]),
      value: this._processEmptyValue(data[val2Field]),
      argument: data[argumentField],
      data
    });
  },
  _defaultAggregator: 'range',
  _aggregators: {
    range(_ref, series) {
      let {
        intervalStart,
        intervalEnd,
        data
      } = _ref;
      if (!data.length) {
        return;
      }
      const valueFields = series.getValueFields();
      const val1Field = valueFields[0];
      const val2Field = valueFields[1];
      const result = data.reduce((result, item) => {
        const val1 = item[val1Field];
        const val2 = item[val2Field];
        if (!(0, _type.isDefined)(val1) || !(0, _type.isDefined)(val2)) {
          return result;
        }
        result[val1Field] = Math.min(result[val1Field], Math.min(val1, val2));
        result[val2Field] = Math.max(result[val2Field], Math.max(val1, val2));
        return result;
      }, {
        [val1Field]: Infinity,
        [val2Field]: -Infinity,
        [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
      });
      if (!isFinite(result[val1Field]) || !isFinite(result[val2Field])) {
        if (data.filter(i => i[val1Field] === null && i[val2Field] === null).length === data.length) {
          result[val1Field] = result[val2Field] = null;
        } else {
          return;
        }
      }
      return result;
    }
  },
  getValueFields() {
    return [this._options.rangeValue1Field || 'val1', this._options.rangeValue2Field || 'val2'];
  },
  getSeriesPairCoord(coord, isArgument) {
    let oppositeCoord = null;
    const {
      rotated
    } = this._options;
    const isOpposite = !isArgument && !rotated || isArgument && rotated;
    const coordName = isOpposite ? 'vy' : 'vx';
    const minCoordName = rotated ? 'minX' : 'minY';
    const oppositeCoordName = isOpposite ? 'vx' : 'vy';
    const points = this.getPoints();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      let tmpCoord;
      if (isArgument) {
        tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : undefined;
      } else {
        const coords = [Math.min(p[coordName], p[minCoordName]), Math.max(p[coordName], p[minCoordName])];
        tmpCoord = coord >= coords[0] && coord <= coords[1] ? p[oppositeCoordName] : undefined;
      }
      if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
        oppositeCoord = tmpCoord;
        break;
      }
    }
    return oppositeCoord;
  }
};
// @ts-expect-error
chart.rangebar = _extend({}, barSeries, baseRangeSeries);
// @ts-expect-error
chart.rangearea = _extend({}, areaSeries, {
  _drawPoint(options) {
    const point = options.point;
    if (point.isInVisibleArea()) {
      point.clearVisibility();
      point.draw(this._renderer, options.groups);
      this._drawnPoints.push(point);
      if (!point.visibleTopMarker) {
        point.hideMarker('top');
      }
      if (!point.visibleBottomMarker) {
        point.hideMarker('bottom');
      }
    } else {
      point.setInvisibility();
    }
  },
  _prepareSegment(points, rotated) {
    const processedPoints = this._processSinglePointsAreaSegment(points, rotated);
    const processedMinPointsCoords = (0, _utils.map)(processedPoints, pt => pt.getCoords(true));
    return {
      line: processedPoints,
      bottomLine: processedMinPointsCoords,
      area: (0, _utils.map)(processedPoints, pt => pt.getCoords()).concat(processedMinPointsCoords.slice().reverse()),
      singlePointSegment: processedPoints !== points
    };
  },
  _getDefaultSegment(segment) {
    const defaultSegment = areaSeries._getDefaultSegment.call(this, segment);
    defaultSegment.bottomLine = defaultSegment.line;
    return defaultSegment;
  },
  _removeElement(element) {
    areaSeries._removeElement.call(this, element);
    element.bottomLine && element.bottomLine.remove();
  },
  _drawElement(segment, group) {
    const that = this;
    const drawnElement = areaSeries._drawElement.call(that, segment, group);
    drawnElement.bottomLine = that._bordersGroup && that._createBorderElement(segment.bottomLine, {
      'stroke-width': that._styles.normal.border['stroke-width']
    }).append(that._bordersGroup);
    return drawnElement;
  },
  _applyStyle(style) {
    const that = this;
    const elementsGroup = that._elementsGroup;
    const bordersGroup = that._bordersGroup;
    elementsGroup && elementsGroup.smartAttr(style.elements);
    bordersGroup && bordersGroup.attr(style.border);
    (that._graphics || []).forEach(graphic => {
      graphic.line && graphic.line.attr({
        'stroke-width': style.border['stroke-width']
      });
      graphic.bottomLine && graphic.bottomLine.attr({
        'stroke-width': style.border['stroke-width']
      });
    });
  },
  _updateElement(element, segment, animate, complete) {
    const bottomLineParams = {
      points: segment.bottomLine
    };
    const bottomBorderElement = element.bottomLine;
    areaSeries._updateElement.apply(this, arguments);
    if (bottomBorderElement) {
      animate ? bottomBorderElement.animate(bottomLineParams) : bottomBorderElement.attr(bottomLineParams);
    }
  }
}, baseRangeSeries);