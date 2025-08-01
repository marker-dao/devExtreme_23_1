/**
* DevExtreme (esm/__internal/ui/scroll_view/utils/scroll_direction.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DIRECTION_BOTH, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from '../consts';
export class ScrollDirection {
  constructor(direction) {
    this.DIRECTION_HORIZONTAL = 'horizontal';
    this.DIRECTION_VERTICAL = 'vertical';
    this.DIRECTION_BOTH = 'both';
    this.direction = direction ?? DIRECTION_VERTICAL;
  }
  get isHorizontal() {
    return this.direction === DIRECTION_HORIZONTAL || this.direction === DIRECTION_BOTH;
  }
  get isVertical() {
    return this.direction === DIRECTION_VERTICAL || this.direction === DIRECTION_BOTH;
  }
  get isBoth() {
    return this.direction === DIRECTION_BOTH;
  }
}
