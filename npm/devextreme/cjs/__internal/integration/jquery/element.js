/**
* DevExtreme (cjs/__internal/integration/jquery/element.js)
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
exports.getPublicElementJQuery = getPublicElementJQuery;
var _m_element = require("../../core/m_element");
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useJQuery = (0, _use_jquery.default)();
// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
function getPublicElementJQuery($element) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return $element;
}
if (useJQuery) {
  (0, _m_element.setPublicElementWrapper)(getPublicElementJQuery);
}
