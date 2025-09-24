"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;
var _inferno = require("inferno");
var _m_inferno_renderer = require("../../../../core/m_inferno_renderer");
var _base_component = require("../../../../core/r1/runtime/inferno/base_component");
var _index = require("../../../../core/state_manager/index");
var _m_window = require("../../../../core/utils/m_window");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-non-null-assertion */ /* eslint-disable @typescript-eslint/no-this-alias */ /* eslint-disable @typescript-eslint/explicit-function-return-type */ /* eslint-disable max-classes-per-file */
class View {
  constructor() {
    this.firstRender = true;
  }
  render(root) {
    this.root = root;
    const ViewComponent = this.component;
    const props = this.getProps();
    return (0, _index.effect)(() => {
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
    return class InfernoView extends _base_component.BaseInfernoComponent {
      constructor() {
        super();
        const props = view.getProps();
        this.unsubscribe = (0, _index.effect)(() => {
          view.props = props.value;
          this.state ?? (this.state = {
            props: props.value
          });
          if (this.state.props !== props.value && (0, _m_window.hasWindow)()) {
            this.setState({
              props: props.value
            });
          }
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const ViewComponent = view.component;
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, ViewComponent, _extends({}, this.state.props)));
      }
    };
  }
}
exports.View = View;