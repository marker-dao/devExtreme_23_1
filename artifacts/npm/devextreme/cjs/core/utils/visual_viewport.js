/**
* DevExtreme (cjs/core/utils/visual_viewport.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.visualViewportEventMap = exports.subscribeOnVisualViewportEvent = exports.hasVisualViewport = exports.getVisualViewportSizes = void 0;
var _window = require("../../core/utils/window");
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var visualViewportEventMap = {
  resize: 'resize',
  scroll: 'scroll'
};
exports.visualViewportEventMap = visualViewportEventMap;
var getVisualViewport = function getVisualViewport() {
  var isWindowAvailable = (0, _window.hasWindow)();
  if (isWindowAvailable) {
    var _getWindow = (0, _window.getWindow)(),
      visualViewport = _getWindow.visualViewport;
    return visualViewport;
  }
  return null;
};
var hasVisualViewport = function hasVisualViewport() {
  var visualViewport = getVisualViewport();
  return !!visualViewport;
};
exports.hasVisualViewport = hasVisualViewport;
var getVisualViewportSizes = function getVisualViewportSizes() {
  var visualViewport = getVisualViewport();
  var width = visualViewport.width,
    height = visualViewport.height,
    scale = visualViewport.scale,
    pageTop = visualViewport.pageTop,
    pageLeft = visualViewport.pageLeft,
    offsetTop = visualViewport.offsetTop,
    offsetLeft = visualViewport.offsetLeft;
  return {
    width: width,
    height: height,
    scale: scale,
    pageTop: pageTop,
    pageLeft: pageLeft,
    offsetTop: offsetTop,
    offsetLeft: offsetLeft
  };
};
exports.getVisualViewportSizes = getVisualViewportSizes;
var subscribeOnVisualViewportEvent = function subscribeOnVisualViewportEvent(event, callback, options) {
  var visualViewport = getVisualViewport();
  var unSubscribeOnVisualViewportCallback = _dom_adapter.default.listen(visualViewport, event, callback, options);
  return unSubscribeOnVisualViewportCallback;
};
exports.subscribeOnVisualViewportEvent = subscribeOnVisualViewportEvent;
