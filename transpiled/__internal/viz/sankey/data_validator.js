"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _graph = _interopRequireDefault(require("./graph"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const validator = {
  validate(data, incidentOccurred) {
    let result = null;
    if (this._hasCycle(data)) {
      // @ts-expect-error
      result = 'E2006';
      incidentOccurred('E2006');
    }
    return result;
  },
  _hasCycle(data) {
    return _graph.default.struct.hasCycle(data);
  }
};
var _default = exports.default = validator;