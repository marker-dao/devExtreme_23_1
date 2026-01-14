"use strict";

var _easing = require("../../common/core/animation/easing");
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_jquery.default) {
  (0, _easing.setEasing)(_jquery.default.easing);
}