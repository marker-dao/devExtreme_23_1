/**
* DevExtreme (cjs/__internal/grids/new/grid_core/icon.js)
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
exports.Icon = Icon;
var _inferno = require("inferno");
var _combine_classes = require("../../../core/utils/combine_classes");
function Icon(props) {
  const classes = (0, _combine_classes.combineClasses)({
    'dx-icon': true,
    [`dx-icon-${props.name}`]: true,
    [String(props.className)]: !!props.className
  });
  return (0, _inferno.createVNode)(1, "div", classes, null, 1, {
    "aria-label": props['aria-label'],
    "role": props['aria-label'] ? 'img' : undefined,
    "onClick": props.onClick
  });
}
