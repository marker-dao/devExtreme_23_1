"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemsController = void 0;
var _common = require("../../../../../core/utils/common");
var _format_helper = _interopRequireDefault(require("../../../../../format_helper"));
var _signalsCore = require("@preact/signals-core");
var _columns_controller = require("../../../../grids/new/grid_core/columns_controller/columns_controller");
var _data_controller = require("../../../../grids/new/grid_core/data_controller/data_controller");
var _index = require("../../../../grids/new/grid_core/search/index");
var _index2 = require("../utils/parse_value/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ItemsController {
  constructor(dataController, columnsController, searchController) {
    this.dataController = dataController;
    this.columnsController = columnsController;
    this.searchController = searchController;
    this.selectedCardKeys = (0, _signalsCore.signal)([]);
    this.additionalItems = (0, _signalsCore.signal)([]);
    this.items = (0, _signalsCore.computed)(() => {
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
    return items.find(item => (0, _common.equalByValue)(item.key, key)) ?? null;
  }
  createCardInfo(data, columns, itemIndex, selectedCardKeys, key) {
    let visible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    const itemKey = key ?? this.dataController.getDataKey(data);
    const fields = columns.map((column, index) => {
      const value = column.calculateFieldValue(data);
      const displayValue = column.calculateDisplayValue(data);
      const formattedText = _format_helper.default.format((0, _index2.parseValue)(column, displayValue), column.format);
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
      data,
      visible
    };
    card.fields.forEach(f => {
      f.card = card;
    });
    return card;
  }
  // TODO: remove this method, it is duplicated
  getCardByKey(key) {
    const items = this.items.peek();
    return items.find(item => (0, _common.equalByValue)(item.key, key));
  }
}
exports.ItemsController = ItemsController;
ItemsController.dependencies = [_data_controller.DataController, _columns_controller.ColumnsController, _index.SearchController];