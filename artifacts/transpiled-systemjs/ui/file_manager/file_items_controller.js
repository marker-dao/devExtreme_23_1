!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/file_manager/file_items_controller.js"], ["../../file_management/provider_base","../../file_management/file_system_item","../../file_management/object_provider","../../file_management/remote_provider","../../file_management/custom_provider","../../file_management/error","../../file_management/error_codes","../../file_management/utils","./ui.file_manager.common","../../core/utils/deferred","../../core/utils/extend","../../core/utils/common","../../core/utils/type","../../core/guid"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/file_manager/file_items_controller.js", ["../../file_management/provider_base", "../../file_management/file_system_item", "../../file_management/object_provider", "../../file_management/remote_provider", "../../file_management/custom_provider", "../../file_management/error", "../../file_management/error_codes", "../../file_management/utils", "./ui.file_manager.common", "../../core/utils/deferred", "../../core/utils/extend", "../../core/utils/common", "../../core/utils/type", "../../core/guid"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.OPERATIONS = exports.FileItemsController = void 0;
  var _provider_base = _interopRequireDefault($__require("../../file_management/provider_base"));
  var _file_system_item = _interopRequireDefault($__require("../../file_management/file_system_item"));
  var _object_provider = _interopRequireDefault($__require("../../file_management/object_provider"));
  var _remote_provider = _interopRequireDefault($__require("../../file_management/remote_provider"));
  var _custom_provider = _interopRequireDefault($__require("../../file_management/custom_provider"));
  var _error = _interopRequireDefault($__require("../../file_management/error"));
  var _error_codes = _interopRequireDefault($__require("../../file_management/error_codes"));
  var _utils = $__require("../../file_management/utils");
  var _uiFile_manager = $__require("./ui.file_manager.common");
  var _deferred = $__require("../../core/utils/deferred");
  var _extend = $__require("../../core/utils/extend");
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME = 'Files';
  var OPERATIONS = {
    NAVIGATION: 'navigation',
    REFRESH: 'refresh'
  };
  exports.OPERATIONS = OPERATIONS;
  var FileItemsController = /*#__PURE__*/function () {
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
      var _this = this;
      var result = this._options.currentPathKeys && this._options.currentPathKeys.length ? this.setCurrentPathByKeys(this._options.currentPathKeys) : this.setCurrentPath(this._options.currentPath);
      var completeInitialization = function completeInitialization() {
        _this._isInitialized = true;
        _this._raiseInitialized();
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
      var maxFileSize = _ref.maxFileSize,
          chunkSize = _ref.chunkSize;
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
      var _this2 = this;
      if (!(0, _type.isDefined)(currentPathKeys)) {
        return this._updateProviderOnly(fileProvider);
      }
      return (0, _deferred.when)(this._getDirectoryByPathParts(this._rootDirectoryInfo, currentPathKeys, true)).then(function (newDirectory) {
        if (newDirectory !== _this2._rootDirectoryInfo) {
          _this2._resetCurrentDirectory();
        }
        _this2._setProvider(fileProvider);
      }).then(function () {
        return _this2.setCurrentPathByKeys(currentPathKeys);
      });
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
      var pathParts = (0, _utils.getPathParts)(path);
      var rawPath = _utils.pathCombine.apply(void 0, _toConsumableArray(pathParts));
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
      var currentPath = '';
      var directory = this.getCurrentDirectory();
      while (directory && !directory.fileItem.isRoot()) {
        var escapedName = (0, _utils.getEscapedFileName)(directory.fileItem.name);
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
      var requireRaiseSelectedDirectory = this._currentDirectoryInfo.fileItem.key !== directoryInfo.fileItem.key;
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
      var _this3 = this;
      return this._dataLoadingDeferred ? this._dataLoadingDeferred.then(function () {
        return _this3._getCurrentItemsInternal(onlyFiles);
      }) : this._getCurrentItemsInternal(onlyFiles);
    };
    _proto._getCurrentItemsInternal = function _getCurrentItemsInternal(onlyFiles) {
      var _this4 = this;
      var currentDirectory = this.getCurrentDirectory();
      var getItemsPromise = this.getDirectoryContents(currentDirectory);
      return getItemsPromise.then(function (items) {
        var separatedItems = _this4._separateItemsByType(items);
        currentDirectory.fileItem.hasSubDirectories = !!separatedItems.folders.length;
        return onlyFiles ? separatedItems.files : items;
      });
    };
    _proto.getDirectories = function getDirectories(parentDirectoryInfo, skipNavigationOnError) {
      return this.getDirectoryContents(parentDirectoryInfo, skipNavigationOnError).then(function (itemInfos) {
        return itemInfos.filter(function (info) {
          return info.fileItem.isDirectory;
        });
      });
    };
    _proto._separateItemsByType = function _separateItemsByType(itemInfos) {
      var folders = [];
      var files = [];
      itemInfos.forEach(function (info) {
        return info.fileItem.isDirectory ? folders.push(info) : files.push(info);
      });
      return {
        folders: folders,
        files: files
      };
    };
    _proto.getDirectoryContents = function getDirectoryContents(parentDirectoryInfo, skipNavigationOnError) {
      var _this5 = this;
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
      var dirKey = parentDirectoryInfo.getInternalKey();
      var loadItemsDeferred = this._loadedItems[dirKey];
      if (loadItemsDeferred) {
        return loadItemsDeferred;
      }
      loadItemsDeferred = this._getFileItems(parentDirectoryInfo, skipNavigationOnError).then(function (fileItems) {
        fileItems = fileItems || [];
        parentDirectoryInfo.items = fileItems.map(function (fileItem) {
          return fileItem.isDirectory && _this5._createDirectoryInfo(fileItem, parentDirectoryInfo) || _this5._createFileInfo(fileItem, parentDirectoryInfo);
        });
        parentDirectoryInfo.itemsLoaded = true;
        return parentDirectoryInfo.items;
      }, function () {
        if (_this5._singleOperationLockId && parentDirectoryInfo.itemsSingleLoadErrorId !== _this5._singleOperationLockId) {
          parentDirectoryInfo.itemsSingleLoadErrorId = _this5._singleOperationLockId;
        }
        return [];
      });
      this._loadedItems[dirKey] = loadItemsDeferred;
      loadItemsDeferred.always(function () {
        delete _this5._loadedItems[dirKey];
      });
      return loadItemsDeferred;
    };
    _proto._getFileItems = function _getFileItems(parentDirectoryInfo, skipNavigationOnError) {
      var _this6 = this;
      var loadItemsDeferred = null;
      try {
        loadItemsDeferred = this._fileProvider.getItems(parentDirectoryInfo.fileItem);
      } catch (error) {
        return this._handleItemLoadError(parentDirectoryInfo, error, skipNavigationOnError);
      }
      return (0, _deferred.when)(loadItemsDeferred).then(function (fileItems) {
        return _this6._securityController.getAllowedItems(fileItems);
      }, function (errorInfo) {
        return _this6._handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError);
      });
    };
    _proto.createDirectory = function createDirectory(parentDirectoryInfo, name) {
      var _this7 = this;
      var parentDirItem = parentDirectoryInfo.fileItem;
      var tempDirInfo = this._createDirInfoByName(name, parentDirectoryInfo);
      var actionInfo = this._createEditActionInfo('create', tempDirInfo, parentDirectoryInfo);
      return this._processEditAction(actionInfo, function (args) {
        args.parentDirectory = parentDirItem;
        args.name = name;
        _this7._editingEvents.onDirectoryCreating(args);
      }, function () {
        return _this7._fileProvider.createDirectory(parentDirItem, name).done(function (info) {
          if (!parentDirItem.isRoot()) {
            parentDirItem.hasSubDirectories = true;
          }
          return info;
        });
      }, function () {
        var args = {
          parentDirectory: parentDirItem,
          name: name
        };
        _this7._editingEvents.onDirectoryCreated(args);
      }, function () {
        return _this7._resetDirectoryState(parentDirectoryInfo, true);
      });
    };
    _proto.renameItem = function renameItem(fileItemInfo, name) {
      var _this8 = this;
      var sourceItem = fileItemInfo.fileItem.createClone();
      var actionInfo = this._createEditActionInfo('rename', fileItemInfo, fileItemInfo.parentDirectory, {
        itemNewName: name
      });
      return this._processEditAction(actionInfo, function (args, itemInfo) {
        if (!itemInfo.fileItem.isDirectory) {
          _this8._securityController.validateExtension(name);
        }
        args.item = sourceItem;
        args.newName = name;
        _this8._editingEvents.onItemRenaming(args);
      }, function (item) {
        return _this8._fileProvider.renameItem(item, name);
      }, function () {
        var args = {
          sourceItem: sourceItem,
          itemName: name
        };
        _this8._editingEvents.onItemRenamed(args);
      }, function () {
        var parentDirectory = _this8._getActualDirectoryInfo(fileItemInfo.parentDirectory);
        _this8._resetDirectoryState(parentDirectory);
        _this8.setCurrentDirectory(parentDirectory);
      });
    };
    _proto.moveItems = function moveItems(itemInfos, destinationDirectory) {
      var _this9 = this;
      var actionInfo = this._createEditActionInfo('move', itemInfos, destinationDirectory);
      return this._processEditAction(actionInfo, function (args, itemInfo) {
        args.item = itemInfo.fileItem;
        args.destinationDirectory = destinationDirectory.fileItem;
        _this9._editingEvents.onItemMoving(args);
      }, function (item) {
        return _this9._fileProvider.moveItems([item], destinationDirectory.fileItem);
      }, function (itemInfo) {
        var args = {
          sourceItem: itemInfo.fileItem,
          parentDirectory: destinationDirectory.fileItem,
          itemName: itemInfo.fileItem.name,
          itemPath: (0, _utils.pathCombine)(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
        };
        _this9._editingEvents.onItemMoved(args);
      }, function (needChangeCurrentDirectory) {
        itemInfos.forEach(function (itemInfo) {
          return _this9._resetDirectoryState(itemInfo.parentDirectory, true);
        });
        if (needChangeCurrentDirectory) {
          _this9._resetDirectoryState(destinationDirectory);
          _this9.setCurrentPathByKeys(destinationDirectory.fileItem.pathKeys);
          destinationDirectory.expanded = true;
        }
      });
    };
    _proto.copyItems = function copyItems(itemInfos, destinationDirectory) {
      var _this10 = this;
      var actionInfo = this._createEditActionInfo('copy', itemInfos, destinationDirectory);
      return this._processEditAction(actionInfo, function (args, itemInfo) {
        args.item = itemInfo.fileItem;
        args.destinationDirectory = destinationDirectory.fileItem;
        _this10._editingEvents.onItemCopying(args);
      }, function (item) {
        return _this10._fileProvider.copyItems([item], destinationDirectory.fileItem);
      }, function (itemInfo) {
        var args = {
          sourceItem: itemInfo.fileItem,
          parentDirectory: destinationDirectory.fileItem,
          itemName: itemInfo.fileItem.name,
          itemPath: (0, _utils.pathCombine)(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
        };
        _this10._editingEvents.onItemCopied(args);
      }, function (needChangeCurrentDirectory) {
        if (needChangeCurrentDirectory) {
          destinationDirectory = _this10._getActualDirectoryInfo(destinationDirectory);
          _this10._resetDirectoryState(destinationDirectory);
          _this10.setCurrentDirectory(destinationDirectory);
          destinationDirectory.expanded = true;
        }
      });
    };
    _proto.deleteItems = function deleteItems(itemInfos) {
      var _this11 = this;
      var directory = itemInfos.length > 0 ? itemInfos[0].parentDirectory : null;
      var actionInfo = this._createEditActionInfo('delete', itemInfos, directory);
      return this._processEditAction(actionInfo, function (args, itemInfo) {
        args.item = itemInfo.fileItem;
        _this11._editingEvents.onItemDeleting(args);
      }, function (item) {
        return _this11._fileProvider.deleteItems([item]);
      }, function (itemInfo) {
        return _this11._editingEvents.onItemDeleted({
          item: itemInfo.fileItem
        });
      }, function () {
        itemInfos.forEach(function (itemInfo) {
          var parentDir = _this11._getActualDirectoryInfo(itemInfo.parentDirectory);
          _this11._resetDirectoryState(parentDir);
          _this11.setCurrentDirectory(parentDir);
        });
      });
    };
    _proto.processUploadSession = function processUploadSession(sessionInfo, uploadDirectoryInfo) {
      var _this12 = this;
      var itemInfos = this._getItemInfosForUploaderFiles(sessionInfo.files, uploadDirectoryInfo);
      var actionInfo = this._createEditActionInfo('upload', itemInfos, uploadDirectoryInfo, {
        sessionInfo: sessionInfo
      });
      return this._processEditAction(actionInfo, function () {}, function (_, index) {
        return sessionInfo.deferreds[index];
      }, function () {}, function () {
        return _this12._resetDirectoryState(uploadDirectoryInfo, true);
      });
    };
    _proto.uploadFileChunk = function uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
      var _this13 = this;
      var startDeferred = null;
      if (chunksInfo.chunkIndex === 0) {
        this._securityController.validateMaxFileSize(fileData.size);
        this._securityController.validateExtension(fileData.name);
        startDeferred = this._processBeforeItemEditAction(function (args) {
          args.fileData = fileData;
          args.destinationDirectory = destinationDirectory;
          _this13._editingEvents.onFileUploading(args);
        });
      } else {
        startDeferred = new _deferred.Deferred().resolve().promise();
      }
      var result = startDeferred.then(function () {
        return _this13._fileProvider.uploadFileChunk(fileData, chunksInfo, destinationDirectory);
      });
      if (chunksInfo.chunkIndex === chunksInfo.chunkCount - 1) {
        result = result.done(function () {
          var args = {
            fileData: fileData,
            parentDirectory: destinationDirectory
          };
          _this13._editingEvents.onFileUploaded(args);
        });
      }
      return result;
    };
    _proto.abortFileUpload = function abortFileUpload(fileData, chunksInfo, destinationDirectory) {
      return (0, _deferred.when)(this._fileProvider.abortFileUpload(fileData, chunksInfo, destinationDirectory));
    };
    _proto.getFileUploadChunkSize = function getFileUploadChunkSize() {
      var chunkSize = this._options.uploadChunkSize;
      if (chunkSize && chunkSize > 0) {
        return chunkSize;
      }
      return this._fileProvider.getFileUploadChunkSize();
    };
    _proto.downloadItems = function downloadItems(itemInfos) {
      var _this14 = this;
      var deferreds = itemInfos.map(function (itemInfo) {
        return _this14._processBeforeItemEditAction(function (args) {
          args.item = itemInfo.fileItem;
          _this14._editingEvents.onItemDownloading(args);
        }, itemInfo);
      });
      return _deferred.when.apply(void 0, _toConsumableArray(deferreds)).then(function () {
        var items = itemInfos.map(function (i) {
          return i.fileItem;
        });
        return (0, _deferred.when)(_this14._getItemActionResult(_this14._fileProvider.downloadItems(items))).then(function () {}, function (errorInfo) {
          _this14._raiseDownloadItemsError(itemInfos, itemInfos[0].parentDirectory, errorInfo);
        });
      }, function (errorInfo) {
        _this14._raiseDownloadItemsError(itemInfos, itemInfos[0].parentDirectory, errorInfo);
      });
    };
    _proto.getItemContent = function getItemContent(itemInfos) {
      var items = itemInfos.map(function (i) {
        return i.fileItem;
      });
      return (0, _deferred.when)(this._fileProvider.getItemsContent(items));
    };
    _proto._handleItemLoadError = function _handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError) {
      parentDirectoryInfo = this._getActualDirectoryInfo(parentDirectoryInfo);
      this._raiseGetItemsError(parentDirectoryInfo, errorInfo);
      this._changeDirectoryOnError(parentDirectoryInfo, skipNavigationOnError);
      return new _deferred.Deferred().reject().promise();
    };
    _proto._raiseGetItemsError = function _raiseGetItemsError(parentDirectoryInfo, errorInfo) {
      var actionInfo = this._createEditActionInfo('getItems', parentDirectoryInfo, parentDirectoryInfo);
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
      var actionInfo = this._createEditActionInfo('download', targetFileInfos, directory);
      var itemsLength = targetFileInfos.length;
      actionInfo.singleRequest = itemsLength === 1;
      this._raiseEditActionStarting(actionInfo);
      this._raiseEditActionResultAcquired(actionInfo);
      for (var index = 0; index < itemsLength - 1; index++) {
        this._raiseEditActionItemError(actionInfo, {
          errorCode: errorInfo.errorCode,
          errorText: errorInfo.errorText,
          fileItem: targetFileInfos[index].fileItem,
          index: index
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
      var _this15 = this;
      var isAnyOperationSuccessful = false;
      this._raiseEditActionStarting(actionInfo);
      var actionResult = actionInfo.itemInfos.map(function (itemInfo, itemIndex) {
        return _this15._processBeforeItemEditAction(beforeAction, itemInfo).then(function () {
          var itemActionResult = _this15._getItemActionResult(action(itemInfo.fileItem, itemIndex));
          return itemActionResult.done(function () {
            return afterAction(itemInfo);
          });
        });
      });
      actionInfo.singleRequest = actionResult.length === 1;
      this._raiseEditActionResultAcquired(actionInfo);
      return (0, _uiFile_manager.whenSome)(actionResult, function (info) {
        isAnyOperationSuccessful = true;
        _this15._raiseCompleteEditActionItem(actionInfo, info);
      }, function (errorInfo) {
        return _this15._raiseEditActionItemError(actionInfo, errorInfo);
      }).then(function () {
        completeAction(isAnyOperationSuccessful);
        _this15._raiseCompleteEditAction(actionInfo);
      });
    };
    _proto._createEditActionInfo = function _createEditActionInfo(name, targetItemInfos, directory, customData) {
      targetItemInfos = Array.isArray(targetItemInfos) ? targetItemInfos : [targetItemInfos];
      customData = customData || {};
      var items = targetItemInfos.map(function (itemInfo) {
        return itemInfo.fileItem;
      });
      return {
        name: name,
        itemInfos: targetItemInfos,
        items: items,
        directory: directory,
        customData: customData,
        singleRequest: true
      };
    };
    _proto._processBeforeItemEditAction = function _processBeforeItemEditAction(action, itemInfo) {
      var deferred = new _deferred.Deferred();
      var args = this._createBeforeActionArgs();
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
        (0, _deferred.when)(args.cancel).then(function (res) {
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
      var pathInfo = this._getPathInfo(parentDirectoryInfo);
      var result = [];
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var item = new _file_system_item.default(pathInfo, file.name, false);
        var itemInfo = this._createFileInfo(item, parentDirectoryInfo);
        result.push(itemInfo);
      }
      return result;
    };
    _proto.refresh = function refresh() {
      var _this16 = this;
      if (this._lockRefresh) {
        return this._refreshDeferred;
      }
      this._lockRefresh = true;
      return this._executeDataLoad(function () {
        return _this16._refreshDeferred = _this16._refreshInternal();
      }, OPERATIONS.REFRESH);
    };
    _proto.startSingleLoad = function startSingleLoad() {
      this._singleOperationLockId = new _guid.default().toString();
    };
    _proto.endSingleLoad = function endSingleLoad() {
      delete this._singleOperationLockId;
    };
    _proto._refreshInternal = function _refreshInternal() {
      var _this17 = this;
      var cachedRootInfo = {
        items: this._rootDirectoryInfo.items
      };
      var selectedKeyParts = this._getDirectoryPathKeyParts(this.getCurrentDirectory());
      this._resetDirectoryState(this._rootDirectoryInfo);
      return this._loadItemsRecursive(this._rootDirectoryInfo, cachedRootInfo).then(function () {
        var dirInfo = _this17._findDirectoryByPathKeyParts(selectedKeyParts);
        _this17.setCurrentDirectory(dirInfo);
        delete _this17._lockRefresh;
      });
    };
    _proto._loadItemsRecursive = function _loadItemsRecursive(directoryInfo, cachedDirectoryInfo) {
      var _this18 = this;
      return this.getDirectories(directoryInfo).then(function (dirInfos) {
        var itemDeferreds = [];
        var _loop = function _loop(i) {
          var cachedItem = cachedDirectoryInfo.items.find(function (cache) {
            return dirInfos[i].fileItem.key === cache.fileItem.key;
          });
          if (!cachedItem) return "continue";
          dirInfos[i].expanded = cachedItem.expanded;
          if (dirInfos[i].expanded) {
            itemDeferreds.push(_this18._loadItemsRecursive(dirInfos[i], cachedItem));
          }
        };
        for (var i = 0; i < dirInfos.length; i++) {
          var _ret = _loop(i);
          if (_ret === "continue") continue;
        }
        return (0, _uiFile_manager.whenSome)(itemDeferreds);
      }, function () {
        return null;
      });
    };
    _proto._setCurrentDirectoryByPathParts = function _setCurrentDirectoryByPathParts(pathParts, useKeys) {
      var _this19 = this;
      return this._executeDataLoad(function () {
        return _this19._setCurrentDirectoryByPathPartsInternal(pathParts, useKeys);
      }, OPERATIONS.NAVIGATION);
    };
    _proto._setCurrentDirectoryByPathPartsInternal = function _setCurrentDirectoryByPathPartsInternal(pathParts, useKeys) {
      var _this20 = this;
      return this._getDirectoryByPathParts(this._rootDirectoryInfo, pathParts, useKeys).then(function (directoryInfo) {
        for (var info = directoryInfo.parentDirectory; info; info = info.parentDirectory) {
          info.expanded = true;
        }
        _this20.setCurrentDirectory(directoryInfo);
      }, function () {
        _this20._raisePathPotentiallyChanged();
      });
    };
    _proto._executeDataLoad = function _executeDataLoad(action, operation) {
      var _this21 = this;
      if (this._dataLoadingDeferred) {
        return this._dataLoadingDeferred.then(function () {
          return _this21._executeDataLoad(action, operation);
        });
      }
      this._dataLoading = true;
      this._dataLoadingDeferred = new _deferred.Deferred();
      if (this._isInitialized) {
        this._raiseDataLoading(operation);
      }
      return action().always(function () {
        var tempDeferred = _this21._dataLoadingDeferred;
        _this21._dataLoadingDeferred = null;
        _this21._dataLoading = false;
        tempDeferred.resolve();
      });
    };
    _proto._getDirectoryByPathParts = function _getDirectoryByPathParts(parentDirectoryInfo, pathParts, useKeys) {
      var _this22 = this;
      if (pathParts.length < 1) {
        return new _deferred.Deferred().resolve(parentDirectoryInfo).promise();
      }
      var fieldName = useKeys ? 'key' : 'name';
      return this.getDirectories(parentDirectoryInfo).then(function (dirInfos) {
        var subDirInfo = dirInfos.find(function (d) {
          return d.fileItem[fieldName] === pathParts[0];
        });
        if (!subDirInfo) {
          return new _deferred.Deferred().reject().promise();
        }
        var restPathParts = _toConsumableArray(pathParts).splice(1);
        return _this22._getDirectoryByPathParts(subDirInfo, restPathParts, useKeys);
      });
    };
    _proto._getDirectoryPathKeyParts = function _getDirectoryPathKeyParts(directoryInfo) {
      var pathParts = [];
      while (directoryInfo && directoryInfo.parentDirectory) {
        pathParts.unshift(directoryInfo.fileItem.key);
        directoryInfo = directoryInfo.parentDirectory;
      }
      return pathParts;
    };
    _proto._findDirectoryByPathKeyParts = function _findDirectoryByPathKeyParts(keyParts) {
      var selectedDirInfo = this._rootDirectoryInfo;
      if (keyParts.length === 0) {
        return selectedDirInfo;
      }
      var i = 0;
      var newSelectedDir = selectedDirInfo;
      while (newSelectedDir && i < keyParts.length) {
        newSelectedDir = selectedDirInfo.items.find(function (info) {
          return info.fileItem.key === keyParts[i];
        });
        if (newSelectedDir) {
          selectedDirInfo = newSelectedDir;
        }
        i++;
      }
      return selectedDirInfo;
    };
    _proto._getActualDirectoryInfo = function _getActualDirectoryInfo(directoryInfo) {
      var keys = this._getDirectoryPathKeyParts(directoryInfo);
      return this._findDirectoryByPathKeyParts(keys);
    };
    _proto._createDirInfoByName = function _createDirInfoByName(name, parentDirectoryInfo) {
      var dirPathInfo = this._getPathInfo(parentDirectoryInfo);
      var fileItem = new _file_system_item.default(dirPathInfo, name, true);
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
        fileItem: fileItem,
        parentDirectory: parentDirectoryInfo,
        icon: this._getFileItemDefaultIcon(fileItem),
        getInternalKey: function getInternalKey() {
          return "FIK_".concat(this.fileItem.key);
        },
        getDisplayName: function getDisplayName() {
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
      var extension = fileItem.getFileExtension();
      var icon = this._defaultIconMap[extension];
      return icon || 'doc';
    };
    _proto._createDefaultIconMap = function _createDefaultIconMap() {
      var result = {
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
      ['.png', '.gif', '.jpg', '.jpeg', '.ico', '.bmp'].forEach(function (extension) {
        result[extension] = 'image';
      });
      return result;
    };
    _proto._createRootDirectoryInfo = function _createRootDirectoryInfo(text) {
      var rootDirectory = new _file_system_item.default(null, '', true);
      var result = this._createDirectoryInfo(rootDirectory, null);
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
        operation: operation
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
      var args = Array.prototype.slice.call(arguments, 1);
      if (this._isInitialized && this._options[actionName]) {
        var _this$_options;
        (_this$_options = this._options)[actionName].apply(_this$_options, _toConsumableArray(args));
      }
    };
    _proto._resetState = function _resetState() {
      this._selectedDirectory = null;
      this._rootDirectoryInfo.items = [];
      this._rootDirectoryInfo.itemsLoaded = false;
      this._loadedItems = {};
    };
    _proto._getPathInfo = function _getPathInfo(directoryInfo) {
      var pathInfo = [];
      for (var dirInfo = directoryInfo; dirInfo && !dirInfo.fileItem.isRoot(); dirInfo = dirInfo.parentDirectory) {
        pathInfo.unshift({
          key: dirInfo.fileItem.key,
          name: dirInfo.fileItem.name
        });
      }
      return pathInfo;
    };
    _proto.on = function on(eventName, eventHandler) {
      var finalEventName = "on".concat(eventName);
      this._options[finalEventName] = eventHandler;
    };
    _createClass(FileItemsController, [{
      key: "_editingEvents",
      get: function get() {
        return this._options.editingEvents;
      }
    }]);
    return FileItemsController;
  }();
  exports.FileItemsController = FileItemsController;
  var FileSecurityController = /*#__PURE__*/function () {
    function FileSecurityController(options) {
      var _this23 = this;
      var defaultOptions = {
        allowedFileExtensions: [],
        maxFileSize: 0
      };
      this._options = (0, _extend.extend)(defaultOptions, options);
      this._extensionsMap = {};
      this._allowedFileExtensions.forEach(function (extension) {
        _this23._extensionsMap[extension.toUpperCase()] = true;
      });
    }
    var _proto2 = FileSecurityController.prototype;
    _proto2.getAllowedItems = function getAllowedItems(items) {
      var _this24 = this;
      if (this._allowedFileExtensions.length === 0) {
        return items;
      }
      return items.filter(function (item) {
        return item.isDirectory || _this24._isValidExtension(item.name);
      });
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
      var extension = (0, _utils.getFileExtension)(name).toUpperCase();
      return this._extensionsMap[extension];
    };
    _createClass(FileSecurityController, [{
      key: "_allowedFileExtensions",
      get: function get() {
        return this._options.allowedFileExtensions;
      }
    }, {
      key: "_maxFileSize",
      get: function get() {
        return this._options.maxFileSize;
      }
    }]);
    return FileSecurityController;
  }();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../file_management/provider_base","../../file_management/file_system_item","../../file_management/object_provider","../../file_management/remote_provider","../../file_management/custom_provider","../../file_management/error","../../file_management/error_codes","../../file_management/utils","./ui.file_manager.common","../../core/utils/deferred","../../core/utils/extend","../../core/utils/common","../../core/utils/type","../../core/guid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../file_management/provider_base"), require("../../file_management/file_system_item"), require("../../file_management/object_provider"), require("../../file_management/remote_provider"), require("../../file_management/custom_provider"), require("../../file_management/error"), require("../../file_management/error_codes"), require("../../file_management/utils"), require("./ui.file_manager.common"), require("../../core/utils/deferred"), require("../../core/utils/extend"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/guid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=file_items_controller.js.map