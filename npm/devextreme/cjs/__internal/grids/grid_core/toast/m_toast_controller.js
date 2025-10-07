/**
* DevExtreme (cjs/__internal/grids/grid_core/toast/m_toast_controller.js)
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
exports.ToastViewController = void 0;
var _m_modules = require("../m_modules");
class ToastViewController extends _m_modules.ViewController {
  constructor() {
    super(...arguments);
    this._toastView = null;
  }
  init() {
    this._toastView = this.getView('toastView');
  }
  showToast(message) {
    var _this$_toastView;
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (_this$_toastView = this._toastView) === null || _this$_toastView === void 0 || _this$_toastView.showToast(message, options);
  }
  async hideToast() {
    var _this$_toastView2;
    await ((_this$_toastView2 = this._toastView) === null || _this$_toastView2 === void 0 ? void 0 : _this$_toastView2.hideToast());
  }
  dispose() {
    var _this$_toastView3;
    (_this$_toastView3 = this._toastView) === null || _this$_toastView3 === void 0 || _this$_toastView3.dispose();
  }
}
exports.ToastViewController = ToastViewController;
