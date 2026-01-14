/**
* DevExtreme (esm/__internal/ui/chat/file_view/file.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import Button from '../../../../ui/button';
import { getImageContainer } from '../../../core/utils/m_icon';
import DOMComponent from '../../../core/widget/dom_component';
import { getFileIconName, getFileSize } from '../../../ui/file_uploader/file_uploader.utils';
export const CHAT_FILE_CLASS = 'dx-chat-file';
const CHAT_FILE_ICON_CONTAINER_CLASS = 'dx-chat-file-icon-container';
export const CHAT_FILE_NAME_CLASS = 'dx-chat-file-name';
export const CHAT_FILE_SIZE_CLASS = 'dx-chat-file-size';
const CHAT_FILE_DOWNLOAD_BUTTON_CLASS = 'dx-chat-file-download-button';
class File extends DOMComponent {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      data: {
        name: '',
        size: 0
      },
      onDownload: undefined
    });
  }
  _init() {
    super._init();
    this._createDownloadAction();
  }
  _createDownloadAction() {
    this._downloadAction = this._createActionByOption('onDownload', {
      excludeValidators: ['disabled']
    });
  }
  _initMarkup() {
    this.$element().addClass(CHAT_FILE_CLASS).attr('role', 'listitem');
    super._initMarkup();
    this._renderSections();
  }
  _renderSections() {
    this._renderIcon();
    this._renderName();
    this._renderSize();
    this._renderButton();
  }
  _renderIcon() {
    const {
      data
    } = this.option();
    const iconName = getFileIconName(data.name);
    const $icon = getImageContainer(iconName);
    const $iconContainer = $('<div>').addClass(CHAT_FILE_ICON_CONTAINER_CLASS).append($icon);
    this.$element().append($iconContainer);
  }
  _renderName() {
    const {
      data
    } = this.option();
    const {
      name
    } = data;
    const $name = $('<div>').addClass(CHAT_FILE_NAME_CLASS).text(name).attr('title', name);
    this.$element().append($name);
  }
  _renderSize() {
    const {
      data
    } = this.option();
    const {
      size
    } = data;
    const text = getFileSize(size);
    const $size = $('<div>').addClass(CHAT_FILE_SIZE_CLASS).text(text).attr('title', text);
    this.$element().append($size);
  }
  _renderButton() {
    const {
      onDownload
    } = this.option();
    if (!onDownload) {
      return;
    }
    const $button = $('<div>').addClass(CHAT_FILE_DOWNLOAD_BUTTON_CLASS);
    this._downloadButton = this._createComponent($button, Button, this._getButtonConfig());
    this.$element().append($button);
  }
  _getButtonConfig() {
    const {
      data,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    // @ts-expect-error format params should be extended
    const ariaLabel = messageLocalization.format('dxChat-downloadButtonLabel', (data === null || data === void 0 ? void 0 : data.name) ?? '');
    // @ts-expect-error useInkRipple should be optional
    const configuration = {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      hint: ariaLabel,
      elementAttr: {
        'aria-label': ariaLabel
      },
      icon: 'download',
      stylingMode: 'text',
      onClick: e => {
        this._downloadHandler(e);
      }
    };
    return configuration;
  }
  _downloadHandler(e) {
    var _this$_downloadAction;
    const {
      data
    } = this.option();
    const event = {
      event: e.event,
      attachment: data
    };
    (_this$_downloadAction = this._downloadAction) === null || _this$_downloadAction === void 0 || _this$_downloadAction.call(this, event);
  }
  _handleOnDownloadOptionChange() {
    const {
      onDownload
    } = this.option();
    if (!onDownload) {
      this._cleanDownloadButton();
      return;
    }
    if (this._downloadButton) {
      var _this$_downloadButton;
      (_this$_downloadButton = this._downloadButton) === null || _this$_downloadButton === void 0 || _this$_downloadButton.option({
        onClick: e => this._downloadHandler(e)
      });
    } else {
      this._renderButton();
    }
  }
  _optionChanged(args) {
    var _this$_downloadButton2;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        (_this$_downloadButton2 = this._downloadButton) === null || _this$_downloadButton2 === void 0 || _this$_downloadButton2.option(name, value);
        break;
      case 'data':
        this._invalidate();
        break;
      case 'onDownload':
        this._createDownloadAction();
        this._handleOnDownloadOptionChange();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clean() {
    this._cleanDownloadButton();
    this.$element().empty();
    super._clean();
  }
  _cleanDownloadButton() {
    var _this$_downloadButton3;
    (_this$_downloadButton3 = this._downloadButton) === null || _this$_downloadButton3 === void 0 || _this$_downloadButton3.dispose();
    this._downloadButton = null;
  }
}
export default File;
