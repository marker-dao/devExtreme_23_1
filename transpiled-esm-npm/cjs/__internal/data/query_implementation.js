"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryImpl = void 0;
var _m_array_query = _interopRequireDefault(require("./m_array_query"));
var _m_remote_query = _interopRequireDefault(require("./m_remote_query"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const queryImpl = exports.queryImpl = {
  array: _m_array_query.default,
  remote: _m_remote_query.default
};