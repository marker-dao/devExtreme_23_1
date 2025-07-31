/**
* DevExtreme (esm/__internal/grids/new/grid_core/inferno_wrappers/sortable.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
import dxSortable from '../../../../../ui/sortable';
import { InfernoWrapper } from './widget_wrapper';
export class Sortable extends InfernoWrapper {
  render() {
    return createVNode(1, "div", this.props.className, this.props.children, 0, null, null, this.ref);
  }
  getComponentFabric() {
    return dxSortable;
  }
}
