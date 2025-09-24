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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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