/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { getVisibleIndexes, normalizeColumn } from './utils';
describe('getVisibleIndexes', () => {
  it('should create visible indexes if not present', () => {
    expect(getVisibleIndexes([undefined, undefined, undefined, undefined])).toEqual([0, 1, 2, 3]);
  });
  it('should preserve visible indexes if present', () => {
    expect(getVisibleIndexes([3, 1, 0, 2])).toEqual([3, 1, 0, 2]);
  });
  it('should fill in missing indexes', () => {
    expect(getVisibleIndexes([3, undefined, 0, undefined])).toEqual([3, 1, 0, 2]);
  });
});
describe('normalizeColumn', () => {
  describe('when column is unbound', () => {
    const column = normalizeColumn({
      name: 'asd',
      visibleIndex: 0
    });
    it('should have allowSorting=false by default', () => {
      expect(column.allowSorting).toBe(false);
    });
    it('should have allowFiltering=false by default', () => {
      expect(column.allowSorting).toBe(false);
    });
    it('should have allowHeaderFiltering=false by default', () => {
      expect(column.allowSorting).toBe(false);
    });
  });
});
