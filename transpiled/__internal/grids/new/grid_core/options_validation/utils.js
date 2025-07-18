"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwError = void 0;
var _ui = _interopRequireDefault(require("../../../../../ui/widget/ui.errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const throwError = (errorCode, message) => {
  throw _ui.default.Error(errorCode, message);
};
exports.throwError = throwError;