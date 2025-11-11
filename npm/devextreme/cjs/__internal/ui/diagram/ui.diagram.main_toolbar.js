/**
* DevExtreme (cjs/__internal/ui/diagram/ui.diagram.main_toolbar.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _diagram = _interopRequireDefault(require("../../ui/diagram/diagram.commands_manager"));
var _uiDiagram = _interopRequireDefault(require("../../ui/diagram/ui.diagram.toolbar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DiagramMainToolbar extends _uiDiagram.default {
  _getCommands() {
    // @ts-expect-error ts-error
    const {
      commands,
      excludeCommands
    } = this.option();
    return _diagram.default.getMainToolbarCommands(commands, excludeCommands);
  }
}
var _default = exports.default = DiagramMainToolbar;
