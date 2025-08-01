/**
* DevExtreme (cjs/__internal/grids/new/grid_core/accessibility/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var utils = _interopRequireWildcard(require("./utils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('Accessibility', () => {
  (0, _globals.describe)('Utils', () => {
    (0, _globals.describe)('getCardRoleDescription', () => {
      (0, _jestEach.default)`
      isEditable  | expectedResult
      ${true}     | ${'Editable card'}
      ${false}    | ${'Card'}
`.it('should take into account if a card is editable', _ref => {
        let {
          isEditable,
          expectedResult
        } = _ref;
        const result = utils.getCardRoleDescription(isEditable);
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
    });
    (0, _globals.describe)('getCardStateDescription', () => {
      (0, _jestEach.default)`
      position                               | expectedResult
      ${{
        rowIndex: 0,
        columnIndex: 0
      }}     | ${'Row 1, column 1'}
      ${{
        rowIndex: 4,
        columnIndex: 5
      }}     | ${'Row 5, column 6'}
`.it('should take into account card\' position', _ref2 => {
        let {
          position,
          expectedResult
        } = _ref2;
        const result = utils.getCardStateDescription(position);
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
      (0, _jestEach.default)`
      position                             |isSelectable |isSelected  | expectedResult
      ${{
        rowIndex: 0,
        columnIndex: 0
      }}   |${false}     |${true}  |   ${'Row 1, column 1'}
      ${{
        rowIndex: 0,
        columnIndex: 0
      }}   |${true}      |${false} |   ${'Row 1, column 1, Not selected'}
      ${{
        rowIndex: 0,
        columnIndex: 0
      }}   |${true}      |${true}  |   ${'Row 1, column 1, Selected'}
`.it('should take into account selected state', _ref3 => {
        let {
          position,
          isSelectable,
          isSelected,
          expectedResult
        } = _ref3;
        const result = utils.getCardStateDescription(position, isSelectable, isSelected);
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
    });
    (0, _globals.describe)('getCardDescriptiveLabel', () => {
      (0, _jestEach.default)`
      hasCover    | coverId       | contentId     | expectedResult
      ${true}     | ${'coverId'}  |${'contentId'} |${'coverId contentId'}
      ${false}    | ${'coverId'}  |${'contentId'} |${'contentId'}
`.it('should take into account if a card has a cover', _ref4 => {
        let {
          hasCover,
          coverId,
          contentId,
          expectedResult
        } = _ref4;
        const result = utils.getCardDescriptiveLabel(hasCover, coverId, contentId);
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
    });
    (0, _globals.describe)('getPosition', () => {
      (0, _jestEach.default)`
      idx     | columnCount | expectedResult
      ${0}    |${1}         | ${{
        rowIndex: 0,
        columnIndex: 0
      }}
      ${3}    |${5}         | ${{
        rowIndex: 0,
        columnIndex: 3
      }}
      ${10}   |${3}         | ${{
        rowIndex: 3,
        columnIndex: 1
      }}
      ${7}    |${4}         | ${{
        rowIndex: 1,
        columnIndex: 3
      }}
`.it('should take into account if a card has a cover', _ref5 => {
        let {
          idx,
          columnCount,
          expectedResult
        } = _ref5;
        const result = utils.getPosition(idx, columnCount);
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
    });
  });
});
