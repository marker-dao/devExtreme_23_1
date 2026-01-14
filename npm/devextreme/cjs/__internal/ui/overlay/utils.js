/**
* DevExtreme (cjs/__internal/ui/overlay/utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementMaxHeightByWindow = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _m_window = require("../../core/utils/m_window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WINDOW_HEIGHT_PERCENT = 0.9;
const getElementMaxHeightByWindow = ($element, startLocation) => {
  const offset = $element.offset();
  // offset can be undefined if the element is not inserted into the DOM
  // or the element does not exist
  if (offset === undefined) {
    return undefined;
  }
  const $window = (0, _renderer.default)((0, _m_window.getWindow)());
  const {
    top: elementOffset
  } = offset;
  let actualOffset = 0;
  // @ts-expect-error scrollTop should be typed correctly with return type
  const windowScrollTop = $window.scrollTop();
  const windowHeight = (0, _size.getInnerHeight)($window);
  if ((0, _type.isNumeric)(startLocation)) {
    if (startLocation < elementOffset) {
      return elementOffset - startLocation;
    }
    actualOffset = windowHeight - startLocation + windowScrollTop;
  } else {
    const offsetTop = elementOffset - windowScrollTop;
    const offsetBottom = windowHeight - offsetTop - (0, _size.getOuterHeight)($element);
    actualOffset = Math.max(offsetTop, offsetBottom);
  }
  return actualOffset * WINDOW_HEIGHT_PERCENT;
};
exports.getElementMaxHeightByWindow = getElementMaxHeightByWindow;
