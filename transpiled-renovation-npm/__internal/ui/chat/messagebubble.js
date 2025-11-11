"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MESSAGE_DATA_KEY = exports.CHAT_MESSAGEBUBBLE_IMAGE_CLASS = exports.CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS = exports.CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS = exports.CHAT_MESSAGEBUBBLE_DELETED_CLASS = exports.CHAT_MESSAGEBUBBLE_CONTENT_CLASS = exports.CHAT_MESSAGEBUBBLE_CLASS = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_icon = require("../../core/utils/m_icon");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _file_view = _interopRequireDefault(require("../../ui/chat/file_view/file_view"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_MESSAGEBUBBLE_CLASS = exports.CHAT_MESSAGEBUBBLE_CLASS = 'dx-chat-messagebubble';
const CHAT_MESSAGEBUBBLE_DELETED_CLASS = exports.CHAT_MESSAGEBUBBLE_DELETED_CLASS = 'dx-chat-messagebubble-deleted';
const CHAT_MESSAGEBUBBLE_CONTENT_CLASS = exports.CHAT_MESSAGEBUBBLE_CONTENT_CLASS = 'dx-chat-messagebubble-content';
const CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS = exports.CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS = `${_m_icon.ICON_CLASS}-cursorprohibition`;
const CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS = exports.CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS = 'dx-has-image';
const CHAT_MESSAGEBUBBLE_IMAGE_CLASS = exports.CHAT_MESSAGEBUBBLE_IMAGE_CLASS = 'dx-chat-messagebubble-image';
const MESSAGE_DATA_KEY = exports.MESSAGE_DATA_KEY = 'dxMessageData';
class MessageBubble extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      isDeleted: false,
      isEdited: false,
      text: '',
      template: null
    });
  }
  _initMarkup() {
    const $element = (0, _renderer.default)(this.element());
    $element.addClass(CHAT_MESSAGEBUBBLE_CLASS);
    super._initMarkup();
    this._renderContentContainer();
    this._renderAttachmentsElement();
    this._updateContent();
    this._renderAttachments();
  }
  _renderContentContainer() {
    this._$content = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEBUBBLE_CONTENT_CLASS).appendTo(this.$element());
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
      this._$attachments = (0, _renderer.default)('<div>').appendTo(this.$element());
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
      }, (0, _element.getPublicElement)(this._$content));
      return;
    }
    if (isDeleted) {
      this.$element().addClass(CHAT_MESSAGEBUBBLE_DELETED_CLASS);
      const icon = (0, _renderer.default)('<div>').addClass(_m_icon.ICON_CLASS).addClass(CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS);
      const deletedMessage = (0, _renderer.default)('<div>').text(_message.default.format('dxChat-deletedMessageText'));
      this._$content.append(icon).append(deletedMessage);
      return;
    }
    switch (type) {
      case 'image':
        this.$element().addClass(CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS);
        (0, _renderer.default)('<img>').attr('src', src ?? '').attr('alt', alt ?? _message.default.format('dxChat-defaultImageAlt')).addClass(CHAT_MESSAGEBUBBLE_IMAGE_CLASS).appendTo(this._$content);
        break;
      case 'text':
      default:
        this._$content.text(text ?? '');
    }
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
      this._createComponent(this._$attachments, _file_view.default, {
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
var _default = exports.default = MessageBubble;