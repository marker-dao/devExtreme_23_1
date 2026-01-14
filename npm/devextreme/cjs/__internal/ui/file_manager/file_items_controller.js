/**
* DevExtreme (cjs/__internal/ui/file_manager/file_items_controller.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OPERATIONS = exports.FileItemsController = void 0;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _custom_provider = _interopRequireDefault(require("../../file_management/custom_provider"));
var _error = _interopRequireDefault(require("../../file_management/error"));
var _error_codes = _interopRequireDefault(require("../../file_management/error_codes"));
var _file_system_item = _interopRequireDefault(require("../../file_management/file_system_item"));
var _object_provider = _interopRequireDefault(require("../../file_management/object_provider"));
var _provider_base = _interopRequireDefault(require("../../file_management/provider_base"));
var _remote_provider = _interopRequireDefault(require("../../file_management/remote_provider"));
var _utils = require("../../file_management/utils");
var _uiFile_manager = require("../../ui/file_manager/ui.file_manager.common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file,@typescript-eslint/explicit-module-boundary-types */

const DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME = 'Files';
const OPERATIONS = exports.OPERATIONS = {
  NAVIGATION: 'navigation',
  REFRESH: 'refresh'
};
class FileSecurityController {
  constructor(options) {
    var _this$_allowedFileExt;
    const defaultOptions = {
      allowedFileExtensions: [],
      maxFileSize: 0
    };
    this._options = (0, _extend.extend)(defaultOptions, options);
    this._extensionsMap = {};
    (_this$_allowedFileExt = this._allowedFileExtensions) === null || _this$_allowedFileExt === void 0 || _this$_allowedFileExt.forEach(extension => {
      this._extensionsMap[extension.toUpperCase()] = true;
    });
  }
  getAllowedItems(items) {
    var _this$_allowedFileExt2;
    if (((_this$_allowedFileExt2 = this._allowedFileExtensions) === null || _this$_allowedFileExt2 === void 0 ? void 0 : _this$_allowedFileExt2.length) === 0) {
      return items;
    }
    return items.filter(
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    item => item.isDirectory || this._isValidExtension(item.name));
  }
  validateExtension(name) {
    if (!this._isValidExtension(name)) {
      throw new _error.default(_error_codes.default.WrongFileExtension);
    }
  }
  validateMaxFileSize(size) {
    if (this._maxFileSize && size > this._maxFileSize) {
      throw new _error.default(_error_codes.default.MaxFileSizeExceeded);
    }
  }
  _isValidExtension(name) {
    var _this$_allowedFileExt3;
    if (((_this$_allowedFileExt3 = this._allowedFileExtensions) === null || _this$_allowedFileExt3 === void 0 ? void 0 : _this$_allowedFileExt3.length) === 0) {
      return true;
    }
    const extension = (0, _utils.getFileExtension)(name).toUpperCase();
    return this._extensionsMap[extension];
  }
  get _allowedFileExtensions() {
    var _this$_options;
    return (_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.allowedFileExtensions;
  }
  get _maxFileSize() {
    var _this$_options2;
    return (_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.maxFileSize;
  }
}
class FileItemsController {
  constructor(options) {
    // eslint-disable-next-line no-param-reassign
    options = options || {};
    this._options = (0, _extend.extend)({}, options);
    this._isInitialized = false;
    this._dataLoading = false;
    this._dataLoadingDeferred = null;
    this._rootDirectoryInfo = this._createRootDirectoryInfo(options.rootText);
    this._currentDirectoryInfo = this._rootDirectoryInfo;
    this._defaultIconMap = this._createDefaultIconMap();
    this.startSingleLoad();
    this._setSecurityController();
    this._setProvider(options.fileProvider);
    this._initialize();
  }
  _initialize() {
    var _this$_options$curren;
    const result = (_this$_options$curren = this._options.currentPathKeys) !== null && _this$_options$curren !== void 0 && _this$_options$curren.length ? this.setCurrentPathByKeys(this._options.currentPathKeys) : this.setCurrentPath(this._options.currentPath);
    const completeInitialization = () => {
      this._isInitialized = true;
      this._raiseInitialized();
    };
    if (result) {
      (0, _deferred.when)(result).always(completeInitialization);
    } else {
      completeInitialization();
    }
  }
  _setSecurityController() {
    this._securityController = new FileSecurityController({
      allowedFileExtensions: this._options.allowedFileExtensions,
      maxFileSize: this._options.uploadMaxFileSize
    });
    this._resetState();
  }
  setAllowedFileExtensions(allowedFileExtensions) {
    if ((0, _type.isDefined)(allowedFileExtensions)) {
      this._options.allowedFileExtensions = allowedFileExtensions;
    }
    this._setSecurityController();
    this.refresh();
  }
  setUploadOptions(_ref) {
    let {
      maxFileSize,
      chunkSize
    } = _ref;
    if ((0, _type.isDefined)(chunkSize)) {
      this._options.uploadChunkSize = chunkSize;
    }
    if ((0, _type.isDefined)(maxFileSize)) {
      this._options.uploadMaxFileSize = maxFileSize;
      this._setSecurityController();
      this.refresh();
    }
  }
  _setProvider(fileProvider) {
    this._fileProvider = this._createFileProvider(fileProvider);
    this._resetState();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProvider(fileProvider, currentPathKeys) {
    if (!(0, _type.isDefined)(currentPathKeys)) {
      return this._updateProviderOnly(fileProvider);
    }
    return (0, _deferred.when)(this._getDirectoryByPathParts(this._rootDirectoryInfo, currentPathKeys, true)).then(newDirectory => {
      if (newDirectory !== this._rootDirectoryInfo) {
        this._resetCurrentDirectory();
      }
      this._setProvider(fileProvider);
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then(() => this.setCurrentPathByKeys(currentPathKeys));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _updateProviderOnly(fileProvider) {
    this._resetCurrentDirectory();
    this._setProvider(fileProvider);
    return (0, _deferred.when)(this.refresh());
  }
  _createFileProvider(fileProvider) {
    if (!fileProvider) {
      // eslint-disable-next-line no-param-reassign
      fileProvider = [];
    }
    if (Array.isArray(fileProvider)) {
      return new _object_provider.default({
        data: fileProvider
      });
    }
    if (fileProvider instanceof _provider_base.default) {
      return fileProvider;
    }
    switch (fileProvider.type) {
      case 'remote':
        return new _remote_provider.default(fileProvider);
      case 'custom':
        return new _custom_provider.default(fileProvider);
      default:
        break;
    }
    return new _object_provider.default(fileProvider);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setCurrentPath(path) {
    const pathParts = (0, _utils.getPathParts)(path);
    const rawPath = (0, _utils.pathCombine)(...pathParts);
    if (this.getCurrentDirectory().fileItem.relativeName === rawPath) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().resolve().promise();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._setCurrentDirectoryByPathParts(pathParts);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setCurrentPathByKeys(pathKeys) {
    if ((0, _common.equalByValue)(this.getCurrentDirectory().fileItem.pathKeys, pathKeys)) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().resolve().promise();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._setCurrentDirectoryByPathParts(pathKeys, true);
  }
  getCurrentPath() {
    let currentPath = '';
    let directory = this.getCurrentDirectory();
    while (directory && !directory.fileItem.isRoot()) {
      const escapedName = (0, _utils.getEscapedFileName)(directory.fileItem.name);
      currentPath = (0, _utils.pathCombine)(escapedName, currentPath);
      directory = directory.parentDirectory;
    }
    return currentPath;
  }
  getCurrentPathKeys() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.getCurrentDirectory().fileItem.pathKeys;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getCurrentDirectory() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._currentDirectoryInfo;
  }
  setCurrentDirectory(directoryInfo, checkActuality) {
    if (!directoryInfo) {
      return;
    }
    if (checkActuality) {
      // eslint-disable-next-line no-param-reassign
      directoryInfo = this._getActualDirectoryInfo(directoryInfo);
    }
    if (this._currentDirectoryInfo && this._currentDirectoryInfo === directoryInfo) {
      this._raisePathPotentiallyChanged();
      return;
    }
    const requireRaiseSelectedDirectory = this._currentDirectoryInfo.fileItem.key !== directoryInfo.fileItem.key;
    this._currentDirectoryInfo = directoryInfo;
    if (requireRaiseSelectedDirectory && this._isInitialized) {
      if (!this._dataLoading) {
        this._raiseDataLoading(OPERATIONS.NAVIGATION);
      }
      this._raiseSelectedDirectoryChanged(directoryInfo);
    }
  }
  _resetCurrentDirectory() {
    this._currentDirectoryInfo = this._rootDirectoryInfo;
  }
  getCurrentItems(onlyFiles) {
    return this._dataLoadingDeferred
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ? this._dataLoadingDeferred.then(() => this._getCurrentItemsInternal(onlyFiles)) : this._getCurrentItemsInternal(onlyFiles);
  }
  _getCurrentItemsInternal(onlyFiles) {
    const currentDirectory = this.getCurrentDirectory();
    const getItemsPromise = this.getDirectoryContents(currentDirectory);
    return getItemsPromise.then(items => {
      const separatedItems = this._separateItemsByType(items);
      currentDirectory.fileItem.hasSubDirectories = !!separatedItems.folders.length;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return onlyFiles ? separatedItems.files : items;
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getDirectories(parentDirectoryInfo, skipNavigationOnError) {
    return this.getDirectoryContents(parentDirectoryInfo, skipNavigationOnError).then(itemInfos => itemInfos.filter(info => info.fileItem.isDirectory));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _separateItemsByType(itemInfos) {
    const folders = [];
    const files = [];
    itemInfos.forEach(info => info.fileItem.isDirectory
    // @ts-expect-error ts-error
    ? folders.push(info)
    // @ts-expect-error ts-error
    : files.push(info));
    return {
      folders,
      files
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDirectoryContents(parentDirectoryInfo, skipNavigationOnError) {
    if (!parentDirectoryInfo) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().resolve([this._rootDirectoryInfo]).promise();
    }
    if (parentDirectoryInfo.itemsLoaded) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().resolve(parentDirectoryInfo.items).promise();
    }
    if (this._singleOperationLockId && parentDirectoryInfo.itemsSingleLoadErrorId === this._singleOperationLockId) {
      this._changeDirectoryOnError(parentDirectoryInfo, skipNavigationOnError, true);
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().reject().promise();
    }
    const dirKey = parentDirectoryInfo.getInternalKey();
    let loadItemsDeferred = this._loadedItems[dirKey];
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (loadItemsDeferred) {
      return loadItemsDeferred;
    }
    loadItemsDeferred = this._getFileItems(parentDirectoryInfo, skipNavigationOnError).then(fileItems => {
      // eslint-disable-next-line no-param-reassign
      fileItems = fileItems || [];
      parentDirectoryInfo.items = fileItems.map(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      fileItem => fileItem.isDirectory && this._createDirectoryInfo(fileItem, parentDirectoryInfo) || this._createFileInfo(fileItem, parentDirectoryInfo));
      parentDirectoryInfo.itemsLoaded = true;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return parentDirectoryInfo.items;
    }, () => {
      if (this._singleOperationLockId && parentDirectoryInfo.itemsSingleLoadErrorId !== this._singleOperationLockId) {
        parentDirectoryInfo.itemsSingleLoadErrorId = this._singleOperationLockId;
      }
      return [];
    });
    this._loadedItems[dirKey] = loadItemsDeferred;
    loadItemsDeferred.always(() => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._loadedItems[dirKey];
    });
    return loadItemsDeferred;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getFileItems(parentDirectoryInfo, skipNavigationOnError) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let loadItemsDeferred;
    try {
      var _this$_fileProvider;
      loadItemsDeferred = (_this$_fileProvider = this._fileProvider) === null || _this$_fileProvider === void 0 ? void 0 : _this$_fileProvider.getItems(parentDirectoryInfo.fileItem);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._handleItemLoadError(parentDirectoryInfo, error, skipNavigationOnError);
    }
    return (0, _deferred.when)(loadItemsDeferred).then(fileItems => {
      var _this$_securityContro;
      return (_this$_securityContro = this._securityController) === null || _this$_securityContro === void 0 ? void 0 : _this$_securityContro.getAllowedItems(fileItems);
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    errorInfo => this._handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError));
  }
  createDirectory(parentDirectoryInfo, name) {
    const parentDirItem = parentDirectoryInfo.fileItem;
    const tempDirInfo = this._createDirInfoByName(name, parentDirectoryInfo);
    const actionInfo = this._createEditActionInfo('create', tempDirInfo, parentDirectoryInfo);
    return this._processEditAction(actionInfo, args => {
      var _this$_editingEvents, _this$_editingEvents$;
      args.parentDirectory = parentDirItem;
      args.name = name;
      (_this$_editingEvents = this._editingEvents) === null || _this$_editingEvents === void 0 || (_this$_editingEvents$ = _this$_editingEvents.onDirectoryCreating) === null || _this$_editingEvents$ === void 0 || _this$_editingEvents$.call(_this$_editingEvents, args);
    },
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      var _this$_fileProvider2;
      return (_this$_fileProvider2 = this._fileProvider) === null || _this$_fileProvider2 === void 0 ? void 0 : _this$_fileProvider2.createDirectory(parentDirItem, name).done(info => {
        if (!parentDirItem.isRoot()) {
          parentDirItem.hasSubDirectories = true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return info;
      });
    }, () => {
      var _this$_editingEvents2, _this$_editingEvents3;
      const args = {
        parentDirectory: parentDirItem,
        name
      };
      (_this$_editingEvents2 = this._editingEvents) === null || _this$_editingEvents2 === void 0 || (_this$_editingEvents3 = _this$_editingEvents2.onDirectoryCreated) === null || _this$_editingEvents3 === void 0 || _this$_editingEvents3.call(_this$_editingEvents2, args);
    }, () => this._resetDirectoryState(parentDirectoryInfo, true));
  }
  renameItem(fileItemInfo, name) {
    const sourceItem = fileItemInfo.fileItem.createClone();
    const actionInfo = this._createEditActionInfo('rename', fileItemInfo, fileItemInfo.parentDirectory, {
      itemNewName: name
    });
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      var _this$_editingEvents4, _this$_editingEvents5;
      if (!itemInfo.fileItem.isDirectory) {
        var _this$_securityContro2;
        (_this$_securityContro2 = this._securityController) === null || _this$_securityContro2 === void 0 || _this$_securityContro2.validateExtension(name);
      }
      args.item = sourceItem;
      args.newName = name;
      (_this$_editingEvents4 = this._editingEvents) === null || _this$_editingEvents4 === void 0 || (_this$_editingEvents5 = _this$_editingEvents4.onItemRenaming) === null || _this$_editingEvents5 === void 0 || _this$_editingEvents5.call(_this$_editingEvents4, args);
    }, item => {
      var _this$_fileProvider3;
      return (_this$_fileProvider3 = this._fileProvider) === null || _this$_fileProvider3 === void 0 ? void 0 : _this$_fileProvider3.renameItem(item, name);
    }, () => {
      var _this$_editingEvents6, _this$_editingEvents7;
      const args = {
        sourceItem,
        itemName: name
      };
      (_this$_editingEvents6 = this._editingEvents) === null || _this$_editingEvents6 === void 0 || (_this$_editingEvents7 = _this$_editingEvents6.onItemRenamed) === null || _this$_editingEvents7 === void 0 || _this$_editingEvents7.call(_this$_editingEvents6, args);
    }, () => {
      const parentDirectory = this._getActualDirectoryInfo(fileItemInfo.parentDirectory);
      this._resetDirectoryState(parentDirectory);
      this.setCurrentDirectory(parentDirectory);
    });
  }
  moveItems(itemInfos, destinationDirectory) {
    const actionInfo = this._createEditActionInfo('move', itemInfos, destinationDirectory);
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      var _this$_editingEvents8, _this$_editingEvents9;
      args.item = itemInfo.fileItem;
      args.destinationDirectory = destinationDirectory.fileItem;
      (_this$_editingEvents8 = this._editingEvents) === null || _this$_editingEvents8 === void 0 || (_this$_editingEvents9 = _this$_editingEvents8.onItemMoving) === null || _this$_editingEvents9 === void 0 || _this$_editingEvents9.call(_this$_editingEvents8, args);
    }, item => {
      var _this$_fileProvider4;
      return (_this$_fileProvider4 = this._fileProvider) === null || _this$_fileProvider4 === void 0 ? void 0 : _this$_fileProvider4.moveItems([item], destinationDirectory.fileItem);
    }, itemInfo => {
      var _this$_editingEvents0, _this$_editingEvents1;
      const args = {
        sourceItem: itemInfo.fileItem,
        parentDirectory: destinationDirectory.fileItem,
        itemName: itemInfo.fileItem.name,
        itemPath: (0, _utils.pathCombine)(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
      };
      (_this$_editingEvents0 = this._editingEvents) === null || _this$_editingEvents0 === void 0 || (_this$_editingEvents1 = _this$_editingEvents0.onItemMoved) === null || _this$_editingEvents1 === void 0 || _this$_editingEvents1.call(_this$_editingEvents0, args);
    }, needChangeCurrentDirectory => {
      itemInfos.forEach(itemInfo => this._resetDirectoryState(itemInfo.parentDirectory, true));
      if (needChangeCurrentDirectory) {
        this._resetDirectoryState(destinationDirectory);
        this.setCurrentPathByKeys(destinationDirectory.fileItem.pathKeys);
        destinationDirectory.expanded = true;
      }
    });
  }
  copyItems(itemInfos, destinationDirectory) {
    const actionInfo = this._createEditActionInfo('copy', itemInfos, destinationDirectory);
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      var _this$_editingEvents10, _this$_editingEvents11;
      args.item = itemInfo.fileItem;
      args.destinationDirectory = destinationDirectory.fileItem;
      (_this$_editingEvents10 = this._editingEvents) === null || _this$_editingEvents10 === void 0 || (_this$_editingEvents11 = _this$_editingEvents10.onItemCopying) === null || _this$_editingEvents11 === void 0 || _this$_editingEvents11.call(_this$_editingEvents10, args);
    }, item => {
      var _this$_fileProvider5;
      return (_this$_fileProvider5 = this._fileProvider) === null || _this$_fileProvider5 === void 0 ? void 0 : _this$_fileProvider5.copyItems([item], destinationDirectory.fileItem);
    }, itemInfo => {
      var _this$_editingEvents12, _this$_editingEvents13;
      const args = {
        sourceItem: itemInfo.fileItem,
        parentDirectory: destinationDirectory.fileItem,
        itemName: itemInfo.fileItem.name,
        itemPath: (0, _utils.pathCombine)(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
      };
      (_this$_editingEvents12 = this._editingEvents) === null || _this$_editingEvents12 === void 0 || (_this$_editingEvents13 = _this$_editingEvents12.onItemCopied) === null || _this$_editingEvents13 === void 0 || _this$_editingEvents13.call(_this$_editingEvents12, args);
    }, needChangeCurrentDirectory => {
      if (needChangeCurrentDirectory) {
        // eslint-disable-next-line no-param-reassign
        destinationDirectory = this._getActualDirectoryInfo(destinationDirectory);
        this._resetDirectoryState(destinationDirectory);
        this.setCurrentDirectory(destinationDirectory);
        destinationDirectory.expanded = true;
      }
    });
  }
  deleteItems(itemInfos) {
    const directory = itemInfos.length > 0 ? itemInfos[0].parentDirectory : null;
    const actionInfo = this._createEditActionInfo('delete', itemInfos, directory);
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      var _this$_editingEvents14, _this$_editingEvents15;
      args.item = itemInfo.fileItem;
      (_this$_editingEvents14 = this._editingEvents) === null || _this$_editingEvents14 === void 0 || (_this$_editingEvents15 = _this$_editingEvents14.onItemDeleting) === null || _this$_editingEvents15 === void 0 || _this$_editingEvents15.call(_this$_editingEvents14, args);
    }, item => {
      var _this$_fileProvider6;
      return (_this$_fileProvider6 = this._fileProvider) === null || _this$_fileProvider6 === void 0 ? void 0 : _this$_fileProvider6.deleteItems([item]);
    }, itemInfo => {
      var _this$_editingEvents16, _this$_editingEvents17;
      return (_this$_editingEvents16 = this._editingEvents) === null || _this$_editingEvents16 === void 0 || (_this$_editingEvents17 = _this$_editingEvents16.onItemDeleted) === null || _this$_editingEvents17 === void 0 ? void 0 : _this$_editingEvents17.call(_this$_editingEvents16, {
        item: itemInfo.fileItem
      });
    }, () => {
      itemInfos.forEach(itemInfo => {
        const parentDir = this._getActualDirectoryInfo(itemInfo.parentDirectory);
        this._resetDirectoryState(parentDir);
        this.setCurrentDirectory(parentDir);
      });
    });
  }
  processUploadSession(sessionInfo, uploadDirectoryInfo) {
    const itemInfos = this._getItemInfosForUploaderFiles(sessionInfo.files, uploadDirectoryInfo);
    const actionInfo = this._createEditActionInfo('upload', itemInfos, uploadDirectoryInfo, {
      sessionInfo
    });
    return this._processEditAction(actionInfo, () => {},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (_, index) => sessionInfo.deferreds[index], () => {}, () => this._resetDirectoryState(uploadDirectoryInfo, true));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
    var _startDeferred;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let startDeferred;
    if (chunksInfo.chunkIndex === 0) {
      var _this$_securityContro3, _this$_securityContro4;
      (_this$_securityContro3 = this._securityController) === null || _this$_securityContro3 === void 0 || _this$_securityContro3.validateMaxFileSize(fileData.size);
      (_this$_securityContro4 = this._securityController) === null || _this$_securityContro4 === void 0 || _this$_securityContro4.validateExtension(fileData.name);
      startDeferred = this._processBeforeItemEditAction(args => {
        var _this$_editingEvents18, _this$_editingEvents19;
        args.fileData = fileData;
        args.destinationDirectory = destinationDirectory;
        (_this$_editingEvents18 = this._editingEvents) === null || _this$_editingEvents18 === void 0 || (_this$_editingEvents19 = _this$_editingEvents18.onFileUploading) === null || _this$_editingEvents19 === void 0 || _this$_editingEvents19.call(_this$_editingEvents18, args);
      });
    } else {
      // @ts-expect-error ts-error
      startDeferred = new _deferred.Deferred().resolve().promise();
    }
    let result = (_startDeferred = startDeferred) === null || _startDeferred === void 0 ? void 0 : _startDeferred.then(() => {
      var _this$_fileProvider7;
      return (_this$_fileProvider7 = this._fileProvider) === null || _this$_fileProvider7 === void 0 ? void 0 : _this$_fileProvider7.uploadFileChunk(fileData, chunksInfo, destinationDirectory);
    });
    if (chunksInfo.chunkIndex === chunksInfo.chunkCount - 1) {
      result = result.done(() => {
        var _this$_editingEvents20, _this$_editingEvents21;
        const args = {
          fileData,
          parentDirectory: destinationDirectory
        };
        (_this$_editingEvents20 = this._editingEvents) === null || _this$_editingEvents20 === void 0 || (_this$_editingEvents21 = _this$_editingEvents20.onFileUploaded) === null || _this$_editingEvents21 === void 0 || _this$_editingEvents21.call(_this$_editingEvents20, args);
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  abortFileUpload(fileData, chunksInfo, destinationDirectory) {
    var _this$_fileProvider8;
    return (0, _deferred.when)((_this$_fileProvider8 = this._fileProvider) === null || _this$_fileProvider8 === void 0 ? void 0 : _this$_fileProvider8.abortFileUpload(fileData, chunksInfo, destinationDirectory));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getFileUploadChunkSize() {
    var _this$_fileProvider9;
    const chunkSize = this._options.uploadChunkSize;
    if (chunkSize && chunkSize > 0) {
      return chunkSize;
    }
    return (_this$_fileProvider9 = this._fileProvider) === null || _this$_fileProvider9 === void 0 ? void 0 : _this$_fileProvider9.getFileUploadChunkSize();
  }
  downloadItems(itemInfos) {
    const deferreds = itemInfos.map(itemInfo => this._processBeforeItemEditAction(args => {
      var _this$_editingEvents22, _this$_editingEvents23;
      args.item = itemInfo.fileItem;
      (_this$_editingEvents22 = this._editingEvents) === null || _this$_editingEvents22 === void 0 || (_this$_editingEvents23 = _this$_editingEvents22.onItemDownloading) === null || _this$_editingEvents23 === void 0 || _this$_editingEvents23.call(_this$_editingEvents22, args);
    }, itemInfo));
    return (0, _deferred.when)(...deferreds).then(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    () => {
      var _this$_fileProvider0;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      const items = itemInfos.map(i => i.fileItem);
      return (0, _deferred.when)(this._getItemActionResult((_this$_fileProvider0 = this._fileProvider) === null || _this$_fileProvider0 === void 0 ? void 0 : _this$_fileProvider0.downloadItems(items))).then(() => {}, errorInfo => {
        this._raiseDownloadItemsError(itemInfos, itemInfos[0].parentDirectory, errorInfo);
      });
    }, errorInfo => {
      this._raiseDownloadItemsError(itemInfos, itemInfos[0].parentDirectory, errorInfo);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getItemContent(itemInfos) {
    var _this$_fileProvider1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const items = itemInfos.map(i => i.fileItem);
    return (0, _deferred.when)((_this$_fileProvider1 = this._fileProvider) === null || _this$_fileProvider1 === void 0 ? void 0 : _this$_fileProvider1.getItemsContent(items));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError) {
    // eslint-disable-next-line no-param-reassign
    parentDirectoryInfo = this._getActualDirectoryInfo(parentDirectoryInfo);
    this._raiseGetItemsError(parentDirectoryInfo, errorInfo);
    this._changeDirectoryOnError(parentDirectoryInfo, skipNavigationOnError);
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new _deferred.Deferred().reject().promise();
  }
  _raiseGetItemsError(parentDirectoryInfo, errorInfo) {
    const actionInfo = this._createEditActionInfo('getItems', parentDirectoryInfo, parentDirectoryInfo);
    this._raiseEditActionStarting(actionInfo);
    this._raiseEditActionResultAcquired(actionInfo);
    this._raiseEditActionError(actionInfo, {
      errorCode: errorInfo.errorCode,
      errorText: errorInfo.errorText,
      fileItem: parentDirectoryInfo.fileItem,
      index: 0
    });
  }
  _raiseDownloadItemsError(targetFileInfos, directory, errorInfo) {
    const actionInfo = this._createEditActionInfo('download', targetFileInfos, directory);
    const itemsLength = targetFileInfos.length;
    actionInfo.singleRequest = itemsLength === 1;
    this._raiseEditActionStarting(actionInfo);
    this._raiseEditActionResultAcquired(actionInfo);
    for (let index = 0; index < itemsLength - 1; index += 1) {
      this._raiseEditActionItemError(actionInfo, {
        errorCode: errorInfo.errorCode,
        errorText: errorInfo.errorText,
        fileItem: targetFileInfos[index].fileItem,
        index
      });
    }
    this._raiseEditActionError(actionInfo, {
      errorCode: errorInfo.errorCode,
      errorText: errorInfo.errorText,
      fileItem: targetFileInfos[itemsLength - 1].fileItem,
      index: itemsLength - 1
    });
  }
  _changeDirectoryOnError(dirInfo, skipNavigationOnError, isActualDirectoryRequired) {
    if (isActualDirectoryRequired) {
      // eslint-disable-next-line no-param-reassign
      dirInfo = this._getActualDirectoryInfo(dirInfo);
    }
    this._resetDirectoryState(dirInfo);
    dirInfo.expanded = false;
    if (!skipNavigationOnError) {
      this.setCurrentDirectory(dirInfo.parentDirectory);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemActionResult(actionResult) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Array.isArray(actionResult) ? actionResult[0] : actionResult;
  }
  _processEditAction(actionInfo, beforeAction, action, afterAction, completeAction) {
    let isAnyOperationSuccessful = false;
    this._raiseEditActionStarting(actionInfo);
    const actionResult = actionInfo.itemInfos.map((itemInfo, itemIndex) => this._processBeforeItemEditAction(beforeAction, itemInfo).then(() => {
      const itemActionResult = this._getItemActionResult(action(itemInfo.fileItem, itemIndex));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return itemActionResult.done(() => afterAction(itemInfo));
    }));
    actionInfo.singleRequest = actionResult.length === 1;
    this._raiseEditActionResultAcquired(actionInfo);
    return (0, _uiFile_manager.whenSome)(actionResult, info => {
      isAnyOperationSuccessful = true;
      this._raiseCompleteEditActionItem(actionInfo, info);
    }, errorInfo => this._raiseEditActionItemError(actionInfo, errorInfo)).then(() => {
      completeAction(isAnyOperationSuccessful);
      this._raiseCompleteEditAction(actionInfo);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createEditActionInfo(name, targetItemInfos, directory, customData) {
    // eslint-disable-next-line no-param-reassign
    targetItemInfos = Array.isArray(targetItemInfos) ? targetItemInfos : [targetItemInfos];
    // eslint-disable-next-line no-param-reassign
    customData = customData || {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const items = targetItemInfos.map(itemInfo => itemInfo.fileItem);
    return {
      name,
      itemInfos: targetItemInfos,
      items,
      directory,
      customData,
      singleRequest: true
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _processBeforeItemEditAction(action, itemInfo) {
    // @ts-expect-error ts-error
    const deferred = new _deferred.Deferred();
    const args = this._createBeforeActionArgs();
    try {
      action(args, itemInfo);
    } catch (errorInfo) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return deferred.reject(errorInfo).promise();
    }
    if (!args.cancel) {
      deferred.resolve();
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    } else if (args.cancel === true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return deferred.reject({
        errorText: args.errorText,
        errorCode: args.errorCode
      });
    } else if ((0, _type.isPromise)(args.cancel)) {
      (0, _deferred.when)(args.cancel).then(res => {
        if (res === true) {
          deferred.reject();
          // @ts-expect-error ts-error
        } else if ((0, _type.isObject)(res) && res.cancel === true) {
          deferred.reject({
            // @ts-expect-error ts-error
            errorText: res.errorText,
            // @ts-expect-error ts-error
            errorCode: res.errorCode
          });
        }
        deferred.resolve();
      }, deferred.resolve);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deferred.promise();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createBeforeActionArgs() {
    return {
      errorCode: undefined,
      errorText: '',
      cancel: false
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemInfosForUploaderFiles(files, parentDirectoryInfo) {
    const pathInfo = this._getPathInfo(parentDirectoryInfo);
    const result = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const item = new _file_system_item.default(pathInfo, file.name, false);
      const itemInfo = this._createFileInfo(item, parentDirectoryInfo);
      // @ts-expect-error ts-error
      result.push(itemInfo);
    }
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  refresh() {
    if (this._lockRefresh) {
      return this._refreshDeferred;
    }
    this._lockRefresh = true;
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,no-return-assign,@stylistic/max-len
    return this._executeDataLoad(() => this._refreshDeferred = this._refreshInternal(), OPERATIONS.REFRESH);
  }
  startSingleLoad() {
    this._singleOperationLockId = new _guid.default().toString();
  }
  endSingleLoad() {
    delete this._singleOperationLockId;
  }
  _refreshInternal() {
    const cachedRootInfo = {
      items: this._rootDirectoryInfo.items
    };
    const selectedKeyParts = this._getDirectoryPathKeyParts(this.getCurrentDirectory());
    this._resetDirectoryState(this._rootDirectoryInfo);
    return this._loadItemsRecursive(this._rootDirectoryInfo, cachedRootInfo).then(() => {
      const dirInfo = this._findDirectoryByPathKeyParts(selectedKeyParts);
      this.setCurrentDirectory(dirInfo);
      delete this._lockRefresh;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _loadItemsRecursive(directoryInfo, cachedDirectoryInfo) {
    return this.getDirectories(directoryInfo).then(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    dirInfos => {
      const itemDeferreds = [];
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < dirInfos.length; i += 1) {
        const cachedItem = cachedDirectoryInfo.items.find(cache => dirInfos[i].fileItem.key === cache.fileItem.key);
        // eslint-disable-next-line no-continue
        if (!cachedItem) continue;
        dirInfos[i].expanded = cachedItem.expanded;
        if (dirInfos[i].expanded) {
          itemDeferreds.push(
          // @ts-expect-error ts-error
          this._loadItemsRecursive(dirInfos[i], cachedItem));
        }
      }
      return (0, _uiFile_manager.whenSome)(itemDeferreds);
    }, () => null);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _setCurrentDirectoryByPathParts(pathParts, useKeys) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._executeDataLoad(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => this._setCurrentDirectoryByPathPartsInternal(pathParts, useKeys), OPERATIONS.NAVIGATION);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _setCurrentDirectoryByPathPartsInternal(pathParts, useKeys) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getDirectoryByPathParts(this._rootDirectoryInfo, pathParts, useKeys).then(directoryInfo => {
      for (let info = directoryInfo.parentDirectory; info; info = info.parentDirectory) {
        info.expanded = true;
      }
      this.setCurrentDirectory(directoryInfo);
    }, () => {
      this._raisePathPotentiallyChanged();
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _executeDataLoad(action, operation) {
    if (this._dataLoadingDeferred) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._dataLoadingDeferred.then(() => this._executeDataLoad(action, operation));
    }
    this._dataLoading = true;
    // @ts-expect-error ts-error
    this._dataLoadingDeferred = new _deferred.Deferred();
    if (this._isInitialized) {
      this._raiseDataLoading(operation);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return action().always(() => {
      const tempDeferred = this._dataLoadingDeferred;
      this._dataLoadingDeferred = null;
      this._dataLoading = false;
      tempDeferred === null || tempDeferred === void 0 || tempDeferred.resolve();
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDirectoryByPathParts(parentDirectoryInfo, pathParts, useKeys) {
    if (pathParts.length < 1) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().resolve(parentDirectoryInfo).promise();
    }
    const fieldName = useKeys ? 'key' : 'name';
    return this.getDirectories(parentDirectoryInfo).then(dirInfos => {
      const subDirInfo = dirInfos.find(d => d.fileItem[fieldName] === pathParts[0]);
      if (!subDirInfo) {
        // @ts-expect-error ts-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return new _deferred.Deferred().reject().promise();
      }
      const restPathParts = [...pathParts].splice(1);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._getDirectoryByPathParts(subDirInfo, restPathParts, useKeys);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDirectoryPathKeyParts(directoryInfo) {
    const pathParts = [];
    while ((_directoryInfo = directoryInfo) !== null && _directoryInfo !== void 0 && _directoryInfo.parentDirectory) {
      var _directoryInfo;
      // @ts-expect-error ts-error
      pathParts.unshift(directoryInfo.fileItem.key);
      // eslint-disable-next-line no-param-reassign
      directoryInfo = directoryInfo.parentDirectory;
    }
    return pathParts;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _findDirectoryByPathKeyParts(keyParts) {
    let selectedDirInfo = this._rootDirectoryInfo;
    if (keyParts.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return selectedDirInfo;
    }
    let i = 0;
    let newSelectedDir = selectedDirInfo;
    while (newSelectedDir && i < keyParts.length) {
      newSelectedDir = selectedDirInfo.items.find(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      info => info.fileItem.key === keyParts[i]);
      if (newSelectedDir) {
        selectedDirInfo = newSelectedDir;
      }
      i += 1;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return selectedDirInfo;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getActualDirectoryInfo(directoryInfo) {
    const keys = this._getDirectoryPathKeyParts(directoryInfo);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._findDirectoryByPathKeyParts(keys);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createDirInfoByName(name, parentDirectoryInfo) {
    const dirPathInfo = this._getPathInfo(parentDirectoryInfo);
    const fileItem = new _file_system_item.default(dirPathInfo, name, true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._createDirectoryInfo(fileItem, parentDirectoryInfo);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createDirectoryInfo(fileItem, parentDirectoryInfo) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(this._createFileInfo(fileItem, parentDirectoryInfo), {
      icon: 'folder',
      expanded: fileItem.isRoot(),
      items: []
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createFileInfo(fileItem, parentDirectoryInfo) {
    return {
      fileItem,
      parentDirectory: parentDirectoryInfo,
      icon: this._getFileItemDefaultIcon(fileItem),
      getInternalKey() {
        return `FIK_${this.fileItem.key}`;
      },
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      getDisplayName() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.displayName || this.fileItem.name;
      }
    };
  }
  _resetDirectoryState(directoryInfo, isActualDirectoryRequired) {
    if (isActualDirectoryRequired) {
      // eslint-disable-next-line no-param-reassign
      directoryInfo = this._getActualDirectoryInfo(directoryInfo);
    }
    directoryInfo.itemsLoaded = false;
    directoryInfo.items = [];
  }
  _getFileItemDefaultIcon(fileItem) {
    if (fileItem.isDirectory) {
      return 'folder';
    }
    const extension = fileItem.getFileExtension();
    const icon = this._defaultIconMap[extension];
    return icon || 'doc';
  }
  _createDefaultIconMap() {
    const result = {
      '.txt': 'txtfile',
      '.rtf': 'rtffile',
      '.doc': 'docfile',
      '.docx': 'docxfile',
      '.xls': 'xlsfile',
      '.xlsx': 'xlsxfile',
      '.ppt': 'pptfile',
      '.pptx': 'pptxfile',
      '.pdf': 'pdffile'
    };
    ['.png', '.gif', '.jpg', '.jpeg', '.ico', '.bmp'].forEach(extension => {
      result[extension] = 'image';
    });
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createRootDirectoryInfo(text) {
    const rootDirectory = new _file_system_item.default(null, '', true);
    const result = this._createDirectoryInfo(rootDirectory, null);
    result.displayName = text || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  setRootText(rootText) {
    this._rootDirectoryInfo.displayName = rootText || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
  }
  _raiseInitialized() {
    this._tryCallAction('onInitialized', {
      controller: this
    });
  }
  _raiseDataLoading(operation) {
    this._tryCallAction('onDataLoading', {
      operation
    });
  }
  _raiseSelectedDirectoryChanged(directoryInfo) {
    this._tryCallAction('onSelectedDirectoryChanged', {
      selectedDirectoryInfo: directoryInfo
    });
  }
  _raiseEditActionStarting(actionInfo) {
    this._tryCallAction('onEditActionStarting', actionInfo);
  }
  _raiseEditActionResultAcquired(actionInfo) {
    this._tryCallAction('onEditActionResultAcquired', actionInfo);
  }
  _raiseEditActionError(actionInfo, errorInfo) {
    this._tryCallAction('onEditActionError', actionInfo, errorInfo);
  }
  _raiseEditActionItemError(actionInfo, errorInfo) {
    this._tryCallAction('onEditActionItemError', actionInfo, errorInfo);
  }
  _raiseCompleteEditActionItem(actionInfo, info) {
    this._tryCallAction('onCompleteEditActionItem', actionInfo, info);
  }
  _raiseCompleteEditAction(actionInfo) {
    this._tryCallAction('onCompleteEditAction', actionInfo);
  }
  _raisePathPotentiallyChanged() {
    this._tryCallAction('onPathPotentiallyChanged');
  }
  _tryCallAction(actionName) {
    if (this._isInitialized && this._options[actionName]) {
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      this._options[actionName](...rest);
    }
  }
  _resetState() {
    this._selectedDirectory = null;
    this._rootDirectoryInfo.items = [];
    this._rootDirectoryInfo.itemsLoaded = false;
    this._loadedItems = {};
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPathInfo(directoryInfo) {
    const pathInfo = [];
    for (let dirInfo = directoryInfo; dirInfo && !dirInfo.fileItem.isRoot(); dirInfo = dirInfo.parentDirectory) {
      // @ts-expect-error ts-error
      pathInfo.unshift({
        key: dirInfo.fileItem.key,
        name: dirInfo.fileItem.name
      });
    }
    return pathInfo;
  }
  on(eventName, eventHandler) {
    const finalEventName = `on${eventName}`;
    this._options[finalEventName] = eventHandler;
  }
  get _editingEvents() {
    return this._options.editingEvents;
  }
}
exports.FileItemsController = FileItemsController;
