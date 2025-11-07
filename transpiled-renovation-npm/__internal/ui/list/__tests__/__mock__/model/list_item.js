"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemModel = void 0;
const CLASSES = {
  stateDisabled: 'dx-state-disabled'
};
class ListItemModel {
  constructor(root) {
    this.root = root;
    this.isDisabled = (root === null || root === void 0 ? void 0 : root.classList.contains(CLASSES.stateDisabled)) ?? false;
  }
  getElement() {
    return this.root;
  }
}
exports.ListItemModel = ListItemModel;