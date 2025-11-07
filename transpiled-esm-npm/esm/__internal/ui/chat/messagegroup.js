import _extends from "@babel/runtime/helpers/esm/extends";
import dateLocalization from '../../../common/core/localization/date';
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import dateSerialization from '../../../core/utils/date_serialization';
import { isDate, isDefined } from '../../../core/utils/type';
import Widget from '../../core/widget/widget';
import Avatar from './avatar';
import MessageBubble, { CHAT_MESSAGEBUBBLE_CLASS, MESSAGE_DATA_KEY } from './messagebubble';
export const CHAT_MESSAGEGROUP_CLASS = 'dx-chat-messagegroup';
export const CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS = 'dx-chat-messagegroup-alignment-start';
export const CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS = 'dx-chat-messagegroup-alignment-end';
const CHAT_MESSAGEGROUP_INFORMATION_CLASS = 'dx-chat-messagegroup-information';
const CHAT_MESSAGEGROUP_TIME_CLASS = 'dx-chat-messagegroup-time';
const CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS = 'dx-chat-messagegroup-author-name';
const CHAT_MESSAGEGROUP_CONTENT_CLASS = 'dx-chat-messagegroup-content';
const CHAT_MESSAGE_EDITED_CLASS = 'dx-chat-message-edited';
const CHAT_MESSAGE_EDITED_HIDING_CLASS = 'dx-chat-message-edited-hiding';
const CHAT_MESSAGE_EDITED_ICON_CLASS = 'dx-chat-message-edited-icon';
const CHAT_MESSAGE_EDITED_TEXT_CLASS = 'dx-chat-message-edited-text';
class MessageGroup extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: [],
      alignment: 'start',
      showAvatar: true,
      showUserName: true,
      showMessageTimestamp: true,
      messageTemplate: null,
      messageTimestampFormat: 'shorttime'
    });
  }
  _updateAlignmentClass() {
    $(this.element()).removeClass(CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS).removeClass(CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS);
    const alignmentClass = this._isAlignmentStart() ? CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS : CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS;
    $(this.element()).addClass(alignmentClass);
  }
  _initMarkup() {
    const {
      items,
      showAvatar
    } = this.option();
    $(this.element()).addClass(CHAT_MESSAGEGROUP_CLASS);
    this._updateAlignmentClass();
    super._initMarkup();
    if (items.length === 0) {
      return;
    }
    if (showAvatar && this._isAlignmentStart()) {
      this._renderAvatar();
    }
    this._renderMessageGroupInformation(items === null || items === void 0 ? void 0 : items[0]);
    this._renderMessageBubbles(items);
  }
  _renderAvatar() {
    const $avatar = $('<div>').appendTo(this.element());
    const {
      items
    } = this.option();
    const {
      author
    } = items[0];
    const authorName = author === null || author === void 0 ? void 0 : author.name;
    const authorAvatarUrl = author === null || author === void 0 ? void 0 : author.avatarUrl;
    const authorAvatarAlt = author === null || author === void 0 ? void 0 : author.avatarAlt;
    this._avatar = this._createComponent($avatar, Avatar, {
      name: authorName,
      url: authorAvatarUrl,
      alt: authorAvatarAlt
    });
  }
  _renderMessageBubble(message) {
    const $bubble = $('<div>').data(MESSAGE_DATA_KEY, message).appendTo(this._$messageBubbleContainer);
    this._createComponent($bubble, MessageBubble, this._getMessageBubbleOptions(message));
  }
  _getMessageBubbleOptions(message) {
    const {
      messageTemplate,
      onAttachmentDownloadClick
    } = this.option();
    const {
      isDeleted,
      type,
      attachments
    } = message;
    const options = {
      isDeleted,
      type,
      attachments,
      onAttachmentDownloadClick
    };
    if (type === 'image') {
      options.alt = message.alt;
      options.src = message.src;
    } else {
      options.text = message.text;
    }
    if (messageTemplate) {
      options.template = (messageData, container) => {
        messageTemplate(_extends({}, message, messageData), container);
      };
    }
    return options;
  }
  _renderMessageBubbles(items) {
    this._$messageBubbleContainer = $('<div>').addClass(CHAT_MESSAGEGROUP_CONTENT_CLASS).appendTo(this.element());
    items.forEach((message, index) => {
      const shouldCreateEditedElement = index !== 0 && message.type !== 'image' && message.isEdited === true && !message.isDeleted;
      if (shouldCreateEditedElement) {
        const $edited = this._createEditedElement();
        $edited.appendTo(this._$messageBubbleContainer);
      }
      this._renderMessageBubble(message);
    });
  }
  _renderMessageGroupInformation(message, shouldRenderEditedMessage) {
    const {
      showUserName,
      showMessageTimestamp
    } = this.option();
    const {
      timestamp,
      author
    } = message;
    const isEdited = isDefined(shouldRenderEditedMessage) ? shouldRenderEditedMessage : message.type !== 'image' && message.isEdited;
    const isAlignmentStart = this._isAlignmentStart();
    this.$element().find(`.${CHAT_MESSAGEGROUP_INFORMATION_CLASS}`).remove();
    const $information = $('<div>').addClass(CHAT_MESSAGEGROUP_INFORMATION_CLASS);
    if (showUserName) {
      const authorName = (author === null || author === void 0 ? void 0 : author.name) ?? messageLocalization.format('dxChat-defaultUserName');
      const authorNameText = isAlignmentStart ? authorName : '';
      $('<div>').addClass(CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS).text(authorNameText).appendTo($information);
    }
    if (isEdited && !isAlignmentStart) {
      $information.append(this._createEditedElement());
    }
    if (showMessageTimestamp) {
      const $time = $('<div>').addClass(CHAT_MESSAGEGROUP_TIME_CLASS).appendTo($information);
      const shouldAddTimeValue = this._shouldAddTimeValue(timestamp);
      if (shouldAddTimeValue) {
        const timeValue = this._getTimeValue(timestamp);
        $time.text(timeValue);
      }
    }
    if (isEdited && isAlignmentStart) {
      $information.append(this._createEditedElement());
    }
    $information.appendTo(this.element());
  }
  _createEditedElement() {
    const $edited = $('<div>').addClass(CHAT_MESSAGE_EDITED_CLASS);
    $('<div>').addClass(CHAT_MESSAGE_EDITED_ICON_CLASS).appendTo($edited);
    const editedMessageText = messageLocalization.format('dxChat-editedMessageText');
    $('<div>').addClass(CHAT_MESSAGE_EDITED_TEXT_CLASS).text(editedMessageText).appendTo($edited);
    return $edited;
  }
  _updateMessageEditedText($message) {
    let isEdited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const $firstMessage = this._$messageBubbleContainer.find(`.${CHAT_MESSAGEBUBBLE_CLASS}`).first();
    const removeWithAnimation = $editedElement => {
      $editedElement.get(0).addEventListener('animationend', () => {
        $editedElement.remove();
      }, {
        once: true
      });
      $editedElement.addClass(CHAT_MESSAGE_EDITED_HIDING_CLASS);
    };
    if ($message.is($firstMessage)) {
      const items = this.option('items');
      const $information = this.$element().find(`.${CHAT_MESSAGEGROUP_INFORMATION_CLASS}`);
      const $edited = $information.find(`.${CHAT_MESSAGE_EDITED_CLASS}`);
      if ($edited.length && isEdited) {
        return;
      }
      if ($edited.length && !isEdited) {
        removeWithAnimation($edited);
        return;
      }
      if (isEdited) {
        this._renderMessageGroupInformation(items[0], true);
      }
      return;
    }
    const $prevElement = $message.prev();
    if ($prevElement.hasClass(CHAT_MESSAGE_EDITED_CLASS)) {
      if (!isEdited) {
        removeWithAnimation($prevElement);
      }
      return;
    }
    if (isEdited) {
      const $edited = this._createEditedElement();
      $edited.insertBefore($message);
    }
  }
  _isAlignmentStart() {
    const {
      alignment
    } = this.option();
    return alignment === 'start';
  }
  _shouldAddTimeValue(timestamp) {
    const deserializedDate = dateSerialization.deserializeDate(timestamp);
    return isDate(deserializedDate) && !isNaN(deserializedDate.getTime());
  }
  _getTimeValue(timestamp) {
    const deserializedDate = dateSerialization.deserializeDate(timestamp);
    const {
      messageTimestampFormat
    } = this.option();
    const formattedTime = dateLocalization.format(deserializedDate, messageTimestampFormat);
    return formattedTime;
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'items':
      case 'alignment':
      case 'showAvatar':
      case 'showUserName':
      case 'showMessageTimestamp':
      case 'messageTemplate':
      case 'messageTimestampFormat':
      case 'onAttachmentDownloadClick':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  renderMessage(message) {
    const {
      items
    } = this.option();
    const newItems = [...items, message];
    this._setOptionWithoutOptionChange('items', newItems);
    this._renderMessageBubble(message);
  }
}
export default MessageGroup;