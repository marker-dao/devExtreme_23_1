"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FILEUPLOADER_CLASS = exports.FILEUPLOADER_CANCEL_BUTTON_CLASS = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _progress_bar = _interopRequireDefault(require("../../../ui/progress_bar"));
var _themes = require("../../../ui/themes");
var _m_icon = require("../../core/utils/m_icon");
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _file_upload_strategyChunks = require("../../ui/file_uploader/file_upload_strategy.chunks.custom");
var _file_upload_strategyChunks2 = require("../../ui/file_uploader/file_upload_strategy.chunks.default");
var _file_upload_strategyWhole = require("../../ui/file_uploader/file_upload_strategy.whole.custom");
var _file_upload_strategyWhole2 = require("../../ui/file_uploader/file_upload_strategy.whole.default");
var _file_uploader = require("../../ui/file_uploader/file_uploader.utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const window = (0, _window.getWindow)();
const FILEUPLOADER_CLASS = exports.FILEUPLOADER_CLASS = 'dx-fileuploader';
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
const FILEUPLOADER_FILE_ICON_CLASS = 'dx-fileuploader-file-icon';
const FILEUPLOADER_BUTTON_CLASS = 'dx-fileuploader-button';
const FILEUPLOADER_BUTTON_CONTAINER_CLASS = 'dx-fileuploader-button-container';
const FILEUPLOADER_CANCEL_BUTTON_CLASS = exports.FILEUPLOADER_CANCEL_BUTTON_CLASS = 'dx-fileuploader-cancel-button';
const FILEUPLOADER_UPLOAD_BUTTON_CLASS = 'dx-fileuploader-upload-button';
const FILEUPLOADER_INVALID_CLASS = 'dx-fileuploader-invalid';
const FILEUPLOADER_AFTER_LOAD_DELAY = 400;
const DRAG_EVENT_DELTA = 1;
const GAP = 10;
const REFERENCE_TEXT = '1023 bytes';
const DIALOG_TRIGGER_EVENT_NAMESPACE = 'dxFileUploaderDialogTrigger';
const keyUpEventName = 'keyup';
const nativeClickEvent = 'click';
const ENTER_KEY = 'enter';
const SPACE_KEY = 'space';
let renderFileUploaderInput = () => (0, _renderer.default)('<input>').attr('type', 'file');
// @ts-expect-error: window.FormData may not be typed in all environments
const isFormDataSupported = () => !!window.FormData;
class FileUploader extends _editor.default {
  _supportedKeys() {
    const click = e => {
      e.preventDefault();
      const $selectButton = this._selectButton.$element();
      _events_engine.default.triggerHandler($selectButton, {
        type: 'dxclick'
      });
    };
    return _extends({}, super._supportedKeys(), {
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
    // @ts-expect-error default values = null are not compatible with public types
    return _extends({}, super._getDefaultOptions(), {
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
      onFileValidationError: null,
      onProgress: null,
      onUploadError: null,
      onUploadAborted: null,
      onDropZoneEnter: null,
      onDropZoneLeave: null,
      onCancelButtonClick: null,
      onFileLimitReached: undefined,
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
      _buttonStylingMode: 'contained',
      _hideCancelButtonOnUpload: true,
      _showFileIcon: false,
      _cancelButtonPosition: 'start',
      _maxFileCount: undefined
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
      device: () => (0, _themes.isMaterial)((0, _themes.current)()),
      options: {
        _uploadButtonType: 'default'
      }
    }, {
      device: () => (0, _themes.isFluent)((0, _themes.current)()),
      options: {
        _buttonStylingMode: 'text'
      }
    }]);
  }
  _initOptions(options) {
    const isLabelTextDefined = 'labelText' in options;
    super._initOptions(options);
    if (!isLabelTextDefined && !this._shouldDragOverBeRendered()) {
      this.option({
        labelText: ''
      });
    }
  }
  _init() {
    super._init();
    this._initFileInput();
    this._initLabel();
    this._setUploadStrategy();
    this._createFileLimitReachedAction();
    this._createFiles();
    this._createBeforeSendAction();
    this._createUploadStartedAction();
    this._createUploadedAction();
    this._createFilesUploadedAction();
    this._createFileValidationErrorAction();
    this._createProgressAction();
    this._createUploadErrorAction();
    this._createUploadAbortedAction();
    this._createDropZoneEnterAction();
    this._createDropZoneLeaveAction();
    this._createCancelButtonClickAction();
  }
  _setUploadStrategy() {
    const {
      chunkSize = 0
    } = this.option();
    if (chunkSize > 0) {
      const {
        uploadChunk
      } = this.option();
      this._uploadStrategy = uploadChunk && (0, _type.isFunction)(uploadChunk) ? new _file_upload_strategyChunks.CustomChunksFileUploadStrategy(this) : new _file_upload_strategyChunks2.DefaultChunksFileUploadStrategy(this);
    } else {
      const {
        uploadFile
      } = this.option();
      this._uploadStrategy = uploadFile && (0, _type.isFunction)(uploadFile) ? new _file_upload_strategyWhole.CustomWholeFileUploadStrategy(this) : new _file_upload_strategyWhole2.DefaultWholeFileUploadStrategy(this);
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
      _events_engine.default.on(this._$fileInput, 'change', () => {
        this._inputChangeHandler();
      });
      _events_engine.default.on(this._$fileInput, 'click', e => {
        e.stopPropagation();
        this._resetInputValue();
        const {
          useNativeInputClick
        } = this.option();
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return useNativeInputClick || this._isCustomClickEvent;
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
    // @ts-expect-error dxElementWrapper should be extdened
    this._$fileInput.prop(inputProps);
  }
  _inputChangeHandler() {
    if (this._doPreventInputChange) {
      return;
    }
    // @ts-expect-error dxElementWrapper should be extdened
    const fileName = this._$fileInput.val().replace(/^.*\\/, '');
    // @ts-expect-error dxElementWrapper should be extdened
    const files = this._$fileInput.prop('files');
    const {
      uploadMode
    } = this.option();
    if (files && !files.length && uploadMode !== 'useForm') {
      return;
    }
    if (this._isFileLimitReached(files)) {
      var _this$_fileLimitReach;
      (_this$_fileLimitReach = this._fileLimitReachedAction) === null || _this$_fileLimitReach === void 0 || _this$_fileLimitReach.call(this);
      return;
    }
    // @ts-expect-error dxElementWrapper should be extdened
    const value = files ? this._getFiles(files) : [{
      name: fileName
    }];
    this._changeValue(value);
    if (uploadMode === 'instantly') {
      this._uploadFiles();
    }
  }
  _isFileLimitReached() {
    let files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _maxFileCount,
      value
    } = this.option();
    if (_maxFileCount === undefined) {
      return false;
    }
    const totalCount = files.length + ((value === null || value === void 0 ? void 0 : value.length) ?? 0);
    const isFileLimitReached = totalCount > _maxFileCount;
    return isFileLimitReached;
  }
  _shouldFileListBeExtended() {
    const {
      uploadMode,
      extendSelection,
      multiple
    } = this.option();
    return Boolean(uploadMode !== 'useForm' && extendSelection && multiple);
  }
  _changeValue(value) {
    const {
      value: currentValue
    } = this.option();
    const files = this._shouldFileListBeExtended() ? currentValue === null || currentValue === void 0 ? void 0 : currentValue.slice() : [];
    this.option({
      value: files === null || files === void 0 ? void 0 : files.concat(value)
    });
  }
  _getFiles(fileList) {
    return [...fileList];
  }
  _getFile(fileData) {
    var _this$_files;
    const {
      value
    } = this.option();
    const targetFileValue = (0, _type.isNumeric)(fileData) ? value === null || value === void 0 ? void 0 : value[fileData] : fileData;
    return (_this$_files = this._files) === null || _this$_files === void 0 ? void 0 : _this$_files.filter(file => file.value === targetFileValue)[0];
  }
  _initLabel() {
    if (!this._$inputLabel) {
      this._$inputLabel = (0, _renderer.default)('<div>');
    }
    this._updateInputLabelText();
  }
  _updateInputLabelText() {
    const {
      labelText
    } = this.option();
    const correctedValue = this._isInteractionDisabled() ? '' : labelText;
    this._$inputLabel.text(correctedValue ?? '');
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
    const {
      dropZone
    } = this.option();
    this._preventRecreatingFiles = false;
    this._attachDragEventHandlers(this._$inputWrapper);
    this._attachDragEventHandlers(dropZone);
    this._renderFiles();
    super._render();
  }
  _createFileProgressBar(file) {
    file.progressBar = this._createProgressBar(file.value.size);
    if (file.$file) {
      file.progressBar.$element().appendTo(file.$file);
    }
    this._initStatusMessage(file);
    this._ensureCancelButtonInitialized(file);
  }
  _setStatusMessage(file) {
    let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => {
      const {
        showFileList
      } = this.option();
      if (showFileList) {
        if (file.$statusMessage) {
          var _file$progressBar;
          file.$statusMessage.text(message);
          file.$statusMessage.css('display', '');
          (_file$progressBar = file.progressBar) === null || _file$progressBar === void 0 || _file$progressBar.$element().remove();
        }
      }
    }, FILEUPLOADER_AFTER_LOAD_DELAY);
  }
  _getUploadAbortedStatusMessage() {
    const {
      uploadMode,
      uploadAbortedMessage,
      readyToUploadMessage
    } = this.option();
    return uploadMode === 'instantly' ? uploadAbortedMessage : readyToUploadMessage;
  }
  _createFiles() {
    const {
      value: files
    } = this.option();
    if (this._isFileLimitReached()) {
      var _this$_fileLimitReach2;
      (_this$_fileLimitReach2 = this._fileLimitReachedAction) === null || _this$_fileLimitReach2 === void 0 || _this$_fileLimitReach2.call(this);
    }
    if (this._files && ((files === null || files === void 0 ? void 0 : files.length) === 0 || !this._shouldFileListBeExtended())) {
      this._preventFilesUploading(this._files);
      this._files = null;
    }
    if (!this._files) {
      this._files = [];
    }
    files === null || files === void 0 || files.slice(this._files.length).forEach(value => {
      var _this$_files2;
      const file = this._createFile(value);
      this._validateFile(file);
      (_this$_files2 = this._files) === null || _this$_files2 === void 0 || _this$_files2.push(file);
    });
  }
  _preventFilesUploading(files) {
    files === null || files === void 0 || files.forEach(file => this._uploadStrategy.abortUpload(file));
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
    const {
      maxFileSize = 0
    } = this.option();
    return maxFileSize > 0 ? fileSize <= maxFileSize : true;
  }
  _validateMinFileSize(file) {
    const fileSize = file.value.size;
    const {
      minFileSize = 0
    } = this.option();
    return minFileSize > 0 ? fileSize >= minFileSize : true;
  }
  _isFileExtensionAllowed(file, allowedExtensions) {
    for (let i = 0, n = allowedExtensions.length; i < n; i += 1) {
      let allowedExtension = allowedExtensions[i];
      if (allowedExtension.startsWith('.')) {
        allowedExtension = allowedExtension.replace('.', '\\.');
        if (new RegExp(`${allowedExtension}$`, 'i').exec(file.name)) {
          return true;
        }
      } else {
        allowedExtension = allowedExtension.replace(new RegExp('\\*', 'g'), '');
        if (new RegExp(allowedExtension, 'i').exec(file.type)) {
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
  _createFileValidationErrorAction() {
    this._fileValidationErrorAction = this._createActionByOption('onFileValidationError', {
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
  _createCancelButtonClickAction() {
    this._cancelButtonClickAction = this._createActionByOption('onCancelButtonClick', {
      excludeValidators: ['readOnly']
    });
  }
  _createFileLimitReachedAction() {
    this._fileLimitReachedAction = this._createActionByOption('onFileLimitReached', {
      excludeValidators: ['readOnly']
    });
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
        return Boolean(this.isValidFileExtension) && Boolean(this.isValidMaxSize) && Boolean(this.isValidMinSize);
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
    var _this$_files4, _this$_validationMess;
    const {
      value,
      showFileList
    } = this.option();
    if (!this._$filesContainer) {
      this._$filesContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILES_CONTAINER_CLASS).appendTo(this._$content);
    } else if (!this._shouldFileListBeExtended() || (value === null || value === void 0 ? void 0 : value.length) === 0) {
      this._$filesContainer.empty();
    }
    if (showFileList) {
      var _this$_files3;
      (_this$_files3 = this._files) === null || _this$_files3 === void 0 || _this$_files3.forEach(file => {
        if (!file.$file) {
          this._renderFile(file);
        }
      });
    }
    this.$element().toggleClass(FILEUPLOADER_SHOW_FILE_LIST_CLASS, showFileList);
    this._toggleFileContainerAria(Boolean(showFileList && ((_this$_files4 = this._files) === null || _this$_files4 === void 0 ? void 0 : _this$_files4.length)));
    this._toggleFileUploaderEmptyClassName();
    this._updateFileNameMaxWidth();
    (_this$_validationMess = this._validationMessage) === null || _this$_validationMess === void 0 || _this$_validationMess.repaint();
  }
  _toggleFileContainerAria(applyAria) {
    var _this$_$filesContaine;
    const aria = {
      role: applyAria ? 'list' : null,
      'aria-label': applyAria ? _message.default.format('dxFileUploader-fileListLabel') : null
    };
    // @ts-expect-error attr type should be extended
    (_this$_$filesContaine = this._$filesContainer) === null || _this$_$filesContaine === void 0 || _this$_$filesContaine.attr(aria);
  }
  _renderFile(file) {
    const {
      value
    } = file;
    if (!this._$filesContainer) {
      return;
    }
    const $fileContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_CONTAINER_CLASS).appendTo(this._$filesContainer).attr('role', 'listitem');
    this._renderFileIcon(value.name, $fileContainer);
    file.$file = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_CLASS).appendTo($fileContainer);
    const $fileInfo = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_INFO_CLASS).appendTo(file.$file);
    file.$statusMessage = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).appendTo(file.$file);
    (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_NAME_CLASS).text(value.name).appendTo($fileInfo);
    if ((0, _type.isDefined)(value.size)) {
      (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_SIZE_CLASS).text((0, _file_uploader.getFileSize)(value.size)).appendTo($fileInfo);
    }
    this._renderFileButtons(file, $fileContainer);
    if (file.isValid()) {
      const {
        readyToUploadMessage
      } = this.option();
      file.$statusMessage.text(readyToUploadMessage ?? '');
    } else {
      var _this$_fileValidation;
      if (!file.isValidFileExtension) {
        file.$statusMessage.append(this._createValidationElement('invalidFileExtensionMessage'));
      }
      if (!file.isValidMaxSize) {
        file.$statusMessage.append(this._createValidationElement('invalidMaxFileSizeMessage'));
      }
      if (!file.isValidMinSize) {
        file.$statusMessage.append(this._createValidationElement('invalidMinFileSizeMessage'));
      }
      (_this$_fileValidation = this._fileValidationErrorAction) === null || _this$_fileValidation === void 0 || _this$_fileValidation.call(this, {
        file: file.value
      });
      $fileContainer.addClass(FILEUPLOADER_INVALID_CLASS);
    }
  }
  _createValidationElement(key) {
    return (0, _renderer.default)('<span>').text(this.option()[key]);
  }
  _updateFileNameMaxWidth() {
    var _this$_$filesContaine2, _this$_$filesContaine3, _this$_$filesContaine4, _this$_$filesContaine5, _this$_$filesContaine6;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      allowCanceling,
      uploadMode,
      _showFileIcon
    } = this.option();
    const cancelButtonsCount = allowCanceling && uploadMode !== 'useForm' ? 1 : 0;
    const uploadButtonsCount = uploadMode === 'useButtons' ? 1 : 0;
    const filesContainerWidth = (0, _size.getWidth)((_this$_$filesContaine2 = this._$filesContainer) === null || _this$_$filesContaine2 === void 0 ? void 0 : _this$_$filesContaine2.find(`.${FILEUPLOADER_FILE_CONTAINER_CLASS}`).first()) || (0, _size.getWidth)(this._$filesContainer);
    const $buttonContainer = (_this$_$filesContaine3 = this._$filesContainer) === null || _this$_$filesContaine3 === void 0 ? void 0 : _this$_$filesContaine3.find(`.${FILEUPLOADER_BUTTON_CONTAINER_CLASS}`).eq(0);
    const buttonsWidth = (0, _size.getWidth)($buttonContainer) * (cancelButtonsCount + uploadButtonsCount);
    const $fileSize = (_this$_$filesContaine4 = this._$filesContainer) === null || _this$_$filesContaine4 === void 0 ? void 0 : _this$_$filesContaine4.find(`.${FILEUPLOADER_FILE_SIZE_CLASS}`).eq(0);
    const $icon = (_this$_$filesContaine5 = this._$filesContainer) === null || _this$_$filesContaine5 === void 0 ? void 0 : _this$_$filesContaine5.find(`.${FILEUPLOADER_FILE_ICON_CLASS}`).eq(0);
    const iconWidth = _showFileIcon ? (0, _size.getOuterWidth)($icon) : 0;
    const prevFileSize = $fileSize === null || $fileSize === void 0 ? void 0 : $fileSize.text();
    $fileSize === null || $fileSize === void 0 || $fileSize.text(REFERENCE_TEXT);
    const fileSizeWidth = (0, _size.getWidth)($fileSize);
    $fileSize === null || $fileSize === void 0 || $fileSize.text(prevFileSize ?? '');
    const maxWidth = filesContainerWidth - buttonsWidth - fileSizeWidth - iconWidth - GAP;
    (_this$_$filesContaine6 = this._$filesContainer) === null || _this$_$filesContaine6 === void 0 || _this$_$filesContaine6.find(`.${FILEUPLOADER_FILE_NAME_CLASS}`).css('maxWidth', maxWidth);
  }
  _renderFileButtons(file, $container) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _cancelButtonPosition
    } = this.option();
    const $uploadButton = this._getUploadButton(file);
    if ($uploadButton) {
      $container.prepend($uploadButton);
    }
    const $cancelButton = this._getCancelButton(file);
    if ($cancelButton) {
      if (_cancelButtonPosition === 'end') {
        $container.append($cancelButton);
        return;
      }
      $container.prepend($cancelButton);
    }
  }
  _renderFileIcon(fileName, $container) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _showFileIcon
    } = this.option();
    if (!_showFileIcon) {
      return;
    }
    (0, _renderer.default)('<div>').addClass(`${FILEUPLOADER_FILE_ICON_CLASS} ${_m_icon.ICON_CLASS} ${_m_icon.ICON_CLASS}-${(0, _file_uploader.getFileIconName)(fileName)}`).appendTo($container);
  }
  _getCancelButton(file) {
    var _file$value;
    const {
      uploadMode
    } = this.option();
    if (uploadMode === 'useForm') {
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
      onClick: () => {
        var _this$_cancelButtonCl;
        this._removeFile(file);
        (_this$_cancelButtonCl = this._cancelButtonClickAction) === null || _this$_cancelButtonCl === void 0 || _this$_cancelButtonCl.call(this, {
          file: file.value
        });
      },
      icon: 'close',
      visible: allowCanceling,
      disabled: readOnly,
      integrationOptions: {},
      hoverStateEnabled,
      stylingMode: _buttonStylingMode,
      elementAttr: {
        // @ts-expect-error format params should be extended
        'aria-label': _message.default.format('dxFileUploader-removeFileButtonLabel', (file === null || file === void 0 || (_file$value = file.value) === null || _file$value === void 0 ? void 0 : _file$value.name) ?? '')
      }
    });
    return (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.cancelButton.$element());
  }
  _getUploadButton(file) {
    var _file$value2;
    const {
      uploadMode
    } = this.option();
    if (!file.isValid() || uploadMode !== 'useButtons') {
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
      stylingMode: _buttonStylingMode,
      elementAttr: {
        // @ts-expect-error format params should be extended
        'aria-label': _message.default.format('dxFileUploader-uploadFileButtonLabel', (file === null || file === void 0 || (_file$value2 = file.value) === null || _file$value2 === void 0 ? void 0 : _file$value2.name) ?? '')
      }
    });
    file.onLoadStart.add(() => {
      var _file$uploadButton;
      (_file$uploadButton = file.uploadButton) === null || _file$uploadButton === void 0 || _file$uploadButton.option({
        visible: false,
        disabled: true
      });
    });
    file.onAbort.add(() => {
      var _file$uploadButton2;
      (_file$uploadButton2 = file.uploadButton) === null || _file$uploadButton2 === void 0 || _file$uploadButton2.option({
        visible: true,
        disabled: false
      });
    });
    return (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.uploadButton.$element());
  }
  _removeFile(file) {
    var _file$$file, _this$_files5, _this$_files6;
    (_file$$file = file.$file) === null || _file$$file === void 0 || _file$$file.parent().remove();
    (_this$_files5 = this._files) === null || _this$_files5 === void 0 || _this$_files5.splice(this._files.indexOf(file), 1);
    const {
      value
    } = this.option();
    const valueCopy = value === null || value === void 0 ? void 0 : value.slice();
    valueCopy === null || valueCopy === void 0 || valueCopy.splice(valueCopy.indexOf(file.value), 1);
    this._preventRecreatingFiles = true;
    this.option({
      value: valueCopy
    });
    this._preventRecreatingFiles = false;
    if (((_this$_files6 = this._files) === null || _this$_files6 === void 0 ? void 0 : _this$_files6.length) === 0) {
      this._toggleFileContainerAria(false);
    }
    this._toggleFileUploaderEmptyClassName();
    this._resetInputValue(true);
  }
  removeFile(fileData) {
    const {
      uploadMode
    } = this.option();
    if (uploadMode === 'useForm' || !(0, _type.isDefined)(fileData)) {
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
    var _this$_files7;
    this.$element().toggleClass(FILEUPLOADER_EMPTY_CLASS, !((_this$_files7 = this._files) !== null && _this$_files7 !== void 0 && _this$_files7.length) || this._hasInvalidFile(this._files));
  }
  _hasInvalidFile(files) {
    return files.some(file => !file.isValid());
  }
  _renderSelectButton() {
    const $button = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS).appendTo(this._$inputWrapper);
    const {
      selectButtonText,
      readOnly,
      hoverStateEnabled
    } = this.option();
    this._selectButton = this._createComponent($button, _button.default, {
      text: selectButtonText,
      focusStateEnabled: false,
      // @ts-expect-error extend dxButtonOptions type
      integrationOptions: {},
      disabled: readOnly,
      hoverStateEnabled
    });
    // NOTE: click triggering on input 'file' works correctly only in
    // native click handler when device is used
    if (_devices.default.real().deviceType === 'desktop') {
      this._selectButton.option({
        onClick: () => this._selectFileDialogClickHandler()
      });
    } else {
      this._attachSelectFileDialogHandlers(this._selectButton.$element());
    }
    const {
      dialogTrigger
    } = this.option();
    this._attachSelectFileDialogHandlers(dialogTrigger);
  }
  _selectFileDialogClickHandler() {
    const {
      useNativeInputClick
    } = this.option();
    if (useNativeInputClick || this._isInteractionDisabled()) {
      return;
    }
    this._isCustomClickEvent = true;
    // @ts-expect-error update events_engine interface to support trigger method
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
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      uploadButtonText,
      _uploadButtonType,
      hoverStateEnabled,
      uploadMode
    } = this.option();
    if (uploadMode !== 'useButtons') {
      return;
    }
    const $uploadButton = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS).addClass(FILEUPLOADER_UPLOAD_BUTTON_CLASS).appendTo(this._$content);
    this._uploadButton = this._createComponent($uploadButton, _button.default, {
      text: uploadButtonText,
      onClick: this._uploadButtonClickHandler.bind(this),
      type: _uploadButtonType,
      // @ts-expect-error extend dxButtonOptions type
      integrationOptions: {},
      hoverStateEnabled
    });
  }
  _uploadButtonClickHandler() {
    this._uploadFiles();
  }
  _shouldDragOverBeRendered() {
    const {
      readOnly,
      uploadMode,
      nativeDropSupported
    } = this.option();
    return !readOnly && (uploadMode !== 'useForm' || nativeDropSupported);
  }
  _isInteractionDisabled() {
    const {
      readOnly,
      disabled
    } = this.option();
    return Boolean(readOnly) || Boolean(disabled);
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
    const {
      useNativeInputClick,
      inputAttr
    } = this.option();
    if (useNativeInputClick) {
      this._selectButton.option({
        template: this._selectButtonInputTemplate.bind(this)
      });
    } else {
      // @ts-expect-error dxElementWrapper should be extdened
      this._$fileInput.appendTo(this._$inputContainer);
      this._selectButton.option({
        template: 'content'
      });
    }
    this._applyInputAttributes(inputAttr);
  }
  _selectButtonInputTemplate(data, content) {
    const $content = (0, _renderer.default)(content);
    const $text = (0, _renderer.default)('<span>').addClass('dx-button-text').text(data.text);
    $content.append($text).append(this._$fileInput);
    return $content;
  }
  _renderInputWrapper() {
    if (!this._$content) {
      return;
    }
    this._$inputWrapper = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_INPUT_WRAPPER_CLASS).appendTo(this._$content);
  }
  _detachDragEventHandlers(target) {
    if (!target) {
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
    _events_engine.default.on((0, _renderer.default)(target), (0, _index.addNamespace)('dragenter', this.NAME), this._dragEnterHandler.bind(this, isCustomTarget));
    _events_engine.default.on((0, _renderer.default)(target), (0, _index.addNamespace)('dragover', this.NAME), this._dragOverHandler.bind(this, isCustomTarget));
    _events_engine.default.on((0, _renderer.default)(target), (0, _index.addNamespace)('dragleave', this.NAME), this._dragLeaveHandler.bind(this, isCustomTarget));
    _events_engine.default.on((0, _renderer.default)(target), (0, _index.addNamespace)('drop', this.NAME), this._dropHandler.bind(this, isCustomTarget));
  }
  _applyInputAttributes(customAttributes) {
    // @ts-expect-error dxElementWrapper should be extdened
    this._$fileInput.attr(customAttributes);
  }
  _useInputForDrop() {
    const {
      uploadMode,
      nativeDropSupported
    } = this.option();
    return Boolean(nativeDropSupported) && uploadMode === 'useForm';
  }
  _getDropZoneElement(isCustomTarget, e) {
    if (!e.currentTarget) {
      return undefined;
    }
    const {
      dropZone
    } = this.option();
    const targetList = isCustomTarget ? (0, _renderer.default)(dropZone).toArray() : [this._$inputWrapper];
    const targetListElements = targetList.map(element => (0, _renderer.default)(element).get(0));
    const currentTargetIndex = targetListElements.indexOf(e.currentTarget);
    return targetListElements[currentTargetIndex];
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type, consistent-return
  _dragEnterHandler(isCustomTarget, e) {
    const {
      disabled
    } = this.option();
    if (disabled) {
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
    var _this$mouseAction;
    const classAction = active ? 'addClass' : 'removeClass';
    const mouseAction = active ? '_dropZoneEnterAction' : '_dropZoneLeaveAction';
    (_this$mouseAction = this[mouseAction]) === null || _this$mouseAction === void 0 || _this$mouseAction.call(this, {
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
    const {
      multiple,
      uploadMode
    } = this.option();
    if (!multiple && files.length > 1 || files.length === 0) {
      return;
    }
    if (this._isFileLimitReached(files)) {
      var _this$_fileLimitReach3;
      (_this$_fileLimitReach3 = this._fileLimitReachedAction) === null || _this$_fileLimitReach3 === void 0 || _this$_fileLimitReach3.call(this);
      return;
    }
    this._changeValue(files);
    if (uploadMode === 'instantly') {
      this._uploadFiles();
    }
  }
  _areAllFilesLoaded() {
    var _this$_files8;
    return (_this$_files8 = this._files) === null || _this$_files8 === void 0 ? void 0 : _this$_files8.every(
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    file => !file.isValid() || file._isError || file._isLoaded || file.isAborted);
  }
  _handleAllFilesUploaded() {
    this._recalculateProgress();
    if (this._areAllFilesLoaded()) {
      var _this$_filesUploadedA;
      (_this$_filesUploadedA = this._filesUploadedAction) === null || _this$_filesUploadedA === void 0 || _this$_filesUploadedA.call(this);
    }
  }
  _renderWrapper() {
    const $wrapper = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_WRAPPER_CLASS).appendTo(this.$element());
    const $container = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_CONTAINER_CLASS).appendTo($wrapper);
    this._$content = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_CONTENT_CLASS).appendTo($container);
  }
  _clean() {
    this._$fileInput.detach();
    this._$filesContainer = null;
    const {
      dialogTrigger,
      dropZone
    } = this.option();
    this._detachSelectFileDialogHandlers(dialogTrigger);
    this._detachDragEventHandlers(dropZone);
    if (this._files) {
      this._files.forEach(file => {
        file.$file = null;
        file.$statusMessage = null;
      });
    }
    super._clean();
  }
  abortUpload(fileData) {
    const {
      uploadMode
    } = this.option();
    if (uploadMode === 'useForm') {
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
    const {
      uploadMode
    } = this.option();
    if (uploadMode === 'useForm') {
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
      var _this$_files9;
      (_this$_files9 = this._files) === null || _this$_files9 === void 0 || _this$_files9.forEach(file => this._uploadFile(file));
    }
  }
  _uploadFile(file) {
    this._uploadStrategy.upload(file);
  }
  _updateProgressBar(file, loadedFileData) {
    var _file$progressBar2, _this$_progressAction;
    (_file$progressBar2 = file.progressBar) === null || _file$progressBar2 === void 0 || _file$progressBar2.option({
      value: loadedFileData.loaded,
      showStatus: true
    });
    (_this$_progressAction = this._progressAction) === null || _this$_progressAction === void 0 || _this$_progressAction.call(this, {
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
      if (this._files && this._files.length > 0 && this._areAllFilesLoaded() && totalFilesSize === 0 && totalLoadedFilesSize === 0) {
        progress = this._getProgressValue(1);
      } else if (totalFilesSize) {
        progress = this._getProgressValue(totalLoadedFilesSize / totalFilesSize);
      }
    }
    this.option({
      progress
    });
    this._setLoadedSize(totalLoadedFilesSize);
  }
  _getProgressValue(ratio) {
    return Math.floor(ratio * 100);
  }
  _initStatusMessage(file) {
    var _file$$statusMessage;
    (_file$$statusMessage = file.$statusMessage) === null || _file$$statusMessage === void 0 || _file$$statusMessage.css('display', 'none');
  }
  _ensureCancelButtonInitialized(file) {
    var _file$cancelButton;
    if (file.isInitialized) {
      return;
    }
    (_file$cancelButton = file.cancelButton) === null || _file$cancelButton === void 0 || _file$cancelButton.option({
      onClick: () => {
        var _this$_cancelButtonCl2;
        this._preventFilesUploading([file]);
        this._removeFile(file);
        (_this$_cancelButtonCl2 = this._cancelButtonClickAction) === null || _this$_cancelButtonCl2 === void 0 || _this$_cancelButtonCl2.call(this, {
          file: file.value
        });
      }
    });
    const hideCancelButton = () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const {
        _hideCancelButtonOnUpload
      } = this.option();
      if (!_hideCancelButtonOnUpload) {
        return;
      }
      // eslint-disable-next-line no-restricted-globals
      setTimeout(() => {
        var _file$cancelButton2;
        (_file$cancelButton2 = file.cancelButton) === null || _file$cancelButton2 === void 0 || _file$cancelButton2.option({
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
      var _this$_files10;
      this._totalFilesSize = 0;
      (_this$_files10 = this._files) === null || _this$_files10 === void 0 || _this$_files10.forEach(file => {
        this._totalFilesSize += file.value.size;
      });
    }
    return this._totalFilesSize;
  }
  _getTotalLoadedFilesSize() {
    if (!this._totalLoadedFilesSize) {
      var _this$_files11;
      this._totalLoadedFilesSize = 0;
      (_this$_files11 = this._files) === null || _this$_files11 === void 0 || _this$_files11.forEach(file => {
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
    return touchPoint ? touchPoint[0].pageX : 0;
  }
  _getTouchEventY(e) {
    let touchPoint = null;
    if (e.changedTouches.length > 0) {
      touchPoint = e.changedTouches;
    } else if (e.targetTouches.length > 0) {
      touchPoint = e.targetTouches;
    }
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
    var _this$_files12;
    const {
      readOnly
    } = this.option();
    this._selectButton.option({
      disabled: readOnly
    });
    (_this$_files12 = this._files) === null || _this$_files12 === void 0 || _this$_files12.forEach(file => {
      var _file$cancelButton3;
      return (_file$cancelButton3 = file.cancelButton) === null || _file$cancelButton3 === void 0 ? void 0 : _file$cancelButton3.option({
        disabled: readOnly
      });
    });
    this._updateInputLabelText();
    this._attachDragEventHandlers(this._$inputWrapper);
  }
  _updateHoverState() {
    var _this$_selectButton, _this$_uploadButton, _this$_files13;
    const {
      hoverStateEnabled: value
    } = this.option();
    (_this$_selectButton = this._selectButton) === null || _this$_selectButton === void 0 || _this$_selectButton.option({
      hoverStateEnabled: value
    });
    (_this$_uploadButton = this._uploadButton) === null || _this$_uploadButton === void 0 || _this$_uploadButton.option({
      hoverStateEnabled: value
    });
    (_this$_files13 = this._files) === null || _this$_files13 === void 0 || _this$_files13.forEach(file => {
      var _file$uploadButton3, _file$cancelButton4;
      (_file$uploadButton3 = file.uploadButton) === null || _file$uploadButton3 === void 0 || _file$uploadButton3.option({
        hoverStateEnabled: value
      });
      (_file$cancelButton4 = file.cancelButton) === null || _file$cancelButton4 === void 0 || _file$cancelButton4.option({
        hoverStateEnabled: value
      });
    });
  }
  _optionChanged(args) {
    var _this$_files14;
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
        if (!(value !== null && value !== void 0 && value.length)) {
          this._$fileInput.val('');
        }
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
        this._selectButton.option({
          text: value
        });
        break;
      case 'uploadButtonText':
        if (this._uploadButton) {
          this._uploadButton.option({
            text: value
          });
        }
        break;
      case '_uploadButtonType':
        if (this._uploadButton) {
          this._uploadButton.option({
            type: value
          });
        }
        break;
      case '_buttonStylingMode':
        (_this$_files14 = this._files) === null || _this$_files14 === void 0 || _this$_files14.forEach(file => {
          var _file$uploadButton4, _file$cancelButton5;
          (_file$uploadButton4 = file.uploadButton) === null || _file$uploadButton4 === void 0 || _file$uploadButton4.option({
            stylingMode: value
          });
          (_file$cancelButton5 = file.cancelButton) === null || _file$cancelButton5 === void 0 || _file$cancelButton5.option({
            stylingMode: value
          });
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
      case '_hideCancelButtonOnUpload':
      case '_cancelButtonPosition':
      case '_showFileIcon':
        this._invalidate();
        break;
      case '_maxFileCount':
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
      case 'onFileValidationError':
        this._createFileValidationErrorAction();
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
      case 'onCancelButtonClick':
        this._createCancelButtonClickAction();
        break;
      case 'onFileLimitReached':
        this._createFileLimitReachedAction();
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
        this._applyInputAttributes(this.option()[name]);
        break;
      case 'hint':
        this._initFileInput();
        super._optionChanged(args);
        break;
      case 'visible':
        super._optionChanged(args);
        this._updateFileNameMaxWidth();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetInputValue(force) {
    const {
      uploadMode
    } = this.option();
    if (uploadMode === 'useForm' && !force) {
      return;
    }
    this._doPreventInputChange = true;
    this._$fileInput.val('');
    this._doPreventInputChange = false;
  }
  clear() {
    this.option({
      value: []
    });
  }
}
/// #DEBUG
FileUploader.__internals = {
  changeFileInputRenderer(renderer) {
    renderFileUploaderInput = renderer;
  },
  resetFileInputTag() {
    renderFileUploaderInput = () => (0, _renderer.default)('<input>').attr('type', 'file');
  }
};
/// #ENDDEBUG
(0, _component_registrator.default)('dxFileUploader', FileUploader);
var _default = exports.default = FileUploader;