import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../core/renderer';
import DOMComponent from '../../../core/widget/dom_component';
import TextAreaOnSteroids from '../../../ui/chat/message_box/chat_text_area';
import EditingPreview from '../../../ui/chat/message_box/editing_preview';
export const CHAT_MESSAGEBOX_CLASS = 'dx-chat-messagebox';
export const CHAT_MESSAGEBOX_TEXTAREA_CONTAINER_CLASS = 'dx-chat-messagebox-textarea-container';
export const CHAT_MESSAGEBOX_TEXTAREA_CLASS = 'dx-chat-messagebox-textarea';
export const CHAT_MESSAGEBOX_BUTTON_CLASS = 'dx-chat-messagebox-button';
export const TYPING_END_DELAY = 2000;
const ESCAPE_KEY = 'escape';
class MessageBox extends DOMComponent {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      text: '',
      onMessageEntered: undefined,
      onMessageEditCanceled: undefined,
      onMessageUpdating: undefined,
      onTypingStart: undefined,
      onTypingEnd: undefined
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
    this._renderTextAreaContainer();
  }
  _renderTextAreaContainer() {
    const $inputContainer = $('<div>').addClass(CHAT_MESSAGEBOX_TEXTAREA_CONTAINER_CLASS).appendTo(this.element());
    this._renderTextArea($inputContainer);
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
    const $textArea = $('<div>').addClass(CHAT_MESSAGEBOX_TEXTAREA_CLASS);
    const textAreaOptions = this._getTextAreaOptions();
    $parent.append($textArea);
    this._textArea = this._createComponent($textArea, TextAreaOnSteroids, textAreaOptions);
    this._textArea.registerKeyHandler(ESCAPE_KEY, () => {
      if (this.option('text')) {
        this._cancelMessageEdit();
      }
    });
  }
  _getTextAreaOptions() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const options = {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      onInput: e => {
        this._triggerTypingStartAction(e);
        this._updateTypingEndTimeout();
      },
      onSend: e => {
        this._sendHandler(e);
      }
    };
    return options;
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
    (_this$_messageEntered = this._messageEnteredAction) === null || _this$_messageEntered === void 0 || _this$_messageEntered.call(this, {
      text,
      event: e.event
    });
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
        this._textArea.option('value', value);
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
}
export default MessageBox;