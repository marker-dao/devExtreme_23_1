/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/filter_panel/filter_panel.js)
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
exports.FilterPanelComponent = void 0;
var _inferno = require("inferno");
var _renderer = _interopRequireDefault(require("../../../../../../core/renderer"));
var _const = require("../../const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FilterPanelComponent extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.filterPanelRef = (0, _inferno.createRef)();
    this.filterBuilderRef = (0, _inferno.createRef)();
  }
  render() {
    return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", null, null, 1, null, null, this.filterPanelRef), (0, _inferno.createVNode)(1, "div", _const.CLASSES.excludeFlexBox, null, 1, null, null, this.filterBuilderRef)], 4);
  }
  componentDidMount() {
    this.props.oldFilterPanelView.render((0, _renderer.default)(this.filterPanelRef.current));
    this.props.oldFilterBuilderView.render((0, _renderer.default)(this.filterBuilderRef.current));
  }
  componentDidUpdate() {
    this.props.oldFilterPanelView.render((0, _renderer.default)(this.filterPanelRef.current));
    this.props.oldFilterBuilderView.render((0, _renderer.default)(this.filterBuilderRef.current));
  }
}
exports.FilterPanelComponent = FilterPanelComponent;
