/**
* DevExtreme (cjs/__internal/ui/chat/message_box/chat_text_area.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CHAT_TEXT_AREA_TOOLBAR = exports.CHAT_TEXT_AREA_ATTACH_BUTTON = exports.CHAT_TEXTAREA_CLASS = void 0;
var _index = require("../../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _themes = require("../../../../ui/themes");
var _toolbar = _interopRequireDefault(require("../../../../ui/toolbar"));
var _widget = _interopRequireDefault(require("../../../core/widget/widget"));
var _file_uploader = _interopRequireDefault(require("../../../ui/file_uploader/file_uploader"));
var _informer = _interopRequireDefault(require("../../../ui/informer/informer"));
var _m_text_area = _interopRequireDefault(require("../../../ui/m_text_area"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_TEXT_AREA_ATTACHMENTS = 'dx-chat-textarea-attachments';
const CHAT_TEXT_AREA_ATTACH_BUTTON = exports.CHAT_TEXT_AREA_ATTACH_BUTTON = 'dx-chat-textarea-attach-button';
const CHAT_TEXTAREA_CLASS = exports.CHAT_TEXTAREA_CLASS = 'dx-chat-textarea';
const CHAT_TEXT_AREA_TOOLBAR = exports.CHAT_TEXT_AREA_TOOLBAR = 'dx-chat-textarea-toolbar';
const MAX_ATTACHMENTS_COUNT = 10;
const INFORMER_DELAY = 10000;
const ERRORS = {
  // @ts-expect-error format params should be extended
  fileLimit: _message.default.format('dxChat-fileLimitReachedWarning', MAX_ATTACHMENTS_COUNT)
};
const isMobile = () => _devices.default.current().deviceType !== 'desktop';
class ChatTextArea extends _m_text_area.default {
  constructor() {
    super(...arguments);
    this._fileUploaderOnCancelButtonClick = e => {
      const {
        file
      } = e;
      if (file) {
        var _this$_filesToSend;
        (_this$_filesToSend = this._filesToSend) === null || _this$_filesToSend === void 0 || _this$_filesToSend.delete(file);
      }
      this._toggleButtonDisableState();
    };
  }
  getAttachments() {
    var _this$_filesToSend2;
    if (!((_this$_filesToSend2 = this._filesToSend) !== null && _this$_filesToSend2 !== void 0 && _this$_filesToSend2.size)) {
      return undefined;
    }
    return Array.from(this._filesToSend.values()).map(_ref => {
      let {
        name,
        size
      } = _ref;
      return {
        name,
        size
      };
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      stylingMode: 'outlined',
      placeholder: _message.default.format('dxChat-textareaPlaceholder'),
      autoResizeEnabled: true,
      valueChangeEvent: 'input',
      maxHeight: '53.86em',
      fileUploaderOptions: undefined
    });
  }
  _defaultOptionsRules() {
    const rules = [...super._defaultOptionsRules(), {
      device: () => (0, _themes.isMaterial)((0, _themes.current)()),
      options: {
        stylingMode: 'outlined'
      }
    }];
    return rules;
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      enter: e => {
        if (this._shouldSendMessageOnEnter(e)) {
          e.preventDefault();
        }
      }
    });
  }
  _enterKeyHandlerUp(e) {
    super._enterKeyHandlerUp(e);
    if ((0, _index.normalizeKeyName)(e) !== 'enter') {
      return;
    }
    if (this._shouldSendMessageOnEnter(e)) {
      this._processSendButtonActivation({
        event: e
      });
    }
  }
  _init() {
    super._init();
    this._createSendAction();
  }
  _createSendAction() {
    this._sendAction = this._createActionByOption('onSend', {
      excludeValidators: ['disabled']
    });
  }
  _initMarkup() {
    this.$element().addClass(CHAT_TEXTAREA_CLASS);
    super._initMarkup();
    this._renderToolbar();
    this._initFileUploader();
  }
  _showInformer(text) {
    if (this._informer) {
      this._informer.option({
        text
      });
    } else {
      this._renderInformer(text);
    }
    this._updateInformerTimeout();
  }
  _renderInformer(text) {
    const $informer = (0, _renderer.default)('<div>').prependTo(this.$element());
    this._informer = this._createComponent($informer, _informer.default, {
      text,
      contentAlignment: 'start',
      icon: 'errorcircle'
    });
  }
  _updateInformerTimeout() {
    clearTimeout(this._informerTimeoutId);
    // eslint-disable-next-line no-restricted-globals
    this._informerTimeoutId = setTimeout(() => {
      this._processInformerCleaning();
    }, INFORMER_DELAY);
  }
  _renderToolbar() {
    const toolbarItems = this._getToolbarItems();
    const toolbarOptions = {
      items: toolbarItems
    };
    this._$toolbar = (0, _renderer.default)('<div>').addClass(CHAT_TEXT_AREA_TOOLBAR).appendTo(this.$element());
    this._toolbar = this._createComponent(this._$toolbar, _toolbar.default, toolbarOptions);
  }
  _getToolbarItems() {
    const {
      fileUploaderOptions
    } = this.option();
    const items = [this._getSendButtonConfig()];
    if (fileUploaderOptions) {
      items.push(this._getAttachButtonConfig());
    }
    return items;
  }
  _getAttachButtonConfig() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const configuration = {
      widget: 'dxButton',
      location: 'before',
      options: {
        activeStateEnabled,
        focusStateEnabled,
        hoverStateEnabled,
        elementAttr: {
          class: CHAT_TEXT_AREA_ATTACH_BUTTON
        },
        icon: 'attach',
        onInitialized: e => {
          this._attachButton = e.component;
        },
        onClick: () => this._processInformerCleaning()
      }
    };
    return configuration;
  }
  _getSendButtonConfig() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const configuration = {
      widget: 'dxButton',
      location: 'after',
      options: {
        activeStateEnabled,
        focusStateEnabled,
        hoverStateEnabled,
        icon: 'arrowright',
        type: 'default',
        stylingMode: 'contained',
        disabled: true,
        elementAttr: {
          'aria-label': _message.default.format('dxChat-sendButtonAriaLabel')
        },
        onClick: e => {
          this._processSendButtonActivation(e);
        },
        onInitialized: e => {
          this._sendButton = e.component;
        }
      }
    };
    return configuration;
  }
  _initFileUploader() {
    const {
      fileUploaderOptions
    } = this.option();
    if (!fileUploaderOptions) {
      return;
    }
    this._renderFileUploader();
    this._filesToSend = new Map();
  }
  _renderFileUploader() {
    this._$fileUploader = (0, _renderer.default)('<div>').addClass(CHAT_TEXT_AREA_ATTACHMENTS).insertBefore(this._$textEditorContainer);
    this._fileUploader = this._createComponent(this._$fileUploader, _file_uploader.default, this._getFileUploaderOptions());
  }
  _shouldHideFileUploader() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return value.length !== 0;
  }
  _getFileUploaderOptions() {
    const {
      fileUploaderOptions = {}
    } = this.option();
    const multiple = fileUploaderOptions.multiple ?? true;
    const visible = this._shouldHideFileUploader(fileUploaderOptions.value);
    return _extends({}, fileUploaderOptions, {
      multiple,
      visible,
      uploadMode: 'instantly',
      dialogTrigger: this.$element().find(`.${CHAT_TEXT_AREA_ATTACH_BUTTON}`).get(0),
      _hideCancelButtonOnUpload: false,
      _showFileIcon: true,
      _cancelButtonPosition: 'end',
      _maxFileCount: MAX_ATTACHMENTS_COUNT,
      onValueChanged: e => this._fileUploaderOnValueChanged(e),
      onUploadStarted: e => this._fileUploaderOnUploadStarted(e),
      onUploaded: e => this._fileUploaderOnUploaded(e),
      onCancelButtonClick: e => this._fileUploaderOnCancelButtonClick(e),
      onFileLimitReached: () => this._fileUploaderFileLimitReached(),
      onFileValidationError: e => this._fileUploaderFileValidationError(e)
    });
  }
  _fileUploaderOnValueChanged(e) {
    var _fileUploaderOptions$;
    const {
      value,
      component
    } = e;
    const {
      fileUploaderOptions = {}
    } = this.option();
    component.option('visible', this._shouldHideFileUploader(value));
    this._updateInputHeight();
    (_fileUploaderOptions$ = fileUploaderOptions.onValueChanged) === null || _fileUploaderOptions$ === void 0 || _fileUploaderOptions$.call(fileUploaderOptions, e);
  }
  _addFileToMap(file) {
    var _this$_filesToSend3;
    (_this$_filesToSend3 = this._filesToSend) === null || _this$_filesToSend3 === void 0 || _this$_filesToSend3.set(file, {
      readyToSend: false,
      name: file.name,
      size: file.size
    });
    this._toggleButtonDisableState();
  }
  _fileUploaderOnUploadStarted(e) {
    var _fileUploaderOptions$2;
    const {
      file
    } = e;
    this._addFileToMap(file);
    const {
      fileUploaderOptions = {}
    } = this.option();
    (_fileUploaderOptions$2 = fileUploaderOptions.onUploadStarted) === null || _fileUploaderOptions$2 === void 0 || _fileUploaderOptions$2.call(fileUploaderOptions, e);
  }
  _fileUploaderOnUploaded(e) {
    var _this$_filesToSend4, _fileUploaderOptions$3;
    const {
      file
    } = e;
    const {
      fileUploaderOptions = {}
    } = this.option();
    const fileInfo = (_this$_filesToSend4 = this._filesToSend) === null || _this$_filesToSend4 === void 0 ? void 0 : _this$_filesToSend4.get(file);
    if (this._filesToSend && fileInfo) {
      this._filesToSend.set(file, _extends({}, fileInfo, {
        readyToSend: true
      }));
    }
    this._toggleButtonDisableState();
    (_fileUploaderOptions$3 = fileUploaderOptions.onUploaded) === null || _fileUploaderOptions$3 === void 0 || _fileUploaderOptions$3.call(fileUploaderOptions, e);
  }
  _fileUploaderFileLimitReached() {
    this._showInformer(ERRORS.fileLimit);
    this._updateInputHeight();
  }
  _fileUploaderFileValidationError(e) {
    const {
      file
    } = e;
    this._addFileToMap(file);
  }
  _toggleButtonDisableState(state) {
    var _this$_sendButton;
    const shouldDisable = state ?? !this._isMessageCanBeSent();
    (_this$_sendButton = this._sendButton) === null || _this$_sendButton === void 0 || _this$_sendButton.option('disabled', shouldDisable);
  }
  _renderButtonContainers() {}
  _getAdjustedMaxHeight(maxHeight) {
    return maxHeight;
  }
  _getMaxHeight() {
    const cssValue = this._input().css('maxHeight');
    if (!cssValue || cssValue === 'none') {
      return undefined;
    }
    const maxHeight = parseFloat(cssValue);
    return maxHeight;
  }
  _keyPressHandler(e) {
    super._keyPressHandler(e);
    this._toggleButtonDisableState();
  }
  _processSendButtonActivation(e) {
    var _this$_sendAction;
    (_this$_sendAction = this._sendAction) === null || _this$_sendAction === void 0 || _this$_sendAction.call(this, e);
    this.reset();
    this.resetFileUploader();
    this._toggleButtonDisableState(true);
  }
  _shouldSendMessageOnEnter(e) {
    return !(e !== null && e !== void 0 && e.shiftKey) && this._isMessageCanBeSent() && !isMobile();
  }
  _optionChanged(args) {
    var _this$_sendButton2;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        (_this$_sendButton2 = this._sendButton) === null || _this$_sendButton2 === void 0 || _this$_sendButton2.option(name, value);
        break;
      case 'text':
        this._processInformerCleaning();
        this._toggleButtonDisableState();
        break;
      case 'onSend':
        this._createSendAction();
        break;
      case 'fileUploaderOptions':
        this._handleFileUploaderOptionsChange(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _handleFileUploaderOptionsChange(args) {
    var _this$_fileUploader;
    const {
      fullName,
      value,
      previousValue
    } = args;
    if (fullName === 'fileUploaderOptions' && (!value || !previousValue)) {
      this._cleanToolbar();
      this._renderToolbar();
      this._cleanFileUploader();
      this._initFileUploader();
      return;
    }
    const options = _widget.default.getOptionsFromContainer(args);
    (_this$_fileUploader = this._fileUploader) === null || _this$_fileUploader === void 0 || _this$_fileUploader.option(options);
  }
  _isValuableTextEntered() {
    const {
      text
    } = this.option();
    return Boolean(text === null || text === void 0 ? void 0 : text.trim());
  }
  _getFilesArray() {
    return this._filesToSend ? Array.from(this._filesToSend.values()) : [];
  }
  _areFilesReadyToSend() {
    var _this$_filesToSend5;
    if (!((_this$_filesToSend5 = this._filesToSend) !== null && _this$_filesToSend5 !== void 0 && _this$_filesToSend5.size)) {
      return false;
    }
    return this._getFilesArray().every(file => file.readyToSend);
  }
  _isMessageCanBeSent() {
    const hasText = this._isValuableTextEntered();
    const hasReadyFiles = this._areFilesReadyToSend();
    const hasUnreadyFiles = this._filesToSend && this._getFilesArray().some(file => !file.readyToSend);
    return !hasUnreadyFiles && (hasText || hasReadyFiles);
  }
  _cleanFileUploader() {
    var _this$_fileUploader2, _this$_$fileUploader;
    (_this$_fileUploader2 = this._fileUploader) === null || _this$_fileUploader2 === void 0 || _this$_fileUploader2.dispose();
    (_this$_$fileUploader = this._$fileUploader) === null || _this$_$fileUploader === void 0 || _this$_$fileUploader.remove();
    this._fileUploader = null;
    this._$fileUploader = null;
  }
  _processInformerCleaning() {
    this._cleanInformer();
    this._updateInputHeight();
  }
  _cleanInformer() {
    this._clearInformerTimeout();
    this._removeInformer();
  }
  _removeInformer() {
    var _this$_informer, _this$_informer2;
    (_this$_informer = this._informer) === null || _this$_informer === void 0 || _this$_informer.dispose();
    (_this$_informer2 = this._informer) === null || _this$_informer2 === void 0 || _this$_informer2.$element().remove();
    this._informer = null;
  }
  _clearInformerTimeout() {
    clearTimeout(this._informerTimeoutId);
    this._informerTimeoutId = undefined;
  }
  _cleanToolbar() {
    var _this$_toolbar, _this$_$toolbar;
    (_this$_toolbar = this._toolbar) === null || _this$_toolbar === void 0 || _this$_toolbar.dispose();
    (_this$_$toolbar = this._$toolbar) === null || _this$_$toolbar === void 0 || _this$_$toolbar.remove();
    this._toolbar = null;
    this._$toolbar = null;
  }
  _dispose() {
    this._cleanFileUploader();
    this._cleanToolbar();
    this._cleanInformer();
    super._dispose();
  }
  resetFileUploader() {
    var _this$_fileUploader3, _this$_filesToSend6;
    (_this$_fileUploader3 = this._fileUploader) === null || _this$_fileUploader3 === void 0 || _this$_fileUploader3.reset();
    (_this$_filesToSend6 = this._filesToSend) === null || _this$_filesToSend6 === void 0 || _this$_filesToSend6.clear();
  }
  toggleAttachButtonVisibleState(state) {
    var _this$_attachButton;
    (_this$_attachButton = this._attachButton) === null || _this$_attachButton === void 0 || _this$_attachButton.option('visible', state);
  }
}
var _default = exports.default = ChatTextArea;
