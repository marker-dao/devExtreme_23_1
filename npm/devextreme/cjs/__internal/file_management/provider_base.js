/**
* DevExtreme (cjs/__internal/file_management/provider_base.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../core/utils/common");
var _data = require("../../core/utils/data");
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _deferred = require("../../core/utils/deferred");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _file_system_item = _interopRequireDefault(require("../file_management/file_system_item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error ts-error

const DEFAULT_FILE_UPLOAD_CHUNK_SIZE = 200000;
class FileSystemProviderBase {
  constructor(options) {
    // eslint-disable-next-line no-param-reassign
    options = (0, _common.ensureDefined)(options, {});
    // @ts-expect-error ts-error
    this._keyGetter = (0, _data.compileGetter)(this._getKeyExpr(options));
    // @ts-expect-error ts-error
    this._nameGetter = (0, _data.compileGetter)(this._getNameExpr(options));
    // @ts-expect-error ts-error
    this._isDirGetter = (0, _data.compileGetter)(this._getIsDirExpr(options));
    // @ts-expect-error ts-error
    this._sizeGetter = (0, _data.compileGetter)(this._getSizeExpr(options));
    // @ts-expect-error ts-error
    this._dateModifiedGetter = (0, _data.compileGetter)(this._getDateModifiedExpr(options));
    // @ts-expect-error ts-error
    this._thumbnailGetter = (0, _data.compileGetter)(this._getThumbnailExpr(options));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItems(parentDirectory) {
    // @ts-expect-error ts-error
    const deferred = new _deferred.Deferred();
    deferred.resolve([]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deferred.promise();
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  abortFileUpload(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fileData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chunksInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  destinationDirectory) {}
  // @ts-expect-error ts-error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  getItemsContent(items) {}
  getFileUploadChunkSize() {
    return DEFAULT_FILE_UPLOAD_CHUNK_SIZE;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _convertDataObjectsToFileItems(entries, pathInfo) {
    const result = [];
    (0, _iterator.each)(entries, (_, entry) => {
      const fileItem = this._createFileItem(entry, pathInfo);
      result.push(fileItem);
    });
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _createFileItem(dataObj, pathInfo) {
    var _this$_keyGetter, _this$_nameGetter, _this$_isDirGetter, _this$_sizeGetter, _this$_dateModifiedGe, _this$_thumbnailGette;
    const key = (_this$_keyGetter = this._keyGetter) === null || _this$_keyGetter === void 0 ? void 0 : _this$_keyGetter.call(this, dataObj);
    const fileItem = new _file_system_item.default(pathInfo, (_this$_nameGetter = this._nameGetter) === null || _this$_nameGetter === void 0 ? void 0 : _this$_nameGetter.call(this, dataObj), !!((_this$_isDirGetter = this._isDirGetter) !== null && _this$_isDirGetter !== void 0 && _this$_isDirGetter.call(this, dataObj)), key);
    fileItem.size = (_this$_sizeGetter = this._sizeGetter) === null || _this$_sizeGetter === void 0 ? void 0 : _this$_sizeGetter.call(this, dataObj);
    if (fileItem.size === undefined) {
      fileItem.size = 0;
    }
    fileItem.dateModified = _date_serialization.default.deserializeDate((_this$_dateModifiedGe = this._dateModifiedGetter) === null || _this$_dateModifiedGe === void 0 ? void 0 : _this$_dateModifiedGe.call(this, dataObj));
    if (fileItem.dateModified === undefined) {
      fileItem.dateModified = new Date();
    }
    if (fileItem.isDirectory) {
      fileItem.hasSubDirectories = this._hasSubDirs(dataObj);
    }
    if (!key) {
      fileItem.key = fileItem.relativeName;
    }
    fileItem.thumbnail = ((_this$_thumbnailGette = this._thumbnailGetter) === null || _this$_thumbnailGette === void 0 ? void 0 : _this$_thumbnailGette.call(this, dataObj)) || '';
    fileItem.dataItem = dataObj;
    return fileItem;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
  _hasSubDirs(dataObj) {
    return true;
  }
  _getKeyExpr(options) {
    return options.keyExpr ?? this._defaultKeyExpr;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
  _defaultKeyExpr(fileItem) {
    if (arguments.length === 2) {
      // eslint-disable-next-line prefer-destructuring,prefer-rest-params
      fileItem.__KEY__ = arguments[1];
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,consistent-return
    return Object.prototype.hasOwnProperty.call(fileItem, '__KEY__') ? fileItem.__KEY__ : null;
  }
  _getNameExpr(options) {
    return options.nameExpr ?? 'name';
  }
  _getIsDirExpr(options) {
    return options.isDirectoryExpr ?? 'isDirectory';
  }
  _getSizeExpr(options) {
    return options.sizeExpr ?? 'size';
  }
  _getDateModifiedExpr(options) {
    return options.dateModifiedExpr ?? 'dateModified';
  }
  _getThumbnailExpr(options) {
    return options.thumbnailExpr ?? 'thumbnail';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _executeActionAsDeferred(action, keepResult) {
    // @ts-expect-error ts-error
    const deferred = new _deferred.Deferred();
    try {
      const result = action();
      if ((0, _type.isPromise)(result)) {
        (0, _deferred.fromPromise)(result)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .done(userResult => deferred.resolve(keepResult ? userResult : undefined))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .fail(error => deferred.reject(error));
      } else {
        deferred.resolve(keepResult ? result : undefined);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return deferred.reject(error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deferred.promise();
  }
}
var _default = exports.default = FileSystemProviderBase;
