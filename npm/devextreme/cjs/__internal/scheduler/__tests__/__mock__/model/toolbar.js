/**
* DevExtreme (cjs/__internal/scheduler/__tests__/__mock__/model/toolbar.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarModel = void 0;
class ToolbarModel {
  constructor(element) {
    this.element = element;
  }
  getPrevButton() {
    var _this$element;
    return (_this$element = this.element) === null || _this$element === void 0 ? void 0 : _this$element.querySelector('.dx-scheduler-navigator-previous');
  }
  getNextButton() {
    var _this$element2;
    return (_this$element2 = this.element) === null || _this$element2 === void 0 ? void 0 : _this$element2.querySelector('.dx-scheduler-navigator-next');
  }
}
exports.ToolbarModel = ToolbarModel;
