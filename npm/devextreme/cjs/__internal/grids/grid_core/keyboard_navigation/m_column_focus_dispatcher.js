/**
* DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/m_column_focus_dispatcher.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnFocusDispatcher = void 0;
var _type = require("../../../../core/utils/type");
var _m_modules = require("../m_modules");
class ColumnFocusDispatcher extends _m_modules.Controller {
  constructor() {
    super(...arguments);
    this.keyboardNavigationControllers = [];
  }
  registerKeyboardNavigationController(keyboardNavigationController) {
    this.keyboardNavigationControllers.push(keyboardNavigationController);
  }
  updateFocusPosition(keyboardNavigationController, cellPosition) {
    if ((0, _type.isDefined)(cellPosition)) {
      keyboardNavigationController.updateFocusPosition(cellPosition);
    } else {
      this.keyboardNavigationControllers.forEach(keyboardController => {
        if (keyboardController === keyboardNavigationController) {
          return;
        }
        keyboardController.updateFocusPosition();
      });
    }
  }
  restoreFocus(keyboardNavigationController) {
    if (keyboardNavigationController.getFirstFocusableVisibleIndex() >= 0) {
      keyboardNavigationController.restoreFocus();
    } else {
      this.keyboardNavigationControllers.forEach(keyboardController => {
        if (keyboardController === keyboardNavigationController) {
          return;
        }
        const firstFocusableVisibleIndex = keyboardController.getFirstFocusableVisibleIndex();
        if (firstFocusableVisibleIndex >= 0) {
          keyboardController.restoreFocus();
        }
      });
    }
  }
}
exports.ColumnFocusDispatcher = ColumnFocusDispatcher;
