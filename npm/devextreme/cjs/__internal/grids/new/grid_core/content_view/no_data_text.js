/**
* DevExtreme (cjs/__internal/grids/new/grid_core/content_view/no_data_text.js)
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
exports.NoDataText = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _icon = require("../icon");
const CLASSES = exports.CLASSES = {
  container: 'dx-gridcore-nodata-container',
  element: 'dx-gridcore-nodata-element',
  iconContainer: 'dx-gridcore-nodata-icon-container',
  text: 'dx-gridcore-nodata-text'
};
class NoDataText extends _inferno.Component {
  render() {
    const Template = this.props.template;
    return (0, _inferno.createVNode)(1, "div", CLASSES.container, Template ? (0, _inferno.createComponentVNode)(2, Template, {
      "text": this.props.text
    }) : (0, _inferno.createVNode)(1, "div", CLASSES.element, [(0, _inferno.createVNode)(1, "div", CLASSES.iconContainer, (0, _inferno.createComponentVNode)(2, _icon.Icon, {
      "name": 'cardcontent'
    }), 2), (0, _inferno.createVNode)(1, "div", CLASSES.text, this.props.text, 0)], 4), 0);
  }
}
exports.NoDataText = NoDataText;
