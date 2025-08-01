"use strict";

var _globals = require("@jest/globals");
var _m_data_source = require("../../../data/data_source/m_data_source");
var _m_custom_store = _interopRequireDefault(require("../../../data/m_custom_store"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('utils', () => {
  (0, _globals.describe)('normalizeDataSource', () => {
    (0, _globals.it)('JSON declaration should be wrapped to DataSource object', () => {
      const filterValue = ['id', '=', 'emp1'];
      const dataSource = (0, _utils.normalizeDataSource)({
        filter: filterValue,
        store: new _m_custom_store.default({
          load: () => {}
        })
      });
      (0, _globals.expect)(dataSource instanceof _m_data_source.DataSource).toBe(true);
      (0, _globals.expect)(dataSource === null || dataSource === void 0 ? void 0 : dataSource.filter()).toBe(filterValue);
    });
    (0, _globals.it)('Array data should be wrapped to DataSource object', () => {
      const dataSource = (0, _utils.normalizeDataSource)([{
        id: 0
      }, {
        id: 1
      }]);
      (0, _globals.expect)(dataSource instanceof _m_data_source.DataSource).toBe(true);
      (0, _globals.expect)(dataSource === null || dataSource === void 0 ? void 0 : dataSource.filter()).toBe(undefined);
    });
    (0, _globals.it)('DataSource object shouldn\'t wrapped', () => {
      const originalDataSource = new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => {}
        })
      });
      const dataSource = (0, _utils.normalizeDataSource)(originalDataSource);
      (0, _globals.expect)(dataSource).toBe(originalDataSource);
      (0, _globals.expect)(dataSource === null || dataSource === void 0 ? void 0 : dataSource.filter()).toBe(undefined);
    });
  });
  (0, _globals.describe)('loadResource', () => {
    (0, _globals.it)('should return empty array', async () => {
      (0, _globals.expect)(await (0, _utils.loadResource)(undefined)).toEqual([]);
    });
    (0, _globals.it)('should return loaded array', async () => {
      let loadCount = 0;
      const dataSource = new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => {
            loadCount += 1;
            return [1, 2];
          }
        })
      });
      await dataSource.load();
      (0, _globals.expect)(loadCount).toEqual(1);
      (0, _globals.expect)(await (0, _utils.loadResource)(dataSource)).toEqual([1, 2]);
    });
    (0, _globals.it)('should load and return array', async () => {
      let loadCount = 0;
      const dataSource = new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => {
            loadCount += 1;
            return [1, 2];
          }
        })
      });
      (0, _globals.expect)(await (0, _utils.loadResource)(dataSource)).toEqual([1, 2]);
      (0, _globals.expect)(await (0, _utils.loadResource)(dataSource)).toEqual([1, 2]);
      (0, _globals.expect)(loadCount).toEqual(1);
    });
  });
});