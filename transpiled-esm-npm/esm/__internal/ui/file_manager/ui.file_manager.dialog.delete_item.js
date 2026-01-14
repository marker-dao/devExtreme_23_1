/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import ScrollView from '../../../ui/scroll_view';
import FileManagerDialogBase from '../../ui/file_manager/ui.file_manager.dialog';
const FILE_MANAGER_DIALOG_DELETE_ITEM = 'dx-filemanager-dialog-delete-item';
const FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP = 'dx-filemanager-dialog-delete-item-popup'; // TODO ensure needed
class FileManagerDeleteItemDialog extends FileManagerDialogBase {
  // @ts-expect-error ts-error
  show(_ref) {
    let {
      itemName,
      itemCount
    } = _ref;
    const text = itemCount === 1 ? messageLocalization.format('dxFileManager-dialogDeleteItemSingleItemConfirmation',
    // @ts-expect-error ts-error
    itemName) : messageLocalization.format('dxFileManager-dialogDeleteItemMultipleItemsConfirmation',
    // @ts-expect-error ts-error
    itemCount);
    if (this._$text) {
      this._$text.text(text);
    } else {
      this._initialText = text;
    }
    super.show();
  }
  _getDialogOptions() {
    return Object.assign({}, super._getDialogOptions(), {
      title: messageLocalization.format('dxFileManager-dialogDeleteItemTitle'),
      buttonText: messageLocalization.format('dxFileManager-dialogDeleteItemButtonText'),
      contentCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM,
      popupCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP,
      height: 'auto',
      maxHeight: '80vh'
    });
  }
  _createContentTemplate(element) {
    super._createContentTemplate(element);
    this._$text = $('<div>')
    // @ts-expect-error ts-error
    .text(this._initialText).appendTo(this._$contentElement);
    this._createComponent(this._$contentElement, ScrollView, {
      width: '100%',
      height: '100%'
    });
  }
  // @ts-expect-error ts-error
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDialogResult() {
    return {};
  }
}
export default FileManagerDeleteItemDialog;