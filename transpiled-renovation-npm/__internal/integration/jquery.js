"use strict";

var _m_error = _interopRequireDefault(require("../core/utils/m_error"));
var _m_version = require("../core/utils/m_version");
var _jquery = _interopRequireDefault(require("jquery"));
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
/* eslint-disable import/first */

// eslint-disable-next-line import/no-extraneous-dependencies

const useJQuery = (0, _use_jquery.default)();
if (useJQuery && (0, _m_version.compare)(_jquery.default.fn.jquery, [1, 10]) < 0) {
  // @ts-expect-error
  throw _m_error.default.Error('E0012');
}