/**
* DevExtreme (esm/__internal/ui/scroll_view/utils/get_scrollbar_size.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function getScrollbarSize(element, direction) {
  if (direction === 'vertical') {
    return element.offsetWidth - element.clientWidth;
  }
  return element.offsetHeight - element.clientHeight;
}
