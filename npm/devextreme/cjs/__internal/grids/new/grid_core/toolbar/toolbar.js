/**
* DevExtreme (cjs/__internal/grids/new/grid_core/toolbar/toolbar.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarView = void 0;
var _inferno = require("inferno");
var _events = require("../../../../../common/core/events");
var _index = require("../../../../grids/new/grid_core/keyboard_navigation/index");
var _toolbar = require("../inferno_wrappers/toolbar");
/* eslint-disable
  @typescript-eslint/no-non-null-assertion,
  spellcheck/spell-checker
*/

const ToolbarComponent = (0, _index.withKeyDownHandler)(_toolbar.Toolbar);
class ToolbarView extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.containerRef = (0, _inferno.createRef)();
    this.onContextMenu = event => {
      var _this$props$showConte, _this$props;
      (_this$props$showConte = (_this$props = this.props).showContextMenu) === null || _this$props$showConte === void 0 || _this$props$showConte.call(_this$props, event);
    };
  }
  componentDidMount() {
    (0, _events.on)(this.containerRef.current, 'dxcontextmenu', this.onContextMenu);
  }
  componentWillUnmount() {
    (0, _events.off)(this.containerRef.current, 'dxcontextmenu', this.onContextMenu);
  }
  render() {
    const {
      visible,
      items,
      disabled,
      multiline
    } = this.props;
    if (!visible) {
      return (0, _inferno.createFragment)();
    }
    return (0, _inferno.createComponentVNode)(2, ToolbarComponent, {
      "elementRef": this.containerRef,
      "visible": visible,
      "items": items,
      "disabled": disabled,
      "multiline": multiline,
      "keyDownConfig": {
        'F10+shift': event => {
          var _this$props$showConte2, _this$props2;
          (_this$props$showConte2 = (_this$props2 = this.props).showContextMenu) === null || _this$props$showConte2 === void 0 || _this$props$showConte2.call(_this$props2, event);
        }
      }
    });
  }
}
exports.ToolbarView = ToolbarView;
