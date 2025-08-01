/**
* DevExtreme (esm/__internal/ui/chat/chat.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { Guid } from '../../../common';
import messageLocalization from '../../../common/core/localization/message';
import registerComponent from '../../../core/component_registrator';
import $ from '../../../core/renderer';
import { isDefined } from '../../../core/utils/type';
import DataHelperMixin from '../../../data_helper';
import { invokeConditionally } from '../../core/utils/conditional_invoke';
import Widget from '../../core/widget/widget';
import AlertList from '../../ui/chat/alertlist';
import ConfirmationPopup from '../../ui/chat/confirmationpopup';
import MessageBox from '../../ui/chat/messagebox';
import MessageList from '../../ui/chat/messagelist';
const CHAT_CLASS = 'dx-chat';
const TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
class Chat extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      showDayHeaders: true,
      activeStateEnabled: true,
      editing: {
        allowUpdating: false,
        allowDeleting: false
      },
      focusStateEnabled: true,
      hoverStateEnabled: true,
      items: [],
      dataSource: null,
      user: {
        id: new Guid().toString()
      },
      dayHeaderFormat: 'shortdate',
      messageTemplate: null,
      messageTimestampFormat: 'shorttime',
      alerts: [],
      showAvatar: true,
      showUserName: true,
      showMessageTimestamp: true,
      typingUsers: [],
      onMessageEntered: undefined,
      reloadOnChange: true,
      onTypingStart: undefined,
      onTypingEnd: undefined,
      onMessageEditingStart: undefined,
      onMessageEditCanceled: undefined,
      onMessageDeleting: undefined,
      onMessageDeleted: undefined
    });
  }
  _init() {
    super._init();
    // @ts-expect-error
    this._initDataController();
    // @ts-expect-error
    this._refreshDataSource();
    this._createMessageEnteredAction();
    this._createMessageEditingStartAction();
    this._createMessageEditCanceledAction();
    this._createMessageDeletingAction();
    this._createMessageDeletedAction();
    this._createMessageUpdatingAction();
    this._createMessageUpdatedAction();
    this._createTypingStartAction();
    this._createTypingEndAction();
  }
  _dataSourceLoadErrorHandler() {
    this.option('items', []);
  }
  _dataSourceChangedHandler(newItems, e) {
    if (e !== null && e !== void 0 && e.changes) {
      this._messageList._modifyByChanges(e.changes);
      this._setOptionWithoutOptionChange('items', newItems.slice());
      this._messageList._setOptionWithoutOptionChange('items', newItems.slice());
      this._messageList._toggleEmptyView();
    } else {
      this.option('items', newItems.slice());
    }
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    var _this$_messageList;
    (_this$_messageList = this._messageList) === null || _this$_messageList === void 0 || _this$_messageList.option('isLoading', isLoading);
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _initMarkup() {
    $(this.element()).addClass(CHAT_CLASS);
    super._initMarkup();
    this._renderMessageList();
    this._renderAlertList();
    this._renderMessageBox();
    this._updateRootAria();
    this._updateMessageBoxAria();
  }
  _renderMessageList() {
    const $messageList = $('<div>');
    this.$element().append($messageList);
    this._messageList = this._createComponent($messageList, MessageList, this._getMessageListOptions());
  }
  _getMessageListOptions() {
    const {
      items = [],
      user,
      showDayHeaders = false,
      showAvatar = false,
      showUserName = false,
      showMessageTimestamp = false,
      dayHeaderFormat,
      messageTimestampFormat,
      typingUsers = []
    } = this.option();
    // @ts-expect-error
    const isLoading = this._dataController.isLoading();
    const currentUserId = user === null || user === void 0 ? void 0 : user.id;
    const options = {
      items,
      currentUserId,
      allowUpdating: message => this._allowEditAction(message),
      allowDeleting: message => this._allowDeleteAction(message),
      isEditActionDisabled: message => this._messageToEdit === message,
      messageTemplate: this._getMessageTemplate(),
      showDayHeaders,
      showAvatar,
      showUserName,
      showMessageTimestamp,
      dayHeaderFormat,
      messageTimestampFormat,
      typingUsers,
      isLoading,
      onMessageEditingStart: e => {
        this._messageEditingStartHandler(e);
        return () => this.focus();
      },
      onMessageDeleting: e => {
        this._messageDeletingHandler(e);
      },
      onEscapeKeyPressed: () => {
        this.focus();
      }
    };
    return options;
  }
  _allowEditAction(message) {
    const {
      editing
    } = this.option();
    if (!editing) {
      return false;
    }
    const {
      allowUpdating
    } = editing;
    if (typeof allowUpdating === 'function') {
      return allowUpdating({
        component: this,
        message
      });
    }
    return allowUpdating ?? false;
  }
  _allowDeleteAction(message) {
    const {
      editing
    } = this.option();
    if (!editing) {
      return false;
    }
    const {
      allowDeleting
    } = editing;
    if (typeof allowDeleting === 'function') {
      return allowDeleting({
        component: this,
        message
      });
    }
    return allowDeleting ?? false;
  }
  _getMessageTemplate() {
    const {
      messageTemplate
    } = this.option();
    if (messageTemplate) {
      return (message, $container) => {
        const template = this._getTemplateByOption('messageTemplate');
        template.render({
          container: $container,
          model: {
            component: this,
            message
          }
        });
      };
    }
    return null;
  }
  _messageEditingStartHandler(e) {
    var _this$_messageEditing;
    if (this._messageToEdit) {
      var _this$_messageEditCan;
      (_this$_messageEditCan = this._messageEditCanceledAction) === null || _this$_messageEditCan === void 0 || _this$_messageEditCan.call(this, {
        message: this._messageToEdit
      });
    }
    const messageEditingStartArgs = {
      message: e.message,
      cancel: false
    };
    (_this$_messageEditing = this._messageEditingStartAction) === null || _this$_messageEditing === void 0 || _this$_messageEditing.call(this, messageEditingStartArgs);
    invokeConditionally(messageEditingStartArgs.cancel, () => {
      this._messageBox.option('text', e.message.text);
      this._messageToEdit = e.message;
    });
  }
  _messageEditCanceledHandler() {
    if (this._messageToEdit) {
      var _this$_messageEditCan2;
      (_this$_messageEditCan2 = this._messageEditCanceledAction) === null || _this$_messageEditCan2 === void 0 || _this$_messageEditCan2.call(this, {
        message: this._messageToEdit
      });
      this._messageToEdit = undefined;
    }
  }
  _showDeleteConfirmationPopup(e) {
    this._messageToDelete = e.message;
    if (!this._deleteConfirmationPopup) {
      this._deleteConfirmationPopup = new ConfirmationPopup(this.$element(), {
        onApplyButtonClick: () => {
          var _this$_messageDeleted;
          if (this._messageToEdit === this._messageToDelete) {
            var _this$_messageEditCan3;
            this._messageBox.option('text', '');
            (_this$_messageEditCan3 = this._messageEditCanceledAction) === null || _this$_messageEditCan3 === void 0 || _this$_messageEditCan3.call(this, {
              message: this._messageToEdit
            });
            this._messageToEdit = undefined;
          }
          (_this$_messageDeleted = this._messageDeletedAction) === null || _this$_messageDeleted === void 0 || _this$_messageDeleted.call(this, {
            message: this._messageToDelete
          });
        },
        rtlEnabled: this.option().rtlEnabled,
        onHidden: () => {
          this._messageToDelete = undefined;
          this._focusTarget()[0].focus();
        }
      });
    }
    this._deleteConfirmationPopup.show();
  }
  _messageDeletingHandler(e) {
    var _this$_messageDeletin;
    const {
      message
    } = e;
    const messageDeletingArgs = {
      message,
      cancel: false
    };
    (_this$_messageDeletin = this._messageDeletingAction) === null || _this$_messageDeletin === void 0 || _this$_messageDeletin.call(this, messageDeletingArgs);
    invokeConditionally(messageDeletingArgs.cancel, () => {
      this._showDeleteConfirmationPopup(messageDeletingArgs);
    });
  }
  _messageUpdatingHandler(e) {
    var _this$_messageUpdatin;
    const {
      text
    } = e;
    const eventArgs = {
      // @ts-expect-error
      message: this._messageToEdit,
      text,
      cancel: false
    };
    (_this$_messageUpdatin = this._messageUpdatingAction) === null || _this$_messageUpdatin === void 0 || _this$_messageUpdatin.call(this, eventArgs);
    invokeConditionally(eventArgs.cancel, () => {
      var _this$_messageUpdated;
      this._messageBox.option('text', '');
      (_this$_messageUpdated = this._messageUpdatedAction) === null || _this$_messageUpdated === void 0 || _this$_messageUpdated.call(this, eventArgs);
      this._messageToEdit = undefined;
    });
  }
  _renderAlertList() {
    const $errors = $('<div>');
    this.$element().append($errors);
    const {
      alerts = []
    } = this.option();
    this._alertList = this._createComponent($errors, AlertList, {
      items: alerts
    });
  }
  _renderMessageBox() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const $messageBox = $('<div>');
    this.$element().append($messageBox);
    const configuration = {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      onMessageEntered: e => {
        this._messageEnteredHandler(e);
      },
      onTypingStart: e => {
        this._typingStartHandler(e);
      },
      onTypingEnd: () => {
        this._typingEndHandler();
      },
      onMessageEditCanceled: () => {
        this._messageEditCanceledHandler();
      },
      onMessageUpdating: e => {
        this._messageUpdatingHandler(e);
      }
    };
    this._messageBox = this._createComponent($messageBox, MessageBox, configuration);
  }
  _updateRootAria() {
    const aria = {
      role: 'group',
      label: messageLocalization.format('dxChat-elementAriaLabel')
    };
    this.setAria(aria, this.$element());
  }
  _updateMessageBoxAria() {
    const emptyViewId = this._messageList.getEmptyViewId();
    this._messageBox.updateInputAria(emptyViewId);
  }
  _createMessageEnteredAction() {
    this._messageEnteredAction = this._createActionByOption('onMessageEntered', {
      excludeValidators: ['disabled']
    });
  }
  _createMessageEditingStartAction() {
    this._messageEditingStartAction = this._createActionByOption('onMessageEditingStart', {
      excludeValidators: ['disabled']
    });
  }
  _createMessageEditCanceledAction() {
    this._messageEditCanceledAction = this._createActionByOption('onMessageEditCanceled', {
      excludeValidators: ['disabled']
    });
  }
  _createMessageDeletingAction() {
    this._messageDeletingAction = this._createActionByOption('onMessageDeleting', {
      excludeValidators: ['disabled']
    });
  }
  _createMessageDeletedAction() {
    this._messageDeletedAction = this._createActionByOption('onMessageDeleted', {
      excludeValidators: ['disabled']
    });
  }
  _createMessageUpdatingAction() {
    this._messageUpdatingAction = this._createActionByOption('onMessageUpdating', {
      excludeValidators: ['disabled']
    });
  }
  _createMessageUpdatedAction() {
    this._messageUpdatedAction = this._createActionByOption('onMessageUpdated', {
      excludeValidators: ['disabled']
    });
  }
  _createTypingStartAction() {
    this._typingStartAction = this._createActionByOption('onTypingStart', {
      excludeValidators: ['disabled']
    });
  }
  _createTypingEndAction() {
    this._typingEndAction = this._createActionByOption('onTypingEnd', {
      excludeValidators: ['disabled']
    });
  }
  _messageEnteredHandler(e) {
    var _this$_messageEntered;
    const {
      text,
      event
    } = e;
    const {
      user
    } = this.option();
    const message = {
      timestamp: new Date(),
      author: user,
      text
    };
    // @ts-expect-error
    const dataSource = this.getDataSource();
    if (isDefined(dataSource)) {
      dataSource.store().insert(message).done(() => {
        const {
          reloadOnChange
        } = this.option();
        if (reloadOnChange) {
          dataSource.reload();
        }
      });
    }
    (_this$_messageEntered = this._messageEnteredAction) === null || _this$_messageEntered === void 0 || _this$_messageEntered.call(this, {
      message,
      event
    });
  }
  _typingStartHandler(e) {
    var _this$_typingStartAct;
    const {
      event
    } = e;
    const {
      user
    } = this.option();
    (_this$_typingStartAct = this._typingStartAction) === null || _this$_typingStartAct === void 0 || _this$_typingStartAct.call(this, {
      user,
      event
    });
  }
  _typingEndHandler() {
    var _this$_typingEndActio;
    const {
      user
    } = this.option();
    (_this$_typingEndActio = this._typingEndAction) === null || _this$_typingEndActio === void 0 || _this$_typingEndActio.call(this, {
      user
    });
  }
  _focusTarget() {
    const $input = $(this.element()).find(`.${TEXTEDITOR_INPUT_CLASS}`);
    return $input;
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._messageBox.option(name, value);
        break;
      case 'user':
        {
          const author = value;
          this._messageList.option('currentUserId', author === null || author === void 0 ? void 0 : author.id);
          break;
        }
      case 'editing':
        break;
      case 'items':
        this._messageList.option(name, this.option('items'));
        this._updateMessageBoxAria();
        break;
      case 'dataSource':
        // @ts-expect-error
        this._refreshDataSource();
        break;
      case 'alerts':
        this._alertList.option('items', value ?? []);
        break;
      case 'onMessageEntered':
        this._createMessageEnteredAction();
        break;
      case 'onMessageUpdating':
        this._createMessageEditCanceledAction();
        break;
      case 'onMessageUpdated':
        this._createMessageEditCanceledAction();
        break;
      case 'onMessageEditingStart':
        this._createMessageEditingStartAction();
        break;
      case 'onMessageEditCanceled':
        this._createMessageEditCanceledAction();
        break;
      case 'onMessageDeleting':
        this._createMessageDeletingAction();
        break;
      case 'onMessageDeleted':
        this._createMessageDeletedAction();
        break;
      case 'onTypingStart':
        this._createTypingStartAction();
        break;
      case 'onTypingEnd':
        this._createTypingEndAction();
        break;
      case 'showDayHeaders':
      case 'showAvatar':
      case 'showUserName':
      case 'showMessageTimestamp':
        this._messageList.option(name, !!value);
        break;
      case 'dayHeaderFormat':
      case 'messageTimestampFormat':
      case 'typingUsers':
        this._messageList.option(name, value);
        break;
      case 'messageTemplate':
        this._messageList.option(name, this._getMessageTemplate());
        break;
      case 'reloadOnChange':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _insertNewItem(item) {
    const {
      items
    } = this.option();
    const newItems = [...(items ?? []), item];
    this.option('items', newItems);
  }
  renderMessage() {
    let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._insertNewItem(message);
  }
  _dispose() {
    var _this$_deleteConfirma;
    (_this$_deleteConfirma = this._deleteConfirmationPopup) === null || _this$_deleteConfirma === void 0 || _this$_deleteConfirma.dispose();
    super._dispose();
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Chat.include(DataHelperMixin);
registerComponent('dxChat', Chat);
export default Chat;
