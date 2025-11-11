/**
* DevExtreme (cjs/__internal/ui/list/__tests__/__mock__/model/list_item.js)
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
