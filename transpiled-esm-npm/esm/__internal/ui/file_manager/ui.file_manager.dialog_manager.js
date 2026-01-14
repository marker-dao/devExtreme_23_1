import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import FileManagerDeleteItemDialog from '../../ui/file_manager/ui.file_manager.dialog.delete_item';
import FileManagerFolderChooserDialog from '../../ui/file_manager/ui.file_manager.dialog.folder_chooser';
import FileManagerNameEditorDialog from '../../ui/file_manager/ui.file_manager.dialog.name_editor';
class FileManagerDialogManager {
  constructor($element, options) {
    this._$element = $element;
    this._options = options;
    const baseDialogOptions = {
      onClosed: this._options.onDialogClosed,
      rtlEnabled: this._options.rtlEnabled
    };
    const $chooseFolderDialog = $('<div>').appendTo(this._$element);
    this._chooseDirectoryDialog = new FileManagerFolderChooserDialog(
    // @ts-expect-error ts-error
    $chooseFolderDialog, extend(baseDialogOptions, this._options.chooseDirectoryDialog));
    const $renameDialog = $('<div>').appendTo(this._$element);
    this._renameItemDialog = new FileManagerNameEditorDialog(
    // @ts-expect-error ts-error
    $renameDialog, extend(baseDialogOptions, {
      title: messageLocalization.format('dxFileManager-dialogRenameItemTitle'),
      buttonText: messageLocalization.format('dxFileManager-dialogRenameItemButtonText')
    }));
    const $createDialog = $('<div>').appendTo(this._$element);
    this._createItemDialog = new FileManagerNameEditorDialog(
    // @ts-expect-error ts-error
    $createDialog, extend(baseDialogOptions, {
      title: messageLocalization.format('dxFileManager-dialogCreateDirectoryTitle'),
      buttonText: messageLocalization.format('dxFileManager-dialogCreateDirectoryButtonText')
    }));
    const $deleteItemDialog = $('<div>').appendTo(this._$element);
    this._deleteItemDialog = new FileManagerDeleteItemDialog(
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
export default FileManagerDialogManager;