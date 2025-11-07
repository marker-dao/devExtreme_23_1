/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/group_by_group_index.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const groupByGroupIndex = entities => {
  const result = [];
  entities.forEach(entity => {
    result[entity.groupIndex] = result[entity.groupIndex] || [];
    result[entity.groupIndex].push(entity);
  });
  return result.map(group => group || []);
};
