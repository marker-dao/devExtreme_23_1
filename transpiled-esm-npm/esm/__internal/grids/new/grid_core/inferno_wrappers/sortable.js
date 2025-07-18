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