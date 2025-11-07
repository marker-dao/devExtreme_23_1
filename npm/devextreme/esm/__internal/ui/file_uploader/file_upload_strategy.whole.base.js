/**
* DevExtreme (esm/__internal/ui/file_uploader/file_upload_strategy.whole.base.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Deferred } from '../../../core/utils/deferred';
import { FileUploadStrategyBase } from '../../ui/file_uploader/file_upload_strategy.base';
export class WholeFileUploadStrategyBase extends FileUploadStrategyBase {
  _uploadCore(file) {
    file.loadedSize = 0;
    const uploadFileDeferred = this._uploadFile(file);
    if ('done' in uploadFileDeferred) {
      uploadFileDeferred.done(() => {
        if (!file.isAborted) {
          file.onLoad.fire();
        }
      }).fail(error => {
        if (this._shouldHandleError(file, error)) {
          this._handleFileError(file, error);
        }
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _uploadFile(_file) {
    // Abstract method: subclasses should override this.
    // Return a rejected Deferred to satisfy the return type.
    return Deferred().reject();
  }
  _handleProgressCore(file, e) {
    file.onProgress.fire(e);
  }
  _getLoadedData(loaded, total, segmentSize, event) {
    const result = super._getLoadedData(loaded, total, segmentSize, event);
    result.event = event;
    return result;
  }
}
