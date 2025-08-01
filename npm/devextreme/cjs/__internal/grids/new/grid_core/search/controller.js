/**
* DevExtreme (cjs/__internal/grids/new/grid_core/search/controller.js)
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
exports.SearchController = void 0;
var _signalsCore = require("@preact/signals-core");
var _columns_controller = require("../columns_controller/columns_controller");
var _options_controller = require("../options_controller/options_controller");
var _utils = require("./utils");
class SearchController {
  constructor(options, columnsController) {
    this.options = options;
    this.columnsController = columnsController;
    this.highlightTextOptions = (0, _signalsCore.computed)(() => {
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
    this.searchFilter = (0, _signalsCore.computed)(() => {
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
