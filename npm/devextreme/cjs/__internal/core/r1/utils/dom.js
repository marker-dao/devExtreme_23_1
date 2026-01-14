/**
* DevExtreme (cjs/__internal/core/r1/utils/dom.js)
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
exports.querySelectorInSameDocument = querySelectorInSameDocument;
function querySelectorInSameDocument(el, selector) {
  var _el$getRootNode;
  const root = ((_el$getRootNode = el.getRootNode) === null || _el$getRootNode === void 0 ? void 0 : _el$getRootNode.call(el)) ?? document;
  return root.querySelector(selector);
}
