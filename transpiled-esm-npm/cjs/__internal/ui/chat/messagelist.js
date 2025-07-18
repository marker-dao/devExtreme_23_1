"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MESSAGEGROUP_TIMEOUT = exports.CHAT_MESSAGELIST_CONTEXT_MENU_TARGET = exports.CHAT_MESSAGELIST_CONTEXT_MENU_CONTENT_CLASS = exports.CHAT_MESSAGELIST_CONTEXT_MENU_CLASS = void 0;
var _common = require("../../../common");
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _resize_observer = _interopRequireDefault(require("../../../core/resize_observer"));
var _common2 = require("../../../core/utils/common");
var _date2 = _interopRequireDefault(require("../../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _dom = require("../../../core/utils/dom");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _m_context_menu = _interopRequireDefault(require("../../ui/context_menu/m_context_menu"));
var _scroll_view = _interopRequireDefault(require("../../ui/scroll_view/scroll_view"));
var _get_scroll_top_max = require("../../ui/scroll_view/utils/get_scroll_top_max");
var _layout = require("../splitter/utils/layout");
var _messagebubble = _interopRequireWildcard(require("./messagebubble"));
var _messagegroup = _interopRequireWildcard(require("./messagegroup"));
var _typingindicator = _interopRequireDefault(require("./typingindicator"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_MESSAGELIST_CLASS = 'dx-chat-messagelist';
const CHAT_MESSAGELIST_CONTENT_CLASS = 'dx-chat-messagelist-content';
const CHAT_MESSAGELIST_EMPTY_CLASS = 'dx-chat-messagelist-empty';
const CHAT_MESSAGELIST_EMPTY_LOADING_CLASS = 'dx-chat-messagelist-empty-loading';
const CHAT_MESSAGELIST_EMPTY_VIEW_CLASS = 'dx-chat-messagelist-empty-view';
const CHAT_MESSAGELIST_EMPTY_IMAGE_CLASS = 'dx-chat-messagelist-empty-image';
const CHAT_MESSAGELIST_EMPTY_MESSAGE_CLASS = 'dx-chat-messagelist-empty-message';
const CHAT_MESSAGELIST_EMPTY_PROMPT_CLASS = 'dx-chat-messagelist-empty-prompt';
const CHAT_MESSAGELIST_DAY_HEADER_CLASS = 'dx-chat-messagelist-day-header';
const CHAT_LAST_MESSAGEGROUP_ALIGNMENT_START_CLASS = 'dx-chat-last-messagegroup-alignment-start';
const CHAT_LAST_MESSAGEGROUP_ALIGNMENT_END_CLASS = 'dx-chat-last-messagegroup-alignment-end';
const CHAT_MESSAGELIST_CONTEXT_MENU_CLASS = exports.CHAT_MESSAGELIST_CONTEXT_MENU_CLASS = 'dx-messagelist-context-menu';
const CHAT_MESSAGELIST_CONTEXT_MENU_CONTENT_CLASS = exports.CHAT_MESSAGELIST_CONTEXT_MENU_CONTENT_CLASS = 'dx-messagelist-context-menu-content';
const CHAT_MESSAGELIST_CONTEXT_MENU_TARGET = exports.CHAT_MESSAGELIST_CONTEXT_MENU_TARGET = `.${_messagegroup.CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS} .${_messagebubble.CHAT_MESSAGEBUBBLE_CLASS}`;
const SCROLLABLE_CONTAINER_CLASS = 'dx-scrollable-container';
const ESCAPE_KEY = 'escape';
const MESSAGEGROUP_TIMEOUT = exports.MESSAGEGROUP_TIMEOUT = 5 * 1000 * 60;
class MessageList extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      allowUpdating: () => false,
      allowDeleting: () => false,
      isEditActionDisabled: () => false,
      items: [],
      currentUserId: '',
      showDayHeaders: true,
      dayHeaderFormat: 'shortdate',
      messageTimestampFormat: 'shorttime',
      typingUsers: [],
      isLoading: false,
      showAvatar: true,
      showUserName: true,
      showMessageTimestamp: true,
      messageTemplate: null
    });
  }
  _init() {
    super._init();
    this._lastMessageDate = null;
  }
  _initMarkup() {
    (0, _renderer.default)(this.element()).addClass(CHAT_MESSAGELIST_CLASS);
    super._initMarkup();
    this._renderScrollView();
    this._renderMessageListContent();
    this._toggleEmptyView();
    this._renderMessageGroups();
    this._renderTypingIndicator();
    this._renderContextMenu();
    this._updateAria();
    this._scrollDownContent();
  }
  _renderContentImpl() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    super._renderContentImpl();
    this._attachResizeObserverSubscription();
  }
  _attachResizeObserverSubscription() {
    const element = this.$element().get(0);
    _resize_observer.default.unobserve(element);
    _resize_observer.default.observe(element, entry => this._resizeHandler(entry));
  }
  _resizeHandler(_ref) {
    let {
      contentRect,
      target
    } = _ref;
    if (!(0, _dom.isElementInDom)((0, _renderer.default)(target)) || !(0, _layout.isElementVisible)(target)) {
      return;
    }
    const isInitialRendering = !(0, _type.isDefined)(this._containerClientHeight);
    const newHeight = contentRect.height;
    if (isInitialRendering) {
      this._scrollDownContent();
    } else {
      const heightChange = this._containerClientHeight - newHeight;
      const isHeightDecreasing = heightChange > 0;
      let scrollTop = this._scrollView.scrollTop();
      if (isHeightDecreasing) {
        scrollTop += heightChange;
        this._scrollView.scrollTo({
          top: scrollTop
        });
      }
    }
    this._containerClientHeight = newHeight;
  }
  _renderEmptyViewContent() {
    const $emptyView = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGELIST_EMPTY_VIEW_CLASS).attr('id', `dx-${new _common.Guid()}`);
    (0, _renderer.default)('<div>').appendTo($emptyView).addClass(CHAT_MESSAGELIST_EMPTY_IMAGE_CLASS);
    const messageText = _message.default.format('dxChat-emptyListMessage');
    (0, _renderer.default)('<div>').appendTo($emptyView).addClass(CHAT_MESSAGELIST_EMPTY_MESSAGE_CLASS).text(messageText);
    const promptText = _message.default.format('dxChat-emptyListPrompt');
    (0, _renderer.default)('<div>').appendTo($emptyView).addClass(CHAT_MESSAGELIST_EMPTY_PROMPT_CLASS).text(promptText);
    $emptyView.appendTo(this._$content);
  }
  _renderTypingIndicator() {
    const {
      typingUsers
    } = this.option();
    const $typingIndicator = (0, _renderer.default)('<div>').appendTo(this._$scrollViewContent());
    this._typingIndicator = this._createComponent($typingIndicator, _typingindicator.default, {
      typingUsers
    });
  }
  _isEmpty() {
    const {
      items
    } = this.option();
    return items.length === 0;
  }
  _isCurrentUser(id) {
    const {
      currentUserId
    } = this.option();
    return currentUserId === id;
  }
  _messageGroupAlignment(id) {
    return this._isCurrentUser(id) ? 'end' : 'start';
  }
  _createMessageGroupComponent(items, userId) {
    const {
      showAvatar,
      showUserName,
      showMessageTimestamp,
      messageTemplate,
      messageTimestampFormat
    } = this.option();
    const $messageGroup = (0, _renderer.default)('<div>').appendTo(this._$content);
    this._createComponent($messageGroup, _messagegroup.default, {
      items,
      alignment: this._messageGroupAlignment(userId),
      showAvatar,
      showUserName,
      showMessageTimestamp,
      messageTemplate,
      messageTimestampFormat
    });
  }
  _getContextMenuButtons(message) {
    const {
      allowUpdating,
      allowDeleting,
      isEditActionDisabled,
      onMessageEditingStart,
      onMessageDeleting
    } = this.option();
    const editText = _message.default.format('dxChat-editingEditMessage');
    const deleteText = _message.default.format('dxChat-editingDeleteMessage');
    const buttons = [];
    if (allowUpdating(message) && message.type !== 'image') {
      buttons.push({
        icon: 'edit',
        text: editText,
        disabled: isEditActionDisabled(message),
        onClick: e => {
          const onMessageEditStarted = onMessageEditingStart === null || onMessageEditingStart === void 0 ? void 0 : onMessageEditingStart({
            event: e.event,
            message: message
          });
          const onContextMenuHidden = () => {
            this._contextMenu.off('hidden', onContextMenuHidden);
            onMessageEditStarted === null || onMessageEditStarted === void 0 || onMessageEditStarted();
          };
          this._contextMenu.on('hidden', onContextMenuHidden);
        }
      });
    }
    if (allowDeleting(message)) {
      buttons.push({
        icon: 'trash',
        text: deleteText,
        onClick(e) {
          onMessageDeleting === null || onMessageDeleting === void 0 || onMessageDeleting({
            event: e.event,
            message
          });
        }
      });
    }
    return buttons;
  }
  _renderContextMenu() {
    const $contextMenu = (0, _renderer.default)('<div>');
    this._contextMenu = this._createComponent($contextMenu, _m_context_menu.default, {
      target: CHAT_MESSAGELIST_CONTEXT_MENU_TARGET,
      onShowing: e => {
        this._onContextMenuShowing(e);
      },
      elementAttr: {
        class: CHAT_MESSAGELIST_CONTEXT_MENU_CLASS
      },
      cssClass: CHAT_MESSAGELIST_CONTEXT_MENU_CONTENT_CLASS,
      hideOnParentScroll: false,
      overlayContainer: this._scrollView.container(),
      visualContainer: this._scrollView.container(),
      boundaryOffset: {
        h: 16
      }
    });
    this._contextMenu.registerKeyHandler(ESCAPE_KEY, event => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._contextMenu.hide();
      const {
        onEscapeKeyPressed
      } = this.option();
      onEscapeKeyPressed === null || onEscapeKeyPressed === void 0 || onEscapeKeyPressed(event);
    });
    $contextMenu.appendTo(this.$element());
  }
  _onContextMenuShowing(e) {
    // @ts-expect-error ts-error
    const {
      jQEvent
    } = e;
    if (!(0, _type.isDefined)(jQEvent)) {
      e.cancel = true;
      return;
    }
    const {
      currentTarget
    } = jQEvent;
    const message = this._getMessageData(currentTarget);
    if (message !== null && message !== void 0 && message.isDeleted) {
      e.cancel = true;
      return;
    }
    const items = this._getContextMenuButtons(message);
    if (!items.length) {
      e.cancel = true;
      return;
    }
    e.component.option('items', items);
    e.element.focus();
  }
  _renderScrollView() {
    const $scrollable = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._scrollView = this._createComponent($scrollable, _scroll_view.default, {
      useKeyboard: false,
      bounceEnabled: false,
      reachBottomText: '',
      indicateLoading: false,
      onReachBottom: _common2.noop
    });
  }
  _shouldAddDayHeader(timestamp) {
    const {
      showDayHeaders
    } = this.option();
    if (!showDayHeaders) {
      return false;
    }
    const deserializedDate = _date_serialization.default.deserializeDate(timestamp);
    if (!(0, _type.isDate)(deserializedDate) || isNaN(deserializedDate.getTime())) {
      return false;
    }
    return !_date2.default.sameDate(this._lastMessageDate, deserializedDate);
  }
  _createDayHeader(timestamp) {
    const deserializedDate = _date_serialization.default.deserializeDate(timestamp);
    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));
    const {
      dayHeaderFormat
    } = this.option();
    this._lastMessageDate = deserializedDate;
    let headerDate = _date.default.format(deserializedDate, dayHeaderFormat);
    if (_date2.default.sameDate(deserializedDate, today)) {
      headerDate = `${_message.default.format('Today')} ${headerDate}`;
    }
    if (_date2.default.sameDate(deserializedDate, yesterday)) {
      headerDate = `${_message.default.format('Yesterday')} ${headerDate}`;
    }
    (0, _renderer.default)('<div>').addClass(CHAT_MESSAGELIST_DAY_HEADER_CLASS).text(headerDate).appendTo(this._$content);
  }
  _updateLoadingState(isLoading) {
    if (!this._scrollView) {
      return;
    }
    this.$element().toggleClass(CHAT_MESSAGELIST_EMPTY_LOADING_CLASS, this._isEmpty() && isLoading);
    this._scrollView.release(!isLoading);
  }
  _renderMessageListContent() {
    this._$content = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGELIST_CONTENT_CLASS).appendTo(this._$scrollViewContent());
  }
  _toggleEmptyView() {
    this._getEmptyView().remove();
    const {
      isLoading
    } = this.option();
    this.$element().toggleClass(CHAT_MESSAGELIST_EMPTY_CLASS, this._isEmpty() && !isLoading).toggleClass(CHAT_MESSAGELIST_EMPTY_LOADING_CLASS, this._isEmpty() && isLoading);
    if (this._isEmpty() && !isLoading) {
      this._renderEmptyViewContent();
      this._updateLoadingState(false);
    }
  }
  _renderMessageGroups() {
    var _items$;
    const {
      isLoading,
      items
    } = this.option();
    if (this._isEmpty() && !isLoading) {
      return;
    }
    let currentMessageGroupUserId = (_items$ = items[0]) === null || _items$ === void 0 || (_items$ = _items$.author) === null || _items$ === void 0 ? void 0 : _items$.id;
    let currentMessageGroupItems = [];
    items.forEach((item, index) => {
      var _newMessageGroupItem$;
      const newMessageGroupItem = item ?? {};
      const id = (_newMessageGroupItem$ = newMessageGroupItem.author) === null || _newMessageGroupItem$ === void 0 ? void 0 : _newMessageGroupItem$.id;
      const shouldCreateDayHeader = this._shouldAddDayHeader(newMessageGroupItem.timestamp);
      const isTimeoutExceeded = this._isTimeoutExceeded(currentMessageGroupItems[currentMessageGroupItems.length - 1] ?? {}, item);
      const shouldCreateMessageGroup = shouldCreateDayHeader && currentMessageGroupItems.length || isTimeoutExceeded || id !== currentMessageGroupUserId;
      if (shouldCreateMessageGroup) {
        this._createMessageGroupComponent(currentMessageGroupItems, currentMessageGroupUserId);
        currentMessageGroupUserId = id;
        currentMessageGroupItems = [];
        currentMessageGroupItems.push(newMessageGroupItem);
      } else {
        currentMessageGroupItems.push(newMessageGroupItem);
      }
      if (shouldCreateDayHeader) {
        this._createDayHeader(item === null || item === void 0 ? void 0 : item.timestamp);
      }
      if (items.length - 1 === index) {
        this._createMessageGroupComponent(currentMessageGroupItems, currentMessageGroupUserId);
      }
    });
    this._setLastMessageGroupClasses();
    // @ts-expect-error
    this._updateLoadingState(isLoading);
  }
  _setLastMessageGroupClasses() {
    this._$content.find(`.${CHAT_LAST_MESSAGEGROUP_ALIGNMENT_START_CLASS}`).removeClass(CHAT_LAST_MESSAGEGROUP_ALIGNMENT_START_CLASS);
    this._$content.find(`.${CHAT_LAST_MESSAGEGROUP_ALIGNMENT_END_CLASS}`).removeClass(CHAT_LAST_MESSAGEGROUP_ALIGNMENT_END_CLASS);
    const $lastAlignmentStartGroup = this._$content.find(`.${_messagegroup.CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS}`).last();
    const $lastAlignmentEndGroup = this._$content.find(`.${_messagegroup.CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS}`).last();
    $lastAlignmentStartGroup.addClass(CHAT_LAST_MESSAGEGROUP_ALIGNMENT_START_CLASS);
    $lastAlignmentEndGroup.addClass(CHAT_LAST_MESSAGEGROUP_ALIGNMENT_END_CLASS);
  }
  _getLastMessageGroup() {
    const $lastMessageGroup = this._$content.find(`.${_messagegroup.CHAT_MESSAGEGROUP_CLASS}`).last();
    if ($lastMessageGroup.length) {
      return _messagegroup.default.getInstance($lastMessageGroup);
    }
    return undefined;
  }
  _renderMessage(message) {
    const {
      timestamp
    } = message;
    const shouldCreateDayHeader = this._shouldAddDayHeader(timestamp);
    if (shouldCreateDayHeader) {
      this._createDayHeader(timestamp);
      this._renderMessageIntoGroup(message);
      return;
    }
    const lastMessageGroup = this._getLastMessageGroup();
    if (!lastMessageGroup) {
      this._renderMessageIntoGroup(message);
      return;
    }
    const lastMessageGroupMessage = this._getLastMessageGroupItem(lastMessageGroup);
    const isTimeoutExceeded = this._isTimeoutExceeded(lastMessageGroupMessage, message);
    if (this._isSameAuthor(message, lastMessageGroupMessage) && !isTimeoutExceeded) {
      this._renderMessageIntoGroup(message, lastMessageGroup);
      return;
    }
    this._renderMessageIntoGroup(message);
  }
  _getLastMessageGroupItem(lastMessageGroup) {
    const {
      items
    } = lastMessageGroup.option();
    return items[items.length - 1];
  }
  _isSameAuthor(lastMessageGroupMessage, message) {
    var _lastMessageGroupMess, _message$author;
    return ((_lastMessageGroupMess = lastMessageGroupMessage.author) === null || _lastMessageGroupMess === void 0 ? void 0 : _lastMessageGroupMess.id) === ((_message$author = message.author) === null || _message$author === void 0 ? void 0 : _message$author.id);
  }
  _renderMessageIntoGroup(message, messageGroup) {
    const {
      author
    } = message;
    this._setIsReachedBottom();
    if (messageGroup) {
      messageGroup.renderMessage(message);
    } else {
      this._createMessageGroupComponent([message], author === null || author === void 0 ? void 0 : author.id);
      this._setLastMessageGroupClasses();
    }
    this._processScrollDownContent(this._isCurrentUser(author === null || author === void 0 ? void 0 : author.id));
  }
  _getMessageData(message) {
    return (0, _renderer.default)(message).data(_messagebubble.MESSAGE_DATA_KEY);
  }
  _findMessageElementByKey(key) {
    const $bubbles = this.$element().find(`.${_messagebubble.CHAT_MESSAGEBUBBLE_CLASS}`);
    let result = (0, _renderer.default)();
    $bubbles.each((_, item) => {
      const messageData = this._getMessageData(item);
      if (messageData.id === key) {
        result = (0, _renderer.default)(item);
        return false;
      }
      return true;
    });
    return result;
  }
  _getMessageGroupByBubbleElement($bubble) {
    const $currentMessageGroup = $bubble.closest(`.${_messagegroup.CHAT_MESSAGEGROUP_CLASS}`);
    const group = _messagegroup.default.getInstance($currentMessageGroup);
    return group;
  }
  _updateMessageByKey(key, data) {
    if ((0, _type.isDefined)(key)) {
      const $targetMessage = this._findMessageElementByKey(key);
      const bubble = _messagebubble.default.getInstance($targetMessage);
      bubble.option(data);
      if (data.type !== 'image') {
        const $currentMessageGroup = $targetMessage.closest(`.${_messagegroup.CHAT_MESSAGEGROUP_CLASS}`);
        const group = _messagegroup.default.getInstance($currentMessageGroup);
        const isEdited = data.isEdited === true && !data.isDeleted;
        group._updateMessageEditedText($targetMessage, isEdited);
      }
    }
  }
  _removeMessageByKey(key) {
    if (!key) {
      return;
    }
    const $targetMessage = this._findMessageElementByKey(key);
    if (!$targetMessage.length) {
      return;
    }
    const group = this._getMessageGroupByBubbleElement($targetMessage);
    const {
      items
    } = group.option();
    const newItems = items.filter(item => item.id !== key);
    if (newItems.length === 0) {
      const {
        showDayHeaders
      } = this.option();
      if (showDayHeaders) {
        const $prev = group.$element().prev();
        const $next = group.$element().next();
        const shouldRemoveDayHeader = $prev.length && $prev.hasClass(CHAT_MESSAGELIST_DAY_HEADER_CLASS) && ($next.length && $next.hasClass(CHAT_MESSAGELIST_DAY_HEADER_CLASS) || !$next.length);
        if (shouldRemoveDayHeader) {
          $prev.remove();
        }
      }
      group.$element().remove();
    } else {
      group.option('items', newItems);
    }
    this._setLastMessageGroupClasses();
  }
  _scrollDownContent() {
    this._scrollView.scrollTo({
      top: (0, _get_scroll_top_max.getScrollTopMax)(this._scrollableContainer())
    });
  }
  _scrollableContainer() {
    return (0, _renderer.default)(this._scrollView.element()).find(`.${SCROLLABLE_CONTAINER_CLASS}`).get(0);
  }
  _isMessageAddedToEnd(value, previousValue) {
    const valueLength = value.length;
    const previousValueLength = previousValue.length;
    if (valueLength === 0) {
      return false;
    }
    if (previousValueLength === 0) {
      return valueLength === 1;
    }
    const lastValueItem = value[valueLength - 1];
    const lastPreviousValueItem = previousValue[previousValueLength - 1];
    const isLastItemNotTheSame = lastValueItem !== lastPreviousValueItem;
    const isLengthIncreasedByOne = valueLength - previousValueLength === 1;
    return isLastItemNotTheSame && isLengthIncreasedByOne;
  }
  _processItemsUpdating(value, previousValue) {
    const shouldItemsBeUpdatedCompletely = !this._isMessageAddedToEnd(value, previousValue);
    if (shouldItemsBeUpdatedCompletely) {
      this._invalidate();
    } else {
      this._toggleEmptyView();
      const newMessage = value[value.length - 1];
      this._renderMessage(newMessage ?? {});
    }
  }
  _isTimeoutExceeded(lastMessage, newMessage) {
    const lastMessageTimestamp = lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.timestamp;
    const newMessageTimestamp = newMessage === null || newMessage === void 0 ? void 0 : newMessage.timestamp;
    if (!lastMessageTimestamp || !newMessageTimestamp) {
      return false;
    }
    const lastMessageTimestampInMs = _date_serialization.default.deserializeDate(lastMessageTimestamp);
    const newMessageTimestampInMs = _date_serialization.default.deserializeDate(newMessageTimestamp);
    const result = newMessageTimestampInMs - lastMessageTimestampInMs > MESSAGEGROUP_TIMEOUT;
    return result;
  }
  _updateAria() {
    const aria = {
      role: 'log',
      atomic: 'false',
      label: _message.default.format('dxChat-messageListAriaLabel'),
      live: 'polite',
      relevant: 'additions text'
    };
    this.setAria(aria);
  }
  _setIsReachedBottom() {
    this._isBottomReached = !this._isContentOverflowing() || this._scrollView.isBottomReached();
  }
  _isContentOverflowing() {
    return (0, _size.getHeight)(this._scrollView.content()) > (0, _size.getHeight)(this._scrollView.container());
  }
  _processScrollDownContent() {
    let shouldForceProcessing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (this._isBottomReached || shouldForceProcessing) {
      this._scrollDownContent();
    }
    this._isBottomReached = false;
  }
  _$scrollViewContent() {
    return (0, _renderer.default)(this._scrollView.content());
  }
  _getEmptyView() {
    return this._$content.find(`.${CHAT_MESSAGELIST_EMPTY_VIEW_CLASS}`);
  }
  _dimensionChanged() {
    var _this$_contextMenu;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_contextMenu = this._contextMenu) === null || _this$_contextMenu === void 0 || _this$_contextMenu.hide();
  }
  _clean() {
    this._lastMessageDate = null;
    super._clean();
  }
  _modifyByChanges(changes) {
    changes.forEach(change => {
      switch (change.type) {
        case 'update':
          this._updateMessageByKey(change.key, change.data ?? {});
          break;
        case 'insert':
          {
            const {
              items
            } = this.option();
            this.option('items', [...items, change.data ?? {}]);
            break;
          }
        case 'remove':
          this._removeMessageByKey(change.key);
          break;
        default:
          break;
      }
    });
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'currentUserId':
      case 'showDayHeaders':
      case 'showAvatar':
      case 'showUserName':
      case 'showMessageTimestamp':
      case 'messageTemplate':
      case 'dayHeaderFormat':
      case 'messageTimestampFormat':
        this._invalidate();
        break;
      case 'items':
        this._processItemsUpdating(value ?? [], previousValue ?? []);
        break;
      case 'typingUsers':
        this._setIsReachedBottom();
        this._typingIndicator.option(name, value);
        this._processScrollDownContent();
        break;
      case 'isLoading':
        this._updateLoadingState(!!value);
        break;
      default:
        super._optionChanged(args);
    }
  }
  getEmptyViewId() {
    if (this._isEmpty()) {
      const $emptyView = this._getEmptyView();
      const emptyViewId = $emptyView.attr('id') ?? null;
      return emptyViewId;
    }
    return null;
  }
}
var _default = exports.default = MessageList;