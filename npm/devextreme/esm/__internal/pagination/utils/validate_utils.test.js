/**
* DevExtreme (esm/__internal/pagination/utils/validate_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect } from '@jest/globals';
import each from 'jest-each';
import { validateOptions } from './validation_utils';
describe('Validate utils', () => {
  describe('validateOption function', () => {
    each`
            oldPageSize | oldPageIndex | oldItemCount | expectedPageSize | expectedPageIndex | expectedItemCount | expectedPageCount
            ${5}        | ${1}         | ${1}         | ${5}             | ${1}              | ${1}              | ${1}                 // initial state
            ${10}       | ${500}       | ${100}       | ${10}            | ${10}             | ${100}            | ${10}
            ${3}        | ${2}         | ${2}         | ${3}             | ${1}              | ${2}              | ${1}
            ${3}        | ${2}         | ${2}         | ${3}             | ${1}              | ${2}              | ${1}
            ${3}        | ${-2}        | ${-5}        | ${3}             | ${1}              | ${0}              | ${1}
            ${-5}       | ${10}        | ${20}        | ${1}             | ${10}             | ${20}             | ${20}
            ${5}        | ${1}         | ${100}       | ${5}             | ${1}              | ${100}            | ${20}
            ${0}        | ${1}         | ${100}       | ${0}             | ${1}              | ${100}            | ${1}
            ${0}        | ${2}         | ${100}       | ${0}             | ${1}              | ${100}            | ${1}
    `.it('should calculate the correct state', _ref => {
      let {
        oldPageSize,
        oldPageIndex,
        oldItemCount,
        expectedPageSize,
        expectedPageIndex,
        expectedItemCount,
        expectedPageCount
      } = _ref;
      const result = validateOptions(oldPageSize, oldPageIndex, oldItemCount);
      const {
        pageSize,
        pageIndex,
        itemCount,
        pageCount
      } = result;
      expect(pageSize).toEqual(expectedPageSize);
      expect(pageIndex).toEqual(expectedPageIndex);
      expect(itemCount).toEqual(expectedItemCount);
      expect(pageCount).toEqual(expectedPageCount);
    });
  });
});
