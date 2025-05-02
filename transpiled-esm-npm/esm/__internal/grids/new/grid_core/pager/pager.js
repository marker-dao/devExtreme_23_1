import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Pager } from '../inferno_wrappers/pager';
export function PagerView(props) {
  return props.visible ? normalizeProps(createComponentVNode(2, Pager, _extends({}, props))) : createFragment();
}