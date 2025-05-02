/**
* DevExtreme (cjs/__internal/grids/new/grid_core/content_view/content_view.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentView = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _m_resize_observer = require("../../../../core/m_resize_observer");
var _error_row = require("../../../../grids/new/grid_core/content_view/error_row");
var _no_data_text = require("../../../../grids/new/grid_core/content_view/no_data_text");
var _load_panel = require("../../../../grids/new/grid_core/inferno_wrappers/load_panel");
var _scrollable = require("../../../../grids/new/grid_core/inferno_wrappers/scrollable");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CLASSES = exports.CLASSES = {
  contentView: 'dx-gridcore-contentview'
};
class ContentView extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.scrollableRef = (0, _inferno.createRef)();
    this.containerRef = (0, _inferno.createRef)();
  }
  render() {
    return (0, _inferno.createVNode)(1, "div", CLASSES.contentView, [(0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _load_panel.LoadPanel, _extends({}, this.props.loadPanelProps))), this.props.noDataTextProps.visible && (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _no_data_text.NoDataText, _extends({}, this.props.noDataTextProps))), (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, _extends({
      "componentRef": this.props.scrollableRef
    }, this.props.scrollableProps, {
      children: this.props.children
    }), null, this.scrollableRef)), (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _error_row.ErrorRow, _extends({}, this.props.errorRowProps)))], 0, null, null, this.containerRef);
  }
  updateSizesInfo() {
    var _this$props, _this$props$onViewpor;
    const clientHeight = this.scrollableRef.current.clientHeight();
    (_this$props = this.props) === null || _this$props === void 0 || (_this$props$onViewpor = _this$props.onViewportHeightChange) === null || _this$props$onViewpor === void 0 || _this$props$onViewpor.call(_this$props, clientHeight);
  }
  componentDidMount() {
    this.updateSizesInfo();
    _m_resize_observer.resizeObserverSingleton.observe(this.containerRef.current, entry => {
      var _this$props$onWidthCh, _this$props2;
      (_this$props$onWidthCh = (_this$props2 = this.props).onWidthChange) === null || _this$props$onWidthCh === void 0 || _this$props$onWidthCh.call(_this$props2, entry.contentRect.width);
    });
  }
  componentDidUpdate() {
    this.updateSizesInfo();
  }
  componentWillUnmount() {
    _m_resize_observer.resizeObserverSingleton.unobserve(this.containerRef.current);
  }
}
exports.ContentView = ContentView;
