import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Pager } from '../inferno_wrappers/pager';
export function PagerView(props) {
  return props.visible ? normalizeProps(createComponentVNode(2, Pager, Object.assign({}, props))) : createFragment();
}