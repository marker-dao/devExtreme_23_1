"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../core/utils/common");
var _data = require("../../core/utils/data");
var _type = require("../../core/utils/type");
var _provider_base = _interopRequireDefault(require("../file_management/provider_base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CustomFileSystemProvider extends _provider_base.default {
  constructor(options) {
    // eslint-disable-next-line no-param-reassign
    options = (0, _common.ensureDefined)(options, {});
    super(options);
    // @ts-expect-error ts-error
    this._hasSubDirsGetter = (0, _data.compileGetter)(options.hasSubDirectoriesExpr ?? 'hasSubDirectories');
    this._getItemsFunction = this._ensureFunction(options.getItems, () => []);
    this._renameItemFunction = this._ensureFunction(options.renameItem);
    this._createDirectoryFunction = this._ensureFunction(options.createDirectory);
    this._deleteItemFunction = this._ensureFunction(options.deleteItem);
    this._moveItemFunction = this._ensureFunction(options.moveItem);
    this._copyItemFunction = this._ensureFunction(options.copyItem);
    this._uploadFileChunkFunction = this._ensureFunction(options.uploadFileChunk);
    this._abortFileUploadFunction = this._ensureFunction(options.abortFileUpload);
    this._downloadItemsFunction = this._ensureFunction(options.downloadItems);
    this._getItemsContentFunction = this._ensureFunction(options.getItemsContent);
  }
  getItems(parentDirectory) {
    const pathInfo = parentDirectory.getFullPathInfo();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._executeActionAsDeferred(() => {
      var _this$_getItemsFuncti;
      return (_this$_getItemsFuncti = this._getItemsFunction) === null || _this$_getItemsFuncti === void 0 ? void 0 : _this$_getItemsFuncti.call(this, parentDirectory);
    }, true).then(dataItems => this._convertDataObjectsToFileItems(dataItems, pathInfo));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renameItem(item, name) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._executeActionAsDeferred(() => {
      var _this$_renameItemFunc;
      return (_this$_renameItemFunc = this._renameItemFunction) === null || _this$_renameItemFunc === void 0 ? void 0 : _this$_renameItemFunc.call(this, item, name);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createDirectory(parentDirectory, name) {
    return this._executeActionAsDeferred(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      var _this$_createDirector;
      return (_this$_createDirector = this._createDirectoryFunction) === null || _this$_createDirector === void 0 ? void 0 : _this$_createDirector.call(this, parentDirectory, name);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteItems(items) {
    return items.map(item => this._executeActionAsDeferred(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      var _this$_deleteItemFunc;
      return (_this$_deleteItemFunc = this._deleteItemFunction) === null || _this$_deleteItemFunc === void 0 ? void 0 : _this$_deleteItemFunc.call(this, item);
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moveItems(items, destinationDirectory) {
    return items.map(item => this._executeActionAsDeferred(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      var _this$_moveItemFuncti;
      return (_this$_moveItemFuncti = this._moveItemFunction) === null || _this$_moveItemFuncti === void 0 ? void 0 : _this$_moveItemFuncti.call(this, item, destinationDirectory);
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyItems(items, destinationFolder) {
    return items.map(item => this._executeActionAsDeferred(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      var _this$_copyItemFuncti;
      return (_this$_copyItemFuncti = this._copyItemFunction) === null || _this$_copyItemFuncti === void 0 ? void 0 : _this$_copyItemFuncti.call(this, item, destinationFolder);
    }));
  }
  uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
    return this._executeActionAsDeferred(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      var _this$_uploadFileChun;
      return (_this$_uploadFileChun = this._uploadFileChunkFunction) === null || _this$_uploadFileChun === void 0 ? void 0 : _this$_uploadFileChun.call(this, fileData, chunksInfo, destinationDirectory);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  abortFileUpload(fileData, chunksInfo, destinationDirectory) {
    return this._executeActionAsDeferred(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      var _this$_abortFileUploa;
      return (_this$_abortFileUploa = this._abortFileUploadFunction) === null || _this$_abortFileUploa === void 0 ? void 0 : _this$_abortFileUploa.call(this, fileData, chunksInfo, destinationDirectory);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  downloadItems(items) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._executeActionAsDeferred(() => {
      var _this$_downloadItemsF;
      return (_this$_downloadItemsF = this._downloadItemsFunction) === null || _this$_downloadItemsF === void 0 ? void 0 : _this$_downloadItemsF.call(this, items);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemsContent(items) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._executeActionAsDeferred(() => {
      var _this$_getItemsConten;
      return (_this$_getItemsConten = this._getItemsContentFunction) === null || _this$_getItemsConten === void 0 ? void 0 : _this$_getItemsConten.call(this, items);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _hasSubDirs(dataObj) {
    var _this$_hasSubDirsGett;
    const hasSubDirs = (_this$_hasSubDirsGett = this._hasSubDirsGetter) === null || _this$_hasSubDirsGett === void 0 ? void 0 : _this$_hasSubDirsGett.call(this, dataObj);
    return typeof hasSubDirs === 'boolean' ? hasSubDirs : true;
  }
  _getKeyExpr(options) {
    return options.keyExpr ?? 'key';
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  _ensureFunction(functionObject, defaultFunction) {
    // eslint-disable-next-line no-param-reassign
    defaultFunction = defaultFunction ?? _common.noop;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _type.isFunction)(functionObject) ? functionObject : defaultFunction;
  }
}
var _default = exports.default = CustomFileSystemProvider;