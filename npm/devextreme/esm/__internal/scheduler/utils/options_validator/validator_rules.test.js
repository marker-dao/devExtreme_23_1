/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/validator_rules.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { VIEW_TYPES } from '../options/constants_view';
import * as validationFunctions from './common/validation_functions';
import { allViewsHasCorrectType, cellDurationMustBeLessThanVisibleInterval, endDayHourMustBeGreaterThanStartDayHour, visibleIntervalMustBeDivisibleByCellDuration } from './validator_rules';
describe('validator rules', () => {
  describe('endDayHourMustBeGreaterThanStartDayHour', () => {
    const options = {
      startDayHour: 0,
      endDayHour: 24
    };
    const mock = jest.spyOn(validationFunctions, 'greaterThan');
    afterEach(() => {
      mock === null || mock === void 0 || mock.mockReset();
    });
    it('should call greaterThan function', () => {
      endDayHourMustBeGreaterThanStartDayHour(options);
      expect(mock).toHaveBeenCalledWith(options.endDayHour, options.startDayHour);
    });
    it('should return true if valid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => true);
      const result = endDayHourMustBeGreaterThanStartDayHour(options);
      expect(result).toBe(true);
    });
    it('should return error (string) if invalid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => false);
      const result = endDayHourMustBeGreaterThanStartDayHour({
        startDayHour: 10,
        endDayHour: 9
      });
      expect(result).toBe(false);
    });
    it('should be the function with the correct name', () => {
      const func = endDayHourMustBeGreaterThanStartDayHour;
      expect(func.name).toBe('endDayHourGreaterThanStartDayHour');
    });
  });
  describe('visibleIntervalMustBeDivisibleByCellDuration', () => {
    const options = {
      cellDuration: 30,
      startDayHour: 0,
      endDayHour: 24
    };
    const mock = jest.spyOn(validationFunctions, 'divisibleBy');
    afterEach(() => {
      mock === null || mock === void 0 || mock.mockReset();
    });
    it('should call divisibleBy function with correct values', () => {
      visibleIntervalMustBeDivisibleByCellDuration(options);
      expect(mock).toHaveBeenCalledWith(1440, options.cellDuration);
    });
    it('should return true if valid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => true);
      const result = visibleIntervalMustBeDivisibleByCellDuration(options);
      expect(result).toBe(true);
    });
    it('should return error (string) if invalid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => false);
      const result = visibleIntervalMustBeDivisibleByCellDuration({
        cellDuration: 31,
        startDayHour: 9,
        endDayHour: 10
      });
      expect(result).toBe(false);
    });
    it('should be the function with the correct name', () => {
      const func = visibleIntervalMustBeDivisibleByCellDuration;
      expect(func.name).toBe('visibleIntervalMustBeDivisibleByCellDuration');
    });
  });
  describe('cellDurationMustBeLessThanVisibleInterval', () => {
    const options = {
      cellDuration: 30,
      startDayHour: 0,
      endDayHour: 24
    };
    const mock = jest.spyOn(validationFunctions, 'lessThan');
    afterEach(() => {
      mock === null || mock === void 0 || mock.mockReset();
    });
    it('should call divisibleBy function with correct values', () => {
      cellDurationMustBeLessThanVisibleInterval(options);
      expect(mock).toHaveBeenCalledWith(options.cellDuration, 1440, false);
    });
    it('should return true if valid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => true);
      const result = cellDurationMustBeLessThanVisibleInterval(options);
      expect(result).toBe(true);
    });
    it('should return error (string) if invalid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => false);
      const result = cellDurationMustBeLessThanVisibleInterval({
        cellDuration: 120,
        startDayHour: 9,
        endDayHour: 10
      });
      expect(result).toBe(false);
    });
    it('should be the function with the correct name', () => {
      const func = cellDurationMustBeLessThanVisibleInterval;
      expect(func.name).toBe('cellDurationMustBeLessThanVisibleInterval');
    });
  });
  describe('allViewsHasCorrectType', () => {
    it('should return true for empty views', () => {
      expect(allViewsHasCorrectType([])).toBe(true);
    });
    it.each(VIEW_TYPES)('should return true for %s view', viewType => {
      expect(allViewsHasCorrectType([{
        type: 'day'
      }, {
        type: 'week'
      }, {
        type: viewType
      }])).toBe(true);
    });
    it.each(VIEW_TYPES)('should return true for %s string view configuration', viewType => {
      expect(allViewsHasCorrectType([viewType])).toBe(true);
    });
    it('should return error for views with incorrect types', () => {
      expect(allViewsHasCorrectType([{
        type: 'day'
      }, {
        type: 'orange'
      }, {
        type: 'week'
      }])).toEqual({
        arguments: ['\'orange\'']
      });
    });
    it('should return first error for views with incorrect types', () => {
      expect(allViewsHasCorrectType([{
        type: 'day'
      }, {
        type: 'orange'
      }, {
        type: 'apple'
      }, {
        type: 'week'
      }])).toEqual({
        arguments: ['\'orange\', \'apple\'']
      });
    });
    it('should be the function with the correct name', () => {
      const func = allViewsHasCorrectType;
      expect(func.name).toBe('allViewsHasCorrectType');
    });
  });
});
