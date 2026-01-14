"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A11yStatusContainer = void 0;
var _inferno = require("inferno");
var _const = require("../const");
const CLASSES = Object.assign({}, _const.CLASSES, {
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