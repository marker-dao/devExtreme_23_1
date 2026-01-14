/**
* DevExtreme (esm/__internal/ui/overlay/utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { getInnerHeight, getOuterHeight } from '../../../core/utils/size';
import { isNumeric } from '../../../core/utils/type';
import { getWindow } from '../../core/utils/m_window';
const WINDOW_HEIGHT_PERCENT = 0.9;
export const getElementMaxHeightByWindow = ($element, startLocation) => {
  const offset = $element.offset();
  // offset can be undefined if the element is not inserted into the DOM
  // or the element does not exist
  if (offset === undefined) {
    return undefined;
  }
  const $window = $(getWindow());
  const {
    top: elementOffset
  } = offset;
  let actualOffset = 0;
  // @ts-expect-error scrollTop should be typed correctly with return type
  const windowScrollTop = $window.scrollTop();
  const windowHeight = getInnerHeight($window);
  if (isNumeric(startLocation)) {
    if (startLocation < elementOffset) {
      return elementOffset - startLocation;
    }
    actualOffset = windowHeight - startLocation + windowScrollTop;
  } else {
    const offsetTop = elementOffset - windowScrollTop;
    const offsetBottom = windowHeight - offsetTop - getOuterHeight($element);
    actualOffset = Math.max(offsetTop, offsetBottom);
  }
  return actualOffset * WINDOW_HEIGHT_PERCENT;
};
