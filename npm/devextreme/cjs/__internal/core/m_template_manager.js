/**
* DevExtreme (cjs/__internal/core/m_template_manager.js)
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
exports.default = exports.TemplateManager = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _empty_template = require("../../core/templates/empty_template");
var _function_template = require("../../core/templates/function_template");
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _template_manager = require("../../core/utils/template_manager");
var _type = require("../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TEXT_NODE = 3;
const ANONYMOUS_TEMPLATE_NAME = 'template';
const TEMPLATE_OPTIONS_NAME = 'dxTemplate';
const TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
// @ts-expect-error need to add overloaded constructor type to templates
const DX_POLYMORPH_WIDGET_TEMPLATE = new _function_template.FunctionTemplate(_ref => {
  let {
    model,
    parent
  } = _ref;
  const widgetName = model.widget;
  if (!widgetName) return (0, _renderer.default)();
  const widgetElement = (0, _renderer.default)('<div>');
  const widgetOptions = model.options || {};
  if (parent) {
    parent._createComponent(widgetElement, widgetName, widgetOptions);
  } else {
    widgetElement[widgetName](widgetOptions);
  }
  return widgetElement;
});
class TemplateManager {
  constructor(createElement, anonymousTemplateName) {
    this._tempTemplates = [];
    this._defaultTemplates = {};
    this._anonymousTemplateName = anonymousTemplateName || ANONYMOUS_TEMPLATE_NAME;
    this._createElement = createElement || _template_manager.defaultCreateElement;
    this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this);
  }
  static createDefaultOptions() {
    return {
      integrationOptions: {
        watchMethod: function (fn, callback) {
          let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (!options.skipImmediate) {
            callback(fn());
          }
          return _common.noop;
        },
        templates: {
          'dx-polymorph-widget': DX_POLYMORPH_WIDGET_TEMPLATE
        },
        useDeferUpdateForTemplates: true
      }
    };
  }
  get anonymousTemplateName() {
    return this._anonymousTemplateName;
  }
  addDefaultTemplates(templates) {
    this._defaultTemplates = (0, _extend.extend)({}, this._defaultTemplates, templates);
  }
  dispose() {
    this._tempTemplates.forEach(tempTemplate => {
      tempTemplate.template.dispose && tempTemplate.template.dispose();
    });
    this._tempTemplates = [];
  }
  extractTemplates($el) {
    const templates = this._extractTemplates($el);
    const anonymousTemplateMeta = this._extractAnonymousTemplate($el);
    return {
      templates,
      anonymousTemplateMeta
    };
  }
  _extractTemplates($el) {
    const templates = (0, _template_manager.findTemplates)($el, TEMPLATE_OPTIONS_NAME);
    const suitableTemplates = (0, _template_manager.suitableTemplatesByName)(templates);
    templates.forEach(_ref2 => {
      let {
        element,
        options: {
          name
        }
      } = _ref2;
      if (element === suitableTemplates[name]) {
        (0, _renderer.default)(element).addClass(TEMPLATE_WRAPPER_CLASS).detach();
      } else {
        (0, _renderer.default)(element).remove();
      }
    });
    return Object.keys(suitableTemplates).map(name => ({
      name,
      template: this._createTemplate(suitableTemplates[name])
    }));
  }
  _extractAnonymousTemplate($el) {
    const $anonymousTemplate = $el.contents().detach();
    const $notJunkTemplateContent = $anonymousTemplate.filter((_, element) => {
      const isTextNode = element.nodeType === TEXT_NODE;
      const isEmptyText = (0, _renderer.default)(element).text().trim().length < 1;
      return !(isTextNode && isEmptyText);
    });
    return $notJunkTemplateContent.length > 0 ? {
      template: this._createTemplate($anonymousTemplate),
      name: this._anonymousTemplateName
    } : {};
  }
  _createTemplateIfNeeded(templateSource) {
    const cachedTemplate = this._tempTemplates.filter(tempTemplate => tempTemplate.source === (0, _template_manager.templateKey)(templateSource))[0];
    if (cachedTemplate) return cachedTemplate.template;
    const template = this._createTemplate(templateSource);
    this._tempTemplates.push({
      template,
      source: (0, _template_manager.templateKey)(templateSource)
    });
    return template;
  }
  _createTemplate(templateSource) {
    return this._createElement((0, _template_manager.validateTemplateSource)(templateSource));
  }
  getTemplate(templateSource, templates, _ref3, context) {
    let {
      isAsyncTemplate,
      skipTemplates
    } = _ref3;
    if (!(0, _type.isFunction)(templateSource)) {
      return (0, _template_manager.acquireTemplate)(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
    }
    // @ts-expect-error need to add overloaded constructor type to templates
    return new _function_template.FunctionTemplate(options => {
      const templateSourceResult = templateSource.apply(context, (0, _template_manager.getNormalizedTemplateArgs)(options));
      if (!(0, _type.isDefined)(templateSourceResult)) {
        return new _empty_template.EmptyTemplate();
      }
      let dispose = false;
      const template = (0, _template_manager.acquireTemplate)(templateSourceResult, templateSource => {
        if (templateSource.nodeType || (0, _type.isRenderer)(templateSource) && !(0, _renderer.default)(templateSource).is('script')) {
          // @ts-expect-error need to add overloaded constructor type to templates
          return new _function_template.FunctionTemplate(() => templateSource);
        }
        dispose = true;
        return this._createTemplate(templateSource);
      }, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
      const result = template.render(options);
      dispose && template.dispose && template.dispose();
      return result;
    });
  }
}
exports.TemplateManager = TemplateManager;
var _default = exports.default = {
  TemplateManager
};
