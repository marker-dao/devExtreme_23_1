import { computed } from '@preact/signals-core';
import { ColumnsController } from '../columns_controller/columns_controller';
import { OptionsController } from '../options_controller/options_controller';
import { calculateSearchFilter, splitHighlightedText } from './utils';
export class SearchController {
  constructor(options, columnsController) {
    this.options = options;
    this.columnsController = columnsController;
    this.highlightTextOptions = computed(() => {
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
    this.searchFilter = computed(() => {
      const searchText = this.searchTextOption.value;
      const columns = this.columnsController.columns.value;
      const searchVisibleColumnsOnly = this.searchVisibleColumnsOnly.value;
      return calculateSearchFilter(searchText, columns, searchVisibleColumnsOnly);
    });
    this.getHighlightedText = text => splitHighlightedText(text, this.highlightTextOptions.peek());
    this.updateSearchText = text => {
      this.searchTextOption.value = text;
    };
  }
}
SearchController.dependencies = [OptionsController, ColumnsController];