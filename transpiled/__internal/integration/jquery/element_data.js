"use strict";

var _m_element_data = require("../../core/m_element_data");
var _jquery = _interopRequireDefault(require("jquery"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  (0, _m_element_data.setDataStrategy)(_jquery.default);
}