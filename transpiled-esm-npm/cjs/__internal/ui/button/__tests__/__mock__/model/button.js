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