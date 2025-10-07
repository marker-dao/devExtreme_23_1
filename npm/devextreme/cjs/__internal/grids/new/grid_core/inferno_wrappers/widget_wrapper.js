/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/widget_wrapper.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfernoWrapper = void 0;
var _inferno = require("inferno");
var _config_context = require("../core/config_context");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class InfernoWrapper extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.ref = (0, _inferno.createRef)();
  }
  render() {
    if (this.props.elementRef) {
      this.ref = this.props.elementRef;
    }
    return (0, _inferno.createVNode)(1, "div", null, null, 1, {
      "onKeyDown": this.props.onKeyDown
    }, null, this.ref);
  }
  getComponentOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _extends({}, this.context[_config_context.ConfigContext.id], this.props);
  }
  updateComponentRef() {
    if (this.props.componentRef) {
      // @ts-expect-error
      this.props.componentRef.current = this.component;
    }
  }
  updateComponentOptions(prevProps, props) {
    Object.keys(props).forEach(key => {
      if (props[key] !== prevProps[key]) {
        var _this$component;
        (_this$component = this.component) === null || _this$component === void 0 || _this$component.option(key, props[key]);
      }
    });
  }
  createComponent(ref, props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new (this.getComponentFabric())(ref.current, props);
  }
  componentDidMount() {
    this.component = this.createComponent(this.ref, this.getComponentOptions());
    this.updateComponentRef();
  }
  componentDidUpdate(prevProps) {
    this.updateComponentOptions(prevProps, this.getComponentOptions());
    this.updateComponentRef();
  }
  componentWillUnmount() {
    var _this$component2;
    (_this$component2 = this.component) === null || _this$component2 === void 0 || _this$component2.dispose();
  }
}
exports.InfernoWrapper = InfernoWrapper;
