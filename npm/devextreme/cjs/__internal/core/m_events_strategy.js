/**
* DevExtreme (cjs/__internal/core/m_events_strategy.js)
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
exports.EventsStrategy = void 0;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EventsStrategy {
  constructor(owner) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this._events = {};
    this._owner = owner;
    this._options = options;
  }
  static create(owner, strategy) {
    if (strategy) {
      return (0, _type.isFunction)(strategy) ? strategy(owner) : strategy;
    }
    return new EventsStrategy(owner);
  }
  hasEvent(eventName) {
    const callbacks = this._events[eventName];
    return callbacks ? callbacks.has() : false;
  }
  fireEvent(eventName, eventArgs) {
    const callbacks = this._events[eventName];
    if (callbacks) {
      callbacks.fireWith(this._owner, eventArgs);
    }
    return this._owner;
  }
  on(eventName, eventHandler) {
    if ((0, _type.isPlainObject)(eventName)) {
      (0, _iterator.each)(eventName, (e, h) => {
        this.on(e, h);
      });
    } else {
      let callbacks = this._events[eventName];
      if (!callbacks) {
        callbacks = (0, _callbacks.default)({
          syncStrategy: this._options.syncStrategy
        });
        this._events[eventName] = callbacks;
      }
      const addFn = callbacks.originalAdd || callbacks.add;
      addFn.call(callbacks, eventHandler);
    }
  }
  off(eventName, eventHandler) {
    const callbacks = this._events[eventName];
    if (callbacks) {
      if ((0, _type.isFunction)(eventHandler)) {
        callbacks.remove(eventHandler);
      } else {
        callbacks.empty();
      }
    }
  }
  dispose() {
    (0, _iterator.each)(this._events, (eventName, event) => {
      event.empty();
    });
  }
}
exports.EventsStrategy = EventsStrategy;
