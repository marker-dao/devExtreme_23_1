/**
* DevExtreme (cjs/__internal/core/state_manager/dev/reactive_primitives/index.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batch = batch;
exports.computed = computed;
exports.effect = effect;
exports.signal = signal;
exports.untracked = untracked;
var Reactive = _interopRequireWildcard(require("../../prod/reactive_primitives/index"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function signal(initialValue) {
  const signalInstance = Reactive.signal(initialValue);
  const trace = new Error().stack;
  if (trace) {
    Object.defineProperty(signalInstance, 'stack', {
      value: trace,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  return signalInstance;
}
function computed(fn) {
  const computedInstance = Reactive.computed(fn);
  const trace = new Error().stack;
  if (trace) {
    Object.defineProperty(computedInstance, 'stack', {
      value: trace,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  return computedInstance;
}
function effect(fn) {
  return Reactive.effect(fn);
}
function batch(fn) {
  Reactive.batch(fn);
}
// eslint-disable-next-line spellcheck/spell-checker
function untracked(fn) {
  // eslint-disable-next-line spellcheck/spell-checker
  return Reactive.untracked(fn);
}
