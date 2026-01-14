/**
* DevExtreme (cjs/__internal/integration/knockout/template.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoTemplate = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_dom_adapter = require("../../core/m_dom_adapter");
var _m_template_base = require("../../core/templates/m_template_base");
var _m_dom = require("../../core/utils/m_dom");
var _m_type = require("../../core/utils/m_type");
var _knockout = _interopRequireDefault(require("knockout"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getParentContext = function (data) {
  const parentNode = _m_dom_adapter.domAdapter.createElement('div');
  // @ts-expect-error
  _knockout.default.applyBindingsToNode(parentNode, null, data);
  const parentContext = _knockout.default.contextFor(parentNode);
  _knockout.default.cleanNode(parentNode);
  return parentContext;
};
const KoTemplate = class extends _m_template_base.TemplateBase {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(element) {
    super();
    this._element = element;
    this._template = (0, _renderer.default)('<div>').append((0, _m_dom.normalizeTemplateElement)(element));
    this._registerKoTemplate();
  }
  _registerKoTemplate() {
    const template = this._template.get(0);
    // eslint-disable-next-line new-cap
    new _knockout.default.templateSources.anonymousTemplate(template).nodes(template);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _prepareDataForContainer(data, container) {
    if (container !== null && container !== void 0 && container.length) {
      const node = (0, _utils.getClosestNodeWithContext)(container.get(0));
      const containerContext = _knockout.default.contextFor(node);
      // eslint-disable-next-line no-param-reassign
      data = data !== undefined ? data : _knockout.default.dataFor(node) || {};
      if (containerContext) {
        return data === containerContext.$data ? containerContext : containerContext.createChildContext(data);
      }
    }
    // workaround for https://github.com/knockout/knockout/pull/651
    return getParentContext(data).createChildContext(data);
  }
  // @ts-expect-error
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _renderCore(options) {
    const model = this._prepareDataForContainer(options.model, (0, _renderer.default)(options.container));
    if ((0, _m_type.isDefined)(options.index)) {
      model.$index = options.index;
    }
    const $placeholder = (0, _renderer.default)('<div>').appendTo(options.container);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let $result;
    _knockout.default.renderTemplate(this._template.get(0), model, {
      afterRender(nodes) {
        // @ts-expect-error
        $result = (0, _renderer.default)(nodes);
      }
    }, $placeholder.get(0), 'replaceNode');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return $result;
  }
  source() {
    return (0, _renderer.default)(this._element).clone();
  }
  dispose() {
    this._template.remove();
  }
};
exports.KoTemplate = KoTemplate;
