/**
* DevExtreme (cjs/__internal/grids/new/grid_core/items_controller/items_controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _format_helper = _interopRequireDefault(require("../../../../../format_helper"));
var _columns_controller = require("../columns_controller/columns_controller");
var _data_controller = require("../data_controller");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _items_controller = require("./items_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = (0, _di.getContext)(options);
  return {
    options: context.get(_options_controller.OptionsControllerMock),
    dataController: context.get(_data_controller.DataController),
    columnsController: context.get(_columns_controller.ColumnsController),
    itemsController: context.get(_items_controller.ItemsController)
  };
};
(0, _globals.describe)('ItemsController', () => {
  (0, _globals.describe)('createCardInfo', () => {
    (0, _globals.it)('should process data object to cardInfo using column configuration', () => {
      const dataObject = {
        id: 1,
        a: 'my a value',
        b: 'my b value'
      };
      const {
        columnsController,
        itemsController
      } = setup({
        keyExpr: 'id',
        dataSource: [dataObject],
        columns: ['a', {
          dataField: 'b'
        }]
      });
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo).toMatchSnapshot();
    });
    (0, _globals.it)('should process data object to cardInfo using column configuration', () => {
      const dataObject = {
        id: 1,
        a: 'my a value',
        b: 'my b value'
      };
      const {
        columnsController,
        itemsController
      } = setup({
        keyExpr: 'id',
        dataSource: [dataObject],
        columns: ['a', {
          dataField: 'b'
        }]
      });
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0, [1]);
      (0, _globals.expect)(CardInfo).toMatchSnapshot();
    });
    (0, _globals.it)('should parse number value correctly', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          dataField: 'a',
          dataType: 'number'
        }]
      });
      const dataObject = {
        a: '123'
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields[0].value).toBe(123);
    });
    (0, _globals.it)('should parse date value correctly', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          dataField: 'a',
          dataType: 'date'
        }]
      });
      const dateString = '2024-12-25T00:00:00.000Z';
      const dataObject = {
        a: dateString
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields[0].value).toEqual(new Date(dateString));
    });
    (0, _globals.it)('should fallback to raw value if parseValue returns undefined', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          dataField: 'a',
          dataType: 'number'
        }]
      });
      const dataObject = {
        a: 'abc'
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields[0].value).toBe('abc');
    });
    (0, _globals.it)('should infer dataType as "number" if value is a number and dataType is not set', () => {
      const {
        columnsController
      } = setup({
        columns: [{
          dataField: 'a'
        }],
        dataSource: [{
          a: 456
        }]
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns[0].dataType).toBe('number');
    });
    (0, _globals.it)('should infer dataType as "date" if value is a Date object and dataType is not set', () => {
      const dateObject = new Date('2025-01-01');
      const {
        columnsController
      } = setup({
        columns: [{
          dataField: 'a'
        }],
        dataSource: [{
          a: dateObject
        }]
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns[0].dataType).toBe('date');
    });
    (0, _globals.it)('should infer dataType as "boolean" if value is a boolean and dataType is not set', () => {
      const {
        columnsController
      } = setup({
        columns: [{
          dataField: 'a'
        }],
        dataSource: [{
          a: true
        }]
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns[0].dataType).toBe('boolean');
    });
    (0, _globals.it)('should format datetime value using shortDateShortTime format', () => {
      const dateObject = new Date('2025-05-05T14:30:00Z');
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          dataField: 'a',
          dataType: 'datetime'
        }],
        dataSource: [{
          a: dateObject
        }]
      });
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo({
        a: dateObject
      }, columns, 0);
      const expectedResult = _format_helper.default.format(dateObject, 'shortDateShortTime');
      (0, _globals.expect)(CardInfo.fields[0].text).toMatch(expectedResult);
    });
  });
  (0, _globals.describe)('setSelectionState', () => {
    (0, _globals.it)('should update the select state of the item', () => {
      const {
        itemsController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          a: 'my a value'
        }]
      });
      itemsController.setSelectionState([1]);
      (0, _globals.expect)(itemsController.items.peek()).toMatchSnapshot();
    });
  });
});
