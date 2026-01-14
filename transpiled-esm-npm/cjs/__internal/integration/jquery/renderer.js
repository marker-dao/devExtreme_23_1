"use strict";

var _m_renderer_base = _interopRequireDefault(require("../../core/m_renderer_base"));
var _jquery = _interopRequireDefault(require("jquery"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  _m_renderer_base.default.set(_jquery.default);
}