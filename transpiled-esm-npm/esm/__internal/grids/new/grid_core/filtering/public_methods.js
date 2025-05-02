export function PublicMethods(GridCore) {
  return class GridCoreWithFilterController extends GridCore {
    clearFilter() {
      this.filterController.clearFilter();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCombinedFilter() {
      return this.filterController.displayFilter.peek();
    }
  };
}