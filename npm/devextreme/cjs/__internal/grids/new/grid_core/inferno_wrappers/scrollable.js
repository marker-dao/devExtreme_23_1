/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/scrollable.js)
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
exports.Scrollable = void 0;
var _inferno = require("inferno");
var _ui = _interopRequireDefault(require("../../../../../ui/scroll_view/ui.scrollable"));
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Scrollable extends _widget_wrapper.InfernoWrapper {
  constructor() {
    super(...arguments);
    this.contentRef = {};
  }
  render() {
    return (0, _inferno.createFragment)([super.render(), this.contentRef.current && (0, _inferno.createPortal)(this.props.children, this.contentRef.current)], 0);
  }
  getComponentFabric() {
    return _ui.default;
  }
  updateScrollTop() {
    var _this$component;
    (_this$component = this.component) === null || _this$component === void 0 || _this$component.scrollTo(this.props.scrollTop);
  }
  componentDidMount() {
    if (this.props.useNative === undefined) {
      // @ts-expect-error
      delete this.props.useNative;
    }
    super.componentDidMount();
    // @ts-expect-error
    this.contentRef.current = this.component.$content().get(0);
    this.setState({});
    this.updateScrollTop();
  }
  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    this.updateScrollTop();
  }
  clientHeight() {
    return this.component.clientHeight();
  }
}
exports.Scrollable = Scrollable;
