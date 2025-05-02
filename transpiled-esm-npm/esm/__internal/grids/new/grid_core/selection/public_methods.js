export function PublicMethods(GridCore) {
  return class GridCoreWithSelectionController extends GridCore {
    isCardSelected(key) {
      return this.selectionController.isCardSelected(key);
    }
    getSelectedCardKeys() {
      return this.selectionController.getSelectedCardKeys();
    }
    getSelectedCardsData() {
      return this.selectionController.getSelectedCardsData();
    }
    selectCards(keys) {
      let preserve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.selectionController.selectCards(keys, preserve);
    }
    deselectCards(keys) {
      return this.selectionController.deselectCards(keys);
    }
    selectCardsByIndexes(indexes) {
      return this.selectionController.selectCardsByIndexes(indexes);
    }
    deselectCardsByIndexes(indexes) {
      return this.selectionController.deselectCardsByIndexes(indexes);
    }
    selectAll() {
      return this.selectionController.selectAll();
    }
    deselectAll() {
      return this.selectionController.deselectAll();
    }
    clearSelection() {
      this.selectionController.clearSelection();
    }
  };
}