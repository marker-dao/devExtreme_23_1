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