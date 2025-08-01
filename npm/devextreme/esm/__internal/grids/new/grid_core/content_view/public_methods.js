/**
* DevExtreme (esm/__internal/grids/new/grid_core/content_view/public_methods.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DataController } from '../../../../grids/new/grid_core/data_controller/index';
import { ContentView } from './view';
export function PublicMethods(GridCore) {
  return class GridCoreWithContentView extends GridCore {
    getScrollable() {
      return this.diContext.get(ContentView).scrollableRef.current;
    }
    beginCustomLoading(text) {
      const contentView = this.diContext.get(ContentView);
      const dataController = this.diContext.get(DataController);
      if (text) {
        contentView.loadingText.value = text;
      }
      dataController.isLoading.value = true;
    }
    endCustomLoading() {
      const dataController = this.diContext.get(DataController);
      dataController.isLoading.value = false;
    }
  };
}
