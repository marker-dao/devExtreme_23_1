/**
* DevExtreme (esm/__internal/grids/new/card_view/context_menu/controller.mock.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ContextMenuController } from '.';
export class ContextMenuControllerMock extends ContextMenuController {
  getItems(view, targetElement) {
    let contextInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return super.getItems(view, targetElement, contextInfo);
  }
}
