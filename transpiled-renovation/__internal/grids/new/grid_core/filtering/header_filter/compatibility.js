"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompatibilityHeaderFilterController = void 0;
var _index = require("../../data_controller/index");
var _options_controller = require("../../options_controller/options_controller");
var _filter_controller = require("../filter_controller");
var _legacy_header_filter = require("./legacy_header_filter");
var _view_controller = require("./view_controller");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class CompatibilityHeaderFilterController {
  constructor(realFilterController, realHeaderFilterViewController, realDataController, options) {
    this.realFilterController = realFilterController;
    this.realHeaderFilterViewController = realHeaderFilterViewController;
    this.realDataController = realDataController;
    this.options = options;
    this.realFilterController.headerFilterCompatibilityController = this;
  }
  getCustomFilterOperations() {
    return this.realFilterController.customOperations.peek();
  }
  showHeaderFilterMenuBase(args) {
    this.realHeaderFilterViewController.openPopup(args.columnElement, args.column, args.onHidden, args.customApply, args.isFilterBuilder);
  }
  hideHeaderFilterMenu() {
    this.realHeaderFilterViewController.closePopup();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDataSource(column) {
    const adapter = this.realDataController.getStoreLoadAdapter();
    const popupOptions = {
      column: _extends({}, column),
      filterType: column.filterType,
      filterValues: column.filterValues
    };
    /*
      Note: Root headerFilter options are used because the legacy code handles retrieving
      options for specific columns on its own
    */
    const rootHeaderFilterOptions = this.options.oneWay('headerFilter').peek();
    return (0, _legacy_header_filter.getDataSourceOptions)(adapter, popupOptions, rootHeaderFilterOptions, null);
  }
}
exports.CompatibilityHeaderFilterController = CompatibilityHeaderFilterController;
CompatibilityHeaderFilterController.dependencies = [_filter_controller.FilterController, _view_controller.HeaderFilterViewController, _index.DataController, _options_controller.OptionsController];