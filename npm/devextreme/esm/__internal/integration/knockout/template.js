/**
* DevExtreme (esm/__internal/integration/knockout/template.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { domAdapter } from '../../core/m_dom_adapter';
import { TemplateBase } from '../../core/templates/m_template_base';
import { normalizeTemplateElement } from '../../core/utils/m_dom';
import { isDefined } from '../../core/utils/m_type';
// eslint-disable-next-line import/no-extraneous-dependencies
import ko from 'knockout';
import { getClosestNodeWithContext } from './utils';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getParentContext = function (data) {
  const parentNode = domAdapter.createElement('div');
  // @ts-expect-error
  ko.applyBindingsToNode(parentNode, null, data);
  const parentContext = ko.contextFor(parentNode);
  ko.cleanNode(parentNode);
  return parentContext;
};
export const KoTemplate = class extends TemplateBase {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(element) {
    super();
    this._element = element;
    this._template = $('<div>').append(normalizeTemplateElement(element));
    this._registerKoTemplate();
  }
  _registerKoTemplate() {
    const template = this._template.get(0);
    // eslint-disable-next-line new-cap
    new ko.templateSources.anonymousTemplate(template).nodes(template);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _prepareDataForContainer(data, container) {
    if (container !== null && container !== void 0 && container.length) {
      const node = getClosestNodeWithContext(container.get(0));
      const containerContext = ko.contextFor(node);
      // eslint-disable-next-line no-param-reassign
      data = data !== undefined ? data : ko.dataFor(node) || {};
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
    const model = this._prepareDataForContainer(options.model, $(options.container));
    if (isDefined(options.index)) {
      model.$index = options.index;
    }
    const $placeholder = $('<div>').appendTo(options.container);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let $result;
    ko.renderTemplate(this._template.get(0), model, {
      afterRender(nodes) {
        // @ts-expect-error
        $result = $(nodes);
      }
    }, $placeholder.get(0), 'replaceNode');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return $result;
  }
  source() {
    return $(this._element).clone();
  }
  dispose() {
    this._template.remove();
  }
};
