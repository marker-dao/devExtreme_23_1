/**
* DevExtreme (esm/__internal/scheduler/utils/loader/resource_loader.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { DataSource } from '../../../data/data_source/m_data_source';
import CustomStore from '../../../data/m_custom_store';
import { ResourceLoader } from './resource_loader';
const assigneeData = [{
  guid: 1,
  name: 'Samantha Bright',
  mainColor: '#727bd2'
}, {
  guid: 2,
  name: 'John Heart',
  mainColor: '#32c9ed'
}];
const getConfig = dataSource => ({
  fieldExpr: 'assigneeId',
  allowMultiple: true,
  dataSource,
  valueExpr: 'guid',
  colorExpr: 'mainColor',
  displayExpr: 'name',
  label: 'Assignee'
});
describe('resource loader', () => {
  describe('Array', () => {
    it('should unwrap resource data', async () => {
      const loader = new ResourceLoader(getConfig(assigneeData));
      expect(loader.isLoaded()).toBe(false);
      await loader.load();
      expect(loader.data).toEqual(assigneeData);
      expect(loader.items).toEqual([{
        id: 1,
        text: 'Samantha Bright',
        color: '#727bd2'
      }, {
        id: 2,
        text: 'John Heart',
        color: '#32c9ed'
      }]);
      expect(loader.isLoaded()).toBe(true);
    });
  });
  describe('DataSource', () => {
    it('should unwrap resource data', async () => {
      const loader = new ResourceLoader(getConfig(new DataSource({
        store: new CustomStore({
          load: () => assigneeData
        })
      })));
      expect(loader.isLoaded()).toBe(false);
      await loader.load();
      expect(loader.data).toEqual(assigneeData);
      expect(loader.items).toEqual([{
        id: 1,
        text: 'Samantha Bright',
        color: '#727bd2'
      }, {
        id: 2,
        text: 'John Heart',
        color: '#32c9ed'
      }]);
      expect(loader.isLoaded()).toBe(true);
    });
  });
});
