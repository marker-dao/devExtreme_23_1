/**
* DevExtreme (esm/__internal/events/pointer/m_touch.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import BaseStrategy from '../../../common/core/events/pointer/base';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import devices from '../../core/m_devices';
/* eslint-disable spellcheck/spell-checker */
const eventMap = {
  dxpointerdown: 'touchstart',
  dxpointermove: 'touchmove',
  dxpointerup: 'touchend',
  dxpointercancel: 'touchcancel',
  dxpointerover: '',
  dxpointerout: '',
  dxpointerenter: '',
  dxpointerleave: ''
};
const normalizeTouchEvent = function (e) {
  const pointers = [];
  each(e.touches, (_, touch) => {
    pointers.push(extend({
      pointerId: touch.identifier
    }, touch));
  });
  return {
    pointers,
    pointerId: e.changedTouches[0].identifier
  };
};
const skipTouchWithSameIdentifier = function (pointerEvent) {
  return devices.real().platform === 'ios' && (pointerEvent === 'dxpointerdown' || pointerEvent === 'dxpointerup');
};
const TouchStrategy = BaseStrategy.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    this._pointerId = 0;
  },
  _handler(e) {
    if (skipTouchWithSameIdentifier(this._eventName)) {
      const touch = e.changedTouches[0];
      if (this._pointerId === touch.identifier && this._pointerId !== 0) {
        return;
      }
      this._pointerId = touch.identifier;
    }
    return this.callBase.apply(this, arguments);
  },
  _fireEvent(args) {
    return this.callBase(extend(normalizeTouchEvent(args.originalEvent), args));
  }
});
TouchStrategy.map = eventMap;
TouchStrategy.normalize = normalizeTouchEvent;
export default TouchStrategy;
