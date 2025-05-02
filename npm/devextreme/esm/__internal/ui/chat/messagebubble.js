/**
* DevExtreme (esm/__internal/ui/chat/messagebubble.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import Widget from '../../core/widget/widget';
export const CHAT_MESSAGEBUBBLE_CLASS = 'dx-chat-messagebubble';
const CHAT_MESSAGEBUBBLE_CONTENT_CLASS = 'dx-chat-messagebubble-content';
class MessageBubble extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      text: '',
      template: null
    });
  }
  _initMarkup() {
    const $element = $(this.element());
    $element.addClass(CHAT_MESSAGEBUBBLE_CLASS);
    $('<div>').addClass(CHAT_MESSAGEBUBBLE_CONTENT_CLASS).appendTo($element);
    super._initMarkup();
    this._updateContent();
  }
  _updateContent() {
    const {
      text = '',
      template
    } = this.option();
    const $bubbleContainer = $(this.element()).find(`.${CHAT_MESSAGEBUBBLE_CONTENT_CLASS}`);
    $bubbleContainer.empty();
    if (template) {
      template(text, getPublicElement($bubbleContainer));
      return;
    }
    $bubbleContainer.text(text);
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'text':
      case 'template':
        this._updateContent();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default MessageBubble;
