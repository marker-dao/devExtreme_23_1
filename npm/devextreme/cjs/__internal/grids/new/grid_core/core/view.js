/**
* DevExtreme (cjs/__internal/grids/new/grid_core/core/view.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;
var _inferno = require("inferno");
var _signalsCore = require("@preact/signals-core");
var _m_inferno_renderer = require("../../../../core/m_inferno_renderer");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-non-null-assertion */ /* eslint-disable @typescript-eslint/no-this-alias */ /* eslint-disable @typescript-eslint/explicit-function-return-type */ /* eslint-disable max-classes-per-file */
class View {
  constructor() {
    this.firstRender = true;
  }
  render(root) {
    this.root = root;
    const ViewComponent = this.component;
    const props = this.getProps();
    return (0, _signalsCore.effect)(() => {
      this.props = props.value;
      const content = (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, ViewComponent, _extends({}, props.value)));
      _m_inferno_renderer.infernoRenderer.renderIntoContainer(content, root, !this.firstRender);
      this.firstRender = false;
    });
  }
  asInferno() {
    // eslint-disable-next-line no-return-assign
    return this.inferno ?? (this.inferno = this._asInferno());
  }
  _asInferno() {
    const view = this;
    return class InfernoView extends _inferno.Component {
      constructor() {
        super();
        const props = view.getProps();
        this.subscription = (0, _signalsCore.effect)(() => {
          view.props = props.value;
          this.state ?? (this.state = {
            props: props.value
          });
          if (this.state.props !== props.value) {
            this.setState({
              props: props.value
            });
          }
        });
      }
      render() {
        const ViewComponent = view.component;
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, ViewComponent, _extends({}, this.state.props)));
      }
    };
  }
}
exports.View = View;
