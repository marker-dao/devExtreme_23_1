/**
* DevExtreme (cjs/exporter.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.export = _export;
Object.defineProperty(exports, "fileSaver", {
  enumerable: true,
  get: function () {
    return _file_saver.fileSaver;
  }
});
exports.svg = exports.pdf = exports.image = void 0;
var _file_saver = require("./__internal/exporter/file_saver");
var _image_creator = require("./__internal/exporter/image_creator");
var _svg_creator = require("./__internal/exporter/svg_creator");
var _type = require("./core/utils/type");
var _deferred = require("./core/utils/deferred");
var _pdf_creator = require("./__internal/exporter/pdf_creator");
function _export(data, options, getData) {
  if (!data) {
    return new _deferred.Deferred().resolve();
  }

  // TODO: Can the following actions be not defined? (since they are provided by a widget not by a user)
  const exportingAction = options.exportingAction;
  const exportedAction = options.exportedAction;
  const fileSavingAction = options.fileSavingAction;
  const eventArgs = {
    fileName: options.fileName,
    format: options.format,
    cancel: false
  };
  if ((0, _type.isBoolean)(options.selectedRowsOnly)) {
    eventArgs.selectedRowsOnly = options.selectedRowsOnly;
  }
  (0, _type.isFunction)(exportingAction) && exportingAction(eventArgs);
  if (!eventArgs.cancel) {
    return getData(data, options).then(blob => {
      (0, _type.isFunction)(exportedAction) && exportedAction();
      if ((0, _type.isFunction)(fileSavingAction)) {
        eventArgs.data = blob;
        fileSavingAction(eventArgs);
      }
      if (!eventArgs.cancel) {
        const format = options.format === 'xlsx' ? 'EXCEL' : options.format;
        _file_saver.fileSaver.saveAs(eventArgs.fileName, format, blob);
      }
    });
  }
  return new _deferred.Deferred().resolve();
}
const image = exports.image = {
  creator: _image_creator.imageCreator,
  getData: _image_creator.getData,
  testFormats: _image_creator.testFormats
};
const pdf = exports.pdf = {
  getData: _pdf_creator.getData
};
const svg = exports.svg = {
  creator: _svg_creator.svgCreator,
  getData: _svg_creator.getData
};
