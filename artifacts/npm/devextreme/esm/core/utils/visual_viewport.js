/**
* DevExtreme (esm/core/utils/visual_viewport.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { hasWindow, getWindow } from '../../core/utils/window';
import domAdapter from '../dom_adapter';
var visualViewportEventMap = {
  resize: 'resize',
  scroll: 'scroll'
};
var getVisualViewport = () => {
  var isWindowAvailable = hasWindow();
  if (isWindowAvailable) {
    var {
      visualViewport
    } = getWindow();
    return visualViewport;
  }
  return null;
};
var hasVisualViewport = () => {
  var visualViewport = getVisualViewport();
  return !!visualViewport;
};
var getVisualViewportSizes = () => {
  var visualViewport = getVisualViewport();
  var {
    width,
    height,
    scale,
    pageTop,
    pageLeft,
    offsetTop,
    offsetLeft
  } = visualViewport;
  return {
    width,
    height,
    scale,
    pageTop,
    pageLeft,
    offsetTop,
    offsetLeft
  };
};
var subscribeOnVisualViewportEvent = (event, callback, options) => {
  var visualViewport = getVisualViewport();
  var unSubscribeOnVisualViewportCallback = domAdapter.listen(visualViewport, event, callback, options);
  return unSubscribeOnVisualViewportCallback;
};
export { visualViewportEventMap, hasVisualViewport, getVisualViewportSizes, subscribeOnVisualViewportEvent };
