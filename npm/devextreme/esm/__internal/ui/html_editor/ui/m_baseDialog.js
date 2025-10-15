/**
* DevExtreme (esm/__internal/ui/html_editor/ui/m_baseDialog.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import { Deferred } from '../../../../core/utils/deferred';
import Popup from '../../../../ui/popup';
import { isSmallScreen } from '../utils/small_screen';
const DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
class BaseDialog {
  constructor($container, popupConfig) {
    this._$container = $container;
    this._popupConfig = popupConfig;
    this._renderPopup();
  }
  _escKeyHandler() {
    var _this$_popup;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.hide();
  }
  _addEscapeHandler(e) {
    e.component.registerKeyHandler('escape', () => this._escKeyHandler());
  }
  _renderPopup() {
    const $popupContainer = $('<div>').addClass(this._getPopupClass()).appendTo(this._$container);
    this._popup = new Popup($popupContainer.get(0), this._getPopupConfig());
  }
  _getPopupConfig() {
    return {
      deferRendering: false,
      focusStateEnabled: false,
      fullScreen: isSmallScreen(),
      _wrapperClassExternal: `${this._getPopupClass()} ${DROPDOWN_EDITOR_OVERLAY_CLASS}`,
      contentTemplate: contentElem => {
        this._renderContent($(contentElem));
      },
      onInitialized: e => {
        this._popup = e.component;
        this._popup.on('hiding', () => this.onHiding());
        this._addEscapeHandler.bind(this);
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
      return undefined;
    }
    this.deferred = Deferred();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._popup.show();
    return this.deferred.promise();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hide(options, event) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._popup.hide();
  }
  popupOption() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // @ts-expect-error args is any
    return this._popup.option.apply(this._popup, args);
  }
}
export default BaseDialog;
