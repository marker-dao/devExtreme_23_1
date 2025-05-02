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