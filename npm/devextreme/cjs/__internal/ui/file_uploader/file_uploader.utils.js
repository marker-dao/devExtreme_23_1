/**
* DevExtreme (cjs/__internal/ui/file_uploader/file_uploader.utils.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileSize = exports.getFileIconName = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

const EXTENTIONS_MAP = {
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  bmp: 'image',
  webp: 'image',
  mp4: 'video',
  mov: 'video',
  avi: 'video',
  webm: 'video',
  mkv: 'video',
  mp3: 'music',
  wav: 'music',
  ogg: 'music',
  m4a: 'music',
  flac: 'music',
  doc: 'textdocument',
  docx: 'textdocument',
  txt: 'textdocument',
  rtf: 'textdocument',
  md: 'textdocument',
  xls: 'exportxlsx',
  xlsx: 'exportxlsx',
  csv: 'exportxlsx',
  ods: 'exportxlsx',
  zip: 'folder',
  rar: 'folder',
  '7z': 'folder',
  tar: 'folder',
  gz: 'folder',
  pdf: 'pdffile'
};
const DEFAULT_ICON = 'file';
const getFileIconName = function () {
  let filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return DEFAULT_ICON;
  }
  const extension = filename.slice(lastDotIndex + 1).toLowerCase();
  return EXTENTIONS_MAP[extension] || DEFAULT_ICON;
};
exports.getFileIconName = getFileIconName;
const getFileSize = sizeInBytes => {
  const labels = [_message.default.format('dxFileUploader-bytes'), _message.default.format('dxFileUploader-kb'), _message.default.format('dxFileUploader-Mb'), _message.default.format('dxFileUploader-Gb')];
  const count = labels.length - 1;
  let value = sizeInBytes;
  let i = 0;
  while (i < count && value >= 1024) {
    value /= 1024;
    i += 1;
  }
  return `${Math.round(value)} ${labels[i]}`;
};
exports.getFileSize = getFileSize;
