/**
* DevExtreme (cjs/integration/jquery/events.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
var _event_registrator_callbacks = _interopRequireDefault(require("../../common/core/events/core/event_registrator_callbacks"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  _event_registrator_callbacks.default.add(function (name, eventObject) {
    _jquery.default.event.special[name] = eventObject;
  });
  if (_events_engine.default.passiveEventHandlersSupported()) {
    _events_engine.default.forcePassiveFalseEventNames.forEach(function (eventName) {
      _jquery.default.event.special[eventName] = {
        setup: function (data, namespaces, handler) {
          _dom_adapter.default.listen(this, eventName, handler, {
            passive: false
          });
        }
      };
    });
  }
  _events_engine.default.set({
    on: function (element) {
      (0, _jquery.default)(element).on.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    one: function (element) {
      (0, _jquery.default)(element).one.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    off: function (element) {
      (0, _jquery.default)(element).off.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    trigger: function (element) {
      (0, _jquery.default)(element).trigger.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    triggerHandler: function (element) {
      (0, _jquery.default)(element).triggerHandler.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    Event: _jquery.default.Event
  });
}
