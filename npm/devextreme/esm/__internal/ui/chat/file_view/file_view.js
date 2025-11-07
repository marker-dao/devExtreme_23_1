/**
* DevExtreme (esm/__internal/ui/chat/file_view/file_view.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import DOMComponent from '../../../core/widget/dom_component';
import File from '../../../ui/chat/file_view/file';
export const CHAT_FILE_VIEW_CLASS = 'dx-chat-file-view';
class FileView extends DOMComponent {
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
    const $file = $('<div>');
    const fileInstance = this._createComponent($file, File, this._getFileConfig(data));
    this.$element().append($file);
    this._fileInstances.push(fileInstance);
  }
  _getFileConfig(data) {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      onDownload
    } = this.option();
    const configuration = {
      data,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      onDownload
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
      'aria-label': applyAria ? messageLocalization.format('dxChat-fileViewLabel') : null
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
      case 'onDownload':
        this._renderItems();
        break;
      case 'files':
        this._renderItems();
        this._toggleAria();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default FileView;
