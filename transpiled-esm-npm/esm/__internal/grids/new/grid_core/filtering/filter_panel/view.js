import { computed } from '@preact/signals-core';
import { FilterBuilderView as OldFilterBuilderView } from '../../../../../grids/grid_core/filter/m_filter_builder';
import { FilterPanelView as OldFilterPanelView } from '../../../../../grids/grid_core/filter/m_filter_panel';
import { View } from '../../core/view';
import { OptionsController } from '../../options_controller/options_controller';
import { WidgetMock } from '../../widget_mock';
import { FilterPanelComponent } from './filter_panel';
export class FilterPanelView extends View {
  constructor(options, widget) {
    super();
    this.options = options;
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
      filterValue: this.options.oneWay('filterValue').value,
      filterPanel: this.options.oneWay('filterPanel').value,
      filterBuilder: this.options.oneWay('filterBuilder').value,
      filterBuilderPopup: this.options.oneWay('filterBuilderPopup').value
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
FilterPanelView.dependencies = [OptionsController, WidgetMock];