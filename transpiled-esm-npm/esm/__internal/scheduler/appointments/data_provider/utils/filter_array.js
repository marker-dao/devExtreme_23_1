import query from '../../../../../common/data/query';
export const filterArray = (items, combinedFilter) => query(items).filter(combinedFilter).toArray();