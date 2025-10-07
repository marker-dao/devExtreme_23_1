/**
* DevExtreme (cjs/__internal/viz/series/bubble_series.js)
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
exports.chart = void 0;
var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _area_series = require("./area_series");
var _bar_series = require("./bar_series");
var _line_series = require("./line_series");
var _scatter_series = require("./scatter_series");
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

// @ts-expect-error
const lineSeries = _line_series.chart.line;
// @ts-expect-error
const areaSeries = _area_series.chart.area;
// @ts-expect-error
const chartBarSeries = _bar_series.chart.bar;
// @ts-expect-error
const polarBarSeries = _bar_series.polar.bar;
const _extend = _extend2.extend;
const _each = _iterator.each;
const _noop = _common.noop;
const chart = exports.chart = {};
// @ts-expect-error
chart.bubble = _extend({}, _scatter_series.chart, {
  _calculateErrorBars: _noop,
  _getMainColor: chartBarSeries._getMainColor,
  _createPointStyles: chartBarSeries._createPointStyles,
  _updatePointsVisibility: chartBarSeries._updatePointsVisibility,
  _getOptionsForPoint: chartBarSeries._getOptionsForPoint,
  _applyMarkerClipRect: lineSeries._applyElementsClipRect,
  _parsePointStyle: polarBarSeries._parsePointStyle,
  _createLegendState: areaSeries._createLegendState,
  _getColorId: areaSeries._getColorId,
  _setMarkerGroupSettings: polarBarSeries._setMarkerGroupSettings,
  areErrorBarsVisible: _noop,
  _createErrorBarGroup: _noop,
  _checkData(data, skippedFields) {
    // @ts-expect-error
    return _scatter_series.chart._checkData.call(this, data, skippedFields, {
      value: this.getValueFields()[0],
      size: this.getSizeField()
    });
  },
  _getPointDataSelector(data, options) {
    const sizeField = this.getSizeField();
    // @ts-expect-error
    const baseGetter = _scatter_series.chart._getPointDataSelector.call(this);
    return data => {
      const pointData = baseGetter(data);
      pointData.size = data[sizeField];
      return pointData;
    };
  },
  _aggregators: {
    avg(_ref, series) {
      let {
        data,
        intervalStart,
        intervalEnd
      } = _ref;
      if (!data.length) {
        return;
      }
      const valueField = series.getValueFields()[0];
      const sizeField = series.getSizeField();
      const aggregate = data.reduce((result, item) => {
        result[0] += item[valueField];
        result[1] += item[sizeField];
        result[2]++;
        return result;
      }, [0, 0, 0]);
      return {
        [valueField]: aggregate[0] / aggregate[2],
        [sizeField]: aggregate[1] / aggregate[2],
        [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
      };
    }
  },
  getValueFields() {
    return [this._options.valueField || 'val'];
  },
  getSizeField() {
    return this._options.sizeField || 'size';
  },
  _animate() {
    const that = this;
    const lastPointIndex = that._drawnPoints.length - 1;
    const labelsGroup = that._labelsGroup;
    const labelAnimFunc = function () {
      labelsGroup && labelsGroup.animate({
        opacity: 1
      }, {
        duration: that._defaultDuration
      });
    };
    _each(that._drawnPoints || [], (i, p) => {
      p.animate(i === lastPointIndex ? labelAnimFunc : undefined, {
        r: p.bubbleSize,
        translateX: p.x,
        translateY: p.y
      });
    });
  },
  _patchMarginOptions(options) {
    options.processBubbleSize = true;
    return options;
  }
});
