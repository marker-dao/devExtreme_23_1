"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderFilterPopupView = exports.HeaderFilterPopupComponent = void 0;
var _inferno = require("inferno");
var _renderer = _interopRequireDefault(require("../../../../../../core/renderer"));
var _index = require("../../../../../core/state_manager/index");
var _m_header_filter_core = require("../../../../../grids/grid_core/header_filter/m_header_filter_core");
var _view = require("../../../../../grids/new/grid_core/core/view");
var _widget_mock = require("../../../../../grids/new/grid_core/widget_mock");
var _const = require("../../const");
var _view_controller = require("./view_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class HeaderFilterPopupComponent extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.containerRef = (0, _inferno.createRef)();
  }
  render() {
    return (0, _inferno.createVNode)(1, "div", _const.CLASSES.excludeFlexBox, null, 1, null, null, this.containerRef);
  }
  componentDidMount() {
    this.props.oldHeaderFilterPopup.render((0, _renderer.default)(this.containerRef.current ?? undefined));
  }
  componentDidUpdate() {
    this.props.oldHeaderFilterPopup.render((0, _renderer.default)(this.containerRef.current ?? undefined));
  }
  componentWillUnmount() {
    this.props.oldHeaderFilterPopup.dispose();
  }
}
exports.HeaderFilterPopupComponent = HeaderFilterPopupComponent;
class HeaderFilterPopupView extends _view.View {
  constructor(widget, headerFilterViewController) {
    super();
    this.widget = widget;
    this.headerFilterViewController = headerFilterViewController;
    this.component = HeaderFilterPopupComponent;
    this.oldHeaderFilterPopup = new _m_header_filter_core.HeaderFilterView(this.widget);
    this.oldHeaderFilterPopup.init();
    (0, _index.effect)(() => {
      const popupState = this.headerFilterViewController.popupState.value;
      if (!popupState) {
        return;
      }
      this.oldHeaderFilterPopup.showHeaderFilterMenu((0, _renderer.default)(popupState.element), popupState.options);
    });
  }
  getProps() {
    return (0, _index.computed)(() => ({
      oldHeaderFilterPopup: this.oldHeaderFilterPopup
    }));
  }
}
exports.HeaderFilterPopupView = HeaderFilterPopupView;
HeaderFilterPopupView.dependencies = [_widget_mock.WidgetMock, _view_controller.HeaderFilterViewController];