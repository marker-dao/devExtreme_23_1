/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/compatibility.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { DataController } from '../../data_controller/index';
import { OptionsController } from '../../options_controller/options_controller';
import { FilterController } from '../filter_controller';
import { getDataSourceOptions } from './legacy_header_filter';
import { HeaderFilterViewController } from './view_controller';
export class CompatibilityHeaderFilterController {
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
    return getDataSourceOptions(adapter, popupOptions, rootHeaderFilterOptions, null);
  }
}
CompatibilityHeaderFilterController.dependencies = [FilterController, HeaderFilterViewController, DataController, OptionsController];
