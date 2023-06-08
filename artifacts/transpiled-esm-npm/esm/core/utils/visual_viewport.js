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