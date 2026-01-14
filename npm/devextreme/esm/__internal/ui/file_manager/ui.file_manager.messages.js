/**
* DevExtreme (esm/__internal/ui/file_manager/ui.file_manager.messages.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../common/core/localization/message';
import ErrorCode from '../../file_management/error_codes';
export const FileManagerMessages = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (errorCode, args) => {
    switch (errorCode) {
      case ErrorCode.NoAccess:
        return messageLocalization.format('dxFileManager-errorNoAccess');
      case ErrorCode.FileExists:
        return messageLocalization.format('dxFileManager-errorFileExistsFormat',
        // @ts-expect-error ts-error
        args);
      case ErrorCode.FileNotFound:
        return messageLocalization.format('dxFileManager-errorFileNotFoundFormat',
        // @ts-expect-error ts-error
        args);
      case ErrorCode.DirectoryExists:
        return messageLocalization.format('dxFileManager-errorDirectoryExistsFormat',
        // @ts-expect-error ts-error
        args);
      case ErrorCode.DirectoryNotFound:
        return messageLocalization.format('dxFileManager-errorDirectoryNotFoundFormat',
        // @ts-expect-error ts-error
        args);
      case ErrorCode.WrongFileExtension:
        return messageLocalization.format('dxFileManager-errorWrongFileExtension');
      case ErrorCode.MaxFileSizeExceeded:
        return messageLocalization.format('dxFileManager-errorMaxFileSizeExceeded');
      case ErrorCode.InvalidSymbols:
        return messageLocalization.format('dxFileManager-errorInvalidSymbols');
      default:
        break;
    }
    return messageLocalization.format('dxFileManager-errorDefault');
  }
};
export { ErrorCode };
