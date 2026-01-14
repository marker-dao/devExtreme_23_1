/**
* DevExtreme (cjs/__internal/ui/list/__tests__/__mock__/model/list_item.js)
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
