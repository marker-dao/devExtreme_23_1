/**
* DevExtreme (esm/__internal/core/r1/utils/subscribe_to_event.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as clickEvent from '../../../../common/core/events/click';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import scrollEvents from '../../../../common/core/events/gesture/emitter.gesture.scroll';
import pointerEvents from '../../../../common/core/events/pointer';
import { addNamespace } from '../../../../common/core/events/utils/index';
export function subscribeToEvent(eventName) {
  return (element, handler, eventData, namespace) => {
    const event = namespace ? addNamespace(eventName, namespace) : eventName;
    if (handler) {
      eventsEngine.on(element, event, eventData, handler);
      return () => {
        eventsEngine.off(element, event, handler);
      };
    }
    return undefined;
  };
}
export const subscribeToClickEvent = subscribeToEvent(clickEvent.name);
export const subscribeToScrollEvent = subscribeToEvent(scrollEvents.scroll);
export const subscribeToScrollInitEvent = subscribeToEvent(scrollEvents.init);
export const subscribeToDXScrollStartEvent = subscribeToEvent(scrollEvents.start);
export const subscribeToDXScrollMoveEvent = subscribeToEvent(scrollEvents.move);
export const subscribeToDXScrollEndEvent = subscribeToEvent(scrollEvents.end);
export const subscribeToDXScrollStopEvent = subscribeToEvent(scrollEvents.stop);
export const subscribeToDXScrollCancelEvent = subscribeToEvent(scrollEvents.cancel);
export const subscribeToDXPointerDownEvent = subscribeToEvent(pointerEvents.down);
export const subscribeToDXPointerUpEvent = subscribeToEvent(pointerEvents.up);
export const subscribeToDXPointerMoveEvent = subscribeToEvent(pointerEvents.move);
export const subscribeToMouseEnterEvent = subscribeToEvent('mouseenter');
export const subscribeToMouseLeaveEvent = subscribeToEvent('mouseleave');
export const subscribeToKeyDownEvent = subscribeToEvent('keydown');
export const subscribeToDxActiveEvent = subscribeToEvent('dxactive');
export const subscribeToDxInactiveEvent = subscribeToEvent('dxinactive');
export const subscribeToDxHoverStartEvent = subscribeToEvent('dxhoverstart');
export const subscribeToDxHoverEndEvent = subscribeToEvent('dxhoverend');
export const subscribeToDxFocusInEvent = subscribeToEvent('focusin');
export const subscribeToDxFocusOutEvent = subscribeToEvent('focusout');
