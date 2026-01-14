/**
* DevExtreme (cjs/common/core/events/dblclick.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var dblclick = _interopRequireWildcard(require("./double_click"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
  * @name UI Events.dxdblclick
  * @type eventType
  * @type_function_param1 event:event
  * @module events/dblclick
*/
// NOTE: The "double_click" module created to overcome adblock issue https://isc.devexpress.com/Thread/WorkplaceDetails/T465804. This file was kept as a fasade not to create a BC.
var _default = exports.default = dblclick;
module.exports = exports.default;
module.exports.default = exports.default;
