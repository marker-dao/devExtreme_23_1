/**
* DevExtreme (cjs/__internal/ui/file_manager/ui.file_manager.file_uploader.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _size = require("../../../core/utils/size");
var _window = require("../../../core/utils/window");
var _file_uploader = _interopRequireDefault(require("../../../ui/file_uploader"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _uiFile_manager = require("../../ui/file_manager/ui.file_manager.common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const FILE_MANAGER_FILE_UPLOADER_CLASS = 'dx-filemanager-fileuploader';
const FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLDER_CLASS = 'dx-filemanager-fileuploader-dropzone-placeholder';
class FileManagerFileUploader extends _widget.default {
  _initMarkup() {
    this._initActions();
    this.$element().addClass(FILE_MANAGER_FILE_UPLOADER_CLASS);
    this._uploaderInfos = [];
    this._createInternalFileUploader();
    this._createDropZonePlaceholder();
    this._setDropZonePlaceholderVisible(false);
    super._initMarkup();
  }
  _createInternalFileUploader() {
    const {
      chunkSize
    } = this._getController();
    const $fileUploader = (0, _renderer.default)('<div>').appendTo(this.$element());
    const fileUploader = this._createComponent($fileUploader, _file_uploader.default, {
      name: 'file',
      multiple: true,
      showFileList: false,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      labelText: '',
      readyToUploadMessage: '',
      accept: '*',
      chunkSize,
      dropZone: this.option('dropZone'),
      onValueChanged: e => this._onFileUploaderValueChanged(e),
      onProgress: e => this._onFileUploaderProgress(e),
      onUploaded: e => this._onFileUploaderUploaded(e),
      onFilesUploaded: e => this._onFileUploaderAllFilesUploaded(e),
      onUploadAborted: e => this._onFileUploaderUploadAborted(e),
      onUploadError: e => this._onFileUploaderUploadError(e),
      onDropZoneEnter: () => this._setDropZonePlaceholderVisible(true),
      onDropZoneLeave: () => this._setDropZonePlaceholderVisible(false)
    });
    fileUploader.option({
      uploadChunk: (file, chunksData) => this._fileUploaderUploadChunk(fileUploader, file, chunksData),
      abortUpload: (file, chunksData) => this._fileUploaderAbortUpload(fileUploader, file, chunksData)
    });
    // @ts-expect-error ts-error
    fileUploader._shouldRaiseDragLeaveBase = fileUploader._shouldRaiseDragLeave;
    // @ts-expect-error ts-error
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/explicit-function-return-type
    fileUploader._shouldRaiseDragLeave = e => this._shouldRaiseDragLeave(e, fileUploader);
    const uploaderInfo = {
      fileUploader
    };
    this._uploaderInfos.push(uploaderInfo);
  }
  tryUpload() {
    const info = this._findAndUpdateAvailableUploaderInfo();
    if (info) {
      info.fileUploader._selectFileDialogClickHandler();
    }
  }
  cancelUpload(sessionId) {
    this._cancelUpload(sessionId);
  }
  cancelFileUpload(sessionId, fileIndex) {
    this._cancelUpload(sessionId, fileIndex);
  }
  _cancelUpload(sessionId, fileIndex) {
    const {
      fileUploader
    } = this._findUploaderInfoBySessionId(sessionId);
    fileUploader.abortUpload(fileIndex);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _fileUploaderUploadChunk(fileUploader, file, chunksInfo) {
    const {
      session,
      fileIndex
    } = this._findSessionByFile(fileUploader, file);
    const {
      controller
    } = session;
    chunksInfo.fileIndex = fileIndex;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return controller.uploadFileChunk(file, chunksInfo);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _fileUploaderAbortUpload(fileUploader, file, chunksInfo) {
    const {
      session,
      fileIndex
    } = this._findSessionByFile(fileUploader, file);
    const {
      controller
    } = session;
    chunksInfo.fileIndex = fileIndex;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return controller.abortFileUpload(file, chunksInfo);
  }
  _onFileUploaderValueChanged(_ref) {
    let {
      component,
      value
    } = _ref;
    if (value.length === 0) {
      return;
    }
    const files = value.slice();
    const uploaderInfo = this._findUploaderInfo(component);
    this._uploadFiles(uploaderInfo, files);
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => {
      if (!this._findAndUpdateAvailableUploaderInfo()) {
        this._createInternalFileUploader();
      }
    });
  }
  _onFileUploaderProgress(_ref2) {
    let {
      component,
      file,
      bytesLoaded,
      bytesTotal
    } = _ref2;
    const {
      session,
      fileIndex
    } = this._findSessionByFile(component, file);
    const fileValue = bytesTotal !== 0 ? bytesLoaded / bytesTotal : 1;
    const commonValue = component.option('progress') / 100;
    const args = {
      sessionId: session.id,
      fileIndex,
      commonValue,
      fileValue
    };
    this._raiseUploadProgress(args);
  }
  _onFileUploaderAllFilesUploaded(_ref3) {
    let {
      component
    } = _ref3;
    const {
      session
    } = this._findSessionByFile(component, component._files[0].value);
    this._raiseUploadFinished({
      sessionId: session.id,
      commonValue: component.option('progress') / 100
    });
  }
  _onFileUploaderUploaded(_ref4) {
    let {
      component,
      file
    } = _ref4;
    const deferred = this._getDeferredForFile(component, file);
    deferred.resolve();
  }
  _onFileUploaderUploadAborted(_ref5) {
    let {
      component,
      file
    } = _ref5;
    const deferred = this._getDeferredForFile(component, file);
    deferred.resolve({
      canceled: true
    });
  }
  _onFileUploaderUploadError(_ref6) {
    let {
      component,
      file,
      error
    } = _ref6;
    const deferred = this._getDeferredForFile(component, file);
    deferred.reject(error);
  }
  _createDropZonePlaceholder() {
    const {
      dropZonePlaceholderContainer
    } = this.option();
    this._$dropZonePlaceholder = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLDER_CLASS).appendTo((0, _renderer.default)(dropZonePlaceholderContainer));
  }
  _adjustDropZonePlaceholder() {
    var _this$_$dropZonePlace, _this$_$dropZonePlace2, _this$_$dropZonePlace3;
    const {
      dropZone
    } = this.option();
    const $dropZoneTarget = dropZone;
    if (!(0, _window.hasWindow)() || ($dropZoneTarget === null || $dropZoneTarget === void 0 ? void 0 : $dropZoneTarget.length) === 0) {
      return;
    }
    const placeholderBorderTopWidth = parseFloat(((_this$_$dropZonePlace = this._$dropZonePlaceholder) === null || _this$_$dropZonePlace === void 0 ? void 0 : _this$_$dropZonePlace.css('borderTopWidth')) ?? '');
    const placeholderBorderLeftWidth = parseFloat(((_this$_$dropZonePlace2 = this._$dropZonePlaceholder) === null || _this$_$dropZonePlace2 === void 0 ? void 0 : _this$_$dropZonePlace2.css('borderLeftWidth')) ?? '');
    const {
      dropZonePlaceholderContainer
    } = this.option();
    const $placeholderContainer = dropZonePlaceholderContainer;
    const containerBorderBottomWidth = parseFloat(($placeholderContainer === null || $placeholderContainer === void 0 ? void 0 : $placeholderContainer.css('borderBottomWidth')) ?? '');
    const containerBorderLeftWidth = parseFloat(($placeholderContainer === null || $placeholderContainer === void 0 ? void 0 : $placeholderContainer.css('borderLeftWidth')) ?? '');
    const containerHeight = (0, _size.getInnerHeight)($placeholderContainer);
    const containerOffset = $placeholderContainer === null || $placeholderContainer === void 0 ? void 0 : $placeholderContainer.offset();
    const dropZoneOffset = $dropZoneTarget === null || $dropZoneTarget === void 0 ? void 0 : $dropZoneTarget.offset();
    (_this$_$dropZonePlace3 = this._$dropZonePlaceholder) === null || _this$_$dropZonePlace3 === void 0 || _this$_$dropZonePlace3.css({
      top:
      // @ts-expect-error
      // eslint-disable-next-line no-unsafe-optional-chaining
      (dropZoneOffset === null || dropZoneOffset === void 0 ? void 0 : dropZoneOffset.top // @ts-expect-error
      // eslint-disable-next-line no-unsafe-optional-chaining
      ) - (containerOffset === null || containerOffset === void 0 ? void 0 : containerOffset.top) - containerHeight - containerBorderBottomWidth,
      left:
      // @ts-expect-error
      // eslint-disable-next-line no-unsafe-optional-chaining
      (dropZoneOffset === null || dropZoneOffset === void 0 ? void 0 : dropZoneOffset.left) - (containerOffset === null || containerOffset === void 0 ? void 0 : containerOffset.left) - containerBorderLeftWidth
    });
    (0, _size.setHeight)(this._$dropZonePlaceholder,
    // @ts-expect-error
    // eslint-disable-next-line no-unsafe-optional-chaining
    ($dropZoneTarget === null || $dropZoneTarget === void 0 ? void 0 : $dropZoneTarget.get(0).offsetHeight) - placeholderBorderTopWidth * 2);
    (0, _size.setWidth)(this._$dropZonePlaceholder,
    // @ts-expect-error
    // eslint-disable-next-line no-unsafe-optional-chaining
    ($dropZoneTarget === null || $dropZoneTarget === void 0 ? void 0 : $dropZoneTarget.get(0).offsetWidth) - placeholderBorderLeftWidth * 2);
  }
  _setDropZonePlaceholderVisible(visible) {
    if (visible) {
      var _this$_$dropZonePlace4;
      this._adjustDropZonePlaceholder();
      (_this$_$dropZonePlace4 = this._$dropZonePlaceholder) === null || _this$_$dropZonePlace4 === void 0 || _this$_$dropZonePlace4.css('display', '');
    } else {
      var _this$_$dropZonePlace5;
      (_this$_$dropZonePlace5 = this._$dropZonePlaceholder) === null || _this$_$dropZonePlace5 === void 0 || _this$_$dropZonePlace5.css('display', 'none');
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _shouldRaiseDragLeave(e, uploaderInstance) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return uploaderInstance.isMouseOverElement(e, this.option('splitterElement')) || uploaderInstance._shouldRaiseDragLeaveBase(e, true);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _uploadFiles(uploaderInfo, files) {
    this._setDropZonePlaceholderVisible(false);
    const sessionId = new _guid.default().toString();
    const controller = this._getController();
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const deferreds = files.map(() => new _deferred.Deferred());
    uploaderInfo.session = {
      id: sessionId,
      controller,
      files,
      deferreds
    };
    const sessionInfo = {
      sessionId,
      deferreds,
      files
    };
    this._raiseUploadSessionStarted(sessionInfo);
    // eslint-disable-next-line no-restricted-globals
    return (0, _uiFile_manager.whenSome)(deferreds).always(() => setTimeout(() => {
      uploaderInfo.fileUploader.clear();
      uploaderInfo.session = null;
    }));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDeferredForFile(fileUploader, file) {
    const {
      session,
      fileIndex
    } = this._findSessionByFile(fileUploader, file);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return session.deferreds[fileIndex];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _findSessionByFile(fileUploader, file) {
    const uploaderInfo = this._findUploaderInfo(fileUploader);
    const {
      session
    } = uploaderInfo;
    const fileIndex = session.files.indexOf(file);
    return {
      session,
      fileIndex
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _findUploaderInfoBySessionId(sessionId) {
    for (let i = 0; i < ((_this$_uploaderInfos = this._uploaderInfos) === null || _this$_uploaderInfos === void 0 ? void 0 : _this$_uploaderInfos.length); i += 1) {
      var _this$_uploaderInfos;
      const uploaderInfo = this._uploaderInfos[i];
      const {
        session
      } = uploaderInfo;
      if (session && session.id === sessionId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return uploaderInfo;
      }
    }
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _findAndUpdateAvailableUploaderInfo() {
    var _info;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let info = null;
    for (let i = 0; i < ((_this$_uploaderInfos2 = this._uploaderInfos) === null || _this$_uploaderInfos2 === void 0 ? void 0 : _this$_uploaderInfos2.length); i += 1) {
      var _this$_uploaderInfos2;
      const currentInfo = this._uploaderInfos[i];
      currentInfo.fileUploader.option('dropZone', '');
      if (!info && !currentInfo.session) {
        info = currentInfo;
      }
    }
    const {
      dropZone
    } = this.option();
    (_info = info) === null || _info === void 0 || _info.fileUploader.option('dropZone', dropZone);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return info;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _findUploaderInfo(fileUploader) {
    for (let i = 0; i < ((_this$_uploaderInfos3 = this._uploaderInfos) === null || _this$_uploaderInfos3 === void 0 ? void 0 : _this$_uploaderInfos3.length); i += 1) {
      var _this$_uploaderInfos3;
      const info = this._uploaderInfos[i];
      if (info.fileUploader === fileUploader) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return info;
      }
    }
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getController() {
    const {
      getController: controllerGetter
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return controllerGetter === null || controllerGetter === void 0 ? void 0 : controllerGetter();
  }
  _raiseUploadSessionStarted(sessionInfo) {
    var _this$_actions$onUplo, _this$_actions;
    (_this$_actions$onUplo = (_this$_actions = this._actions).onUploadSessionStarted) === null || _this$_actions$onUplo === void 0 || _this$_actions$onUplo.call(_this$_actions, {
      sessionInfo
    });
  }
  _raiseUploadProgress(args) {
    var _this$_actions$onUplo2, _this$_actions2;
    (_this$_actions$onUplo2 = (_this$_actions2 = this._actions).onUploadProgress) === null || _this$_actions$onUplo2 === void 0 || _this$_actions$onUplo2.call(_this$_actions2, args);
  }
  _raiseUploadFinished(args) {
    var _this$_actions$onUplo3, _this$_actions3;
    (_this$_actions$onUplo3 = (_this$_actions3 = this._actions).onUploadFinished) === null || _this$_actions$onUplo3 === void 0 || _this$_actions$onUplo3.call(_this$_actions3, args);
  }
  _initActions() {
    this._actions = {
      onUploadSessionStarted: this._createActionByOption('onUploadSessionStarted'),
      onUploadProgress: this._createActionByOption('onUploadProgress'),
      onUploadFinished: this._createActionByOption('onUploadFinished')
    };
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      getController: undefined,
      onUploadSessionStarted: undefined,
      onUploadProgress: undefined,
      onUploadFinished: undefined,
      splitterElement: undefined
    });
  }
  _optionChanged(args) {
    var _this$_$dropZonePlace6, _this$_$dropZonePlace7;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'getController':
        this.repaint();
        break;
      case 'onUploadSessionStarted':
      case 'onUploadProgress':
      case 'onUploadFinished':
        this._actions[name] = this._createActionByOption(name);
        break;
      case 'dropZone':
        this._findAndUpdateAvailableUploaderInfo();
        this._adjustDropZonePlaceholder();
        break;
      case 'dropZonePlaceholderContainer':
        (_this$_$dropZonePlace6 = this._$dropZonePlaceholder) === null || _this$_$dropZonePlace6 === void 0 || _this$_$dropZonePlace6.detach();
        // @ts-expect-error ts-error
        (_this$_$dropZonePlace7 = this._$dropZonePlaceholder) === null || _this$_$dropZonePlace7 === void 0 || _this$_$dropZonePlace7.appendTo(value);
        break;
      case 'splitterElement':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = FileManagerFileUploader;
