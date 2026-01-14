/**
* DevExtreme (esm/__internal/core/utils/m_shadow_dom.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../../../core/config';
const DX_RULE_PREFIX = 'dx-';
let ownerDocumentStyleSheet = null;
function createConstructedStyleSheet(rootNode) {
  try {
    return new CSSStyleSheet();
  } catch (err) {
    const styleElement = rootNode.ownerDocument.createElement('style');
    rootNode.appendChild(styleElement);
    return styleElement.sheet;
  }
}
function processRules(targetStyleSheet, styleSheets, needApplyAllStyles) {
  for (let i = 0; i < styleSheets.length; i++) {
    const sheet = styleSheets[i];
    try {
      for (let j = 0; j < sheet.cssRules.length; j++) {
        insertRule(targetStyleSheet, sheet.cssRules[j], needApplyAllStyles);
      }
    } catch (err) {
      // NOTE: need try/catch block for not-supported cross-domain css
    }
  }
}
function insertRule(targetStyleSheet, rule, needApplyAllStyles) {
  var _rule$selectorText, _rule$cssRules, _rule$name, _rule$style;
  const isDxRule = needApplyAllStyles || ((_rule$selectorText = rule.selectorText) === null || _rule$selectorText === void 0 ? void 0 : _rule$selectorText.includes(DX_RULE_PREFIX)) || ((_rule$cssRules = rule.cssRules) === null || _rule$cssRules === void 0 || (_rule$cssRules = _rule$cssRules[0]) === null || _rule$cssRules === void 0 || (_rule$cssRules = _rule$cssRules.selectorText) === null || _rule$cssRules === void 0 ? void 0 : _rule$cssRules.includes(DX_RULE_PREFIX)) || ((_rule$name = rule.name) === null || _rule$name === void 0 ? void 0 : _rule$name.startsWith(DX_RULE_PREFIX)) || ((_rule$style = rule.style) === null || _rule$style === void 0 ? void 0 : _rule$style.fontFamily) === 'DXIcons';
  if (isDxRule) {
    targetStyleSheet.insertRule(rule.cssText, targetStyleSheet.cssRules.length);
  }
}
const FNV_OFFSET_BASIS = 2166136261;
const sheetHashes = new WeakMap();
export function computeStyleSheetsHash(styleSheets) {
  let hash = FNV_OFFSET_BASIS;
  for (const sheet of styleSheets) {
    if (sheetHashes.has(sheet)) {
      hash ^= sheetHashes.get(sheet);
      continue;
    }
    let localHash = FNV_OFFSET_BASIS;
    try {
      for (const rule of sheet.cssRules) {
        const text = rule.cssText;
        for (let i = 0; i < text.length; i++) {
          localHash ^= text.charCodeAt(i);
          localHash += (localHash << 1) + (localHash << 4) + (localHash << 7) + (localHash << 8) + (localHash << 24);
        }
      }
    } catch (_) {
      // ignore
    }
    localHash >>>= 0;
    sheetHashes.set(sheet, localHash);
    hash ^= localHash;
  }
  return hash >>> 0;
}
const styleSheetHashes = new WeakMap();
export function addShadowDomStyles($element) {
  var _el$getRootNode;
  if (!config().copyStylesToShadowDom) {
    return;
  }
  const el = $element.get(0);
  const root = (_el$getRootNode = el.getRootNode) === null || _el$getRootNode === void 0 ? void 0 : _el$getRootNode.call(el);
  if (!(root !== null && root !== void 0 && root.host)) return;
  if (!ownerDocumentStyleSheet) {
    ownerDocumentStyleSheet = createConstructedStyleSheet(root);
    processRules(ownerDocumentStyleSheet, el.ownerDocument.styleSheets, false);
  }
  const localHash = computeStyleSheetsHash(root.styleSheets);
  if (styleSheetHashes.get(root) === localHash) return;
  styleSheetHashes.set(root, localHash);
  const currentShadowDomStyleSheet = createConstructedStyleSheet(root);
  processRules(currentShadowDomStyleSheet, root.styleSheets, true);
  root.adoptedStyleSheets = [ownerDocumentStyleSheet, currentShadowDomStyleSheet];
}
function isPositionInElementRectangle(element, x, y) {
  var _element$getBoundingC;
  const rect = (_element$getBoundingC = element.getBoundingClientRect) === null || _element$getBoundingC === void 0 ? void 0 : _element$getBoundingC.call(element);
  return rect && x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
}
function createQueue() {
  let shiftIndex = 0;
  const items = [];
  return {
    push(item) {
      items.push(item);
      return this;
    },
    shift() {
      shiftIndex++;
      return items[shiftIndex - 1];
    },
    get length() {
      return items.length - shiftIndex;
    },
    get items() {
      return items;
    }
  };
}
export function getShadowElementsFromPoint(x, y, root) {
  const elementQueue = createQueue().push(root);
  while (elementQueue.length) {
    const el = elementQueue.shift();
    for (let i = 0; i < el.childNodes.length; i++) {
      const childNode = el.childNodes[i];
      if (childNode.nodeType === Node.ELEMENT_NODE && isPositionInElementRectangle(childNode, x, y) && getComputedStyle(childNode).pointerEvents !== 'none') {
        elementQueue.push(childNode);
      }
    }
  }
  const result = elementQueue.items.reverse();
  result.pop();
  return result;
}
