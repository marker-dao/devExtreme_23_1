/**
* DevExtreme (cjs/integration/jquery/element.js)
* Version: 23.2.0
* Build date: Wed Oct 18 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _element = require("../../core/element");
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var useJQuery = (0, _use_jquery.default)();
var getPublicElement = function getPublicElement($element) {
  return $element;
};
if (useJQuery) {
  (0, _element.setPublicElementWrapper)(getPublicElement);
}
