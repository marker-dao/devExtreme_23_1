/**
* DevExtreme (esm/__internal/core/utils/m_dom.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { each } from '../../../core/utils/iterator';
import { isDefined, isRenderer, isString, isWindow } from '../../../core/utils/type';
import { getWindow } from '../../../core/utils/window';
const window = getWindow();
const getRootNodeHost = element => {
  if (!element.getRootNode) {
    return undefined;
  }
  const {
    host
  } = element.getRootNode();
  // NOTE: getRootNode().host can return a string if element is detached "a" element
  if (isString(host)) {
    return undefined;
  }
  return host;
};
export const resetActiveElement = () => {
  const activeElement = domAdapter.getActiveElement();
  if (activeElement && activeElement !== domAdapter.getBody()) {
    var _activeElement$blur;
    (_activeElement$blur = activeElement.blur) === null || _activeElement$blur === void 0 || _activeElement$blur.call(activeElement);
  }
};
export const clearSelection = () => {
  const selection = window.getSelection();
  if (!selection) return;
  if (selection.type === 'Caret') return;
  if (selection.empty) {
    selection.empty();
  } else if (selection.removeAllRanges) {
    // T522811
    try {
      selection.removeAllRanges();
    } catch (e) {/* empty */}
  }
};
export const closestCommonParent = (startTarget, endTarget) => {
  const $startTarget = $(startTarget);
  const $endTarget = $(endTarget);
  if ($startTarget[0] === $endTarget[0]) {
    return $startTarget[0];
  }
  const $startParents = $startTarget.parents();
  const $endParents = $endTarget.parents();
  const startingParent = Math.min($startParents.length, $endParents.length);
  for (let i = -startingParent; i < 0; i++) {
    if ($startParents.get(i) === $endParents.get(i)) {
      return $startParents.get(i);
    }
  }
};
export const extractTemplateMarkup = element => {
  element = $(element);
  const templateTag = element.length && element.filter(function isNotExecutableScript() {
    const $node = $(this);
    // @ts-expect-error
    return $node.is('script[type]') && !$node.attr('type').includes('script');
  });
  if (templateTag.length) {
    return templateTag.eq(0).html();
  }
  element = $('<div>').append(element);
  return element.html();
};
export const normalizeTemplateElement = element => {
  let $element = $();
  if (isDefined(element) && (element.nodeType || isRenderer(element))) {
    $element = $(element);
  } else if (typeof element !== 'object') {
    $element = $('<div>').html(element).contents();
  }
  if ($element.length === 1) {
    if ($element.is('script')) {
      $element = normalizeTemplateElement($element.html().trim());
    } else if ($element.is('table')) {
      $element = $element.children('tbody').contents();
    }
  }
  return $element;
};
export const clipboardText = (event, text) => {
  // @ts-expect-error clipboardData doesn't exist in window type
  const clipboard = event.originalEvent && event.originalEvent.clipboardData || window.clipboardData;
  if (!text) {
    return clipboard && clipboard.getData('Text');
  }
  clipboard && clipboard.setData('Text', text);
};
export const contains = (container, element) => {
  if (!element) {
    return false;
  }
  if (isWindow(container)) {
    return contains(container.document, element);
  }
  return container.contains(element) || contains(container, getRootNodeHost(element));
};
export const createTextElementHiddenCopy = (element, text, options) => {
  const elementStyles = window.getComputedStyle($(element).get(0));
  const includePaddings = options && options.includePaddings;
  return $('<div>').text(text).css({
    fontStyle: elementStyles.fontStyle,
    fontVariant: elementStyles.fontVariant,
    fontWeight: elementStyles.fontWeight,
    fontSize: elementStyles.fontSize,
    fontFamily: elementStyles.fontFamily,
    letterSpacing: elementStyles.letterSpacing,
    border: elementStyles.border,
    paddingTop: includePaddings ? elementStyles.paddingTop : '',
    paddingRight: includePaddings ? elementStyles.paddingRight : '',
    paddingBottom: includePaddings ? elementStyles.paddingBottom : '',
    paddingLeft: includePaddings ? elementStyles.paddingLeft : '',
    visibility: 'hidden',
    whiteSpace: 'pre',
    position: 'absolute',
    float: 'left'
  });
};
export const insertBefore = (element, newElement) => {
  if (newElement) {
    domAdapter.insertElement(element.parentNode, newElement, element);
  }
  return element;
};
export const replaceWith = (element, newElement) => {
  if (!(newElement && newElement[0])) return;
  if (newElement.is(element)) return element;
  each(newElement, (_, currentElement) => {
    insertBefore(element[0], currentElement);
  });
  element.remove();
  return newElement;
};
export const isElementInDom = $element => {
  const element = $element === null || $element === void 0 ? void 0 : $element.get(0);
  const shadowHost = element === null || element === void 0 ? void 0 : element.getRootNode().host;
  return !!$(shadowHost || element).closest(getWindow().document).length;
};
export default {
  resetActiveElement,
  clearSelection,
  closestCommonParent,
  extractTemplateMarkup,
  normalizeTemplateElement,
  clipboardText,
  contains,
  createTextElementHiddenCopy,
  insertBefore,
  replaceWith,
  isElementInDom
};
