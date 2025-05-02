export function PublicMethods(GridCore) {
  return class GridCoreWithSearchController extends GridCore {
    searchByText(text) {
      this.searchController.updateSearchText(text);
    }
  };
}