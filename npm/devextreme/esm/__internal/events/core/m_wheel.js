/**
* DevExtreme (esm/__internal/events/core/m_wheel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerEvent from '../../../common/core/events/core/event_registrator';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace, fireEvent } from '../../../common/core/events/utils/index';
import $ from '../../../core/renderer';
const EVENT_NAME = 'dxmousewheel';
const EVENT_NAMESPACE = 'dxWheel';
const NATIVE_EVENT_NAME = 'wheel';
const PIXEL_MODE = 0;
const DELTA_MUTLIPLIER = 30;
const wheel = {
  setup(element) {
    const $element = $(element);
    eventsEngine.on($element, addNamespace(NATIVE_EVENT_NAME, EVENT_NAMESPACE), wheel._wheelHandler.bind(wheel));
  },
  teardown(element) {
    eventsEngine.off(element, `.${EVENT_NAMESPACE}`);
  },
  _wheelHandler(e) {
    const {
      deltaMode,
      deltaY,
      deltaX,
      deltaZ
    } = e.originalEvent;
    fireEvent({
      type: EVENT_NAME,
      originalEvent: e,
      // @ts-expect-error
      delta: this._normalizeDelta(deltaY, deltaMode),
      deltaX,
      deltaY,
      deltaZ,
      deltaMode,
      pointerType: 'mouse'
    });
    e.stopPropagation();
  },
  _normalizeDelta(delta) {
    let deltaMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIXEL_MODE;
    if (deltaMode === PIXEL_MODE) {
      return -delta;
    }
    // Use multiplier to get rough delta value in px for the LINE or PAGE mode
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1392460
    return -DELTA_MUTLIPLIER * delta;
  }
};
registerEvent(EVENT_NAME, wheel);
export { EVENT_NAME as name };
