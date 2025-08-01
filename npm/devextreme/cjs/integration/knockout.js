/**
* DevExtreme (cjs/integration/knockout.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _knockout = _interopRequireDefault(require("knockout"));
var _errors = _interopRequireDefault(require("../core/errors"));
var _version = require("../core/utils/version");
require("./knockout/component_registrator");
require("./knockout/event_registrator");
require("./knockout/components");
require("./knockout/validation");
require("./knockout/variable_wrapper_utils");
require("./knockout/clean_node");
require("./knockout/clean_node_old");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

// Check availability in global environment
if (_knockout.default) {
  if ((0, _version.compare)(_knockout.default.version, [2, 3]) < 0) {
    throw _errors.default.Error('E0013');
  }
}
