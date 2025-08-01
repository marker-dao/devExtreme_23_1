/**
* DevExtreme (cjs/__internal/events/m_pointer.js)
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
exports.default = void 0;
var _event_registrator = _interopRequireDefault(require("../../common/core/events/core/event_registrator"));
var _mouse = _interopRequireDefault(require("../../common/core/events/pointer/mouse"));
var _mouse_and_touch = _interopRequireDefault(require("../../common/core/events/pointer/mouse_and_touch"));
var _touch = _interopRequireDefault(require("../../common/core/events/pointer/touch"));
var _config = _interopRequireDefault(require("../../core/config"));
var _iterator = require("../../core/utils/iterator");
var _m_devices = _interopRequireDefault(require("../core/m_devices"));
var _m_support = _interopRequireDefault(require("../core/utils/m_support"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getStrategy = (support, _ref) => {
  let {
    tablet,
    phone
  } = _ref;
  const pointerEventStrategy = getStrategyFromGlobalConfig();
  if (pointerEventStrategy) {
    return pointerEventStrategy;
  }
  if (support.touch && !(tablet || phone)) {
    return _mouse_and_touch.default;
  }
  if (support.touch) {
    return _touch.default;
  }
  return _mouse.default;
};
const EventStrategy = getStrategy(_m_support.default, _m_devices.default.real());
(0, _iterator.each)(EventStrategy.map, (pointerEvent, originalEvents) => {
  (0, _event_registrator.default)(pointerEvent, new EventStrategy(pointerEvent, originalEvents));
});
const pointer = {
  down: 'dxpointerdown',
  up: 'dxpointerup',
  move: 'dxpointermove',
  cancel: 'dxpointercancel',
  enter: 'dxpointerenter',
  leave: 'dxpointerleave',
  over: 'dxpointerover',
  out: 'dxpointerout'
};
function getStrategyFromGlobalConfig() {
  const eventStrategyName = (0, _config.default)().pointerEventStrategy;
  return {
    'mouse-and-touch': _mouse_and_touch.default,
    touch: _touch.default,
    mouse: _mouse.default
    // @ts-expect-error
  }[eventStrategyName];
}
var _default = exports.default = pointer;
