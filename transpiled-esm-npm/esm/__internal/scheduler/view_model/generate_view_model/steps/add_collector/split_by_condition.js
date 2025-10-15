export const splitByCondition = (arr, condition) => {
  const result = [[], []];
  arr.forEach(item => {
    if (condition(item)) {
      result[0].push(item);
    } else {
      result[1].push(item);
    }
  });
  return result;
};