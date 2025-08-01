/**
* DevExtreme (cjs/__internal/ui/chat/confirmationpopup.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CHAT_CONFIRMATION_POPUP_WRAPPER_CLASS = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _popup = _interopRequireDefault(require("../../../ui/popup"));
var _button = require("../../ui/button/button");
const _excluded = ["onApplyButtonClick", "onCancelButtonClick"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const CHAT_CONFIRMATION_POPUP_WRAPPER_CLASS = exports.CHAT_CONFIRMATION_POPUP_WRAPPER_CLASS = 'dx-chat-confirmation-popup-wrapper';
const POPUP_WIDTH = 240;
class ConfirmationPopup {
  constructor($container, config) {
    this._$container = $container;
    const _ref = config ?? {},
      {
        onApplyButtonClick,
        onCancelButtonClick
      } = _ref,
      popupConfig = _objectWithoutPropertiesLoose(_ref, _excluded);
    this._actions = {
      onApplyButtonClick,
      onCancelButtonClick
    };
    this._popupConfig = popupConfig;
    this._renderPopup();
  }
  _renderPopup() {
    const $popupContainer = (0, _renderer.default)('<div>').appendTo(this._$container);
    this._popup = new _popup.default($popupContainer.get(0), this._getPopupConfig());
  }
  _getPopupConfig() {
    const messageId = new _guid.default().toString();
    const $message = (0, _renderer.default)('<div>').text(_message.default.format('dxChat-editingDeleteConfirmText')).attr('id', messageId);
    return (0, _extend.extend)(_extends({
      width: POPUP_WIDTH,
      height: 'auto',
      showTitle: false,
      showCloseButton: false,
      shading: true,
      dragEnabled: false,
      hideOnOutsideClick: true,
      toolbarItems: this._getToolbarItems(),
      onContentReady(args) {
        args.component.$content().append($message);
        args.component.$overlayContent().attr('aria-labelledby', messageId);
      },
      onShown: e => {
        const $firstButton = e.component.bottomToolbar().find(`.${_button.BUTTON_CLASS}`).first();
        // @ts-expect-error
        _events_engine.default.trigger($firstButton, 'focus');
      },
      wrapperAttr: {
        class: CHAT_CONFIRMATION_POPUP_WRAPPER_CLASS
      },
      focusStateEnabled: true,
      position: {
        my: 'center',
        at: 'center',
        of: this._$container
      }
    }, this._popupConfig));
  }
  _getApplyButtonConfig() {
    return {
      widget: 'dxButton',
      toolbar: 'bottom',
      location: 'before',
      options: {
        text: _message.default.format('Yes'),
        type: 'default',
        stylingMode: 'contained',
        onClick: () => {
          var _this$_actions, _this$_actions$onAppl;
          (_this$_actions = this._actions) === null || _this$_actions === void 0 || (_this$_actions$onAppl = _this$_actions.onApplyButtonClick) === null || _this$_actions$onAppl === void 0 || _this$_actions$onAppl.call(_this$_actions);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._popup.hide();
        }
      }
    };
  }
  _getCancelButtonConfig() {
    return {
      widget: 'dxButton',
      toolbar: 'bottom',
      location: 'after',
      options: {
        text: _message.default.format('No'),
        type: 'normal',
        stylingMode: 'outlined',
        onClick: () => {
          var _this$_actions2, _this$_actions2$onCan;
          (_this$_actions2 = this._actions) === null || _this$_actions2 === void 0 || (_this$_actions2$onCan = _this$_actions2.onCancelButtonClick) === null || _this$_actions2$onCan === void 0 || _this$_actions2$onCan.call(_this$_actions2);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._popup.hide();
        }
      }
    };
  }
  _getToolbarItems() {
    return [this._getApplyButtonConfig(), this._getCancelButtonConfig()];
  }
  show() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._popup.show();
  }
  dispose() {
    this._popup.dispose();
  }
}
var _default = exports.default = ConfirmationPopup;
