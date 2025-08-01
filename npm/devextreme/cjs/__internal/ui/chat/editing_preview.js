/**
* DevExtreme (cjs/__internal/ui/chat/editing_preview.js)
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
exports.default = exports.CHAT_EDITING_PREVIEW_TEXT_CLASS = exports.CHAT_EDITING_PREVIEW_HIDING_CLASS = exports.CHAT_EDITING_PREVIEW_CONTENT_CLASS = exports.CHAT_EDITING_PREVIEW_CLASS = exports.CHAT_EDITING_PREVIEW_CAPTION_CLASS = exports.CHAT_EDITING_PREVIEW_CANCEL_BUTTON_CLASS = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _button = _interopRequireDefault(require("../../../ui/button"));
var _dom_component = _interopRequireDefault(require("../../core/widget/dom_component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_EDITING_PREVIEW_CLASS = exports.CHAT_EDITING_PREVIEW_CLASS = 'dx-chat-editing-preview';
const CHAT_EDITING_PREVIEW_HIDING_CLASS = exports.CHAT_EDITING_PREVIEW_HIDING_CLASS = 'dx-chat-editing-preview-hiding';
const CHAT_EDITING_PREVIEW_CONTENT_CLASS = exports.CHAT_EDITING_PREVIEW_CONTENT_CLASS = 'dx-chat-editing-preview-content';
const CHAT_EDITING_PREVIEW_CAPTION_CLASS = exports.CHAT_EDITING_PREVIEW_CAPTION_CLASS = 'dx-chat-editing-preview-caption';
const CHAT_EDITING_PREVIEW_TEXT_CLASS = exports.CHAT_EDITING_PREVIEW_TEXT_CLASS = 'dx-chat-editing-preview-text';
const CHAT_EDITING_PREVIEW_CANCEL_BUTTON_CLASS = exports.CHAT_EDITING_PREVIEW_CANCEL_BUTTON_CLASS = 'dx-chat-editing-preview-cancel-button';
class EditingPreview extends _dom_component.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      text: '',
      onCancel: undefined
    });
  }
  _init() {
    super._init();
    (0, _renderer.default)(this.element()).addClass(CHAT_EDITING_PREVIEW_CLASS);
  }
  _initMarkup() {
    super._initMarkup();
    const {
      text
    } = this.option();
    if (text) {
      this._renderContent();
      return;
    }
    this._cleanContent();
  }
  _renderContent() {
    this._renderMessagePreview();
    this._updateText();
    this._renderCloseButton();
  }
  _renderMessagePreview() {
    const $message = (0, _renderer.default)('<div>').addClass(CHAT_EDITING_PREVIEW_CONTENT_CLASS).appendTo(this.element());
    (0, _renderer.default)('<div>').addClass(CHAT_EDITING_PREVIEW_CAPTION_CLASS).text(_message.default.format('dxChat-editingMessageCaption')).appendTo($message);
    this._$messageText = (0, _renderer.default)('<div>').addClass(CHAT_EDITING_PREVIEW_TEXT_CLASS).appendTo($message);
  }
  _updateText() {
    const {
      text = ''
    } = this.option();
    this._$messageText.text(text);
  }
  _renderCloseButton() {
    const {
      onCancel,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const $button = (0, _renderer.default)('<div>').addClass(CHAT_EDITING_PREVIEW_CANCEL_BUTTON_CLASS).appendTo(this.element());
    this._closeButton = this._createComponent($button, _button.default, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      icon: 'remove',
      type: 'normal',
      stylingMode: 'text',
      elementAttr: {
        'aria-label': _message.default.format('dxChat-cancelEditingButtonAriaLabel')
      },
      onClick: e => {
        onCancel === null || onCancel === void 0 || onCancel(e);
      }
    });
  }
  _processTextUpdate(previousValue) {
    const {
      text = ''
    } = this.option();
    if (previousValue && text) {
      this._updateText();
      return;
    }
    if (text) {
      this._renderContent();
      return;
    }
    this.$element().get(0).addEventListener('animationend', () => {
      this._cleanContent();
    }, {
      once: true
    });
    this.$element().addClass(CHAT_EDITING_PREVIEW_HIDING_CLASS);
  }
  _cleanContent() {
    super._dispose();
    this.$element().remove();
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        {
          this._closeButton.option(name, value);
          break;
        }
      case 'text':
        this._processTextUpdate(previousValue);
        break;
      case 'onCancel':
        this._closeButton.option('onClick', value);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = EditingPreview;
