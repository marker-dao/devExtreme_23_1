/**
* DevExtreme (cjs/__internal/core/r1/runtime/inferno/mocked/vnode-flags.js)
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
exports.VNodeFlags = exports.ChildFlags = void 0;
/* eslint-disable spellcheck/spell-checker */
var VNodeFlags;
(function (VNodeFlags) {
  VNodeFlags[VNodeFlags["HtmlElement"] = 1] = "HtmlElement";
  VNodeFlags[VNodeFlags["ComponentUnknown"] = 2] = "ComponentUnknown";
  VNodeFlags[VNodeFlags["ComponentClass"] = 4] = "ComponentClass";
  VNodeFlags[VNodeFlags["ComponentFunction"] = 8] = "ComponentFunction";
  VNodeFlags[VNodeFlags["Text"] = 16] = "Text";
  VNodeFlags[VNodeFlags["SvgElement"] = 32] = "SvgElement";
  VNodeFlags[VNodeFlags["InputElement"] = 64] = "InputElement";
  VNodeFlags[VNodeFlags["TextareaElement"] = 128] = "TextareaElement";
  VNodeFlags[VNodeFlags["SelectElement"] = 256] = "SelectElement";
  VNodeFlags[VNodeFlags["Void"] = 512] = "Void";
  VNodeFlags[VNodeFlags["Portal"] = 1024] = "Portal";
  VNodeFlags[VNodeFlags["ReCreate"] = 2048] = "ReCreate";
  VNodeFlags[VNodeFlags["ContentEditable"] = 4096] = "ContentEditable";
  VNodeFlags[VNodeFlags["Fragment"] = 8192] = "Fragment";
  VNodeFlags[VNodeFlags["InUse"] = 16384] = "InUse";
  VNodeFlags[VNodeFlags["ForwardRef"] = 32768] = "ForwardRef";
  VNodeFlags[VNodeFlags["Normalized"] = 65536] = "Normalized";
  VNodeFlags[VNodeFlags["ForwardRefComponent"] = 32776] = "ForwardRefComponent";
  VNodeFlags[VNodeFlags["FormElement"] = 448] = "FormElement";
  VNodeFlags[VNodeFlags["Element"] = 481] = "Element";
  VNodeFlags[VNodeFlags["Component"] = 14] = "Component";
  VNodeFlags[VNodeFlags["DOMRef"] = 2033] = "DOMRef";
  VNodeFlags[VNodeFlags["InUseOrNormalized"] = 81920] = "InUseOrNormalized";
  VNodeFlags[VNodeFlags["ClearInUse"] = -16385] = "ClearInUse";
  VNodeFlags[VNodeFlags["ComponentKnown"] = 12] = "ComponentKnown";
})(VNodeFlags || (exports.VNodeFlags = VNodeFlags = {}));
var ChildFlags;
(function (ChildFlags) {
  ChildFlags[ChildFlags["UnknownChildren"] = 0] = "UnknownChildren";
  ChildFlags[ChildFlags["HasInvalidChildren"] = 1] = "HasInvalidChildren";
  ChildFlags[ChildFlags["HasVNodeChildren"] = 2] = "HasVNodeChildren";
  ChildFlags[ChildFlags["HasNonKeyedChildren"] = 4] = "HasNonKeyedChildren";
  ChildFlags[ChildFlags["HasKeyedChildren"] = 8] = "HasKeyedChildren";
  ChildFlags[ChildFlags["HasTextChildren"] = 16] = "HasTextChildren";
  ChildFlags[ChildFlags["MultipleChildren"] = 12] = "MultipleChildren";
})(ChildFlags || (exports.ChildFlags = ChildFlags = {}));
