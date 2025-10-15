/**
* DevExtreme (esm/__internal/grids/new/card_view/di.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setupStateManager } from '../../../core/state_manager/index';
import * as BaseContentViewModule from '../grid_core/content_view/index';
import { BaseContextMenuController } from '../grid_core/context_menu/controller';
import { register as gridCoreDIRegister } from '../grid_core/di';
import * as ContentViewModule from './content_view/index';
import { ContextMenuController } from './context_menu/controller';
import { ContextMenuView } from './context_menu/view';
import { HeaderPanelController } from './header_panel/controller';
import { HeaderPanelView } from './header_panel/view';
export function register(diContext) {
  setupStateManager({
    diContext,
    componentName: 'CardView'
  });
  gridCoreDIRegister(diContext);
  diContext.register(ContentViewModule.View);
  // TODO: fix after refactoring View Composition
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  diContext.addAlias(BaseContentViewModule.View, ContentViewModule.View);
  diContext.register(HeaderPanelController);
  diContext.register(HeaderPanelView);
  diContext.register(ContextMenuView);
  diContext.register(ContextMenuController);
  diContext.addAlias(BaseContextMenuController, ContextMenuController);
}
