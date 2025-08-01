/**
* DevExtreme (bundles/modules/file_management.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _core = _interopRequireDefault(require("./core"));
var _error = _interopRequireDefault(require("../../file_management/error"));
var _file_system_item = _interopRequireDefault(require("../../file_management/file_system_item"));
var _object_provider = _interopRequireDefault(require("../../file_management/object_provider"));
var _remote_provider = _interopRequireDefault(require("../../file_management/remote_provider"));
var _custom_provider = _interopRequireDefault(require("../../file_management/custom_provider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/no-commonjs */

module.exports = _core.default.fileManagement = _core.default.fileManagement || {};
_core.default.fileManagement.FileSystemError = _error.default;
_core.default.fileManagement.FileSystemItem = _file_system_item.default;
_core.default.fileManagement.ObjectFileSystemProvider = _object_provider.default;
_core.default.fileManagement.RemoteFileSystemProvider = _remote_provider.default;
_core.default.fileManagement.CustomFileSystemProvider = _custom_provider.default;
