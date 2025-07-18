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