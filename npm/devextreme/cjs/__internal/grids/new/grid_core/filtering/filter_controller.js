/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/filter_controller.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterController = void 0;
var _signalsCore = require("@preact/signals-core");
var _m_filter_custom_operations = require("../../../../grids/grid_core/filter/m_filter_custom_operations");
var _m_utils = _interopRequireDefault(require("../../../../grids/grid_core/m_utils"));
var _index = require("../columns_controller/index");
var _options_controller = require("../options_controller/options_controller");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FilterController {
  constructor(options, columnsController) {
    this.options = options;
    this.columnsController = columnsController;
    this.filterBuilderCustomOperations = this.options.oneWay('filterBuilder.customOperations');
    this.filterPanelFilterEnabled = this.options.oneWay('filterPanel.filterEnabled');
    this.filterValueOption = this.options.twoWay('filterValue');
    this.appliedFilters = (0, _signalsCore.signal)({});
    this.customOperations = (0, _signalsCore.computed)(() => [(0, _m_filter_custom_operations.anyOf)(null), (0, _m_filter_custom_operations.noneOf)(null)].concat(this.filterBuilderCustomOperations.value).filter(o => o));
    this.appliedFilterExpressions = (0, _signalsCore.computed)(() => (0, _utils.getAppliedFilterExpressions)(this.appliedFilters.value, this.columnsController.visibleColumns.value, this.customOperations.value));
    this.displayFilter = (0, _signalsCore.computed)(() => _m_utils.default.combineFilters(this.appliedFilterExpressions.value));
    this.clearFilterCallback = () => {};
  }
  clearFilter() {
    this.clearFilterCallback();
  }
}
exports.FilterController = FilterController;
FilterController.dependencies = [_options_controller.OptionsController, _index.ColumnsController];
