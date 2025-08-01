/**
* DevExtreme (esm/__internal/ui/scroll_view/utils/get_relative_offset.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function getRelativeOffset(targetElementClass, sourceElement) {
  const offset = {
    left: 0,
    top: 0
  };
  let element = sourceElement;
  while ((_element = element) !== null && _element !== void 0 && _element.offsetParent && !element.classList.contains(targetElementClass)) {
    var _element;
    const parentElement = element.offsetParent;
    const elementRect = element.getBoundingClientRect();
    const parentElementRect = parentElement.getBoundingClientRect();
    offset.left += elementRect.left - parentElementRect.left;
    offset.top += elementRect.top - parentElementRect.top;
    element = element.offsetParent;
  }
  return offset;
}
