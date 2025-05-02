"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("../../../common/core/events/pointer/base"));
var _mouse = _interopRequireDefault(require("../../../common/core/events/pointer/mouse"));
var _touch = _interopRequireDefault(require("../../../common/core/events/pointer/touch"));
var _index = require("../../../common/core/events/utils/index");
var _extend = require("../../../core/utils/extend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */
const eventMap = {
  dxpointerdown: 'touchstart mousedown',
  dxpointermove: 'touchmove mousemove',
  dxpointerup: 'touchend mouseup',
  dxpointercancel: 'touchcancel',
  dxpointerover: 'mouseover',
  dxpointerout: 'mouseout',
  dxpointerenter: 'mouseenter',
  dxpointerleave: 'mouseleave'
};
let activated = false;
const activateStrategy = function () {
  if (activated) {
    return;
  }
  _mouse.default.activate();
  activated = true;
};
const MouseAndTouchStrategy = _base.default.inherit({
  EVENT_LOCK_TIMEOUT: 100,
  ctor() {
    this.callBase.apply(this, arguments);
    activateStrategy();
  },
  _handler(e) {
    const isMouse = (0, _index.isMouseEvent)(e);
    if (!isMouse) {
      this._skipNextEvents = true;
    }
    if (isMouse && this._mouseLocked) {
      return;
    }
    if (isMouse && this._skipNextEvents) {
      this._skipNextEvents = false;
      this._mouseLocked = true;
      clearTimeout(this._unlockMouseTimer);
      const that = this;
      this._unlockMouseTimer = setTimeout(() => {
        that._mouseLocked = false;
      }, this.EVENT_LOCK_TIMEOUT);
      return;
    }
    return this.callBase(e);
  },
  _fireEvent(args) {
    const normalizer = (0, _index.isMouseEvent)(args.originalEvent) ? _mouse.default.normalize : _touch.default.normalize;
    return this.callBase((0, _extend.extend)(normalizer(args.originalEvent), args));
  },
  dispose() {
    this.callBase();
    this._skipNextEvents = false;
    this._mouseLocked = false;
    clearTimeout(this._unlockMouseTimer);
  }
});
MouseAndTouchStrategy.map = eventMap;
MouseAndTouchStrategy.resetObserver = _mouse.default.resetObserver;
var _default = exports.default = MouseAndTouchStrategy;