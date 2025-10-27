/**
* DevExtreme (cjs/__internal/ui/file_uploader/file_upload_strategy.base.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploadStrategyBase = void 0;
var _deferred2 = require("../../../core/utils/deferred");
var _type = require("../../../core/utils/type");
var _m_deferred = require("../../core/utils/m_deferred");
class FileUploadStrategyBase {
  constructor(fileUploader) {
    this.fileUploader = fileUploader;
  }
  upload(file) {
    if (file.isInitialized && file.isAborted) {
      var _this$fileUploader;
      (_this$fileUploader = this.fileUploader) === null || _this$fileUploader === void 0 || _this$fileUploader._resetFileState(file);
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
      const {
        abortUpload
      } = this.fileUploader.option();
      const arg = this._createUploadArgument(file);
      let deferred = null;
      try {
        const result = abortUpload === null || abortUpload === void 0 ? void 0 : abortUpload(file.value, arg);
        deferred = (0, _m_deferred.fromPromise)(result);
      } catch (error) {
        deferred = (0, _deferred2.Deferred)().reject(error).promise();
      }
      if (deferred && 'done' in deferred) {
        var _deferred;
        (_deferred = deferred) === null || _deferred === void 0 || _deferred.done(() => file.onAbort.fire()).fail(error => this._handleFileError(file, error));
      }
    }
  }
  _beforeSend(xhr, file) {
    var _this$fileUploader$_b, _this$fileUploader2;
    const arg = this._createUploadArgument(file);
    (_this$fileUploader$_b = (_this$fileUploader2 = this.fileUploader)._beforeSendAction) === null || _this$fileUploader$_b === void 0 || _this$fileUploader$_b.call(_this$fileUploader2, {
      request: xhr,
      file: file.value,
      uploadInfo: arg
    });
    file.request = xhr;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createUploadArgument(_file) {
    // This is an abstract method and should be implemented in subclasses.
    // Returning a default object to satisfy the return type.
    return {
      bytesUploaded: 0,
      chunkCount: 0,
      customData: {},
      chunkBlob: new Blob(),
      chunkIndex: 0
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _uploadCore(_file) {}
  _isCustomCallback(name) {
    var _this$fileUploader3;
    const callback = (_this$fileUploader3 = this.fileUploader) === null || _this$fileUploader3 === void 0 ? void 0 : _this$fileUploader3.option(name);
    return callback && (0, _type.isFunction)(callback);
  }
  _handleProgress(file, e) {
    if (file._isError) {
      return;
    }
    file._isProgressStarted = true;
    this._handleProgressCore(file, e);
  }
  _handleProgressCore(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _file,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _e) {}
  _handleFileError(file, error) {
    file._isError = true;
    file.onError.fire(error);
  }
  _prepareFileBeforeUpload(file) {
    if (file.$file) {
      var _file$progressBar;
      (_file$progressBar = file.progressBar) === null || _file$progressBar === void 0 || _file$progressBar.dispose();
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
    var _this$fileUploader4, _this$fileUploader4$_;
    file.uploadStarted = true;
    (_this$fileUploader4 = this.fileUploader) === null || _this$fileUploader4 === void 0 || (_this$fileUploader4$_ = _this$fileUploader4._uploadStartedAction) === null || _this$fileUploader4$_ === void 0 || _this$fileUploader4$_.call(_this$fileUploader4, {
      file: file.value,
      event: e,
      request: file.request
    });
  }
  _onAbortHandler(file, e) {
    var _this$fileUploader5, _this$fileUploader$_u, _this$fileUploader6;
    const args = {
      file: file.value,
      event: e,
      request: file.request,
      message: (_this$fileUploader5 = this.fileUploader) === null || _this$fileUploader5 === void 0 ? void 0 : _this$fileUploader5._getUploadAbortedStatusMessage()
    };
    (_this$fileUploader$_u = (_this$fileUploader6 = this.fileUploader)._uploadAbortedAction) === null || _this$fileUploader$_u === void 0 || _this$fileUploader$_u.call(_this$fileUploader6, args);
    this.fileUploader._setStatusMessage(file, args.message);
    this.fileUploader._handleAllFilesUploaded();
  }
  _onErrorHandler(file, error) {
    var _this$fileUploader$_u2, _this$fileUploader7, _this$fileUploader$_s, _this$fileUploader8;
    const {
      uploadFailedMessage
    } = this.fileUploader.option();
    const args = {
      file: file.value,
      event: undefined,
      request: file.request,
      error,
      message: uploadFailedMessage
    };
    (_this$fileUploader$_u2 = (_this$fileUploader7 = this.fileUploader)._uploadErrorAction) === null || _this$fileUploader$_u2 === void 0 || _this$fileUploader$_u2.call(_this$fileUploader7, args);
    (_this$fileUploader$_s = (_this$fileUploader8 = this.fileUploader)._setStatusMessage) === null || _this$fileUploader$_s === void 0 || _this$fileUploader$_s.call(_this$fileUploader8, file, args.message);
    this.fileUploader._handleAllFilesUploaded();
  }
  _onLoadedHandler(file, e) {
    var _this$fileUploader$_u3, _this$fileUploader9;
    const {
      uploadedMessage
    } = this.fileUploader.option();
    const args = {
      file: file.value,
      event: e,
      request: file.request,
      message: uploadedMessage
    };
    file._isLoaded = true;
    (_this$fileUploader$_u3 = (_this$fileUploader9 = this.fileUploader)._uploadedAction) === null || _this$fileUploader$_u3 === void 0 || _this$fileUploader$_u3.call(_this$fileUploader9, args);
    this.fileUploader._setStatusMessage(file, args.message);
    this.fileUploader._handleAllFilesUploaded();
  }
  _onProgressHandler(file, e) {
    if (file) {
      const totalFilesSize = this.fileUploader._getTotalFilesSize();
      const totalLoadedFilesSize = this.fileUploader._getTotalLoadedFilesSize();
      // ProgressEvent from XMLHttpRequest or FileReader
      const loaded = e.loaded ?? 0;
      const loadedSize = Math.min(loaded, file.value.size);
      const segmentSize = loadedSize - file.loadedSize;
      file.loadedSize = loadedSize;
      this.fileUploader._updateTotalProgress(totalFilesSize, totalLoadedFilesSize + segmentSize);
      this.fileUploader._updateProgressBar(file, this._getLoadedData(loadedSize, e.total, segmentSize, e));
    }
  }
  _getLoadedData(loaded, total, currentSegmentSize,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _event) {
    return {
      loaded,
      total,
      currentSegmentSize
    };
  }
  _extendFormData(formData) {
    const {
      uploadCustomData: formDataEntries
    } = this.fileUploader.option();
    // eslint-disable-next-line no-restricted-syntax
    for (const entryName in formDataEntries) {
      if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
        formData.append(entryName, formDataEntries[entryName]);
      }
    }
  }
}
exports.FileUploadStrategyBase = FileUploadStrategyBase;
