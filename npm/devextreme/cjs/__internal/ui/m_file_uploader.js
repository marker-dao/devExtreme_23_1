/**
* DevExtreme (cjs/__internal/ui/m_file_uploader.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _click = require("../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _index = require("../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _button = _interopRequireDefault(require("../../ui/button"));
var _progress_bar = _interopRequireDefault(require("../../ui/progress_bar"));
var _themes = require("../../ui/themes");
var _editor = _interopRequireDefault(require("../ui/editor/editor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

// @ts-expect-error

const window = (0, _window.getWindow)();
const FILEUPLOADER_CLASS = 'dx-fileuploader';
const FILEUPLOADER_EMPTY_CLASS = 'dx-fileuploader-empty';
const FILEUPLOADER_SHOW_FILE_LIST_CLASS = 'dx-fileuploader-show-file-list';
const FILEUPLOADER_DRAGOVER_CLASS = 'dx-fileuploader-dragover';
const FILEUPLOADER_WRAPPER_CLASS = 'dx-fileuploader-wrapper';
const FILEUPLOADER_CONTAINER_CLASS = 'dx-fileuploader-container';
const FILEUPLOADER_CONTENT_CLASS = 'dx-fileuploader-content';
const FILEUPLOADER_INPUT_WRAPPER_CLASS = 'dx-fileuploader-input-wrapper';
const FILEUPLOADER_INPUT_CONTAINER_CLASS = 'dx-fileuploader-input-container';
const FILEUPLOADER_INPUT_LABEL_CLASS = 'dx-fileuploader-input-label';
const FILEUPLOADER_INPUT_CLASS = 'dx-fileuploader-input';
const FILEUPLOADER_FILES_CONTAINER_CLASS = 'dx-fileuploader-files-container';
const FILEUPLOADER_FILE_CONTAINER_CLASS = 'dx-fileuploader-file-container';
const FILEUPLOADER_FILE_INFO_CLASS = 'dx-fileuploader-file-info';
const FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS = 'dx-fileuploader-file-status-message';
const FILEUPLOADER_FILE_CLASS = 'dx-fileuploader-file';
const FILEUPLOADER_FILE_NAME_CLASS = 'dx-fileuploader-file-name';
const FILEUPLOADER_FILE_SIZE_CLASS = 'dx-fileuploader-file-size';
const FILEUPLOADER_BUTTON_CLASS = 'dx-fileuploader-button';
const FILEUPLOADER_BUTTON_CONTAINER_CLASS = 'dx-fileuploader-button-container';
const FILEUPLOADER_CANCEL_BUTTON_CLASS = 'dx-fileuploader-cancel-button';
const FILEUPLOADER_UPLOAD_BUTTON_CLASS = 'dx-fileuploader-upload-button';
const FILEUPLOADER_INVALID_CLASS = 'dx-fileuploader-invalid';
const FILEUPLOADER_AFTER_LOAD_DELAY = 400;
const FILEUPLOADER_CHUNK_META_DATA_NAME = 'chunkMetadata';
const DRAG_EVENT_DELTA = 1;
const DIALOG_TRIGGER_EVENT_NAMESPACE = 'dxFileUploaderDialogTrigger';
const keyUpEventName = 'keyup';
const nativeClickEvent = 'click';
const ENTER_KEY = 'enter';
const SPACE_KEY = 'space';
let renderFileUploaderInput = () => (0, _renderer.default)('<input>').attr('type', 'file');
// @ts-expect-error
const isFormDataSupported = () => !!window.FormData;
class FileUploader extends _editor.default {
  _supportedKeys() {
    const click = e => {
      e.preventDefault();
      const $selectButton = this._selectButton.$element();
      // @ts-expect-error
      _events_engine.default.trigger($selectButton, _click.name);
    };
    return (0, _extend.extend)(super._supportedKeys(), {
      space: click,
      enter: click
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    (0, _extend.extend)(this._optionsByReference, {
      value: true
    });
  }
  _getDefaultOptions() {
    return (0, _extend.extend)(super._getDefaultOptions(), {
      chunkSize: 0,
      value: [],
      selectButtonText: _message.default.format('dxFileUploader-selectFile'),
      uploadButtonText: _message.default.format('dxFileUploader-upload'),
      labelText: _message.default.format('dxFileUploader-dropFile'),
      name: 'files[]',
      multiple: false,
      accept: '',
      uploadUrl: '/',
      allowCanceling: true,
      showFileList: true,
      progress: 0,
      dialogTrigger: undefined,
      dropZone: undefined,
      readyToUploadMessage: _message.default.format('dxFileUploader-readyToUpload'),
      uploadedMessage: _message.default.format('dxFileUploader-uploaded'),
      uploadFailedMessage: _message.default.format('dxFileUploader-uploadFailedMessage'),
      uploadAbortedMessage: _message.default.format('dxFileUploader-uploadAbortedMessage'),
      uploadMode: 'instantly',
      uploadMethod: 'POST',
      uploadHeaders: {},
      uploadCustomData: {},
      onBeforeSend: null,
      onUploadStarted: null,
      onUploaded: null,
      onFilesUploaded: null,
      onProgress: null,
      onUploadError: null,
      onUploadAborted: null,
      onDropZoneEnter: null,
      onDropZoneLeave: null,
      allowedFileExtensions: [],
      maxFileSize: 0,
      minFileSize: 0,
      inputAttr: {},
      invalidFileExtensionMessage: _message.default.format('dxFileUploader-invalidFileExtension'),
      invalidMaxFileSizeMessage: _message.default.format('dxFileUploader-invalidMaxFileSize'),
      invalidMinFileSizeMessage: _message.default.format('dxFileUploader-invalidMinFileSize'),
      extendSelection: true,
      validationMessageMode: 'always',
      uploadFile: null,
      uploadChunk: null,
      abortUpload: null,
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      hoverStateEnabled: true,
      useNativeInputClick: false,
      useDragOver: true,
      nativeDropSupported: true,
      _uploadButtonType: 'normal',
      _buttonStylingMode: 'contained'
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: [{
        platform: 'android'
      }],
      options: {
        validationMessageOffset: {
          v: 0
        }
      }
    }, {
      device: () => _devices.default.real().deviceType !== 'desktop',
      options: {
        // @ts-expect-error
        useDragOver: false,
        nativeDropSupported: false,
        labelText: ''
      }
    }, {
      device: () => !isFormDataSupported(),
      options: {
        uploadMode: 'useForm'
      }
    }, {
      // @ts-expect-error
      device: () => (0, _themes.isMaterial)(),
      options: {
        _uploadButtonType: 'default'
      }
    }, {
      // @ts-expect-error
      device: () => (0, _themes.isFluent)(),
      options: {
        _buttonStylingMode: 'text'
      }
    }]);
  }
  _initOptions(options) {
    const isLabelTextDefined = 'labelText' in options;
    super._initOptions(options);
    if (!isLabelTextDefined && !this._shouldDragOverBeRendered()) {
      this.option('labelText', '');
    }
  }
  _init() {
    super._init();
    this._initFileInput();
    this._initLabel();
    this._setUploadStrategy();
    this._createFiles();
    this._createBeforeSendAction();
    this._createUploadStartedAction();
    this._createUploadedAction();
    this._createFilesUploadedAction();
    this._createProgressAction();
    this._createUploadErrorAction();
    this._createUploadAbortedAction();
    this._createDropZoneEnterAction();
    this._createDropZoneLeaveAction();
  }
  _setUploadStrategy() {
    if (this.option('chunkSize') > 0) {
      const uploadChunk = this.option('uploadChunk');
      this._uploadStrategy = uploadChunk && (0, _type.isFunction)(uploadChunk) ? new CustomChunksFileUploadStrategy(this) : new DefaultChunksFileUploadStrategy(this);
    } else {
      const uploadFile = this.option('uploadFile');
      this._uploadStrategy = uploadFile && (0, _type.isFunction)(uploadFile) ? new CustomWholeFileUploadStrategy(this) : new DefaultWholeFileUploadStrategy(this);
    }
  }
  _initFileInput() {
    this._isCustomClickEvent = false;
    const {
      multiple,
      accept,
      hint
    } = this.option();
    if (!this._$fileInput) {
      this._$fileInput = renderFileUploaderInput();
      _events_engine.default.on(this._$fileInput, 'change', this._inputChangeHandler.bind(this));
      _events_engine.default.on(this._$fileInput, 'click', e => {
        e.stopPropagation();
        this._resetInputValue();
        return this.option('useNativeInputClick') || this._isCustomClickEvent;
      });
    }
    const inputProps = {
      multiple,
      accept,
      tabIndex: -1
    };
    if ((0, _type.isDefined)(hint)) {
      inputProps.title = hint;
    }
    this._$fileInput.prop(inputProps);
  }
  _inputChangeHandler() {
    if (this._doPreventInputChange) {
      return;
    }
    const fileName = this._$fileInput.val().replace(/^.*\\/, '');
    const files = this._$fileInput.prop('files');
    // @ts-expect-error
    if (files && !files.length && this.option('uploadMode') !== 'useForm') {
      return;
    }
    const value = files ? this._getFiles(files) : [{
      name: fileName
    }];
    this._changeValue(value);
    // @ts-expect-error
    if (this.option('uploadMode') === 'instantly') {
      this._uploadFiles();
    }
  }
  _shouldFileListBeExtended() {
    // @ts-expect-error
    return this.option('uploadMode') !== 'useForm' && this.option('extendSelection') && this.option('multiple');
  }
  _changeValue(value) {
    // @ts-expect-error
    const files = this._shouldFileListBeExtended() ? this.option('value').slice() : [];
    this.option('value', files.concat(value));
  }
  _getFiles(fileList) {
    const values = [];
    (0, _iterator.each)(fileList, (_, value) => values.push(value));
    return values;
  }
  _getFile(fileData) {
    const targetFileValue = (0, _type.isNumeric)(fileData) ? this.option('value')[fileData] : fileData;
    return this._files.filter(file => file.value === targetFileValue)[0];
  }
  _initLabel() {
    if (!this._$inputLabel) {
      this._$inputLabel = (0, _renderer.default)('<div>');
    }
    this._updateInputLabelText();
  }
  _updateInputLabelText() {
    const correctedValue = this._isInteractionDisabled() ? '' : this.option('labelText');
    // @ts-expect-error
    this._$inputLabel.text(correctedValue);
  }
  _focusTarget() {
    return this.$element().find(`.${FILEUPLOADER_BUTTON_CLASS}`);
  }
  _getSubmitElement() {
    return this._$fileInput;
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(FILEUPLOADER_CLASS);
    this._renderWrapper();
    this._renderInputWrapper();
    this._renderSelectButton();
    this._renderInputContainer();
    this._renderUploadButton();
    this._preventRecreatingFiles = true;
    this._activeDropZone = null;
  }
  _render() {
    this._preventRecreatingFiles = false;
    this._attachDragEventHandlers(this._$inputWrapper);
    this._attachDragEventHandlers(this.option('dropZone'));
    this._renderFiles();
    super._render();
  }
  _createFileProgressBar(file) {
    file.progressBar = this._createProgressBar(file.value.size);
    file.progressBar.$element().appendTo(file.$file);
    this._initStatusMessage(file);
    this._ensureCancelButtonInitialized(file);
  }
  _setStatusMessage(file, message) {
    setTimeout(() => {
      if (this.option('showFileList')) {
        if (file.$statusMessage) {
          file.$statusMessage.text(message);
          file.$statusMessage.css('display', '');
          file.progressBar.$element().remove();
        }
      }
    }, FILEUPLOADER_AFTER_LOAD_DELAY);
  }
  _getUploadAbortedStatusMessage() {
    // @ts-expect-error
    return this.option('uploadMode') === 'instantly' ? this.option('uploadAbortedMessage') : this.option('readyToUploadMessage');
  }
  _createFiles() {
    const value = this.option('value');
    // @ts-expect-error
    if (this._files && ((value === null || value === void 0 ? void 0 : value.length) === 0 || !this._shouldFileListBeExtended())) {
      this._preventFilesUploading(this._files);
      this._files = null;
    }
    if (!this._files) {
      this._files = [];
    }
    // @ts-expect-error
    (0, _iterator.each)(value === null || value === void 0 ? void 0 : value.slice(this._files.length), (_, value) => {
      const file = this._createFile(value);
      this._validateFile(file);
      this._files.push(file);
    });
  }
  _preventFilesUploading(files) {
    files.forEach(file => this._uploadStrategy.abortUpload(file));
  }
  _validateFile(file) {
    file.isValidFileExtension = this._validateFileExtension(file);
    file.isValidMinSize = this._validateMinFileSize(file);
    file.isValidMaxSize = this._validateMaxFileSize(file);
  }
  _validateFileExtension(file) {
    const {
      allowedFileExtensions
    } = this.option();
    if (!(allowedFileExtensions !== null && allowedFileExtensions !== void 0 && allowedFileExtensions.length)) {
      return true;
    }
    return this._isFileExtensionAllowed(file.value, allowedFileExtensions);
  }
  _validateMaxFileSize(file) {
    const fileSize = file.value.size;
    const maxFileSize = this.option('maxFileSize');
    return maxFileSize > 0 ? fileSize <= maxFileSize : true;
  }
  _validateMinFileSize(file) {
    const fileSize = file.value.size;
    const minFileSize = this.option('minFileSize');
    return minFileSize > 0 ? fileSize >= minFileSize : true;
  }
  _isFileExtensionAllowed(file, allowedExtensions) {
    for (let i = 0, n = allowedExtensions.length; i < n; i += 1) {
      let allowedExtension = allowedExtensions[i];
      if (allowedExtension[0] === '.') {
        allowedExtension = allowedExtension.replace('.', '\\.');
        if (file.name.match(new RegExp(`${allowedExtension}$`, 'i'))) {
          return true;
        }
      } else {
        allowedExtension = allowedExtension.replace(new RegExp('\\*', 'g'), '');
        if (file.type.match(new RegExp(allowedExtension, 'i'))) {
          return true;
        }
      }
    }
    return false;
  }
  _createBeforeSendAction() {
    this._beforeSendAction = this._createActionByOption('onBeforeSend', {
      excludeValidators: ['readOnly']
    });
  }
  _createUploadStartedAction() {
    this._uploadStartedAction = this._createActionByOption('onUploadStarted', {
      excludeValidators: ['readOnly']
    });
  }
  _createUploadedAction() {
    this._uploadedAction = this._createActionByOption('onUploaded', {
      excludeValidators: ['readOnly']
    });
  }
  _createFilesUploadedAction() {
    this._filesUploadedAction = this._createActionByOption('onFilesUploaded', {
      excludeValidators: ['readOnly']
    });
  }
  _createProgressAction() {
    this._progressAction = this._createActionByOption('onProgress', {
      excludeValidators: ['readOnly']
    });
  }
  _createUploadAbortedAction() {
    this._uploadAbortedAction = this._createActionByOption('onUploadAborted', {
      excludeValidators: ['readOnly']
    });
  }
  _createUploadErrorAction() {
    this._uploadErrorAction = this._createActionByOption('onUploadError', {
      excludeValidators: ['readOnly']
    });
  }
  _createDropZoneEnterAction() {
    this._dropZoneEnterAction = this._createActionByOption('onDropZoneEnter');
  }
  _createDropZoneLeaveAction() {
    this._dropZoneLeaveAction = this._createActionByOption('onDropZoneLeave');
  }
  _createFile(value) {
    return {
      value,
      loadedSize: 0,
      onProgress: (0, _callbacks.default)(),
      onAbort: (0, _callbacks.default)(),
      onLoad: (0, _callbacks.default)(),
      onError: (0, _callbacks.default)(),
      onLoadStart: (0, _callbacks.default)(),
      isValidFileExtension: true,
      isValidMaxSize: true,
      isValidMinSize: true,
      isValid() {
        return this.isValidFileExtension && this.isValidMaxSize && this.isValidMinSize;
      },
      isInitialized: false
    };
  }
  _resetFileState(file) {
    file.isAborted = false;
    file.uploadStarted = false;
    file.isStartLoad = false;
    file.loadedSize = 0;
    file.chunksData = undefined;
    file.request = undefined;
  }
  _renderFiles() {
    var _this$_validationMess;
    const value = this.option('value');
    if (!this._$filesContainer) {
      this._$filesContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILES_CONTAINER_CLASS)
      // @ts-expect-error
      .appendTo(this._$content);
      // @ts-expect-error
    } else if (!this._shouldFileListBeExtended() || (value === null || value === void 0 ? void 0 : value.length) === 0) {
      this._$filesContainer.empty();
    }
    const showFileList = this.option('showFileList');
    if (showFileList) {
      (0, _iterator.each)(this._files, (_, file) => {
        if (!file.$file) {
          this._renderFile(file);
        }
      });
    }
    // @ts-expect-error
    this.$element().toggleClass(FILEUPLOADER_SHOW_FILE_LIST_CLASS, showFileList);
    this._toggleFileUploaderEmptyClassName();
    this._updateFileNameMaxWidth();
    (_this$_validationMess = this._validationMessage) === null || _this$_validationMess === void 0 || _this$_validationMess.repaint();
  }
  _renderFile(file) {
    const {
      value
    } = file;
    const $fileContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_CONTAINER_CLASS).appendTo(this._$filesContainer);
    this._renderFileButtons(file, $fileContainer);
    file.$file = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_CLASS).appendTo($fileContainer);
    const $fileInfo = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_INFO_CLASS).appendTo(file.$file);
    file.$statusMessage = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).appendTo(file.$file);
    (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_NAME_CLASS).text(value.name).appendTo($fileInfo);
    if ((0, _type.isDefined)(value.size)) {
      (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_SIZE_CLASS).text(this._getFileSize(value.size)).appendTo($fileInfo);
    }
    if (file.isValid()) {
      file.$statusMessage.text(this.option('readyToUploadMessage'));
    } else {
      if (!file.isValidFileExtension) {
        file.$statusMessage.append(this._createValidationElement('invalidFileExtensionMessage'));
      }
      if (!file.isValidMaxSize) {
        file.$statusMessage.append(this._createValidationElement('invalidMaxFileSizeMessage'));
      }
      if (!file.isValidMinSize) {
        file.$statusMessage.append(this._createValidationElement('invalidMinFileSizeMessage'));
      }
      $fileContainer.addClass(FILEUPLOADER_INVALID_CLASS);
    }
  }
  _createValidationElement(key) {
    // @ts-expect-error
    return (0, _renderer.default)('<span>').text(this.option(key));
  }
  _updateFileNameMaxWidth() {
    // @ts-expect-error
    const cancelButtonsCount = this.option('allowCanceling') && this.option('uploadMode') !== 'useForm' ? 1 : 0;
    // @ts-expect-error
    const uploadButtonsCount = this.option('uploadMode') === 'useButtons' ? 1 : 0;
    const filesContainerWidth = (0, _size.getWidth)(this._$filesContainer.find(`.${FILEUPLOADER_FILE_CONTAINER_CLASS}`).first()) || (0, _size.getWidth)(this._$filesContainer);
    const $buttonContainer = this._$filesContainer.find(`.${FILEUPLOADER_BUTTON_CONTAINER_CLASS}`).eq(0);
    const buttonsWidth = (0, _size.getWidth)($buttonContainer) * (cancelButtonsCount + uploadButtonsCount);
    const $fileSize = this._$filesContainer.find(`.${FILEUPLOADER_FILE_SIZE_CLASS}`).eq(0);
    const prevFileSize = $fileSize.text();
    $fileSize.text('1000 Mb');
    const fileSizeWidth = (0, _size.getWidth)($fileSize);
    $fileSize.text(prevFileSize);
    this._$filesContainer.find(`.${FILEUPLOADER_FILE_NAME_CLASS}`).css('maxWidth', filesContainerWidth - buttonsWidth - fileSizeWidth);
  }
  _renderFileButtons(file, $container) {
    const $cancelButton = this._getCancelButton(file);
    $cancelButton && $container.append($cancelButton);
    const $uploadButton = this._getUploadButton(file);
    $uploadButton && $container.append($uploadButton);
  }
  _getCancelButton(file) {
    // @ts-expect-error
    if (this.option('uploadMode') === 'useForm') {
      return null;
    }
    const {
      allowCanceling,
      readOnly,
      hoverStateEnabled,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _buttonStylingMode
    } = this.option();
    file.cancelButton = this._createComponent((0, _renderer.default)('<div>').addClass(`${FILEUPLOADER_BUTTON_CLASS} ${FILEUPLOADER_CANCEL_BUTTON_CLASS}`), _button.default, {
      onClick: () => this._removeFile(file),
      icon: 'close',
      visible: allowCanceling,
      disabled: readOnly,
      integrationOptions: {},
      hoverStateEnabled,
      stylingMode: _buttonStylingMode
    });
    return (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.cancelButton.$element());
  }
  _getUploadButton(file) {
    // @ts-expect-error
    if (!file.isValid() || this.option('uploadMode') !== 'useButtons') {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      hoverStateEnabled,
      _buttonStylingMode
    } = this.option();
    file.uploadButton = this._createComponent((0, _renderer.default)('<div>').addClass(`${FILEUPLOADER_BUTTON_CLASS} ${FILEUPLOADER_UPLOAD_BUTTON_CLASS}`), _button.default, {
      onClick: () => this._uploadFile(file),
      icon: 'upload',
      hoverStateEnabled,
      stylingMode: _buttonStylingMode
    });
    file.onLoadStart.add(() => file.uploadButton.option({
      visible: false,
      disabled: true
    }));
    file.onAbort.add(() => file.uploadButton.option({
      visible: true,
      disabled: false
    }));
    return (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.uploadButton.$element());
  }
  _removeFile(file) {
    var _file$$file;
    (_file$$file = file.$file) === null || _file$$file === void 0 || _file$$file.parent().remove();
    this._files.splice(this._files.indexOf(file), 1);
    // @ts-expect-error
    const value = this.option('value').slice();
    value.splice(value.indexOf(file.value), 1);
    this._preventRecreatingFiles = true;
    this.option('value', value);
    this._preventRecreatingFiles = false;
    this._toggleFileUploaderEmptyClassName();
    this._resetInputValue(true);
  }
  removeFile(fileData) {
    // @ts-expect-error
    if (this.option('uploadMode') === 'useForm' || !(0, _type.isDefined)(fileData)) {
      return;
    }
    const file = this._getFile(fileData);
    if (file) {
      if (file.uploadStarted) {
        this._preventFilesUploading([file]);
      }
      this._removeFile(file);
    }
  }
  _toggleFileUploaderEmptyClassName() {
    this.$element().toggleClass(FILEUPLOADER_EMPTY_CLASS, !this._files.length || this._hasInvalidFile(this._files));
  }
  _hasInvalidFile(files) {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].isValid()) {
        return true;
      }
    }
    return false;
  }
  _getFileSize(size) {
    let i = 0;
    const labels = [_message.default.format('dxFileUploader-bytes'), _message.default.format('dxFileUploader-kb'), _message.default.format('dxFileUploader-Mb'), _message.default.format('dxFileUploader-Gb')];
    const count = labels.length - 1;
    while (i < count && size >= 1024) {
      size /= 1024;
      i++;
    }
    return `${Math.round(size)} ${labels[i]}`;
  }
  _renderSelectButton() {
    const $button = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS).appendTo(this._$inputWrapper);
    this._selectButton = this._createComponent($button, _button.default, {
      text: this.option('selectButtonText'),
      focusStateEnabled: false,
      integrationOptions: {},
      disabled: this.option('readOnly'),
      hoverStateEnabled: this.option('hoverStateEnabled')
    });
    // NOTE: click triggering on input 'file' works correctly only in native click handler when device is used
    if (_devices.default.real().deviceType === 'desktop') {
      this._selectButton.option('onClick', () => this._selectFileDialogClickHandler());
    } else {
      this._attachSelectFileDialogHandlers(this._selectButton.$element());
    }
    const {
      dialogTrigger
    } = this.option();
    this._attachSelectFileDialogHandlers(dialogTrigger);
  }
  // @ts-expect-error
  _selectFileDialogClickHandler() {
    if (this.option('useNativeInputClick')) {
      return;
    }
    if (this._isInteractionDisabled()) {
      return false;
    }
    this._isCustomClickEvent = true;
    // @ts-expect-error
    _events_engine.default.trigger(this._$fileInput, 'click');
    this._isCustomClickEvent = false;
  }
  _attachSelectFileDialogHandlers(target) {
    if (!(0, _type.isDefined)(target)) {
      return;
    }
    this._detachSelectFileDialogHandlers(target);
    const $target = (0, _renderer.default)(target);
    _events_engine.default.on($target, (0, _index.addNamespace)(nativeClickEvent, DIALOG_TRIGGER_EVENT_NAMESPACE), () => {
      this._selectFileDialogClickHandler();
    });
    _events_engine.default.on($target, (0, _index.addNamespace)(keyUpEventName, DIALOG_TRIGGER_EVENT_NAMESPACE), e => {
      const normalizedKeyName = (0, _index.normalizeKeyName)(e);
      if (normalizedKeyName === ENTER_KEY || normalizedKeyName === SPACE_KEY) {
        this._selectFileDialogClickHandler();
      }
    });
  }
  _detachSelectFileDialogHandlers(target) {
    if (!(0, _type.isDefined)(target)) {
      return;
    }
    const $target = (0, _renderer.default)(target);
    _events_engine.default.off($target, `.${DIALOG_TRIGGER_EVENT_NAMESPACE}`);
  }
  _renderUploadButton() {
    // @ts-expect-error
    if (this.option('uploadMode') !== 'useButtons') {
      return;
    }
    const $uploadButton = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS).addClass(FILEUPLOADER_UPLOAD_BUTTON_CLASS)
    // @ts-expect-error
    .appendTo(this._$content);
    this._uploadButton = this._createComponent($uploadButton, _button.default, {
      text: this.option('uploadButtonText'),
      onClick: this._uploadButtonClickHandler.bind(this),
      type: this.option('_uploadButtonType'),
      integrationOptions: {},
      hoverStateEnabled: this.option('hoverStateEnabled')
    });
  }
  _uploadButtonClickHandler() {
    this._uploadFiles();
  }
  _shouldDragOverBeRendered() {
    // @ts-expect-error
    return !this.option('readOnly') && (this.option('uploadMode') !== 'useForm' || this.option('nativeDropSupported'));
  }
  _isInteractionDisabled() {
    return this.option('readOnly') || this.option('disabled');
  }
  _renderInputContainer() {
    this._$inputContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_INPUT_CONTAINER_CLASS).appendTo(this._$inputWrapper);
    this._$fileInput.addClass(FILEUPLOADER_INPUT_CLASS);
    this._renderInput();
    const labelId = `dx-fileuploader-input-label-${new _guid.default()}`;
    this._$inputLabel.attr('id', labelId).addClass(FILEUPLOADER_INPUT_LABEL_CLASS).appendTo(this._$inputContainer);
    this.setAria('labelledby', labelId, this._$fileInput);
  }
  _renderInput() {
    if (this.option('useNativeInputClick')) {
      this._selectButton.option('template', this._selectButtonInputTemplate.bind(this));
    } else {
      this._$fileInput.appendTo(this._$inputContainer);
      this._selectButton.option('template', 'content');
    }
    this._applyInputAttributes(this.option('inputAttr'));
  }
  _selectButtonInputTemplate(data, content) {
    const $content = (0, _renderer.default)(content);
    const $text = (0, _renderer.default)('<span>').addClass('dx-button-text').text(data.text);
    $content.append($text).append(this._$fileInput);
    return $content;
  }
  _renderInputWrapper() {
    this._$inputWrapper = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_INPUT_WRAPPER_CLASS)
    // @ts-expect-error
    .appendTo(this._$content);
  }
  _detachDragEventHandlers(target) {
    if (!(0, _type.isDefined)(target)) {
      return;
    }
    _events_engine.default.off((0, _renderer.default)(target), (0, _index.addNamespace)('', this.NAME));
  }
  _attachDragEventHandlers(target) {
    const isCustomTarget = target !== this._$inputWrapper;
    if (!(0, _type.isDefined)(target) || !this._shouldDragOverBeRendered()) {
      return;
    }
    this._detachDragEventHandlers(target);
    target = (0, _renderer.default)(target);
    _events_engine.default.on(target, (0, _index.addNamespace)('dragenter', this.NAME), this._dragEnterHandler.bind(this, isCustomTarget));
    _events_engine.default.on(target, (0, _index.addNamespace)('dragover', this.NAME), this._dragOverHandler.bind(this, isCustomTarget));
    _events_engine.default.on(target, (0, _index.addNamespace)('dragleave', this.NAME), this._dragLeaveHandler.bind(this, isCustomTarget));
    _events_engine.default.on(target, (0, _index.addNamespace)('drop', this.NAME), this._dropHandler.bind(this, isCustomTarget));
  }
  _applyInputAttributes(customAttributes) {
    this._$fileInput.attr(customAttributes);
  }
  _useInputForDrop() {
    // @ts-expect-error
    return this.option('nativeDropSupported') && this.option('uploadMode') === 'useForm';
  }
  _getDropZoneElement(isCustomTarget, e) {
    // @ts-expect-error
    let targetList = isCustomTarget ? Array.from((0, _renderer.default)(this.option('dropZone'))) : [this._$inputWrapper];
    // @ts-expect-error
    targetList = targetList.map(element => (0, _renderer.default)(element).get(0));
    return targetList[targetList.indexOf(e.currentTarget)];
  }
  // @ts-expect-error
  _dragEnterHandler(isCustomTarget, e) {
    if (this.option('disabled')) {
      return false;
    }
    if (!this._useInputForDrop()) {
      e.preventDefault();
    }
    const dropZoneElement = this._getDropZoneElement(isCustomTarget, e);
    if ((0, _type.isDefined)(dropZoneElement) && this._shouldRaiseDragOver(e, dropZoneElement)) {
      this._activeDropZone = dropZoneElement;
      this._tryToggleDropZoneActive(true, isCustomTarget, e);
    }
  }
  _shouldRaiseDragOver(e, dropZoneElement) {
    return this._activeDropZone === null && this.isMouseOverElement(e, dropZoneElement, false) && e.originalEvent.dataTransfer.types.find(item => item === 'Files');
  }
  _dragOverHandler(isCustomTarget, e) {
    if (!this._useInputForDrop()) {
      e.preventDefault();
    }
    e.originalEvent.dataTransfer.dropEffect = 'copy';
    if (!isCustomTarget) {
      // only default dropzone has pseudoelements
      const dropZoneElement = this._getDropZoneElement(false, e);
      if (this._shouldRaiseDragOver(e, dropZoneElement)) {
        this._dragEnterHandler(false, e);
      }
      if (this._shouldRaiseDragLeave(e, false)) {
        this._dragLeaveHandler(false, e);
      }
    }
  }
  _dragLeaveHandler(isCustomTarget, e) {
    if (!this._useInputForDrop()) {
      e.preventDefault();
    }
    if (this._shouldRaiseDragLeave(e, isCustomTarget)) {
      this._tryToggleDropZoneActive(false, isCustomTarget, e);
      this._activeDropZone = null;
    }
  }
  _shouldRaiseDragLeave(e, isCustomTarget) {
    return this._activeDropZone !== null && !this.isMouseOverElement(e, this._activeDropZone, !isCustomTarget, -DRAG_EVENT_DELTA);
  }
  _tryToggleDropZoneActive(active, isCustom, event) {
    const classAction = active ? 'addClass' : 'removeClass';
    const mouseAction = active ? '_dropZoneEnterAction' : '_dropZoneLeaveAction';
    this[mouseAction]({
      event,
      dropZoneElement: this._activeDropZone
    });
    if (!isCustom) {
      this.$element()[classAction](FILEUPLOADER_DRAGOVER_CLASS);
    }
  }
  _dropHandler(isCustomTarget, e) {
    this._activeDropZone = null;
    if (!isCustomTarget) {
      this.$element().removeClass(FILEUPLOADER_DRAGOVER_CLASS);
    }
    if (this._useInputForDrop() || isCustomTarget && this._isInteractionDisabled()) {
      return;
    }
    e.preventDefault();
    const fileList = e.originalEvent.dataTransfer.files;
    const files = this._getFiles(fileList);
    if (!this.option('multiple') && files.length > 1 || files.length === 0) {
      return;
    }
    this._changeValue(files);
    // @ts-expect-error
    if (this.option('uploadMode') === 'instantly') {
      this._uploadFiles();
    }
  }
  _areAllFilesLoaded() {
    return this._files.every(file => !file.isValid() || file._isError || file._isLoaded || file.isAborted);
  }
  _handleAllFilesUploaded() {
    this._recalculateProgress();
    if (this._areAllFilesLoaded()) {
      this._filesUploadedAction();
    }
  }
  _renderWrapper() {
    const $wrapper = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_WRAPPER_CLASS).appendTo(this.$element());
    const $container = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_CONTAINER_CLASS).appendTo($wrapper);
    this._$content = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_CONTENT_CLASS).appendTo($container);
  }
  _clean() {
    this._$fileInput.detach();
    // @ts-expect-error
    delete this._$filesContainer;
    const {
      dialogTrigger
    } = this.option();
    this._detachSelectFileDialogHandlers(dialogTrigger);
    this._detachDragEventHandlers(this.option('dropZone'));
    if (this._files) {
      this._files.forEach(file => {
        file.$file = null;
        file.$statusMessage = null;
      });
    }
    super._clean();
  }
  abortUpload(fileData) {
    // @ts-expect-error
    if (this.option('uploadMode') === 'useForm') {
      return;
    }
    if ((0, _type.isDefined)(fileData)) {
      const file = this._getFile(fileData);
      if (file) {
        this._preventFilesUploading([file]);
      }
    } else {
      this._preventFilesUploading(this._files);
    }
  }
  upload(fileData) {
    // @ts-expect-error
    if (this.option('uploadMode') === 'useForm') {
      return;
    }
    if ((0, _type.isDefined)(fileData)) {
      const file = this._getFile(fileData);
      if (file && isFormDataSupported()) {
        this._uploadFile(file);
      }
    } else {
      this._uploadFiles();
    }
  }
  _uploadFiles() {
    if (isFormDataSupported()) {
      (0, _iterator.each)(this._files, (_, file) => this._uploadFile(file));
    }
  }
  _uploadFile(file) {
    this._uploadStrategy.upload(file);
  }
  _updateProgressBar(file, loadedFileData) {
    var _file$progressBar;
    (_file$progressBar = file.progressBar) === null || _file$progressBar === void 0 || _file$progressBar.option({
      value: loadedFileData.loaded,
      showStatus: true
    });
    this._progressAction({
      file: file.value,
      segmentSize: loadedFileData.currentSegmentSize,
      bytesLoaded: loadedFileData.loaded,
      bytesTotal: loadedFileData.total,
      event: loadedFileData.event,
      request: file.request
    });
  }
  _updateTotalProgress(totalFilesSize, totalLoadedFilesSize) {
    let progress = 0;
    if ((0, _type.isDefined)(totalFilesSize)) {
      if (this._files.length > 0 && this._areAllFilesLoaded() && totalFilesSize === 0 && totalLoadedFilesSize === 0) {
        progress = this._getProgressValue(1);
      } else if (totalFilesSize) {
        progress = this._getProgressValue(totalLoadedFilesSize / totalFilesSize);
      }
    }
    this.option('progress', progress);
    this._setLoadedSize(totalLoadedFilesSize);
  }
  _getProgressValue(ratio) {
    return Math.floor(ratio * 100);
  }
  _initStatusMessage(file) {
    file.$statusMessage.css('display', 'none');
  }
  _ensureCancelButtonInitialized(file) {
    if (file.isInitialized) {
      return;
    }
    file.cancelButton.option('onClick', () => {
      this._preventFilesUploading([file]);
      this._removeFile(file);
    });
    const hideCancelButton = () => {
      setTimeout(() => {
        file.cancelButton.option({
          visible: false
        });
      }, FILEUPLOADER_AFTER_LOAD_DELAY);
    };
    file.onLoad.add(hideCancelButton);
    file.onError.add(hideCancelButton);
  }
  _createProgressBar(fileSize) {
    return this._createComponent((0, _renderer.default)('<div>'), _progress_bar.default, {
      value: undefined,
      min: 0,
      max: fileSize,
      statusFormat: ratio => `${this._getProgressValue(ratio)}%`,
      showStatus: false,
      statusPosition: 'right'
    });
  }
  _getTotalFilesSize() {
    if (!this._totalFilesSize) {
      this._totalFilesSize = 0;
      (0, _iterator.each)(this._files, (_, file) => {
        this._totalFilesSize += file.value.size;
      });
    }
    return this._totalFilesSize;
  }
  _getTotalLoadedFilesSize() {
    if (!this._totalLoadedFilesSize) {
      this._totalLoadedFilesSize = 0;
      (0, _iterator.each)(this._files, (_, file) => {
        this._totalLoadedFilesSize += file.loadedSize;
      });
    }
    return this._totalLoadedFilesSize;
  }
  _setLoadedSize(value) {
    this._totalLoadedFilesSize = value;
  }
  _recalculateProgress() {
    this._totalFilesSize = 0;
    this._totalLoadedFilesSize = 0;
    this._updateTotalProgress(this._getTotalFilesSize(), this._getTotalLoadedFilesSize());
  }
  isMouseOverElement(mouseEvent, element, correctPseudoElements) {
    let dragEventDelta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DRAG_EVENT_DELTA;
    if (!element) return false;
    const beforeHeight = correctPseudoElements ? parseFloat(window.getComputedStyle(element, ':before').height) : 0;
    const afterHeight = correctPseudoElements ? parseFloat(window.getComputedStyle(element, ':after').height) : 0;
    const x = (0, _size.getOffset)(element).left;
    const y = (0, _size.getOffset)(element).top + beforeHeight;
    const w = element.offsetWidth;
    const h = element.offsetHeight - beforeHeight - afterHeight;
    const eventX = this._getEventX(mouseEvent);
    const eventY = this._getEventY(mouseEvent);
    return eventX + dragEventDelta >= x && eventX - dragEventDelta < x + w && eventY + dragEventDelta >= y && eventY - dragEventDelta < y + h;
  }
  _getEventX(e) {
    return (0, _index.isTouchEvent)(e) ? this._getTouchEventX(e) : e.clientX + this._getDocumentScrollLeft();
  }
  _getEventY(e) {
    return (0, _index.isTouchEvent)(e) ? this._getTouchEventY(e) : e.clientY + this._getDocumentScrollTop();
  }
  _getTouchEventX(e) {
    let touchPoint = null;
    if (e.changedTouches.length > 0) {
      touchPoint = e.changedTouches;
    } else if (e.targetTouches.length > 0) {
      touchPoint = e.targetTouches;
    }
    // @ts-expect-error
    return touchPoint ? touchPoint[0].pageX : 0;
  }
  _getTouchEventY(e) {
    let touchPoint = null;
    if (e.changedTouches.length > 0) {
      touchPoint = e.changedTouches;
    } else if (e.targetTouches.length > 0) {
      touchPoint = e.targetTouches;
    }
    // @ts-expect-error
    return touchPoint ? touchPoint[0].pageY : 0;
  }
  _getDocumentScrollTop() {
    const document = _dom_adapter.default.getDocument();
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  _getDocumentScrollLeft() {
    const document = _dom_adapter.default.getDocument();
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }
  _updateReadOnlyState() {
    const readOnly = this.option('readOnly');
    // @ts-expect-error
    this._selectButton.option('disabled', readOnly);
    this._files.forEach(file => {
      var _file$cancelButton;
      return (_file$cancelButton = file.cancelButton) === null || _file$cancelButton === void 0 ? void 0 : _file$cancelButton.option('disabled', readOnly);
    });
    this._updateInputLabelText();
    this._attachDragEventHandlers(this._$inputWrapper);
  }
  _updateHoverState() {
    var _this$_selectButton, _this$_uploadButton;
    const value = this.option('hoverStateEnabled');
    // @ts-expect-error
    (_this$_selectButton = this._selectButton) === null || _this$_selectButton === void 0 || _this$_selectButton.option('hoverStateEnabled', value);
    // @ts-expect-error
    (_this$_uploadButton = this._uploadButton) === null || _this$_uploadButton === void 0 || _this$_uploadButton.option('hoverStateEnabled', value);
    this._files.forEach(file => {
      var _file$uploadButton, _file$cancelButton2;
      (_file$uploadButton = file.uploadButton) === null || _file$uploadButton === void 0 || _file$uploadButton.option('hoverStateEnabled', value);
      (_file$cancelButton2 = file.cancelButton) === null || _file$cancelButton2 === void 0 || _file$cancelButton2.option('hoverStateEnabled', value);
    });
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'height':
      case 'width':
        this._updateFileNameMaxWidth();
        super._optionChanged(args);
        break;
      case 'value':
        !value.length && this._$fileInput.val('');
        if (!this._preventRecreatingFiles) {
          this._createFiles();
          this._renderFiles();
        }
        this._recalculateProgress();
        super._optionChanged(args);
        break;
      case 'name':
        this._initFileInput();
        super._optionChanged(args);
        break;
      case 'accept':
        this._initFileInput();
        break;
      case 'multiple':
        this._initFileInput();
        if (!args.value) {
          this.clear();
        }
        break;
      case 'readOnly':
        this._updateReadOnlyState();
        super._optionChanged(args);
        break;
      case 'disabled':
        this._updateInputLabelText();
        super._optionChanged(args);
        break;
      case 'selectButtonText':
        this._selectButton.option('text', value);
        break;
      case 'uploadButtonText':
        this._uploadButton && this._uploadButton.option('text', value);
        break;
      case '_uploadButtonType':
        this._uploadButton && this._uploadButton.option('type', value);
        break;
      case '_buttonStylingMode':
        this._files.forEach(file => {
          var _file$uploadButton2, _file$cancelButton3;
          (_file$uploadButton2 = file.uploadButton) === null || _file$uploadButton2 === void 0 || _file$uploadButton2.option('stylingMode', value);
          (_file$cancelButton3 = file.cancelButton) === null || _file$cancelButton3 === void 0 || _file$cancelButton3.option('stylingMode', value);
        });
        break;
      case 'dialogTrigger':
        this._detachSelectFileDialogHandlers(previousValue);
        this._attachSelectFileDialogHandlers(value);
        break;
      case 'dropZone':
        this._detachDragEventHandlers(previousValue);
        this._attachDragEventHandlers(value);
        break;
      case 'maxFileSize':
      case 'minFileSize':
      case 'allowedFileExtensions':
      case 'invalidFileExtensionMessage':
      case 'invalidMaxFileSizeMessage':
      case 'invalidMinFileSizeMessage':
      case 'readyToUploadMessage':
      case 'uploadedMessage':
      case 'uploadFailedMessage':
      case 'uploadAbortedMessage':
        this._invalidate();
        break;
      case 'labelText':
        this._updateInputLabelText();
        break;
      case 'showFileList':
        if (!this._preventRecreatingFiles) {
          this._renderFiles();
        }
        break;
      case 'uploadFile':
      case 'uploadChunk':
      case 'chunkSize':
        this._setUploadStrategy();
        break;
      case 'abortUpload':
      case 'uploadUrl':
      case 'progress':
      case 'uploadMethod':
      case 'uploadHeaders':
      case 'uploadCustomData':
      case 'extendSelection':
        break;
      case 'hoverStateEnabled':
        this._updateHoverState();
        super._optionChanged(args);
        break;
      case 'allowCanceling':
      case 'uploadMode':
        this.clear();
        this._invalidate();
        break;
      case 'onBeforeSend':
        this._createBeforeSendAction();
        break;
      case 'onUploadStarted':
        this._createUploadStartedAction();
        break;
      case 'onUploaded':
        this._createUploadedAction();
        break;
      case 'onFilesUploaded':
        this._createFilesUploadedAction();
        break;
      case 'onProgress':
        this._createProgressAction();
        break;
      case 'onUploadError':
        this._createUploadErrorAction();
        break;
      case 'onUploadAborted':
        this._createUploadAbortedAction();
        break;
      case 'onDropZoneEnter':
        this._createDropZoneEnterAction();
        break;
      case 'onDropZoneLeave':
        this._createDropZoneLeaveAction();
        break;
      case 'useNativeInputClick':
        this._renderInput();
        break;
      case 'useDragOver':
        this._attachDragEventHandlers(this._$inputWrapper);
        break;
      case 'nativeDropSupported':
        this._invalidate();
        break;
      case 'inputAttr':
        this._applyInputAttributes(this.option(name));
        break;
      case 'hint':
        this._initFileInput();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetInputValue(force) {
    // @ts-expect-error
    if (this.option('uploadMode') === 'useForm' && !force) {
      return;
    }
    this._doPreventInputChange = true;
    this._$fileInput.val('');
    this._doPreventInputChange = false;
  }
  clear() {
    this.option('value', []);
  }
}
class FileBlobReader {
  constructor(file, chunkSize) {
    this.file = file;
    this.chunkSize = chunkSize;
    this.index = 0;
  }
  read() {
    if (!this.file) {
      return null;
    }
    const result = this.createBlobResult(this.file, this.index, this.chunkSize);
    if (result.isCompleted) {
      this.file = null;
    }
    // @ts-expect-error
    this.index++;
    return result;
  }
  createBlobResult(file, index, chunkSize) {
    const currentPosition = index * chunkSize;
    return {
      blob: this.sliceFile(file, currentPosition, chunkSize),
      index,
      isCompleted: currentPosition + chunkSize >= file.size
    };
  }
  sliceFile(file, startPos, length) {
    if (file.slice) {
      return file.slice(startPos, startPos + length);
    }
    if (file.webkitSlice) {
      return file.webkitSlice(startPos, startPos + length);
    }
    return null;
  }
}
class FileUploadStrategyBase {
  constructor(fileUploader) {
    this.fileUploader = fileUploader;
  }
  upload(file) {
    if (file.isInitialized && file.isAborted) {
      this.fileUploader._resetFileState(file);
    }
    if (file.isValid() && !file.uploadStarted) {
      this._prepareFileBeforeUpload(file);
      this._uploadCore(file);
    }
  }
  abortUpload(file) {
    var _file$request;
    if (file._isError || file._isLoaded || file.isAborted || !file.uploadStarted) {
      return;
    }
    file.isAborted = true;
    (_file$request = file.request) === null || _file$request === void 0 || _file$request.abort();
    if (this._isCustomCallback('abortUpload')) {
      const abortUpload = this.fileUploader.option('abortUpload');
      const arg = this._createUploadArgument(file);
      let deferred = null;
      try {
        const result = abortUpload(file.value, arg);
        deferred = (0, _deferred.fromPromise)(result);
      } catch (error) {
        // @ts-expect-error
        deferred = (0, _deferred.Deferred)().reject(error).promise();
      }
      // @ts-expect-error
      deferred.done(() => file.onAbort.fire()).fail(error => this._handleFileError(file, error));
    }
  }
  _beforeSend(xhr, file) {
    const arg = this._createUploadArgument(file);
    this.fileUploader._beforeSendAction({
      request: xhr,
      file: file.value,
      uploadInfo: arg
    });
    file.request = xhr;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createUploadArgument(file) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _uploadCore(file) {}
  _isCustomCallback(name) {
    const callback = this.fileUploader.option(name);
    return callback && (0, _type.isFunction)(callback);
  }
  _handleProgress(file, e) {
    if (file._isError) {
      return;
    }
    file._isProgressStarted = true;
    this._handleProgressCore(file, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _handleProgressCore(file, e) {}
  _handleFileError(file, error) {
    file._isError = true;
    file.onError.fire(error);
  }
  _prepareFileBeforeUpload(file) {
    if (file.$file) {
      var _file$progressBar2;
      (_file$progressBar2 = file.progressBar) === null || _file$progressBar2 === void 0 || _file$progressBar2.dispose();
      this.fileUploader._createFileProgressBar(file);
    }
    if (file.isInitialized) {
      return;
    }
    file.onLoadStart.add(this._onUploadStarted.bind(this, file));
    file.onLoad.add(this._onLoadedHandler.bind(this, file));
    file.onError.add(this._onErrorHandler.bind(this, file));
    file.onAbort.add(this._onAbortHandler.bind(this, file));
    file.onProgress.add(this._onProgressHandler.bind(this, file));
    file.isInitialized = true;
  }
  _shouldHandleError(file, e) {
    return (this._isStatusError(e.status) || !file._isProgressStarted) && !file.isAborted;
  }
  _isStatusError(status) {
    return status >= 400 && status < 500 || status >= 500 && status < 600;
  }
  _onUploadStarted(file, e) {
    file.uploadStarted = true;
    this.fileUploader._uploadStartedAction({
      file: file.value,
      event: e,
      request: file.request
    });
  }
  _onAbortHandler(file, e) {
    const args = {
      file: file.value,
      event: e,
      request: file.request,
      message: this.fileUploader._getUploadAbortedStatusMessage()
    };
    this.fileUploader._uploadAbortedAction(args);
    this.fileUploader._setStatusMessage(file, args.message);
    this.fileUploader._handleAllFilesUploaded();
  }
  _onErrorHandler(file, error) {
    const args = {
      file: file.value,
      event: undefined,
      request: file.request,
      error,
      message: this.fileUploader.option('uploadFailedMessage')
    };
    this.fileUploader._uploadErrorAction(args);
    this.fileUploader._setStatusMessage(file, args.message);
    this.fileUploader._handleAllFilesUploaded();
  }
  _onLoadedHandler(file, e) {
    const args = {
      file: file.value,
      event: e,
      request: file.request,
      message: this.fileUploader.option('uploadedMessage')
    };
    file._isLoaded = true;
    this.fileUploader._uploadedAction(args);
    this.fileUploader._setStatusMessage(file, args.message);
    this.fileUploader._handleAllFilesUploaded();
  }
  _onProgressHandler(file, e) {
    if (file) {
      const totalFilesSize = this.fileUploader._getTotalFilesSize();
      const totalLoadedFilesSize = this.fileUploader._getTotalLoadedFilesSize();
      const loadedSize = Math.min(e.loaded, file.value.size);
      const segmentSize = loadedSize - file.loadedSize;
      file.loadedSize = loadedSize;
      this.fileUploader._updateTotalProgress(totalFilesSize, totalLoadedFilesSize + segmentSize);
      this.fileUploader._updateProgressBar(file, this._getLoadedData(loadedSize, e.total, segmentSize, e));
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getLoadedData(loaded, total, currentSegmentSize, event) {
    return {
      loaded,
      total,
      currentSegmentSize
    };
  }
  _extendFormData(formData) {
    const formDataEntries = this.fileUploader.option('uploadCustomData');
    // eslint-disable-next-line no-restricted-syntax
    for (const entryName in formDataEntries) {
      if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
        formData.append(entryName, formDataEntries[entryName]);
      }
    }
  }
}
class ChunksFileUploadStrategyBase extends FileUploadStrategyBase {
  constructor(fileUploader) {
    super(fileUploader);
    this.chunkSize = this.fileUploader.option('chunkSize');
  }
  _uploadCore(file) {
    const realFile = file.value;
    const chunksData = {
      name: realFile.name,
      loadedBytes: 0,
      type: realFile.type,
      blobReader: new FileBlobReader(realFile, this.chunkSize),
      guid: new _guid.default(),
      fileSize: realFile.size,
      count: this._getFileChunksCount(realFile),
      customData: {}
    };
    file.chunksData = chunksData;
    this._sendChunk(file, chunksData);
  }
  _getFileChunksCount(jsFile) {
    return jsFile.size === 0 ? 1 : Math.ceil(jsFile.size / this.chunkSize);
  }
  _sendChunk(file, chunksData) {
    const chunk = chunksData.blobReader.read();
    chunksData.currentChunk = chunk;
    if (chunk) {
      this._sendChunkCore(file, chunksData, chunk).done(() => {
        if (file.isAborted) {
          return;
        }
        chunksData.loadedBytes += chunk.blob.size;
        file.onProgress.fire({
          loaded: chunksData.loadedBytes,
          total: file.value.size
        });
        if (chunk.isCompleted) {
          file.onLoad.fire();
        }
        setTimeout(() => this._sendChunk(file, chunksData));
      }).fail(error => {
        if (this._shouldHandleError(file, error)) {
          this._handleFileError(file, error);
        }
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _sendChunkCore(file, chunksData, chunk) {}
  _tryRaiseStartLoad(file) {
    if (!file.isStartLoad) {
      file.isStartLoad = true;
      file.onLoadStart.fire();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getEvent(e) {
    return null;
  }
  _createUploadArgument(file) {
    return this._createChunksInfo(file.chunksData);
  }
  _createChunksInfo(chunksData) {
    return {
      bytesUploaded: chunksData.loadedBytes,
      chunkCount: chunksData.count,
      customData: chunksData.customData,
      chunkBlob: chunksData.currentChunk.blob,
      chunkIndex: chunksData.currentChunk.index
    };
  }
}
class DefaultChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
  _sendChunkCore(file, chunksData, chunk) {
    return _ajax.default.sendRequest({
      url: this.fileUploader.option('uploadUrl'),
      method: this.fileUploader.option('uploadMethod'),
      headers: this.fileUploader.option('uploadHeaders'),
      beforeSend: xhr => this._beforeSend(xhr, file),
      upload: {
        onprogress: e => this._handleProgress(file, e),
        onloadstart: () => this._tryRaiseStartLoad(file),
        onabort: () => file.onAbort.fire()
      },
      data: this._createFormData({
        fileName: chunksData.name,
        blobName: this.fileUploader.option('name'),
        blob: chunk.blob,
        index: chunk.index,
        count: chunksData.count,
        type: chunksData.type,
        guid: chunksData.guid,
        size: chunksData.fileSize
      })
    });
  }
  _createFormData(options) {
    // @ts-expect-error
    const formData = new window.FormData();
    formData.append(options.blobName, options.blob);
    formData.append(FILEUPLOADER_CHUNK_META_DATA_NAME, JSON.stringify({
      FileName: options.fileName,
      Index: options.index,
      TotalCount: options.count,
      FileSize: options.size,
      FileType: options.type,
      FileGuid: options.guid
    }));
    this._extendFormData(formData);
    return formData;
  }
}
class CustomChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
  _sendChunkCore(file, chunksData) {
    this._tryRaiseStartLoad(file);
    const chunksInfo = this._createChunksInfo(chunksData);
    const uploadChunk = this.fileUploader.option('uploadChunk');
    try {
      const result = uploadChunk(file.value, chunksInfo);
      return (0, _deferred.fromPromise)(result);
    } catch (error) {
      return (0, _deferred.Deferred)().reject(error).promise();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _shouldHandleError(file, error) {
    return true;
  }
}
class WholeFileUploadStrategyBase extends FileUploadStrategyBase {
  _uploadCore(file) {
    file.loadedSize = 0;
    this._uploadFile(file).done(() => {
      if (!file.isAborted) {
        file.onLoad.fire();
      }
    }).fail(error => {
      if (this._shouldHandleError(file, error)) {
        this._handleFileError(file, error);
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _uploadFile(file) {}
  _handleProgressCore(file, e) {
    file.onProgress.fire(e);
  }
  _getLoadedData(loaded, total, segmentSize, event) {
    const result = super._getLoadedData(loaded, total, segmentSize, event);
    // @ts-expect-error
    result.event = event;
    return result;
  }
}
class DefaultWholeFileUploadStrategy extends WholeFileUploadStrategyBase {
  _uploadFile(file) {
    return _ajax.default.sendRequest({
      url: this.fileUploader.option('uploadUrl'),
      method: this.fileUploader.option('uploadMethod'),
      headers: this.fileUploader.option('uploadHeaders'),
      beforeSend: xhr => this._beforeSend(xhr, file),
      upload: {
        onprogress: e => this._handleProgress(file, e),
        onloadstart: () => file.onLoadStart.fire(),
        onabort: () => file.onAbort.fire()
      },
      data: this._createFormData(this.fileUploader.option('name'), file.value)
    });
  }
  _createFormData(fieldName, fieldValue) {
    // @ts-expect-error
    const formData = new window.FormData();
    formData.append(fieldName, fieldValue, fieldValue.name);
    this._extendFormData(formData);
    return formData;
  }
}
class CustomWholeFileUploadStrategy extends WholeFileUploadStrategyBase {
  _uploadFile(file) {
    file.onLoadStart.fire();
    const progressCallback = loadedBytes => {
      const arg = {
        loaded: loadedBytes,
        total: file.value.size
      };
      this._handleProgress(file, arg);
    };
    const uploadFile = this.fileUploader.option('uploadFile');
    try {
      const result = uploadFile(file.value, progressCallback);
      return (0, _deferred.fromPromise)(result);
    } catch (error) {
      return (0, _deferred.Deferred)().reject(error).promise();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _shouldHandleError(file, e) {
    return true;
  }
}
(0, _component_registrator.default)('dxFileUploader', FileUploader);
var _default = exports.default = FileUploader;
