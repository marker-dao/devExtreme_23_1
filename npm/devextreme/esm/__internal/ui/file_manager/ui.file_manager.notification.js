/**
* DevExtreme (esm/__internal/ui/file_manager/ui.file_manager.notification.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { getWidth } from '../../../core/utils/size';
import { isFunction } from '../../../core/utils/type';
import { getWindow, hasWindow } from '../../../core/utils/window';
import Drawer from '../../../ui/drawer';
import Popup from '../../../ui/popup/ui.popup';
import Widget from '../../core/widget/widget';
import { MANAGER_ID_NAME, NotificationManager, NotificationManagerStub } from '../../ui/file_manager/ui.file_manager.notification_manager';
const window = getWindow();
const ADAPTIVE_STATE_SCREEN_WIDTH = 1000;
const FILE_MANAGER_NOTIFICATION_CLASS = 'dx-filemanager-notification';
const FILE_MANAGER_NOTIFICATION_DRAWER_CLASS = `${FILE_MANAGER_NOTIFICATION_CLASS}-drawer`;
const FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS = `${FILE_MANAGER_NOTIFICATION_DRAWER_CLASS}-panel`;
const FILE_MANAGER_NOTIFICATION_POPUP_CLASS = `${FILE_MANAGER_NOTIFICATION_CLASS}-popup`;
const FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS = `${FILE_MANAGER_NOTIFICATION_CLASS}-popup-error`;
const FILE_MANAGER_NOTIFICATION_COMMON_CLASS = `${FILE_MANAGER_NOTIFICATION_CLASS}-common`;
const FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS = `${FILE_MANAGER_NOTIFICATION_CLASS}-separator`;
const FILE_MANAGER_NOTIFICATION_DETAILS_CLASS = `${FILE_MANAGER_NOTIFICATION_CLASS}-details`;
const FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS = `${FILE_MANAGER_NOTIFICATION_CLASS}-common-no-item`;
class FileManagerNotificationControl extends Widget {
  _initMarkup() {
    super._initMarkup();
    this._initActions();
    this._isInAdaptiveState = this._isSmallScreen();
    this._managerMap = {};
    this._notificationManagerStubId = null;
    const {
      progressPanelContainer
    } = this.option();
    this._setNotificationManager();
    const $progressDrawer = $('<div>').addClass(FILE_MANAGER_NOTIFICATION_DRAWER_CLASS).appendTo($(progressPanelContainer));
    $('<div>').addClass(FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS).appendTo($progressDrawer);
    const drawerOptions = extend({
      opened: false,
      position: 'right',
      template: container => this._ensureProgressPanelCreated(container)
    }, this._getProgressDrawerAdaptiveOptions());
    this._progressDrawer = this._createComponent($progressDrawer, Drawer, drawerOptions);
    const $drawerContent = $progressDrawer.find(`.${FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS}`).first();
    const contentRenderer = this.option('contentTemplate');
    if (isFunction(contentRenderer)) {
      contentRenderer($drawerContent, this);
    }
  }
  _setNotificationManager(options) {
    // eslint-disable-next-line no-param-reassign
    options = extend({
      onActionProgressStatusChanged: this._raiseActionProgress.bind(this)
    }, options);
    if (!this._notificationManagerStubId) {
      const stubManager = new NotificationManagerStub(options);
      this._notificationManagerStubId = stubManager.getId();
      this._managerMap[this._notificationManagerStubId] = stubManager;
    }
    if (!this._isProgressDrawerDisabled()) {
      const notificationManagerComponent = this._getProgressManagerComponent();
      options.isActual = true;
      // eslint-disable-next-line new-cap
      const defaultManager = new notificationManagerComponent(options);
      this._managerMap[defaultManager.getId()] = defaultManager;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getNotificationManager(operationInfo) {
    const actualManagerId = (operationInfo === null || operationInfo === void 0 ? void 0 : operationInfo[MANAGER_ID_NAME]) || this._getActualNotificationManagerId();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._managerMap[actualManagerId] || this._managerMap[this._notificationManagerStubId];
  }
  _clearManagerMap() {
    const stubManager = this._managerMap[this._notificationManagerStubId];
    // @ts-expect-error ts-error
    delete this._managerMap;
    this._managerMap = {
      [this._notificationManagerStubId]: stubManager
    };
  }
  _getActualNotificationManagerId() {
    return Object.keys(this._managerMap).filter(managerId => this._managerMap[managerId].isActual())[0];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  tryShowProgressPanel() {
    // @ts-expect-error ts-error
    const promise = new Deferred();
    const notificationManager = this._getNotificationManager();
    if (notificationManager.isActionProgressStatusDefault() || this._isProgressDrawerOpened() || this._isProgressDrawerDisabled()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return promise.resolve().promise();
    }
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => {
      var _this$_progressDrawer;
      // @ts-expect-error ts-error
      (_this$_progressDrawer = this._progressDrawer) === null || _this$_progressDrawer === void 0 || _this$_progressDrawer.show().done(promise.resolve);
      this._hidePopup();
      notificationManager.tryHideActionProgress();
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return promise.promise();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
    const notificationManager = this._getNotificationManager();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return notificationManager.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate);
  }
  addOperationDetails(operationInfo, details, showCloseButton) {
    const notificationManager = this._getNotificationManager(operationInfo);
    notificationManager.addOperationDetails(operationInfo, details, showCloseButton);
  }
  updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
    const notificationManager = this._getNotificationManager(operationInfo);
    notificationManager.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress);
  }
  completeOperationItem(operationInfo, itemIndex, commonProgress) {
    const notificationManager = this._getNotificationManager(operationInfo);
    notificationManager.completeOperationItem(operationInfo, itemIndex, commonProgress);
  }
  finishOperation(operationInfo, commonProgress) {
    const notificationManager = this._getNotificationManager(operationInfo);
    notificationManager.finishOperation(operationInfo, commonProgress);
  }
  completeOperation(operationInfo, commonText, isError, statusText) {
    const notificationManager = this._getNotificationManager(operationInfo);
    if (!isError) {
      this._showPopup(commonText);
    }
    notificationManager.completeOperation(operationInfo, commonText, isError, statusText);
    if (!this._isProgressDrawerOpened() || !notificationManager.hasNoOperations()) {
      notificationManager.updateActionProgressStatus(operationInfo);
    } else {
      notificationManager.tryHideActionProgress();
    }
  }
  completeSingleOperationWithError(operationInfo, errorInfo) {
    const notificationManager = this._getNotificationManager(operationInfo);
    notificationManager.completeSingleOperationWithError(operationInfo, errorInfo);
    this._showPopupError(errorInfo);
  }
  addOperationDetailsError(operationInfo, errorInfo) {
    const notificationManager = this._getNotificationManager(operationInfo);
    notificationManager.addOperationDetailsError(operationInfo, errorInfo);
    this._showPopupError(errorInfo);
  }
  _hideProgressPanel() {
    // eslint-disable-next-line no-restricted-globals,@typescript-eslint/no-misused-promises
    setTimeout(() => {
      var _this$_progressDrawer2;
      return (_this$_progressDrawer2 = this._progressDrawer) === null || _this$_progressDrawer2 === void 0 ? void 0 : _this$_progressDrawer2.hide();
    });
  }
  _isSmallScreen() {
    if (!hasWindow()) {
      return false;
    }
    return getWidth(window) <= ADAPTIVE_STATE_SCREEN_WIDTH;
  }
  _dimensionChanged(dimension) {
    if (!(dimension && dimension === 'height')) {
      this._checkAdaptiveState();
    }
  }
  _checkAdaptiveState() {
    const oldState = this._isInAdaptiveState;
    this._isInAdaptiveState = this._isSmallScreen();
    if (oldState !== this._isInAdaptiveState && this._progressDrawer) {
      const notificationManager = this._getNotificationManager();
      if (notificationManager.handleDimensionChanged()) {
        const options = this._getProgressDrawerAdaptiveOptions();
        // @ts-expect-error ts-error
        this._progressDrawer.option(options);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getProgressDrawerAdaptiveOptions() {
    if (this._isInAdaptiveState) {
      return {
        openedStateMode: 'overlap',
        shading: true,
        hideOnOutsideClick: true
      };
    }
    return {
      openedStateMode: 'shrink',
      shading: false,
      hideOnOutsideClick: false
    };
  }
  _ensureProgressPanelCreated(container) {
    const notificationManager = this._getNotificationManager();
    notificationManager.ensureProgressPanelCreated(container, {
      onOperationCanceled: _ref => {
        let {
          info
        } = _ref;
        return this._raiseOperationCanceled(info);
      },
      // eslint-disable-next-line @stylistic/max-len
      onOperationItemCanceled: _ref2 => {
        let {
          item,
          itemIndex
        } = _ref2;
        return this._raiseOperationItemCanceled(item, itemIndex);
      },
      onPanelClosed: () => this._hideProgressPanel()
    });
  }
  // needed for editingProgress.tests.js
  _getProgressManagerComponent() {
    return NotificationManager;
  }
  _isProgressDrawerDisabled() {
    const {
      showProgressPanel
    } = this.option();
    return !showProgressPanel;
  }
  _isProgressDrawerOpened() {
    var _this$_progressDrawer3;
    const {
      opened
    } = ((_this$_progressDrawer3 = this._progressDrawer) === null || _this$_progressDrawer3 === void 0 ? void 0 : _this$_progressDrawer3.option()) ?? {};
    return opened;
  }
  _hidePopup(forceHide) {
    const {
      showNotificationPopup
    } = this.option();
    if (!showNotificationPopup && !forceHide) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._getNotificationPopup().hide();
  }
  _showPopup(content, errorMode) {
    var _this$_getNotificatio;
    const {
      showNotificationPopup
    } = this.option();
    if (this._isProgressDrawerOpened() || !showNotificationPopup) {
      return;
    }
    (_this$_getNotificatio = this._getNotificationPopup().$wrapper()) === null || _this$_getNotificatio === void 0 || _this$_getNotificatio.toggleClass(FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS, !!errorMode);
    this._getNotificationPopup().option('contentTemplate', content);
    const {
      visible
    } = this._getNotificationPopup().option();
    if (!visible) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._getNotificationPopup().show();
    }
  }
  _showPopupError(errorInfo) {
    const {
      showNotificationPopup
    } = this.option();
    if (!showNotificationPopup) {
      return;
    }
    const notificationManager = this._getNotificationManager();
    const $content = $('<div>');
    const $message = $('<div>').addClass(FILE_MANAGER_NOTIFICATION_COMMON_CLASS).text(errorInfo.commonErrorText);
    const $separator = $('<div>').addClass(FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS);
    $('<div>').appendTo($separator);
    const $details = $('<div>').addClass(FILE_MANAGER_NOTIFICATION_DETAILS_CLASS);
    if (errorInfo.item) {
      notificationManager.createErrorDetailsProgressBox($details, errorInfo.item, errorInfo.detailErrorText);
    } else {
      $message.addClass(FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS);
      notificationManager.renderError($details, errorInfo.detailErrorText);
    }
    // @ts-expect-error ts-error
    $content.append($message, $separator, $details);
    this._showPopup($content, true);
  }
  _getNotificationPopup() {
    if (!this._notificationPopup) {
      var _this$_progressDrawer4;
      const $popup = $('<div>').appendTo(this.$element());
      const {
        positionTargetSelector
      } = this.option();
      this._notificationPopup = this._createComponent($popup, Popup, {
        // @ts-expect-error ts-error
        container: this.$element(),
        width: 'auto',
        height: 'auto',
        showTitle: false,
        dragEnabled: false,
        shading: false,
        visible: false,
        hideOnOutsideClick: true,
        // @ts-expect-error ts-error
        animation: {
          duration: 0
        },
        position: {
          my: 'right top',
          at: 'right top',
          // @ts-expect-error ts-error
          of: (_this$_progressDrawer4 = this._progressDrawer) === null || _this$_progressDrawer4 === void 0 ? void 0 : _this$_progressDrawer4.$element().find(positionTargetSelector),
          offset: '-10 -5'
        },
        _wrapperClassExternal: FILE_MANAGER_NOTIFICATION_POPUP_CLASS
      });
    }
    return this._notificationPopup;
  }
  _raiseActionProgress(message, status) {
    var _this$_actions$onActi, _this$_actions;
    (_this$_actions$onActi = (_this$_actions = this._actions).onActionProgress) === null || _this$_actions$onActi === void 0 || _this$_actions$onActi.call(_this$_actions, {
      message,
      status
    });
  }
  _raiseOperationCanceled(info) {
    var _this$_actions$onOper, _this$_actions2;
    (_this$_actions$onOper = (_this$_actions2 = this._actions).onOperationCanceled) === null || _this$_actions$onOper === void 0 || _this$_actions$onOper.call(_this$_actions2, {
      info
    });
  }
  _raiseOperationItemCanceled(item, index) {
    var _this$_actions$onOper2, _this$_actions3;
    (_this$_actions$onOper2 = (_this$_actions3 = this._actions).onOperationItemCanceled) === null || _this$_actions$onOper2 === void 0 || _this$_actions$onOper2.call(_this$_actions3, {
      item,
      itemIndex: index
    });
  }
  _initActions() {
    this._actions = {
      onActionProgress: this._createActionByOption('onActionProgress'),
      onOperationCanceled: this._createActionByOption('onOperationCanceled'),
      onOperationItemCanceled: this._createActionByOption('onOperationItemCanceled')
    };
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      progressPanelContainer: undefined,
      contentTemplate: undefined,
      onActionProgress: undefined,
      onOperationCanceled: undefined,
      onOperationItemCanceled: undefined,
      showProgressPanel: true,
      showNotificationPopup: true
    });
  }
  _optionChanged(args) {
    var _this$_progressDrawer5;
    const {
      name
    } = args;
    switch (name) {
      case 'progressPanelContainer':
      case 'contentTemplate':
        break;
      case 'showProgressPanel':
        this._setNotificationManager();
        this._getNotificationManager().updateActionProgressStatus();
        if (!args.value) {
          this._hideProgressPanel();
          this._clearManagerMap();
        }
        (_this$_progressDrawer5 = this._progressDrawer) === null || _this$_progressDrawer5 === void 0 || _this$_progressDrawer5.repaint();
        break;
      case 'showNotificationPopup':
        if (!args.value) {
          this._hidePopup(true);
        }
        break;
      case 'onActionProgress':
      case 'onOperationCanceled':
      case 'onOperationItemCanceled':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default FileManagerNotificationControl;
