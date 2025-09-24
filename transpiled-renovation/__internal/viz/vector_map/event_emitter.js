"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._TESTS_eventEmitterMethods = void 0;
exports.makeEventEmitter = makeEventEmitter;
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const eventEmitterMethods = exports._TESTS_eventEmitterMethods = {
  _initEvents() {
    const names = this._eventNames;
    let i;
    const ii = names.length;
    const events = this._events = {};
    for (i = 0; i < ii; ++i) {
      events[names[i]] = (0, _callbacks.default)();
    }
  },
  _disposeEvents() {
    const events = this._events;
    let name;
    for (name in events) {
      events[name].empty();
    }
    this._events = null;
  },
  on(handlers) {
    const events = this._events;
    let name;
    for (name in handlers) {
      events[name].add(handlers[name]);
    }
    return dispose;
    function dispose() {
      for (name in handlers) {
        events[name].remove(handlers[name]);
      }
    }
  },
  _fire(name, arg) {
    this._events[name].fire(arg);
  }
};
function makeEventEmitter(target) {
  const proto = target.prototype;
  let name;
  for (name in eventEmitterMethods) {
    proto[name] = eventEmitterMethods[name];
  }
}
/// #DEBUG

/// #ENDDEBUG