/**
* DevExtreme (cjs/__internal/file_management/object_provider.js)
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
var _common = require("../../common");
var _errors = require("../../common/data/errors");
var _common2 = require("../../core/utils/common");
var _data = require("../../core/utils/data");
var _deferred = require("../../core/utils/deferred");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _file_saver = require("../exporter/file_saver");
var _error = _interopRequireDefault(require("../file_management/error"));
var _error_codes = _interopRequireDefault(require("../file_management/error_codes"));
var _provider_base = _interopRequireDefault(require("../file_management/provider_base"));
var _utils = require("../file_management/utils");
var _jszip = _interopRequireDefault(require("jszip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getJSZip() {
  if (!_jszip.default) {
    throw _ui.default.Error('E1041', 'JSZip');
  }
  return _jszip.default;
}
class ObjectFileSystemProvider extends _provider_base.default {
  constructor(options) {
    // eslint-disable-next-line no-param-reassign
    options = (0, _common2.ensureDefined)(options, {});
    super(options);
    const initialArray = options.data;
    if (initialArray && !Array.isArray(initialArray)) {
      throw _errors.errors.Error('E4006');
    }
    const itemsExpr = options.itemsExpr ?? 'items';
    // @ts-expect-error ts-error
    this._subFileItemsGetter = (0, _data.compileGetter)(itemsExpr);
    this._subFileItemsSetter = this._getSetter(itemsExpr);
    const contentExpr = options.contentExpr ?? 'content';
    // @ts-expect-error ts-error
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
    this._data = initialArray ?? [];
  }
  getItems(parentDirectory) {
    return this._executeActionAsDeferred(() => this._getItems(parentDirectory), true);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createDirectory(parentDirectory, name) {
    return this._executeActionAsDeferred(() => {
      this._validateDirectoryExists(parentDirectory);
      this._createDataObject(parentDirectory, name, true);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteItems(items) {
    return items.map(item => this._executeActionAsDeferred(() => this._deleteItem(item)));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moveItems(items, destinationDirectory) {
    const destinationDataItem = this._findDataObject(destinationDirectory);
    const array = this._getDirectoryDataItems(destinationDataItem);
    return items.map(item => this._executeActionAsDeferred(() => {
      this._checkAbilityToMoveOrCopyItem(item, destinationDirectory);
      const dataItem = this._findDataObject(item);
      this._deleteItem(item);
      array.push(dataItem);
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyItems(items, destinationDirectory) {
    const destinationDataItem = this._findDataObject(destinationDirectory);
    const array = this._getDirectoryDataItems(destinationDataItem);
    return items.map(item => this._executeActionAsDeferred(() => {
      this._checkAbilityToMoveOrCopyItem(item, destinationDirectory);
      const dataItem = this._findDataObject(item);
      const copiedItem = this._createCopy(dataItem);
      array.push(copiedItem);
    }));
  }
  uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
    if (chunksInfo.chunkIndex > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return chunksInfo.customData.deferred;
    }
    this._validateDirectoryExists(destinationDirectory);
    // @ts-expect-error ts-error
    // eslint-disable-next-line no-multi-assign
    const deferred = chunksInfo.customData.deferred = new _deferred.Deferred();
    const reader = this._createFileReader();
    reader.readAsDataURL(fileData);
    reader.onload = () => {
      const content = reader.result.split(',')[1];
      const dataObj = this._createDataObject(destinationDirectory, fileData.name, false);
      this._sizeSetter(dataObj, fileData.size);
      this._dateModifiedSetter(dataObj, fileData.lastModified);
      this._contentSetter(dataObj, content);
      deferred.resolve();
    };
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/explicit-function-return-type
    reader.onerror = error => deferred.reject(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    for (let i = 0; i < byteString.length; i += 1) {
      array[i] = byteString.charCodeAt(i);
    }
    // @ts-expect-error ts-error
    const blob = new window.Blob([arrayBuffer], {
      type: 'application/octet-stream'
    });
    _file_saver.fileSaver.saveAs(file.name, null, blob);
  }
  _downloadMultipleFiles(files) {
    const jsZip = getJSZip();
    // eslint-disable-next-line new-cap
    const zip = new jsZip();
    files.forEach(file => zip.file(file.name, this._getFileContent(file), {
      base64: true
    }));
    const options = {
      type: 'blob',
      compression: 'DEFLATE',
      mimeType: 'application/zip'
    };
    // @ts-expect-error ts-error
    const deferred = new _deferred.Deferred();
    if (zip.generateAsync) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      zip.generateAsync(options).then(deferred.resolve);
    } else {
      // @ts-expect-error ts-error
      deferred.resolve(zip.generate(options));
    }
    deferred.done(blob => _file_saver.fileSaver.saveAs('files.zip', null, blob));
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _getFileContent(file) {
    const dataItem = this._findDataObject(file);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._contentGetter(dataItem) || '';
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _validateDirectoryExists(directoryInfo) {
    var _this$_isDirGetter;
    if (!this._isFileItemExists(directoryInfo) || (_this$_isDirGetter = this._isDirGetter) !== null && _this$_isDirGetter !== void 0 && _this$_isDirGetter.call(this, directoryInfo.fileItem)) {
      throw new _error.default(_error_codes.default.DirectoryNotFound, directoryInfo);
    }
  }
  _checkAbilityToMoveOrCopyItem(item, destinationDirectory) {
    const dataItem = this._findDataObject(item);
    const itemKey = this._getKeyFromDataObject(dataItem, item.parentPath);
    const pathInfo = destinationDirectory.getFullPathInfo();
    let currentPath = '';
    pathInfo.forEach(info => {
      currentPath = (0, _utils.pathCombine)(currentPath, info.name);
      const pathKey = this._getDataObjectKey(info.key, currentPath);
      if (pathKey === itemKey) {
        throw new _error.default(_error_codes.default.Other, item);
      }
    });
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _createDataObject(parentDirectory, name, isDirectory) {
    const dataObj = {};
    this._nameSetter(dataObj, name);
    this._getIsDirSetter(dataObj, isDirectory);
    this._keySetter(dataObj, String(new _common.Guid()));
    const parentDataItem = this._findDataObject(parentDirectory);
    const array = this._getDirectoryDataItems(parentDataItem);
    array.push(dataObj);
    return dataObj;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
  _createCopy(dataObj) {
    var _this$_nameGetter, _this$_isDirGetter2;
    const copyObj = {};
    this._nameSetter(copyObj, (_this$_nameGetter = this._nameGetter) === null || _this$_nameGetter === void 0 ? void 0 : _this$_nameGetter.call(this, dataObj));
    this._getIsDirSetter(copyObj, (_this$_isDirGetter2 = this._isDirGetter) === null || _this$_isDirGetter2 === void 0 ? void 0 : _this$_isDirGetter2.call(this, dataObj));
    const items = this._subFileItemsGetter(dataObj);
    if (Array.isArray(items)) {
      const itemsCopy = [];
      items.forEach(childItem => {
        const childCopy = this._createCopy(childItem);
        // @ts-expect-error ts-error
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
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
  _getDirectoryDataItems(directoryDataObj) {
    if (!directoryDataObj) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._data;
    }
    let dataItems = this._subFileItemsGetter(directoryDataObj);
    if (!Array.isArray(dataItems)) {
      dataItems = [];
      this._subFileItemsSetter(directoryDataObj, dataItems);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return dataItems;
  }
  _getItems(parentDirectory) {
    this._validateDirectoryExists(parentDirectory);
    const pathInfo = parentDirectory.getFullPathInfo();
    const parentDirKey = pathInfo && pathInfo.length > 0 ? pathInfo[pathInfo.length - 1].key : null;
    let dirFileObjects = this._data;
    if (parentDirKey) {
      const directoryEntry = this._findFileItemObj(pathInfo);
      // eslint-disable-next-line @stylistic/max-len
      // eslint-disable-next-line @stylistic/no-mixed-operators,@typescript-eslint/prefer-nullish-coalescing
      dirFileObjects = directoryEntry && this._subFileItemsGetter(directoryEntry) || [];
    }
    this._ensureKeysForDuplicateNameItems(dirFileObjects);
    return this._convertDataObjectsToFileItems(dirFileObjects, pathInfo);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _ensureKeysForDuplicateNameItems(dataObjects) {
    const names = {};
    dataObjects.forEach(obj => {
      var _this$_nameGetter2;
      const name = (_this$_nameGetter2 = this._nameGetter) === null || _this$_nameGetter2 === void 0 ? void 0 : _this$_nameGetter2.call(this, obj);
      if (names[name]) {
        this._ensureDataObjectKey(obj);
      } else {
        names[name] = true;
      }
    });
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
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
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
  _findFileItemObj(pathInfo) {
    if (!Array.isArray(pathInfo)) {
      // eslint-disable-next-line no-param-reassign
      pathInfo = [];
    }
    let currentPath = '';
    let fileItemObj = null;
    let fileItemObjects = this._data;
    for (let i = 0; i < pathInfo.length && (i === 0 || fileItemObj); i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      fileItemObj = fileItemObjects.find(item => {
        var _this$_isDirGetter3, _this$_nameGetter3;
        const hasCorrectFileItemType = ((_this$_isDirGetter3 = this._isDirGetter) === null || _this$_isDirGetter3 === void 0 ? void 0 : _this$_isDirGetter3.call(this, item)) || i === pathInfo.length - 1;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this._getKeyFromDataObject(item, currentPath) === pathInfo[i].key && ((_this$_nameGetter3 = this._nameGetter) === null || _this$_nameGetter3 === void 0 ? void 0 : _this$_nameGetter3.call(this, item)) === pathInfo[i].name && hasCorrectFileItemType;
      });
      if (fileItemObj) {
        var _this$_nameGetter4;
        currentPath = (0, _utils.pathCombine)(currentPath, (_this$_nameGetter4 = this._nameGetter) === null || _this$_nameGetter4 === void 0 ? void 0 : _this$_nameGetter4.call(this, fileItemObj));
        fileItemObjects = this._subFileItemsGetter(fileItemObj);
      }
    }
    return fileItemObj;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
  _getKeyFromDataObject(dataObj, defaultKeyPrefix) {
    var _this$_keyGetter, _this$_nameGetter5;
    const key = (_this$_keyGetter = this._keyGetter) === null || _this$_keyGetter === void 0 ? void 0 : _this$_keyGetter.call(this, dataObj);
    const relativeName = (0, _utils.pathCombine)(defaultKeyPrefix, (_this$_nameGetter5 = this._nameGetter) === null || _this$_nameGetter5 === void 0 ? void 0 : _this$_nameGetter5.call(this, dataObj));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getDataObjectKey(key, relativeName);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
  _getDataObjectKey(key, relativeName) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return key || relativeName;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
  _ensureDataObjectKey(dataObj) {
    var _this$_keyGetter2;
    let key = (_this$_keyGetter2 = this._keyGetter) === null || _this$_keyGetter2 === void 0 ? void 0 : _this$_keyGetter2.call(this, dataObj);
    if (!key) {
      key = String(new _common.Guid());
      this._keySetter(dataObj, key);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return key;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _hasSubDirs(dataObj) {
    const subItems = (0, _common2.ensureDefined)(this._subFileItemsGetter(dataObj), []);
    if (!Array.isArray(subItems)) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < subItems.length; i += 1) {
      var _this$_isDirGetter4;
      if (((_this$_isDirGetter4 = this._isDirGetter) === null || _this$_isDirGetter4 === void 0 ? void 0 : _this$_isDirGetter4.call(this, subItems[i])) === true) {
        return true;
      }
    }
    return false;
  }
  _getSetter(expr) {
    // @ts-expect-error ts-error
    return (0, _type.isFunction)(expr) ? expr : (0, _data.compileSetter)(expr);
  }
  _isFileItemExists(fileItem) {
    return fileItem.isDirectory
    // eslint-disable-next-line @stylistic/no-mixed-operators
    && fileItem.isRoot()
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing,@stylistic/no-mixed-operators
    || !!this._findFileItemObj(fileItem.getFullPathInfo());
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _createFileReader() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new window.FileReader();
  }
}
var _default = exports.default = ObjectFileSystemProvider;
