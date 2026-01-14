/**
* DevExtreme (esm/__internal/ui/chat/message_box/editing_preview.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import Button from '../../../../ui/button';
import DOMComponent from '../../../core/widget/dom_component';
export const CHAT_EDITING_PREVIEW_CLASS = 'dx-chat-editing-preview';
export const CHAT_EDITING_PREVIEW_HIDING_CLASS = 'dx-chat-editing-preview-hiding';
export const CHAT_EDITING_PREVIEW_CONTENT_CLASS = 'dx-chat-editing-preview-content';
export const CHAT_EDITING_PREVIEW_CAPTION_CLASS = 'dx-chat-editing-preview-caption';
export const CHAT_EDITING_PREVIEW_TEXT_CLASS = 'dx-chat-editing-preview-text';
export const CHAT_EDITING_PREVIEW_CANCEL_BUTTON_CLASS = 'dx-chat-editing-preview-cancel-button';
class EditingPreview extends DOMComponent {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      text: '',
      onCancel: undefined
    });
  }
  _init() {
    super._init();
    $(this.element()).addClass(CHAT_EDITING_PREVIEW_CLASS);
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
    const $message = $('<div>').addClass(CHAT_EDITING_PREVIEW_CONTENT_CLASS).appendTo(this.element());
    $('<div>').addClass(CHAT_EDITING_PREVIEW_CAPTION_CLASS).text(messageLocalization.format('dxChat-editingMessageCaption')).appendTo($message);
    this._$messageText = $('<div>').addClass(CHAT_EDITING_PREVIEW_TEXT_CLASS).appendTo($message);
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
    const $button = $('<div>').addClass(CHAT_EDITING_PREVIEW_CANCEL_BUTTON_CLASS).appendTo(this.element());
    this._closeButton = this._createComponent($button, Button, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      icon: 'remove',
      type: 'normal',
      stylingMode: 'text',
      elementAttr: {
        'aria-label': messageLocalization.format('dxChat-cancelEditingButtonAriaLabel')
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
export default EditingPreview;
