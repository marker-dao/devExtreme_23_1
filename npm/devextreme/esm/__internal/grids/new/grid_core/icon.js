/**
* DevExtreme (esm/__internal/grids/new/grid_core/icon.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
import { combineClasses } from '../../../core/utils/combine_classes';
export function Icon(props) {
  const classes = combineClasses({
    'dx-icon': true,
    [`dx-icon-${props.name}`]: true,
    [String(props.className)]: !!props.className
  });
  return createVNode(1, "div", classes, null, 1, {
    "aria-label": props['aria-label'],
    "role": props['aria-label'] ? 'img' : undefined,
    "onClick": props.onClick
  });
}
