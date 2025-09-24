/**
* DevExtreme (cjs/__internal/core/state_manager/prod/reactive_primitives/index.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
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
var SignalsCore = _interopRequireWildcard(require("@preact/signals-core"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function signal(initialValue) {
  return SignalsCore.signal(initialValue);
}
function computed(fn) {
  return SignalsCore.computed(fn);
}
function effect(fn) {
  return SignalsCore.effect(fn);
}
function batch(fn) {
  SignalsCore.batch(fn);
}
// eslint-disable-next-line spellcheck/spell-checker
function untracked(fn) {
  // eslint-disable-next-line spellcheck/spell-checker
  return SignalsCore.untracked(fn);
}
