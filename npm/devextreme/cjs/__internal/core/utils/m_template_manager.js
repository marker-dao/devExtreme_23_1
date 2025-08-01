/**
* DevExtreme (cjs/__internal/core/utils/m_template_manager.js)
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
exports.validateTemplateSource = exports.templateKey = exports.suitableTemplatesByName = exports.getNormalizedTemplateArgs = exports.findTemplates = exports.defaultCreateElement = exports.default = exports.addPublicElementNormalization = exports.addOneRenderedCall = exports.acquireTemplate = exports.acquireIntegrationTemplate = void 0;
var _config = _interopRequireDefault(require("../../../core/config"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _element = require("../../../core/element");
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _child_default_template = require("../../../core/templates/child_default_template");
var _empty_template = require("../../../core/templates/empty_template");
var _template = require("../../../core/templates/template");
var _template_base = require("../../../core/templates/template_base");
var _array = require("../../../core/utils/array");
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _m_dom = _interopRequireDefault(require("./m_dom"));
var _m_type = _interopRequireDefault(require("./m_type"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const findTemplates = (element, name) => {
  const optionsAttributeName = 'data-options';
  const templates = (0, _renderer.default)(element).contents().filter(`[${optionsAttributeName}*="${name}"]`);
  return [].slice.call(templates).map(element => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const optionsString = (0, _renderer.default)(element).attr(optionsAttributeName) || '';
    return {
      element,
      // @ts-expect-error optionsParser do not exist in public type
      options: (0, _config.default)().optionsParser(optionsString)[name]
    };
  }).filter(template => !!template.options);
};
exports.findTemplates = findTemplates;
const suitableTemplatesByName = rawTemplates => {
  const templatesMap = (0, _array.groupBy)(rawTemplates, template => template.options.name);
  if (templatesMap.undefined) {
    throw _errors.default.Error('E0023');
  }
  const result = {};
  Object.keys(templatesMap).forEach(name => {
    var _findBestMatches$;
    const suitableTemplate = (_findBestMatches$ = (0, _common.findBestMatches)(_devices.default.current(), templatesMap[name], template => template.options)[0]) === null || _findBestMatches$ === void 0 ? void 0 : _findBestMatches$.element;
    if (suitableTemplate) {
      result[name] = suitableTemplate;
    }
  });
  return result;
};
exports.suitableTemplatesByName = suitableTemplatesByName;
const addOneRenderedCall = template => {
  const render = template.render.bind(template);
  return (0, _extend.extend)({}, template, {
    render(options) {
      const templateResult = render(options);
      options && options.onRendered && options.onRendered();
      return templateResult;
    }
  });
};
exports.addOneRenderedCall = addOneRenderedCall;
const addPublicElementNormalization = template => {
  const render = template.render.bind(template);
  return (0, _extend.extend)({}, template, {
    render(options) {
      const $container = (0, _renderer.default)(options.container);
      return render(_extends({}, options, {
        container: (0, _element.getPublicElement)($container)
      }));
    }
  });
};
exports.addPublicElementNormalization = addPublicElementNormalization;
const getNormalizedTemplateArgs = options => {
  const args = [];
  if ('model' in options) {
    args.push(options.model);
  }
  if ('index' in options) {
    args.push(options.index);
  }
  args.push(options.container);
  return args;
};
exports.getNormalizedTemplateArgs = getNormalizedTemplateArgs;
const validateTemplateSource = templateSource => typeof templateSource === 'string' ? _m_dom.default.normalizeTemplateElement(templateSource) : templateSource;
exports.validateTemplateSource = validateTemplateSource;
const templateKey = templateSource => _m_type.default.isRenderer(templateSource) && templateSource[0] || templateSource;
exports.templateKey = templateKey;
const defaultCreateElement = element => new _template.Template(element);
exports.defaultCreateElement = defaultCreateElement;
const acquireIntegrationTemplate = (templateSource, templates, isAsyncTemplate, skipTemplates) => {
  let integrationTemplate = null;
  if (!skipTemplates || skipTemplates.indexOf(templateSource) === -1) {
    integrationTemplate = templates[templateSource];
    if (integrationTemplate && !(integrationTemplate instanceof _template_base.TemplateBase)) {
      if (_m_type.default.isFunction(integrationTemplate.render)) {
        integrationTemplate = addPublicElementNormalization(integrationTemplate);
      }
      if (!isAsyncTemplate) {
        integrationTemplate = addOneRenderedCall(integrationTemplate);
      }
    }
  }
  return integrationTemplate;
};
exports.acquireIntegrationTemplate = acquireIntegrationTemplate;
const acquireTemplate = (templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) => {
  if (templateSource == null) {
    return new _empty_template.EmptyTemplate();
  }
  if (templateSource instanceof _child_default_template.ChildDefaultTemplate) {
    return defaultTemplates[templateSource.name];
  }
  if (templateSource instanceof _template_base.TemplateBase) {
    return templateSource;
  }
  // TODO: templateSource.render is needed for angular2 integration. Try to remove it after supporting TypeScript modules.
  if (_m_type.default.isFunction(templateSource.render) && !_m_type.default.isRenderer(templateSource)) {
    return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource);
  }
  if (templateSource.nodeType || _m_type.default.isRenderer(templateSource)) {
    return createTemplate((0, _renderer.default)(templateSource));
  }
  return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource);
};
exports.acquireTemplate = acquireTemplate;
var _default = exports.default = {
  findTemplates,
  suitableTemplatesByName,
  addOneRenderedCall,
  addPublicElementNormalization,
  getNormalizedTemplateArgs,
  validateTemplateSource,
  templateKey,
  defaultCreateElement,
  acquireIntegrationTemplate,
  acquireTemplate
};
