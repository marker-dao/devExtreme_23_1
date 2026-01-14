/**
* DevExtreme (esm/__internal/viz/range_selector/common.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable func-names */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import devices from '../../../core/devices';
import browser from '../../../core/utils/browser';
import { isFunction } from '../../../core/utils/type';
import { smartFormatter as _format } from '../../viz/axes/smart_formatter';
export const HEIGHT_COMPACT_MODE = 24;
const POINTER_SIZE = 4;
const EMPTY_SLIDER_MARKER_TEXT = '. . .';
export const utils = {
  trackerSettings: {
    fill: 'grey',
    stroke: 'grey',
    opacity: 0.0001
  },
  animationSettings: {
    duration: 250
  }
};
export const consts = {
  emptySliderMarkerText: EMPTY_SLIDER_MARKER_TEXT,
  pointerSize: POINTER_SIZE
};
export const formatValue = function (value, formatOptions, tickIntervalsInfo, valueType, type, logarithmBase) {
  const formatObject = {
    value,
    valueText: _format(value, {
      labelOptions: formatOptions,
      ticks: tickIntervalsInfo ? tickIntervalsInfo.ticks : [],
      tickInterval: tickIntervalsInfo ? tickIntervalsInfo.tickInterval : undefined,
      dataType: valueType,
      type,
      logarithmBase
    })
  };
  return String(isFunction(formatOptions.customizeText) ? formatOptions.customizeText.call(formatObject, formatObject) : formatObject.valueText);
};
export const isFirefoxOnAndroid = () => browser.mozilla && devices.real().android;
