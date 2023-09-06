/**
* DevExtreme (renovation/utils/dom.js)
* Version: 23.2.0
* Build date: Wed Sep 06 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.querySelectorInSameDocument = querySelectorInSameDocument;
function querySelectorInSameDocument(el, selector) {
  var _el$getRootNode, _el$getRootNode2;
  var root = (_el$getRootNode = (_el$getRootNode2 = el.getRootNode) === null || _el$getRootNode2 === void 0 ? void 0 : _el$getRootNode2.call(el)) !== null && _el$getRootNode !== void 0 ? _el$getRootNode : document;
  return root.querySelector(selector);
}
