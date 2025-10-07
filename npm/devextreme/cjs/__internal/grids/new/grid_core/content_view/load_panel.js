/**
* DevExtreme (cjs/__internal/grids/new/grid_core/content_view/load_panel.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadPanel = void 0;
var _inferno = require("inferno");
var _window = require("../../../../../core/utils/window");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _common_props_context = require("../core/common_props_context");
var _load_panel = require("../inferno_wrappers/load_panel");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class LoadPanel extends _index.BaseInfernoComponent {
  calculatePosition(rootElement) {
    const window = (0, _window.getWindow)();
    if (rootElement.offsetHeight > window.innerHeight) {
      return {
        of: window,
        boundary: rootElement,
        collision: 'fit'
      };
    }
    return {
      of: rootElement
    };
  }
  render() {
    const {
      rootElementRef
    } = this.context[_common_props_context.CommonPropsContext.id];
    const loadPanelProperties = _extends({
      container: rootElementRef.current,
      position: this.calculatePosition(rootElementRef.current)
    }, this.props);
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _load_panel.LoadPanel, _extends({}, loadPanelProperties)));
  }
}
exports.LoadPanel = LoadPanel;
