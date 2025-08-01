/**
* DevExtreme (esm/__internal/grids/new/grid_core/search/view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { effect, signal } from '@preact/signals-core';
import { ToolbarController } from '../../../../grids/new/grid_core/toolbar/controller';
import { OptionsController } from '../options_controller/options_controller';
import { SearchController } from './controller';
import { SearchUIController } from './controller_ui';
import { addSearchTextBox } from './utils';
export class SearchView {
  constructor(options, toolbarController, searchUIController, searchController) {
    this.options = options;
    this.toolbarController = toolbarController;
    this.searchUIController = searchUIController;
    this.searchController = searchController;
    this.searchTextBox = signal(null);
    const toolbarItem = addSearchTextBox({
      placeholder: this.searchController.searchPlaceholder.value,
      value: this.searchController.searchTextOption.value,
      width: this.searchController.searchWidth.value,
      onValueChanged: text => {
        this.searchController.updateSearchText(text);
      }
    }, component => {
      this.searchTextBox.value = component;
    });
    this.toolbarController.addDefaultItem(signal(toolbarItem), this.options.oneWay('searchPanel.visible'));
    effect(() => {
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
SearchView.dependencies = [OptionsController, ToolbarController, SearchUIController, SearchController];
