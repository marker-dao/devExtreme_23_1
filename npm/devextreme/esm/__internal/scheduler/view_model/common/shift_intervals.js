/**
* DevExtreme (esm/__internal/scheduler/view_model/common/shift_intervals.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
export const shiftIntervals = (intervals, viewOffset) => intervals.map(interval => _extends({}, interval, {
  min: interval.min + viewOffset,
  max: interval.max + viewOffset
}));
