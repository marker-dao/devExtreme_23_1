"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MESSAGE_DATA_KEY = exports.CHAT_MESSAGEGROUP_CLASS = exports.CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS = exports.CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS = void 0;
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _type = require("../../../core/utils/type");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _avatar = _interopRequireDefault(require("./avatar"));
var _messagebubble = _interopRequireDefault(require("./messagebubble"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MESSAGE_DATA_KEY = exports.MESSAGE_DATA_KEY = 'dxMessageData';
const CHAT_MESSAGEGROUP_CLASS = exports.CHAT_MESSAGEGROUP_CLASS = 'dx-chat-messagegroup';
const CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS = exports.CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS = 'dx-chat-messagegroup-alignment-start';
const CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS = exports.CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS = 'dx-chat-messagegroup-alignment-end';
const CHAT_MESSAGEGROUP_INFORMATION_CLASS = 'dx-chat-messagegroup-information';
const CHAT_MESSAGEGROUP_TIME_CLASS = 'dx-chat-messagegroup-time';
const CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS = 'dx-chat-messagegroup-author-name';
const CHAT_MESSAGEGROUP_CONTENT_CLASS = 'dx-chat-messagegroup-content';
class MessageGroup extends _widget.default {
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
    const {
      alignment
    } = this.option();
    (0, _renderer.default)(this.element()).removeClass(CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS).removeClass(CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS);
    const alignmentClass = alignment === 'start' ? CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS : CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS;
    (0, _renderer.default)(this.element()).addClass(alignmentClass);
  }
  _initMarkup() {
    const {
      alignment,
      items,
      showAvatar
    } = this.option();
    (0, _renderer.default)(this.element()).addClass(CHAT_MESSAGEGROUP_CLASS);
    this._updateAlignmentClass();
    super._initMarkup();
    if (items.length === 0) {
      return;
    }
    if (showAvatar && alignment === 'start') {
      this._renderAvatar();
    }
    this._renderMessageGroupInformation(items === null || items === void 0 ? void 0 : items[0]);
    this._renderMessageBubbles(items);
  }
  _renderAvatar() {
    const $avatar = (0, _renderer.default)('<div>').appendTo(this.element());
    const {
      items
    } = this.option();
    const {
      author
    } = items[0];
    const authorName = author === null || author === void 0 ? void 0 : author.name;
    const authorAvatarUrl = author === null || author === void 0 ? void 0 : author.avatarUrl;
    const authorAvatarAlt = author === null || author === void 0 ? void 0 : author.avatarAlt;
    this._avatar = this._createComponent($avatar, _avatar.default, {
      name: authorName,
      url: authorAvatarUrl,
      alt: authorAvatarAlt
    });
  }
  _renderMessageBubble(message) {
    const $bubble = (0, _renderer.default)('<div>').data(MESSAGE_DATA_KEY, message);
    this._createComponent($bubble, _messagebubble.default, this._getMessageBubbleOptions(message));
    this._$messageBubbleContainer.append($bubble);
  }
  _getMessageBubbleOptions(message) {
    const options = {
      text: message.text
    };
    const {
      messageTemplate
    } = this.option();
    if (messageTemplate) {
      options.template = (text, container) => {
        messageTemplate(_extends({}, message, {
          text
        }), container);
      };
    }
    return options;
  }
  _renderMessageBubbles(items) {
    this._$messageBubbleContainer = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEGROUP_CONTENT_CLASS);
    items.forEach(message => {
      this._renderMessageBubble(message);
    });
    this._$messageBubbleContainer.appendTo(this.element());
  }
  _renderMessageGroupInformation(message) {
    const {
      alignment,
      showUserName,
      showMessageTimestamp
    } = this.option();
    const {
      timestamp,
      author
    } = message;
    const $information = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEGROUP_INFORMATION_CLASS);
    if (showUserName) {
      const authorName = (author === null || author === void 0 ? void 0 : author.name) ?? _message.default.format('dxChat-defaultUserName');
      const authorNameText = alignment === 'start' ? authorName : '';
      (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS).text(authorNameText).appendTo($information);
    }
    if (showMessageTimestamp) {
      const $time = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEGROUP_TIME_CLASS).appendTo($information);
      const shouldAddTimeValue = this._shouldAddTimeValue(timestamp);
      if (shouldAddTimeValue) {
        const timeValue = this._getTimeValue(timestamp);
        $time.text(timeValue);
      }
    }
    $information.appendTo(this.element());
  }
  _shouldAddTimeValue(timestamp) {
    const deserializedDate = _date_serialization.default.deserializeDate(timestamp);
    return (0, _type.isDate)(deserializedDate) && !isNaN(deserializedDate.getTime());
  }
  _getTimeValue(timestamp) {
    const deserializedDate = _date_serialization.default.deserializeDate(timestamp);
    const {
      messageTimestampFormat
    } = this.option();
    const formattedTime = _date.default.format(deserializedDate, messageTimestampFormat);
    return formattedTime;
  }
  _clean() {
    this._lastBubble = null;
    super._clean();
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
var _default = exports.default = MessageGroup;