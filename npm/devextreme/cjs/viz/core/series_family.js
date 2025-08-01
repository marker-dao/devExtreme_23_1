/**
* DevExtreme (cjs/viz/core/series_family.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.SeriesFamily = SeriesFamily;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _math = require("../../core/utils/math");
var _common = require("../../core/utils/common");
var _utils = require("./utils");
var _date = _interopRequireDefault(require("../../core/utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  round,
  abs,
  pow,
  sqrt
} = Math;
const _min = Math.min;
const DEFAULT_BAR_GROUP_PADDING = 0.3;
function validateBarPadding(barPadding) {
  return barPadding < 0 || barPadding > 1 ? undefined : barPadding;
}
function validateBarGroupPadding(barGroupPadding) {
  return barGroupPadding < 0 || barGroupPadding > 1 ? DEFAULT_BAR_GROUP_PADDING : barGroupPadding;
}
function isStackExist(series, arg) {
  return series.some(function (s) {
    return !s.getOptions().ignoreEmptyPoints || s.getPointsByArg(arg, true).some(function (point) {
      return point.hasValue();
    });
  });
}
function correctStackCoordinates(series, currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback) {
  series.forEach(function (series) {
    const stackIndex = seriesStackIndexCallback(currentStacks.indexOf(stack), currentStacks.length);
    const points = series.getPointsByArg(arg, true);
    const barPadding = validateBarPadding(series.getOptions().barPadding);
    const barWidth = series.getOptions().barWidth;
    let offset = getOffset(stackIndex, parameters);
    let width = parameters.width;
    let extraParameters;
    if (stackIndex === -1) {
      return;
    }
    if ((0, _type.isDefined)(barPadding) || (0, _type.isDefined)(barWidth)) {
      extraParameters = calculateParams(barsArea, currentStacks.length, 1 - barPadding, barWidth);
      width = extraParameters.width;
      if (!series.getBarOverlapGroup()) {
        offset = getOffset(stackIndex, extraParameters);
      }
    }
    correctPointCoordinates(points, width, offset);
  });
}
function getStackName(series) {
  return series.getStackName() || series.getBarOverlapGroup();
}
function adjustBarSeriesDimensionsCore(series, options, seriesStackIndexCallback) {
  var _series$, _series$2;
  const commonStacks = [];
  const allArguments = [];
  const seriesInStacks = {};
  const barGroupWidth = options.barGroupWidth;
  const argumentAxis = (_series$ = series[0]) === null || _series$ === void 0 ? void 0 : _series$.getArgumentAxis();
  let interval;
  if ((_series$2 = series[0]) !== null && _series$2 !== void 0 && _series$2.useAggregation()) {
    var _series$3;
    const isDateArgAxis = ((_series$3 = series[0]) === null || _series$3 === void 0 ? void 0 : _series$3.argumentType) === 'datetime';
    let tickInterval = argumentAxis.getTickInterval();
    let aggregationInterval = argumentAxis.getAggregationInterval();
    tickInterval = isDateArgAxis ? _date.default.dateToMilliseconds(tickInterval) : tickInterval;
    aggregationInterval = isDateArgAxis ? _date.default.dateToMilliseconds(aggregationInterval) : aggregationInterval;
    interval = aggregationInterval < tickInterval ? aggregationInterval : tickInterval;
  }
  interval = argumentAxis === null || argumentAxis === void 0 ? void 0 : argumentAxis.getTranslator().getInterval(interval);
  const barsArea = barGroupWidth ? interval > barGroupWidth ? barGroupWidth : interval : interval * (1 - validateBarGroupPadding(options.barGroupPadding));
  series.forEach(function (s, i) {
    const stackName = getStackName(s) || i.toString();
    let argument;
    for (argument in s.pointsByArgument) {
      if (allArguments.indexOf(argument.valueOf()) === -1) {
        allArguments.push(argument.valueOf());
      }
    }
    if (commonStacks.indexOf(stackName) === -1) {
      commonStacks.push(stackName);
      seriesInStacks[stackName] = [];
    }
    seriesInStacks[stackName].push(s);
  });
  allArguments.forEach(function (arg) {
    const currentStacks = commonStacks.reduce((stacks, stack) => {
      if (isStackExist(seriesInStacks[stack], arg)) {
        stacks.push(stack);
      }
      return stacks;
    }, []);
    const parameters = calculateParams(barsArea, currentStacks.length);
    commonStacks.forEach(stack => {
      correctStackCoordinates(seriesInStacks[stack], currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback);
    });
  });
}
function calculateParams(barsArea, count, percentWidth, fixedBarWidth) {
  let spacing;
  let width;
  if (fixedBarWidth) {
    width = _min(fixedBarWidth, barsArea / count);
    spacing = count > 1 ? round((barsArea - round(width) * count) / (count - 1)) : 0;
  } else if ((0, _type.isDefined)(percentWidth)) {
    width = barsArea * percentWidth / count;
    spacing = count > 1 ? round((barsArea - barsArea * percentWidth) / (count - 1)) : 0;
  } else {
    spacing = round(barsArea / count * 0.2);
    width = (barsArea - spacing * (count - 1)) / count;
  }
  return {
    width: width > 1 ? round(width) : 1,
    spacing: spacing,
    middleIndex: count / 2,
    rawWidth: width
  };
}
function getOffset(stackIndex, parameters) {
  const width = parameters.rawWidth < 1 ? parameters.rawWidth : parameters.width;
  return (stackIndex - parameters.middleIndex + 0.5) * width - (parameters.middleIndex - stackIndex - 0.5) * parameters.spacing;
}
function correctPointCoordinates(points, width, offset) {
  (0, _iterator.each)(points, function (_, point) {
    point.correctCoordinates({
      width: width,
      offset: offset
    });
  });
}
function getValueType(value) {
  return value >= 0 ? 'positive' : 'negative';
}
function getVisibleSeries(that) {
  return that.series.filter(function (s) {
    return s.isVisible();
  });
}
function getAbsStackSumByArg(stackKeepers, stackName, argument) {
  const positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
  const negativeStackValue = -(stackKeepers.negative[stackName] || {})[argument] || 0;
  return positiveStackValue + negativeStackValue;
}
function getStackSumByArg(stackKeepers, stackName, argument) {
  const positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
  const negativeStackValue = (stackKeepers.negative[stackName] || {})[argument] || 0;
  return positiveStackValue + negativeStackValue;
}
function getSeriesStackIndexCallback(inverted) {
  if (!inverted) {
    return function (index) {
      return index;
    };
  } else {
    return function (index, stackCount) {
      return stackCount - index - 1;
    };
  }
}
function isInverted(series) {
  return series[0] && series[0].getArgumentAxis().getTranslator().isInverted();
}
function adjustBarSeriesDimensions() {
  const series = getVisibleSeries(this);
  adjustBarSeriesDimensionsCore(series, this._options, getSeriesStackIndexCallback(isInverted(series)));
}
function getFirstValueSign(series) {
  const points = series.getPoints();
  let value;
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    value = point.initialValue && point.initialValue.valueOf();
    if (abs(value) > 0) {
      break;
    }
  }
  return (0, _math.sign)(value);
}
function adjustStackedSeriesValues() {
  const that = this;
  const negativesAsZeroes = that._options.negativesAsZeroes;
  const series = getVisibleSeries(that);
  const stackKeepers = {
    positive: {},
    negative: {}
  };
  const holesStack = {
    left: {},
    right: {}
  };
  const lastSeriesInPositiveStack = {};
  const lastSeriesInNegativeStack = {};
  series.forEach(function (singleSeries) {
    const stackName = getStackName(singleSeries);
    let hole = false;
    const stack = getFirstValueSign(singleSeries) < 0 ? lastSeriesInNegativeStack : lastSeriesInPositiveStack;
    singleSeries._prevSeries = stack[stackName];
    stack[stackName] = singleSeries;
    singleSeries.holes = (0, _extend.extend)(true, {}, holesStack);
    singleSeries.getPoints().forEach(function (point, index, points) {
      let value = point.initialValue && point.initialValue.valueOf();
      let argument = point.argument.valueOf();
      let stacks = value >= 0 ? stackKeepers.positive : stackKeepers.negative;
      const isNotBarSeries = singleSeries.type !== 'bar';
      if (negativesAsZeroes && value < 0) {
        stacks = stackKeepers.positive;
        value = 0;
        point.resetValue();
      }
      stacks[stackName] = stacks[stackName] || {};
      const currentStack = stacks[stackName];
      if (currentStack[argument]) {
        if (isNotBarSeries) point.correctValue(currentStack[argument]);
        currentStack[argument] += value;
      } else {
        currentStack[argument] = value;
        if (isNotBarSeries) point.resetCorrection();
      }
      if (!point.hasValue()) {
        const prevPoint = points[index - 1];
        if (!hole && prevPoint && prevPoint.hasValue()) {
          argument = prevPoint.argument.valueOf();
          prevPoint._skipSetRightHole = true;
          holesStack.right[argument] = (holesStack.right[argument] || 0) + (prevPoint.value.valueOf() - (isFinite(prevPoint.minValue) ? prevPoint.minValue.valueOf() : 0));
        }
        hole = true;
      } else if (hole) {
        hole = false;
        holesStack.left[argument] = (holesStack.left[argument] || 0) + (point.value.valueOf() - (isFinite(point.minValue) ? point.minValue.valueOf() : 0));
        point._skipSetLeftHole = true;
      }
    });
  });
  series.forEach(function (singleSeries) {
    const holes = singleSeries.holes;
    singleSeries.getPoints().forEach(function (point) {
      const argument = point.argument.valueOf();
      point.resetHoles();
      !point._skipSetLeftHole && point.setHole(holes.left[argument] || holesStack.left[argument] && 0, 'left');
      !point._skipSetRightHole && point.setHole(holes.right[argument] || holesStack.right[argument] && 0, 'right');
      point._skipSetLeftHole = null;
      point._skipSetRightHole = null;
    });
  });
  that._stackKeepers = stackKeepers;
  series.forEach(function (singleSeries) {
    singleSeries.getPoints().forEach(function (point) {
      const argument = point.argument.valueOf();
      const stackName = getStackName(singleSeries);
      const absTotal = getAbsStackSumByArg(stackKeepers, stackName, argument);
      const total = getStackSumByArg(stackKeepers, stackName, argument);
      point.setPercentValue(absTotal, total, holesStack.left[argument], holesStack.right[argument]);
    });
  });
}
function updateStackedSeriesValues() {
  const that = this;
  const series = getVisibleSeries(that);
  const stack = that._stackKeepers;
  const stackKeepers = {
    positive: {},
    negative: {}
  };
  (0, _iterator.each)(series, function (_, singleSeries) {
    const minBarSize = singleSeries.getOptions().minBarSize;
    const valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
    const minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
    const stackName = singleSeries.getStackName();
    (0, _iterator.each)(singleSeries.getPoints(), function (index, point) {
      if (!point.hasValue()) {
        return;
      }
      let value = point.initialValue && point.initialValue.valueOf();
      const argument = point.argument.valueOf();
      if (that.fullStacked) {
        value = value / getAbsStackSumByArg(stack, stackName, argument) || 0;
      }
      const updateValue = valueAxisTranslator.checkMinBarSize(value, minShownBusinessValue, point.value);
      const valueType = getValueType(updateValue);
      const currentStack = stackKeepers[valueType][stackName] = stackKeepers[valueType][stackName] || {};
      if (currentStack[argument]) {
        point.minValue = currentStack[argument];
        currentStack[argument] += updateValue;
      } else {
        currentStack[argument] = updateValue;
      }
      point.value = currentStack[argument];
    });
  });
  if (that.fullStacked) {
    updateFullStackedSeriesValues(series, stackKeepers);
  }
}
function updateFullStackedSeriesValues(series, stackKeepers) {
  (0, _iterator.each)(series, function (_, singleSeries) {
    const stackName = singleSeries.getStackName ? singleSeries.getStackName() : 'default';
    (0, _iterator.each)(singleSeries.getPoints(), function (index, point) {
      const stackSum = getAbsStackSumByArg(stackKeepers, stackName, point.argument.valueOf());
      if (stackSum !== 0) {
        point.value = point.value / stackSum;
        if ((0, _type.isNumeric)(point.minValue)) {
          point.minValue = point.minValue / stackSum;
        }
      }
    });
  });
}
function updateRangeSeriesValues() {
  const that = this;
  const series = getVisibleSeries(that);
  (0, _iterator.each)(series, function (_, singleSeries) {
    const minBarSize = singleSeries.getOptions().minBarSize;
    const valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
    const minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
    if (minShownBusinessValue) {
      (0, _iterator.each)(singleSeries.getPoints(), function (_, point) {
        if (!point.hasValue()) {
          return;
        }
        if (point.value.valueOf() - point.minValue.valueOf() < minShownBusinessValue) {
          point.value = valueAxisTranslator.toValue(point.value.valueOf() + minShownBusinessValue / 2);
          point.minValue = valueAxisTranslator.toValue(point.minValue.valueOf() - minShownBusinessValue / 2);
        }
      });
    }
  });
}
function updateBarSeriesValues() {
  (0, _iterator.each)(this.series, function (_, singleSeries) {
    const minBarSize = singleSeries.getOptions().minBarSize;
    const valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
    const minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
    if (minShownBusinessValue) {
      (0, _iterator.each)(singleSeries.getPoints(), function (index, point) {
        if (point.hasValue()) {
          point.value = valueAxisTranslator.checkMinBarSize(point.initialValue, minShownBusinessValue);
        }
      });
    }
  });
}
function adjustCandlestickSeriesDimensions() {
  const series = getVisibleSeries(this);
  adjustBarSeriesDimensionsCore(series, {
    barGroupPadding: 0.3
  }, getSeriesStackIndexCallback(isInverted(series)));
}
function adjustBubbleSeriesDimensions() {
  const series = getVisibleSeries(this);
  if (!series.length) {
    return;
  }
  const options = this._options;
  const visibleAreaX = series[0].getArgumentAxis().getVisibleArea();
  const visibleAreaY = series[0].getValueAxis().getVisibleArea();
  const min = _min(visibleAreaX[1] - visibleAreaX[0], visibleAreaY[1] - visibleAreaY[0]);
  const minBubbleArea = pow(options.minBubbleSize, 2);
  const maxBubbleArea = pow(min * options.maxBubbleSize, 2);
  const equalBubbleSize = (min * options.maxBubbleSize + options.minBubbleSize) / 2;
  let minPointSize = Infinity;
  let maxPointSize = -Infinity;
  let pointSize;
  let bubbleArea;
  let sizeProportion;
  (0, _iterator.each)(series, function (_, seriesItem) {
    (0, _iterator.each)(seriesItem.getPoints(), function (_, point) {
      maxPointSize = maxPointSize > point.size ? maxPointSize : point.size;
      minPointSize = minPointSize < point.size ? minPointSize : point.size;
    });
  });
  const sizeDispersion = maxPointSize - minPointSize;
  const areaDispersion = abs(maxBubbleArea - minBubbleArea);
  (0, _iterator.each)(series, function (_, seriesItem) {
    (0, _iterator.each)(seriesItem.getPoints(), function (_, point) {
      if (maxPointSize === minPointSize) {
        pointSize = round(equalBubbleSize);
      } else {
        sizeProportion = abs(point.size - minPointSize) / sizeDispersion;
        bubbleArea = areaDispersion * sizeProportion + minBubbleArea;
        pointSize = round(sqrt(bubbleArea));
      }
      point.correctCoordinates(pointSize);
    });
  });
}
function SeriesFamily(options) {
  const that = this;
  that.type = (0, _utils.normalizeEnum)(options.type);
  that.pane = options.pane;
  that.series = [];
  that.updateOptions(options);
  switch (that.type) {
    case 'bar':
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.updateSeriesValues = updateBarSeriesValues;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      break;
    case 'rangebar':
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.updateSeriesValues = updateRangeSeriesValues;
      break;
    case 'fullstackedbar':
      that.fullStacked = true;
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      that.updateSeriesValues = updateStackedSeriesValues;
      break;
    case 'stackedbar':
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      that.updateSeriesValues = updateStackedSeriesValues;
      break;
    case 'fullstackedarea':
    case 'fullstackedline':
    case 'fullstackedspline':
    case 'fullstackedsplinearea':
      that.fullStacked = true;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      break;
    case 'stackedarea':
    case 'stackedsplinearea':
    case 'stackedline':
    case 'stackedspline':
      that.adjustSeriesValues = adjustStackedSeriesValues;
      break;
    case 'candlestick':
    case 'stock':
      that.adjustSeriesDimensions = adjustCandlestickSeriesDimensions;
      break;
    case 'bubble':
      that.adjustSeriesDimensions = adjustBubbleSeriesDimensions;
      break;
  }
}
SeriesFamily.prototype = {
  constructor: SeriesFamily,
  adjustSeriesDimensions: _common.noop,
  adjustSeriesValues: _common.noop,
  updateSeriesValues: _common.noop,
  updateOptions: function (options) {
    this._options = options;
  },
  dispose: function () {
    this.series = null;
  },
  add: function (series) {
    const type = this.type;
    this.series = (0, _utils.map)(series, singleSeries => singleSeries.type === type ? singleSeries : null);
  }
};
