/**
* DevExtreme (cjs/__internal/grids/grid_core/utils/selector_comparison.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _selector_comparison = require("./selector_comparison");
(0, _globals.describe)('GridCore utils', () => {
  (0, _globals.describe)('Selector comparison', () => {
    (0, _globals.describe)('getNormalizedCallback', () => {
      (0, _globals.it)('should return the function itself if no originalCallback property', () => {
        const callback = () => 'test';
        const result = (0, _selector_comparison.getNormalizedCallback)(callback);
        (0, _globals.expect)(result).toBe(callback);
      });
      (0, _globals.it)('should return originalCallback if present', () => {
        const originalCallback = () => 'original';
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = originalCallback;
        const result = (0, _selector_comparison.getNormalizedCallback)(wrapper);
        (0, _globals.expect)(result).toBe(originalCallback);
      });
    });
    (0, _globals.describe)('getNormalizedColumnIdx', () => {
      (0, _globals.it)('should return undefined if callback is usual function', () => {
        const callback = () => 'test';
        const result = (0, _selector_comparison.getNormalizedColumnIdx)(callback);
        (0, _globals.expect)(result).toBeUndefined();
      });
      (0, _globals.it)('should return undefined if columnIdx field not exist', () => {
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = () => 'original';
        const result = (0, _selector_comparison.getNormalizedColumnIdx)(wrapper);
        (0, _globals.expect)(result).toBeUndefined();
      });
      (0, _globals.it)('should return null if columnIdx field exist but value not set', () => {
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = () => 'original';
        wrapper.columnIndex = undefined;
        const result = (0, _selector_comparison.getNormalizedColumnIdx)(wrapper);
        (0, _globals.expect)(result).toBeNull();
      });
      (0, _globals.it)('should return number if columnIdx field exist and value is set', () => {
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = () => 'original';
        wrapper.columnIndex = 5;
        const result = (0, _selector_comparison.getNormalizedColumnIdx)(wrapper);
        (0, _globals.expect)(result).toBe(5);
      });
    });
    (0, _globals.describe)('compareCallbacks', () => {
      const callbackA = () => 'A';
      const callbackB = () => 'B';
      const wrappedA = () => 'wrapped A';
      const wrappedB = () => 'wrapped B';
      wrappedA.originalCallback = callbackA;
      wrappedB.originalCallback = callbackB;
      _globals.it.each([{
        caseName: 'same functions',
        first: callbackA,
        second: callbackA,
        expectedResult: true
      }, {
        caseName: 'different functions',
        first: callbackA,
        second: callbackB,
        expectedResult: false
      }, {
        caseName: 'same wrapped functions',
        first: wrappedA,
        second: wrappedA,
        expectedResult: true
      }, {
        caseName: 'different wrapped functions',
        first: wrappedA,
        second: wrappedB,
        expectedResult: false
      }, {
        caseName: 'function and same wrapped function',
        first: callbackA,
        second: wrappedA,
        expectedResult: true
      }, {
        caseName: 'function and different wrapped function',
        first: callbackA,
        second: wrappedB,
        expectedResult: false
      }])('should compare $caseName without column idx', _ref => {
        let {
          first,
          second,
          expectedResult
        } = _ref;
        const result = (0, _selector_comparison.compareCallbacks)(first, second);
        (0, _globals.expect)(result).toBe(expectedResult);
      });
      (0, _globals.it)('should compare function with same wrapped one with column idx field without value', () => {
        const first = () => 'A';
        const second = () => 'wrapped A';
        second.originalCallback = first;
        second.columnIndex = undefined;
        const result = (0, _selector_comparison.compareCallbacks)(first, second);
        (0, _globals.expect)(result).toBe(true);
      });
      (0, _globals.it)('should compare function with same wrapped one with column idx value', () => {
        const first = () => 'A';
        const second = () => 'wrapped A';
        second.originalCallback = first;
        second.columnIndex = 100;
        const result = (0, _selector_comparison.compareCallbacks)(first, second);
        (0, _globals.expect)(result).toBe(true);
      });
      (0, _globals.it)('should compare same wrapped functions with column idx field but without values', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = undefined;
        second.originalCallback = callback;
        second.columnIndex = undefined;
        const result = (0, _selector_comparison.compareCallbacks)(first, second);
        (0, _globals.expect)(result).toBe(true);
      });
      (0, _globals.it)('should compare same wrapped functions with column idx field and one value is not set', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = 10;
        second.originalCallback = callback;
        second.columnIndex = undefined;
        const result = (0, _selector_comparison.compareCallbacks)(first, second);
        (0, _globals.expect)(result).toBe(false);
      });
      (0, _globals.it)('should compare same wrapped functions with different column idx values', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = 10;
        second.originalCallback = callback;
        second.columnIndex = 20;
        const result = (0, _selector_comparison.compareCallbacks)(first, second);
        (0, _globals.expect)(result).toBe(false);
      });
      (0, _globals.it)('should compare same wrapped functions with same column idx values', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = 100;
        second.originalCallback = callback;
        second.columnIndex = 100;
        const result = (0, _selector_comparison.compareCallbacks)(first, second);
        (0, _globals.expect)(result).toBe(true);
      });
    });
    (0, _globals.describe)('isEqualSelectors', () => {
      const selectorFnA = () => 'A';
      const selectorFnB = () => 'B';
      _globals.it.each([{
        caseName: 'same string selectors',
        first: 'A',
        second: 'A',
        expectedResult: true
      }, {
        caseName: 'different string selectors',
        first: 'A',
        second: 'B',
        expectedResult: false
      }, {
        caseName: 'same function selectors',
        first: selectorFnA,
        second: selectorFnA,
        expectedResult: true
      }, {
        caseName: 'different function selectors',
        first: selectorFnA,
        second: selectorFnB,
        expectedResult: false
      }, {
        caseName: 'different selector types',
        first: 'A',
        second: selectorFnA,
        expectedResult: false
      }, {
        caseName: 'one of selectors is undefined',
        first: undefined,
        second: 'B',
        expectedResult: false
      }, {
        caseName: 'both selectors are undefined',
        first: undefined,
        second: undefined,
        expectedResult: false
      }])('should compare $caseName', _ref2 => {
        let {
          first,
          second,
          expectedResult
        } = _ref2;
        const result = (0, _selector_comparison.isEqualSelectors)(first, second);
        (0, _globals.expect)(result).toBe(expectedResult);
      });
    });
    (0, _globals.describe)('isSelectorEqualWithCallback', () => {
      const callbackFnA = () => 'A';
      const callbackFnB = () => 'B';
      _globals.it.each([{
        caseName: 'string selector and callback',
        selector: 'A',
        callback: callbackFnA,
        expectedResult: false
      }, {
        caseName: 'function selector and same callback',
        selector: callbackFnA,
        callback: callbackFnA,
        expectedResult: true
      }, {
        caseName: 'function selector and different callback',
        selector: callbackFnA,
        callback: callbackFnB,
        expectedResult: false
      }, {
        caseName: 'string selector and undefined callback',
        selector: 'A',
        callback: undefined,
        expectedResult: false
      }, {
        caseName: 'function selector and undefined callback',
        selector: callbackFnA,
        callback: undefined,
        expectedResult: false
      }, {
        caseName: 'undefined selector and callback',
        selector: undefined,
        callback: callbackFnA,
        expectedResult: false
      }, {
        caseName: 'undefined selector and undefined callback',
        selector: undefined,
        callback: undefined,
        expectedResult: false
      }])('should compare $caseName', _ref3 => {
        let {
          selector,
          callback,
          expectedResult
        } = _ref3;
        const result = (0, _selector_comparison.isSelectorEqualWithCallback)(selector, callback);
        (0, _globals.expect)(result).toBe(expectedResult);
      });
    });
  });
});
