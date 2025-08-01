/**
* DevExtreme (cjs/file_management/object_provider.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _common = require("../core/utils/common");
var _data = require("../core/utils/data");
var _common2 = require("../common");
var _type = require("../core/utils/type");
var _errors = require("../common/data/errors");
var _deferred = require("../core/utils/deferred");
var _window = require("../core/utils/window");
var _file_saver = require("../__internal/exporter/file_saver");
var _ui = _interopRequireDefault(require("../ui/widget/ui.errors"));
var _jszip = _interopRequireDefault(require("jszip"));
var _provider_base = _interopRequireDefault(require("./provider_base"));
var _error = _interopRequireDefault(require("./error"));
var _error_codes = _interopRequireDefault(require("./error_codes"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
class ObjectFileSystemProvider extends _provider_base.default {
  constructor(options) {
    options = (0, _common.ensureDefined)(options, {});
    super(options);
    const initialArray = options.data;
    if (initialArray && !Array.isArray(initialArray)) {
      throw _errors.errors.Error('E4006');
    }
    const itemsExpr = options.itemsExpr || 'items';
    this._subFileItemsGetter = (0, _data.compileGetter)(itemsExpr);
    this._subFileItemsSetter = this._getSetter(itemsExpr);
    const contentExpr = options.contentExpr || 'content';
    this._contentGetter = (0, _data.compileGetter)(contentExpr);
    this._contentSetter = this._getSetter(contentExpr);
    const nameExpr = this._getNameExpr(options);
    this._nameSetter = this._getSetter(nameExpr);
    const isDirExpr = this._getIsDirExpr(options);
    this._getIsDirSetter = this._getSetter(isDirExpr);
    const keyExpr = this._getKeyExpr(options);
    this._keySetter = this._getSetter(keyExpr);
    const sizeExpr = this._getSizeExpr(options);
    this._sizeSetter = this._getSetter(sizeExpr);
    const dateModifiedExpr = this._getDateModifiedExpr(options);
    this._dateModifiedSetter = this._getSetter(dateModifiedExpr);
    this._data = initialArray || [];
  }
  getItems(parentDir) {
    return this._executeActionAsDeferred(() => this._getItems(parentDir), true);
  }
  renameItem(item, name) {
    return this._executeActionAsDeferred(() => this._renameItemCore(item, name));
  }
  _renameItemCore(item, name) {
    if (!item) {
      return;
    }
    const dataItem = this._findDataObject(item);
    this._nameSetter(dataItem, name);
    item.name = name;
    item.key = this._ensureDataObjectKey(dataItem);
  }
  createDirectory(parentDir, name) {
    return this._executeActionAsDeferred(() => {
      this._validateDirectoryExists(parentDir);
      this._createDataObject(parentDir, name, true);
    });
  }
  deleteItems(items) {
    return items.map(item => this._executeActionAsDeferred(() => this._deleteItem(item)));
  }
  moveItems(items, destinationDir) {
    const destinationDataItem = this._findDataObject(destinationDir);
    const array = this._getDirectoryDataItems(destinationDataItem);
    const deferreds = items.map(item => this._executeActionAsDeferred(() => {
      this._checkAbilityToMoveOrCopyItem(item, destinationDir);
      const dataItem = this._findDataObject(item);
      this._deleteItem(item);
      array.push(dataItem);
    }));
    return deferreds;
  }
  copyItems(items, destinationDir) {
    const destinationDataItem = this._findDataObject(destinationDir);
    const array = this._getDirectoryDataItems(destinationDataItem);
    const deferreds = items.map(item => this._executeActionAsDeferred(() => {
      this._checkAbilityToMoveOrCopyItem(item, destinationDir);
      const dataItem = this._findDataObject(item);
      const copiedItem = this._createCopy(dataItem);
      array.push(copiedItem);
    }));
    return deferreds;
  }
  uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
    if (chunksInfo.chunkIndex > 0) {
      return chunksInfo.customData.deferred;
    }
    this._validateDirectoryExists(destinationDirectory);
    const deferred = chunksInfo.customData.deferred = new _deferred.Deferred();
    const reader = this._createFileReader();
    reader.readAsDataURL(fileData);
    reader.onload = () => {
      const content = reader.result.split(',')[1];
      const dataObj = this._createDataObject(destinationDirectory, fileData.name, false);
      this._sizeSetter(dataObj, fileData.size);
      this._dateModifiedSetter(dataObj, fileData.lastModifiedDate);
      this._contentSetter(dataObj, content);
      deferred.resolve();
    };
    reader.onerror = error => deferred.reject(error);
    return deferred;
  }
  downloadItems(items) {
    if (items.length === 1) {
      this._downloadSingleFile(items[0]);
    } else {
      this._downloadMultipleFiles(items);
    }
  }
  _downloadSingleFile(file) {
    const content = this._getFileContent(file);
    const byteString = window.atob(content);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      array[i] = byteString.charCodeAt(i);
    }
    const blob = new window.Blob([arrayBuffer], {
      type: 'application/octet-stream'
    });
    _file_saver.fileSaver.saveAs(file.name, null, blob);
  }
  _downloadMultipleFiles(files) {
    const jsZip = getJSZip();
    const zip = new jsZip();
    files.forEach(file => zip.file(file.name, this._getFileContent(file), {
      base64: true
    }));
    const options = {
      type: 'blob',
      compression: 'DEFLATE',
      mimeType: 'application/zip'
    };
    const deferred = new _deferred.Deferred();
    if (zip.generateAsync) {
      zip.generateAsync(options).then(deferred.resolve);
    } else {
      deferred.resolve(zip.generate(options));
    }
    deferred.done(blob => _file_saver.fileSaver.saveAs('files.zip', null, blob));
  }
  _getFileContent(file) {
    const dataItem = this._findDataObject(file);
    return this._contentGetter(dataItem) || '';
  }
  _validateDirectoryExists(directoryInfo) {
    if (!this._isFileItemExists(directoryInfo) || this._isDirGetter(directoryInfo.fileItem)) {
      throw new _error.default(_error_codes.default.DirectoryNotFound, directoryInfo);
    }
  }
  _checkAbilityToMoveOrCopyItem(item, destinationDir) {
    const dataItem = this._findDataObject(item);
    const itemKey = this._getKeyFromDataObject(dataItem, item.parentPath);
    const pathInfo = destinationDir.getFullPathInfo();
    let currentPath = '';
    pathInfo.forEach(info => {
      currentPath = (0, _utils.pathCombine)(currentPath, info.name);
      const pathKey = this._getDataObjectKey(info.key, currentPath);
      if (pathKey === itemKey) {
        throw new _error.default(_error_codes.default.Other, item);
      }
    });
  }
  _createDataObject(parentDir, name, isDirectory) {
    const dataObj = {};
    this._nameSetter(dataObj, name);
    this._getIsDirSetter(dataObj, isDirectory);
    this._keySetter(dataObj, String(new _common2.Guid()));
    const parentDataItem = this._findDataObject(parentDir);
    const array = this._getDirectoryDataItems(parentDataItem);
    array.push(dataObj);
    return dataObj;
  }
  _createCopy(dataObj) {
    const copyObj = {};
    this._nameSetter(copyObj, this._nameGetter(dataObj));
    this._getIsDirSetter(copyObj, this._isDirGetter(dataObj));
    const items = this._subFileItemsGetter(dataObj);
    if (Array.isArray(items)) {
      const itemsCopy = [];
      items.forEach(childItem => {
        const childCopy = this._createCopy(childItem);
        itemsCopy.push(childCopy);
      });
      this._subFileItemsSetter(copyObj, itemsCopy);
    }
    return copyObj;
  }
  _deleteItem(fileItem) {
    const dataItem = this._findDataObject(fileItem);
    const parentDirDataObj = this._findFileItemObj(fileItem.pathInfo);
    const array = this._getDirectoryDataItems(parentDirDataObj);
    const index = array.indexOf(dataItem);
    array.splice(index, 1);
  }
  _getDirectoryDataItems(directoryDataObj) {
    if (!directoryDataObj) {
      return this._data;
    }
    let dataItems = this._subFileItemsGetter(directoryDataObj);
    if (!Array.isArray(dataItems)) {
      dataItems = [];
      this._subFileItemsSetter(directoryDataObj, dataItems);
    }
    return dataItems;
  }
  _getItems(parentDir) {
    this._validateDirectoryExists(parentDir);
    const pathInfo = parentDir.getFullPathInfo();
    const parentDirKey = pathInfo && pathInfo.length > 0 ? pathInfo[pathInfo.length - 1].key : null;
    let dirFileObjects = this._data;
    if (parentDirKey) {
      const directoryEntry = this._findFileItemObj(pathInfo);
      dirFileObjects = directoryEntry && this._subFileItemsGetter(directoryEntry) || [];
    }
    this._ensureKeysForDuplicateNameItems(dirFileObjects);
    return this._convertDataObjectsToFileItems(dirFileObjects, pathInfo);
  }
  _ensureKeysForDuplicateNameItems(dataObjects) {
    const names = {};
    dataObjects.forEach(obj => {
      const name = this._nameGetter(obj);
      if (names[name]) {
        this._ensureDataObjectKey(obj);
      } else {
        names[name] = true;
      }
    });
  }
  _findDataObject(item) {
    if (item.isRoot()) {
      return null;
    }
    const result = this._findFileItemObj(item.getFullPathInfo());
    if (!result) {
      const errorCode = item.isDirectory ? _error_codes.default.DirectoryNotFound : _error_codes.default.FileNotFound;
      throw new _error.default(errorCode, item);
    }
    return result;
  }
  _findFileItemObj(pathInfo) {
    if (!Array.isArray(pathInfo)) {
      pathInfo = [];
    }
    let currentPath = '';
    let fileItemObj = null;
    let fileItemObjects = this._data;
    for (let i = 0; i < pathInfo.length && (i === 0 || fileItemObj); i++) {
      fileItemObj = fileItemObjects.find(item => {
        const hasCorrectFileItemType = this._isDirGetter(item) || i === pathInfo.length - 1;
        return this._getKeyFromDataObject(item, currentPath) === pathInfo[i].key && this._nameGetter(item) === pathInfo[i].name && hasCorrectFileItemType;
      });
      if (fileItemObj) {
        currentPath = (0, _utils.pathCombine)(currentPath, this._nameGetter(fileItemObj));
        fileItemObjects = this._subFileItemsGetter(fileItemObj);
      }
    }
    return fileItemObj;
  }
  _getKeyFromDataObject(dataObj, defaultKeyPrefix) {
    const key = this._keyGetter(dataObj);
    const relativeName = (0, _utils.pathCombine)(defaultKeyPrefix, this._nameGetter(dataObj));
    return this._getDataObjectKey(key, relativeName);
  }
  _getDataObjectKey(key, relativeName) {
    return key ? key : relativeName;
  }
  _ensureDataObjectKey(dataObj) {
    let key = this._keyGetter(dataObj);
    if (!key) {
      key = String(new _common2.Guid());
      this._keySetter(dataObj, key);
    }
    return key;
  }
  _hasSubDirs(dataObj) {
    const subItems = (0, _common.ensureDefined)(this._subFileItemsGetter(dataObj), []);
    if (!Array.isArray(subItems)) {
      return true;
    }
    for (let i = 0; i < subItems.length; i++) {
      if (this._isDirGetter(subItems[i]) === true) {
        return true;
      }
    }
    return false;
  }
  _getSetter(expr) {
    return (0, _type.isFunction)(expr) ? expr : (0, _data.compileSetter)(expr);
  }
  _isFileItemExists(fileItem) {
    return fileItem.isDirectory && fileItem.isRoot() || !!this._findFileItemObj(fileItem.getFullPathInfo());
  }
  _createFileReader() {
    return new window.FileReader();
  }
}
function getJSZip() {
  if (!_jszip.default) {
    throw _ui.default.Error('E1041', 'JSZip');
  }
  return _jszip.default;
}
var _default = exports.default = ObjectFileSystemProvider;
module.exports = exports.default;
module.exports.default = exports.default;
