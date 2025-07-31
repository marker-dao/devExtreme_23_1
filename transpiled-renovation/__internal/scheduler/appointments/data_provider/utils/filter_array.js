"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArray = void 0;
var _query = _interopRequireDefault(require("../../../../../common/data/query"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const filterArray = (items, combinedFilter) => (0, _query.default)(items).filter(combinedFilter).toArray();
exports.filterArray = filterArray;