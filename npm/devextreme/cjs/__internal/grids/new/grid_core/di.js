/**
* DevExtreme (cjs/__internal/grids/new/grid_core/di.js)
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
exports.register = register;
var _index = require("../../../grids/new/grid_core/search/index");
var _controller = require("./accessibility/controller");
var ColumnChooserModule = _interopRequireWildcard(require("./column_chooser/index"));
var ColumnsControllerModule = _interopRequireWildcard(require("./columns_controller/index"));
var DataControllerModule = _interopRequireWildcard(require("./data_controller/index"));
var _confirm_controller = require("./editing/confirm_controller");
var _controller2 = require("./editing/controller");
var _view = require("./editing/popup/view");
var _error_controller = require("./error_controller/error_controller");
var FilterSyncModule = _interopRequireWildcard(require("./filtering/filter_sync/index"));
var _index6 = require("./filtering/header_filter/index");
var _view_controller = require("./filtering/header_filter/view_controller");
var FilterControllerModule = _interopRequireWildcard(require("./filtering/index"));
var _items_controller = require("./items_controller/items_controller");
var _index8 = require("./keyboard_navigation/index");
var Lifecycle = _interopRequireWildcard(require("./lifecycle/index"));
var _index10 = require("./options_validation/index");
var _view2 = require("./pager/view");
var _controller3 = require("./search/controller");
var _view3 = require("./search/view");
var SelectionControllerModule = _interopRequireWildcard(require("./selection/index"));
var SortingControllerModule = _interopRequireWildcard(require("./sorting_controller/index"));
var _controller4 = require("./toolbar/controller");
var _view4 = require("./toolbar/view");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function register(diContext) {
  diContext.register(DataControllerModule.DataController);
  diContext.register(DataControllerModule.CompatibilityDataController);
  diContext.register(_items_controller.ItemsController);
  diContext.register(ColumnsControllerModule.ColumnsController);
  diContext.register(SelectionControllerModule.Controller);
  diContext.register(ColumnsControllerModule.CompatibilityColumnsController);
  diContext.register(SortingControllerModule.SortingController);
  diContext.register(_controller4.ToolbarController);
  diContext.register(_view4.ToolbarView);
  diContext.register(_view2.PagerView);
  diContext.register(_controller3.SearchController);
  diContext.register(_view3.SearchView);
  diContext.register(ColumnChooserModule.ColumnChooserController);
  diContext.register(ColumnChooserModule.ColumnChooserView);
  diContext.register(FilterControllerModule.FilterController);
  diContext.register(FilterControllerModule.FilterPanelView);
  diContext.register(_index6.HeaderFilterController);
  diContext.register(_index6.HeaderFilterPopupView);
  diContext.register(FilterSyncModule.FilterSyncController);
  diContext.register(FilterSyncModule.CompatibilityFilterSyncController);
  diContext.register(_index6.CompatibilityHeaderFilterController);
  diContext.register(_error_controller.ErrorController);
  diContext.register(_controller2.EditingController);
  diContext.register(_confirm_controller.ConfirmController);
  diContext.register(_view.EditPopupView);
  diContext.register(_index.SearchUIController);
  diContext.register(_view3.SearchView);
  diContext.register(_view_controller.HeaderFilterViewController);
  diContext.register(_index8.KeyboardNavigationController);
  diContext.register(_controller.AccessibilityController);
  diContext.register(_index10.OptionsValidationController);
  diContext.register(Lifecycle.Controller);
}
