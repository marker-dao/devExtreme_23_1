/**
* DevExtreme (esm/integration/knockout/template.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import domAdapter from '../../core/dom_adapter';
// eslint-disable-next-line no-restricted-imports
import ko from 'knockout';
import { isDefined } from '../../core/utils/type';
import { TemplateBase } from '../../core/templates/template_base';
import { normalizeTemplateElement } from '../../core/utils/dom';
import { getClosestNodeWithContext } from './utils';
const getParentContext = function (data) {
  const parentNode = domAdapter.createElement('div');
  ko.applyBindingsToNode(parentNode, null, data);
  const parentContext = ko.contextFor(parentNode);
  ko.cleanNode(parentNode);
  return parentContext;
};
export const KoTemplate = class extends TemplateBase {
  constructor(element) {
    super();
    this._element = element;
    this._template = $('<div>').append(normalizeTemplateElement(element));
    this._registerKoTemplate();
  }
  _registerKoTemplate() {
    const template = this._template.get(0);
    new ko.templateSources.anonymousTemplate(template)['nodes'](template);
  }
  _prepareDataForContainer(data, container) {
    if (container && container.length) {
      const node = getClosestNodeWithContext(container.get(0));
      const containerContext = ko.contextFor(node);
      data = data !== undefined ? data : ko.dataFor(node) || {};
      if (containerContext) {
        return data === containerContext.$data ? containerContext : containerContext.createChildContext(data);
      }
    }

    // workaround for https://github.com/knockout/knockout/pull/651
    return getParentContext(data).createChildContext(data);
  }
  _renderCore(options) {
    const model = this._prepareDataForContainer(options.model, $(options.container));
    if (isDefined(options.index)) {
      model.$index = options.index;
    }
    const $placeholder = $('<div>').appendTo(options.container);
    let $result;
    ko.renderTemplate(this._template.get(0), model, {
      afterRender: function (nodes) {
        $result = $(nodes);
      }
    }, $placeholder.get(0), 'replaceNode');
    return $result;
  }
  source() {
    return $(this._element).clone();
  }
  dispose() {
    this._template.remove();
  }
};
