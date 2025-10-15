/**
* DevExtreme (cjs/__internal/scheduler/utils/options_validator/validator_rules.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visibleIntervalMustBeDivisibleByCellDuration = exports.endDayHourMustBeGreaterThanStartDayHour = exports.cellDurationMustBeLessThanVisibleInterval = exports.allViewsHasCorrectType = void 0;
var _type = require("../../../../core/utils/type");
var _constants_view = require("../options/constants_view");
var _index = require("./common/index");
var _index2 = require("./core/index");
const endDayHourMustBeGreaterThanStartDayHour = exports.endDayHourMustBeGreaterThanStartDayHour = (0, _index2.createValidatorRule)('endDayHourGreaterThanStartDayHour', _ref => {
  let {
    startDayHour,
    endDayHour
  } = _ref;
  return (0, _index.greaterThan)(endDayHour, startDayHour);
});
const visibleIntervalMustBeDivisibleByCellDuration = exports.visibleIntervalMustBeDivisibleByCellDuration = (0, _index2.createValidatorRule)('visibleIntervalMustBeDivisibleByCellDuration', _ref2 => {
  let {
    cellDuration,
    startDayHour,
    endDayHour
  } = _ref2;
  const visibleInterval = (endDayHour - startDayHour) * 60;
  return (0, _index.divisibleBy)(visibleInterval, cellDuration);
});
const cellDurationMustBeLessThanVisibleInterval = exports.cellDurationMustBeLessThanVisibleInterval = (0, _index2.createValidatorRule)('cellDurationMustBeLessThanVisibleInterval', _ref3 => {
  let {
    cellDuration,
    startDayHour,
    endDayHour
  } = _ref3;
  const visibleInterval = (endDayHour - startDayHour) * 60;
  return (0, _index.lessThan)(cellDuration, visibleInterval, false);
});
const allViewsHasCorrectType = exports.allViewsHasCorrectType = (0, _index2.createValidatorRule)('allViewsHasCorrectType', views => {
  const incorrectViewTypes = views.reduce((result, view) => {
    const viewType = (0, _type.isObject)(view) ? view.type : view;
    const isValidView = Boolean(viewType && _constants_view.VIEW_TYPES.includes(viewType));
    if (!isValidView) {
      result.push(`'${viewType}'`);
    }
    return result;
  }, []);
  return incorrectViewTypes.length ? {
    arguments: [incorrectViewTypes.join(', ')]
  } : true;
});
