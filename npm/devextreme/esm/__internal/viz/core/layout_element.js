/**
* DevExtreme (esm/__internal/viz/core/layout_element.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable radix */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { noop } from '../../../core/utils/common';
import { clone } from '../../../core/utils/object';
const _round = Math.round;
const defaultOffset = {
  horizontal: 0,
  vertical: 0
};
const alignFactors = {
  center: 0.5,
  right: 1,
  bottom: 1,
  left: 0,
  top: 0
};
function LayoutElement(options) {
  this._options = options;
}
LayoutElement.prototype = {
  constructor: LayoutElement,
  position(options) {
    const that = this;
    const ofBBox = options.of.getLayoutOptions();
    const myBBox = that.getLayoutOptions();
    const {
      at
    } = options;
    const {
      my
    } = options;
    const offset = options.offset || defaultOffset;
    const shiftX = -alignFactors[my.horizontal] * myBBox.width + ofBBox.x + alignFactors[at.horizontal] * ofBBox.width + parseInt(offset.horizontal);
    const shiftY = -alignFactors[my.vertical] * myBBox.height + ofBBox.y + alignFactors[at.vertical] * ofBBox.height + parseInt(offset.vertical);
    that.shift(_round(shiftX), _round(shiftY));
  },
  getLayoutOptions: noop
};
function WrapperLayoutElement(renderElement, bBox) {
  this._renderElement = renderElement;
  this._cacheBBox = bBox;
}
const wrapperLayoutElementPrototype = WrapperLayoutElement.prototype = clone(LayoutElement.prototype);
wrapperLayoutElementPrototype.constructor = WrapperLayoutElement;
wrapperLayoutElementPrototype.getLayoutOptions = function () {
  return this._cacheBBox || this._renderElement.getBBox();
};
wrapperLayoutElementPrototype.shift = function (shiftX, shiftY) {
  const bBox = this.getLayoutOptions();
  this._renderElement.move(_round(shiftX - bBox.x), _round(shiftY - bBox.y));
};
export { LayoutElement, WrapperLayoutElement };
