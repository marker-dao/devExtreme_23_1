/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/group_by_group_index.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
