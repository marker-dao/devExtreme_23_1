/**
* DevExtreme (cjs/__internal/core/state_manager/dev/event_emitter.js)
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
exports.EventEmitter = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class EventEmitter {
  constructor(eventName, logger) {
    this.eventName = eventName;
    this.logger = logger;
    this.listeners = [];
  }
  addListener(callback) {
    if (!callback || typeof callback !== 'function') {
      this.logger.error(`Callback for ${this.eventName} must be a function`);
      return;
    }
    this.listeners.push(callback);
  }
  emit() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this.listeners.forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        this.logger.error(`Error in ${this.eventName} listener`, error);
      }
    });
  }
}
exports.EventEmitter = EventEmitter;
