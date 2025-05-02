/**
* DevExtreme (esm/__internal/grids/new/grid_core/search/view.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { computed } from '@preact/signals-core';
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
    this.searchTextBox = null;
    this.toolbarController.addDefaultItem(computed(() => addSearchTextBox(this.getProps().value, component => {
      this.searchTextBox = component;
    })), this.options.oneWay('searchPanel.visible'));
    this.searchUIController.registerCallback('focusSearchTextBox', () => {
      var _this$searchTextBox;
      (_this$searchTextBox = this.searchTextBox) === null || _this$searchTextBox === void 0 || _this$searchTextBox.focus();
    });
  }
  getProps() {
    return computed(() => ({
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
SearchView.dependencies = [OptionsController, ToolbarController, SearchUIController, SearchController];
