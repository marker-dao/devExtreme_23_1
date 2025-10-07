/**
* DevExtreme (esm/__internal/ui/chat/messagebubble.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { ICON_CLASS } from '../../core/utils/m_icon';
import Widget from '../../core/widget/widget';
export const CHAT_MESSAGEBUBBLE_CLASS = 'dx-chat-messagebubble';
export const CHAT_MESSAGEBUBBLE_DELETED_CLASS = 'dx-chat-messagebubble-deleted';
export const CHAT_MESSAGEBUBBLE_CONTENT_CLASS = 'dx-chat-messagebubble-content';
export const CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS = `${ICON_CLASS}-cursorprohibition`;
export const CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS = 'dx-has-image';
export const CHAT_MESSAGEBUBBLE_IMAGE_CLASS = 'dx-chat-messagebubble-image';
export const MESSAGE_DATA_KEY = 'dxMessageData';
class MessageBubble extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      isDeleted: false,
      isEdited: false,
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
      template,
      type,
      text,
      src,
      alt,
      isDeleted = false
    } = this.option();
    this.$element().removeClass(CHAT_MESSAGEBUBBLE_DELETED_CLASS);
    const $bubbleContainer = $(this.element()).find(`.${CHAT_MESSAGEBUBBLE_CONTENT_CLASS}`);
    $bubbleContainer.empty();
    if (template) {
      template({
        type,
        text,
        src,
        alt
      }, getPublicElement($bubbleContainer));
      return;
    }
    if (isDeleted) {
      this.$element().addClass(CHAT_MESSAGEBUBBLE_DELETED_CLASS);
      const icon = $('<div>').addClass(ICON_CLASS).addClass(CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS);
      const deletedMessage = $('<div>').text(messageLocalization.format('dxChat-deletedMessageText'));
      $bubbleContainer.append(icon).append(deletedMessage);
      return;
    }
    switch (type) {
      case 'image':
        this.$element().addClass(CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS);
        $('<img>').attr('src', src ?? '').attr('alt', alt ?? messageLocalization.format('dxChat-defaultImageAlt')).addClass(CHAT_MESSAGEBUBBLE_IMAGE_CLASS).appendTo($bubbleContainer);
        break;
      case 'text':
      default:
        $bubbleContainer.text(text ?? '');
    }
  }
  _updateMessageData(property, value) {
    const messageData = this.$element().data(MESSAGE_DATA_KEY) || {};
    messageData[property] = value;
    this.$element().data(MESSAGE_DATA_KEY, messageData);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'text':
      case 'src':
      case 'alt':
      case 'isDeleted':
        this._updateMessageData(name, value);
        this._updateContent();
        break;
      case 'template':
        this._updateContent();
        break;
      case 'isEdited':
        this._updateMessageData(name, value);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default MessageBubble;
