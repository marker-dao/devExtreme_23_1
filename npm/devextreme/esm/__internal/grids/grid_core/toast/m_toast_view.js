/**
* DevExtreme (esm/__internal/grids/grid_core/toast/m_toast_view.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../core/renderer';
import { View } from '../m_modules';
const DEFAULT_POSITION = {
  my: 'center bottom',
  at: 'center bottom'
};
export class ToastView extends View {
  constructor() {
    super(...arguments);
    this._toastInstance = null;
    this._$toastContainer = null;
  }
  _ensureToastContainer() {
    if (!this._$toastContainer) {
      this._$toastContainer = $('<div>').appendTo(this.component.$element());
    }
  }
  _createToastInstance(options) {
    this._ensureToastContainer();
    if (this._toastInstance) {
      return this._toastInstance;
    }
    this._toastInstance = this._$toastContainer.dxToast(_extends({
      position: _extends({}, DEFAULT_POSITION, {
        of: this.component.$element()
      })
    }, options, {
      visible: false
    })).dxToast('instance');
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
