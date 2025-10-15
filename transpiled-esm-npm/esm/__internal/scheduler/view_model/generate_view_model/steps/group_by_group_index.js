export const groupByGroupIndex = entities => {
  const result = [];
  entities.forEach(entity => {
    result[entity.groupIndex] = result[entity.groupIndex] || [];
    result[entity.groupIndex].push(entity);
  });
  return result.map(group => group || []);
};