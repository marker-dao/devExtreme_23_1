export function PublicMethods(GridCore) {
  return class GridCoreWithFilterController extends GridCore {
    clearFilter() {
      this.filterSyncController.clearFilters();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCombinedFilter() {
      return this.filterController.displayFilter.peek();
    }
  };
}