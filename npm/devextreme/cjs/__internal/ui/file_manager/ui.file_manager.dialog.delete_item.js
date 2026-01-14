/**
* DevExtreme (cjs/__internal/ui/file_manager/ui.file_manager.dialog.delete_item.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _scroll_view = _interopRequireDefault(require("../../../ui/scroll_view"));
var _uiFile_manager = _interopRequireDefault(require("../../ui/file_manager/ui.file_manager.dialog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const FILE_MANAGER_DIALOG_DELETE_ITEM = 'dx-filemanager-dialog-delete-item';
const FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP = 'dx-filemanager-dialog-delete-item-popup'; // TODO ensure needed
class FileManagerDeleteItemDialog extends _uiFile_manager.default {
  // @ts-expect-error ts-error
  show(_ref) {
    let {
      itemName,
      itemCount
    } = _ref;
    const text = itemCount === 1 ? _message.default.format('dxFileManager-dialogDeleteItemSingleItemConfirmation',
    // @ts-expect-error ts-error
    itemName) : _message.default.format('dxFileManager-dialogDeleteItemMultipleItemsConfirmation',
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
      title: _message.default.format('dxFileManager-dialogDeleteItemTitle'),
      buttonText: _message.default.format('dxFileManager-dialogDeleteItemButtonText'),
      contentCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM,
      popupCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP,
      height: 'auto',
      maxHeight: '80vh'
    });
  }
  _createContentTemplate(element) {
    super._createContentTemplate(element);
    this._$text = (0, _renderer.default)('<div>')
    // @ts-expect-error ts-error
    .text(this._initialText).appendTo(this._$contentElement);
    this._createComponent(this._$contentElement, _scroll_view.default, {
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
var _default = exports.default = FileManagerDeleteItemDialog;
