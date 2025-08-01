/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.breadcrumbs.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _menu = _interopRequireDefault(require("../menu"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FILE_MANAGER_BREADCRUMBS_CLASS = 'dx-filemanager-breadcrumbs';
const FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-parent-folder-item';
const FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-separator-item';
const FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-path-separator-item';
class FileManagerBreadcrumbs extends _ui.default {
  _init() {
    super._init();
    this._currentDirectory = null;
  }
  _initMarkup() {
    super._initMarkup();
    this._initActions();
    if (this._currentDirectory) {
      this._renderMenu();
    }
    this.$element().addClass(FILE_MANAGER_BREADCRUMBS_CLASS);
  }
  setCurrentDirectory(directory) {
    if (!this._areDirsEqual(this._currentDirectory, directory)) {
      this._currentDirectory = directory;
      this.repaint();
    }
  }
  _renderMenu() {
    const $menu = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._menu = this._createComponent($menu, _menu.default, {
      dataSource: this._getMenuItems(),
      onItemClick: this._onItemClick.bind(this),
      onItemRendered: this._onItemRendered.bind(this)
    });
  }
  _getMenuItems() {
    const dirLine = this._getParentDirsLine();
    const result = [{
      icon: 'arrowup',
      directory: this._currentDirectory.parentDirectory,
      isPathItem: true,
      cssClass: FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS
    }, {
      text: ' ',
      cssClass: FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS
    }];
    dirLine.forEach((dir, index) => {
      result.push({
        text: dir.getDisplayName(),
        directory: dir,
        isPathItem: true
      });
      if (index !== dirLine.length - 1) {
        result.push({
          icon: 'spinnext',
          cssClass: FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS
        });
      }
    });
    return result;
  }
  _onItemClick(_ref) {
    let {
      itemData
    } = _ref;
    if (!itemData.isPathItem) {
      return;
    }
    const newDir = itemData.directory;
    if (!this._areDirsEqual(newDir, this._currentDirectory)) {
      this._raiseCurrentDirectoryChanged(newDir);
    }
  }
  _onItemRendered(_ref2) {
    let {
      itemElement,
      itemData
    } = _ref2;
    if (itemData.cssClass) {
      (0, _renderer.default)(itemElement).addClass(itemData.cssClass);
    }
  }
  _getParentDirsLine() {
    let currentDirectory = this._currentDirectory;
    const result = [];
    while (currentDirectory) {
      result.unshift(currentDirectory);
      currentDirectory = currentDirectory.parentDirectory;
    }
    return result;
  }
  _areDirsEqual(dir1, dir2) {
    return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key;
  }
  _initActions() {
    this._actions = {
      onCurrentDirectoryChanging: this._createActionByOption('onCurrentDirectoryChanging')
    };
  }
  _raiseCurrentDirectoryChanged(currentDirectory) {
    this._actions.onCurrentDirectoryChanging({
      currentDirectory
    });
  }
  _getDefaultOptions() {
    return (0, _extend.extend)(super._getDefaultOptions(), {
      rootFolderDisplayName: 'Files',
      onCurrentDirectoryChanging: null
    });
  }
  _optionChanged(args) {
    const name = args.name;
    switch (name) {
      case 'rootFolderDisplayName':
        this.repaint();
        break;
      case 'onCurrentDirectoryChanging':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = FileManagerBreadcrumbs;
module.exports = exports.default;
module.exports.default = exports.default;
