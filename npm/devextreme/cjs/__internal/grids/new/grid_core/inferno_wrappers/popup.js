/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/popup.js)
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
exports.Popup = void 0;
var _inferno = require("inferno");
var _popup = _interopRequireDefault(require("../../../../../ui/popup"));
var _utils = require("./utils");
var _widget_wrapper = require("./widget_wrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class Popup extends _widget_wrapper.InfernoWrapper {
  constructor() {
    super(...arguments);
    this.contentRef = {};
  }
  render() {
    return (0, _inferno.createFragment)([super.render(), this.contentRef.current && (0, _inferno.createPortal)(this.props.children, this.contentRef.current)], 0);
  }
  transformRef(props) {
    var _props;
    // @ts-expect-error
    if ((_props = props) !== null && _props !== void 0 && (_props = _props.position) !== null && _props !== void 0 && (_props = _props.of) !== null && _props !== void 0 && _props.current) {
      // eslint-disable-next-line no-param-reassign
      props = _extends({}, props, {
        position: _extends({}, props.position, {
          // @ts-expect-error
          of: (0, _utils.wrapRef)(props.position.of)
        })
      });
    }
    return props;
  }
  createComponent(ref, props) {
    return super.createComponent(ref, this.transformRef(props));
  }
  updateComponentOptions(prevProps, props) {
    super.updateComponentOptions(prevProps, this.transformRef(props));
  }
  getComponentFabric() {
    return _popup.default;
  }
  componentDidMount() {
    super.componentDidMount();
    // @ts-expect-error
    this.contentRef.current = this.component.$content().get(0);
    this.setState({});
  }
}
exports.Popup = Popup;
