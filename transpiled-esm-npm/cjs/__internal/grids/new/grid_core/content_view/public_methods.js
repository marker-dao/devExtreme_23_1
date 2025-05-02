"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
var _index = require("../../../../grids/new/grid_core/data_controller/index");
var _view = require("./view");
function PublicMethods(GridCore) {
  return class GridCoreWithContentView extends GridCore {
    getScrollable() {
      return this.diContext.get(_view.ContentView).scrollableRef.current;
    }
    beginCustomLoading(text) {
      const contentView = this.diContext.get(_view.ContentView);
      const dataController = this.diContext.get(_index.DataController);
      if (text) {
        contentView.loadingText.value = text;
      }
      dataController.isLoading.value = true;
    }
    endCustomLoading() {
      const dataController = this.diContext.get(_index.DataController);
      dataController.isLoading.value = false;
    }
  };
}