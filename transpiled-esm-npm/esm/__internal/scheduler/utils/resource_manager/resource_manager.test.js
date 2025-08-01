import { describe, expect, it } from '@jest/globals';
import { DataSource } from '../../../data/data_source/m_data_source';
import CustomStore from '../../../data/m_custom_store';
import { ResourceManager } from './resource_manager';
const counts = {};
const getResourceConfig = index => {
  counts[index] = 0;
  return {
    fieldExpr: index,
    label: index,
    dataSource: new DataSource({
      store: new CustomStore({
        load: () => {
          counts[index] += 1;
          return [{
            id: 1,
            text: 'one'
          }, {
            id: 2,
            text: 'two'
          }];
        }
      })
    })
  };
};
describe('ResourceManager', () => {
  describe('loadGroupResources', () => {
    it('should load dataSource only once', async () => {
      const manager = new ResourceManager([getResourceConfig('one'), getResourceConfig('two')]);
      await Promise.all([manager.loadGroupResources(['one']), manager.loadGroupResources(['one', 'two']), manager.loadGroupResources(['two'])]);
      await manager.loadGroupResources(['one', 'two']);
      expect(counts.one).toEqual(1);
      expect(counts.two).toEqual(1);
    });
    it('should load all dataSources in different requests', async () => {
      const manager = new ResourceManager([getResourceConfig('one'), getResourceConfig('two')]);
      await Promise.all([manager.loadGroupResources(['one']), manager.loadGroupResources(['two'])]);
      expect(counts.one).toEqual(1);
      expect(counts.two).toEqual(1);
    });
  });
  describe('groupCount', () => {
    it('should return correct group count after grouping', async () => {
      const manager = new ResourceManager([getResourceConfig('one'), getResourceConfig('two')]);
      await manager.loadGroupResources(['one', 'two']);
      expect(manager.groupCount()).toEqual(4);
    });
  });
  describe('groupResources', () => {
    it('should return only grouped resources', async () => {
      const manager = new ResourceManager([getResourceConfig('one'), getResourceConfig('two'), getResourceConfig('three')]);
      await manager.loadGroupResources(['one', 'two']);
      const resources = manager.groupResources();
      expect(resources.length).toBe(2);
      expect(resources[0].resourceIndex).toBe('one');
      expect(resources[1].resourceIndex).toBe('two');
      expect(resources[0].isLoaded()).toBe(true);
      expect(resources[1].isLoaded()).toBe(true);
    });
  });
});