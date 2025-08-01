/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { normalizeColumn } from '../columns_controller/columns_controller.mock';
import { normalizeFilterWithSelectors } from './utils';
describe('normalizeFilterWithSelectors', () => {
  const columns = [normalizeColumn({
    dataField: 'myColumn'
  })];
  const filter = ['myColumn', '=', 2];
  describe('when remoteOperations=true', () => {
    it('should return filter as is', () => {
      const res = normalizeFilterWithSelectors(filter, columns, true);
      expect(res).toStrictEqual(filter);
    });
  });
  describe('when remoteOperations=false', () => {
    it('should return replace column dataField with selector', () => {
      const res = normalizeFilterWithSelectors(filter, columns, false);
      expect(res).toStrictEqual([expect.any(Function), '=', 2]);
      expect(res[0]({
        myColumn: 100
      })).toBe(100);
    });
  });
});
