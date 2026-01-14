/**
* DevExtreme (esm/__internal/ui/file_uploader/file_upload_strategy.chunks.default.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ajax from '../../../core/utils/ajax';
import { ChunksFileUploadStrategyBase } from '../../ui/file_uploader/file_upload_strategy.chunks.base';
const FILEUPLOADER_CHUNK_META_DATA_NAME = 'chunkMetadata';
export class DefaultChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
  _sendChunkCore(file, chunksData, chunk) {
    const {
      uploadUrl,
      uploadMethod,
      uploadHeaders,
      name
    } = this.fileUploader.option();
    return ajax.sendRequest({
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
