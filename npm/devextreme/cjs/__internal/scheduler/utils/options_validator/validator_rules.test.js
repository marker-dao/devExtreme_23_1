/**
* DevExtreme (cjs/__internal/scheduler/utils/options_validator/validator_rules.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _constants_view = require("../options/constants_view");
var validationFunctions = _interopRequireWildcard(require("./common/validation_functions"));
var _validator_rules = require("./validator_rules");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
(0, _globals.describe)('validator rules', () => {
  (0, _globals.describe)('endDayHourMustBeGreaterThanStartDayHour', () => {
    const options = {
      startDayHour: 0,
      endDayHour: 24
    };
    const mock = _globals.jest.spyOn(validationFunctions, 'greaterThan');
    (0, _globals.afterEach)(() => {
      mock === null || mock === void 0 || mock.mockReset();
    });
    (0, _globals.it)('should call greaterThan function', () => {
      (0, _validator_rules.endDayHourMustBeGreaterThanStartDayHour)(options);
      (0, _globals.expect)(mock).toHaveBeenCalledWith(options.endDayHour, options.startDayHour);
    });
    (0, _globals.it)('should return true if valid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => true);
      const result = (0, _validator_rules.endDayHourMustBeGreaterThanStartDayHour)(options);
      (0, _globals.expect)(result).toBe(true);
    });
    (0, _globals.it)('should return error (string) if invalid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => false);
      const result = (0, _validator_rules.endDayHourMustBeGreaterThanStartDayHour)({
        startDayHour: 10,
        endDayHour: 9
      });
      (0, _globals.expect)(result).toBe(false);
    });
    (0, _globals.it)('should be the function with the correct name', () => {
      const func = _validator_rules.endDayHourMustBeGreaterThanStartDayHour;
      (0, _globals.expect)(func.name).toBe('endDayHourGreaterThanStartDayHour');
    });
  });
  (0, _globals.describe)('visibleIntervalMustBeDivisibleByCellDuration', () => {
    const options = {
      cellDuration: 30,
      startDayHour: 0,
      endDayHour: 24
    };
    const mock = _globals.jest.spyOn(validationFunctions, 'divisibleBy');
    (0, _globals.afterEach)(() => {
      mock === null || mock === void 0 || mock.mockReset();
    });
    (0, _globals.it)('should call divisibleBy function with correct values', () => {
      (0, _validator_rules.visibleIntervalMustBeDivisibleByCellDuration)(options);
      (0, _globals.expect)(mock).toHaveBeenCalledWith(1440, options.cellDuration);
    });
    (0, _globals.it)('should return true if valid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => true);
      const result = (0, _validator_rules.visibleIntervalMustBeDivisibleByCellDuration)(options);
      (0, _globals.expect)(result).toBe(true);
    });
    (0, _globals.it)('should return error (string) if invalid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => false);
      const result = (0, _validator_rules.visibleIntervalMustBeDivisibleByCellDuration)({
        cellDuration: 31,
        startDayHour: 9,
        endDayHour: 10
      });
      (0, _globals.expect)(result).toBe(false);
    });
    (0, _globals.it)('should be the function with the correct name', () => {
      const func = _validator_rules.visibleIntervalMustBeDivisibleByCellDuration;
      (0, _globals.expect)(func.name).toBe('visibleIntervalMustBeDivisibleByCellDuration');
    });
  });
  (0, _globals.describe)('cellDurationMustBeLessThanVisibleInterval', () => {
    const options = {
      cellDuration: 30,
      startDayHour: 0,
      endDayHour: 24
    };
    const mock = _globals.jest.spyOn(validationFunctions, 'lessThan');
    (0, _globals.afterEach)(() => {
      mock === null || mock === void 0 || mock.mockReset();
    });
    (0, _globals.it)('should call divisibleBy function with correct values', () => {
      (0, _validator_rules.cellDurationMustBeLessThanVisibleInterval)(options);
      (0, _globals.expect)(mock).toHaveBeenCalledWith(options.cellDuration, 1440, false);
    });
    (0, _globals.it)('should return true if valid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => true);
      const result = (0, _validator_rules.cellDurationMustBeLessThanVisibleInterval)(options);
      (0, _globals.expect)(result).toBe(true);
    });
    (0, _globals.it)('should return error (string) if invalid', () => {
      mock === null || mock === void 0 || mock.mockImplementation(() => false);
      const result = (0, _validator_rules.cellDurationMustBeLessThanVisibleInterval)({
        cellDuration: 120,
        startDayHour: 9,
        endDayHour: 10
      });
      (0, _globals.expect)(result).toBe(false);
    });
    (0, _globals.it)('should be the function with the correct name', () => {
      const func = _validator_rules.cellDurationMustBeLessThanVisibleInterval;
      (0, _globals.expect)(func.name).toBe('cellDurationMustBeLessThanVisibleInterval');
    });
  });
  (0, _globals.describe)('allViewsHasCorrectType', () => {
    (0, _globals.it)('should return true for empty views', () => {
      (0, _globals.expect)((0, _validator_rules.allViewsHasCorrectType)([])).toBe(true);
    });
    _globals.it.each(_constants_view.VIEW_TYPES)('should return true for %s view', viewType => {
      (0, _globals.expect)((0, _validator_rules.allViewsHasCorrectType)([{
        type: 'day'
      }, {
        type: 'week'
      }, {
        type: viewType
      }])).toBe(true);
    });
    _globals.it.each(_constants_view.VIEW_TYPES)('should return true for %s string view configuration', viewType => {
      (0, _globals.expect)((0, _validator_rules.allViewsHasCorrectType)([viewType])).toBe(true);
    });
    (0, _globals.it)('should return error for views with incorrect types', () => {
      (0, _globals.expect)((0, _validator_rules.allViewsHasCorrectType)([{
        type: 'day'
      }, {
        type: 'orange'
      }, {
        type: 'week'
      }])).toEqual({
        arguments: ['\'orange\'']
      });
    });
    (0, _globals.it)('should return first error for views with incorrect types', () => {
      (0, _globals.expect)((0, _validator_rules.allViewsHasCorrectType)([{
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
    (0, _globals.it)('should be the function with the correct name', () => {
      const func = _validator_rules.allViewsHasCorrectType;
      (0, _globals.expect)(func.name).toBe('allViewsHasCorrectType');
    });
  });
});
