"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _menu = _interopRequireDefault(require("../../ui/menu/menu"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FILE_MANAGER_BREADCRUMBS_CLASS = 'dx-filemanager-breadcrumbs';
const FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = `${FILE_MANAGER_BREADCRUMBS_CLASS}-parent-folder-item`;
const FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = `${FILE_MANAGER_BREADCRUMBS_CLASS}-separator-item`;
const FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = `${FILE_MANAGER_BREADCRUMBS_CLASS}-path-separator-item`;
class FileManagerBreadcrumbs extends _widget.default {
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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
      // @ts-expect-error ts-error
      onItemClick: this._onItemClick.bind(this),
      // @ts-expect-error ts-error
      onItemRendered: this._onItemRendered.bind(this)
    });
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _getMenuItems() {
    const dirLine = this._getParentDirsLine();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  _onItemClick(e) {
    if (!e.itemData.isPathItem) {
      return;
    }
    const newDir = e.itemData.directory;
    if (!this._areDirsEqual(newDir, this._currentDirectory)) {
      this._raiseCurrentDirectoryChanged(newDir);
    }
  }
  _onItemRendered(e) {
    if (e.itemData.cssClass) {
      (0, _renderer.default)(e.itemElement).addClass(e.itemData.cssClass);
    }
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _getParentDirsLine() {
    let currentDirectory = this._currentDirectory;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = [];
    while (currentDirectory) {
      result.unshift(currentDirectory);
      currentDirectory = currentDirectory.parentDirectory;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _areDirsEqual(dir1, dir2) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key;
  }
  _initActions() {
    this._actions = {
      onCurrentDirectoryChanging: this._createActionByOption('onCurrentDirectoryChanging')
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _raiseCurrentDirectoryChanged(currentDirectory) {
    var _this$_actions$onCurr, _this$_actions;
    (_this$_actions$onCurr = (_this$_actions = this._actions).onCurrentDirectoryChanging) === null || _this$_actions$onCurr === void 0 || _this$_actions$onCurr.call(_this$_actions, {
      currentDirectory
    });
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      rootFolderDisplayName: 'Files',
      onCurrentDirectoryChanging: undefined
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
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