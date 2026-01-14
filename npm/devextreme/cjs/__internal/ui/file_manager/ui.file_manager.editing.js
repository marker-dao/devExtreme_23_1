/**
* DevExtreme (cjs/__internal/ui/file_manager/ui.file_manager.editing.js)
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
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _string = require("../../../core/utils/string");
var _type = require("../../../core/utils/type");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _uiFile_manager = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.dialog_manager"));
var _uiFile_manager2 = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.file_uploader"));
var _uiFile_manager3 = require("../../ui/file_manager/ui.file_manager.messages");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,max-classes-per-file */

class FileManagerActionContext {
  constructor(actionMetadata, itemInfos, directoryInfo) {
    this._actionMetadata = actionMetadata;
    this._itemInfos = itemInfos;
    this._onlyFiles = !this._actionMetadata.affectsAllItems && this._itemInfos.every(info => !info.fileItem.isDirectory);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this._items = this._itemInfos.map(itemInfo => itemInfo.fileItem);
    this._multipleItems = this._items.length > 1;
    this._location = directoryInfo.getDisplayName();
    this._singleRequest = true;
    this._completedItems = [];
    this._commonProgress = 0;
    this._errorState = {
      failedCount: 0
    };
    this._itemNewName = '';
  }
  completeOperationItem(itemIndex) {
    if (this._singleRequest) {
      this._completedItems = [...this._items];
    } else {
      const item = this._items[itemIndex];
      this._completedItems.push(item);
    }
    if (!this._actionMetadata.allowItemProgress) {
      this._commonProgress = this._completedItems.length / this._items.length * 100;
    }
  }
  processSingleRequestError(errorText) {
    this._errorState.failedCount = 1;
    this._errorState.commonErrorText = this._multipleItems ? this._actionMetadata.commonErrorMessage : this._actionMetadata.singleItemErrorMessage;
    const itemIndex = this._multipleItems ? -1 : 1;
    const itemInfo = this.getItemForSingleRequestError();
    this._setCurrentDetailError(itemIndex, itemInfo, errorText);
  }
  processMultipleRequestError(itemIndex, errorText) {
    this._errorState.failedCount += 1;
    this._errorState.commonErrorText = this._errorState.failedCount > 1 ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._errorState.failedCount) : this._actionMetadata.singleItemErrorMessage;
    const itemInfo = this.getItemForMultipleRequestError(itemIndex);
    this._setCurrentDetailError(itemIndex, itemInfo, errorText);
  }
  hasModifiedItems() {
    return this._hasCompletedItems() || this._singleRequest && !this.success && this._multipleItems;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getItemForSingleRequestError() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._multipleItems ? null : this._itemInfos[0];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getItemForMultipleRequestError(itemIndex) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._itemInfos[itemIndex];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getItemName(errorCode, itemIndex) {
    const itemInfo = this.singleRequest ? this.getItemForSingleRequestError() : this.getItemForMultipleRequestError(itemIndex);
    let result = itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.fileItem.name;
    if (this.itemNewName && this._isItemExistsErrorCode(errorCode)) {
      result = this.itemNewName;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  _isItemExistsErrorCode(errorCode) {
    return errorCode === _uiFile_manager3.ErrorCode.DirectoryExists || errorCode === _uiFile_manager3.ErrorCode.FileExists;
  }
  _setCurrentDetailError(itemIndex, itemInfo, errorText) {
    this._errorState.currentDetailError = {
      itemIndex,
      itemInfo,
      errorText
    };
  }
  _hasCompletedItems() {
    return this._completedItems.length > 0;
  }
  get actionMetadata() {
    return this._actionMetadata;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get itemInfos() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._itemInfos;
  }
  get itemNewName() {
    return this._itemNewName;
  }
  set itemNewName(value) {
    this._itemNewName = value;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get errorState() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._errorState;
  }
  get singleRequest() {
    return this._singleRequest;
  }
  set singleRequest(value) {
    this._singleRequest = value;
  }
  get multipleItems() {
    return this._multipleItems;
  }
  get onlyFiles() {
    return this._onlyFiles;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get processingMessage() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsProcessingMessage, this._items.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemProcessingMessage, this._location);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get successMessage() {
    if (this._hasCompletedItems()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsSuccessMessage, this._completedItems.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemSuccessMessage, this._location);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._items.length) : this._actionMetadata.singleItemErrorMessage;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get completionMessage() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.success ? this.successMessage : this.errorState.commonErrorText;
  }
  get statusText() {
    return this.success && !this._hasCompletedItems() ? this._actionMetadata.canceledMessage : undefined;
  }
  get commonProgress() {
    return this._commonProgress;
  }
  get success() {
    return !this._errorState.failedCount;
  }
}
class FileManagerEditingControl extends _widget.default {
  _initMarkup() {
    var _this$_controller, _this$_controller2, _this$_controller3, _this$_controller4, _this$_controller5, _this$_controller6, _this$_controller7, _this$_controller8, _this$_controller9;
    super._initMarkup();
    this._initActions();
    const {
      controller
    } = this.option();
    this._controller = controller;
    (_this$_controller = this._controller) === null || _this$_controller === void 0 || _this$_controller.on('EditActionStarting', this._onEditActionStarting.bind(this));
    (_this$_controller2 = this._controller) === null || _this$_controller2 === void 0 || _this$_controller2.on('EditActionResultAcquired', this._onEditActionResultAcquired.bind(this));
    (_this$_controller3 = this._controller) === null || _this$_controller3 === void 0 || _this$_controller3.on('EditActionItemError', this._onEditActionItemError.bind(this));
    (_this$_controller4 = this._controller) === null || _this$_controller4 === void 0 || _this$_controller4.on('EditActionError', this._onEditActionError.bind(this));
    (_this$_controller5 = this._controller) === null || _this$_controller5 === void 0 || _this$_controller5.on('CompleteEditActionItem', this._onCompleteEditActionItem.bind(this));
    (_this$_controller6 = this._controller) === null || _this$_controller6 === void 0 || _this$_controller6.on('CompleteEditAction', this._onCompleteEditAction.bind(this));
    const {
      model
    } = this.option();
    this._model = model;
    this._uploadOperationInfoMap = {};
    const {
      rtlEnabled
    } = this.option();
    this._dialogManager = new _uiFile_manager.default(this.$element(), {
      chooseDirectoryDialog: {
        provider: (_this$_controller7 = this._controller) === null || _this$_controller7 === void 0 ? void 0 : _this$_controller7._fileProvider,
        getDirectories: (_this$_controller8 = this._controller) === null || _this$_controller8 === void 0 ? void 0 : _this$_controller8.getDirectories.bind(this._controller),
        getCurrentDirectory: (_this$_controller9 = this._controller) === null || _this$_controller9 === void 0 ? void 0 : _this$_controller9.getCurrentDirectory.bind(this._controller)
      },
      rtlEnabled,
      onDialogClosed: this._onDialogClosed.bind(this)
    });
    this._fileUploader = this._createFileUploader();
    const {
      notificationControl
    } = this.option();
    if (notificationControl) {
      this._initNotificationControl(notificationControl);
    }
    this._createMetadataMap();
  }
  _initNotificationControl(notificationControl) {
    this._notificationControl = notificationControl;
    this._notificationControl.option({
      onOperationCanceled: _ref => {
        let {
          info
        } = _ref;
        return this._onCancelUploadSession(info);
      },
      onOperationItemCanceled: _ref2 => {
        let {
          item,
          itemIndex
        } = _ref2;
        return this._onCancelFileUpload(item, itemIndex);
      }
    });
  }
  _getFileUploaderComponent() {
    return _uiFile_manager2.default;
  }
  _createFileUploader() {
    const $fileUploader = (0, _renderer.default)('<div>').appendTo(this.$element());
    const {
      uploadDropZonePlaceholderContainer
    } = this.option();
    return this._createComponent($fileUploader, this._getFileUploaderComponent(), {
      getController: this._getFileUploaderController.bind(this),
      dropZonePlaceholderContainer: uploadDropZonePlaceholderContainer,
      onUploadSessionStarted: e => this._onUploadSessionStarted(e),
      onUploadProgress: e => this._onUploadProgress(e),
      onUploadFinished: e => this._onUploadFinished(e)
    });
  }
  setUploaderDropZone($element) {
    var _this$_fileUploader;
    (_this$_fileUploader = this._fileUploader) === null || _this$_fileUploader === void 0 || _this$_fileUploader.option('dropZone', $element);
  }
  setUploaderSplitterElement(element) {
    var _this$_fileUploader2;
    (_this$_fileUploader2 = this._fileUploader) === null || _this$_fileUploader2 === void 0 || _this$_fileUploader2.option('splitterElement', element);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFileUploaderController() {
    var _this$_controller0;
    const uploadDirectory = this.uploadDirectoryInfo.fileItem;
    return {
      chunkSize: (_this$_controller0 = this._controller) === null || _this$_controller0 === void 0 ? void 0 : _this$_controller0.getFileUploadChunkSize(),
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      uploadFileChunk: (fileData, chunksInfo) => {
        var _this$_controller1;
        return (_this$_controller1 = this._controller) === null || _this$_controller1 === void 0 ? void 0 : _this$_controller1.uploadFileChunk(fileData, chunksInfo, uploadDirectory);
      },
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      abortFileUpload: (fileData, chunksInfo) => {
        var _this$_controller10;
        return (_this$_controller10 = this._controller) === null || _this$_controller10 === void 0 ? void 0 : _this$_controller10.abortFileUpload(fileData, chunksInfo, uploadDirectory);
      }
    };
  }
  _createMetadataMap() {
    this._metadataMap = {
      create: {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        action: arg => this._tryCreate(arg),
        affectsAllItems: true,
        singleItemProcessingMessage: _message.default.format('dxFileManager-editingCreateSingleItemProcessingMessage'),
        singleItemSuccessMessage: _message.default.format('dxFileManager-editingCreateSingleItemSuccessMessage'),
        singleItemErrorMessage: _message.default.format('dxFileManager-editingCreateSingleItemErrorMessage'),
        commonErrorMessage: _message.default.format('dxFileManager-editingCreateCommonErrorMessage')
      },
      rename: {
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unsafe-return
        action: arg => this._tryRename(arg),
        singleItemProcessingMessage: _message.default.format('dxFileManager-editingRenameSingleItemProcessingMessage'),
        singleItemSuccessMessage: _message.default.format('dxFileManager-editingRenameSingleItemSuccessMessage'),
        singleItemErrorMessage: _message.default.format('dxFileManager-editingRenameSingleItemErrorMessage'),
        commonErrorMessage: _message.default.format('dxFileManager-editingRenameCommonErrorMessage')
      },
      delete: {
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unsafe-return
        action: arg => this._tryDelete(arg),
        singleItemProcessingMessage: _message.default.format('dxFileManager-editingDeleteSingleItemProcessingMessage'),
        multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsProcessingMessage'),
        singleItemSuccessMessage: _message.default.format('dxFileManager-editingDeleteSingleItemSuccessMessage'),
        multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsSuccessMessage'),
        singleItemErrorMessage: _message.default.format('dxFileManager-editingDeleteSingleItemErrorMessage'),
        multipleItemsErrorMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsErrorMessage'),
        commonErrorMessage: _message.default.format('dxFileManager-editingDeleteCommonErrorMessage')
      },
      move: {
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unsafe-return
        action: arg => this._tryMove(arg),
        singleItemProcessingMessage: _message.default.format('dxFileManager-editingMoveSingleItemProcessingMessage'),
        multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsProcessingMessage'),
        singleItemSuccessMessage: _message.default.format('dxFileManager-editingMoveSingleItemSuccessMessage'),
        multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsSuccessMessage'),
        singleItemErrorMessage: _message.default.format('dxFileManager-editingMoveSingleItemErrorMessage'),
        multipleItemsErrorMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsErrorMessage'),
        commonErrorMessage: _message.default.format('dxFileManager-editingMoveCommonErrorMessage')
      },
      copy: {
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unsafe-return
        action: arg => this._tryCopy(arg),
        singleItemProcessingMessage: _message.default.format('dxFileManager-editingCopySingleItemProcessingMessage'),
        multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsProcessingMessage'),
        singleItemSuccessMessage: _message.default.format('dxFileManager-editingCopySingleItemSuccessMessage'),
        multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsSuccessMessage'),
        singleItemErrorMessage: _message.default.format('dxFileManager-editingCopySingleItemErrorMessage'),
        multipleItemsErrorMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsErrorMessage'),
        commonErrorMessage: _message.default.format('dxFileManager-editingCopyCommonErrorMessage')
      },
      upload: {
        action: arg => this._tryUpload(arg),
        allowCancel: true,
        allowItemProgress: true,
        singleItemProcessingMessage: _message.default.format('dxFileManager-editingUploadSingleItemProcessingMessage'),
        multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsProcessingMessage'),
        singleItemSuccessMessage: _message.default.format('dxFileManager-editingUploadSingleItemSuccessMessage'),
        multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsSuccessMessage'),
        singleItemErrorMessage: _message.default.format('dxFileManager-editingUploadSingleItemErrorMessage'),
        multipleItemsErrorMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsErrorMessage'),
        canceledMessage: _message.default.format('dxFileManager-editingUploadCanceledMessage')
      },
      download: {
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unsafe-return
        action: arg => this._download(arg),
        singleItemProcessingMessage: '',
        multipleItemsProcessingMessage: '',
        singleItemErrorMessage: _message.default.format('dxFileManager-editingDownloadSingleItemErrorMessage'),
        multipleItemsErrorMessage: _message.default.format('dxFileManager-editingDownloadMultipleItemsErrorMessage')
      },
      getItemContent: {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        action: arg => this._getItemContent(arg)
      },
      getItems: {
        singleItemProcessingMessage: '',
        singleItemErrorMessage: _message.default.format('dxFileManager-errorDirectoryOpenFailed'),
        commonErrorMessage: _message.default.format('dxFileManager-errorDirectoryOpenFailed')
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getCommandActions() {
    const result = {};
    (0, _iterator.each)(this._metadataMap, name => {
      if (Object.prototype.hasOwnProperty.call(this._metadataMap, name)) {
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/explicit-function-return-type
        result[name] = arg => this._executeAction(name, arg);
      }
    });
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _executeAction(actionName, arg) {
    var _this$_metadataMap, _actionMetadata$actio;
    const actionMetadata = (_this$_metadataMap = this._metadataMap) === null || _this$_metadataMap === void 0 ? void 0 : _this$_metadataMap[actionName];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return actionMetadata ? actionMetadata === null || actionMetadata === void 0 || (_actionMetadata$actio = actionMetadata.action) === null || _actionMetadata$actio === void 0 ? void 0 : _actionMetadata$actio.call(actionMetadata, arg) : null;
  }
  _onCancelUploadSession(info) {
    var _this$_fileUploader3;
    (_this$_fileUploader3 = this._fileUploader) === null || _this$_fileUploader3 === void 0 || _this$_fileUploader3.cancelUpload(info.uploadSessionId);
  }
  _onCancelFileUpload(item, itemIndex) {
    var _this$_fileUploader4;
    (_this$_fileUploader4 = this._fileUploader) === null || _this$_fileUploader4 === void 0 || _this$_fileUploader4.cancelFileUpload(item.info.uploadSessionId, itemIndex);
  }
  _onUploadProgress(_ref3) {
    var _this$_notificationCo;
    let {
      sessionId,
      fileIndex,
      commonValue,
      fileValue
    } = _ref3;
    const {
      operationInfo
    } = this._uploadOperationInfoMap[sessionId];
    (_this$_notificationCo = this._notificationControl) === null || _this$_notificationCo === void 0 || _this$_notificationCo.updateOperationItemProgress(operationInfo, fileIndex, fileValue * 100, commonValue * 100);
  }
  _onUploadFinished(_ref4) {
    var _this$_notificationCo2;
    let {
      sessionId,
      commonValue
    } = _ref4;
    const {
      operationInfo
    } = this._uploadOperationInfoMap[sessionId];
    (_this$_notificationCo2 = this._notificationControl) === null || _this$_notificationCo2 === void 0 || _this$_notificationCo2.finishOperation(operationInfo, commonValue * 100);
    this._scheduleUploadSessionDisposal(sessionId, 'uploader');
  }
  _onUploadSessionStarted(_ref5) {
    var _this$_controller11;
    let {
      sessionInfo
    } = _ref5;
    (_this$_controller11 = this._controller) === null || _this$_controller11 === void 0 || _this$_controller11.processUploadSession(sessionInfo, this.uploadDirectoryInfo);
  }
  _onEditActionStarting(actionInfo) {
    var _this$_metadataMap2, _this$_notificationCo3;
    const actionMetadata = ((_this$_metadataMap2 = this._metadataMap) === null || _this$_metadataMap2 === void 0 ? void 0 : _this$_metadataMap2[actionInfo.name]) ?? {};
    const context = new FileManagerActionContext(actionMetadata, actionInfo.itemInfos, actionInfo.directory);
    const operationInfo = (_this$_notificationCo3 = this._notificationControl) === null || _this$_notificationCo3 === void 0 ? void 0 : _this$_notificationCo3.addOperation(context.processingMessage, actionMetadata === null || actionMetadata === void 0 ? void 0 : actionMetadata.allowCancel, !(actionMetadata !== null && actionMetadata !== void 0 && actionMetadata.allowItemProgress));
    (0, _extend.extend)(actionInfo.customData, {
      context,
      operationInfo
    });
    switch (actionInfo.name) {
      case 'upload':
        {
          const {
            sessionId
          } = actionInfo.customData.sessionInfo;
          operationInfo.uploadSessionId = sessionId;
          this._uploadOperationInfoMap[sessionId] = {
            operationInfo
          };
          break;
        }
      case 'rename':
        actionInfo.customData.context.itemNewName = actionInfo.customData.itemNewName;
        break;
      default:
        break;
    }
  }
  _onEditActionResultAcquired(actionInfo) {
    var _this$_notificationCo4;
    const {
      context,
      operationInfo
    } = actionInfo.customData;
    context.singleRequest = actionInfo.singleRequest;
    const details = context.itemInfos.map(itemInfo => this._getItemProgressDisplayInfo(itemInfo));
    (_this$_notificationCo4 = this._notificationControl) === null || _this$_notificationCo4 === void 0 || _this$_notificationCo4.addOperationDetails(operationInfo, details, context.actionMetadata.allowCancel);
  }
  _onEditActionError(actionInfo, errorInfo) {
    const {
      context,
      operationInfo
    } = actionInfo.customData;
    context.singleRequest = actionInfo.singleRequest;
    this._handleActionError(operationInfo, context, errorInfo);
    this._completeAction(operationInfo, context);
  }
  _onEditActionItemError(actionInfo, errorInfo) {
    const {
      context,
      operationInfo
    } = actionInfo.customData;
    this._handleActionError(operationInfo, context, errorInfo);
  }
  _onCompleteEditActionItem(actionInfo, info) {
    var _info$result;
    const {
      context,
      operationInfo
    } = actionInfo.customData;
    if (!((_info$result = info.result) !== null && _info$result !== void 0 && _info$result.canceled)) {
      var _this$_notificationCo5;
      context.completeOperationItem(info.index);
      (_this$_notificationCo5 = this._notificationControl) === null || _this$_notificationCo5 === void 0 || _this$_notificationCo5.completeOperationItem(operationInfo, info.index, context.commonProgress);
    }
  }
  _onCompleteEditAction(actionInfo) {
    const {
      context,
      operationInfo
    } = actionInfo.customData;
    this._completeAction(operationInfo, context);
    if (actionInfo.name === 'upload') {
      this._scheduleUploadSessionDisposal(actionInfo.customData.sessionInfo.sessionId, 'controller');
    }
  }
  _scheduleUploadSessionDisposal(sessionId, requester) {
    if ((0, _type.isDefined)(this._uploadOperationInfoMap[sessionId].requester) && this._uploadOperationInfoMap[sessionId].requester !== requester) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._uploadOperationInfoMap[sessionId];
    } else {
      this._uploadOperationInfoMap[sessionId].requester = requester;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _tryCreate(parentDirectories) {
    var _this$_showDialog, _this$_dialogManager;
    const parentDirectoryInfo = (parentDirectories === null || parentDirectories === void 0 ? void 0 : parentDirectories[0]) || this._getCurrentDirectory();
    const newDirName = _message.default.format('dxFileManager-newDirectoryName');
    return (_this$_showDialog = this._showDialog((_this$_dialogManager = this._dialogManager) === null || _this$_dialogManager === void 0 ? void 0 : _this$_dialogManager.getCreateItemDialog(), newDirName)) === null || _this$_showDialog === void 0 ? void 0 : _this$_showDialog.then(_ref6 => {
      var _this$_controller12;
      let {
        name
      } = _ref6;
      return (_this$_controller12 = this._controller) === null || _this$_controller12 === void 0 ? void 0 : _this$_controller12.createDirectory(parentDirectoryInfo, name);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _tryRename(itemInfos) {
    var _this$_model, _this$_model$getMulti, _this$_showDialog2, _this$_dialogManager2;
    const itemInfo = (itemInfos === null || itemInfos === void 0 ? void 0 : itemInfos[0]) || ((_this$_model = this._model) === null || _this$_model === void 0 || (_this$_model$getMulti = _this$_model.getMultipleSelectedItems) === null || _this$_model$getMulti === void 0 ? void 0 : _this$_model$getMulti.call(_this$_model)[0]);
    if (!itemInfo) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().reject().promise();
    }
    return (_this$_showDialog2 = this._showDialog((_this$_dialogManager2 = this._dialogManager) === null || _this$_dialogManager2 === void 0 ? void 0 : _this$_dialogManager2.getRenameItemDialog(), itemInfo.fileItem.name)) === null || _this$_showDialog2 === void 0 ? void 0 : _this$_showDialog2.then(_ref7 => {
      var _this$_controller13;
      let {
        name
      } = _ref7;
      return (_this$_controller13 = this._controller) === null || _this$_controller13 === void 0 ? void 0 : _this$_controller13.renameItem(itemInfo, name);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _tryDelete(itemInfos) {
    var _this$_model2, _this$_model2$getMult, _this$_showDialog3, _this$_dialogManager3;
    // eslint-disable-next-line no-param-reassign
    itemInfos = itemInfos || ((_this$_model2 = this._model) === null || _this$_model2 === void 0 || (_this$_model2$getMult = _this$_model2.getMultipleSelectedItems) === null || _this$_model2$getMult === void 0 ? void 0 : _this$_model2$getMult.call(_this$_model2));
    if (itemInfos.length === 0) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().reject().promise();
    }
    const itemName = itemInfos[0].fileItem.name;
    const itemCount = itemInfos.length;
    return (_this$_showDialog3 = this._showDialog((_this$_dialogManager3 = this._dialogManager) === null || _this$_dialogManager3 === void 0 ? void 0 : _this$_dialogManager3.getDeleteItemDialog(), {
      itemName,
      itemCount
    })) === null || _this$_showDialog3 === void 0 ? void 0 : _this$_showDialog3.then(() => {
      var _this$_controller14;
      return (_this$_controller14 = this._controller) === null || _this$_controller14 === void 0 ? void 0 : _this$_controller14.deleteItems(itemInfos);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _tryMove(itemInfos) {
    var _this$_model3, _this$_model3$getMult, _this$_showDialog4, _this$_dialogManager4;
    // eslint-disable-next-line no-param-reassign
    itemInfos = itemInfos || ((_this$_model3 = this._model) === null || _this$_model3 === void 0 || (_this$_model3$getMult = _this$_model3.getMultipleSelectedItems) === null || _this$_model3$getMult === void 0 ? void 0 : _this$_model3$getMult.call(_this$_model3));
    if (itemInfos.length === 0) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().reject().promise();
    }
    return (_this$_showDialog4 = this._showDialog((_this$_dialogManager4 = this._dialogManager) === null || _this$_dialogManager4 === void 0 ? void 0 : _this$_dialogManager4.getMoveDialog(itemInfos))) === null || _this$_showDialog4 === void 0 ? void 0 : _this$_showDialog4.then(_ref8 => {
      var _this$_controller15;
      let {
        folder
      } = _ref8;
      return (_this$_controller15 = this._controller) === null || _this$_controller15 === void 0 ? void 0 : _this$_controller15.moveItems(itemInfos, folder);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _tryCopy(itemInfos) {
    var _this$_model4, _this$_model4$getMult, _this$_showDialog5, _this$_dialogManager5;
    // eslint-disable-next-line no-param-reassign
    itemInfos = itemInfos || ((_this$_model4 = this._model) === null || _this$_model4 === void 0 || (_this$_model4$getMult = _this$_model4.getMultipleSelectedItems) === null || _this$_model4$getMult === void 0 ? void 0 : _this$_model4$getMult.call(_this$_model4));
    if (itemInfos.length === 0) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().reject().promise();
    }
    return (_this$_showDialog5 = this._showDialog((_this$_dialogManager5 = this._dialogManager) === null || _this$_dialogManager5 === void 0 ? void 0 : _this$_dialogManager5.getCopyDialog(itemInfos))) === null || _this$_showDialog5 === void 0 ? void 0 : _this$_showDialog5.then(_ref9 => {
      var _this$_controller16;
      let {
        folder
      } = _ref9;
      return (_this$_controller16 = this._controller) === null || _this$_controller16 === void 0 ? void 0 : _this$_controller16.copyItems(itemInfos, folder);
    });
  }
  _tryUpload(destinationFolder) {
    var _this$_fileUploader5;
    this._uploadDirectoryInfo = destinationFolder === null || destinationFolder === void 0 ? void 0 : destinationFolder[0];
    (_this$_fileUploader5 = this._fileUploader) === null || _this$_fileUploader5 === void 0 || _this$_fileUploader5.tryUpload();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _download(itemInfos) {
    var _this$_model5, _this$_model5$getMult, _this$_controller17;
    // eslint-disable-next-line no-param-reassign
    itemInfos = itemInfos || ((_this$_model5 = this._model) === null || _this$_model5 === void 0 || (_this$_model5$getMult = _this$_model5.getMultipleSelectedItems) === null || _this$_model5$getMult === void 0 ? void 0 : _this$_model5$getMult.call(_this$_model5));
    if (itemInfos.length === 0) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return new _deferred.Deferred().reject().promise();
    }
    return (_this$_controller17 = this._controller) === null || _this$_controller17 === void 0 ? void 0 : _this$_controller17.downloadItems(itemInfos);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemContent(itemInfos) {
    var _this$_model6, _this$_model6$getMult, _this$_controller18;
    // eslint-disable-next-line no-param-reassign
    itemInfos = itemInfos || ((_this$_model6 = this._model) === null || _this$_model6 === void 0 || (_this$_model6$getMult = _this$_model6.getMultipleSelectedItems) === null || _this$_model6$getMult === void 0 ? void 0 : _this$_model6$getMult.call(_this$_model6));
    return (_this$_controller18 = this._controller) === null || _this$_controller18 === void 0 ? void 0 : _this$_controller18.getItemContent(itemInfos);
  }
  _completeAction(operationInfo, context) {
    var _this$_notificationCo6;
    (_this$_notificationCo6 = this._notificationControl) === null || _this$_notificationCo6 === void 0 || _this$_notificationCo6.completeOperation(operationInfo, context.completionMessage, !context.success, context.statusText);
    if (context.hasModifiedItems()) {
      this._raiseOnSuccess(context.onlyFiles);
    }
  }
  _handleActionError(operationInfo, context, errorInfo) {
    operationInfo.hasError = true;
    if (context.singleRequest) {
      this._handleSingleRequestActionError(operationInfo, context, errorInfo);
    } else {
      this._handleMultipleRequestActionError(operationInfo, context, errorInfo);
    }
  }
  _handleSingleRequestActionError(operationInfo, context, errorInfo) {
    var _this$_notificationCo7;
    const itemInfo = context.getItemForSingleRequestError();
    const itemName = context.getItemName(errorInfo.errorCode);
    const errorText = this._getErrorText(errorInfo, itemInfo, itemName);
    context.processSingleRequestError(errorText);
    const operationErrorInfo = this._getOperationErrorInfo(context);
    (_this$_notificationCo7 = this._notificationControl) === null || _this$_notificationCo7 === void 0 || _this$_notificationCo7.completeSingleOperationWithError(operationInfo, operationErrorInfo);
    if (context.multipleItems) {
      this._raiseOnSuccess(context.onlyFiles);
    }
  }
  _handleMultipleRequestActionError(operationInfo, context, errorInfo) {
    var _this$_notificationCo8;
    const itemInfo = context.getItemForMultipleRequestError(errorInfo.index);
    const itemName = context.getItemName(errorInfo.errorCode, errorInfo.index);
    const errorText = this._getErrorText(errorInfo, itemInfo, itemName);
    context.processMultipleRequestError(errorInfo.index, errorText);
    const operationErrorInfo = this._getOperationErrorInfo(context);
    (_this$_notificationCo8 = this._notificationControl) === null || _this$_notificationCo8 === void 0 || _this$_notificationCo8.addOperationDetailsError(operationInfo, operationErrorInfo);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getOperationErrorInfo(context) {
    const detailError = context.errorState.currentDetailError;
    return {
      commonErrorText: context.errorState.commonErrorText,
      item: detailError.itemInfo ? this._getItemProgressDisplayInfo(detailError.itemInfo) : null,
      itemIndex: detailError.itemIndex,
      detailErrorText: detailError.errorText
    };
  }
  _getErrorText(errorInfo, itemInfo, itemName) {
    const errorText = errorInfo.errorText || _uiFile_manager3.FileManagerMessages.get(errorInfo.errorCode, itemName);
    const errorArgs = {
      fileSystemItem: itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.fileItem,
      errorCode: errorInfo.errorCode,
      errorText
    };
    this._raiseOnError(errorArgs);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return errorArgs.errorText;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemProgressDisplayInfo(itemInfo) {
    return {
      commonText: itemInfo.fileItem.name,
      imageUrl: this._getItemThumbnail(itemInfo)
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _showDialog(dialog, dialogArgument) {
    var _this$_dialogDeferred;
    // @ts-expect-error ts-error
    this._dialogDeferred = new _deferred.Deferred();
    dialog.show(dialogArgument);
    return (_this$_dialogDeferred = this._dialogDeferred) === null || _this$_dialogDeferred === void 0 ? void 0 : _this$_dialogDeferred.promise();
  }
  _onDialogClosed(e) {
    const result = e.dialogResult;
    if (result) {
      var _this$_dialogDeferred2;
      (_this$_dialogDeferred2 = this._dialogDeferred) === null || _this$_dialogDeferred2 === void 0 || _this$_dialogDeferred2.resolve(result);
    } else {
      var _this$_dialogDeferred3;
      (_this$_dialogDeferred3 = this._dialogDeferred) === null || _this$_dialogDeferred3 === void 0 || _this$_dialogDeferred3.reject();
    }
  }
  updateDialogRtl(value) {
    var _this$_dialogManager6;
    (_this$_dialogManager6 = this._dialogManager) === null || _this$_dialogManager6 === void 0 || _this$_dialogManager6.updateDialogRtl(value);
  }
  _getItemThumbnail(item) {
    const {
      getItemThumbnail
    } = this.option();
    if (!getItemThumbnail) {
      return null;
    }
    const info = getItemThumbnail(item);
    return info ? info.thumbnail : null;
  }
  _initActions() {
    this._actions = {
      onSuccess: this._createActionByOption('onSuccess'),
      onError: this._createActionByOption('onError')
    };
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      model: {
        getMultipleSelectedItems: undefined
      },
      notificationControl: undefined,
      getItemThumbnail: undefined,
      onSuccess: undefined,
      onError: undefined
    });
  }
  _optionChanged(args) {
    var _this$_fileUploader6;
    const {
      name
    } = args;
    switch (name) {
      case 'model':
        this.repaint();
        break;
      case 'notificationControl':
        this._initNotificationControl(args.value);
        break;
      case 'getItemThumbnail':
        break;
      case 'uploadDropZonePlaceholderContainer':
        (_this$_fileUploader6 = this._fileUploader) === null || _this$_fileUploader6 === void 0 || _this$_fileUploader6.option('dropZonePlaceholderContainer', args.value);
        break;
      case 'onSuccess':
      case 'onError':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _raiseOnSuccess(updatedOnlyFiles) {
    var _this$_actions$onSucc, _this$_actions;
    (_this$_actions$onSucc = (_this$_actions = this._actions).onSuccess) === null || _this$_actions$onSucc === void 0 || _this$_actions$onSucc.call(_this$_actions, {
      updatedOnlyFiles
    });
  }
  _raiseOnError(args) {
    var _this$_actions$onErro, _this$_actions2;
    (_this$_actions$onErro = (_this$_actions2 = this._actions).onError) === null || _this$_actions$onErro === void 0 || _this$_actions$onErro.call(_this$_actions2, args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCurrentDirectory() {
    var _this$_controller19;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_controller19 = this._controller) === null || _this$_controller19 === void 0 ? void 0 : _this$_controller19.getCurrentDirectory();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get uploadDirectoryInfo() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._uploadDirectoryInfo || this._getCurrentDirectory();
  }
}
var _default = exports.default = FileManagerEditingControl;
