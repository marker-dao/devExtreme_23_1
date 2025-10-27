import { Deferred } from '../../../core/utils/deferred';
import { fromPromise } from '../../core/utils/m_deferred';
import { WholeFileUploadStrategyBase } from '../../ui/file_uploader/file_upload_strategy.whole.base';
export class CustomWholeFileUploadStrategy extends WholeFileUploadStrategyBase {
  _uploadFile(file) {
    file.onLoadStart.fire();
    const progressCallback = loadedBytes => {
      const arg = {
        loaded: loadedBytes,
        total: file.value.size
      };
      this._handleProgress(file, arg);
    };
    const {
      uploadFile
    } = this.fileUploader.option();
    try {
      const result = uploadFile === null || uploadFile === void 0 ? void 0 : uploadFile(file.value, progressCallback);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return fromPromise(result);
    } catch (error) {
      return Deferred().reject(error).promise();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _shouldHandleError(_file, _e) {
    return true;
  }
}