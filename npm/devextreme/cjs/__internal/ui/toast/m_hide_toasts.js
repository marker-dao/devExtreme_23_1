/**
* DevExtreme (cjs/__internal/ui/toast/m_hide_toasts.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TOAST_CLASS = 'dx-toast';
function hideAllToasts(container) {
  const toasts = (0, _renderer.default)(`.${TOAST_CLASS}`).toArray();
  if (!arguments.length) {
    // @ts-expect-error
    toasts.forEach(toast => {
      (0, _renderer.default)(toast).dxToast('hide');
    });
    return;
  }
  const containerElement = (0, _renderer.default)(container).get(0);
  toasts
  // @ts-expect-error
  .map(toast => (0, _renderer.default)(toast).dxToast('instance')).filter(instance => {
    const toastContainerElement = (0, _renderer.default)(instance.option('container')).get(0);
    return containerElement === toastContainerElement && containerElement;
  }).forEach(instance => {
    instance.hide();
  });
}
var _default = exports.default = hideAllToasts;
