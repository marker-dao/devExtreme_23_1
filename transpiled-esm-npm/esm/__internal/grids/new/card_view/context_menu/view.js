import { BaseContextMenuView } from '../../grid_core/context_menu/view';
import { ContextMenuController } from './controller';
export class ContextMenuView extends BaseContextMenuView {
  constructor(controller) {
    super(controller);
    this.controller = controller;
  }
}
ContextMenuView.dependencies = [ContextMenuController];