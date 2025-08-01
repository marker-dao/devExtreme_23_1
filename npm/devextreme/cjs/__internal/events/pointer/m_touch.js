/**
* DevExtreme (cjs/__internal/events/pointer/m_touch.js)
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
var _base = _interopRequireDefault(require("../../../common/core/events/pointer/base"));
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _m_devices = _interopRequireDefault(require("../../core/m_devices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  (0, _iterator.each)(e.touches, (_, touch) => {
    pointers.push((0, _extend.extend)({
      pointerId: touch.identifier
    }, touch));
  });
  return {
    pointers,
    pointerId: e.changedTouches[0].identifier
  };
};
const skipTouchWithSameIdentifier = function (pointerEvent) {
  return _m_devices.default.real().platform === 'ios' && (pointerEvent === 'dxpointerdown' || pointerEvent === 'dxpointerup');
};
const TouchStrategy = _base.default.inherit({
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
    return this.callBase((0, _extend.extend)(normalizeTouchEvent(args.originalEvent), args));
  }
});
TouchStrategy.map = eventMap;
TouchStrategy.normalize = normalizeTouchEvent;
var _default = exports.default = TouchStrategy;
