/**
* DevExtreme (esm/__internal/grids/new/grid_core/pager/pager.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Pager } from '../inferno_wrappers/pager';
export function PagerView(props) {
  return props.visible ? normalizeProps(createComponentVNode(2, Pager, _extends({}, props))) : createFragment();
}
