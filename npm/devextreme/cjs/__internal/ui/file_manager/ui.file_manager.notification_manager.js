/**
* DevExtreme (cjs/__internal/ui/file_manager/ui.file_manager.notification_manager.js)
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
exports.NotificationManagerStub = exports.NotificationManager = exports.MANAGER_ID_NAME = void 0;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _icon = require("../../../core/utils/icon");
var _uiFile_managerNotification = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.notification.progress_panel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,max-classes-per-file */

const FILE_MANAGER_PROGRESS_BOX_CLASS = 'dx-filemanager-progress-box';
const FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-error`;
const FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-image`;
const FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-wrapper`;
const FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-common`;
const MANAGER_ID_NAME = exports.MANAGER_ID_NAME = '__operationInfoManager';
const ACTION_PROGRESS_STATUS = {
  default: 'default',
  progress: 'progress',
  error: 'error',
  success: 'success'
};
class NotificationManagerBase {
  constructor(_ref) {
    let {
      onActionProgressStatusChanged,
      isActual
    } = _ref;
    this._id = new _guid.default().toString();
    this._isActual = isActual || false;
    this._actionProgressStatus = ACTION_PROGRESS_STATUS.default;
    this._raiseActionProgress = onActionProgressStatusChanged;
  }
  getId() {
    return this._id;
  }
  isActual() {
    return this._isActual;
  }
  createErrorDetailsProgressBox($container, item, errorText) {
    const detailsItem = this._createDetailsItem($container, item);
    this.renderError(detailsItem.$wrapper, errorText);
  }
  renderError($container, errorText) {
    (0, _renderer.default)('<div>').text(errorText).addClass(FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS).appendTo($container);
  }
  isActionProgressStatusDefault() {
    return this._actionProgressStatus === ACTION_PROGRESS_STATUS.default;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createDetailsItem($container, item) {
    const $detailsItem = (0, _renderer.default)('<div>').appendTo($container);
    return this._createProgressBox($detailsItem, {
      commonText: item.commonText,
      imageUrl: item.imageUrl
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createProgressBox($container, options) {
    $container.addClass(FILE_MANAGER_PROGRESS_BOX_CLASS);
    if (options.imageUrl) {
      var _getImageContainer;
      (_getImageContainer = (0, _icon.getImageContainer)(options.imageUrl)) === null || _getImageContainer === void 0 || _getImageContainer.addClass(FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS).appendTo($container);
    }
    const $wrapper = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS).appendTo($container);
    const $commonText = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS).text(options.commonText).appendTo($wrapper);
    return {
      $commonText,
      $element: $container,
      $wrapper
    };
  }
}
class NotificationManagerStub extends NotificationManagerBase {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  addOperation() {
    return {
      [MANAGER_ID_NAME]: this._id
    };
  }
  addOperationDetails() {}
  updateOperationItemProgress() {}
  completeOperationItem() {}
  finishOperation() {}
  completeOperation() {}
  completeSingleOperationWithError() {}
  addOperationDetailsError() {}
  handleDimensionChanged() {
    return false;
  }
  ensureProgressPanelCreated() {}
  tryHideActionProgress() {
    this._updateActionProgress('', ACTION_PROGRESS_STATUS.default);
  }
  updateActionProgressStatus() {
    this._updateActionProgress('', ACTION_PROGRESS_STATUS.default);
  }
  _updateActionProgress(message, status) {
    if (status !== ACTION_PROGRESS_STATUS.default && status !== ACTION_PROGRESS_STATUS.progress) {
      return;
    }
    this._actionProgressStatus = status;
    this._raiseActionProgress(message, status);
  }
  hasNoOperations() {
    return true;
  }
  get _operationInProgressCount() {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set _operationInProgressCount(_value) {}
  get _failedOperationCount() {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set _failedOperationCount(_value) {}
}
exports.NotificationManagerStub = NotificationManagerStub;
class NotificationManager extends NotificationManagerBase {
  constructor(options) {
    super(options);
    this._failedOperationCount = 0;
    this._operationInProgressCount = 0;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
    var _this$_progressPanel;
    this._operationInProgressCount += 1;
    const operationInfo = (_this$_progressPanel = this._progressPanel) === null || _this$_progressPanel === void 0 ? void 0 : _this$_progressPanel.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate);
    operationInfo[MANAGER_ID_NAME] = this._id;
    this._updateActionProgress(processingMessage, ACTION_PROGRESS_STATUS.progress);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return operationInfo;
  }
  addOperationDetails(operationInfo, details, showCloseButton) {
    var _this$_progressPanel2;
    (_this$_progressPanel2 = this._progressPanel) === null || _this$_progressPanel2 === void 0 || _this$_progressPanel2.addOperationDetails(operationInfo, details, showCloseButton);
  }
  updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
    var _this$_progressPanel3;
    (_this$_progressPanel3 = this._progressPanel) === null || _this$_progressPanel3 === void 0 || _this$_progressPanel3.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress);
  }
  completeOperationItem(operationInfo, itemIndex, commonProgress) {
    var _this$_progressPanel4;
    (_this$_progressPanel4 = this._progressPanel) === null || _this$_progressPanel4 === void 0 || _this$_progressPanel4.completeOperationItem(operationInfo, itemIndex, commonProgress);
  }
  finishOperation(operationInfo, commonProgress) {
    var _this$_progressPanel5;
    (_this$_progressPanel5 = this._progressPanel) === null || _this$_progressPanel5 === void 0 || _this$_progressPanel5.updateOperationCommonProgress(operationInfo, commonProgress);
  }
  completeOperation(operationInfo, commonText, isError, statusText) {
    var _this$_progressPanel6;
    this._operationInProgressCount -= 1;
    if (isError) {
      this._failedOperationCount += 1;
    }
    (_this$_progressPanel6 = this._progressPanel) === null || _this$_progressPanel6 === void 0 || _this$_progressPanel6.completeOperation(operationInfo, commonText, isError, statusText);
  }
  completeSingleOperationWithError(operationInfo, errorInfo) {
    var _this$_progressPanel7;
    (_this$_progressPanel7 = this._progressPanel) === null || _this$_progressPanel7 === void 0 || _this$_progressPanel7.completeSingleOperationWithError(operationInfo, errorInfo.detailErrorText);
    this._notifyError(errorInfo);
  }
  addOperationDetailsError(operationInfo, errorInfo) {
    var _this$_progressPanel8;
    (_this$_progressPanel8 = this._progressPanel) === null || _this$_progressPanel8 === void 0 || _this$_progressPanel8.addOperationDetailsError(operationInfo, errorInfo.itemIndex, errorInfo.detailErrorText);
    this._notifyError(errorInfo);
  }
  handleDimensionChanged() {
    if (this._progressPanel) {
      this._progressPanel.$element().detach();
    }
    return true;
  }
  ensureProgressPanelCreated(container, options) {
    if (!this._progressPanel) {
      const $progressPanelElement = (0, _renderer.default)('<div>').appendTo(container);
      const ProgressPanelClass = this._getProgressPanelComponent();
      this._progressPanel = new ProgressPanelClass(
      // @ts-expect-error ts-error
      $progressPanelElement, (0, _extend.extend)({}, options, {
        onOperationClosed: _ref2 => {
          let {
            info
          } = _ref2;
          return this._onProgressPanelOperationClosed(info);
        }
      }));
    } else {
      this._progressPanel.$element().appendTo(container);
    }
  }
  // needed for editingProgress.tests.js
  _getProgressPanelComponent() {
    return _uiFile_managerNotification.default;
  }
  _onProgressPanelOperationClosed(operationInfo) {
    if (operationInfo.hasError) {
      this._failedOperationCount -= 1;
      this.tryHideActionProgress();
    }
  }
  tryHideActionProgress() {
    if (this.hasNoOperations()) {
      this._updateActionProgress('', ACTION_PROGRESS_STATUS.default);
    }
  }
  updateActionProgressStatus(operationInfo) {
    if (operationInfo) {
      const status = this._failedOperationCount === 0 ? ACTION_PROGRESS_STATUS.success : ACTION_PROGRESS_STATUS.error;
      this._updateActionProgress('', status);
    }
  }
  _notifyError(errorInfo) {
    const status = this.hasNoOperations() ? ACTION_PROGRESS_STATUS.default : ACTION_PROGRESS_STATUS.error;
    this._updateActionProgress(errorInfo.commonErrorText, status);
  }
  _updateActionProgress(message, status) {
    this._actionProgressStatus = status;
    this._raiseActionProgress(message, status);
  }
  hasNoOperations() {
    return this._operationInProgressCount === 0 && this._failedOperationCount === 0;
  }
  get _operationInProgressCount() {
    return this._operationInProgressCountInternal;
  }
  set _operationInProgressCount(value) {
    this._operationInProgressCountInternal = value;
  }
  get _failedOperationCount() {
    return this._failedOperationCountInternal;
  }
  set _failedOperationCount(value) {
    this._failedOperationCountInternal = value;
  }
}
exports.NotificationManager = NotificationManager;
