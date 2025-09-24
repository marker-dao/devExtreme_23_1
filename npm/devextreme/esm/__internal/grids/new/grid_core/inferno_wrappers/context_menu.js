/**
* DevExtreme (esm/__internal/grids/new/grid_core/inferno_wrappers/context_menu.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
