/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { getMapFromObject } from '../../ui/file_manager/ui.file_manager.common';
import FileManagerDialogBase from '../../ui/file_manager/ui.file_manager.dialog';
import FileManagerFilesTreeView from '../../ui/file_manager/ui.file_manager.files_tree_view';
const FILE_MANAGER_DIALOG_FOLDER_CHOOSER = 'dx-filemanager-dialog-folder-chooser';
const FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP = 'dx-filemanager-dialog-folder-chooser-popup';
class FileManagerFolderChooserDialog extends FileManagerDialogBase {
  show() {
    var _this$_filesTreeView;
    this._setSelectedDirInfo(null);
    (_this$_filesTreeView = this._filesTreeView) === null || _this$_filesTreeView === void 0 || _this$_filesTreeView.refresh();
    super.show();
  }
  switchToCopyDialog(targetItemInfos) {
    this._targetItemInfos = targetItemInfos;
    this._setTitle(messageLocalization.format('dxFileManager-dialogDirectoryChooserCopyTitle'));
    this._setApplyButtonOptions({
      text: messageLocalization.format('dxFileManager-dialogDirectoryChooserCopyButtonText'),
      disabled: true
    });
  }
  switchToMoveDialog(targetItemInfos) {
    this._targetItemInfos = targetItemInfos;
    this._setTitle(messageLocalization.format('dxFileManager-dialogDirectoryChooserMoveTitle'));
    this._setApplyButtonOptions({
      text: messageLocalization.format('dxFileManager-dialogDirectoryChooserMoveButtonText'),
      disabled: true
    });
  }
  _getDialogOptions() {
    return Object.assign({}, super._getDialogOptions(), {
      contentCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER,
      popupCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP
    });
  }
  _createContentTemplate(element) {
    var _this$_$contentElemen, _this$_filesTreeView2;
    super._createContentTemplate(element);
    // @ts-expect-error ts-error
    const {
      getDirectories
    } = this.option();
    this._filesTreeView = this._createComponent($('<div>'), FileManagerFilesTreeView, {
      getDirectories,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      getCurrentDirectory: () => this._getDialogSelectedDirectory(),
      onDirectoryClick: e => this._onFilesTreeViewDirectoryClick(e),
      onFilesTreeViewContentReady: () => this._toggleUnavailableLocationsDisabled(true)
    });
    (_this$_$contentElemen = this._$contentElement) === null || _this$_$contentElemen === void 0 || _this$_$contentElemen.append($((_this$_filesTreeView2 = this._filesTreeView) === null || _this$_filesTreeView2 === void 0 ? void 0 : _this$_filesTreeView2.$element()));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDialogResult() {
    const result = this._getDialogSelectedDirectory();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result ? {
      folder: result
    } : result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(super._getDefaultOptions(), {
      getItems: null
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDialogSelectedDirectory() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._selectedDirectoryInfo;
  }
  _onFilesTreeViewDirectoryClick(_ref) {
    var _this$_filesTreeView3;
    let {
      itemData
    } = _ref;
    this._setSelectedDirInfo(itemData);
    (_this$_filesTreeView3 = this._filesTreeView) === null || _this$_filesTreeView3 === void 0 || _this$_filesTreeView3.updateCurrentDirectory();
  }
  _setSelectedDirInfo(dirInfo) {
    this._selectedDirectoryInfo = dirInfo;
    this._setApplyButtonOptions({
      disabled: !dirInfo
    });
  }
  _onPopupShown() {
    this._toggleUnavailableLocationsDisabled(true);
    super._onPopupShown();
  }
  _onPopupHiding() {
    this._toggleUnavailableLocationsDisabled(false);
    super._onPopupHiding();
  }
  _toggleUnavailableLocationsDisabled(isDisabled) {
    if (!this._filesTreeView) {
      return;
    }
    const locations = this._getLocationsToProcess(isDisabled);
    this._filesTreeView.toggleDirectoryExpandedStateRecursive(locations.locationsToExpand[0], isDisabled)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then(() => {
      var _this$_filesTreeView4;
      return (_this$_filesTreeView4 = this._filesTreeView) === null || _this$_filesTreeView4 === void 0 ? void 0 : _this$_filesTreeView4.toggleDirectoryLineExpandedState(locations.locationsToCollapse, !isDisabled).then(() => locations.locationKeysToDisable.forEach(key => {
        var _this$_filesTreeView5;
        return (_this$_filesTreeView5 = this._filesTreeView) === null || _this$_filesTreeView5 === void 0 ? void 0 : _this$_filesTreeView5.toggleNodeDisabledState(key, isDisabled);
      }));
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getLocationsToProcess(isDisabled) {
    const expandLocations = {};
    const collapseLocations = {};
    this._targetItemInfos.forEach(itemInfo => {
      if (itemInfo.parentDirectory) {
        expandLocations[itemInfo.parentDirectory.getInternalKey()] = itemInfo.parentDirectory;
      }
      if (itemInfo.fileItem.isDirectory) {
        collapseLocations[itemInfo.getInternalKey()] = itemInfo;
      }
    });
    const expandMap = getMapFromObject(expandLocations);
    const collapseMap = getMapFromObject(collapseLocations);
    return {
      locationsToExpand: isDisabled ? expandMap.values : [],
      locationsToCollapse: isDisabled ? collapseMap.values : [],
      locationKeysToDisable: expandMap.keys.concat(...collapseMap.keys)
    };
  }
}
export default FileManagerFolderChooserDialog;