/**
* DevExtreme (cjs/__internal/ui/file_uploader/file_upload_strategy.chunks.default.js)
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
exports.DefaultChunksFileUploadStrategy = void 0;
var _ajax = _interopRequireDefault(require("../../../core/utils/ajax"));
var _file_upload_strategyChunks = require("../../ui/file_uploader/file_upload_strategy.chunks.base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FILEUPLOADER_CHUNK_META_DATA_NAME = 'chunkMetadata';
class DefaultChunksFileUploadStrategy extends _file_upload_strategyChunks.ChunksFileUploadStrategyBase {
  _sendChunkCore(file, chunksData, chunk) {
    const {
      uploadUrl,
      uploadMethod,
      uploadHeaders,
      name
    } = this.fileUploader.option();
    return _ajax.default.sendRequest({
      url: uploadUrl,
      method: uploadMethod,
      headers: uploadHeaders,
      beforeSend: xhr => this._beforeSend(xhr, file),
      upload: {
        onprogress: e => this._handleProgress(file, e),
        onloadstart: () => this._tryRaiseStartLoad(file),
        onabort: () => file.onAbort.fire()
      },
      data: this._createFormData({
        fileName: chunksData.name,
        blobName: name,
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
    // @ts-ignore: window.FormData may not be typed in all environments
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
exports.DefaultChunksFileUploadStrategy = DefaultChunksFileUploadStrategy;
