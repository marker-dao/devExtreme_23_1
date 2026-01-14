"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class FileSystemError {
  constructor(errorCode, fileSystemItem, errorText) {
    this.errorCode = errorCode;
    this.fileSystemItem = fileSystemItem;
    this.errorText = errorText;
  }
}
var _default = exports.default = FileSystemError;