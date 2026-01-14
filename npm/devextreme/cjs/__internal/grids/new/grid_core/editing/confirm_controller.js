/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/confirm_controller.js)
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
exports.ConfirmController = void 0;
var _dialog = require("../../../../../ui/dialog");
class ConfirmController {
  confirm(message, title, showTitle) {
    return (0, _dialog.confirm)(message, title,
    // @ts-expect-error wrong typing
    showTitle);
  }
}
exports.ConfirmController = ConfirmController;
ConfirmController.dependencies = [];
