/**
* DevExtreme (cjs/__internal/events/core/m_wheel.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = void 0;
var _event_registrator = _interopRequireDefault(require("../../../common/core/events/core/event_registrator"));
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EVENT_NAME = exports.name = 'dxmousewheel';
const EVENT_NAMESPACE = 'dxWheel';
const NATIVE_EVENT_NAME = 'wheel';
const PIXEL_MODE = 0;
const DELTA_MULTIPLIER = 30;
var DeltaMode;
(function (DeltaMode) {
  DeltaMode[DeltaMode["DOM_DELTA_PIXEL"] = 0] = "DOM_DELTA_PIXEL";
  DeltaMode[DeltaMode["DOM_DELTA_LINE"] = 1] = "DOM_DELTA_LINE";
  DeltaMode[DeltaMode["DOM_DELTA_PAGE"] = 2] = "DOM_DELTA_PAGE";
})(DeltaMode || (DeltaMode = {}));
const wheel = {
  setup(element) {
    const $element = (0, _renderer.default)(element);
    _events_engine.default.on($element, (0, _index.addNamespace)(NATIVE_EVENT_NAME, EVENT_NAMESPACE), wheel._wheelHandler.bind(wheel));
  },
  teardown(element) {
    _events_engine.default.off(element, `.${EVENT_NAMESPACE}`);
  },
  _wheelHandler(e) {
    const {
      deltaMode,
      deltaY,
      deltaX,
      deltaZ
    } = e.originalEvent;
    const delta = this._getWheelDelta(deltaY, deltaX);
    (0, _index.fireEvent)({
      type: EVENT_NAME,
      originalEvent: e,
      // @ts-expect-error
      delta: this._normalizeDelta(delta, deltaMode),
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
    return -DELTA_MULTIPLIER * delta;
  },
  _getWheelDelta(deltaY, deltaX) {
    if (deltaY) {
      return deltaY;
    }
    if (deltaX) {
      return deltaX;
    }
    return 0;
  }
};
(0, _event_registrator.default)(EVENT_NAME, wheel);
