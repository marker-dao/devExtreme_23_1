/**
* DevExtreme (esm/__internal/ui/file_uploader/file_upload_strategy.chunks.custom.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Deferred } from '../../../core/utils/deferred';
import { fromPromise } from '../../core/utils/m_deferred';
import { ChunksFileUploadStrategyBase } from '../../ui/file_uploader/file_upload_strategy.chunks.base';
export class CustomChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
  _sendChunkCore(file, chunksData) {
    this._tryRaiseStartLoad(file);
    const chunksInfo = this._createChunksInfo(chunksData);
    const {
      uploadChunk
    } = this.fileUploader.option();
    try {
      const result = uploadChunk === null || uploadChunk === void 0 ? void 0 : uploadChunk(file.value, chunksInfo);
      return fromPromise(result);
    } catch (error) {
      return Deferred().reject(error).promise();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _shouldHandleError(_file, _error) {
    return true;
  }
}
