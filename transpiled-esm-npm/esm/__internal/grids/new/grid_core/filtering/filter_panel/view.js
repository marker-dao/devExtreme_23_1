import { computed } from '@preact/signals-core';
import { FilterBuilderView as OldFilterBuilderView } from '../../../../../grids/grid_core/filter/m_filter_builder';
import { FilterPanelView as OldFilterPanelView } from '../../../../../grids/grid_core/filter/m_filter_panel';
import { View } from '../../core/view';
import { WidgetMock } from '../../widget_mock';
import { FilterController } from '../filter_controller';
import { FilterPanelComponent } from './filter_panel';
export class FilterPanelView extends View {
  constructor(filterController, widget) {
    super();
    this.filterController = filterController;
    this.widget = widget;
    this.component = FilterPanelComponent;
    this.oldFilterPanelView = new OldFilterPanelView(this.widget);
    this.oldFilterBuilderView = new OldFilterBuilderView(this.widget);
    this.oldFilterPanelView.init();
    this.oldFilterBuilderView.init();
  }
  getProps() {
    return computed(() => ({
      oldFilterBuilderView: this.oldFilterBuilderView,
      oldFilterPanelView: this.oldFilterPanelView,
      filterValue: this.filterController.filterValueOption.value,
      filterPanel: this.filterController.filterPanelOptions.value,
      filterBuilder: this.filterController.filterBuilderOptions.value,
      filterBuilderPopup: this.filterController.filterBuilderPopupOptions.value
    }));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  optionChanged(args) {
    this.oldFilterBuilderView.optionChanged(args);
    this.oldFilterPanelView.optionChanged(args);
  }
  isCompatibilityMode() {
    return true;
  }
}
FilterPanelView.dependencies = [FilterController, WidgetMock];