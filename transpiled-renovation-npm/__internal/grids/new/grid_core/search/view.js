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
    this.searchTextBox = null;
    this.toolbarController.addDefaultItem((0, _signalsCore.computed)(() => (0, _utils.addSearchTextBox)(this.getProps().value, component => {
      this.searchTextBox = component;
    })), this.options.oneWay('searchPanel.visible'));
    this.searchUIController.registerCallback('focusSearchTextBox', () => {
      var _this$searchTextBox;
      (_this$searchTextBox = this.searchTextBox) === null || _this$searchTextBox === void 0 || _this$searchTextBox.focus();
    });
  }
  getProps() {
    return (0, _signalsCore.computed)(() => ({
      placeholder: this.options.oneWay('searchPanel.placeholder').value,
      // TODO: resolve update cycle: editor - option - editor
      // value: this.searchController.searchTextOption.value,
      width: this.options.oneWay('searchPanel.width').value,
      onValueChanged: text => {
        this.searchController.updateSearchText(text);
      }
    }));
  }
}
exports.SearchView = SearchView;
SearchView.dependencies = [_options_controller.OptionsController, _controller.ToolbarController, _controller_ui.SearchUIController, _controller2.SearchController];