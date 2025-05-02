/**
* DevExtreme (esm/__internal/grids/new/card_view/context_menu/controller.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import dxContextMenu from '../../../../../ui/context_menu';
import { ColumnsController } from '../../grid_core/columns_controller/index';
import { OptionsControllerMock } from '../options_controller.mock';
import { ContextMenuControllerMock } from './controller.mock';
const setup = options => {
  const optionsController = new OptionsControllerMock(options);
  const columnsController = new ColumnsController(optionsController);
  const controller = new ContextMenuControllerMock(columnsController, optionsController);
  const container = document.createElement('div');
  // eslint-disable-next-line new-cap
  const contextMenu = new dxContextMenu(container, {
    onPositioning: controller.onPositioning
  });
  // @ts-expect-error
  controller.contextMenuRef = {
    current: contextMenu
  };
  return {
    controller,
    contextMenu
  };
};
describe('ContextMenu', () => {
  describe('Controller', () => {
    it('onContextMenuPreparing is called on getItems()', () => {
      const onContextMenuPreparing = jest.fn();
      const {
        controller
      } = setup({
        onContextMenuPreparing
      });
      controller.getItems('content', document.createElement('div'));
      expect(onContextMenuPreparing).toHaveBeenCalledTimes(1);
    });
  });
});
