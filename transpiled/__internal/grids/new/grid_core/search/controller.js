"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchController = void 0;
var _index = require("../../../../core/state_manager/index");
var _columns_controller = require("../columns_controller/columns_controller");
var _options_controller = require("../options_controller/options_controller");
var _utils = require("./utils");
class SearchController {
  constructor(options, columnsController) {
    this.options = options;
    this.columnsController = columnsController;
    this.highlightTextOptions = (0, _index.computed)(() => {
      const searchOptions = this.options.oneWay('searchPanel').value;
      return {
        enabled: searchOptions.highlightSearchText,
        caseSensitive: searchOptions.highlightCaseSensitive,
        searchStr: searchOptions.text
      };
    });
    this.searchTextOption = this.options.twoWay('searchPanel.text');
    this.searchPlaceholder = this.options.oneWay('searchPanel.placeholder');
    this.searchWidth = this.options.oneWay('searchPanel.width');
    this.searchVisibleColumnsOnly = this.options.oneWay('searchPanel.searchVisibleColumnsOnly');
    this.searchFilter = (0, _index.computed)(() => {
      const searchText = this.searchTextOption.value;
      const columns = this.columnsController.columns.value;
      const searchVisibleColumnsOnly = this.searchVisibleColumnsOnly.value;
      return (0, _utils.calculateSearchFilter)(searchText, columns, searchVisibleColumnsOnly);
    });
    this.getHighlightedText = text => (0, _utils.splitHighlightedText)(text, this.highlightTextOptions.peek());
    this.updateSearchText = text => {
      this.searchTextOption.value = text;
    };
  }
}
exports.SearchController = SearchController;
SearchController.dependencies = [_options_controller.OptionsController, _columns_controller.ColumnsController];