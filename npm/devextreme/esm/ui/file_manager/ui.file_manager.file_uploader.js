/**
* DevExtreme (esm/ui/file_manager/ui.file_manager.file_uploader.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getInnerHeight, setHeight, setWidth } from '../../core/utils/size';
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
import { Deferred } from '../../core/utils/deferred';
import { hasWindow } from '../../core/utils/window';
import Guid from '../../core/guid';
import Widget from '../widget/ui.widget';
import FileUploader from '../file_uploader';
import { whenSome } from './ui.file_manager.common';
const FILE_MANAGER_FILE_UPLOADER_CLASS = 'dx-filemanager-fileuploader';
const FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLER_CLASS = 'dx-filemanager-fileuploader-dropzone-placeholder';
class FileManagerFileUploader extends Widget {
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
    const chunkSize = this._getController().chunkSize;
    const $fileUploader = $('<div>').appendTo(this.$element());
    const fileUploader = this._createComponent($fileUploader, FileUploader, {
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
    fileUploader._shouldRaiseDragLeaveBase = fileUploader._shouldRaiseDragLeave;
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
  _fileUploaderUploadChunk(fileUploader, file, chunksInfo) {
    const {
      session,
      fileIndex
    } = this._findSessionByFile(fileUploader, file);
    const controller = session.controller;
    chunksInfo.fileIndex = fileIndex;
    return controller.uploadFileChunk(file, chunksInfo);
  }
  _fileUploaderAbortUpload(fileUploader, file, chunksInfo) {
    const {
      session,
      fileIndex
    } = this._findSessionByFile(fileUploader, file);
    const controller = session.controller;
    chunksInfo.fileIndex = fileIndex;
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
    this._$dropZonePlaceholder = $('<div>').addClass(FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLER_CLASS).appendTo(this.option('dropZonePlaceholderContainer'));
  }
  _adjustDropZonePlaceholder() {
    const $dropZoneTarget = this.option('dropZone');
    if (!hasWindow() || $dropZoneTarget.length === 0) {
      return;
    }
    const placeholderBorderTopWidth = parseFloat(this._$dropZonePlaceholder.css('borderTopWidth'));
    const placeholderBorderLeftWidth = parseFloat(this._$dropZonePlaceholder.css('borderLeftWidth'));
    const $placeholderContainer = this.option('dropZonePlaceholderContainer');
    const containerBorderBottomWidth = parseFloat($placeholderContainer.css('borderBottomWidth'));
    const containerBorderLeftWidth = parseFloat($placeholderContainer.css('borderLeftWidth'));
    const containerHeight = getInnerHeight($placeholderContainer);
    const containerOffset = $placeholderContainer.offset();
    const dropZoneOffset = $dropZoneTarget.offset();
    this._$dropZonePlaceholder.css({
      top: dropZoneOffset.top - containerOffset.top - containerHeight - containerBorderBottomWidth,
      left: dropZoneOffset.left - containerOffset.left - containerBorderLeftWidth
    });
    setHeight(this._$dropZonePlaceholder, $dropZoneTarget.get(0).offsetHeight - placeholderBorderTopWidth * 2);
    setWidth(this._$dropZonePlaceholder, $dropZoneTarget.get(0).offsetWidth - placeholderBorderLeftWidth * 2);
  }
  _setDropZonePlaceholderVisible(visible) {
    if (visible) {
      this._adjustDropZonePlaceholder();
      this._$dropZonePlaceholder.css('display', '');
    } else {
      this._$dropZonePlaceholder.css('display', 'none');
    }
  }
  _shouldRaiseDragLeave(e, uploaderInstance) {
    return uploaderInstance.isMouseOverElement(e, this.option('splitterElement')) || uploaderInstance._shouldRaiseDragLeaveBase(e, true);
  }
  _uploadFiles(uploaderInfo, files) {
    this._setDropZonePlaceholderVisible(false);
    const sessionId = new Guid().toString();
    const controller = this._getController();
    const deferreds = files.map(() => new Deferred());
    const session = {
      id: sessionId,
      controller,
      files,
      deferreds
    };
    uploaderInfo.session = session;
    const sessionInfo = {
      sessionId,
      deferreds,
      files
    };
    this._raiseUploadSessionStarted(sessionInfo);
    return whenSome(deferreds).always(() => setTimeout(() => {
      uploaderInfo.fileUploader.clear();
      uploaderInfo.session = null;
    }));
  }
  _getDeferredForFile(fileUploader, file) {
    const {
      session,
      fileIndex
    } = this._findSessionByFile(fileUploader, file);
    return session.deferreds[fileIndex];
  }
  _findSessionByFile(fileUploader, file) {
    const uploaderInfo = this._findUploaderInfo(fileUploader);
    const session = uploaderInfo.session;
    const fileIndex = session.files.indexOf(file);
    return {
      session,
      fileIndex
    };
  }
  _findUploaderInfoBySessionId(sessionId) {
    for (let i = 0; i < this._uploaderInfos.length; i++) {
      const uploaderInfo = this._uploaderInfos[i];
      const session = uploaderInfo.session;
      if (session && session.id === sessionId) {
        return uploaderInfo;
      }
    }
    return null;
  }
  _findAndUpdateAvailableUploaderInfo() {
    var _info;
    let info = null;
    for (let i = 0; i < this._uploaderInfos.length; i++) {
      const currentInfo = this._uploaderInfos[i];
      currentInfo.fileUploader.option('dropZone', '');
      if (!info && !currentInfo.session) {
        info = currentInfo;
      }
    }
    (_info = info) === null || _info === void 0 || _info.fileUploader.option('dropZone', this.option('dropZone'));
    return info;
  }
  _findUploaderInfo(fileUploader) {
    for (let i = 0; i < this._uploaderInfos.length; i++) {
      const info = this._uploaderInfos[i];
      if (info.fileUploader === fileUploader) {
        return info;
      }
    }
    return null;
  }
  _getController() {
    const controllerGetter = this.option('getController');
    return controllerGetter();
  }
  _raiseUploadSessionStarted(sessionInfo) {
    this._actions.onUploadSessionStarted({
      sessionInfo
    });
  }
  _raiseUploadProgress(args) {
    this._actions.onUploadProgress(args);
  }
  _raiseUploadFinished(args) {
    this._actions.onUploadFinished(args);
  }
  _initActions() {
    this._actions = {
      onUploadSessionStarted: this._createActionByOption('onUploadSessionStarted'),
      onUploadProgress: this._createActionByOption('onUploadProgress'),
      onUploadFinished: this._createActionByOption('onUploadFinished')
    };
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      getController: null,
      onUploadSessionStarted: null,
      onUploadProgress: null,
      onUploadFinished: null,
      splitterElement: null
    });
  }
  _optionChanged(args) {
    const name = args.name;
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
        this._$dropZonePlaceholder.detach();
        this._$dropZonePlaceholder.appendTo(args.value);
        break;
      case 'splitterElement':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default FileManagerFileUploader;
