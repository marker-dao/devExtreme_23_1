/**
* DevExtreme (cjs/viz/range_selector/common.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.utils = exports.formatValue = exports.consts = exports.HEIGHT_COMPACT_MODE = void 0;
var _smart_formatter = require("../axes/smart_formatter");
var _type = require("../../core/utils/type");
const HEIGHT_COMPACT_MODE = 24;
exports.HEIGHT_COMPACT_MODE = HEIGHT_COMPACT_MODE;
const POINTER_SIZE = 4;
const EMPTY_SLIDER_MARKER_TEXT = '. . .';
const utils = {
  trackerSettings: {
    fill: 'grey',
    stroke: 'grey',
    opacity: 0.0001
  },
  animationSettings: {
    duration: 250
  }
};
exports.utils = utils;
const consts = {
  emptySliderMarkerText: EMPTY_SLIDER_MARKER_TEXT,
  pointerSize: POINTER_SIZE
};
exports.consts = consts;
const formatValue = function (value, formatOptions, tickIntervalsInfo, valueType, type, logarithmBase) {
  const formatObject = {
    value: value,
    valueText: (0, _smart_formatter.smartFormatter)(value, {
      labelOptions: formatOptions,
      ticks: tickIntervalsInfo ? tickIntervalsInfo.ticks : [],
      tickInterval: tickIntervalsInfo ? tickIntervalsInfo.tickInterval : undefined,
      dataType: valueType,
      type: type,
      logarithmBase: logarithmBase
    })
  };
  return String((0, _type.isFunction)(formatOptions.customizeText) ? formatOptions.customizeText.call(formatObject, formatObject) : formatObject.valueText);
};
exports.formatValue = formatValue;