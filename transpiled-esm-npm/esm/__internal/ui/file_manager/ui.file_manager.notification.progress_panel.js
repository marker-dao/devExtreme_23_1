/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { ensureDefined } from '../../../core/utils/common';
import { getImageContainer } from '../../../core/utils/icon';
import Button from '../../../ui/button';
import ProgressBar from '../../../ui/progress_bar';
import ScrollView from '../../../ui/scroll_view';
import Widget from '../../core/widget/widget';
const FILE_MANAGER_PROGRESS_PANEL_CLASS = 'dx-filemanager-progress-panel';
const FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-container`;
const FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-title`;
const FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-title-text`;
const FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-close-button`;
const FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-infos-container`;
const FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-separator`;
const FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-info`;
const FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-common`;
const FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-info-with-details`;
const FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS = `${FILE_MANAGER_PROGRESS_PANEL_CLASS}-details`;
const FILE_MANAGER_PROGRESS_BOX_CLASS = 'dx-filemanager-progress-box';
const FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-error`;
const FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-without-close-button`;
const FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-image`;
const FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-wrapper`;
const FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-common`;
const FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-progress-bar`;
const FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS = `${FILE_MANAGER_PROGRESS_BOX_CLASS}-close-button`;
const DX_CARD_CLASS = 'dx-card';
class FileManagerProgressPanel extends Widget {
  _initMarkup() {
    super._initMarkup();
    this._initActions();
    this._operationCount = 0;
    this.$element().addClass(FILE_MANAGER_PROGRESS_PANEL_CLASS);
    const $scrollView = $('<div>').appendTo(this.$element());
    const $container = $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS).appendTo($scrollView);
    this._scrollView = this._createComponent($scrollView, ScrollView, {
      scrollByContent: true,
      scrollByThumb: true,
      showScrollbar: 'onScroll'
    });
    const $title = $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS).appendTo($container);
    $('<div>').text(messageLocalization.format('dxFileManager-notificationProgressPanelTitle')).addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS).appendTo($title);
    const $closeButton = $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS).appendTo($title);
    this._createComponent($closeButton, Button, {
      icon: 'close',
      stylingMode: 'text',
      onClick: () => this._raisePanelClosed()
    });
    this._$infosContainer = $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS).appendTo($container);
    this._renderEmptyListText();
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      onOperationClosed: undefined,
      onOperationCanceled: undefined,
      onOperationItemCanceled: undefined,
      onPanelClosed: undefined
    });
  }
  _initActions() {
    this._actions = {
      onOperationClosed: this._createActionByOption('onOperationClosed'),
      onOperationCanceled: this._createActionByOption('onOperationCanceled'),
      onOperationItemCanceled: this._createActionByOption('onOperationItemCanceled'),
      onPanelClosed: this._createActionByOption('onPanelClosed')
    };
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'onOperationClosed':
      case 'onOperationCanceled':
      case 'onOperationItemCanceled':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  addOperation(commonText, showCloseButtonAlways, allowProgressAutoUpdate) {
    if (this._operationCount) {
      $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS).prependTo(this._$infosContainer);
    } else {
      var _this$_$infosContaine;
      (_this$_$infosContaine = this._$infosContainer) === null || _this$_$infosContaine === void 0 || _this$_$infosContaine.empty();
    }
    this._operationCount += 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const info = {
      customCloseHandling: showCloseButtonAlways,
      allowProgressAutoUpdate: ensureDefined(allowProgressAutoUpdate, true)
    };
    const $info = $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS).prependTo(this._$infosContainer);
    info.$info = $info;
    const $common = $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS).appendTo($info);
    info.common = this._createProgressBox($common, {
      commonText,
      showCloseButton: true,
      showCloseButtonAlways,
      onCloseButtonClick: () => this._closeOperation(info)
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return info;
  }
  addOperationDetails(info, details, showCloseButton) {
    info.$info.addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS);
    const $details = $('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS).appendTo(info.$info);
    info.details = details.map((itemInfo, index) => {
      itemInfo.info = info;
      return this._createDetailsItem($details, itemInfo, index, false, showCloseButton);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createDetailsItem($container, item, itemIndex, skipProgressBox, showCloseButton) {
    const $detailsItem = $('<div>').appendTo($container);
    if (itemIndex !== -1) {
      $detailsItem.addClass(DX_CARD_CLASS);
    }
    return this._createProgressBox($detailsItem, {
      commonText: item.commonText,
      imageUrl: item.imageUrl,
      skipProgressBox,
      showCloseButton,
      showCloseButtonAlways: showCloseButton,
      onCloseButtonClick: () => this._cancelOperationItem(item, itemIndex)
    });
  }
  completeOperationItem(operationInfo, itemIndex, commonProgress) {
    if (operationInfo.allowProgressAutoUpdate) {
      this.updateOperationItemProgress(operationInfo, itemIndex, 100, commonProgress);
    }
    this._setCloseButtonVisible(operationInfo.details[itemIndex], false);
  }
  updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
    this.updateOperationCommonProgress(operationInfo, commonProgress);
    if (operationInfo.details) {
      const detailsItem = operationInfo.details[itemIndex];
      detailsItem.progressBar.option('value', itemProgress);
    }
  }
  updateOperationCommonProgress(operationInfo, commonProgress) {
    var _operationInfo$common;
    (_operationInfo$common = operationInfo.common.progressBar) === null || _operationInfo$common === void 0 || _operationInfo$common.option('value', commonProgress);
  }
  completeOperation(info, commonText, isError, statusText) {
    info.completed = true;
    info.common.$commonText.text(commonText);
    if (isError) {
      this._removeProgressBar(info.common);
    } else if (info.allowProgressAutoUpdate) {
      this.updateOperationCommonProgress(info, 100);
    }
    if (statusText) {
      this._setProgressBarText(info.common, statusText);
    }
    this._setCloseButtonVisible(info.common, true);
  }
  completeSingleOperationWithError(info, errorText) {
    var _info$details;
    const detailsItem = (_info$details = info.details) === null || _info$details === void 0 ? void 0 : _info$details[0];
    info.completed = true;
    this._renderOperationError(detailsItem || info.common, errorText);
    this._setCloseButtonVisible(info.common, true);
    if (detailsItem) {
      this._setCloseButtonVisible(detailsItem, false);
    }
  }
  addOperationDetailsError(info, index, errorText) {
    const detailsItem = info.details[index];
    this._renderOperationError(detailsItem, errorText);
    this._setCloseButtonVisible(detailsItem, false);
  }
  _renderError($container, $target, errorText) {
    $('<div>').text(errorText).addClass(FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS).appendTo($container);
  }
  _renderEmptyListText() {
    this._$infosContainer.text(messageLocalization.format('dxFileManager-notificationProgressPanelEmptyListText'));
  }
  _renderOperationError(info, errorText) {
    this._removeProgressBar(info);
    this._renderError(info.$wrapper, info.$commonText, errorText);
  }
  _removeProgressBar(progressBox) {
    if (progressBox.progressBar) {
      progressBox.progressBar.dispose();
      progressBox.progressBar.$element().remove();
      progressBox.progressBar = null;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _createProgressBox($container, options) {
    $container.addClass(FILE_MANAGER_PROGRESS_BOX_CLASS);
    if (!options.showCloseButtonAlways) {
      $container.addClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS);
    }
    if (options.imageUrl) {
      var _getImageContainer;
      (_getImageContainer = getImageContainer(options.imageUrl)) === null || _getImageContainer === void 0 || _getImageContainer.addClass(FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS).appendTo($container);
    }
    const $wrapper = $('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS).appendTo($container);
    const $commonText = $('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS).text(options.commonText).appendTo($wrapper);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let progressBar = null;
    if (!options.skipProgressBox) {
      const $progressBar = $('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS).appendTo($wrapper);
      progressBar = this._createComponent($progressBar, ProgressBar, {
        min: 0,
        max: 100,
        width: '100%',
        validationMessageMode: 'always',
        statusFormat: (ratio, value) => this._getStatusString(ratio, value)
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let closeButton = null;
    if (options.showCloseButton) {
      const $button = $('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS).appendTo($container);
      closeButton = this._createComponent($button, Button, {
        icon: 'dx-filemanager-i dx-filemanager-i-cancel',
        stylingMode: 'text',
        visible: options.showCloseButtonAlways,
        onClick: options.onCloseButtonClick
      });
    }
    return {
      $commonText,
      progressBar,
      $element: $container,
      $wrapper,
      closeButton
    };
  }
  _setCloseButtonVisible(progressBox, visible) {
    if (progressBox.closeButton) {
      progressBox.$element.toggleClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS, !visible);
      progressBox.closeButton.option('visible', visible);
    }
  }
  _setProgressBarText(progressBox, text) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    progressBox.progressBar.option('statusFormat', () => text);
  }
  _closeOperation(info) {
    if (info.customCloseHandling && !info.completed) {
      this._raiseOperationCanceled(info);
      this._setCloseButtonVisible(info.common, false);
      info.details.forEach(item => this._displayClosedOperationItem(item));
    } else {
      this._raiseOperationClosed(info);
      info.$info.next(`.${FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS}`).remove();
      info.$info.remove();
      this._operationCount -= 1;
      if (!this._operationCount) {
        this._renderEmptyListText();
      }
    }
  }
  _cancelOperationItem(item, itemIndex) {
    this._raiseOperationItemCanceled(item, itemIndex);
    const itemInfo = item.info.details[itemIndex];
    this._displayClosedOperationItem(itemInfo);
  }
  _displayClosedOperationItem(itemInfo) {
    this._setProgressBarText(itemInfo, messageLocalization.format('dxFileManager-notificationProgressPanelOperationCanceled'));
    this._setCloseButtonVisible(itemInfo, false);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getStatusString(ratio, _value) {
    return ratio === 1 ? messageLocalization.format('Done') : `${Math.round(ratio * 100)}%`;
  }
  _raiseOperationClosed(info) {
    var _this$_actions$onOper, _this$_actions;
    (_this$_actions$onOper = (_this$_actions = this._actions).onOperationClosed) === null || _this$_actions$onOper === void 0 || _this$_actions$onOper.call(_this$_actions, {
      info
    });
  }
  _raiseOperationCanceled(info) {
    var _this$_actions$onOper2, _this$_actions2;
    (_this$_actions$onOper2 = (_this$_actions2 = this._actions).onOperationCanceled) === null || _this$_actions$onOper2 === void 0 || _this$_actions$onOper2.call(_this$_actions2, {
      info
    });
  }
  _raiseOperationItemCanceled(item, itemIndex) {
    var _this$_actions$onOper3, _this$_actions3;
    (_this$_actions$onOper3 = (_this$_actions3 = this._actions).onOperationItemCanceled) === null || _this$_actions$onOper3 === void 0 || _this$_actions$onOper3.call(_this$_actions3, {
      item,
      itemIndex
    });
  }
  _raisePanelClosed() {
    var _this$_actions$onPane, _this$_actions4;
    (_this$_actions$onPane = (_this$_actions4 = this._actions).onPanelClosed) === null || _this$_actions$onPane === void 0 || _this$_actions$onPane.call(_this$_actions4);
  }
}
export default FileManagerProgressPanel;