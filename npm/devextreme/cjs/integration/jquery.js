/**
* DevExtreme (cjs/integration/jquery.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _version = require("../core/utils/version");
var _error = _interopRequireDefault(require("../core/utils/error"));
var _use_jquery = _interopRequireDefault(require("./jquery/use_jquery"));
require("./jquery/renderer");
require("./jquery/hooks");
require("./jquery/deferred");
require("./jquery/hold_ready");
require("./jquery/events");
require("./jquery/easing");
require("./jquery/element_data");
require("./jquery/element");
require("./jquery/component_registrator");
require("./jquery/ajax");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

const useJQuery = (0, _use_jquery.default)();
if (useJQuery && (0, _version.compare)(_jquery.default.fn.jquery, [1, 10]) < 0) {
  throw _error.default.Error('E0012');
}
