/**
* DevExtreme (esm/__internal/ui/chat/message_box/chat_text_area.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { normalizeKeyName } from '../../../../common/core/events/utils/index';
import messageLocalization from '../../../../common/core/localization/message';
import devices from '../../../../core/devices';
import $ from '../../../../core/renderer';
import { getOuterHeight } from '../../../../core/utils/size';
import { current, isMaterial } from '../../../../ui/themes';
import Toolbar from '../../../../ui/toolbar';
import Informer from '../../../ui/informer/informer';
import TextArea from '../../../ui/m_text_area';
export const TEXT_AREA_TOOLBAR = 'dx-textarea-toolbar';
const isMobile = () => devices.current().deviceType !== 'desktop';
class ChatTextArea extends TextArea {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      stylingMode: 'outlined',
      placeholder: messageLocalization.format('dxChat-textareaPlaceholder'),
      autoResizeEnabled: true,
      valueChangeEvent: 'input',
      maxHeight: '24em',
      fileUploaderOptions: undefined
    });
  }
  _defaultOptionsRules() {
    const rules = [...super._defaultOptionsRules(), {
      device: () => isMaterial(current()),
      options: {
        stylingMode: 'outlined'
      }
    }];
    return rules;
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      enter: e => {
        if (this._shouldSendMessageOnEnter(e)) {
          e.preventDefault();
        }
      }
    });
  }
  _enterKeyHandlerUp(e) {
    super._enterKeyHandlerUp(e);
    if (normalizeKeyName(e) !== 'enter') {
      return;
    }
    if (this._shouldSendMessageOnEnter(e)) {
      this._processSendButtonActivation({
        component: this,
        element: this.element(),
        event: e
      });
    }
  }
  _init() {
    super._init();
    this._createSendAction();
  }
  _createSendAction() {
    this._sendAction = this._createActionByOption('onSend', {
      excludeValidators: ['disabled']
    });
  }
  _initMarkup() {
    super._initMarkup();
    this._renderInformer();
    this._renderToolbar();
  }
  _renderInformer() {
    const $informer = $('<div>').addClass('dx-chat-informer').prependTo(this.$element());
    this._informer = this._createComponent($informer, Informer, {
      contentAlignment: 'start',
      icon: 'errorcircle',
      text: 'You selected too many files. Select no more than 3 files and retry.'
    });
  }
  _renderToolbar() {
    const toolbarItems = this._getToolbarItems();
    const toolbarOptions = {
      items: toolbarItems
    };
    this._$toolbar = $('<div>').addClass(TEXT_AREA_TOOLBAR).appendTo(this.$element());
    this._toolbar = this._createComponent(this._$toolbar, Toolbar, toolbarOptions);
  }
  _getToolbarItems() {
    const {
      fileUploaderOptions
    } = this.option();
    const items = [this._getSendButtonConfig()];
    if (fileUploaderOptions) {
      items.push(this._getFileUploaderButtonConfig());
    }
    return items;
  }
  _getFileUploaderButtonConfig() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const configuration = {
      widget: 'dxButton',
      location: 'before',
      options: {
        activeStateEnabled,
        focusStateEnabled,
        hoverStateEnabled,
        icon: 'attach'
      }
    };
    return configuration;
  }
  _getSendButtonConfig() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const configuration = {
      widget: 'dxButton',
      location: 'after',
      options: {
        activeStateEnabled,
        focusStateEnabled,
        hoverStateEnabled,
        icon: 'arrowright',
        type: 'default',
        stylingMode: 'contained',
        disabled: true,
        elementAttr: {
          'aria-label': messageLocalization.format('dxChat-sendButtonAriaLabel')
        },
        onClick: e => {
          this._processSendButtonActivation(e);
        },
        onInitialized: e => {
          this._sendButton = e.component;
        }
      }
    };
    return configuration;
  }
  _toggleButtonDisableState(state) {
    var _this$_sendButton;
    (_this$_sendButton = this._sendButton) === null || _this$_sendButton === void 0 || _this$_sendButton.option('disabled', state);
  }
  _renderButtonContainers() {}
  _getHeightDifference($input) {
    const superResult = super._getHeightDifference($input);
    const toolbarHeight = getOuterHeight(this._$toolbar);
    const sum = superResult + toolbarHeight;
    return sum;
  }
  _keyPressHandler(e) {
    super._keyPressHandler(e);
    const shouldButtonBeDisabled = !this._isValuableTextEntered();
    this._toggleButtonDisableState(shouldButtonBeDisabled);
  }
  _processSendButtonActivation(e) {
    var _this$_sendAction;
    (_this$_sendAction = this._sendAction) === null || _this$_sendAction === void 0 || _this$_sendAction.call(this, e);
    this.reset();
    this._toggleButtonDisableState(true);
  }
  _shouldSendMessageOnEnter(e) {
    return !(e !== null && e !== void 0 && e.shiftKey) && this._isValuableTextEntered() && !isMobile();
  }
  _optionChanged(args) {
    var _this$_sendButton2;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        (_this$_sendButton2 = this._sendButton) === null || _this$_sendButton2 === void 0 || _this$_sendButton2.option(name, value);
        break;
      case 'text':
        {
          const shouldButtonBeDisabled = !this._isValuableTextEntered();
          this._toggleButtonDisableState(shouldButtonBeDisabled);
          break;
        }
      case 'onSend':
        this._createSendAction();
        break;
      case 'fileUploaderOptions':
      default:
        super._optionChanged(args);
    }
  }
  _isValuableTextEntered() {
    const {
      text
    } = this.option();
    return Boolean(text === null || text === void 0 ? void 0 : text.trim());
  }
  _dispose() {
    var _this$_toolbar, _this$_$toolbar;
    (_this$_toolbar = this._toolbar) === null || _this$_toolbar === void 0 || _this$_toolbar.dispose();
    (_this$_$toolbar = this._$toolbar) === null || _this$_$toolbar === void 0 || _this$_$toolbar.remove();
    this._toolbar = null;
    this._$toolbar = null;
    super._dispose();
  }
}
export default ChatTextArea;
