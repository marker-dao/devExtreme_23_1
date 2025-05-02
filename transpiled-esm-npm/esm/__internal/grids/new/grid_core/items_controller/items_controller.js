import { equalByValue } from '../../../../../core/utils/common';
import formatHelper from '../../../../../format_helper';
import { computed, signal } from '@preact/signals-core';
import { ColumnsController } from '../../../../grids/new/grid_core/columns_controller/columns_controller';
import { DataController } from '../../../../grids/new/grid_core/data_controller/data_controller';
import { SearchController } from '../../../../grids/new/grid_core/search/index';
import { parseValue } from '../utils';
export class ItemsController {
  constructor(dataController, columnsController, searchController) {
    this.dataController = dataController;
    this.columnsController = columnsController;
    this.searchController = searchController;
    this.selectedCardKeys = signal([]);
    this.additionalItems = signal([]);
    this.items = computed(() => {
      // NOTE: We should trigger computed by search options change
      // But all work with these options encapsulated in SearchHighlightTextProcessor
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.searchController.highlightTextOptions.value;
      return this.dataController.items.value.map((item, itemIndex) => this.createCardInfo(item, this.columnsController.visibleColumns.value, itemIndex, this.selectedCardKeys.value)).concat(this.additionalItems.value);
    });
  }
  setSelectionState(keys) {
    this.selectedCardKeys.value = keys;
  }
  findItemByKey(items, key) {
    return items.find(item => item.key === key) ?? null;
  }
  createCardInfo(data, columns, itemIndex, selectedCardKeys, key) {
    const itemKey = key ?? this.dataController.getDataKey(data);
    const fields = columns.map((column, index) => {
      const value = column.calculateFieldValue(data);
      const displayValue = column.calculateDisplayValue(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedText = formatHelper.format(parseValue(column, displayValue), column.format);
      const text = column.customizeText ? column.customizeText({
        value: displayValue,
        valueText: formattedText
      }) : formattedText;
      const highlightedText = this.searchController.getHighlightedText(text);
      return {
        card: {},
        index,
        column,
        value,
        displayValue,
        text,
        highlightedText
      };
    });
    const card = {
      fields,
      columns,
      values: fields.map(f => f.value),
      key: itemKey,
      index: itemIndex,
      isSelected: !!(selectedCardKeys !== null && selectedCardKeys !== void 0 && selectedCardKeys.includes(itemKey)),
      data
    };
    card.fields.forEach(f => {
      f.card = card;
    });
    return card;
  }
  // TODO: remove this method, it is duplicated
  getCardByKey(key) {
    const items = this.items.peek();
    return items.find(item => equalByValue(item.key, key));
  }
}
ItemsController.dependencies = [DataController, ColumnsController, SearchController];