/**
* DevExtreme (esm/__internal/grids/new/card_view/context_menu/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BaseContextMenuView } from '../../grid_core/context_menu/view';
import { ContextMenuController } from './controller';
export class ContextMenuView extends BaseContextMenuView {
  constructor(controller) {
    super(controller);
    this.controller = controller;
  }
}
ContextMenuView.dependencies = [ContextMenuController];
