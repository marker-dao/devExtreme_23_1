"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CHAT_FILE_SIZE_CLASS = exports.CHAT_FILE_NAME_CLASS = exports.CHAT_FILE_CLASS = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _m_icon = require("../../../core/utils/m_icon");
var _dom_component = _interopRequireDefault(require("../../../core/widget/dom_component"));
var _file_uploader = require("../../../ui/file_uploader/file_uploader.utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_FILE_CLASS = exports.CHAT_FILE_CLASS = 'dx-chat-file';
const CHAT_FILE_ICON_CONTAINER_CLASS = 'dx-chat-file-icon-container';
const CHAT_FILE_NAME_CLASS = exports.CHAT_FILE_NAME_CLASS = 'dx-chat-file-name';
const CHAT_FILE_SIZE_CLASS = exports.CHAT_FILE_SIZE_CLASS = 'dx-chat-file-size';
const CHAT_FILE_DOWNLOAD_BUTTON_CLASS = 'dx-chat-file-download-button';
class File extends _dom_component.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
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
    const iconName = (0, _file_uploader.getFileIconName)(data.name);
    const $icon = (0, _m_icon.getImageContainer)(iconName);
    const $iconContainer = (0, _renderer.default)('<div>').addClass(CHAT_FILE_ICON_CONTAINER_CLASS).append($icon);
    this.$element().append($iconContainer);
  }
  _renderName() {
    const {
      data
    } = this.option();
    const {
      name
    } = data;
    const $name = (0, _renderer.default)('<div>').addClass(CHAT_FILE_NAME_CLASS).text(name).attr('title', name);
    this.$element().append($name);
  }
  _renderSize() {
    const {
      data
    } = this.option();
    const {
      size
    } = data;
    const text = (0, _file_uploader.getFileSize)(size);
    const $size = (0, _renderer.default)('<div>').addClass(CHAT_FILE_SIZE_CLASS).text(text).attr('title', text);
    this.$element().append($size);
  }
  _renderButton() {
    const {
      onDownload
    } = this.option();
    if (!onDownload) {
      return;
    }
    const $button = (0, _renderer.default)('<div>').addClass(CHAT_FILE_DOWNLOAD_BUTTON_CLASS);
    this._downloadButton = this._createComponent($button, _button.default, this._getButtonConfig());
    this.$element().append($button);
  }
  _getButtonConfig() {
    const {
      data,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    // @ts-expect-error useInkRipple should be optional
    const configuration = {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      elementAttr: {
        // @ts-expect-error format params should be extended
        'aria-label': _message.default.format('dxChat-downloadButtonLabel', (data === null || data === void 0 ? void 0 : data.name) ?? '')
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
var _default = exports.default = File;