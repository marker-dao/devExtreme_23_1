/**
* DevExtreme (cjs/__internal/ui/button/ink_ripple.js)
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
exports.defaultInkRippleProps = exports.InkRipple = void 0;
var _inferno = require("inferno");
var _utils = require("../../../ui/widget/utils.ink_ripple");
var _index = require("../../core/r1/runtime/inferno/index");
const _excluded = ["config"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const defaultInkRippleProps = exports.defaultInkRippleProps = {
  config: {}
};
class InkRipple extends _index.BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.__getterCache = {};
    this.state = {};
    this.hideWave = this.hideWave.bind(this);
    this.showWave = this.showWave.bind(this);
  }
  get getConfig() {
    if (this.__getterCache.getConfig === undefined) {
      this.__getterCache.getConfig = (0, _utils.initConfig)(this.props.config);
    }
    return this.__getterCache.getConfig;
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideWave(opts) {
    (0, _utils.hideWave)(this.getConfig, opts);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  showWave(opts) {
    (0, _utils.showWave)(this.getConfig, opts);
  }
  componentWillUpdate(nextProps) {
    if (this.props.config !== nextProps.config) {
      this.__getterCache.getConfig = undefined;
    }
  }
  render() {
    return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", "dx-inkripple", null, 1, _extends({}, this.restAttributes)));
  }
}
exports.InkRipple = InkRipple;
InkRipple.defaultProps = defaultInkRippleProps;
