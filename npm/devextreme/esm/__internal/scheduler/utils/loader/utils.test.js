/**
* DevExtreme (esm/__internal/scheduler/utils/loader/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { DataSource } from '../../../data/data_source/m_data_source';
import CustomStore from '../../../data/m_custom_store';
import { loadResource, normalizeDataSource } from './utils';
describe('utils', () => {
  describe('normalizeDataSource', () => {
    it('JSON declaration should be wrapped to DataSource object', () => {
      const filterValue = ['id', '=', 'emp1'];
      const dataSource = normalizeDataSource({
        filter: filterValue,
        store: new CustomStore({
          load: () => {}
        })
      });
      expect(dataSource instanceof DataSource).toBe(true);
      expect(dataSource === null || dataSource === void 0 ? void 0 : dataSource.filter()).toBe(filterValue);
    });
    it('Array data should be wrapped to DataSource object', () => {
      const dataSource = normalizeDataSource([{
        id: 0
      }, {
        id: 1
      }]);
      expect(dataSource instanceof DataSource).toBe(true);
      expect(dataSource === null || dataSource === void 0 ? void 0 : dataSource.filter()).toBe(undefined);
    });
    it('DataSource object shouldn\'t wrapped', () => {
      const originalDataSource = new DataSource({
        store: new CustomStore({
          load: () => {}
        })
      });
      const dataSource = normalizeDataSource(originalDataSource);
      expect(dataSource).toBe(originalDataSource);
      expect(dataSource === null || dataSource === void 0 ? void 0 : dataSource.filter()).toBe(undefined);
    });
  });
  describe('loadResource', () => {
    it('should return empty array', async () => {
      expect(await loadResource(undefined)).toEqual([]);
    });
    it('should return loaded array', async () => {
      let loadCount = 0;
      const dataSource = new DataSource({
        store: new CustomStore({
          load: () => {
            loadCount += 1;
            return [1, 2];
          }
        })
      });
      await dataSource.load();
      expect(loadCount).toEqual(1);
      expect(await loadResource(dataSource)).toEqual([1, 2]);
    });
    it('should load and return array', async () => {
      let loadCount = 0;
      const dataSource = new DataSource({
        store: new CustomStore({
          load: () => {
            loadCount += 1;
            return [1, 2];
          }
        })
      });
      expect(await loadResource(dataSource)).toEqual([1, 2]);
      expect(await loadResource(dataSource)).toEqual([1, 2]);
      expect(loadCount).toEqual(1);
    });
  });
});
