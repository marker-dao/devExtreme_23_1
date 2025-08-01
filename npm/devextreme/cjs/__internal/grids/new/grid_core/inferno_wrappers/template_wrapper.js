/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/template_wrapper.js)
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
exports.TemplateWrapper = TemplateWrapper;
var _inferno = require("inferno");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _base_component = require("../../../../core/r1/runtime/inferno/base_component");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function TemplateWrapper(template) {
  return class Template extends _base_component.BaseInfernoComponent {
    constructor() {
      super(...arguments);
      this.ref = (0, _inferno.createRef)();
    }
    renderTemplate() {
      (0, _renderer.default)(this.ref.current).empty();
      template.render({
        container: (0, _renderer.default)(this.ref.current),
        model: this.props
      });
    }
    render() {
      return (0, _inferno.createVNode)(1, "div", null, null, 1, null, null, this.ref);
    }
    componentDidUpdate() {
      this.renderTemplate();
    }
    componentDidMount() {
      this.renderTemplate();
    }
  };
}
