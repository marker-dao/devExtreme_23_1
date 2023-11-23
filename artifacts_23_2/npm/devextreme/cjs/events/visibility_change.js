/**
* DevExtreme (cjs/events/visibility_change.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.triggerShownEvent = exports.triggerResizeEvent = exports.triggerHidingEvent = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("./core/events_engine"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const triggerVisibilityChangeEvent = function (eventName) {
  const VISIBILITY_CHANGE_SELECTOR = '.dx-visibility-change-handler';
  return function (element) {
    const $element = (0, _renderer.default)(element || 'body');
    const changeHandlers = $element.filter(VISIBILITY_CHANGE_SELECTOR).add($element.find(VISIBILITY_CHANGE_SELECTOR));
    for (let i = 0; i < changeHandlers.length; i++) {
      _events_engine.default.triggerHandler(changeHandlers[i], eventName);
    }
  };
};
const triggerShownEvent = triggerVisibilityChangeEvent('dxshown');
exports.triggerShownEvent = triggerShownEvent;
const triggerHidingEvent = triggerVisibilityChangeEvent('dxhiding');
exports.triggerHidingEvent = triggerHidingEvent;
const triggerResizeEvent = triggerVisibilityChangeEvent('dxresize');
exports.triggerResizeEvent = triggerResizeEvent;
