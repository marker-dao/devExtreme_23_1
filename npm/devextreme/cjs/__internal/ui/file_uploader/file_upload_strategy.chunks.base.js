/**
* DevExtreme (cjs/__internal/ui/file_uploader/file_upload_strategy.chunks.base.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChunksFileUploadStrategyBase = void 0;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _deferred = require("../../../core/utils/deferred");
var _file_blob_reader = require("../../ui/file_uploader/file_blob_reader");
var _file_upload_strategy = require("../../ui/file_uploader/file_upload_strategy.base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ChunksFileUploadStrategyBase extends _file_upload_strategy.FileUploadStrategyBase {
  constructor(fileUploader) {
    super(fileUploader);
    const {
      chunkSize
    } = this.fileUploader.option();
    this.chunkSize = chunkSize ?? 0;
  }
  _uploadCore(file) {
    const realFile = file.value;
    const chunksData = {
      name: realFile.name,
      loadedBytes: 0,
      type: realFile.type,
      blobReader: new _file_blob_reader.FileBlobReader(realFile, this.chunkSize),
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
        var _chunk$blob;
        if (file.isAborted) {
          return;
        }
        chunksData.loadedBytes += ((_chunk$blob = chunk.blob) === null || _chunk$blob === void 0 ? void 0 : _chunk$blob.size) ?? 0;
        file.onProgress.fire({
          loaded: chunksData.loadedBytes,
          total: file.value.size
        });
        if (chunk.isCompleted) {
          file.onLoad.fire();
        }
        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => this._sendChunk(file, chunksData));
      }).fail(error => {
        if (this._shouldHandleError(file, error)) {
          this._handleFileError(file, error);
        }
      });
    }
  }
  _sendChunkCore(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _file,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _chunksData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _chunk) {
    // This is an abstract method and should be implemented in subclasses.
    // Returning a rejected Deferred to satisfy the return type.
    return (0, _deferred.Deferred)().reject();
  }
  _tryRaiseStartLoad(file) {
    if (!file.isStartLoad) {
      file.isStartLoad = true;
      file.onLoadStart.fire();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getEvent(_e) {
    return null;
  }
  _createUploadArgument(file) {
    return this._createChunksInfo(file.chunksData);
  }
  _createChunksInfo(chunksData) {
    var _chunksData$currentCh, _chunksData$currentCh2;
    return {
      bytesUploaded: (chunksData === null || chunksData === void 0 ? void 0 : chunksData.loadedBytes) ?? 0,
      chunkCount: (chunksData === null || chunksData === void 0 ? void 0 : chunksData.count) ?? 0,
      customData: (chunksData === null || chunksData === void 0 ? void 0 : chunksData.customData) ?? {},
      chunkBlob: (chunksData === null || chunksData === void 0 || (_chunksData$currentCh = chunksData.currentChunk) === null || _chunksData$currentCh === void 0 ? void 0 : _chunksData$currentCh.blob) ?? new Blob(),
      chunkIndex: (chunksData === null || chunksData === void 0 || (_chunksData$currentCh2 = chunksData.currentChunk) === null || _chunksData$currentCh2 === void 0 ? void 0 : _chunksData$currentCh2.index) ?? 0
    };
  }
}
exports.ChunksFileUploadStrategyBase = ChunksFileUploadStrategyBase;
