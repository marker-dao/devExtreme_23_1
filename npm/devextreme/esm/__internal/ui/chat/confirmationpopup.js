/**
* DevExtreme (esm/__internal/ui/chat/confirmationpopup.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["onApplyButtonClick", "onCancelButtonClick"];
import eventsEngine from '../../../common/core/events/core/events_engine';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import messageLocalization from '../../../localization/message';
import Popup from '../../../ui/popup';
import { BUTTON_CLASS } from '../../ui/button/button';
export const CHAT_CONFIRMATION_POPUP_WRAPPER_CLASS = 'dx-chat-confirmation-popup-wrapper';
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
    const $popupContainer = $('<div>').appendTo(this._$container);
    this._popup = new Popup($popupContainer.get(0), this._getPopupConfig());
  }
  _getPopupConfig() {
    const messageId = new Guid().toString();
    const $message = $('<div>').text(messageLocalization.format('dxChat-editingDeleteConfirmText')).attr('id', messageId);
    return extend(Object.assign({
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
        const $firstButton = e.component.bottomToolbar().find(`.${BUTTON_CLASS}`).first();
        // @ts-expect-error
        eventsEngine.trigger($firstButton, 'focus');
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
        text: messageLocalization.format('Yes'),
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
        text: messageLocalization.format('No'),
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
export default ConfirmationPopup;
