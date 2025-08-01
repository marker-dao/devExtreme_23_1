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
    (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEBUBBLE_CONTENT_CLASS).appendTo($element);
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
    const $bubbleContainer = (0, _renderer.default)(this.element()).find(`.${CHAT_MESSAGEBUBBLE_CONTENT_CLASS}`);
    $bubbleContainer.empty();
    if (template) {
      template({
        type,
        text,
        src,
        alt
      }, (0, _element.getPublicElement)($bubbleContainer));
      return;
    }
    if (isDeleted) {
      this.$element().addClass(CHAT_MESSAGEBUBBLE_DELETED_CLASS);
      const icon = (0, _renderer.default)('<div>').addClass(_m_icon.ICON_CLASS).addClass(CHAT_MESSAGEBUBBLE_ICON_PROHIBITION_CLASS);
      const deletedMessage = (0, _renderer.default)('<div>').text(_message.default.format('dxChat-deletedMessageText'));
      $bubbleContainer.append(icon).append(deletedMessage);
      return;
    }
    switch (type) {
      case 'image':
        this.$element().addClass(CHAT_MESSAGEBUBBLE_HAS_IMAGE_CLASS);
        (0, _renderer.default)('<img>').attr('src', src ?? '').attr('alt', alt ?? _message.default.format('dxChat-defaultImageAlt')).addClass(CHAT_MESSAGEBUBBLE_IMAGE_CLASS).appendTo($bubbleContainer);
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
var _default = exports.default = MessageBubble;