/**
* DevExtreme (esm/__internal/core/m_dom_adapter.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* global document */
import { noop } from '../../core/utils/common';
import injector from '../../core/utils/dependency_injector';
import { getShadowElementsFromPoint } from '../../core/utils/shadow_dom';
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;
const nativeDOMAdapterStrategy = {
  querySelectorAll(element, selector) {
    return element.querySelectorAll(selector);
  },
  elementMatches(element, selector) {
    const matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector
    // @ts-expect-error not all code paths return value
    || (selector => {
      const doc = element.document || element.ownerDocument;
      if (!doc) {
        return false;
      }
      const items = this.querySelectorAll(doc, selector);
      for (let i = 0; i < items.length; i++) {
        if (items[i] === element) {
          return true;
        }
      }
    });
    return matches.call(element, selector);
  },
  createElement(tagName, context) {
    context = context ?? this._document;
    return context.createElement(tagName);
  },
  createElementNS(ns, tagName, context) {
    context = context || this._document;
    return context.createElementNS(ns, tagName);
  },
  createTextNode(text, context) {
    context = context || this._document;
    return context.createTextNode(text);
  },
  createAttribute(text, context) {
    context = context || this._document;
    return context.createAttribute(text);
  },
  isNode(element) {
    return !!element && typeof element === 'object' && 'nodeType' in element && 'nodeName' in element;
  },
  isElementNode(element) {
    return !!element && element.nodeType === ELEMENT_NODE;
  },
  isTextNode(element) {
    return element && element.nodeType === TEXT_NODE;
  },
  isDocument(element) {
    return element && element.nodeType === DOCUMENT_NODE;
  },
  isDocumentFragment(element) {
    return element && element.nodeType === DOCUMENT_FRAGMENT_NODE;
  },
  removeElement(element) {
    const parentNode = element && element.parentNode;
    if (parentNode) {
      parentNode.removeChild(element);
    }
  },
  insertElement(parentElement, newElement, nextSiblingElement) {
    if (parentElement && newElement && parentElement !== newElement) {
      if (nextSiblingElement) {
        parentElement.insertBefore(newElement, nextSiblingElement);
      } else {
        parentElement.appendChild(newElement);
      }
    }
  },
  getAttribute(element, name) {
    return element.getAttribute(name);
  },
  setAttribute(element, name, value) {
    if (name === 'style') {
      element.style.cssText = value;
    } else {
      element.setAttribute(name, value);
    }
  },
  removeAttribute(element, name) {
    element.removeAttribute(name);
  },
  setProperty(element, name, value) {
    element[name] = value;
  },
  setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  },
  setClass(element, className, isAdd) {
    if (element.nodeType === 1 && className) {
      isAdd ? element.classList.add(className) : element.classList.remove(className);
    }
  },
  setStyle(element, name, value) {
    element.style[name] = value || '';
  },
  _document: typeof document === 'undefined' ? undefined : document,
  getDocument() {
    return this._document;
  },
  getActiveElement(element) {
    const activeElementHolder = this.getRootNode(element);
    return activeElementHolder.activeElement;
  },
  // @ts-expect-error return type is not assignable
  getRootNode(element) {
    var _element$getRootNode;
    return (element === null || element === void 0 || (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element)) ?? this._document;
  },
  getBody() {
    return this._document.body;
  },
  createDocumentFragment() {
    return this._document.createDocumentFragment();
  },
  getDocumentElement() {
    return this._document.documentElement;
  },
  getLocation() {
    return this._document.location;
  },
  getSelection() {
    return this._document.selection;
  },
  getReadyState() {
    return this._document.readyState;
  },
  getHead() {
    return this._document.head;
  },
  hasDocumentProperty(property) {
    return property in this._document;
  },
  listen(element, event, callback, options) {
    if (!element || !('addEventListener' in element)) {
      return noop;
    }
    element.addEventListener(event, callback, options);
    return () => {
      element.removeEventListener(event, callback);
    };
  },
  elementsFromPoint(x, y, element) {
    const activeElementHolder = this.getRootNode(element);
    if (activeElementHolder.host) {
      return getShadowElementsFromPoint(x, y, activeElementHolder);
    }
    return activeElementHolder.elementsFromPoint(x, y);
  }
};
const domAdapter = injector(nativeDOMAdapterStrategy);
export { domAdapter };
export default domAdapter;
