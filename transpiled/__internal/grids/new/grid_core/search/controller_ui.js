"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchUIController = void 0;
class SearchUIController {
  constructor() {
    this.callbacks = {};
  }
  registerCallback(name, callback) {
    this.callbacks[name] = callback;
  }
  doUIAction(name) {
    var _this$callbacks$name, _this$callbacks;
    (_this$callbacks$name = (_this$callbacks = this.callbacks)[name]) === null || _this$callbacks$name === void 0 || _this$callbacks$name.call(_this$callbacks);
  }
}
exports.SearchUIController = SearchUIController;
SearchUIController.dependencies = [];