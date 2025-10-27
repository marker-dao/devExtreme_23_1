"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomChunksFileUploadStrategy = void 0;
var _deferred = require("../../../core/utils/deferred");
var _m_deferred = require("../../core/utils/m_deferred");
var _file_upload_strategyChunks = require("../../ui/file_uploader/file_upload_strategy.chunks.base");
class CustomChunksFileUploadStrategy extends _file_upload_strategyChunks.ChunksFileUploadStrategyBase {
  _sendChunkCore(file, chunksData) {
    this._tryRaiseStartLoad(file);
    const chunksInfo = this._createChunksInfo(chunksData);
    const {
      uploadChunk
    } = this.fileUploader.option();
    try {
      const result = uploadChunk === null || uploadChunk === void 0 ? void 0 : uploadChunk(file.value, chunksInfo);
      return (0, _m_deferred.fromPromise)(result);
    } catch (error) {
      return (0, _deferred.Deferred)().reject(error).promise();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _shouldHandleError(_file, _error) {
    return true;
  }
}
exports.CustomChunksFileUploadStrategy = CustomChunksFileUploadStrategy;