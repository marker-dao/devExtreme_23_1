/**
* DevExtreme (esm/__internal/events/core/m_consts.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
export const EMPTY_EVENT_NAME = 'dxEmptyEventType';
export const NATIVE_EVENTS_TO_SUBSCRIBE = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout',
  pointerenter: 'pointerover',
  pointerleave: 'pointerout'
};
export const NATIVE_EVENTS_TO_TRIGGER = {
  focusin: 'focus',
  focusout: 'blur'
};
export const NO_BUBBLE_EVENTS = ['blur', 'focus', 'load'];
export const forcePassiveFalseEventNames = ['touchmove', 'wheel', 'mousewheel', 'touchstart'];
export const EVENT_PROPERTIES = ['altKey', 'altitudeAngle', 'azimuthAngle', 'bubbles', 'button', 'buttons', 'cancelable', 'cancelBubble', 'changedTouches', 'char', 'charCode', 'clipboardData', 'code', 'composed', 'ctrlKey', 'defaultPrevented', 'delegateTarget', 'deltaMode', 'deltaX', 'deltaY', 'deltaZ', 'detail', 'eventPhase', 'height', 'isComposing', 'isPrimary', 'key', 'keyCode', 'layerX', 'layerY', 'location', 'metaKey', 'movementX', 'movementY', 'offsetX', 'offsetY', 'pointerId', 'pointerType', 'pressure', 'relatedTarget', 'repeat', 'returnValue', 'srcElement', 'shiftKey', 'tangentialPressure', 'target', 'targetTouches', 'tiltX', 'tiltY', 'toElement', 'touches', 'twist', 'view', 'width', 'x', 'y'];
