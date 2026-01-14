"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSortedIndex = void 0;
const addSortedIndex = entities => entities.map((entity, index) => Object.assign({}, entity, {
  sortedIndex: index
}));
exports.addSortedIndex = addSortedIndex;