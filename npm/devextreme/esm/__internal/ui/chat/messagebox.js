/**
* DevExtreme (esm/__internal/ui/chat/messagebox.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import Button from '../../../ui/button';
import DOMComponent from '../../core/widget/dom_component';
import EditingPreview from '../../ui/chat/editing_preview';
import TextArea from '../../ui/m_text_area';
export const CHAT_MESSAGEBOX_CLASS = 'dx-chat-messagebox';
export const CHAT_MESSAGEBOX_INPUT_CONTAINER_CLASS = 'dx-chat-messagebox-input-container';
export const CHAT_MESSAGEBOX_TEXTAREA_CLASS = 'dx-chat-messagebox-textarea';
export const CHAT_MESSAGEBOX_BUTTON_CLASS = 'dx-chat-messagebox-button';
export const TYPING_END_DELAY = 2000;
const ESCAPE_KEY = 'escape';
const isMobile = () => devices.current().deviceType !== 'desktop';
class MessageBox extends DOMComponent {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      onMessageEntered: undefined,
      onTypingStart: undefined,
      onTypingEnd: undefined,
      onMessageEditCanceled: undefined,
      onMessageUpdating: undefined,
      text: ''
    });
  }
  _init() {
    super._init();
    this._createMessageEnteredAction();
    this._createTypingStartAction();
    this._createTypingEndAction();
  }
  _initMarkup() {
    $(this.element()).addClass(CHAT_MESSAGEBOX_CLASS);
    super._initMarkup();
    if (this.option('text')) {
      this._renderEditingPreview();
    }
    this._renderInputContainer();
  }
  _renderInputContainer() {
    const $messageBox = $('<div>').addClass(CHAT_MESSAGEBOX_INPUT_CONTAINER_CLASS).appendTo(this.element());
    this._renderTextArea($messageBox);
    this._renderButton($messageBox);
  }
  _cancelMessageEdit() {
    const {
      onMessageEditCanceled
    } = this.option();
    this.option('text', '');
    this._textArea.focus();
    onMessageEditCanceled === null || onMessageEditCanceled === void 0 || onMessageEditCanceled();
  }
  _renderEditingPreview() {
    const $editingPreview = $('<div>').prependTo(this.element());
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      text
    } = this.option();
    this._editingPreview = this._createComponent($editingPreview, EditingPreview, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      text,
      onCancel: () => this._cancelMessageEdit()
    });
  }
  _renderTextArea($parent) {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const $textArea = $('<div>').addClass(CHAT_MESSAGEBOX_TEXTAREA_CLASS);
    $parent.append($textArea);
    this._textArea = this._createComponent($textArea, TextArea, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      stylingMode: 'outlined',
      placeholder: messageLocalization.format('dxChat-textareaPlaceholder'),
      autoResizeEnabled: true,
      valueChangeEvent: 'input',
      maxHeight: '8em',
      onInput: e => {
        const shouldButtonBeDisabled = !this._isValuableTextEntered();
        this._toggleButtonDisableState(shouldButtonBeDisabled);
        this._triggerTypingStartAction(e);
        this._updateTypingEndTimeout();
      },
      onEnterKey: e => {
        var _e$event;
        if (isMobile()) {
          return;
        }
        if (!((_e$event = e.event) !== null && _e$event !== void 0 && _e$event.shiftKey)) {
          this._sendHandler(e);
        }
      }
    });
    this._textArea.registerKeyHandler('enter', event => {
      if (!event.shiftKey && this._isValuableTextEntered() && !isMobile()) {
        event.preventDefault();
      }
    });
    this._textArea.registerKeyHandler(ESCAPE_KEY, () => {
      if (this.option('text')) {
        this._cancelMessageEdit();
      }
    });
  }
  _renderButton($parent) {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const $button = $('<div>').addClass(CHAT_MESSAGEBOX_BUTTON_CLASS);
    $parent.append($button);
    this._button = this._createComponent($button, Button, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      icon: 'sendfilled',
      type: 'default',
      stylingMode: 'text',
      disabled: true,
      elementAttr: {
        'aria-label': messageLocalization.format('dxChat-sendButtonAriaLabel')
      },
      onClick: e => {
        this._sendHandler(e);
      }
    });
  }
  _createMessageEnteredAction() {
    this._messageEnteredAction = this._createActionByOption('onMessageEntered', {
      excludeValidators: ['disabled']
    });
  }
  _createTypingStartAction() {
    this._typingStartAction = this._createActionByOption('onTypingStart', {
      excludeValidators: ['disabled']
    });
  }
  _createTypingEndAction() {
    this._typingEndAction = this._createActionByOption('onTypingEnd', {
      excludeValidators: ['disabled']
    });
  }
  _triggerTypingStartAction(e) {
    if (!this._typingEndTimeoutId) {
      var _this$_typingStartAct;
      (_this$_typingStartAct = this._typingStartAction) === null || _this$_typingStartAct === void 0 || _this$_typingStartAct.call(this, {
        event: e.event
      });
    }
  }
  _updateTypingEndTimeout() {
    clearTimeout(this._typingEndTimeoutId);
    // eslint-disable-next-line no-restricted-globals
    this._typingEndTimeoutId = setTimeout(() => {
      var _this$_typingEndActio;
      (_this$_typingEndActio = this._typingEndAction) === null || _this$_typingEndActio === void 0 || _this$_typingEndActio.call(this);
      this._clearTypingEndTimeout();
    }, TYPING_END_DELAY);
  }
  _clearTypingEndTimeout() {
    clearTimeout(this._typingEndTimeoutId);
    this._typingEndTimeoutId = undefined;
  }
  _sendHandler(e) {
    var _this$_typingEndActio2, _this$_messageEntered;
    if (!this._isValuableTextEntered()) {
      return;
    }
    this._clearTypingEndTimeout();
    (_this$_typingEndActio2 = this._typingEndAction) === null || _this$_typingEndActio2 === void 0 || _this$_typingEndActio2.call(this);
    const {
      text = ''
    } = this._textArea.option();
    const {
      text: previewText
    } = this.option();
    if (previewText) {
      const {
        onMessageUpdating
      } = this.option();
      onMessageUpdating === null || onMessageUpdating === void 0 || onMessageUpdating({
        text
      });
      return;
    }
    this._textArea.reset();
    this._toggleButtonDisableState(true);
    (_this$_messageEntered = this._messageEnteredAction) === null || _this$_messageEntered === void 0 || _this$_messageEntered.call(this, {
      text,
      event: e.event
    });
  }
  _toggleButtonDisableState(state) {
    this._button.option('disabled', state);
  }
  _isValuableTextEntered() {
    const {
      text
    } = this._textArea.option();
    return !!(text !== null && text !== void 0 && text.trim());
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        {
          var _this$_editingPreview;
          this._button.option(name, value);
          this._textArea.option(name, value);
          (_this$_editingPreview = this._editingPreview) === null || _this$_editingPreview === void 0 || _this$_editingPreview.option(name, value);
          break;
        }
      case 'onMessageEntered':
        this._createMessageEnteredAction();
        break;
      case 'onTypingStart':
        this._createTypingStartAction();
        break;
      case 'onTypingEnd':
        this._createTypingEndAction();
        break;
      case 'text':
        this._updateEditingPreview(value);
        this._updateInputContainer(value);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clean() {
    this._clearTypingEndTimeout();
    super._clean();
  }
  updateInputAria(emptyViewId) {
    this._textArea.option({
      inputAttr: {
        'aria-labelledby': emptyViewId
      }
    });
  }
  _updateEditingPreview(text) {
    if (this._editingPreview) {
      this._editingPreview.option('text', text);
      if (!text) {
        this._editingPreview = null;
      }
    } else {
      this._renderEditingPreview();
    }
  }
  _updateInputContainer(value) {
    this._textArea.option('value', value);
    const shouldButtonBeDisabled = !this._isValuableTextEntered();
    this._toggleButtonDisableState(shouldButtonBeDisabled);
  }
}
export default MessageBox;
