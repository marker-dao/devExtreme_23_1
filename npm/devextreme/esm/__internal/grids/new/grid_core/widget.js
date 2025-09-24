/**
* DevExtreme (esm/__internal/grids/new/grid_core/widget.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable spellcheck/spell-checker */
// eslint-disable-next-line max-classes-per-file
import { extend } from '../../../../core/utils/extend';
import Widget from '../../../../ui/widget/ui.widget';
import { DIContext } from '../../../core/di/index';
import { infernoRenderer } from '../../../core/m_inferno_renderer';
import { signal } from '../../../core/state_manager/index';
import { SearchView } from '../../../grids/new/grid_core/search/view';
import { rerender } from 'inferno';
import { AccessibilityController } from './accessibility/index';
import * as ColumnChooserModule from './column_chooser/index';
import { CompatibilityColumnsController } from './columns_controller/compatibility';
import * as ColumnsControllerModule from './columns_controller/index';
import * as DataControllerModule from './data_controller/index';
import * as di from './di';
import * as EditingModule from './editing/index';
import { EditPopupView } from './editing/popup/view';
import { ErrorController } from './error_controller/error_controller';
import { CompatibilityFilterSyncController, FilterSyncController } from './filtering/filter_sync/index';
import { CompatibilityHeaderFilterController, HeaderFilterController } from './filtering/header_filter/index';
import { HeaderFilterViewController } from './filtering/header_filter/view_controller';
import * as FilterControllerModule from './filtering/index';
import { ItemsController } from './items_controller/items_controller';
import { LifeCycleController } from './lifecycle/controller';
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
    this.diContext.registerInstance(WidgetMock, new WidgetMock(this, this.diContext.get(DataControllerModule.CompatibilityDataController), this.diContext.get(CompatibilityColumnsController), this.diContext.get(CompatibilityHeaderFilterController), this.diContext.get(CompatibilityFilterSyncController)));
  }
  _initDIContext() {
    this.dataController = this.diContext.get(DataControllerModule.DataController);
    this.columnsController = this.diContext.get(ColumnsControllerModule.ColumnsController);
    this.sortingController = this.diContext.get(SortingControllerModule.SortingController);
    this.selectionController = this.diContext.get(SelectionControllerModule.Controller);
    this.itemsController = this.diContext.get(ItemsController);
    this.toolbarController = this.diContext.get(ToolbarController);
    this.toolbarView = this.diContext.get(ToolbarView);
    this.editingController = this.diContext.get(EditingModule.Controller);
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
    this.accessibilityController = this.diContext.get(AccessibilityController);
    this.filterSyncController = this.diContext.get(FilterSyncController);
    this.searchView = this.diContext.get(SearchView);
  }
  _initLifeCycleController() {
    this.lifeCycleController = this.diContext.get(LifeCycleController);
    this.lifeCycleController.provideContentReadyCallback(() => {
      // @ts-expect-error
      this._fireContentReadyAction();
    });
  }
  _init() {
    // @ts-expect-error
    super._init();
    this.initialized = signal(false);
    this._registerDIContext();
    this._initWidgetMock();
    this._initDIContext();
    this._initLifeCycleController();
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), extend(true, {}, defaultOptions));
  }
  _defaultOptionsRules() {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super._defaultOptionsRules().concat(defaultOptionsRules);
  }
  _initializeComponent() {
    // @ts-expect-error usage of base method not described in d.ts
    super._initializeComponent();
    this.initialized.value = true;
  }
  // NOTE: this disables calling of _fireContentReadyAction on initial render
  _renderContent() {
    // @ts-expect-error
    this._renderContentImpl();
  }
  _initMarkup() {
    // @ts-expect-error
    super._initMarkup();
    this.renderSubscription = this.diContext.get(MainView).render(this.$element().get(0));
    // NOTE: We flush all Inferno async render operations after initial render
    // Because after component creation markup should be ready
    rerender();
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
export class GridCoreNew extends ColumnsControllerModule.PublicMethods(DataControllerModule.PublicMethods(SortingControllerModule.PublicMethods(FilterControllerModule.PublicMethods(ColumnChooserModule.PublicMethods(SelectionControllerModule.PublicMethods(SearchControllerModule.PublicMethods(EditingModule.PublicMethods(GridCoreNewBase)))))))) {}
