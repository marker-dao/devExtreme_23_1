/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.command_manager.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.defaultPermissions = exports.FileManagerCommandManager = void 0;
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
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
    this._permissions = permissions || {};
    this._initCommands();
  }
  _initCommands() {
    this._commands = [{
      name: 'create',
      text: _message.default.format('dxFileManager-commandCreate'),
      icon: 'newfolder',
      enabled: this._permissions.create,
      noFileItemRequired: true
    }, {
      name: 'rename',
      text: _message.default.format('dxFileManager-commandRename'),
      icon: 'rename',
      enabled: this._permissions.rename,
      isSingleFileItemCommand: true
    }, {
      name: 'move',
      text: _message.default.format('dxFileManager-commandMove'),
      icon: 'movetofolder',
      enabled: this._permissions.move
    }, {
      name: 'copy',
      text: _message.default.format('dxFileManager-commandCopy'),
      icon: 'copy',
      enabled: this._permissions.copy
    }, {
      name: 'delete',
      text: _message.default.format('dxFileManager-commandDelete'),
      icon: 'trash',
      enabled: this._permissions.delete
    }, {
      name: 'download',
      text: _message.default.format('dxFileManager-commandDownload'),
      icon: 'download',
      enabled: this._permissions.download
    }, {
      name: 'upload',
      text: _message.default.format('dxFileManager-commandUpload'),
      icon: 'upload',
      enabled: this._permissions.upload,
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
  executeCommand(command, arg) {
    const commandName = (0, _type.isString)(command) ? command : command.name;
    const action = this._actions[commandName];
    if (action) {
      return action(arg);
    }
  }
  updatePermissions(permissions) {
    const resultPermissions = (0, _extend.extend)({}, defaultPermissions, permissions);
    this._permissions = resultPermissions;
    (0, _iterator.each)(this._permissions, permission => {
      this._commandMap[permission].enabled = this._permissions[permission];
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
  isCommandAvailable(commandName, itemInfos) {
    const command = this.getCommandByName(commandName);
    if (!command || !command.enabled) {
      return false;
    }
    if (command.noFileItemRequired) {
      return true;
    }
    const itemsLength = itemInfos && itemInfos.length || 0;
    if (itemsLength === 0 || itemInfos.some(item => item.fileItem.isRoot() || item.fileItem.isParentFolder)) {
      return false;
    }
    if (commandName === 'download') {
      return itemInfos.every(itemInfo => !itemInfo.fileItem.isDirectory);
    }
    return !command.isSingleFileItemCommand || itemsLength === 1;
  }
}
exports.FileManagerCommandManager = FileManagerCommandManager;
