/**
* DevExtreme (cjs/__internal/ui/scroll_view/utils/scroll_direction.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollDirection = void 0;
var _consts = require("../consts");
class ScrollDirection {
  constructor(direction) {
    this.DIRECTION_HORIZONTAL = 'horizontal';
    this.DIRECTION_VERTICAL = 'vertical';
    this.DIRECTION_BOTH = 'both';
    this.direction = direction ?? _consts.DIRECTION_VERTICAL;
  }
  get isHorizontal() {
    return this.direction === _consts.DIRECTION_HORIZONTAL || this.direction === _consts.DIRECTION_BOTH;
  }
  get isVertical() {
    return this.direction === _consts.DIRECTION_VERTICAL || this.direction === _consts.DIRECTION_BOTH;
  }
  get isBoth() {
    return this.direction === _consts.DIRECTION_BOTH;
  }
}
exports.ScrollDirection = ScrollDirection;
