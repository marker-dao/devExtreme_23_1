/**
* DevExtreme (cjs/__internal/ui/chat/message_box/message_box.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TYPING_END_DELAY = exports.CHAT_MESSAGEBOX_TEXTAREA_CONTAINER_CLASS = exports.CHAT_MESSAGEBOX_TEXTAREA_CLASS = exports.CHAT_MESSAGEBOX_CLASS = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _dom_component = _interopRequireDefault(require("../../../core/widget/dom_component"));
var _chat_text_area = _interopRequireDefault(require("../../../ui/chat/message_box/chat_text_area"));
var _editing_preview = _interopRequireDefault(require("../../../ui/chat/message_box/editing_preview"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_MESSAGEBOX_CLASS = exports.CHAT_MESSAGEBOX_CLASS = 'dx-chat-messagebox';
const CHAT_MESSAGEBOX_TEXTAREA_CONTAINER_CLASS = exports.CHAT_MESSAGEBOX_TEXTAREA_CONTAINER_CLASS = 'dx-chat-messagebox-textarea-container';
const CHAT_MESSAGEBOX_TEXTAREA_CLASS = exports.CHAT_MESSAGEBOX_TEXTAREA_CLASS = 'dx-chat-messagebox-textarea';
const TYPING_END_DELAY = exports.TYPING_END_DELAY = 2000;
const ESCAPE_KEY = 'escape';
class MessageBox extends _dom_component.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      fileUploaderOptions: undefined,
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
    (0, _renderer.default)(this.element()).addClass(CHAT_MESSAGEBOX_CLASS);
    super._initMarkup();
    if (this.option('text')) {
      this._renderEditingPreview();
    }
    this._renderTextAreaContainer();
  }
  _renderTextAreaContainer() {
    const $inputContainer = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEBOX_TEXTAREA_CONTAINER_CLASS).appendTo(this.element());
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
    const $editingPreview = (0, _renderer.default)('<div>').prependTo(this.element());
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      text
    } = this.option();
    this._editingPreview = this._createComponent($editingPreview, _editing_preview.default, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      text,
      onCancel: () => this._cancelMessageEdit()
    });
  }
  _renderTextArea($parent) {
    const $textArea = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEBOX_TEXTAREA_CLASS);
    const textAreaOptions = this._getTextAreaOptions();
    $parent.append($textArea);
    this._textArea = this._createComponent($textArea, _chat_text_area.default, textAreaOptions);
    this._textArea.registerKeyHandler(ESCAPE_KEY, () => {
      if (this.option('text')) {
        this._cancelMessageEdit();
      }
    });
  }
  _getTextAreaOptions() {
    const {
      activeStateEnabled,
      fileUploaderOptions,
      focusStateEnabled,
      hoverStateEnabled,
      text
    } = this.option();
    const options = {
      activeStateEnabled,
      fileUploaderOptions,
      focusStateEnabled,
      hoverStateEnabled,
      value: text,
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
    var _this$_editingPreview;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._textArea.option(name, value);
        (_this$_editingPreview = this._editingPreview) === null || _this$_editingPreview === void 0 || _this$_editingPreview.option(name, value);
        break;
      case 'fileUploaderOptions':
        this._textArea.option(name, value);
        break;
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
var _default = exports.default = MessageBox;
