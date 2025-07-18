/**
* DevExtreme (esm/__internal/grids/new/grid_core/accessibility/status.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode } from "inferno";
import { Component } from 'inferno';
import { CLASSES as BASE_CLASSES } from '../const';
const CLASSES = _extends({}, BASE_CLASSES, {
  container: 'dx-gridbase-a11y-status-container'
});
export class A11yStatusContainer extends Component {
  render() {
    return createVNode(1, "div", `${CLASSES.container} ${CLASSES.excludeFlexBox}`, this.props.statusText ?? '', 0, {
      "role": 'status'
    });
  }
}
