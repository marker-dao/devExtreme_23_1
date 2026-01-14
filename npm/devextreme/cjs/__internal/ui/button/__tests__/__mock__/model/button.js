/**
* DevExtreme (cjs/__internal/ui/button/__tests__/__mock__/model/button.js)
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
exports.ButtonModel = void 0;
const CLASSES = {
  stateDisabled: 'dx-state-disabled'
};
class ButtonModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  isDisabled() {
    return this.root.classList.contains(CLASSES.stateDisabled);
  }
}
exports.ButtonModel = ButtonModel;
