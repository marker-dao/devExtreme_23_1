/**
* DevExtreme (cjs/__internal/scheduler/utils/loader/loader.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _m_data_source = require("../../../data/data_source/m_data_source");
var _m_custom_store = _interopRequireDefault(require("../../../data/m_custom_store"));
var _loader = require("./loader");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const data = ['one', 'two'];
const transformedData = ['one_transformed', 'two_transformed'];
class BaseLoader extends _loader.Loader {
  constructor(config) {
    super(config, {
      pageSize: 0
    });
    this.onInit();
  }
  onLoadTransform(items) {
    return items.map(item => `${item}_transformed`);
  }
  onLoadError() {}
  onChange() {}
}
(0, _globals.describe)('resource loader', () => {
  (0, _globals.describe)('Array', () => {
    (0, _globals.it)('should unwrap resources on load and dispose datasource', async () => {
      var _loader$dataSource;
      const loader = new BaseLoader({
        dataSource: data
      });
      await loader.load();
      (0, _globals.expect)(loader.items).toEqual(transformedData);
      (0, _globals.expect)(loader.data).toEqual(data);
      loader.dispose();
      (0, _globals.expect)(loader.items).toEqual([]);
      (0, _globals.expect)(loader.data).toEqual([]);
      (0, _globals.expect)((_loader$dataSource = loader.dataSource) === null || _loader$dataSource === void 0 ? void 0 : _loader$dataSource.items()).toBe(undefined);
    });
  });
  (0, _globals.describe)('DataSource', () => {
    (0, _globals.it)('should unwrap resources on load and shouldn\'t dispose external datasource', async () => {
      var _loader$dataSource2;
      const dataSource = new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => data
        })
      });
      const loader = new BaseLoader({
        dataSource
      });
      await loader.load();
      (0, _globals.expect)(loader.items).toEqual(transformedData);
      (0, _globals.expect)(loader.data).toEqual(data);
      loader.dispose();
      (0, _globals.expect)(loader.items).toEqual([]);
      (0, _globals.expect)(loader.data).toEqual([]);
      (0, _globals.expect)((_loader$dataSource2 = loader.dataSource) === null || _loader$dataSource2 === void 0 ? void 0 : _loader$dataSource2.items()).toBe(data);
    });
    (0, _globals.it)('should load resource data only once', async () => {
      let loadCount = 0;
      const dataSource = new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => {
            loadCount += 1;
            return data;
          }
        })
      });
      const loader = new BaseLoader({
        dataSource
      });
      (0, _globals.expect)(loader.isLoaded()).toBe(false);
      await Promise.all([loader.load(), loader.load()]);
      await loader.load();
      (0, _globals.expect)(loader.data).toEqual(data);
      (0, _globals.expect)(loader.items).toEqual(transformedData);
      (0, _globals.expect)(loader.isLoaded()).toBe(true);
      (0, _globals.expect)(loadCount).toBe(1);
    });
    (0, _globals.it)('should fill items initially for loaded dataSource', async () => {
      const dataSource = new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => data
        })
      });
      await dataSource.load();
      const loader = new BaseLoader({
        dataSource
      });
      (0, _globals.expect)(loader.isLoaded()).toBe(true);
      (0, _globals.expect)(loader.data).toEqual(data);
      (0, _globals.expect)(loader.items).toEqual(transformedData);
    });
    (0, _globals.it)('should fill items for dataSource loaded externally', async () => {
      const dataSource = new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => data
        })
      });
      const loader = new BaseLoader({
        dataSource
      });
      await dataSource.load();
      (0, _globals.expect)(loader.isLoaded()).toBe(true);
      (0, _globals.expect)(loader.data).toEqual(data);
      (0, _globals.expect)(loader.items).toEqual(transformedData);
    });
  });
});
