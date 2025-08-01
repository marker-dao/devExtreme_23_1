/**
* DevExtreme (cjs/viz/range_selector/common.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.utils = exports.isFirefoxOnAndroid = exports.formatValue = exports.consts = exports.HEIGHT_COMPACT_MODE = void 0;
var _smart_formatter = require("../axes/smart_formatter");
var _type = require("../../core/utils/type");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _devices = _interopRequireDefault(require("../../core/devices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HEIGHT_COMPACT_MODE = exports.HEIGHT_COMPACT_MODE = 24;
const POINTER_SIZE = 4;
const EMPTY_SLIDER_MARKER_TEXT = '. . .';
const utils = exports.utils = {
  trackerSettings: {
    fill: 'grey',
    stroke: 'grey',
    opacity: 0.0001
  },
  animationSettings: {
    duration: 250
  }
};
const consts = exports.consts = {
  emptySliderMarkerText: EMPTY_SLIDER_MARKER_TEXT,
  pointerSize: POINTER_SIZE
};
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
const isFirefoxOnAndroid = () => _browser.default.mozilla && _devices.default.real().android;
exports.isFirefoxOnAndroid = isFirefoxOnAndroid;
