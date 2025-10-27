"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileBlobReader = void 0;
class FileBlobReader {
  constructor(file, chunkSize) {
    this.file = file;
    this.chunkSize = chunkSize;
    this.index = 0;
  }
  read() {
    if (!this.file) {
      return null;
    }
    const result = this.createBlobResult(this.file, this.index, this.chunkSize);
    if (result.isCompleted) {
      this.file = null;
    }
    this.index += 1;
    return result;
  }
  createBlobResult(file, index, chunkSize) {
    const currentPosition = index * chunkSize;
    return {
      blob: this.sliceFile(file, currentPosition, chunkSize),
      index,
      isCompleted: currentPosition + chunkSize >= file.size
    };
  }
  sliceFile(file, startPos, length) {
    if (file.slice) {
      return file.slice(startPos, startPos + length);
    }
    if ('webkitSlice' in file && typeof file.webkitSlice === 'function') {
      return file.webkitSlice(startPos, startPos + length);
    }
    return null;
  }
}
exports.FileBlobReader = FileBlobReader;