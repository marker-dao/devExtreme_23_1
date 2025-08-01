/**
* DevExtreme (cjs/__internal/core/m_inferno_renderer.js)
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
exports.infernoRenderer = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _element_data = require("../../core/element_data");
var _dependency_injector = _interopRequireDefault(require("../../core/utils/dependency_injector"));
var _index = require("../core/r1/runtime/inferno/index");
var _inferno = require("inferno");
var _infernoCreateElement = require("inferno-create-element");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

const remove = element => {
  const {
    parentNode
  } = element;
  if (parentNode) {
    const {
      nextSibling
    } = element;
    (0, _element_data.cleanDataRecursive)(element);
    parentNode.$V = element.$V;
    (0, _inferno.render)(null, parentNode);
    parentNode.insertBefore(element, nextSibling);
    element.innerHTML = '';
    delete parentNode.$V;
  }
  delete element.$V;
};
const infernoRenderer = exports.infernoRenderer = (0, _dependency_injector.default)({
  createElement: (component, props) => (0, _infernoCreateElement.createElement)(component, props),
  remove,
  onAfterRender: () => {
    _index.InfernoEffectHost.callEffects();
  },
  onPreRender: () => {
    _index.InfernoEffectHost.lock();
  },
  render: (component, props, container, replace) => {
    if (!replace) {
      const {
        parentNode
      } = container;
      const nextNode = container === null || container === void 0 ? void 0 : container.nextSibling;
      const rootNode = _dom_adapter.default.createElement('div');
      rootNode.appendChild(container);
      const mountNode = _dom_adapter.default.createDocumentFragment().appendChild(rootNode);
      const vNodeAlreadyExists = !!container.$V;
      vNodeAlreadyExists && remove(container);
      (0, _index.hydrate)((0, _infernoCreateElement.createElement)(component, props), mountNode);
      // @ts-expect-error need to change type to inferno element
      container.$V = mountNode.$V;
      if (parentNode) {
        parentNode.insertBefore(container, nextNode);
      }
    } else {
      (0, _inferno.render)((0, _infernoCreateElement.createElement)(component, props), container);
    }
  },
  renderIntoContainer: (jsx, container, replace) => {
    if (!replace) {
      (0, _index.hydrate)(jsx, container);
    } else {
      (0, _inferno.render)(jsx, container);
    }
  }
});
