"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByGroupIndex = void 0;
const groupByGroupIndex = entities => {
  const result = [];
  entities.forEach(entity => {
    result[entity.groupIndex] = result[entity.groupIndex] || [];
    result[entity.groupIndex].push(entity);
  });
  return result.map(group => group || []);
};
exports.groupByGroupIndex = groupByGroupIndex;