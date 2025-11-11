/**
* DevExtreme (cjs/__internal/grids/grid_core/toast/m_toast_view.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastView = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _toast = _interopRequireDefault(require("../../../../ui/toast"));
var _m_modules = require("../m_modules");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class ToastView extends _m_modules.View {
  constructor() {
    super(...arguments);
    this._toastInstance = null;
    this._$toastContainer = null;
  }
  _createToastInstance(options) {
    if (this._toastInstance) {
      return this._toastInstance;
    }
    if (!this._$toastContainer) {
      this._$toastContainer = (0, _renderer.default)('<div>').appendTo(this.component.$element());
    }
    this._toastInstance = this._createComponent(this._$toastContainer, _toast.default, _extends({
      position: {
        my: 'bottom',
        at: 'bottom',
        of: this.component.$element().get(0)
      }
    }, options, {
      visible: false
    }));
    return this._toastInstance;
  }
  showToast(message) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const toast = this._createToastInstance(options);
    toast === null || toast === void 0 || toast.option(_extends({}, options, {
      message,
      visible: true
    }));
  }
  async hideToast() {
    var _this$_toastInstance;
    await ((_this$_toastInstance = this._toastInstance) === null || _this$_toastInstance === void 0 ? void 0 : _this$_toastInstance.hide());
  }
  dispose() {
    if (this._toastInstance) {
      this._toastInstance.dispose();
      this._toastInstance = null;
    }
    if (this._$toastContainer) {
      this._$toastContainer.remove();
      this._$toastContainer = null;
    }
  }
}
exports.ToastView = ToastView;
