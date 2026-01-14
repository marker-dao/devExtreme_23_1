"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _uiFile_managerDialog = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.dialog.delete_item"));
var _uiFile_managerDialog2 = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.dialog.folder_chooser"));
var _uiFile_managerDialog3 = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.dialog.name_editor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FileManagerDialogManager {
  constructor($element, options) {
    this._$element = $element;
    this._options = options;
    const baseDialogOptions = {
      onClosed: this._options.onDialogClosed,
      rtlEnabled: this._options.rtlEnabled
    };
    const $chooseFolderDialog = (0, _renderer.default)('<div>').appendTo(this._$element);
    this._chooseDirectoryDialog = new _uiFile_managerDialog2.default(
    // @ts-expect-error ts-error
    $chooseFolderDialog, (0, _extend.extend)(baseDialogOptions, this._options.chooseDirectoryDialog));
    const $renameDialog = (0, _renderer.default)('<div>').appendTo(this._$element);
    this._renameItemDialog = new _uiFile_managerDialog3.default(
    // @ts-expect-error ts-error
    $renameDialog, (0, _extend.extend)(baseDialogOptions, {
      title: _message.default.format('dxFileManager-dialogRenameItemTitle'),
      buttonText: _message.default.format('dxFileManager-dialogRenameItemButtonText')
    }));
    const $createDialog = (0, _renderer.default)('<div>').appendTo(this._$element);
    this._createItemDialog = new _uiFile_managerDialog3.default(
    // @ts-expect-error ts-error
    $createDialog, (0, _extend.extend)(baseDialogOptions, {
      title: _message.default.format('dxFileManager-dialogCreateDirectoryTitle'),
      buttonText: _message.default.format('dxFileManager-dialogCreateDirectoryButtonText')
    }));
    const $deleteItemDialog = (0, _renderer.default)('<div>').appendTo(this._$element);
    this._deleteItemDialog = new _uiFile_managerDialog.default(
    // @ts-expect-error ts-error
    $deleteItemDialog, baseDialogOptions);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getCopyDialog(targetItemInfos) {
    this._chooseDirectoryDialog.switchToCopyDialog(targetItemInfos);
    return this._chooseDirectoryDialog;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getMoveDialog(targetItemInfos) {
    this._chooseDirectoryDialog.switchToMoveDialog(targetItemInfos);
    return this._chooseDirectoryDialog;
  }
  getRenameItemDialog() {
    return this._renameItemDialog;
  }
  getCreateItemDialog() {
    return this._createItemDialog;
  }
  getDeleteItemDialog() {
    return this._deleteItemDialog;
  }
  updateDialogRtl(value) {
    [this._chooseDirectoryDialog, this._renameItemDialog, this._createItemDialog, this._deleteItemDialog].forEach(dialog => {
      dialog.option('rtlEnabled', value);
    });
  }
}
var _default = exports.default = FileManagerDialogManager;