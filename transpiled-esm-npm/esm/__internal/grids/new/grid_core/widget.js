import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable spellcheck/spell-checker */
// eslint-disable-next-line max-classes-per-file
import { extend } from '../../../../core/utils/extend';
import Widget from '../../../../ui/widget/ui.widget';
import { DIContext } from '../../../core/di/index';
import { infernoRenderer } from '../../../core/m_inferno_renderer';
import { SearchView } from '../../../grids/new/grid_core/search/view';
import * as ColumnChooserModule from './column_chooser/index';
import { CompatibilityColumnsController } from './columns_controller/compatibility';
import * as ColumnsControllerModule from './columns_controller/index';
import * as DataControllerModule from './data_controller/index';
import * as di from './di';
import { EditingController } from './editing/controller';
import { EditPopupView } from './editing/popup/view';
import { ErrorController } from './error_controller/error_controller';
import { ClearFilterVisitor } from './filtering/filter_visitors/clear_filter_visitor';
import { GetAppliedFilterVisitor } from './filtering/filter_visitors/get_applied_filters_visitor';
import { HeaderFilterController } from './filtering/header_filter/index';
import { HeaderFilterViewController } from './filtering/header_filter/view_controller';
import * as FilterControllerModule from './filtering/index';
import { ItemsController } from './items_controller/items_controller';
import { MainView } from './main_view';
import { defaultOptions, defaultOptionsRules } from './options';
import { PagerView } from './pager/view';
import * as SearchControllerModule from './search/index';
import * as SelectionControllerModule from './selection/index';
import * as SortingControllerModule from './sorting_controller/index';
import { ToolbarController } from './toolbar/controller';
import { ToolbarView } from './toolbar/view';
import { WidgetMock } from './widget_mock';
export class GridCoreNewBase extends Widget {
  _registerDIContext() {
    this.diContext = new DIContext();
    di.register(this.diContext);
  }
  _initWidgetMock() {
    this.diContext.registerInstance(WidgetMock, new WidgetMock(this, this.diContext.get(DataControllerModule.CompatibilityDataController), this.diContext.get(CompatibilityColumnsController)));
  }
  _initDIContext() {
    this.dataController = this.diContext.get(DataControllerModule.DataController);
    this.columnsController = this.diContext.get(ColumnsControllerModule.ColumnsController);
    this.sortingController = this.diContext.get(SortingControllerModule.SortingController);
    this.selectionController = this.diContext.get(SelectionControllerModule.Controller);
    this.itemsController = this.diContext.get(ItemsController);
    this.toolbarController = this.diContext.get(ToolbarController);
    this.toolbarView = this.diContext.get(ToolbarView);
    this.editingController = this.diContext.get(EditingController);
    this.editPopupView = this.diContext.get(EditPopupView);
    this.pagerView = this.diContext.get(PagerView);
    this.searchController = this.diContext.get(SearchControllerModule.SearchController);
    this.columnChooserController = this.diContext.get(ColumnChooserModule.ColumnChooserController);
    this.columnChooserView = this.diContext.get(ColumnChooserModule.ColumnChooserView);
    this.errorController = this.diContext.get(ErrorController);
    this.filterController = this.diContext.get(FilterControllerModule.FilterController);
    this.headerFilterController = this.diContext.get(HeaderFilterController);
    this.filterPanelView = this.diContext.get(FilterControllerModule.FilterPanelView);
    this.headerFilterViewController = this.diContext.get(HeaderFilterViewController);
    this.searchView = this.diContext.get(SearchView);
    this.clearFilterVisitor = this.diContext.get(ClearFilterVisitor);
    this.getAppliedFiltersVisitor = this.diContext.get(GetAppliedFilterVisitor);
  }
  _init() {
    // @ts-expect-error
    super._init();
    this._registerDIContext();
    this._initWidgetMock();
    this._initDIContext();
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), extend(true, {}, defaultOptions));
  }
  _defaultOptionsRules() {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super._defaultOptionsRules().concat(defaultOptionsRules);
  }
  _initMarkup() {
    // @ts-expect-error
    super._initMarkup();
    this.renderSubscription = this.diContext.get(MainView).render(this.$element().get(0));
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
    infernoRenderer.renderIntoContainer(null, this.$element().get(0), true);
    // @ts-expect-error
    super._clean();
  }
}
export class GridCoreNew extends ColumnsControllerModule.PublicMethods(DataControllerModule.PublicMethods(SortingControllerModule.PublicMethods(FilterControllerModule.PublicMethods(ColumnChooserModule.PublicMethods(SelectionControllerModule.PublicMethods(SearchControllerModule.PublicMethods(GridCoreNewBase))))))) {}