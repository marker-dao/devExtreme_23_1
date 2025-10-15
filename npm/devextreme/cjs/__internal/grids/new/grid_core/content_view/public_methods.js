/**
* DevExtreme (cjs/__internal/grids/new/grid_core/content_view/public_methods.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
