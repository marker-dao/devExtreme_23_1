/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/data_controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _data = require("../../../../../common/data");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _data_controller = require("./data_controller");
const setup = options => {
  const context = (0, _di.getContext)(options ?? {});
  return {
    optionsController: context.get(_options_controller.OptionsControllerMock),
    dataController: context.get(_data_controller.DataController)
  };
};
const generateData = length => [...new Array(length)].map((_, index) => ({
  field: `test_${index}`
}));
(0, _globals.describe)('DataController', () => {
  (0, _globals.describe)('pageIndex', () => {
    (0, _globals.it)('does not change after pageSize increased and pageIndex < pageCount', async () => {
      const {
        optionsController,
        dataController
      } = setup({
        dataSource: generateData(20),
        paging: {
          pageIndex: 1,
          pageSize: 5
        }
      });
      await dataController.waitLoaded();
      optionsController.option('paging.pageSize', 10);
      await dataController.waitLoaded();
      (0, _globals.expect)(optionsController.oneWay('paging.pageIndex').peek()).toEqual(1);
    });
    (0, _globals.it)('set to last page after pageSize increased and pageIndex >= pageCount', async () => {
      const {
        optionsController,
        dataController
      } = setup({
        dataSource: generateData(20),
        paging: {
          pageIndex: 3,
          pageSize: 5
        }
      });
      await dataController.waitLoaded();
      optionsController.option('paging.pageSize', 10);
      await dataController.waitLoaded();
      (0, _globals.expect)(optionsController.oneWay('paging.pageIndex').peek()).toEqual(1);
    });
    (0, _globals.it)('set to last and only page after pageSize increased and pageIndex >= pageCount == 1', async () => {
      const {
        optionsController,
        dataController
      } = setup({
        dataSource: generateData(20),
        paging: {
          pageIndex: 1,
          pageSize: 5
        }
      });
      await dataController.waitLoaded();
      optionsController.option('paging.pageSize', 20);
      await dataController.waitLoaded();
      (0, _globals.expect)(optionsController.oneWay('paging.pageIndex').peek()).toEqual(0);
    });
  });
  (0, _globals.describe)('totalCount is not specified', () => {
    (0, _globals.it)('with CustomStore', async () => {
      const {
        dataController
      } = setup({
        dataSource: new _data.CustomStore({
          load: () => generateData(10)
        })
      });
      await dataController.waitLoaded();
      (0, _globals.expect)(dataController.dataSource.value.totalCount()).toEqual(10);
    });
    (0, _globals.it)('with CustomStore and filter is applied', async () => {
      const {
        dataController
      } = setup({
        dataSource: new _data.CustomStore({
          load: () => generateData(10)
        }),
        columns: ['field'],
        filterValue: ['field', 'anyof', ['test_0', 'test_1']]
      });
      await dataController.waitLoaded();
      (0, _globals.expect)(dataController.dataSource.value.totalCount()).toEqual(2);
    });
  });
  (0, _globals.describe)('regressions', () => {
    (0, _globals.it)('should work good with odata store', async () => {
      const {
        dataController
      } = setup({
        dataSource: {
          store: {
            type: 'odata',
            version: 2,
            url: 'https://js.devexpress.com/Demos/DevAV/odata/Products',
            key: 'Product_ID'
          },
          select: ['Product_ID', 'Product_Name', 'Product_Cost', 'Product_Sale_Price', 'Product_Retail_Price', 'Product_Current_Inventory'],
          filter: ['Product_Current_Inventory', '>', 0]
        },
        keyExpr: 'Product_ID',
        columns: ['Product_ID', 'Product_Name'],
        paging: {
          pageSize: 3
        }
      });
      const getCurrentItemIds = () => dataController.items.value.map(item => item.Product_ID);
      await dataController.waitLoaded();
      (0, _globals.expect)(dataController.pageIndex.value).toBe(0);
      (0, _globals.expect)(getCurrentItemIds()).toEqual([1, 2, 4]);
      dataController.pageIndex.value = 1;
      await dataController.waitLoaded();
      (0, _globals.expect)(dataController.pageIndex.value).toBe(1);
      (0, _globals.expect)(getCurrentItemIds()).toEqual([5, 6, 7]);
    });
  });
});
