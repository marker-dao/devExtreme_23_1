/**
* DevExtreme (esm/__internal/grids/new/card_view/di.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BaseContextMenuController } from '../grid_core/context_menu/controller';
import { register as gridCoreDIRegister } from '../grid_core/di';
import * as ContentViewModule from './content_view/index';
import { ContextMenuController } from './context_menu/controller';
import { ContextMenuView } from './context_menu/view';
import { HeaderPanelView } from './header_panel/view';
export function register(diContext) {
  gridCoreDIRegister(diContext);
  diContext.register(ContentViewModule.View);
  diContext.register(HeaderPanelView);
  diContext.register(ContextMenuView);
  diContext.register(ContextMenuController);
  diContext.register(BaseContextMenuController, ContextMenuController);
}
