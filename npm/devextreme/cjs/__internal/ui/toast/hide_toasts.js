/**
* DevExtreme (cjs/__internal/ui/toast/hide_toasts.js)
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
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _toast = _interopRequireWildcard(require("../../ui/toast/toast"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function hideToasts(container) {
  const toasts = (0, _renderer.default)(`.${_toast.TOAST_CLASS}`).toArray();
  if (arguments.length === 0) {
    toasts.forEach(toast => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      _toast.default.getInstance(toast).hide();
    });
    return;
  }
  if (!container) {
    return;
  }
  const containerElement = (0, _renderer.default)(container).get(0);
  toasts.map(toast => {
    const instance = _toast.default.getInstance(toast);
    return instance;
  }).filter(instance => {
    const {
      container: toastContainer
    } = instance.option();
    const toastContainerElement = (0, _renderer.default)(toastContainer).get(0);
    return containerElement === toastContainerElement && containerElement;
  }).forEach(instance => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    instance.hide();
  });
}
var _default = exports.default = hideToasts;
