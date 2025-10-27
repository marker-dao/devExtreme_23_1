"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultWholeFileUploadStrategy = void 0;
var _ajax = _interopRequireDefault(require("../../../core/utils/ajax"));
var _file_upload_strategyWhole = require("../../ui/file_uploader/file_upload_strategy.whole.base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DefaultWholeFileUploadStrategy extends _file_upload_strategyWhole.WholeFileUploadStrategyBase {
  _uploadFile(file) {
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
        onloadstart: () => file.onLoadStart.fire(),
        onabort: () => file.onAbort.fire()
      },
      data: this._createFormData(name, file.value)
    });
  }
  _createFormData(fieldName, fieldValue) {
    // @ts-ignore: window.FormData may not be typed in all environments
    const formData = new window.FormData();
    formData.append(fieldName, fieldValue, fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.name);
    this._extendFormData(formData);
    return formData;
  }
}
exports.DefaultWholeFileUploadStrategy = DefaultWholeFileUploadStrategy;