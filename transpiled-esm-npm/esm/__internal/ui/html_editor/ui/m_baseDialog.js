import $ from '../../../../core/renderer';
import { Deferred } from '../../../../core/utils/deferred';
import Popup from '../../../../ui/popup';
import { isSmallScreen } from '../utils/small_screen';
const DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
class BaseDialog {
  constructor($container, popupConfig) {
    this._$container = $container;
    this._popupUserConfig = popupConfig;
    this._renderPopup();
  }
  _renderPopup() {
    const $popupContainer = $('<div>').addClass(this._getPopupClass()).appendTo(this._$container);
    this._popup = new Popup($popupContainer.get(0), this._getPopupConfig());
  }
  _getPopupConfig() {
    return {
      onInitialized: e => {
        this._popup = e.component;
        this._popup.on('hiding', () => this.onHiding());
      },
      deferRendering: false,
      focusStateEnabled: false,
      fullScreen: isSmallScreen(),
      _wrapperClassExternal: `${this._getPopupClass()} ${DROPDOWN_EDITOR_OVERLAY_CLASS}`,
      contentTemplate: contentElem => {
        this._renderContent($(contentElem));
      }
    };
  }
  onHiding() {
    var _this$deferred;
    (_this$deferred = this.deferred) === null || _this$deferred === void 0 || _this$deferred.reject();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  show(options) {
    if (this._popup.option('visible')) {
      return;
    }
    this.deferred = Deferred();
    this._popup.show();
    return this.deferred.promise();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hide(_options, _event) {
    this._popup.hide();
  }
  popupOption() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // @ts-expect-error
    return this._popup.option.apply(this._popup, args);
  }
}
export default BaseDialog;