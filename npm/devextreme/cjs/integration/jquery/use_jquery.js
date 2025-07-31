/**
* DevExtreme (cjs/integration/jquery/use_jquery.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = _default;
var _jquery = _interopRequireDefault(require("jquery"));
var _config = _interopRequireDefault(require("../../core/config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

const useJQuery = (0, _config.default)().useJQuery;
if (_jquery.default && useJQuery !== false) {
  (0, _config.default)({
    useJQuery: true
  });
}
function _default() {
  return _jquery.default && (0, _config.default)().useJQuery;
}
module.exports = exports.default;
module.exports.default = exports.default;
