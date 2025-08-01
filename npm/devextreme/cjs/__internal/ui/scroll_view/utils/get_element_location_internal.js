/**
* DevExtreme (cjs/__internal/ui/scroll_view/utils/get_element_location_internal.js)
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
exports.getElementLocationInternal = getElementLocationInternal;
var _inflector = require("../../../../core/utils/inflector");
var _consts = require("../consts");
var _get_relative_offset = require("./get_relative_offset");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// this function tested by testcafe
/* istanbul ignore next */
function getElementLocationInternal(targetElement, direction, containerElement, scrollOffset, offset) {
  let scrollableContentClass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _consts.SCROLLABLE_CONTENT_CLASS;
  const additionalOffset = _extends({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }, offset);
  const isVertical = direction === _consts.DIRECTION_VERTICAL;
  const prop = isVertical ? 'top' : 'left';
  const inverseProp = isVertical ? 'bottom' : 'right';
  const dimension = isVertical ? 'height' : 'width';
  const containerOffsetSize = containerElement[`offset${(0, _inflector.titleize)(dimension)}`];
  const containerClientSize = containerElement[`client${(0, _inflector.titleize)(dimension)}`];
  const containerSize = containerElement.getBoundingClientRect()[dimension];
  const elementSize = targetElement.getBoundingClientRect()[dimension];
  let scale = 1;
  // For support zooming using styles: transform = scale(0.33) or zoom = 0.33
  if (Math.abs(containerSize - containerOffsetSize) > 1) {
    scale = containerSize / containerOffsetSize;
  }
  // T162489
  const relativeElementOffset = (0, _get_relative_offset.getRelativeOffset)(scrollableContentClass, targetElement)[prop] / scale;
  const containerScrollOffset = scrollOffset[prop];
  const relativeStartOffset = containerScrollOffset - relativeElementOffset + additionalOffset[prop];
  const relativeEndOffset = containerScrollOffset - relativeElementOffset - elementSize / scale + containerClientSize - additionalOffset[inverseProp];
  if (relativeStartOffset <= 0 && relativeEndOffset >= 0) {
    return containerScrollOffset;
  }
  return containerScrollOffset - (Math.abs(relativeStartOffset) > Math.abs(relativeEndOffset) ? relativeEndOffset : relativeStartOffset);
}
