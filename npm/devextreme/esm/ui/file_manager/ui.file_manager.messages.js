/**
* DevExtreme (esm/ui/file_manager/ui.file_manager.messages.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../common/core/localization/message';
import ErrorCode from '../../file_management/error_codes';
export const FileManagerMessages = {
  get: (errorCode, args) => {
    switch (errorCode) {
      case ErrorCode.NoAccess:
        return messageLocalization.format('dxFileManager-errorNoAccess');
      case ErrorCode.FileExists:
        return messageLocalization.format('dxFileManager-errorFileExistsFormat', args);
      case ErrorCode.FileNotFound:
        return messageLocalization.format('dxFileManager-errorFileNotFoundFormat', args);
      case ErrorCode.DirectoryExists:
        return messageLocalization.format('dxFileManager-errorDirectoryExistsFormat', args);
      case ErrorCode.DirectoryNotFound:
        return messageLocalization.format('dxFileManager-errorDirectoryNotFoundFormat', args);
      case ErrorCode.WrongFileExtension:
        return messageLocalization.format('dxFileManager-errorWrongFileExtension');
      case ErrorCode.MaxFileSizeExceeded:
        return messageLocalization.format('dxFileManager-errorMaxFileSizeExceeded');
      case ErrorCode.InvalidSymbols:
        return messageLocalization.format('dxFileManager-errorInvalidSymbols');
    }
    return messageLocalization.format('dxFileManager-errorDefault');
  }
};
export { ErrorCode };
