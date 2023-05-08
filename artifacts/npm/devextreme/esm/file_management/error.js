/**
* DevExtreme (esm/file_management/error.js)
* Version: 23.1.1
* Build date: Mon May 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
class FileSystemError {
  constructor(errorCode, fileSystemItem, errorText) {
    this.errorCode = errorCode;
    this.fileSystemItem = fileSystemItem;
    this.errorText = errorText;
  }
}
export default FileSystemError;
