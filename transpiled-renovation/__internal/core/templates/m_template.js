"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Template = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _template_base = require("../../../core/templates/template_base");
var _template_engine_registry = require("../../../core/templates/template_engine_registry");
var _dom = require("../../../core/utils/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _template_engine_registry.registerTemplateEngine)('default', {
  compile: element => (0, _dom.normalizeTemplateElement)(element),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (template, model, index) => template.clone()
});
(0, _template_engine_registry.setTemplateEngine)('default');
class Template extends _template_base.TemplateBase {
  constructor(element) {
    super();
    this._element = element;
  }
  // @ts-expect-error need type overload
  _renderCore(options) {
    const {
      transclude
    } = options;
    if (!transclude && !this._compiledTemplate) {
      this._compiledTemplate = (0, _template_engine_registry.getCurrentTemplateEngine)().compile(this._element);
    }
    return (0, _renderer.default)('<div>').append(transclude ? this._element : (0, _template_engine_registry.getCurrentTemplateEngine)().render(this._compiledTemplate, options.model, options.index)).contents();
  }
  source() {
    return (0, _renderer.default)(this._element).clone();
  }
}
exports.Template = Template;