"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _text_box = _interopRequireDefault(require("../../../ui/text_box"));
var _uiFile_manager = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.dialog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const FILE_MANAGER_DIALOG_NAME_EDITOR = 'dx-filemanager-dialog-name-editor';
const FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP = 'dx-filemanager-dialog-name-editor-popup';
class FileManagerNameEditorDialog extends _uiFile_manager.default {
  // @ts-expect-error ts-error
  show(name) {
    // eslint-disable-next-line no-param-reassign
    name = name || '';
    if (this._nameTextBox) {
      this._nameTextBox.option('value', name);
    } else {
      this._initialNameValue = name;
    }
    super.show();
  }
  _onPopupShown() {
    if (!this._nameTextBox) {
      return;
    }
    // @ts-expect-error ts-error
    const $textBoxInput = this._nameTextBox._input();
    if ($textBoxInput.length) {
      $textBoxInput[0].select();
    }
    this._nameTextBox.focus();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDialogOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._getDialogOptions(), {
      title: this.option('title'),
      buttonText: this.option('buttonText'),
      contentCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR,
      popupCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP
    });
  }
  _createContentTemplate(element) {
    var _this$_$contentElemen, _this$_nameTextBox;
    super._createContentTemplate(element);
    // @ts-expect-error ts-error
    this._nameTextBox = this._createComponent((0, _renderer.default)('<div>'), _text_box.default, {
      value: this._initialNameValue,
      onEnterKey: () => this._hasCompositionJustEnded && this._applyDialogChanges(),
      onKeyDown: e => this._checkCompositionEnded(e)
    });
    (_this$_$contentElemen = this._$contentElement) === null || _this$_$contentElemen === void 0 || _this$_$contentElemen.append((0, _renderer.default)((_this$_nameTextBox = this._nameTextBox) === null || _this$_nameTextBox === void 0 ? void 0 : _this$_nameTextBox.$element()));
  }
  _checkCompositionEnded(_ref) {
    let {
      event
    } = _ref;
    this._hasCompositionJustEnded = event.which !== 229;
  }
  // @ts-expect-error ts-error
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDialogResult() {
    var _this$_nameTextBox2;
    const {
      value
    } = ((_this$_nameTextBox2 = this._nameTextBox) === null || _this$_nameTextBox2 === void 0 ? void 0 : _this$_nameTextBox2.option()) ?? {};
    return value ? {
      name: value
    } : null;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._getDefaultOptions(), {
      title: '',
      buttonText: ''
    });
  }
}
var _default = exports.default = FileManagerNameEditorDialog;