"use strict";

var _globals = require("@jest/globals");
var _columns_controller = require("../columns_controller/columns_controller");
var _data_controller = require("../data_controller");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _items_controller = require("./items_controller");
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