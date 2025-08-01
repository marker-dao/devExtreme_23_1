/**
* DevExtreme (cjs/__internal/scheduler/utils/loader/resource_loader.test.js)
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
var _resource_loader = require("./resource_loader");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
(0, _globals.describe)('resource loader', () => {
  (0, _globals.describe)('Array', () => {
    (0, _globals.it)('should unwrap resource data', async () => {
      const loader = new _resource_loader.ResourceLoader(getConfig(assigneeData));
      (0, _globals.expect)(loader.isLoaded()).toBe(false);
      await loader.load();
      (0, _globals.expect)(loader.data).toEqual(assigneeData);
      (0, _globals.expect)(loader.items).toEqual([{
        id: 1,
        text: 'Samantha Bright',
        color: '#727bd2'
      }, {
        id: 2,
        text: 'John Heart',
        color: '#32c9ed'
      }]);
      (0, _globals.expect)(loader.isLoaded()).toBe(true);
    });
  });
  (0, _globals.describe)('DataSource', () => {
    (0, _globals.it)('should unwrap resource data', async () => {
      const loader = new _resource_loader.ResourceLoader(getConfig(new _m_data_source.DataSource({
        store: new _m_custom_store.default({
          load: () => assigneeData
        })
      })));
      (0, _globals.expect)(loader.isLoaded()).toBe(false);
      await loader.load();
      (0, _globals.expect)(loader.data).toEqual(assigneeData);
      (0, _globals.expect)(loader.items).toEqual([{
        id: 1,
        text: 'Samantha Bright',
        color: '#727bd2'
      }, {
        id: 2,
        text: 'John Heart',
        color: '#32c9ed'
      }]);
      (0, _globals.expect)(loader.isLoaded()).toBe(true);
    });
  });
});
