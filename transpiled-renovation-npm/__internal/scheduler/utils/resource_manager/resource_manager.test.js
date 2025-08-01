"use strict";

var _globals = require("@jest/globals");
var _m_data_source = require("../../../data/data_source/m_data_source");
var _m_custom_store = _interopRequireDefault(require("../../../data/m_custom_store"));
var _resource_manager = require("./resource_manager");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const counts = {};
const getResourceConfig = index => {
  counts[index] = 0;
  return {
    fieldExpr: index,
    label: index,
    dataSource: new _m_data_source.DataSource({
      store: new _m_custom_store.default({
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
(0, _globals.describe)('ResourceManager', () => {
  (0, _globals.describe)('loadGroupResources', () => {
    (0, _globals.it)('should load dataSource only once', async () => {
      const manager = new _resource_manager.ResourceManager([getResourceConfig('one'), getResourceConfig('two')]);
      await Promise.all([manager.loadGroupResources(['one']), manager.loadGroupResources(['one', 'two']), manager.loadGroupResources(['two'])]);
      await manager.loadGroupResources(['one', 'two']);
      (0, _globals.expect)(counts.one).toEqual(1);
      (0, _globals.expect)(counts.two).toEqual(1);
    });
    (0, _globals.it)('should load all dataSources in different requests', async () => {
      const manager = new _resource_manager.ResourceManager([getResourceConfig('one'), getResourceConfig('two')]);
      await Promise.all([manager.loadGroupResources(['one']), manager.loadGroupResources(['two'])]);
      (0, _globals.expect)(counts.one).toEqual(1);
      (0, _globals.expect)(counts.two).toEqual(1);
    });
  });
  (0, _globals.describe)('groupCount', () => {
    (0, _globals.it)('should return correct group count after grouping', async () => {
      const manager = new _resource_manager.ResourceManager([getResourceConfig('one'), getResourceConfig('two')]);
      await manager.loadGroupResources(['one', 'two']);
      (0, _globals.expect)(manager.groupCount()).toEqual(4);
    });
  });
  (0, _globals.describe)('groupResources', () => {
    (0, _globals.it)('should return only grouped resources', async () => {
      const manager = new _resource_manager.ResourceManager([getResourceConfig('one'), getResourceConfig('two'), getResourceConfig('three')]);
      await manager.loadGroupResources(['one', 'two']);
      const resources = manager.groupResources();
      (0, _globals.expect)(resources.length).toBe(2);
      (0, _globals.expect)(resources[0].resourceIndex).toBe('one');
      (0, _globals.expect)(resources[1].resourceIndex).toBe('two');
      (0, _globals.expect)(resources[0].isLoaded()).toBe(true);
      (0, _globals.expect)(resources[1].isLoaded()).toBe(true);
    });
  });
});