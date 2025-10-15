/**
* DevExtreme (cjs/__internal/viz/sankey/data_validator.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
