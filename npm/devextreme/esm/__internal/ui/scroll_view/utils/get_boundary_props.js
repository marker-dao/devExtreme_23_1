/**
* DevExtreme (esm/__internal/ui/scroll_view/utils/get_boundary_props.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getScrollLeftMax } from './get_scroll_left_max';
import { getScrollTopMax } from './get_scroll_top_max';
import { ScrollDirection } from './scroll_direction';
export function isReachedLeft(scrollOffsetLeft, epsilon) {
  return Math.round(scrollOffsetLeft) <= epsilon;
}
export function isReachedRight(element, scrollOffsetLeft, epsilon) {
  return Math.round(getScrollLeftMax(element) - scrollOffsetLeft) <= epsilon;
}
export function isReachedTop(scrollOffsetTop, epsilon) {
  return Math.round(scrollOffsetTop) <= epsilon;
}
export function isReachedBottom(element, scrollOffsetTop, pocketHeight, epsilon) {
  return Math.round(getScrollTopMax(element) - scrollOffsetTop - pocketHeight) <= epsilon;
}
export function getBoundaryProps(direction, scrollOffset, element) {
  let pocketHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  const {
    left,
    top
  } = scrollOffset;
  const boundaryProps = {};
  const {
    isHorizontal,
    isVertical
  } = new ScrollDirection(direction);
  if (isHorizontal) {
    boundaryProps.reachedLeft = isReachedLeft(left, 0);
    boundaryProps.reachedRight = isReachedRight(element, left, 0);
  }
  if (isVertical) {
    boundaryProps.reachedTop = isReachedTop(top, 0);
    boundaryProps.reachedBottom = isReachedBottom(element, top, pocketHeight, 0);
  }
  return boundaryProps;
}
