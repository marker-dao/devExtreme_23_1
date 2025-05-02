"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreNewBase = exports.GridCoreNew = void 0;
var _extend = require("../../../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.widget"));
var _index = require("../../../core/di/index");
var _m_inferno_renderer = require("../../../core/m_inferno_renderer");
var _view = require("../../../grids/new/grid_core/search/view");
var ColumnChooserModule = _interopRequireWildcard(require("./column_chooser/index"));
var _compatibility = require("./columns_controller/compatibility");
var ColumnsControllerModule = _interopRequireWildcard(require("./columns_controller/index"));
var DataControllerModule = _interopRequireWildcard(require("./data_controller/index"));
var di = _interopRequireWildcard(require("./di"));
var _controller = require("./editing/controller");
var _view2 = require("./editing/popup/view");
var _error_controller = require("./error_controller/error_controller");
var _clear_filter_visitor = require("./filtering/filter_visitors/clear_filter_visitor");
var _get_applied_filters_visitor = require("./filtering/filter_visitors/get_applied_filters_visitor");
var _index5 = require("./filtering/header_filter/index");
var _view_controller = require("./filtering/header_filter/view_controller");
var FilterControllerModule = _interopRequireWildcard(require("./filtering/index"));
var _items_controller = require("./items_controller/items_controller");
var _main_view = require("./main_view");
var _options = require("./options");
var _view3 = require("./pager/view");
var SearchControllerModule = _interopRequireWildcard(require("./search/index"));
var SelectionControllerModule = _interopRequireWildcard(require("./selection/index"));
var SortingControllerModule = _interopRequireWildcard(require("./sorting_controller/index"));
var _controller2 = require("./toolbar/controller");
var _view4 = require("./toolbar/view");
var _widget_mock = require("./widget_mock");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/explicit-module-boundary-types */ /* eslint-disable @typescript-eslint/explicit-function-return-type */ /* eslint-disable spellcheck/spell-checker */ // eslint-disable-next-line max-classes-per-file
class GridCoreNewBase extends _ui.default {
  _registerDIContext() {
    this.diContext = new _index.DIContext();
    di.register(this.diContext);
  }
  _initWidgetMock() {
    this.diContext.registerInstance(_widget_mock.WidgetMock, new _widget_mock.WidgetMock(this, this.diContext.get(DataControllerModule.CompatibilityDataController), this.diContext.get(_compatibility.CompatibilityColumnsController)));
  }
  _initDIContext() {
    this.dataController = this.diContext.get(DataControllerModule.DataController);
    this.columnsController = this.diContext.get(ColumnsControllerModule.ColumnsController);
    this.sortingController = this.diContext.get(SortingControllerModule.SortingController);
    this.selectionController = this.diContext.get(SelectionControllerModule.Controller);
    this.itemsController = this.diContext.get(_items_controller.ItemsController);
    this.toolbarController = this.diContext.get(_controller2.ToolbarController);
    this.toolbarView = this.diContext.get(_view4.ToolbarView);
    this.editingController = this.diContext.get(_controller.EditingController);
    this.editPopupView = this.diContext.get(_view2.EditPopupView);
    this.pagerView = this.diContext.get(_view3.PagerView);
    this.searchController = this.diContext.get(SearchControllerModule.SearchController);
    this.columnChooserController = this.diContext.get(ColumnChooserModule.ColumnChooserController);
    this.columnChooserView = this.diContext.get(ColumnChooserModule.ColumnChooserView);
    this.errorController = this.diContext.get(_error_controller.ErrorController);
    this.filterController = this.diContext.get(FilterControllerModule.FilterController);
    this.headerFilterController = this.diContext.get(_index5.HeaderFilterController);
    this.filterPanelView = this.diContext.get(FilterControllerModule.FilterPanelView);
    this.headerFilterViewController = this.diContext.get(_view_controller.HeaderFilterViewController);
    this.searchView = this.diContext.get(_view.SearchView);
    this.clearFilterVisitor = this.diContext.get(_clear_filter_visitor.ClearFilterVisitor);
    this.getAppliedFiltersVisitor = this.diContext.get(_get_applied_filters_visitor.GetAppliedFilterVisitor);
  }
  _init() {
    // @ts-expect-error
    super._init();
    this._registerDIContext();
    this._initWidgetMock();
    this._initDIContext();
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), (0, _extend.extend)(true, {}, _options.defaultOptions));
  }
  _defaultOptionsRules() {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super._defaultOptionsRules().concat(_options.defaultOptionsRules);
  }
  _initMarkup() {
    // @ts-expect-error
    super._initMarkup();
    this.renderSubscription = this.diContext.get(_main_view.MainView).render(this.$element().get(0));
  }
  _optionChanged(args) {
    [this.filterPanelView].forEach(c => {
      if (c.isCompatibilityMode()) {
        c.optionChanged(args);
      }
    });
    if (!args.handled) {
      // @ts-expect-error
      super._optionChanged(args);
    }
  }
  _clean() {
    var _this$renderSubscript;
    (_this$renderSubscript = this.renderSubscription) === null || _this$renderSubscript === void 0 || _this$renderSubscript.call(this);
    _m_inferno_renderer.infernoRenderer.renderIntoContainer(null, this.$element().get(0), true);
    // @ts-expect-error
    super._clean();
  }
}
exports.GridCoreNewBase = GridCoreNewBase;
class GridCoreNew extends ColumnsControllerModule.PublicMethods(DataControllerModule.PublicMethods(SortingControllerModule.PublicMethods(FilterControllerModule.PublicMethods(ColumnChooserModule.PublicMethods(SelectionControllerModule.PublicMethods(SearchControllerModule.PublicMethods(GridCoreNewBase))))))) {}
exports.GridCoreNew = GridCoreNew;