"use strict";

exports.OPERATIONS = exports.FileItemsController = void 0;
var _provider_base = _interopRequireDefault(require("../../file_management/provider_base"));
var _file_system_item = _interopRequireDefault(require("../../file_management/file_system_item"));
var _object_provider = _interopRequireDefault(require("../../file_management/object_provider"));
var _remote_provider = _interopRequireDefault(require("../../file_management/remote_provider"));
var _custom_provider = _interopRequireDefault(require("../../file_management/custom_provider"));
var _error = _interopRequireDefault(require("../../file_management/error"));
var _error_codes = _interopRequireDefault(require("../../file_management/error_codes"));
var _utils = require("../../file_management/utils");
var _uiFile_manager = require("./ui.file_manager.common");
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _guid = _interopRequireDefault(require("../../core/guid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME = 'Files';
const OPERATIONS = {
  NAVIGATION: 'navigation',
  REFRESH: 'refresh'
};
exports.OPERATIONS = OPERATIONS;
let FileItemsController = /*#__PURE__*/function () {
  function FileItemsController(options) {
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
  var _proto = FileItemsController.prototype;
  _proto._initialize = function _initialize() {
    const result = this._options.currentPathKeys && this._options.currentPathKeys.length ? this.setCurrentPathByKeys(this._options.currentPathKeys) : this.setCurrentPath(this._options.currentPath);
    const completeInitialization = () => {
      this._isInitialized = true;
      this._raiseInitialized();
    };
    if (result) {
      (0, _deferred.when)(result).always(completeInitialization);
    } else {
      completeInitialization();
    }
  };
  _proto._setSecurityController = function _setSecurityController() {
    this._securityController = new FileSecurityController({
      allowedFileExtensions: this._options.allowedFileExtensions,
      maxFileSize: this._options.uploadMaxFileSize
    });
    this._resetState();
  };
  _proto.setAllowedFileExtensions = function setAllowedFileExtensions(allowedFileExtensions) {
    if ((0, _type.isDefined)(allowedFileExtensions)) {
      this._options.allowedFileExtensions = allowedFileExtensions;
    }
    this._setSecurityController();
    this.refresh();
  };
  _proto.setUploadOptions = function setUploadOptions(_ref) {
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
  };
  _proto._setProvider = function _setProvider(fileProvider) {
    this._fileProvider = this._createFileProvider(fileProvider);
    this._resetState();
  };
  _proto.updateProvider = function updateProvider(fileProvider, currentPathKeys) {
    if (!(0, _type.isDefined)(currentPathKeys)) {
      return this._updateProviderOnly(fileProvider);
    }
    return (0, _deferred.when)(this._getDirectoryByPathParts(this._rootDirectoryInfo, currentPathKeys, true)).then(newDirectory => {
      if (newDirectory !== this._rootDirectoryInfo) {
        this._resetCurrentDirectory();
      }
      this._setProvider(fileProvider);
    }).then(() => this.setCurrentPathByKeys(currentPathKeys));
  };
  _proto._updateProviderOnly = function _updateProviderOnly(fileProvider) {
    this._resetCurrentDirectory();
    this._setProvider(fileProvider);
    return (0, _deferred.when)(this.refresh());
  };
  _proto._createFileProvider = function _createFileProvider(fileProvider) {
    if (!fileProvider) {
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
    }
    return new _object_provider.default(fileProvider);
  };
  _proto.setCurrentPath = function setCurrentPath(path) {
    const pathParts = (0, _utils.getPathParts)(path);
    const rawPath = (0, _utils.pathCombine)(...pathParts);
    if (this.getCurrentDirectory().fileItem.relativeName === rawPath) {
      return new _deferred.Deferred().resolve().promise();
    }
    return this._setCurrentDirectoryByPathParts(pathParts);
  };
  _proto.setCurrentPathByKeys = function setCurrentPathByKeys(pathKeys) {
    if ((0, _common.equalByValue)(this.getCurrentDirectory().fileItem.pathKeys, pathKeys)) {
      return new _deferred.Deferred().resolve().promise();
    }
    return this._setCurrentDirectoryByPathParts(pathKeys, true);
  };
  _proto.getCurrentPath = function getCurrentPath() {
    let currentPath = '';
    let directory = this.getCurrentDirectory();
    while (directory && !directory.fileItem.isRoot()) {
      const escapedName = (0, _utils.getEscapedFileName)(directory.fileItem.name);
      currentPath = (0, _utils.pathCombine)(escapedName, currentPath);
      directory = directory.parentDirectory;
    }
    return currentPath;
  };
  _proto.getCurrentPathKeys = function getCurrentPathKeys() {
    return this.getCurrentDirectory().fileItem.pathKeys;
  };
  _proto.getCurrentDirectory = function getCurrentDirectory() {
    return this._currentDirectoryInfo;
  };
  _proto.setCurrentDirectory = function setCurrentDirectory(directoryInfo, checkActuality) {
    if (!directoryInfo) {
      return;
    }
    if (checkActuality) {
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
  };
  _proto._resetCurrentDirectory = function _resetCurrentDirectory() {
    this._currentDirectoryInfo = this._rootDirectoryInfo;
  };
  _proto.getCurrentItems = function getCurrentItems(onlyFiles) {
    return this._dataLoadingDeferred ? this._dataLoadingDeferred.then(() => this._getCurrentItemsInternal(onlyFiles)) : this._getCurrentItemsInternal(onlyFiles);
  };
  _proto._getCurrentItemsInternal = function _getCurrentItemsInternal(onlyFiles) {
    const currentDirectory = this.getCurrentDirectory();
    const getItemsPromise = this.getDirectoryContents(currentDirectory);
    return getItemsPromise.then(items => {
      const separatedItems = this._separateItemsByType(items);
      currentDirectory.fileItem.hasSubDirectories = !!separatedItems.folders.length;
      return onlyFiles ? separatedItems.files : items;
    });
  };
  _proto.getDirectories = function getDirectories(parentDirectoryInfo, skipNavigationOnError) {
    return this.getDirectoryContents(parentDirectoryInfo, skipNavigationOnError).then(itemInfos => itemInfos.filter(info => info.fileItem.isDirectory));
  };
  _proto._separateItemsByType = function _separateItemsByType(itemInfos) {
    const folders = [];
    const files = [];
    itemInfos.forEach(info => info.fileItem.isDirectory ? folders.push(info) : files.push(info));
    return {
      folders,
      files
    };
  };
  _proto.getDirectoryContents = function getDirectoryContents(parentDirectoryInfo, skipNavigationOnError) {
    if (!parentDirectoryInfo) {
      return new _deferred.Deferred().resolve([this._rootDirectoryInfo]).promise();
    }
    if (parentDirectoryInfo.itemsLoaded) {
      return new _deferred.Deferred().resolve(parentDirectoryInfo.items).promise();
    }
    if (this._singleOperationLockId && parentDirectoryInfo.itemsSingleLoadErrorId === this._singleOperationLockId) {
      this._changeDirectoryOnError(parentDirectoryInfo, skipNavigationOnError, true);
      return new _deferred.Deferred().reject().promise();
    }
    const dirKey = parentDirectoryInfo.getInternalKey();
    let loadItemsDeferred = this._loadedItems[dirKey];
    if (loadItemsDeferred) {
      return loadItemsDeferred;
    }
    loadItemsDeferred = this._getFileItems(parentDirectoryInfo, skipNavigationOnError).then(fileItems => {
      fileItems = fileItems || [];
      parentDirectoryInfo.items = fileItems.map(fileItem => fileItem.isDirectory && this._createDirectoryInfo(fileItem, parentDirectoryInfo) || this._createFileInfo(fileItem, parentDirectoryInfo));
      parentDirectoryInfo.itemsLoaded = true;
      return parentDirectoryInfo.items;
    }, () => {
      if (this._singleOperationLockId && parentDirectoryInfo.itemsSingleLoadErrorId !== this._singleOperationLockId) {
        parentDirectoryInfo.itemsSingleLoadErrorId = this._singleOperationLockId;
      }
      return [];
    });
    this._loadedItems[dirKey] = loadItemsDeferred;
    loadItemsDeferred.always(() => {
      delete this._loadedItems[dirKey];
    });
    return loadItemsDeferred;
  };
  _proto._getFileItems = function _getFileItems(parentDirectoryInfo, skipNavigationOnError) {
    let loadItemsDeferred = null;
    try {
      loadItemsDeferred = this._fileProvider.getItems(parentDirectoryInfo.fileItem);
    } catch (error) {
      return this._handleItemLoadError(parentDirectoryInfo, error, skipNavigationOnError);
    }
    return (0, _deferred.when)(loadItemsDeferred).then(fileItems => this._securityController.getAllowedItems(fileItems), errorInfo => this._handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError));
  };
  _proto.createDirectory = function createDirectory(parentDirectoryInfo, name) {
    const parentDirItem = parentDirectoryInfo.fileItem;
    const tempDirInfo = this._createDirInfoByName(name, parentDirectoryInfo);
    const actionInfo = this._createEditActionInfo('create', tempDirInfo, parentDirectoryInfo);
    return this._processEditAction(actionInfo, args => {
      args.parentDirectory = parentDirItem;
      args.name = name;
      this._editingEvents.onDirectoryCreating(args);
    }, () => this._fileProvider.createDirectory(parentDirItem, name).done(info => {
      if (!parentDirItem.isRoot()) {
        parentDirItem.hasSubDirectories = true;
      }
      return info;
    }), () => {
      const args = {
        parentDirectory: parentDirItem,
        name
      };
      this._editingEvents.onDirectoryCreated(args);
    }, () => this._resetDirectoryState(parentDirectoryInfo, true));
  };
  _proto.renameItem = function renameItem(fileItemInfo, name) {
    const sourceItem = fileItemInfo.fileItem.createClone();
    const actionInfo = this._createEditActionInfo('rename', fileItemInfo, fileItemInfo.parentDirectory, {
      itemNewName: name
    });
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      if (!itemInfo.fileItem.isDirectory) {
        this._securityController.validateExtension(name);
      }
      args.item = sourceItem;
      args.newName = name;
      this._editingEvents.onItemRenaming(args);
    }, item => this._fileProvider.renameItem(item, name), () => {
      const args = {
        sourceItem,
        itemName: name
      };
      this._editingEvents.onItemRenamed(args);
    }, () => {
      const parentDirectory = this._getActualDirectoryInfo(fileItemInfo.parentDirectory);
      this._resetDirectoryState(parentDirectory);
      this.setCurrentDirectory(parentDirectory);
    });
  };
  _proto.moveItems = function moveItems(itemInfos, destinationDirectory) {
    const actionInfo = this._createEditActionInfo('move', itemInfos, destinationDirectory);
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      args.item = itemInfo.fileItem;
      args.destinationDirectory = destinationDirectory.fileItem;
      this._editingEvents.onItemMoving(args);
    }, item => this._fileProvider.moveItems([item], destinationDirectory.fileItem), itemInfo => {
      const args = {
        sourceItem: itemInfo.fileItem,
        parentDirectory: destinationDirectory.fileItem,
        itemName: itemInfo.fileItem.name,
        itemPath: (0, _utils.pathCombine)(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
      };
      this._editingEvents.onItemMoved(args);
    }, needChangeCurrentDirectory => {
      itemInfos.forEach(itemInfo => this._resetDirectoryState(itemInfo.parentDirectory, true));
      if (needChangeCurrentDirectory) {
        this._resetDirectoryState(destinationDirectory);
        this.setCurrentPathByKeys(destinationDirectory.fileItem.pathKeys);
        destinationDirectory.expanded = true;
      }
    });
  };
  _proto.copyItems = function copyItems(itemInfos, destinationDirectory) {
    const actionInfo = this._createEditActionInfo('copy', itemInfos, destinationDirectory);
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      args.item = itemInfo.fileItem;
      args.destinationDirectory = destinationDirectory.fileItem;
      this._editingEvents.onItemCopying(args);
    }, item => this._fileProvider.copyItems([item], destinationDirectory.fileItem), itemInfo => {
      const args = {
        sourceItem: itemInfo.fileItem,
        parentDirectory: destinationDirectory.fileItem,
        itemName: itemInfo.fileItem.name,
        itemPath: (0, _utils.pathCombine)(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
      };
      this._editingEvents.onItemCopied(args);
    }, needChangeCurrentDirectory => {
      if (needChangeCurrentDirectory) {
        destinationDirectory = this._getActualDirectoryInfo(destinationDirectory);
        this._resetDirectoryState(destinationDirectory);
        this.setCurrentDirectory(destinationDirectory);
        destinationDirectory.expanded = true;
      }
    });
  };
  _proto.deleteItems = function deleteItems(itemInfos) {
    const directory = itemInfos.length > 0 ? itemInfos[0].parentDirectory : null;
    const actionInfo = this._createEditActionInfo('delete', itemInfos, directory);
    return this._processEditAction(actionInfo, (args, itemInfo) => {
      args.item = itemInfo.fileItem;
      this._editingEvents.onItemDeleting(args);
    }, item => this._fileProvider.deleteItems([item]), itemInfo => this._editingEvents.onItemDeleted({
      item: itemInfo.fileItem
    }), () => {
      itemInfos.forEach(itemInfo => {
        const parentDir = this._getActualDirectoryInfo(itemInfo.parentDirectory);
        this._resetDirectoryState(parentDir);
        this.setCurrentDirectory(parentDir);
      });
    });
  };
  _proto.processUploadSession = function processUploadSession(sessionInfo, uploadDirectoryInfo) {
    const itemInfos = this._getItemInfosForUploaderFiles(sessionInfo.files, uploadDirectoryInfo);
    const actionInfo = this._createEditActionInfo('upload', itemInfos, uploadDirectoryInfo, {
      sessionInfo
    });
    return this._processEditAction(actionInfo, () => {}, (_, index) => sessionInfo.deferreds[index], () => {}, () => this._resetDirectoryState(uploadDirectoryInfo, true));
  };
  _proto.uploadFileChunk = function uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
    let startDeferred = null;
    if (chunksInfo.chunkIndex === 0) {
      this._securityController.validateMaxFileSize(fileData.size);
      this._securityController.validateExtension(fileData.name);
      startDeferred = this._processBeforeItemEditAction(args => {
        args.fileData = fileData;
        args.destinationDirectory = destinationDirectory;
        this._editingEvents.onFileUploading(args);
      });
    } else {
      startDeferred = new _deferred.Deferred().resolve().promise();
    }
    let result = startDeferred.then(() => this._fileProvider.uploadFileChunk(fileData, chunksInfo, destinationDirectory));
    if (chunksInfo.chunkIndex === chunksInfo.chunkCount - 1) {
      result = result.done(() => {
        const args = {
          fileData,
          parentDirectory: destinationDirectory
        };
        this._editingEvents.onFileUploaded(args);
      });
    }
    return result;
  };
  _proto.abortFileUpload = function abortFileUpload(fileData, chunksInfo, destinationDirectory) {
    return (0, _deferred.when)(this._fileProvider.abortFileUpload(fileData, chunksInfo, destinationDirectory));
  };
  _proto.getFileUploadChunkSize = function getFileUploadChunkSize() {
    const chunkSize = this._options.uploadChunkSize;
    if (chunkSize && chunkSize > 0) {
      return chunkSize;
    }
    return this._fileProvider.getFileUploadChunkSize();
  };
  _proto.downloadItems = function downloadItems(itemInfos) {
    const deferreds = itemInfos.map(itemInfo => {
      return this._processBeforeItemEditAction(args => {
        args.item = itemInfo.fileItem;
        this._editingEvents.onItemDownloading(args);
      }, itemInfo);
    });
    return (0, _deferred.when)(...deferreds).then(() => {
      const items = itemInfos.map(i => i.fileItem);
      return (0, _deferred.when)(this._getItemActionResult(this._fileProvider.downloadItems(items))).then(() => {}, errorInfo => {
        this._raiseDownloadItemsError(itemInfos, itemInfos[0].parentDirectory, errorInfo);
      });
    }, errorInfo => {
      this._raiseDownloadItemsError(itemInfos, itemInfos[0].parentDirectory, errorInfo);
    });
  };
  _proto.getItemContent = function getItemContent(itemInfos) {
    const items = itemInfos.map(i => i.fileItem);
    return (0, _deferred.when)(this._fileProvider.getItemsContent(items));
  };
  _proto._handleItemLoadError = function _handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError) {
    parentDirectoryInfo = this._getActualDirectoryInfo(parentDirectoryInfo);
    this._raiseGetItemsError(parentDirectoryInfo, errorInfo);
    this._changeDirectoryOnError(parentDirectoryInfo, skipNavigationOnError);
    return new _deferred.Deferred().reject().promise();
  };
  _proto._raiseGetItemsError = function _raiseGetItemsError(parentDirectoryInfo, errorInfo) {
    const actionInfo = this._createEditActionInfo('getItems', parentDirectoryInfo, parentDirectoryInfo);
    this._raiseEditActionStarting(actionInfo);
    this._raiseEditActionResultAcquired(actionInfo);
    this._raiseEditActionError(actionInfo, {
      errorCode: errorInfo.errorCode,
      errorText: errorInfo.errorText,
      fileItem: parentDirectoryInfo.fileItem,
      index: 0
    });
  };
  _proto._raiseDownloadItemsError = function _raiseDownloadItemsError(targetFileInfos, directory, errorInfo) {
    const actionInfo = this._createEditActionInfo('download', targetFileInfos, directory);
    const itemsLength = targetFileInfos.length;
    actionInfo.singleRequest = itemsLength === 1;
    this._raiseEditActionStarting(actionInfo);
    this._raiseEditActionResultAcquired(actionInfo);
    for (let index = 0; index < itemsLength - 1; index++) {
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
  };
  _proto._changeDirectoryOnError = function _changeDirectoryOnError(dirInfo, skipNavigationOnError, isActualDirectoryRequired) {
    if (isActualDirectoryRequired) {
      dirInfo = this._getActualDirectoryInfo(dirInfo);
    }
    this._resetDirectoryState(dirInfo);
    dirInfo.expanded = false;
    if (!skipNavigationOnError) {
      this.setCurrentDirectory(dirInfo.parentDirectory);
    }
  };
  _proto._getItemActionResult = function _getItemActionResult(actionResult) {
    return Array.isArray(actionResult) ? actionResult[0] : actionResult;
  };
  _proto._processEditAction = function _processEditAction(actionInfo, beforeAction, action, afterAction, completeAction) {
    let isAnyOperationSuccessful = false;
    this._raiseEditActionStarting(actionInfo);
    const actionResult = actionInfo.itemInfos.map((itemInfo, itemIndex) => {
      return this._processBeforeItemEditAction(beforeAction, itemInfo).then(() => {
        const itemActionResult = this._getItemActionResult(action(itemInfo.fileItem, itemIndex));
        return itemActionResult.done(() => afterAction(itemInfo));
      });
    });
    actionInfo.singleRequest = actionResult.length === 1;
    this._raiseEditActionResultAcquired(actionInfo);
    return (0, _uiFile_manager.whenSome)(actionResult, info => {
      isAnyOperationSuccessful = true;
      this._raiseCompleteEditActionItem(actionInfo, info);
    }, errorInfo => this._raiseEditActionItemError(actionInfo, errorInfo)).then(() => {
      completeAction(isAnyOperationSuccessful);
      this._raiseCompleteEditAction(actionInfo);
    });
  };
  _proto._createEditActionInfo = function _createEditActionInfo(name, targetItemInfos, directory, customData) {
    targetItemInfos = Array.isArray(targetItemInfos) ? targetItemInfos : [targetItemInfos];
    customData = customData || {};
    const items = targetItemInfos.map(itemInfo => itemInfo.fileItem);
    return {
      name,
      itemInfos: targetItemInfos,
      items,
      directory,
      customData,
      singleRequest: true
    };
  };
  _proto._processBeforeItemEditAction = function _processBeforeItemEditAction(action, itemInfo) {
    const deferred = new _deferred.Deferred();
    const args = this._createBeforeActionArgs();
    try {
      action(args, itemInfo);
    } catch (errorInfo) {
      return deferred.reject(errorInfo).promise();
    }
    if (!args.cancel) {
      deferred.resolve();
    } else if (args.cancel === true) {
      return deferred.reject({
        errorText: args.errorText,
        errorCode: args.errorCode
      });
    } else if ((0, _type.isPromise)(args.cancel)) {
      (0, _deferred.when)(args.cancel).then(res => {
        if (res === true) {
          deferred.reject();
        } else if ((0, _type.isObject)(res) && res.cancel === true) {
          deferred.reject({
            errorText: res.errorText,
            errorCode: res.errorCode
          });
        }
        deferred.resolve();
      }, deferred.resolve);
    }
    return deferred.promise();
  };
  _proto._createBeforeActionArgs = function _createBeforeActionArgs() {
    return {
      errorCode: undefined,
      errorText: '',
      cancel: false
    };
  };
  _proto._getItemInfosForUploaderFiles = function _getItemInfosForUploaderFiles(files, parentDirectoryInfo) {
    const pathInfo = this._getPathInfo(parentDirectoryInfo);
    const result = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const item = new _file_system_item.default(pathInfo, file.name, false);
      const itemInfo = this._createFileInfo(item, parentDirectoryInfo);
      result.push(itemInfo);
    }
    return result;
  };
  _proto.refresh = function refresh() {
    if (this._lockRefresh) {
      return this._refreshDeferred;
    }
    this._lockRefresh = true;
    return this._executeDataLoad(() => {
      return this._refreshDeferred = this._refreshInternal();
    }, OPERATIONS.REFRESH);
  };
  _proto.startSingleLoad = function startSingleLoad() {
    this._singleOperationLockId = new _guid.default().toString();
  };
  _proto.endSingleLoad = function endSingleLoad() {
    delete this._singleOperationLockId;
  };
  _proto._refreshInternal = function _refreshInternal() {
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
  };
  _proto._loadItemsRecursive = function _loadItemsRecursive(directoryInfo, cachedDirectoryInfo) {
    return this.getDirectories(directoryInfo).then(dirInfos => {
      const itemDeferreds = [];
      for (let i = 0; i < dirInfos.length; i++) {
        const cachedItem = cachedDirectoryInfo.items.find(cache => dirInfos[i].fileItem.key === cache.fileItem.key);
        if (!cachedItem) continue;
        dirInfos[i].expanded = cachedItem.expanded;
        if (dirInfos[i].expanded) {
          itemDeferreds.push(this._loadItemsRecursive(dirInfos[i], cachedItem));
        }
      }
      return (0, _uiFile_manager.whenSome)(itemDeferreds);
    }, () => null);
  };
  _proto._setCurrentDirectoryByPathParts = function _setCurrentDirectoryByPathParts(pathParts, useKeys) {
    return this._executeDataLoad(() => this._setCurrentDirectoryByPathPartsInternal(pathParts, useKeys), OPERATIONS.NAVIGATION);
  };
  _proto._setCurrentDirectoryByPathPartsInternal = function _setCurrentDirectoryByPathPartsInternal(pathParts, useKeys) {
    return this._getDirectoryByPathParts(this._rootDirectoryInfo, pathParts, useKeys).then(directoryInfo => {
      for (let info = directoryInfo.parentDirectory; info; info = info.parentDirectory) {
        info.expanded = true;
      }
      this.setCurrentDirectory(directoryInfo);
    }, () => {
      this._raisePathPotentiallyChanged();
    });
  };
  _proto._executeDataLoad = function _executeDataLoad(action, operation) {
    if (this._dataLoadingDeferred) {
      return this._dataLoadingDeferred.then(() => this._executeDataLoad(action, operation));
    }
    this._dataLoading = true;
    this._dataLoadingDeferred = new _deferred.Deferred();
    if (this._isInitialized) {
      this._raiseDataLoading(operation);
    }
    return action().always(() => {
      const tempDeferred = this._dataLoadingDeferred;
      this._dataLoadingDeferred = null;
      this._dataLoading = false;
      tempDeferred.resolve();
    });
  };
  _proto._getDirectoryByPathParts = function _getDirectoryByPathParts(parentDirectoryInfo, pathParts, useKeys) {
    if (pathParts.length < 1) {
      return new _deferred.Deferred().resolve(parentDirectoryInfo).promise();
    }
    const fieldName = useKeys ? 'key' : 'name';
    return this.getDirectories(parentDirectoryInfo).then(dirInfos => {
      const subDirInfo = dirInfos.find(d => d.fileItem[fieldName] === pathParts[0]);
      if (!subDirInfo) {
        return new _deferred.Deferred().reject().promise();
      }
      const restPathParts = [...pathParts].splice(1);
      return this._getDirectoryByPathParts(subDirInfo, restPathParts, useKeys);
    });
  };
  _proto._getDirectoryPathKeyParts = function _getDirectoryPathKeyParts(directoryInfo) {
    const pathParts = [];
    while (directoryInfo && directoryInfo.parentDirectory) {
      pathParts.unshift(directoryInfo.fileItem.key);
      directoryInfo = directoryInfo.parentDirectory;
    }
    return pathParts;
  };
  _proto._findDirectoryByPathKeyParts = function _findDirectoryByPathKeyParts(keyParts) {
    let selectedDirInfo = this._rootDirectoryInfo;
    if (keyParts.length === 0) {
      return selectedDirInfo;
    }
    let i = 0;
    let newSelectedDir = selectedDirInfo;
    while (newSelectedDir && i < keyParts.length) {
      newSelectedDir = selectedDirInfo.items.find(info => info.fileItem.key === keyParts[i]);
      if (newSelectedDir) {
        selectedDirInfo = newSelectedDir;
      }
      i++;
    }
    return selectedDirInfo;
  };
  _proto._getActualDirectoryInfo = function _getActualDirectoryInfo(directoryInfo) {
    const keys = this._getDirectoryPathKeyParts(directoryInfo);
    return this._findDirectoryByPathKeyParts(keys);
  };
  _proto._createDirInfoByName = function _createDirInfoByName(name, parentDirectoryInfo) {
    const dirPathInfo = this._getPathInfo(parentDirectoryInfo);
    const fileItem = new _file_system_item.default(dirPathInfo, name, true);
    return this._createDirectoryInfo(fileItem, parentDirectoryInfo);
  };
  _proto._createDirectoryInfo = function _createDirectoryInfo(fileItem, parentDirectoryInfo) {
    return (0, _extend.extend)(this._createFileInfo(fileItem, parentDirectoryInfo), {
      icon: 'folder',
      expanded: fileItem.isRoot(),
      items: []
    });
  };
  _proto._createFileInfo = function _createFileInfo(fileItem, parentDirectoryInfo) {
    return {
      fileItem,
      parentDirectory: parentDirectoryInfo,
      icon: this._getFileItemDefaultIcon(fileItem),
      getInternalKey() {
        return "FIK_".concat(this.fileItem.key);
      },
      getDisplayName() {
        return this.displayName || this.fileItem.name;
      }
    };
  };
  _proto._resetDirectoryState = function _resetDirectoryState(directoryInfo, isActualDirectoryRequired) {
    if (isActualDirectoryRequired) {
      directoryInfo = this._getActualDirectoryInfo(directoryInfo);
    }
    directoryInfo.itemsLoaded = false;
    directoryInfo.items = [];
  };
  _proto._getFileItemDefaultIcon = function _getFileItemDefaultIcon(fileItem) {
    if (fileItem.isDirectory) {
      return 'folder';
    }
    const extension = fileItem.getFileExtension();
    const icon = this._defaultIconMap[extension];
    return icon || 'doc';
  };
  _proto._createDefaultIconMap = function _createDefaultIconMap() {
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
  };
  _proto._createRootDirectoryInfo = function _createRootDirectoryInfo(text) {
    const rootDirectory = new _file_system_item.default(null, '', true);
    const result = this._createDirectoryInfo(rootDirectory, null);
    result.displayName = text || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
    return result;
  };
  _proto.setRootText = function setRootText(rootText) {
    this._rootDirectoryInfo.displayName = rootText || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
  };
  _proto._raiseInitialized = function _raiseInitialized() {
    this._tryCallAction('onInitialized', {
      controller: this
    });
  };
  _proto._raiseDataLoading = function _raiseDataLoading(operation) {
    this._tryCallAction('onDataLoading', {
      operation
    });
  };
  _proto._raiseSelectedDirectoryChanged = function _raiseSelectedDirectoryChanged(directoryInfo) {
    this._tryCallAction('onSelectedDirectoryChanged', {
      selectedDirectoryInfo: directoryInfo
    });
  };
  _proto._raiseEditActionStarting = function _raiseEditActionStarting(actionInfo) {
    this._tryCallAction('onEditActionStarting', actionInfo);
  };
  _proto._raiseEditActionResultAcquired = function _raiseEditActionResultAcquired(actionInfo) {
    this._tryCallAction('onEditActionResultAcquired', actionInfo);
  };
  _proto._raiseEditActionError = function _raiseEditActionError(actionInfo, errorInfo) {
    this._tryCallAction('onEditActionError', actionInfo, errorInfo);
  };
  _proto._raiseEditActionItemError = function _raiseEditActionItemError(actionInfo, errorInfo) {
    this._tryCallAction('onEditActionItemError', actionInfo, errorInfo);
  };
  _proto._raiseCompleteEditActionItem = function _raiseCompleteEditActionItem(actionInfo, info) {
    this._tryCallAction('onCompleteEditActionItem', actionInfo, info);
  };
  _proto._raiseCompleteEditAction = function _raiseCompleteEditAction(actionInfo) {
    this._tryCallAction('onCompleteEditAction', actionInfo);
  };
  _proto._raisePathPotentiallyChanged = function _raisePathPotentiallyChanged() {
    this._tryCallAction('onPathPotentiallyChanged');
  };
  _proto._tryCallAction = function _tryCallAction(actionName) {
    const args = Array.prototype.slice.call(arguments, 1);
    if (this._isInitialized && this._options[actionName]) {
      this._options[actionName](...args);
    }
  };
  _proto._resetState = function _resetState() {
    this._selectedDirectory = null;
    this._rootDirectoryInfo.items = [];
    this._rootDirectoryInfo.itemsLoaded = false;
    this._loadedItems = {};
  };
  _proto._getPathInfo = function _getPathInfo(directoryInfo) {
    const pathInfo = [];
    for (let dirInfo = directoryInfo; dirInfo && !dirInfo.fileItem.isRoot(); dirInfo = dirInfo.parentDirectory) {
      pathInfo.unshift({
        key: dirInfo.fileItem.key,
        name: dirInfo.fileItem.name
      });
    }
    return pathInfo;
  };
  _proto.on = function on(eventName, eventHandler) {
    const finalEventName = "on".concat(eventName);
    this._options[finalEventName] = eventHandler;
  };
  _createClass(FileItemsController, [{
    key: "_editingEvents",
    get: function () {
      return this._options.editingEvents;
    }
  }]);
  return FileItemsController;
}();
exports.FileItemsController = FileItemsController;
let FileSecurityController = /*#__PURE__*/function () {
  function FileSecurityController(options) {
    const defaultOptions = {
      allowedFileExtensions: [],
      maxFileSize: 0
    };
    this._options = (0, _extend.extend)(defaultOptions, options);
    this._extensionsMap = {};
    this._allowedFileExtensions.forEach(extension => {
      this._extensionsMap[extension.toUpperCase()] = true;
    });
  }
  var _proto2 = FileSecurityController.prototype;
  _proto2.getAllowedItems = function getAllowedItems(items) {
    if (this._allowedFileExtensions.length === 0) {
      return items;
    }
    return items.filter(item => item.isDirectory || this._isValidExtension(item.name));
  };
  _proto2.validateExtension = function validateExtension(name) {
    if (!this._isValidExtension(name)) {
      throw new _error.default(_error_codes.default.WrongFileExtension, null);
    }
  };
  _proto2.validateMaxFileSize = function validateMaxFileSize(size) {
    if (this._maxFileSize && size > this._maxFileSize) {
      throw new _error.default(_error_codes.default.MaxFileSizeExceeded, null);
    }
  };
  _proto2._isValidExtension = function _isValidExtension(name) {
    if (this._allowedFileExtensions.length === 0) {
      return true;
    }
    const extension = (0, _utils.getFileExtension)(name).toUpperCase();
    return this._extensionsMap[extension];
  };
  _createClass(FileSecurityController, [{
    key: "_allowedFileExtensions",
    get: function () {
      return this._options.allowedFileExtensions;
    }
  }, {
    key: "_maxFileSize",
    get: function () {
      return this._options.maxFileSize;
    }
  }]);
  return FileSecurityController;
}();