"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CHAT_FILE_VIEW_ITEM_CLASS = exports.CHAT_FILE_VIEW_CLASS = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _dom_component = _interopRequireDefault(require("../../../core/widget/dom_component"));
var _file = _interopRequireDefault(require("../../../ui/chat/file_view/file"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_FILE_VIEW_CLASS = exports.CHAT_FILE_VIEW_CLASS = 'dx-chat-file-view';
const CHAT_FILE_VIEW_ITEM_CLASS = exports.CHAT_FILE_VIEW_ITEM_CLASS = 'dx-chat-file-view-item';
class FileView extends _dom_component.default {
  constructor() {
    super(...arguments);
    this._fileInstances = [];
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      files: [],
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true
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
    this.$element().addClass(CHAT_FILE_VIEW_CLASS);
    super._initMarkup();
    this._renderItems();
    this._toggleAria();
  }
  _renderItems() {
    const {
      files = []
    } = this.option();
    this._clearFileInstances();
    files.forEach(file => {
      this._renderItem(file);
    });
  }
  _renderItem(data) {
    const $file = (0, _renderer.default)('<div>');
    const fileInstance = this._createComponent($file, _file.default, this._getFileConfig(data));
    this.$element().append($file);
    this._fileInstances.push(fileInstance);
  }
  _getFileConfig(data) {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const configuration = {
      data,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      onDownload: event => {
        var _this$_downloadAction;
        (_this$_downloadAction = this._downloadAction) === null || _this$_downloadAction === void 0 || _this$_downloadAction.call(this, event);
      }
    };
    return configuration;
  }
  _toggleAria() {
    const {
      files
    } = this.option();
    const applyAria = Boolean(files === null || files === void 0 ? void 0 : files.length);
    const aria = {
      role: applyAria ? 'list' : null,
      'aria-label': applyAria ? _message.default.format('dxChat-fileViewLabel') : null
    };
    // @ts-expect-error attr type should be extended
    this.$element().attr(aria);
  }
  _clearFileInstances() {
    var _this$_fileInstances;
    (_this$_fileInstances = this._fileInstances) === null || _this$_fileInstances === void 0 || _this$_fileInstances.forEach(instance => {
      instance.dispose();
    });
    this._fileInstances = [];
    this.$element().empty();
  }
  _dispose() {
    this._clearFileInstances();
    super._dispose();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._renderItems();
        break;
      case 'files':
        this._renderItems();
        this._toggleAria();
        break;
      case 'onDownload':
        this._createDownloadAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = FileView;