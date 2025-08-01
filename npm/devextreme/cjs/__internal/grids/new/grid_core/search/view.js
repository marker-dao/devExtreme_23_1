/**
* DevExtreme (cjs/__internal/grids/new/grid_core/search/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchView = void 0;
var _signalsCore = require("@preact/signals-core");
var _controller = require("../../../../grids/new/grid_core/toolbar/controller");
var _options_controller = require("../options_controller/options_controller");
var _controller2 = require("./controller");
var _controller_ui = require("./controller_ui");
var _utils = require("./utils");
class SearchView {
  constructor(options, toolbarController, searchUIController, searchController) {
    this.options = options;
    this.toolbarController = toolbarController;
    this.searchUIController = searchUIController;
    this.searchController = searchController;
    this.searchTextBox = (0, _signalsCore.signal)(null);
    const toolbarItem = (0, _utils.addSearchTextBox)({
      placeholder: this.searchController.searchPlaceholder.value,
      value: this.searchController.searchTextOption.value,
      width: this.searchController.searchWidth.value,
      onValueChanged: text => {
        this.searchController.updateSearchText(text);
      }
    }, component => {
      this.searchTextBox.value = component;
    });
    this.toolbarController.addDefaultItem((0, _signalsCore.signal)(toolbarItem), this.options.oneWay('searchPanel.visible'));
    (0, _signalsCore.effect)(() => {
      var _this$searchTextBox$v, _this$searchTextBox$v2, _this$searchTextBox$v3;
      (_this$searchTextBox$v = this.searchTextBox.value) === null || _this$searchTextBox$v === void 0 || _this$searchTextBox$v.option('value', this.searchController.searchTextOption.value);
      (_this$searchTextBox$v2 = this.searchTextBox.value) === null || _this$searchTextBox$v2 === void 0 || _this$searchTextBox$v2.option('placeholder', this.searchController.searchPlaceholder.value);
      (_this$searchTextBox$v3 = this.searchTextBox.value) === null || _this$searchTextBox$v3 === void 0 || _this$searchTextBox$v3.option('width', this.searchController.searchWidth.value);
    });
    this.searchUIController.registerCallback('focusSearchTextBox', () => {
      var _this$searchTextBox$v4;
      (_this$searchTextBox$v4 = this.searchTextBox.value) === null || _this$searchTextBox$v4 === void 0 || _this$searchTextBox$v4.focus();
    });
  }
}
exports.SearchView = SearchView;
SearchView.dependencies = [_options_controller.OptionsController, _controller.ToolbarController, _controller_ui.SearchUIController, _controller2.SearchController];
