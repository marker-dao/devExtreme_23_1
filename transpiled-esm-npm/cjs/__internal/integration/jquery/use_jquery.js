"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _config = _interopRequireDefault(require("../../../core/config"));
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

// @ts-expect-error
const {
  useJQuery
} = (0, _config.default)();
// @ts-expect-error
if (_jquery.default && useJQuery !== false) {
  // @ts-expect-error
  (0, _config.default)({
    useJQuery: true
  });
}
// eslint-disable-next-line func-names
function _default() {
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return _jquery.default && (0, _config.default)().useJQuery;
}