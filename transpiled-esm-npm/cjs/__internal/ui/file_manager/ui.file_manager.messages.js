"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ErrorCode", {
  enumerable: true,
  get: function () {
    return _error_codes.default;
  }
});
exports.FileManagerMessages = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _error_codes = _interopRequireDefault(require("../../file_management/error_codes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FileManagerMessages = exports.FileManagerMessages = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (errorCode, args) => {
    switch (errorCode) {
      case _error_codes.default.NoAccess:
        return _message.default.format('dxFileManager-errorNoAccess');
      case _error_codes.default.FileExists:
        return _message.default.format('dxFileManager-errorFileExistsFormat',
        // @ts-expect-error ts-error
        args);
      case _error_codes.default.FileNotFound:
        return _message.default.format('dxFileManager-errorFileNotFoundFormat',
        // @ts-expect-error ts-error
        args);
      case _error_codes.default.DirectoryExists:
        return _message.default.format('dxFileManager-errorDirectoryExistsFormat',
        // @ts-expect-error ts-error
        args);
      case _error_codes.default.DirectoryNotFound:
        return _message.default.format('dxFileManager-errorDirectoryNotFoundFormat',
        // @ts-expect-error ts-error
        args);
      case _error_codes.default.WrongFileExtension:
        return _message.default.format('dxFileManager-errorWrongFileExtension');
      case _error_codes.default.MaxFileSizeExceeded:
        return _message.default.format('dxFileManager-errorMaxFileSizeExceeded');
      case _error_codes.default.InvalidSymbols:
        return _message.default.format('dxFileManager-errorInvalidSymbols');
      default:
        break;
    }
    return _message.default.format('dxFileManager-errorDefault');
  }
};