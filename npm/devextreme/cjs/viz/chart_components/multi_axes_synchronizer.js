/**
* DevExtreme (cjs/viz/chart_components/multi_axes_synchronizer.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _console = require("../../core/utils/console");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _utils = require("../core/utils");
var _math2 = require("../../core/utils/math");
const _math = Math;
const _floor = _math.floor;
const _max = _math.max;
const _abs = _math.abs;
function getValueAxesPerPanes(valueAxes) {
  const result = {};
  valueAxes.forEach(axis => {
    const pane = axis.pane;
    if (!result[pane]) {
      result[pane] = [];
    }
    result[pane].push(axis);
  });
  return result;
}
const linearConverter = br => ({
  transform: function (v, b) {
    return (0, _math2.adjust)((0, _utils.getLogExt)(v, b, br.allowNegatives, br.linearThreshold));
  },
  getTicks: function (interval, tickValues, base) {
    const ticks = [];
    let tick = this.transform(tickValues[0], base);
    while (ticks.length < tickValues.length) {
      ticks.push(tick);
      tick = (0, _math2.adjust)(tick + interval);
    }
    return ticks;
  }
});
const logConverter = br => ({
  transform: function (v, b) {
    return (0, _math2.adjust)((0, _utils.raiseToExt)(v, b, br.allowNegatives, br.linearThreshold));
  },
  getTicks: function (interval, tickValues, base) {
    const ticks = [];
    let tick;
    for (let i = 0; i < tickValues.length; i += 1) {
      tick = this.transform(tickValues[i], base);
      ticks.push(tick);
    }
    return ticks;
  }
});
function convertAxisInfo(axisInfo, converter) {
  if (!axisInfo.isLogarithmic) {
    return;
  }
  const base = axisInfo.logarithmicBase;
  const tickValues = axisInfo.tickValues;
  axisInfo.minValue = converter.transform(axisInfo.minValue, base);
  axisInfo.oldMinValue = converter.transform(axisInfo.oldMinValue, base);
  axisInfo.maxValue = converter.transform(axisInfo.maxValue, base);
  axisInfo.oldMaxValue = converter.transform(axisInfo.oldMaxValue, base);
  axisInfo.tickInterval = _math.round(axisInfo.tickInterval);
  if (axisInfo.tickInterval < 1) {
    axisInfo.tickInterval = 1;
  }
  const ticks = converter.getTicks(axisInfo.tickInterval, tickValues, base);
  ticks.tickInterval = axisInfo.tickInterval;
  axisInfo.tickValues = ticks;
}
function populateAxesInfo(axes) {
  return axes.reduce(function (result, axis) {
    const ticksValues = axis.getTicksValues();
    const majorTicks = ticksValues.majorTicksValues;
    const options = axis.getOptions();
    const businessRange = axis.getTranslator().getBusinessRange();
    const visibleArea = axis.getVisibleArea();
    let axisInfo;
    let tickInterval = axis._tickInterval;
    const synchronizedValue = options.synchronizedValue;
    const action = axis.getViewport().action;
    if (majorTicks && majorTicks.length > 0 && (0, _type.isNumeric)(majorTicks[0]) && options.type !== 'discrete' && !businessRange.isEmpty() && !(businessRange.breaks && businessRange.breaks.length) && action !== 'zoom' && action !== 'pan') {
      axis.applyMargins();
      const startValue = axis.getTranslator().from(visibleArea[0]);
      const endValue = axis.getTranslator().from(visibleArea[1]);
      let minValue = startValue < endValue ? startValue : endValue;
      let maxValue = startValue < endValue ? endValue : startValue;
      if (minValue === maxValue && (0, _type.isDefined)(synchronizedValue)) {
        tickInterval = _abs(majorTicks[0] - synchronizedValue) || 1;
        minValue = majorTicks[0] - tickInterval;
        maxValue = majorTicks[0] + tickInterval;
      }
      axisInfo = {
        axis: axis,
        isLogarithmic: options.type === 'logarithmic',
        logarithmicBase: businessRange.base,
        tickValues: majorTicks,
        minorValues: ticksValues.minorTicksValues,
        minorTickInterval: axis._minorTickInterval,
        minValue: minValue,
        oldMinValue: minValue,
        maxValue: maxValue,
        oldMaxValue: maxValue,
        inverted: businessRange.invert,
        tickInterval: tickInterval,
        synchronizedValue: synchronizedValue
      };
      convertAxisInfo(axisInfo, linearConverter(axis.getTranslator().getBusinessRange()));
      result.push(axisInfo);
    }
    return result;
  }, []);
}
function updateTickValues(axesInfo) {
  const maxTicksCount = axesInfo.reduce((max, axisInfo) => {
    return _max(max, axisInfo.tickValues.length);
  }, 0);
  axesInfo.forEach(axisInfo => {
    let ticksMultiplier;
    let ticksCount;
    let additionalStartTicksCount = 0;
    const synchronizedValue = axisInfo.synchronizedValue;
    const tickValues = axisInfo.tickValues;
    const tickInterval = axisInfo.tickInterval;
    if ((0, _type.isDefined)(synchronizedValue)) {
      axisInfo.baseTickValue = axisInfo.invertedBaseTickValue = synchronizedValue;
      axisInfo.tickValues = [axisInfo.baseTickValue];
    } else {
      if (tickValues.length > 1 && tickInterval) {
        ticksMultiplier = _floor((maxTicksCount + 1) / tickValues.length);
        ticksCount = ticksMultiplier > 1 ? _floor((maxTicksCount + 1) / ticksMultiplier) : maxTicksCount;
        additionalStartTicksCount = _floor((ticksCount - tickValues.length) / 2);
        while (additionalStartTicksCount > 0 && tickValues[0] !== 0) {
          tickValues.unshift((0, _math2.adjust)(tickValues[0] - tickInterval));
          additionalStartTicksCount--;
        }
        while (tickValues.length < ticksCount) {
          tickValues.push((0, _math2.adjust)(tickValues[tickValues.length - 1] + tickInterval));
        }
        axisInfo.tickInterval = tickInterval / ticksMultiplier;
      }
      axisInfo.baseTickValue = tickValues[0];
      axisInfo.invertedBaseTickValue = tickValues[tickValues.length - 1];
    }
  });
}
function getAxisRange(axisInfo) {
  return axisInfo.maxValue - axisInfo.minValue || 1; // T153054
}
function getMainAxisInfo(axesInfo) {
  for (let i = 0; i < axesInfo.length; i++) {
    if (!axesInfo[i].stubData) {
      return axesInfo[i];
    }
  }
  return null;
}
function correctMinMaxValues(axesInfo) {
  const mainAxisInfo = getMainAxisInfo(axesInfo);
  const mainAxisRange = getAxisRange(mainAxisInfo);
  axesInfo.forEach(axisInfo => {
    if (axisInfo !== mainAxisInfo) {
      if (mainAxisInfo.tickInterval && axisInfo.tickInterval) {
        const tickIntervalScale = axisInfo.tickInterval / mainAxisInfo.tickInterval;
        if (axisInfo.stubData && (0, _type.isDefined)(axisInfo.synchronizedValue)) {
          axisInfo.oldMinValue = axisInfo.minValue = axisInfo.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.minValue) * tickIntervalScale;
          axisInfo.oldMaxValue = axisInfo.maxValue = axisInfo.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.maxValue) * tickIntervalScale;
        }
        axisInfo.maxValue = axisInfo.minValue + tickIntervalScale * mainAxisRange;
      }
      let mainAxisBaseValueOffset;
      if (!!mainAxisInfo.inverted !== !!axisInfo.inverted) {
        mainAxisBaseValueOffset = mainAxisInfo.maxValue - mainAxisInfo.invertedBaseTickValue;
      } else {
        mainAxisBaseValueOffset = mainAxisInfo.baseTickValue - mainAxisInfo.minValue;
      }
      const axisBaseValueOffset = axisInfo.baseTickValue - axisInfo.minValue;
      const scaledMainAxisBaseValueOffset = mainAxisBaseValueOffset * getAxisRange(axisInfo) / mainAxisRange;
      const move = scaledMainAxisBaseValueOffset - axisBaseValueOffset;
      axisInfo.minValue -= move;
      axisInfo.maxValue -= move;
    }
  });
}
function calculatePaddings(axesInfo) {
  let minPadding;
  let maxPadding;
  let startPadding = 0;
  let endPadding = 0;
  axesInfo.forEach(axisInfo => {
    const inverted = axisInfo.inverted;
    minPadding = axisInfo.minValue > axisInfo.oldMinValue ? (axisInfo.minValue - axisInfo.oldMinValue) / getAxisRange(axisInfo) : 0;
    maxPadding = axisInfo.maxValue < axisInfo.oldMaxValue ? (axisInfo.oldMaxValue - axisInfo.maxValue) / getAxisRange(axisInfo) : 0;
    startPadding = _max(startPadding, inverted ? maxPadding : minPadding);
    endPadding = _max(endPadding, inverted ? minPadding : maxPadding);
  });
  return {
    start: startPadding,
    end: endPadding
  };
}
function correctMinMaxValuesByPaddings(axesInfo, paddings) {
  axesInfo.forEach(info => {
    const range = getAxisRange(info);
    const inverted = info.inverted;
    info.minValue = (0, _math2.adjust)(info.minValue - paddings[inverted ? 'end' : 'start'] * range);
    info.maxValue = (0, _math2.adjust)(info.maxValue + paddings[inverted ? 'start' : 'end'] * range);
  });
}
function updateTickValuesIfSynchronizedValueUsed(axesInfo) {
  let hasSynchronizedValue = false;
  axesInfo.forEach(info => {
    hasSynchronizedValue = hasSynchronizedValue || (0, _type.isDefined)(info.synchronizedValue);
  });
  axesInfo.forEach(info => {
    const tickInterval = info.tickInterval;
    const tickValues = info.tickValues;
    const maxValue = info.maxValue;
    const minValue = info.minValue;
    let tick;
    if (hasSynchronizedValue && tickInterval) {
      while ((tick = (0, _math2.adjust)(tickValues[0] - tickInterval)) >= minValue) {
        tickValues.unshift(tick);
      }
      tick = tickValues[tickValues.length - 1];
      while ((tick = (0, _math2.adjust)(tick + tickInterval)) <= maxValue) {
        tickValues.push(tick);
      }
    }
    while (tickValues[0] + tickInterval / 10 < minValue) {
      tickValues.shift();
    }
    while (tickValues[tickValues.length - 1] - tickInterval / 10 > maxValue) {
      tickValues.pop();
    }
  });
}
function applyMinMaxValues(axesInfo) {
  axesInfo.forEach(info => {
    const axis = info.axis;
    const range = axis.getTranslator().getBusinessRange();
    if (range.min === range.minVisible) {
      range.min = info.minValue;
    }
    if (range.max === range.maxVisible) {
      range.max = info.maxValue;
    }
    range.minVisible = info.minValue;
    range.maxVisible = info.maxValue;
    if (range.min > range.minVisible) {
      range.min = range.minVisible;
    }
    if (range.max < range.maxVisible) {
      range.max = range.maxVisible;
    }
    axis.getTranslator().updateBusinessRange(range);
    axis.setTicks({
      majorTicks: info.tickValues,
      minorTicks: info.minorValues
    });
  });
}
function correctAfterSynchronize(axesInfo) {
  const invalidAxisInfo = [];
  let correctValue;
  axesInfo.forEach(info => {
    if (info.oldMaxValue - info.oldMinValue === 0) {
      invalidAxisInfo.push(info);
    } else {
      if (!(0, _type.isDefined)(correctValue) && !(0, _type.isDefined)(info.synchronizedValue)) {
        correctValue = _abs((info.maxValue - info.minValue) / (info.tickValues[_floor(info.tickValues.length / 2)] - info.minValue || info.maxValue));
      }
    }
  });
  if (!(0, _type.isDefined)(correctValue)) {
    return;
  }
  invalidAxisInfo.forEach(info => {
    const firstTick = info.tickValues[0];
    const correctedTick = firstTick * correctValue;
    if (firstTick > 0) {
      info.maxValue = correctedTick;
      info.minValue = 0;
    } else if (firstTick < 0) {
      info.minValue = correctedTick;
      info.maxValue = 0;
    }
  });
}
function updateMinorTicks(axesInfo) {
  axesInfo.forEach(function (axisInfo) {
    if (!axisInfo.minorTickInterval) {
      return;
    }
    const ticks = [];
    const interval = axisInfo.minorTickInterval;
    const tickCount = axisInfo.tickInterval / interval - 1;
    for (let i = 1; i < axisInfo.tickValues.length; i++) {
      let tick = axisInfo.tickValues[i - 1];
      for (let j = 0; j < tickCount; j++) {
        tick += interval;
        ticks.push(tick);
      }
    }
    axisInfo.minorValues = ticks;
  });
}
function allAxesValuesOnSameSideFromZero(axesInfo) {
  const allPositive = axesInfo.every(_ref => {
    let {
      oldMinValue,
      oldMaxValue
    } = _ref;
    return oldMinValue >= 0 && oldMaxValue >= 0;
  });
  const allNegative = axesInfo.every(_ref2 => {
    let {
      oldMinValue,
      oldMaxValue
    } = _ref2;
    return oldMinValue <= 0 && oldMaxValue <= 0;
  });
  return allPositive || allNegative;
}
function correctPaddings(axesInfo, paddings) {
  if (!allAxesValuesOnSameSideFromZero(axesInfo)) {
    return paddings;
  }
  return axesInfo.reduce((prev, info) => {
    const {
      inverted,
      minValue,
      maxValue
    } = info;
    const {
      start,
      end
    } = info.axis.getCorrectedValuesToZero(minValue, maxValue);
    if ((0, _type.isDefined)(start) || (0, _type.isDefined)(end)) {
      return inverted ? {
        start: prev.start,
        end: Math.min(prev.end, end)
      } : {
        start: Math.min(prev.start, start),
        end: prev.end
      };
    }
    return prev;
  }, paddings);
}
const multiAxesSynchronizer = {
  synchronize: function (valueAxes) {
    (0, _iterator.each)(getValueAxesPerPanes(valueAxes), function (_, axes) {
      if (axes.length <= 1) {
        return;
      }
      const axesInfo = populateAxesInfo(axes);
      if (axesInfo.length < 2 || !getMainAxisInfo(axesInfo)) {
        return;
      }
      updateTickValues(axesInfo);
      correctMinMaxValues(axesInfo);
      let paddings = calculatePaddings(axesInfo);
      paddings = correctPaddings(axesInfo, paddings);
      correctMinMaxValuesByPaddings(axesInfo, paddings);
      correctAfterSynchronize(axesInfo);
      updateTickValuesIfSynchronizedValueUsed(axesInfo);
      updateMinorTicks(axesInfo);
      axesInfo.forEach(info => {
        convertAxisInfo(info, logConverter(info.axis.getTranslator().getBusinessRange()));
      });
      applyMinMaxValues(axesInfo);
    });
  }
};
var _default = exports.default = multiAxesSynchronizer;
module.exports = exports.default;
module.exports.default = exports.default;
