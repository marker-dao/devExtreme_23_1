"use strict";

exports.default = void 0;
var _pagination = _interopRequireDefault(require("../__internal/pagination/wrappers/pagination"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _pagination.default;
(0, _component_registrator.default)('dxPagination', _pagination.default);
module.exports = exports.default;
module.exports.default = exports.default;