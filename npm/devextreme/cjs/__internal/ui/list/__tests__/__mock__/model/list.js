/**
* DevExtreme (cjs/__internal/ui/list/__tests__/__mock__/model/list.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListModel = void 0;
var _list_item = require("./list_item");
const CLASSES = {
  list: 'dx-list',
  item: 'dx-list-item'
};
class ListModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getItems() {
    var _this$root;
    return ((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.querySelectorAll(`.${CLASSES.item}`)) ?? null;
  }
  getItem() {
    var _this$getItems;
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return new _list_item.ListItemModel(((_this$getItems = this.getItems()) === null || _this$getItems === void 0 ? void 0 : _this$getItems[index]) ?? null);
  }
}
exports.ListModel = ListModel;
