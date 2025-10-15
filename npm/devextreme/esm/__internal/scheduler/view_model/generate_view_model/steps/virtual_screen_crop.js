/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/virtual_screen_crop.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
export const cropByVirtualScreen = (entities, _ref) => {
  let {
    isVirtualScrolling,
    getVirtualScreen
  } = _ref;
  if (!isVirtualScrolling) {
    return entities;
  }
  return entities.reduce((acc, item) => {
    const screen = getVirtualScreen(item.groupIndex);
    const isInsideVirtualScreen = !(item.left + item.width < screen.left || item.left > screen.right || item.top + item.height < screen.top || item.top > screen.bottom);
    if (isInsideVirtualScreen) {
      const right = item.left + item.width;
      const bottom = item.top + item.height;
      const left = Math.max(screen.left, item.left);
      const top = Math.max(screen.top, item.top);
      const width = Math.min(screen.right, right) - left;
      const height = Math.min(screen.bottom, bottom) - top;
      acc.push(_extends({}, item, {
        left,
        width,
        top,
        height
      }));
    }
    return acc;
  }, []);
};
