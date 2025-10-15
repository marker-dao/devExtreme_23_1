"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSortedIndex = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const addSortedIndex = entities => entities.map((entity, index) => _extends({}, entity, {
  sortedIndex: index
}));
exports.addSortedIndex = addSortedIndex;