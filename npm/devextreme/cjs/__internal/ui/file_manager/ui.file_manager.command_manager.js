/**
* DevExtreme (cjs/__internal/ui/file_manager/ui.file_manager.command_manager.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPermissions = exports.FileManagerCommandManager = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultPermissions = exports.defaultPermissions = {
  create: false,
  copy: false,
  move: false,
  delete: false,
  rename: false,
  upload: false,
  download: false
};
class FileManagerCommandManager {
  constructor(permissions) {
    this._actions = {};
    this._permissions = permissions ?? {};
    this._initCommands();
  }
  _initCommands() {
    var _this$_permissions, _this$_permissions2, _this$_permissions3, _this$_permissions4, _this$_permissions5, _this$_permissions6, _this$_permissions7;
    this._commands = [{
      name: 'create',
      text: _message.default.format('dxFileManager-commandCreate'),
      icon: 'newfolder',
      enabled: (_this$_permissions = this._permissions) === null || _this$_permissions === void 0 ? void 0 : _this$_permissions.create,
      noFileItemRequired: true
    }, {
      name: 'rename',
      text: _message.default.format('dxFileManager-commandRename'),
      icon: 'rename',
      enabled: (_this$_permissions2 = this._permissions) === null || _this$_permissions2 === void 0 ? void 0 : _this$_permissions2.rename,
      isSingleFileItemCommand: true
    }, {
      name: 'move',
      text: _message.default.format('dxFileManager-commandMove'),
      icon: 'movetofolder',
      enabled: (_this$_permissions3 = this._permissions) === null || _this$_permissions3 === void 0 ? void 0 : _this$_permissions3.move
    }, {
      name: 'copy',
      text: _message.default.format('dxFileManager-commandCopy'),
      icon: 'copy',
      enabled: (_this$_permissions4 = this._permissions) === null || _this$_permissions4 === void 0 ? void 0 : _this$_permissions4.copy
    }, {
      name: 'delete',
      text: _message.default.format('dxFileManager-commandDelete'),
      icon: 'trash',
      enabled: (_this$_permissions5 = this._permissions) === null || _this$_permissions5 === void 0 ? void 0 : _this$_permissions5.delete
    }, {
      name: 'download',
      text: _message.default.format('dxFileManager-commandDownload'),
      icon: 'download',
      enabled: (_this$_permissions6 = this._permissions) === null || _this$_permissions6 === void 0 ? void 0 : _this$_permissions6.download
    }, {
      name: 'upload',
      text: _message.default.format('dxFileManager-commandUpload'),
      icon: 'upload',
      enabled: (_this$_permissions7 = this._permissions) === null || _this$_permissions7 === void 0 ? void 0 : _this$_permissions7.upload,
      noFileItemRequired: true
    }, {
      name: 'refresh',
      text: _message.default.format('dxFileManager-commandRefresh'),
      icon: 'dx-filemanager-i dx-filemanager-i-refresh',
      enabled: true,
      noFileItemRequired: true
    }, {
      name: 'thumbnails',
      text: _message.default.format('dxFileManager-commandThumbnails'),
      icon: 'mediumiconslayout',
      enabled: true,
      noFileItemRequired: true
    }, {
      name: 'details',
      text: _message.default.format('dxFileManager-commandDetails'),
      icon: 'detailslayout',
      enabled: true,
      noFileItemRequired: true
    }, {
      name: 'clearSelection',
      text: _message.default.format('dxFileManager-commandClearSelection'),
      icon: 'remove',
      enabled: true
    }, {
      name: 'showNavPane',
      hint: _message.default.format('dxFileManager-commandShowNavPane'),
      icon: 'menu',
      enabled: false,
      noFileItemRequired: true
    }];
    this._commandMap = {};
    this._commands.forEach(command => {
      this._commandMap[command.name] = command;
    });
  }
  registerActions(actions) {
    this._actions = (0, _extend.extend)(this._actions, actions);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types,consistent-return
  executeCommand(command, arg) {
    const commandName = (0, _type.isString)(command) ? command : command.name;
    const action = this._actions[commandName];
    if (action) {
      return action(arg);
    }
  }
  updatePermissions(permissions) {
    this._permissions = Object.assign({}, defaultPermissions, permissions);
    (0, _iterator.each)(this._permissions, permission => {
      var _this$_permissions8;
      this._commandMap[permission].enabled = (_this$_permissions8 = this._permissions) === null || _this$_permissions8 === void 0 ? void 0 : _this$_permissions8[permission];
    });
  }
  setCommandEnabled(commandName, enabled) {
    const command = this.getCommandByName(commandName);
    if (command) {
      command.enabled = enabled;
    }
  }
  getCommandByName(name) {
    return this._commandMap[name];
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  isCommandAvailable(commandName, itemInfos) {
    const command = this.getCommandByName(commandName);
    if (!(command !== null && command !== void 0 && command.enabled)) {
      return false;
    }
    if (command.noFileItemRequired) {
      return true;
    }
    const itemsLength = (itemInfos === null || itemInfos === void 0 ? void 0 : itemInfos.length) || 0;
    if (itemsLength === 0 || itemInfos.some(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    item => item.fileItem.isRoot() || item.fileItem.isParentFolder)) {
      return false;
    }
    if (commandName === 'download') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return itemInfos.every(itemInfo => !itemInfo.fileItem.isDirectory);
    }
    return !command.isSingleFileItemCommand || itemsLength === 1;
  }
}
exports.FileManagerCommandManager = FileManagerCommandManager;
