/**
* DevExtreme (cjs/__internal/exporter/file_saver.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileSaver = exports.MIME_TYPES = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _console = require("../../core/utils/console");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-param-reassign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* global Windows */

const window = (0, _window.getWindow)();
const navigator = (0, _window.getNavigator)();
const FILE_EXTESIONS = {
  EXCEL: 'xlsx',
  CSS: 'css',
  PNG: 'png',
  JPEG: 'jpeg',
  GIF: 'gif',
  SVG: 'svg',
  PDF: 'pdf'
};
const MIME_TYPES = exports.MIME_TYPES = {
  CSS: 'text/css',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  PDF: 'application/pdf'
};
// Use github.com/eligrey/FileSaver.js library instead this method
const fileSaver = exports.fileSaver = {
  _revokeObjectURLTimeout: 30000,
  _getDataUri(format, data) {
    const mimeType = this._getMimeType(format);
    return `data:${mimeType};base64,${data}`;
  },
  _getMimeType(format) {
    return MIME_TYPES[format] || 'application/octet-stream';
  },
  _linkDownloader(fileName, href) {
    const exportLinkElement = _dom_adapter.default.createElement('a');
    // @ts-expect-error
    exportLinkElement.download = fileName;
    // @ts-expect-error
    exportLinkElement.href = href;
    // @ts-expect-error
    exportLinkElement.target = '_blank'; // cors policy
    return exportLinkElement;
  },
  _winJSBlobSave(blob, fileName, format) {
    // @ts-expect-error
    const savePicker = new Windows.Storage.Pickers.FileSavePicker();
    // @ts-expect-error
    savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
    const fileExtension = FILE_EXTESIONS[format];
    if (fileExtension) {
      const mimeType = this._getMimeType(format);
      savePicker.fileTypeChoices.insert(mimeType, [`.${fileExtension}`]);
    }
    savePicker.suggestedFileName = fileName;
    savePicker.pickSaveFileAsync().then(file => {
      if (file) {
        // @ts-expect-error
        file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(outputStream => {
          const inputStream = blob.msDetachStream();
          // @ts-expect-error
          Windows.Storage.Streams.RandomAccessStream.copyAsync(inputStream, outputStream).then(() => {
            outputStream.flushAsync().done(() => {
              inputStream.close();
              outputStream.close();
            });
          });
        });
      }
    });
  },
  _click(link) {
    try {
      link.dispatchEvent(new MouseEvent('click', {
        cancelable: true
      }));
    } catch (e) {
      const event = _dom_adapter.default.getDocument().createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      link.dispatchEvent(event);
    }
  },
  _saveBlobAs(fileName, format, data) {
    this._blobSaved = false;
    // @ts-expect-error
    if ((0, _type.isDefined)(navigator.msSaveOrOpenBlob)) {
      // @ts-expect-error
      navigator.msSaveOrOpenBlob(data, fileName);
      this._blobSaved = true;
      // @ts-expect-error
    } else if ((0, _type.isDefined)(window.WinJS)) {
      this._winJSBlobSave(data, fileName, format);
      this._blobSaved = true;
    } else {
      // @ts-expect-error
      const URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL;
      if ((0, _type.isDefined)(URL)) {
        const objectURL = URL.createObjectURL(data);
        const downloadLink = this._linkDownloader(fileName, objectURL);
        setTimeout(() => {
          URL.revokeObjectURL(objectURL);
          this._objectUrlRevoked = true;
        }, this._revokeObjectURLTimeout);
        this._click(downloadLink);
      } else {
        _console.logger.warn('window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL is not defined');
      }
    }
  },
  saveAs(fileName, format, data) {
    const fileExtension = FILE_EXTESIONS[format];
    if (fileExtension) {
      fileName += `.${fileExtension}`;
    }
    // @ts-expect-error
    if ((0, _type.isFunction)(window.Blob)) {
      this._saveBlobAs(fileName, format, data);
    } else {
      if (!(0, _type.isDefined)(/iPad/i.exec(navigator.userAgent))) _ui.default.log('E1034');
      const downloadLink = this._linkDownloader(fileName, this._getDataUri(format, data));
      this._click(downloadLink);
    }
  }
};
