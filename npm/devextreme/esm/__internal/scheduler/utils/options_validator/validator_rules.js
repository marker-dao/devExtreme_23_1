/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/validator_rules.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isObject } from '../../../../core/utils/type';
import { VIEW_TYPES } from '../options/constants_view';
import { divisibleBy, greaterThan, lessThan } from './common/index';
import { createValidatorRule } from './core/index';
export const endDayHourMustBeGreaterThanStartDayHour = createValidatorRule('endDayHourGreaterThanStartDayHour', _ref => {
  let {
    startDayHour,
    endDayHour
  } = _ref;
  return greaterThan(endDayHour, startDayHour);
});
export const visibleIntervalMustBeDivisibleByCellDuration = createValidatorRule('visibleIntervalMustBeDivisibleByCellDuration', _ref2 => {
  let {
    cellDuration,
    startDayHour,
    endDayHour
  } = _ref2;
  const visibleInterval = (endDayHour - startDayHour) * 60;
  return divisibleBy(visibleInterval, cellDuration);
});
export const cellDurationMustBeLessThanVisibleInterval = createValidatorRule('cellDurationMustBeLessThanVisibleInterval', _ref3 => {
  let {
    cellDuration,
    startDayHour,
    endDayHour
  } = _ref3;
  const visibleInterval = (endDayHour - startDayHour) * 60;
  return lessThan(cellDuration, visibleInterval, false);
});
export const allViewsHasCorrectType = createValidatorRule('allViewsHasCorrectType', views => {
  const incorrectViewTypes = views.reduce((result, view) => {
    const viewType = isObject(view) ? view.type : view;
    const isValidView = Boolean(viewType && VIEW_TYPES.includes(viewType));
    if (!isValidView) {
      result.push(`'${viewType}'`);
    }
    return result;
  }, []);
  return incorrectViewTypes.length ? {
    arguments: [incorrectViewTypes.join(', ')]
  } : true;
});
