"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A11yStatusContainer = void 0;
var _inferno = require("inferno");
var _const = require("../const");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CLASSES = _extends({}, _const.CLASSES, {
  container: 'dx-gridbase-a11y-status-container'
});
class A11yStatusContainer extends _inferno.Component {
  render() {
    return (0, _inferno.createVNode)(1, "div", `${CLASSES.container} ${CLASSES.excludeFlexBox}`, this.props.statusText ?? '', 0, {
      "role": 'status'
    });
  }
}
exports.A11yStatusContainer = A11yStatusContainer;