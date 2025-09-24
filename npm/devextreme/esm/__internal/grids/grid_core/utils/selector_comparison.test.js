/**
* DevExtreme (esm/__internal/grids/grid_core/utils/selector_comparison.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { compareCallbacks, getNormalizedCallback, getNormalizedColumnIdx, isEqualSelectors, isSelectorEqualWithCallback } from './selector_comparison';
describe('GridCore utils', () => {
  describe('Selector comparison', () => {
    describe('getNormalizedCallback', () => {
      it('should return the function itself if no originalCallback property', () => {
        const callback = () => 'test';
        const result = getNormalizedCallback(callback);
        expect(result).toBe(callback);
      });
      it('should return originalCallback if present', () => {
        const originalCallback = () => 'original';
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = originalCallback;
        const result = getNormalizedCallback(wrapper);
        expect(result).toBe(originalCallback);
      });
    });
    describe('getNormalizedColumnIdx', () => {
      it('should return undefined if callback is usual function', () => {
        const callback = () => 'test';
        const result = getNormalizedColumnIdx(callback);
        expect(result).toBeUndefined();
      });
      it('should return undefined if columnIdx field not exist', () => {
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = () => 'original';
        const result = getNormalizedColumnIdx(wrapper);
        expect(result).toBeUndefined();
      });
      it('should return null if columnIdx field exist but value not set', () => {
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = () => 'original';
        wrapper.columnIndex = undefined;
        const result = getNormalizedColumnIdx(wrapper);
        expect(result).toBeNull();
      });
      it('should return number if columnIdx field exist and value is set', () => {
        const wrapper = () => 'wrapper';
        wrapper.originalCallback = () => 'original';
        wrapper.columnIndex = 5;
        const result = getNormalizedColumnIdx(wrapper);
        expect(result).toBe(5);
      });
    });
    describe('compareCallbacks', () => {
      const callbackA = () => 'A';
      const callbackB = () => 'B';
      const wrappedA = () => 'wrapped A';
      const wrappedB = () => 'wrapped B';
      wrappedA.originalCallback = callbackA;
      wrappedB.originalCallback = callbackB;
      it.each([{
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
        const result = compareCallbacks(first, second);
        expect(result).toBe(expectedResult);
      });
      it('should compare function with same wrapped one with column idx field without value', () => {
        const first = () => 'A';
        const second = () => 'wrapped A';
        second.originalCallback = first;
        second.columnIndex = undefined;
        const result = compareCallbacks(first, second);
        expect(result).toBe(true);
      });
      it('should compare function with same wrapped one with column idx value', () => {
        const first = () => 'A';
        const second = () => 'wrapped A';
        second.originalCallback = first;
        second.columnIndex = 100;
        const result = compareCallbacks(first, second);
        expect(result).toBe(true);
      });
      it('should compare same wrapped functions with column idx field but without values', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = undefined;
        second.originalCallback = callback;
        second.columnIndex = undefined;
        const result = compareCallbacks(first, second);
        expect(result).toBe(true);
      });
      it('should compare same wrapped functions with column idx field and one value is not set', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = 10;
        second.originalCallback = callback;
        second.columnIndex = undefined;
        const result = compareCallbacks(first, second);
        expect(result).toBe(false);
      });
      it('should compare same wrapped functions with different column idx values', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = 10;
        second.originalCallback = callback;
        second.columnIndex = 20;
        const result = compareCallbacks(first, second);
        expect(result).toBe(false);
      });
      it('should compare same wrapped functions with same column idx values', () => {
        const callback = () => 'A';
        const first = () => 'wrapped A';
        const second = () => 'wrapped B';
        first.originalCallback = callback;
        first.columnIndex = 100;
        second.originalCallback = callback;
        second.columnIndex = 100;
        const result = compareCallbacks(first, second);
        expect(result).toBe(true);
      });
    });
    describe('isEqualSelectors', () => {
      const selectorFnA = () => 'A';
      const selectorFnB = () => 'B';
      it.each([{
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
        const result = isEqualSelectors(first, second);
        expect(result).toBe(expectedResult);
      });
    });
    describe('isSelectorEqualWithCallback', () => {
      const callbackFnA = () => 'A';
      const callbackFnB = () => 'B';
      it.each([{
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
        const result = isSelectorEqualWithCallback(selector, callback);
        expect(result).toBe(expectedResult);
      });
    });
  });
});
