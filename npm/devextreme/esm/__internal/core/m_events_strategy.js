/**
* DevExtreme (esm/__internal/core/m_events_strategy.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Callbacks from '../../core/utils/callbacks';
import { each } from '../../core/utils/iterator';
import { isFunction, isPlainObject } from '../../core/utils/type';
export class EventsStrategy {
  constructor(owner) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this._events = {};
    this._owner = owner;
    this._options = options;
  }
  static create(owner, strategy) {
    if (strategy) {
      return isFunction(strategy) ? strategy(owner) : strategy;
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
    if (isPlainObject(eventName)) {
      each(eventName, (e, h) => {
        this.on(e, h);
      });
    } else {
      let callbacks = this._events[eventName];
      if (!callbacks) {
        callbacks = Callbacks({
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
      if (isFunction(eventHandler)) {
        callbacks.remove(eventHandler);
      } else {
        callbacks.empty();
      }
    }
  }
  dispose() {
    each(this._events, (eventName, event) => {
      event.empty();
    });
  }
}
