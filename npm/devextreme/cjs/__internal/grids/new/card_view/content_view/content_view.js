/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content_view.js)
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
exports.ContentView = void 0;
var _inferno = require("inferno");
var _content_view = require("../../../../grids/new/grid_core/content_view/content_view");
var _content = require("./content/content");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class ContentView extends _inferno.Component {
  render() {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _content_view.ContentView, _extends({}, this.props, {
      children: (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _content.Content, _extends({}, this.props.contentProps)))
    })));
  }
}
exports.ContentView = ContentView;
