import _extends from "@babel/runtime/helpers/esm/extends";
export const addSortedIndex = entities => entities.map((entity, index) => _extends({}, entity, {
  sortedIndex: index
}));