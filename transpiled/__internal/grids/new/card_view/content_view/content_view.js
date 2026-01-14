"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentView = void 0;
var _inferno = require("inferno");
var _content_view = require("../../../../grids/new/grid_core/content_view/content_view");
var _content = require("./content/content");
class ContentView extends _inferno.Component {
  render() {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _content_view.ContentView, Object.assign({}, this.props, {
      children: (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _content.Content, Object.assign({}, this.props.contentProps)))
    })));
  }
}
exports.ContentView = ContentView;