"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormModel = void 0;
const SELECTORS = {
  textEditorInput: 'dx-texteditor-input',
  item: 'dx-item'
};
class EditFormModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getItem(id) {
    var _this$root;
    return ((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.querySelector(`.${SELECTORS.textEditorInput}[id*=_${id}]`)) ?? null;
  }
  getItems() {
    var _this$root2;
    return ((_this$root2 = this.root) === null || _this$root2 === void 0 ? void 0 : _this$root2.querySelectorAll(`.${SELECTORS.item}`)) ?? null;
  }
}
exports.EditFormModel = EditFormModel;