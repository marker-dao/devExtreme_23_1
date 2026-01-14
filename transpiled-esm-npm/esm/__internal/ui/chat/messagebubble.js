import messageLocalization from '../../../common/core/localization/message';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { ICON_CLASS } from '../../core/utils/m_icon';
import Widget from '../../core/widget/widget';
import Accordion from '../../ui/accordion';
import FileView from '../../ui/chat/file_view/file_view';
export const CHAT_MESSAGEBUBBLE_CLASS = 'dx-chat-messagebubble';
export const CHAT_MESSAGEBUBBLE_DELETED_CLASS = 'dx-chat-messagebubble-deleted';
export const CHAT_MESSAGEBUBBLE_CONTENT_CLASS = 'dx-chat-messagebubble-content';
export const CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS = `${ICON_CLASS}-cursorprohibition`;
export const CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS = 'dx-has-image';
export const CHAT_MESSAGEBUBBLE_IMAGE_CLASS = 'dx-chat-messagebubble-image';
export const CHAT_MESSAGEBUBBLE_FUNCTIONCALL_CLASS = 'dx-chat-messagebubble-functioncall';
export const MESSAGE_DATA_KEY = 'dxMessageData';
class MessageBubble extends Widget {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      isDeleted: false,
      isEdited: false,
      text: '',
      focusStateEnabled: true,
      hoverStateEnabled: true,
      template: null
    });
  }
  _initMarkup() {
    const $element = $(this.element());
    $element.addClass(CHAT_MESSAGEBUBBLE_CLASS);
    super._initMarkup();
    this._renderContentContainer();
    this._renderFunctionCallElement();
    this._renderAttachmentsElement();
    this._updateContent();
    this._renderFunctionCall();
    this._renderAttachments();
  }
  _renderContentContainer() {
    this._$content = $('<div>').addClass(CHAT_MESSAGEBUBBLE_CONTENT_CLASS).appendTo(this.$element());
  }
  _renderFunctionCallElement() {
    var _this$_$functionCall;
    const {
      metadata,
      isDeleted
    } = this.option();
    (_this$_$functionCall = this._$functionCall) === null || _this$_$functionCall === void 0 || _this$_$functionCall.remove();
    this._$functionCall = undefined;
    if (metadata !== null && metadata !== void 0 && metadata.functionCall && !isDeleted) {
      this._$functionCall = $('<div>').addClass(CHAT_MESSAGEBUBBLE_FUNCTIONCALL_CLASS).appendTo(this.$element());
    }
  }
  _renderAttachmentsElement() {
    var _this$_$attachments;
    const {
      attachments,
      isDeleted
    } = this.option();
    (_this$_$attachments = this._$attachments) === null || _this$_$attachments === void 0 || _this$_$attachments.remove();
    this._$attachments = undefined;
    if (attachments !== null && attachments !== void 0 && attachments.length && !isDeleted) {
      this._$attachments = $('<div>').appendTo(this.$element());
    }
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
    this.$element().removeClass(CHAT_MESSAGEBUBBLE_DELETED_CLASS).removeClass(CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS);
    this._$content.empty();
    if (template) {
      template({
        type,
        text,
        src,
        alt
      }, getPublicElement(this._$content));
      return;
    }
    if (isDeleted) {
      this.$element().addClass(CHAT_MESSAGEBUBBLE_DELETED_CLASS);
      const icon = $('<div>').addClass(ICON_CLASS).addClass(CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS);
      const deletedMessage = $('<div>').text(messageLocalization.format('dxChat-deletedMessageText'));
      this._$content.append(icon).append(deletedMessage);
      return;
    }
    switch (type) {
      case 'image':
        this.$element().addClass(CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS);
        $('<img>').attr('src', src ?? '').attr('alt', alt ?? messageLocalization.format('dxChat-defaultImageAlt')).addClass(CHAT_MESSAGEBUBBLE_IMAGE_CLASS).appendTo(this._$content);
        break;
      case 'text':
      default:
        this._$content.text(text ?? '');
    }
  }
  _renderFunctionCall() {
    const {
      metadata
    } = this.option();
    if (!this._$functionCall || !(metadata !== null && metadata !== void 0 && metadata.functionCall)) {
      return;
    }
    this._$functionCall.empty();
    const {
      functionCall
    } = metadata;
    const accordionItems = [{
      title: messageLocalization.format('dxChat-functionCallTitle'),
      template: () => {
        const $content = $('<div>');
        const $functionName = $('<div>').append($('<strong>').text(`${messageLocalization.format('dxChat-functionCallLabel')}: `)).append($('<span>').text(functionCall.name));
        const args = functionCall.arguments || [];
        const argumentsText = args.length > 0 ? args.map(arg => Object.entries(arg).map(_ref => {
          let [key, value] = _ref;
          return `${key}: ${JSON.stringify(value)}`;
        }).join(', ')).join(', ') : '';
        const $arguments = $('<div>').append($('<strong>').text(`${messageLocalization.format('dxChat-argumentsLabel')}: `)).append($('<span>').text(argumentsText));
        const $result = $('<div>').append($('<strong>').text(`${messageLocalization.format('dxChat-resultLabel')}: `)).append($('<span>').text(JSON.stringify(functionCall.result)));
        $content.append($functionName).append($arguments).append($result);
        return $content;
      }
    }];
    const {
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    this._createComponent(this._$functionCall, Accordion, {
      dataSource: accordionItems,
      collapsible: true,
      multiple: false,
      selectedIndex: -1,
      focusStateEnabled,
      hoverStateEnabled
    });
  }
  _renderAttachments() {
    const {
      attachments,
      onAttachmentDownloadClick
    } = this.option();
    if (!this._$attachments) {
      return;
    }
    this._$attachments.empty();
    if (attachments !== null && attachments !== void 0 && attachments.length) {
      this._createComponent(this._$attachments, FileView, {
        files: attachments,
        onDownload: onAttachmentDownloadClick
      });
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
        this._renderAttachmentsElement();
        this._renderAttachments();
        break;
      case 'type':
        this._updateContent();
        this._renderAttachmentsElement();
        this._renderAttachments();
        break;
      case 'template':
        this._updateContent();
        break;
      case 'isEdited':
        this._updateMessageData(name, value);
        break;
      case 'metadata':
        this._renderFunctionCallElement();
        this._renderFunctionCall();
        break;
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._renderFunctionCall();
        break;
      case 'onAttachmentDownloadClick':
      case 'attachments':
        this._renderAttachmentsElement();
        this._renderAttachments();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default MessageBubble;