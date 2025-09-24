"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forcePassiveFalseEventNames = exports.NO_BUBBLE_EVENTS = exports.NATIVE_EVENTS_TO_TRIGGER = exports.NATIVE_EVENTS_TO_SUBSCRIBE = exports.EVENT_PROPERTIES = exports.EMPTY_EVENT_NAME = void 0;
/* eslint-disable spellcheck/spell-checker */
const EMPTY_EVENT_NAME = exports.EMPTY_EVENT_NAME = 'dxEmptyEventType';
const NATIVE_EVENTS_TO_SUBSCRIBE = exports.NATIVE_EVENTS_TO_SUBSCRIBE = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout',
  pointerenter: 'pointerover',
  pointerleave: 'pointerout'
};
const NATIVE_EVENTS_TO_TRIGGER = exports.NATIVE_EVENTS_TO_TRIGGER = {
  focusin: 'focus',
  focusout: 'blur'
};
const NO_BUBBLE_EVENTS = exports.NO_BUBBLE_EVENTS = ['blur', 'focus', 'load'];
const forcePassiveFalseEventNames = exports.forcePassiveFalseEventNames = ['touchmove', 'wheel', 'mousewheel', 'touchstart'];
const EVENT_PROPERTIES = exports.EVENT_PROPERTIES = ['altKey', 'altitudeAngle', 'azimuthAngle', 'bubbles', 'button', 'buttons', 'cancelable', 'cancelBubble', 'changedTouches', 'char', 'charCode', 'clipboardData', 'code', 'composed', 'ctrlKey', 'defaultPrevented', 'delegateTarget', 'deltaMode', 'deltaX', 'deltaY', 'deltaZ', 'detail', 'eventPhase', 'height', 'isComposing', 'isPrimary', 'key', 'keyCode', 'layerX', 'layerY', 'location', 'metaKey', 'movementX', 'movementY', 'offsetX', 'offsetY', 'pointerId', 'pointerType', 'pressure', 'relatedTarget', 'repeat', 'returnValue', 'srcElement', 'shiftKey', 'tangentialPressure', 'target', 'targetTouches', 'tiltX', 'tiltY', 'toElement', 'touches', 'twist', 'view', 'width', 'x', 'y'];