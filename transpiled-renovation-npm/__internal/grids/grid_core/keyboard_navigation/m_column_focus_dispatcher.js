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
}
exports.ColumnFocusDispatcher = ColumnFocusDispatcher;