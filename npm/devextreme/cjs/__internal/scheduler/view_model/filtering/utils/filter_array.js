/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtering/utils/filter_array.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArray = void 0;
var _query = _interopRequireDefault(require("../../../../../common/data/query"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const filterArray = (items, combinedFilter) => (0, _query.default)(items).filter(combinedFilter).toArray();
exports.filterArray = filterArray;
