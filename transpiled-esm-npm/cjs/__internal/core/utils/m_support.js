"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointerEvents = exports.nativeScrolling = exports.inputType = exports.default = exports.animation = void 0;
Object.defineProperty(exports, "styleProp", {
  enumerable: true,
  get: function () {
    return _style.styleProp;
  }
});
Object.defineProperty(exports, "stylePropPrefix", {
  enumerable: true,
  get: function () {
    return _style.stylePropPrefix;
  }
});
exports.transitionEndEventName = exports.transition = exports.touchEvents = exports.touch = exports.supportProp = void 0;
var _devices = _interopRequireDefault(require("../../../common/core/environment/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _call_once = _interopRequireDefault(require("../../../core/utils/call_once"));
var _style = require("../../../core/utils/style");
var _window = require("../../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  maxTouchPoints
} = (0, _window.getNavigator)();
const transitionEndEventNames = {
  webkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd',
  transition: 'transitionend'
};
const supportProp = function (prop) {
  return !!(0, _style.styleProp)(prop);
};
exports.supportProp = supportProp;
const isNativeScrollingSupported = function () {
  const {
    platform,
    mac: isMac
  } = _devices.default.real();
  const isNativeScrollDevice = platform === 'ios' || platform === 'android' || isMac;
  return isNativeScrollDevice;
};
const inputType = function (type) {
  if (type === 'text') {
    return true;
  }
  const input = _dom_adapter.default.createElement('input');
  try {
    input.setAttribute('type', type);
    // @ts-expect-error need smarter typing
    input.value = 'wrongValue';
    // @ts-expect-error need smarter typing
    return !input.value;
  } catch (e) {
    return false;
  }
};
exports.inputType = inputType;
const detectTouchEvents = function (hasWindowProperty, maxTouchPoints) {
  return (hasWindowProperty('ontouchstart') || !!maxTouchPoints) && !hasWindowProperty('callPhantom');
};
const detectPointerEvent = function (hasWindowProperty) {
  return hasWindowProperty('PointerEvent');
};
const touchEvents = exports.touchEvents = detectTouchEvents(_window.hasProperty, maxTouchPoints);
const pointerEvents = exports.pointerEvents = detectPointerEvent(_window.hasProperty);
const touchPointersPresent = !!maxTouchPoints;
const touch = exports.touch = touchEvents || pointerEvents && touchPointersPresent;
const transition = exports.transition = (0, _call_once.default)(function () {
  return supportProp('transition');
});
const transitionEndEventName = exports.transitionEndEventName = (0, _call_once.default)(function () {
  return transitionEndEventNames[(0, _style.styleProp)('transition')];
});
const animation = exports.animation = (0, _call_once.default)(function () {
  return supportProp('animation');
});
const nativeScrolling = exports.nativeScrolling = isNativeScrollingSupported();
var _default = exports.default = {
  animation,
  inputType,
  nativeScrolling,
  pointerEvents,
  styleProp: _style.styleProp,
  stylePropPrefix: _style.stylePropPrefix,
  supportProp,
  touch,
  touchEvents,
  transition,
  transitionEndEventName
};