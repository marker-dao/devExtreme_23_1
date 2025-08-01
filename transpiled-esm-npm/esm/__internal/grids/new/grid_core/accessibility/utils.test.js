import { describe, expect } from '@jest/globals';
import each from 'jest-each';
import * as utils from './utils';
describe('Accessibility', () => {
  describe('Utils', () => {
    describe('getCardRoleDescription', () => {
      each`
      isEditable  | expectedResult
      ${true}     | ${'Editable card'}
      ${false}    | ${'Card'}
`.it('should take into account if a card is editable', _ref => {
        let {
          isEditable,
          expectedResult
        } = _ref;
        const result = utils.getCardRoleDescription(isEditable);
        expect(result).toEqual(expectedResult);
      });
    });
    describe('getCardStateDescription', () => {
      each`
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
        expect(result).toEqual(expectedResult);
      });
      each`
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
        expect(result).toEqual(expectedResult);
      });
    });
    describe('getCardDescriptiveLabel', () => {
      each`
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
        expect(result).toEqual(expectedResult);
      });
    });
    describe('getPosition', () => {
      each`
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
        expect(result).toEqual(expectedResult);
      });
    });
  });
});