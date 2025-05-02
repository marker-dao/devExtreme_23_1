import { describe, expect, it } from '@jest/globals';
import { ColumnsController } from '../columns_controller/columns_controller';
import { DataController } from '../data_controller';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { ItemsController } from './items_controller';
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = getContext(options);
  return {
    options: context.get(OptionsControllerMock),
    dataController: context.get(DataController),
    columnsController: context.get(ColumnsController),
    itemsController: context.get(ItemsController)
  };
};
describe('ItemsController', () => {
  describe('createCardInfo', () => {
    it('should process data object to cardInfo using column configuration', () => {
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
      expect(CardInfo).toMatchSnapshot();
    });
    it('should process data object to cardInfo using column configuration', () => {
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
      expect(CardInfo).toMatchSnapshot();
    });
  });
  describe('setSelectionState', () => {
    it('should update the select state of the item', () => {
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
      expect(itemsController.items.peek()).toMatchSnapshot();
    });
  });
});