"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterPanelView = void 0;
var _signalsCore = require("@preact/signals-core");
var _m_filter_builder = require("../../../../../grids/grid_core/filter/m_filter_builder");
var _m_filter_panel = require("../../../../../grids/grid_core/filter/m_filter_panel");
var _view = require("../../core/view");
var _options_controller = require("../../options_controller/options_controller");
var _widget_mock = require("../../widget_mock");
var _filter_panel = require("./filter_panel");
class FilterPanelView extends _view.View {
  constructor(options, widget) {
    super();
    this.options = options;
    this.widget = widget;
    this.component = _filter_panel.FilterPanelComponent;
    this.oldFilterPanelView = new _m_filter_panel.FilterPanelView(this.widget);
    this.oldFilterBuilderView = new _m_filter_builder.FilterBuilderView(this.widget);
    this.oldFilterPanelView.init();
    this.oldFilterBuilderView.init();
  }
  getProps() {
    return (0, _signalsCore.computed)(() => ({
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
exports.FilterPanelView = FilterPanelView;
FilterPanelView.dependencies = [_options_controller.OptionsController, _widget_mock.WidgetMock];