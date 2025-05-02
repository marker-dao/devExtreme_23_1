/**
* DevExtreme (cjs/__internal/grids/new/grid_core/selection/public_methods.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
function PublicMethods(GridCore) {
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
