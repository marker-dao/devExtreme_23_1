"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastView = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_modules = require("../m_modules");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DEFAULT_POSITION = {
  my: 'center bottom',
  at: 'center bottom'
};
class ToastView extends _m_modules.View {
  constructor() {
    super(...arguments);
    this._toastInstance = null;
    this._$toastContainer = null;
  }
  _ensureToastContainer() {
    if (!this._$toastContainer) {
      this._$toastContainer = (0, _renderer.default)('<div>').appendTo(this.component.$element());
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
exports.ToastView = ToastView;