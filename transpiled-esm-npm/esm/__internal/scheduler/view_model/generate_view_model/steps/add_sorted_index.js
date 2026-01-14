export const addSortedIndex = entities => entities.map((entity, index) => Object.assign({}, entity, {
  sortedIndex: index
}));