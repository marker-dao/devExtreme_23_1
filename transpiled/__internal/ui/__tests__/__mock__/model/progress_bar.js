"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBarModel = void 0;
const CLASSES = {
  stateInvisible: 'dx-state-invisible'
};
class ProgressBarModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  isVisible() {
    return !this.root.classList.contains(CLASSES.stateInvisible);
  }
}
exports.ProgressBarModel = ProgressBarModel;