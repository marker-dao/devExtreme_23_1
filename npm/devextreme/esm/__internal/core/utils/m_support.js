/**
* DevExtreme (esm/__internal/core/utils/m_support.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../common/core/environment/devices';
import domAdapter from '../../../core/dom_adapter';
import callOnce from '../../../core/utils/call_once';
import { styleProp, stylePropPrefix } from '../../../core/utils/style';
import { getNavigator, hasProperty } from '../../../core/utils/window';
const {
  maxTouchPoints
} = getNavigator();
const transitionEndEventNames = {
  webkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd',
  transition: 'transitionend'
};
const supportProp = function (prop) {
  return !!styleProp(prop);
};
const isNativeScrollingSupported = function () {
  const {
    platform,
    mac: isMac
  } = devices.real();
  const isNativeScrollDevice = platform === 'ios' || platform === 'android' || isMac;
  return isNativeScrollDevice;
};
const inputType = function (type) {
  if (type === 'text') {
    return true;
  }
  const input = domAdapter.createElement('input');
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
const detectTouchEvents = function (hasWindowProperty, maxTouchPoints) {
  return (hasWindowProperty('ontouchstart') || !!maxTouchPoints) && !hasWindowProperty('callPhantom');
};
const detectPointerEvent = function (hasWindowProperty) {
  return hasWindowProperty('PointerEvent');
};
const touchEvents = detectTouchEvents(hasProperty, maxTouchPoints);
const pointerEvents = detectPointerEvent(hasProperty);
const touchPointersPresent = !!maxTouchPoints;
export { inputType, pointerEvents, styleProp, stylePropPrefix, supportProp, touchEvents };
export const touch = touchEvents || pointerEvents && touchPointersPresent;
export const transition = callOnce(function () {
  return supportProp('transition');
});
export const transitionEndEventName = callOnce(function () {
  return transitionEndEventNames[styleProp('transition')];
});
export const animation = callOnce(function () {
  return supportProp('animation');
});
export const nativeScrolling = isNativeScrollingSupported();
export default {
  animation,
  inputType,
  nativeScrolling,
  pointerEvents,
  styleProp,
  stylePropPrefix,
  supportProp,
  touch,
  touchEvents,
  transition,
  transitionEndEventName
};
