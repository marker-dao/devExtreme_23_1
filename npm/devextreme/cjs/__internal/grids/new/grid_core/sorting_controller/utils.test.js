/**
* DevExtreme (cjs/__internal/grids/new/grid_core/sorting_controller/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable object-curly-newline */

(0, _globals.describe)('getNextSortOrder', () => {
  (0, _globals.describe)('with pressed ctrl (meta) key', () => {
    (0, _jestEach.default)`
            currentOrder | ctrlKey | expectedResult
            ${'asc'}     | ${true} | ${undefined}
            ${'desc'}    | ${true} | ${undefined}
            ${undefined} | ${true} | ${undefined}
    `.it('should reset the sort order', _ref => {
      let {
        currentOrder,
        ctrlKey,
        expectedResult
      } = _ref;
      const result = (0, _utils.getNextSortOrder)(currentOrder, ctrlKey);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
  (0, _globals.describe)('without pressed ctrl (meta) key', () => {
    (0, _jestEach.default)`
            currentOrder | ctrlKey | expectedResult
            ${'asc'}     | ${false} | ${'desc'}
            ${'desc'}    | ${false} | ${'asc'}
            ${undefined} | ${false} | ${'asc'}
    `.it('should invert the sort order or return ascending', _ref2 => {
      let {
        currentOrder,
        ctrlKey,
        expectedResult
      } = _ref2;
      const result = (0, _utils.getNextSortOrder)(currentOrder, ctrlKey);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
});
(0, _globals.describe)('sortOrderDelegate', () => {
  (0, _globals.describe)('when sortIndex is not defined for both columns', () => {
    (0, _jestEach.default)`
            columnA                                        | columnB                                      | expectedResult
            ${{
      visibleIndex: 1,
      sortIndex: undefined
    }}   | ${{
      visibleIndex: 2,
      sortIndex: undefined
    }} | ${-1}
            ${{
      visibleIndex: 1,
      sortIndex: undefined
    }}   | ${{
      visibleIndex: 0,
      sortIndex: undefined
    }} | ${1}
            ${{
      visibleIndex: 4,
      sortIndex: undefined
    }}   | ${{
      visibleIndex: 2,
      sortIndex: undefined
    }} | ${2}
            ${{
      visibleIndex: 3,
      sortIndex: undefined
    }}   | ${{
      visibleIndex: 5,
      sortIndex: undefined
    }} | ${-2}
            ${{
      visibleIndex: 4,
      sortIndex: undefined
    }}   | ${{
      visibleIndex: 4,
      sortIndex: undefined
    }} | ${0}
    `.it('should take into account visibleIndex', _ref3 => {
      let {
        columnA,
        columnB,
        expectedResult
      } = _ref3;
      const result = (0, _utils.sortOrderDelegate)(columnA, columnB);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
  (0, _globals.describe)('when sortIndex is not defined for one of columns', () => {
    (0, _jestEach.default)`
            columnA                                        | columnB                                      | expectedResult
            ${{
      visibleIndex: 1,
      sortIndex: undefined
    }}   | ${{
      visibleIndex: 2,
      sortIndex: 1
    }}         | ${1}
            ${{
      visibleIndex: 1,
      sortIndex: 3
    }}           | ${{
      visibleIndex: 0,
      sortIndex: undefined
    }} | ${-1}
            ${{
      visibleIndex: 4,
      sortIndex: 2
    }}           | ${{
      visibleIndex: 2,
      sortIndex: undefined
    }} | ${-1}
            ${{
      visibleIndex: 3,
      sortIndex: undefined
    }}   | ${{
      visibleIndex: 5,
      sortIndex: 0
    }}         | ${1}
    `.it('should give a priority to column with undefined sortIndex', _ref4 => {
      let {
        columnA,
        columnB,
        expectedResult
      } = _ref4;
      const result = (0, _utils.sortOrderDelegate)(columnA, columnB);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
  (0, _globals.describe)('when sortIndex is defined for both columns', () => {
    (0, _jestEach.default)`
            columnA                                | columnB                              | expectedResult
            ${{
      visibleIndex: 1,
      sortIndex: 0
    }}   | ${{
      visibleIndex: 2,
      sortIndex: 1
    }} | ${-1}
            ${{
      visibleIndex: 1,
      sortIndex: 3
    }}   | ${{
      visibleIndex: 0,
      sortIndex: 4
    }} | ${-1}
            ${{
      visibleIndex: 4,
      sortIndex: 2
    }}   | ${{
      visibleIndex: 2,
      sortIndex: 0
    }} | ${2}
            ${{
      visibleIndex: 3,
      sortIndex: 3
    }}   | ${{
      visibleIndex: 5,
      sortIndex: 1
    }} | ${2}
    `.it('should give a priority to column with a greater sortIndex', _ref5 => {
      let {
        columnA,
        columnB,
        expectedResult
      } = _ref5;
      const result = (0, _utils.sortOrderDelegate)(columnA, columnB);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
});
