/**
* DevExtreme (cjs/__internal/pagination/utils/validate_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var _validation_utils = require("./validation_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('Validate utils', () => {
  (0, _globals.describe)('validateOption function', () => {
    (0, _jestEach.default)`
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
      const result = (0, _validation_utils.validateOptions)(oldPageSize, oldPageIndex, oldItemCount);
      const {
        pageSize,
        pageIndex,
        itemCount,
        pageCount
      } = result;
      (0, _globals.expect)(pageSize).toEqual(expectedPageSize);
      (0, _globals.expect)(pageIndex).toEqual(expectedPageIndex);
      (0, _globals.expect)(itemCount).toEqual(expectedItemCount);
      (0, _globals.expect)(pageCount).toEqual(expectedPageCount);
    });
  });
});
