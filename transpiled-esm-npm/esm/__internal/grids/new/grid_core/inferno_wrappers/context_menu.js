import dxContextMenu from '../../../../../ui/context_menu';
import { InfernoWrapper } from './widget_wrapper';
export class ContextMenu extends InfernoWrapper {
  constructor() {
    super(...arguments);
    this.contentRef = {};
  }
  getComponentFabric() {
    return dxContextMenu;
  }
}