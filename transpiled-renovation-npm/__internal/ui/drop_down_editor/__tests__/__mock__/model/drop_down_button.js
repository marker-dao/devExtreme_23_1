"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownButtonModel = void 0;
var _list = require("../../../../../ui/list/__tests__/__mock__/model/list");
const CLASSES = {
  button: 'dx-button',
  list: 'dx-list',
  stateInvisible: 'dx-state-invisible'
};
const ATTR = {
  popupId: 'aria-owns'
};
class DropDownButtonModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getButtonElement() {
    var _this$root;
    return ((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.querySelector(`.${CLASSES.button}`)) ?? null;
  }
  getPopupContent() {
    var _this$root2;
    const popupId = (_this$root2 = this.root) === null || _this$root2 === void 0 ? void 0 : _this$root2.getAttribute(ATTR.popupId);
    return document.body.querySelector(`#${popupId}`);
  }
  getList() {
    var _this$getPopupContent;
    return new _list.ListModel(((_this$getPopupContent = this.getPopupContent()) === null || _this$getPopupContent === void 0 ? void 0 : _this$getPopupContent.querySelector(`.${CLASSES.list}`)) ?? null);
  }
  isOpened() {
    const popupContent = this.getPopupContent();
    const overlayContent = popupContent === null || popupContent === void 0 ? void 0 : popupContent.parentElement;
    return !(overlayContent !== null && overlayContent !== void 0 && overlayContent.classList.contains(CLASSES.stateInvisible));
  }
}
exports.DropDownButtonModel = DropDownButtonModel;